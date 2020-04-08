import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, Layout, Menu, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import {
	userDetailsPageActions,
	userAccountActions,
	userProfileActions,
	userWithdrawalActions,
} from '../../../../controller';
import {
	withLoadingStatusNotification,
} from '../../../../../lib/notify-handler';
import {
	UserAccountDataPropTypes,
	UserProfilePropTypes,
	UserCommentDataPropTypes,
	TeamStatsPropsTypes,
	FinanceLevelNamesMapDataPropTypes,
} from '../../../../lib/prop-types-utils';
import PageBlock from '../../../../components/page-block';
import { RouteKeyEnums, } from '../../../../routes';
import UserInfoBlock from '../../../../features/user-info-block';
import {
	LoadingStatusEnum,
	UserTypeEnum,
} from '../../../../lib/enums';
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const {
	AGENT,
	MEMBER,
} = UserTypeEnum;
const {
	initUserDetailsPageAction,
	setHasInitUserDetailPageAction,
} = userDetailsPageActions;
const {
	fetchUserAccountAction,
} = userAccountActions;
const {
	fetchUserProfileAction,
} = userProfileActions;
const {
	fetchUserWithdrawalMessageAction,
} = userWithdrawalActions;
const { ACCOUNT_MEMBER_MANAGEMENT, } = RouteKeyEnums;
const { Sider, Content, } = Layout;
const defaultWalletCode = 100;
const propTypes = {
	pathName: PropTypes.string.isRequired,
	userId: PropTypes.string.isRequired,
	previousPagePathStack: PropTypes.array,
	renderedRoutes: PropTypes.object,
	userDetailData: PropTypes.object,
	userStatsData: PropTypes.object,
	userWalletsData: PropTypes.object,
	userAccountData: UserAccountDataPropTypes,
	teamStatsData: TeamStatsPropsTypes,
	onNavigate: PropTypes.func.isRequired,
	userProfileData: UserProfilePropTypes,
	userCommentsData: PropTypes.arrayOf(UserCommentDataPropTypes),
	userPinnedComments: PropTypes.arrayOf(UserCommentDataPropTypes),
	userWithdrawalMessageData: PropTypes.string,
	fetchUserProfileAction: PropTypes.func.isRequired,
	setHasInitUserDetailPageAction: PropTypes.func.isRequired,
	userProfileUpdateLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	userDetailsPageLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	teamEnableLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	teamDisableLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	teamMemberEnableLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	userAccountUpdateLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	userWithdrawalMessageUpdateLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	financeLevelUpdateLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	initUserDetailsPageAction: PropTypes.func.isRequired,
	fetchUserAccountAction: PropTypes.func.isRequired,
	hasInitUserDetailPage: PropTypes.bool.isRequired,
	fetchUserWithdrawalMessageAction: PropTypes.func.isRequired,
	financeLevelNamesMapData: FinanceLevelNamesMapDataPropTypes,
};

const defaultProps = {
	previousPagePathStack: [`${ACCOUNT_MEMBER_MANAGEMENT}/info`],
};

class AccountMemberManagementDetailPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKeys: [props.pathName],
		};

		this._handleUserNavigate = this._handleUserNavigate.bind(this);
		this._handleNaviagePrevious = this._handleNaviagePrevious.bind(this);
		this._handleSettingBlockNavigate = this._handleSettingBlockNavigate.bind(this);
		this._handleMenuSelect = this._handleMenuSelect.bind(this);
		this._renderDividendWageRuleMenu = this._renderDividendWageRuleMenu.bind(this);
	}
	_handleUserNavigate(record) {
		const { id: userId, } = record;
		const {
			onNavigate,
			pathName,
			setHasInitUserDetailPageAction,
			previousPagePathStack,
		} = this.props;

		setHasInitUserDetailPageAction(false);
		onNavigate(`${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/basic-setting`, {
			passProps: {
				previousPagePathStack: [...previousPagePathStack, pathName],
			}
		});
	}
	_handleNaviagePrevious() {
		const { previousPagePathStack, onNavigate, setHasInitUserDetailPageAction, } = this.props;
		const updatedPreviousPagePathStack = previousPagePathStack.slice();
		const previousPagePath = updatedPreviousPagePathStack.pop();

		setHasInitUserDetailPageAction(false);
		onNavigate(previousPagePath, {
			passProps: {
				previousPagePathStack: updatedPreviousPagePathStack,
			}
		});
	}
	_handleSettingBlockNavigate(path) {
		const { onNavigate, previousPagePathStack, } = this.props;

		onNavigate(path, {
			passProps: {
				previousPagePathStack,
			}
		});
	}
	_handleMenuSelect({ key, }) {
		this.setState({ selectedKeys: [key], });
	}

	_renderDividendWageRuleMenu() {
		const { userId, userProfileData, } = this.props;
		const { _handleSettingBlockNavigate, } = this;
		const { type, } = userProfileData;

		if (type === AGENT || type === MEMBER) {
			const dividendWageRulePath = `${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/dividend-wage-rule`;

			return (
				<Menu.Item key={dividendWageRulePath} onClick={() => _handleSettingBlockNavigate(dividendWageRulePath)}>
					<span>分红与工资规则</span>
				</Menu.Item>
			);
		}
	}

	render() {
		const {
			userId,
			renderedRoutes,
			userDetailData,
			userStatsData,
			userWalletsData,
			userProfileData,
			userCommentsData,
			userPinnedComments,
			userWithdrawalMessageData,
			userAccountData,
			teamStatsData,
			financeLevelNamesMapData,
		} = this.props;
		const {
			_handleUserNavigate,
			_handleNaviagePrevious,
			_handleSettingBlockNavigate,
			_handleMenuSelect,
			_renderDividendWageRuleMenu,
		} = this;
		const { selectedKeys, } = this.state;
		const usedWallet = userWalletsData[defaultWalletCode] ? userWalletsData[defaultWalletCode] : { balance: 0, };
		const basicSettingPath = `${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/basic-setting`;
		const accountInfoPath = `${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/account-info`;
		const cardBindPath = `${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/card-bind`;
		const investmentPath = `${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/investment`;
		const statisticsPath = `${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/statistics`;
		const { levelId } = userProfileData;
		const levelName = financeLevelNamesMapData[levelId];

		return (
			<div className="detail-information">
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={_handleNaviagePrevious}
				>
					返回上一層
				</Button>
				<PageBlock>
					<UserInfoBlock
						user={userDetailData}
						userStatsData={userStatsData}
						wallet={usedWallet}
						userProfile={userProfileData}
						userCommentsData={userCommentsData}
						userPinnedComments={userPinnedComments}
						userWithdrawalMessage={userWithdrawalMessageData}
						userAccountData={userAccountData}
						onClickUser={_handleUserNavigate}
						teamStatsData={teamStatsData}
						levelName={levelName}
					/>
				</PageBlock>
				<PageBlock className="setting-block">
					<Layout>
						<Sider theme='light'>
							<Menu
								themeType={Menu.ThemeTypeEnums.LIGHT}
								selectedKeys={selectedKeys}
								onMenuItemSelect={_handleMenuSelect}
							>
								<Menu.Item key={basicSettingPath} onClick={() => _handleSettingBlockNavigate(basicSettingPath)}>
									<span>基本设置</span>
								</Menu.Item>
								<Menu.Item key={accountInfoPath} onClick={() => _handleSettingBlockNavigate(accountInfoPath)}>
									<span>帐户资讯</span>
								</Menu.Item>
								<Menu.Item key={cardBindPath} onClick={() => _handleSettingBlockNavigate(cardBindPath)}>
									<span>銀行卡綁定</span>
								</Menu.Item>
								<Menu.Item key={investmentPath} onClick={() => _handleSettingBlockNavigate(investmentPath)}>
									<span>招商设置</span>
								</Menu.Item>
								{_renderDividendWageRuleMenu()}
								<Menu.Item key={statisticsPath} onClick={() => _handleSettingBlockNavigate(statisticsPath)}>
									<span>其他统计资讯</span>
								</Menu.Item>
							</Menu>
						</Sider>
						<Layout>
							<Content className="member-menu-content">
								{renderedRoutes}
							</Content>
						</Layout>
					</Layout>
				</PageBlock>
			</div>
		);
	}

	componentDidMount() {
		const {
			userId,
			previousPagePathStack,
			initUserDetailsPageAction,
			hasInitUserDetailPage,
			fetchUserWithdrawalMessageAction,
		} = this.props;

		this.setState({ previousPagePathStack, });
		if (!hasInitUserDetailPage) {
			initUserDetailsPageAction(userId);
			fetchUserWithdrawalMessageAction(userId);
		}
	}

	componentDidUpdate(prevProps) {
		const {
			userId,
			fetchUserProfileAction,
			fetchUserAccountAction,
			userProfileUpdateLoadingStatus,
			userAccountUpdateLoadingStatus,
			userDetailsPageLoadingStatus,
			userWithdrawalMessageUpdateLoadingStatus,
			fetchUserWithdrawalMessageAction,
			teamEnableLoadingStatus,
			teamDisableLoadingStatus,
			teamMemberEnableLoadingStatus,
			setHasInitUserDetailPageAction,
			financeLevelUpdateLoadingStatus,
		} = this.props;

		if (
			(prevProps.userProfileUpdateLoadingStatus === LOADING && userProfileUpdateLoadingStatus === SUCCESS)
			||(prevProps.teamEnableLoadingStatus === LOADING && teamEnableLoadingStatus === SUCCESS)
			||(prevProps.teamDisableLoadingStatus === LOADING && teamDisableLoadingStatus === SUCCESS)
			||(prevProps.teamMemberEnableLoadingStatus === LOADING && teamMemberEnableLoadingStatus === SUCCESS)
			||(prevProps.financeLevelUpdateLoadingStatus === LOADING && financeLevelUpdateLoadingStatus === SUCCESS)
		) {
			fetchUserProfileAction(userId);
		}
		if (prevProps.userAccountUpdateLoadingStatus === LOADING && userAccountUpdateLoadingStatus === SUCCESS) {
			fetchUserAccountAction(userId);
		}
		if (prevProps.userDetailsPageLoadingStatus === LOADING && userDetailsPageLoadingStatus === SUCCESS) {
			setHasInitUserDetailPageAction(true);
		}
		if (prevProps.userWithdrawalMessageUpdateLoadingStatus === LOADING && userWithdrawalMessageUpdateLoadingStatus === SUCCESS) {
			fetchUserWithdrawalMessageAction(userId);
		}
	}
}

AccountMemberManagementDetailPage.propTypes = propTypes;
AccountMemberManagementDetailPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		hasInitUserDetailPage: state.userDetailPage.get('hasInitPage'),
		userDetailData: state.userDetail.get('data').toObject(),
		userProfileData: state.userData.profile.get('data').toObject(),
		userStatsData: state.userData.stats.get('data').toObject(),
		userCommentsData: state.userData.comments.get('data').toArray(),
		userPinnedComments: state.userData.comments.get('pinnedComments').toArray(),
		userWithdrawalMessageData: state.userData.withdrawalMessage.get('data'),
		userWalletsData: state.userData.wallets.get('data').toObject(),
		userAccountData: state.userData.account.get('data').toObject(),
		teamStatsData: state.team.get('stats').toObject(),
		userDetailsPageLoadingStatus: state.userDetailPage.get('loadingStatus'),
		userDetailsPageLoadingStatusMessage: state.userDetailPage.get('loadingStatusMessage'),
		userProfileUpdateLoadingStatus: state.userData.profile.get('updateLoadingStatus'),
		userProfileUpdateLoadingStatusMessage: state.userData.profile.get('updateLoadingStatusMessage'),
		userWithdrawalMessageLoadingStatus: state.userData.withdrawalMessage.get('loadingStatus'),
		userWithdrawalMessageLoadingStatusMessage: state.userData.withdrawalMessage.get('loadingStatusMessage'),
		userWithdrawalMessageUpdateLoadingStatus: state.userData.withdrawalMessage.get('updateLoadingStatus'),
		userWithdrawalMessageUpdateLoadingStatusMessage: state.userData.withdrawalMessage.get('updateLoadingStatusMessage'),
		userAccountUpdateLoadingStatus: state.userData.account.get('updateLoadingStatus'),
		userAccountUpdateLoadingStatusMessage: state.userData.account.get('updateLoadingStatusMessage'),
		teamEnableLoadingStatus: state.team.get('enableLoadingStatus'),
		teamEnableLoadingStatusMessage: state.team.get('enableLoadingStatusMessage'),
		teamDisableLoadingStatus: state.team.get('disableLoadingStatus'),
		teamDisableLoadingStatusMessage: state.team.get('disableLoadingStatusMessage'),
		teamMemberEnableLoadingStatus: state.teamMember.get('enableLoadingStatus'),
		financeLevelNamesMapData: state.financeLevels.get('financeLevelNamesMap').toObject(),
		financeLevelUpdateLoadingStatus: state.userData.financeLevel.get('updateLoadingStatus'),
		financeLevelUpdateLoadingStatusMessage: state.userData.financeLevel.get('updateLoadingStatusMessage'),
		teamMemberEnableLoadingStatusMessage: state.teamMember.get('enableLoadingStatusMessage'),
		userCommentAddLoadingStatus: state.userData.comments.get('addLoadingStatus'),
		userCommentAddLoadingStatusMessage: state.userData.comments.get('addLoadingStatusMessage'),
		userCommentCancelLoadingStatus: state.userData.comments.get('cancelLoadingStatus'),
		userCommentCancelLoadingStatusMessage: state.userData.comments.get('cancelLoadingStatusMessage'),
		userDetailUpdateLoadingStatus: state.userDetail.get('updateLoadingStatus'),
		userDetailUpdateLoadingStatusMessage: state.userDetail.get('updateLoadingStatusMessage'),
		userBankCardsLoadingStatus: state.userData.bankCards.get('loadingStatus'),
		userBankCardsLoadingStatusMessage: state.userData.bankCards.get('loadingStatusMessage'),
		createBankCardLoadingStatus: state.userData.bankCards.get('createBankCardLoadingStatus'),
		createBankCardLoadingStatusMessage: state.userData.bankCards.get('createBankCardLoadingStatusMessage'),
		deleteBankCardLoadingStatus: state.userData.bankCards.get('deleteBankCardLoadingStatus'),
		deleteBankCardLoadingStatusMessage: state.userData.bankCards.get('deleteBankCardLoadingStatusMessage'),
		updateBankCardLoadingStatus: state.userData.bankCards.get('updateBankCardLoadingStatus'),
		updateBankCardLoadingStatusMessage: state.userData.bankCards.get('updateBankCardLoadingStatusMessage'),
		enableBankCardWithdrawableLoadingStatus: state.userData.bankCards.get('enableBankCardWithdrawableLoadingStatus'),
		enableBankCardWithdrawableLoadingStatusMessage: state.userData.bankCards.get('enableBankCardWithdrawableLoadingStatusMessage'),
		userDividendWageRuleLoadingStatus: state.userDividendWageRulePage.get('loadingStatus'),
		userDividendWageRuleLoadingStatusMessage: state.userDividendWageRulePage.get('loadingStatusMessage'),
		dividendUpdateLoadingStatus: state.userData.dividendSettings.get('updateLoadingStatus'),
		dividendUpdateLoadingStatusMessage: state.userData.dividendSettings.get('updateLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		initUserDetailsPageAction: (userId) => dispatch(initUserDetailsPageAction(userId)),
		fetchUserProfileAction: (userId) => dispatch(fetchUserProfileAction(userId)),
		fetchUserAccountAction: (userId) => dispatch(fetchUserAccountAction(userId)),
		setHasInitUserDetailPageAction: (hasInitPage) => dispatch(setHasInitUserDetailPageAction(hasInitPage)),
		fetchUserWithdrawalMessageAction: (userId) => dispatch(fetchUserWithdrawalMessageAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'userDetailsPageLoadingStatus',
			loadingStatusMessage: 'userDetailsPageLoadingStatusMessage',
		},
		{
			loadingStatus: 'userWithdrawalMessageLoadingStatus',
			loadingStatusMessage: 'userWithdrawalMessageLoadingStatusMessage',
		},
		{
			loadingStatus: 'userProfileUpdateLoadingStatus',
			loadingStatusMessage: 'userProfileUpdateLoadingStatusMessage',
		},
		{
			loadingStatus: 'userAccountUpdateLoadingStatus',
			loadingStatusMessage: 'userAccountUpdateLoadingStatusMessage',
		},
		{
			loadingStatus: 'financeLevelUpdateLoadingStatus',
			loadingStatusMessage: 'financeLevelUpdateLoadingStatusMessage',
		},
		{
			loadingStatus: 'userCommentAddLoadingStatus',
			loadingStatusMessage: 'userCommentAddLoadingStatusMessage',
		},
		{
			loadingStatus: 'userCommentCancelLoadingStatus',
			loadingStatusMessage: 'userCommentCancelLoadingStatusMessage',
		},
		{
			loadingStatus: 'teamEnableLoadingStatus',
			loadingStatusMessage: 'teamEnableLoadingStatusMessage',
		},
		{
			loadingStatus: 'teamDisableLoadingStatus',
			loadingStatusMessage: 'teamDisableLoadingStatusMessage',
		},
		{
			loadingStatus: 'teamMemberEnableLoadingStatus',
			loadingStatusMessage: 'teamMemberEnableLoadingStatusMessage',
		},
		{
			loadingStatus: 'userWithdrawalMessageUpdateLoadingStatus',
			loadingStatusMessage: 'userWithdrawalMessageUpdateLoadingStatusMessage',
		},
		{
			loadingStatus: 'userDetailUpdateLoadingStatus',
			loadingStatusMessage: 'userDetailUpdateLoadingStatusMessage',
		},
		{
			loadingStatus: 'userBankCardsLoadingStatus',
			loadingStatusMessage: 'userBankCardsLoadingStatusMessage',
		},
		{
			loadingStatus: 'createBankCardLoadingStatus',
			loadingStatusMessage: 'createBankCardLoadingStatusMessage',
		},
		{
			loadingStatus: 'deleteBankCardLoadingStatus',
			loadingStatusMessage: 'deleteBankCardLoadingStatusMessage',
		},
		{
			loadingStatus: 'updateBankCardLoadingStatus',
			loadingStatusMessage: 'updateBankCardLoadingStatusMessage',
		},
		{
			loadingStatus: 'enableBankCardWithdrawableLoadingStatus',
			loadingStatusMessage: 'enableBankCardWithdrawableLoadingStatusMessage',
		},
		{
			loadingStatus: 'userDividendWageRuleLoadingStatus',
			loadingStatusMessage: 'userDividendWageRuleLoadingStatusMessage',
		},
		{
			loadingStatus: 'dividendUpdateLoadingStatus',
			loadingStatusMessage: 'dividendUpdateLoadingStatusMessage',
		},
	],
	AccountMemberManagementDetailPage
));
