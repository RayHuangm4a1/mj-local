import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListItem, } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { getLastCommentDescription, } from '../../../../lib/user-utils';
import {
	UserCommentDataPropTypes,
	UserProfilePropTypes,
	TeamStatsPropsTypes
} from '../../../../lib/prop-types-utils';
import Nickname from './edit-element/nickname';
import Payer from './edit-element/payer';
import Type from './edit-element/type';
import Transferable from './edit-element/transferable';
import NumberOfChildren from './edit-element/number-of-children';
import {
	BetableEditButton,
	BlockUserEditButton,
	BlockFundsEditButton,
	BlockDividendEditButton,
	WithdrawalHintEditButton,
	DepositableEditButton,
	WithdrawableEditButton,
	SubordinateCreatableEditButton,
	CommentEditButton,
} from '../../../../features/user-info-block/edit-buttons';
import { renderUserTeamStatusText, } from '../../../../features/user-info-block/utils';
import { connect, } from 'ljit-store-connecter';
import {
	userProfileActions,
	userWithdrawalActions,
} from '../../../../controller';

const { Title, } = PageBlock;
const {
	fetchUserProfileAction,
} = userProfileActions;
const {
	fetchUserWithdrawalMessageAction,
} = userWithdrawalActions;
// TODO use correct data schema
const propTypes = {
	userId: PropTypes.string,
	userProfileData: UserProfilePropTypes,
	withdrawalMessageData: PropTypes.string,
	userCommentsData: PropTypes.arrayOf(UserCommentDataPropTypes),
	teamStatsData: TeamStatsPropsTypes,
	fetchUserProfileAction: PropTypes.func.isRequired,
	fetchUserWithdrawalMessageAction: PropTypes.func.isRequired,
};
const defaultProps = {
	userProfileData: {},
	userCommentsData: []
};

class AccountMemberManagementBasicSettingPage extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			withdrawalMessageData,
			userCommentsData,
			userProfileData,
			teamStatsData,
		} = this.props;
		const {
			statuses = {},
		} = userProfileData;
		const {
			isBlocked,
			isTeamBlocked,
			isBetable,
			isTeamBetable,
			isFundsable,
			isTeamFundsable,
			isDividendable,
			isDepositable,
			isTeamDepositable,
			isWithdrawable,
			isTeamWithdrawable,
			isChildrenCreatable,
		} = statuses;
		const { numOfUsers, } = teamStatsData;

		return (
			<div className="basic-setting">
				<Title text="基本设置" />
				<Row gutter={40}>
					<Col span={12}>
						<Nickname/>
						<ListItem
							title="帐号冻结"
							content={renderUserTeamStatusText(!isBlocked, !isTeamBlocked, "冻结")}
							right={<BlockUserEditButton/>}
						/>
						<ListItem
							title="禁止投注"
							content={renderUserTeamStatusText(isBetable, isTeamBetable, '禁止')}
							right={<BetableEditButton buttonText="禁止"/>}
						/>
						<ListItem
							title="资金冻结"
							content={renderUserTeamStatusText(isFundsable, isTeamFundsable, "冻结")}
							right={<BlockFundsEditButton/>}
						/>
						<ListItem
							title="分紅凍結"
							content={isDividendable ? '无' : '冻结'}
							right={<BlockDividendEditButton/>}
						/>
						<ListItem
							title="提现提示"
							content={withdrawalMessageData || '无资料'}
							right={<WithdrawalHintEditButton/>}
						/>
					</Col>
					<Col span={12}>
						<Payer/>
						<Type/>
						<Transferable/>
						<ListItem
							className="comment"
							title="备注"
							content={getLastCommentDescription(userCommentsData)}
							right={<CommentEditButton buttonText="修改"/>}
						/>
						<ListItem
							title="禁止充值"
							content={renderUserTeamStatusText(isDepositable, isTeamDepositable, '禁止')}
							right={<DepositableEditButton/>}
						/>
						<ListItem
							title="禁止提现"
							content={renderUserTeamStatusText(isWithdrawable, isTeamWithdrawable, '禁止')}
							right={<WithdrawableEditButton/>}
						/>
					</Col>
				</Row>
				<Title text="团队基本设置" />
				<Row gutter={24}>
					<Col span={12}>
						<NumberOfChildren
							numOfUsers={numOfUsers}
						/>
					</Col>
					<Col span={12}>
						<ListItem
							title="禁止开下级"
							content={isChildrenCreatable ? '无': '禁止'}
							right={<SubordinateCreatableEditButton/>}
						/>
					</Col>
				</Row>
			</div>
		);
	}
	componentDidMount() {
		const {
			userId,
			fetchUserProfileAction,
		} = this.props;

		fetchUserProfileAction(userId);
		fetchUserWithdrawalMessageAction(userId);
	}
}

AccountMemberManagementBasicSettingPage.propTypes = propTypes;
AccountMemberManagementBasicSettingPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		userProfileData: state.userData.profile.get('data').toObject(),
		userCommentsData: state.userData.comments.get('data').toArray(),
		withdrawalMessageData: state.userData.withdrawalMessage.get('data'),
		teamStatsData: state.team.get('stats').toObject(),
	};
}
// TODO fetch api that this page will use
function mapDispatchToProps(dispatch) {
	return {
		fetchUserProfileAction: (userId) => dispatch(fetchUserProfileAction(userId)),
		fetchUserWithdrawalMessageAction: (userId) => dispatch(fetchUserWithdrawalMessageAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberManagementBasicSettingPage);
