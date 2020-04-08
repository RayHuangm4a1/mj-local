import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Container from './container';
import MemberBasicInfoModal from './member-information-modal';
import { UserAvatar,
	IconButton,
	Statistic,
	LabelText,
	BankCard,
	LabelContent,
	RemindText,
} from 'ljit-react-components';
import {
	userActions,
	userBankCardsAction,
	teamStatsActions,
} from '../../../../controller';
import { calculateRebate, } from '../../../../lib/betting-utils';
import { UserTypeEnum, } from '../../../../lib/enums';
import { formatDate, } from '../../../../../lib/moment-utils';
import { connect, } from 'ljit-store-connecter';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import './style.styl';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const {
	IconTypeEnums,
	SizeEnums,
} = IconButton;
const {
	AGENT
} = UserTypeEnum;

const {
	startUpdateUserNicknameAction,
	startUpdateUserGreetingAction,
} = userActions;
const { fetchUserBankCardsAction, } = userBankCardsAction;
const { fetchTeamStatsAction, } = teamStatsActions;

const FETCH_TEAM_STATS_INTERVAL = 300000;

// TODO 確認欄位命名
const propTypes = {
	userData: PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
		bonus: PropTypes.number,
		nickname: PropTypes.string,
		greeting: PropTypes.string,
		ip: PropTypes.string,
		geo: PropTypes.string,
		loginAt: PropTypes.string,
		type: PropTypes.number,
		createdAt: PropTypes.string,
		avatar: PropTypes.string,
	}),
	usedWalletData: PropTypes.shape({
		balance: PropTypes.number,
	}),
	teamStatsData: PropTypes.shape({
		numOfUsers: PropTypes.number,
		balance: PropTypes.number,
		numOfRegistries: PropTypes.number,
	}),
	userBankCardsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		bankName: PropTypes.string,
		number: PropTypes.string,
		payer: PropTypes.string,
		activatedAt: PropTypes.string,
		withdrawableAt: PropTypes.string,
	})),
	startUpdateUserNicknameAction: PropTypes.func.isRequired,
	startUpdateUserGreetingAction: PropTypes.func.isRequired,
	fetchUserBankCardsAction: PropTypes.func.isRequired,
	fetchTeamStatsAction: PropTypes.func.isRequired,
	updateNicknameLoadingStatus: PropTypes.oneOf([ NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	updateGreetingLoadingStatus: PropTypes.oneOf([ NONE, LOADING, SUCCESS, FAILED,]).isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
};

const defaultProps = {
	userData: {},
	usedWalletData: {},
	teamStatsData: {},
	userBankCardsData: [],
};

class MemberInformationPage extends Component {
	constructor() {
		super();
		this.state = {
			isNicknameModalVisible: false,
			isGreetingModalVisible: false,
		};
		this._handleToggleNicknameModal = this._handleToggleNicknameModal.bind(this);
		this._handleToggleGreetingModal = this._handleToggleGreetingModal.bind(this);
		this._handleSubmitNickName = this._handleSubmitNickName.bind(this);
		this._handleSubmitGreeting = this._handleSubmitGreeting.bind(this);
		this._renderPersonalInformation = this._renderPersonalInformation.bind(this);
		this._renderTeamInformation = this._renderTeamInformation.bind(this);
		this._renderBankCards = this._renderBankCards.bind(this);
	}

	_handleToggleNicknameModal() {
		this.setState({
			isNicknameModalVisible: !this.state.isNicknameModalVisible,
		});
	}

	_handleToggleGreetingModal() {
		this.setState({
			isGreetingModalVisible: !this.state.isGreetingModalVisible,
		});
	}

	_handleSubmitNickName(nickname, password) {
		const { startUpdateUserNicknameAction, } = this.props;

		startUpdateUserNicknameAction(password, nickname);
		this._handleToggleNicknameModal();
	}

	_handleSubmitGreeting(greeting, password) {
		const { startUpdateUserGreetingAction, } = this.props;

		startUpdateUserGreetingAction(password, greeting);
		this._handleToggleGreetingModal();
	}

	_renderPersonalInformation() {
		const { userData } = this.props;
		const { isNicknameModalVisible, isGreetingModalVisible, } = this.state;
		const {
			_handleToggleNicknameModal,
			_handleToggleGreetingModal,
			_handleSubmitNickName,
			_handleSubmitGreeting,
		} = this;
		const {
			nickname,
			greeting,
			ip,
			geo,
			loginAt,
			createdAt,
			bonus,
		} = userData;
		const rebate = calculateRebate(bonus);

		return (
			<Container title="个人信息">
				<LabelContent
					label="昵称:"
					columnType={LabelContent.ColumnTypeEnums.MEDIUM}
					className="ljit-member-basic-info__node"
				>
					<div>
						{nickname}
						<IconButton
							size={SizeEnums.SMALL}
							type={IconTypeEnums.EDIT}
							className="icon-style"
							onClick={ _handleToggleNicknameModal }
						/>
					</div>
				</LabelContent>
				<MemberBasicInfoModal
					isVisible={isNicknameModalVisible}
					modalTitle={"昵称设置"}
					contentTitle={"昵称"}
					onClickCancel={_handleToggleNicknameModal}
					value={nickname}
					onSubmit={_handleSubmitNickName}
				/>
				<LabelContent
					label="登录问候语:"
					columnType={LabelContent.ColumnTypeEnums.SMALL}
					className="ljit-member-basic-info__node"
				>
					<div>
						{greeting}
						<IconButton
							size={SizeEnums.SMALL}
							type={IconTypeEnums.EDIT}
							className="icon-style"
							onClick={ _handleToggleGreetingModal }
						/>
					</div>
				</LabelContent>
				<MemberBasicInfoModal
					isVisible={isGreetingModalVisible}
					modalTitle={"问候语设置"}
					contentTitle={"问候语"}
					onClickCancel={_handleToggleGreetingModal}
					value={greeting}
					onSubmit={_handleSubmitGreeting}
				/>
				<LabelText
					label="返点:"
					text={rebate}
					fontSize={LabelText.SizeEnums.MEDIUM}
					className="ljit-member-basic-info__text"
				/>
				<LabelText
					label="注册时间:"
					text={formatDate(createdAt)}
					fontSize={LabelText.SizeEnums.MEDIUM}
					className="ljit-member-basic-info__text"
				/>
				<LabelText
					label="最近登陆 IP :"
					text={ip}
					fontSize={LabelText.SizeEnums.MEDIUM}
					className="ljit-member-basic-info__text"
				/>
				<LabelText
					label="最近登陆地址:"
					text={geo}
					fontSize={LabelText.SizeEnums.MEDIUM}
					className="ljit-member-basic-info__text"
				/>
				<LabelText
					label="最近登陆时间:"
					text={loginAt}
					fontSize={LabelText.SizeEnums.MEDIUM}
					className="ljit-member-basic-info__text"
				/>
			</Container>
		);
	}

	_renderTeamInformation() {
		const { teamStatsData } = this.props;
		const { balance, numOfUsers, numOfRegistries, } = teamStatsData;

		return (
			<Container title="团队信息">
				<LabelText
					label="团队人数 :"
					text={numOfUsers}
					fontSize={LabelText.SizeEnums.MEDIUM}
					className="ljit-member-basic-info__text"
				/>
				<LabelText
					label="当日注册："
					text={numOfRegistries}
					fontSize={LabelText.SizeEnums.MEDIUM}
					className="ljit-member-basic-info__text"
				/>
				<LabelText
					label="团队餘額 :"
					text={balance}
					fontSize={LabelText.SizeEnums.MEDIUM}
					className="ljit-member-basic-info__text"
				/>
				<RemindText
					text="团队余额每五分钟更新一次"
				/>
			</Container>
		);
	}

	_renderBankCards() {
		const { userBankCardsData } = this.props;

		return (
			<Container title="銀行卡">
				<div className="ljit-member-basic-info__bank-cards">
					{
						userBankCardsData.map((bank) => {
							const {
								id,
								bankName,
								payer,
								number,
								activatedAt,
								withdrawableAt
							} = bank;

							return (
								<BankCard
									key={`${id}`}
									dataSource={{
										bankName,
										payer,
										number: number.slice(-4),
										activatedAt,
										withdrawableAt,
									}}
								/>
							);
						})
					}
				</div>
			</Container>
		);
	}
	render() {
		const { _renderPersonalInformation, _renderTeamInformation, _renderBankCards } = this;
		const { userData, usedWalletData } = this.props;
		const { username, bonus, type, avatar, } = userData;
		const { balance } = usedWalletData;

		return (
			<div className="ljit-member-basic-info">
				<Container>
					<div className="ljit-member-basic-info__user">
						<UserAvatar
							size={56}
							src={avatar}
							alignment={UserAvatar.AlignmentEnums.TOP}
							userName={username}
						/>
						<Statistic title="余额" value={`${balance}元`}/>
						<Statistic title="奖金号" value={bonus}/>
					</div>
				</Container>
				{
					_renderPersonalInformation()
				}
				{
					type === AGENT ? _renderTeamInformation() : null
				}
				{
					_renderBankCards()
				}
			</div>
		);
	}

	componentDidMount() {
		const {
			userData,
			fetchUserBankCardsAction,
			fetchTeamStatsAction,
		} = this.props;
		const { type, } = userData;

		fetchUserBankCardsAction();

		if (type === AGENT) {
			fetchTeamStatsAction();
			this.fetchTeamStatsInterval = setInterval(fetchTeamStatsAction, FETCH_TEAM_STATS_INTERVAL);
		}
	}

	componentDidUpdate(prevProps) {
		const {
			notifyHandlingAction,
			updateNicknameLoadingStatus,
			updateGreetingLoadingStatus,
		} = this.props;

		if (prevProps.updateNicknameLoadingStatus === LOADING && updateNicknameLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('昵称修改成功'));
		}
		if (prevProps.updateGreetingLoadingStatus === LOADING && updateGreetingLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('问候语修改成功'));
		}
	}

	componentWillUnmount() {
		clearInterval(this.fetchTeamStatsInterval);
	}
}

function mapStateToProps(state) {
	return {
		userData: state.user.get('data').toObject(),
		usedWalletData: state.wallets.get('usedWalletData').toObject(),
		userBankCardsData: state.userBankCards.get('data').toArray(),
		teamStatsData: state.myTeam.stats.get('data').toObject(),
		updateNicknameLoadingStatus: state.user.get('updateNicknameLoadingStatus'),
		updateNicknameLoadingStatusMessage: state.user.get('updateNicknameLoadingStatusMessage'),
		updateGreetingLoadingStatus: state.user.get('updateGreetingLoadingStatus'),
		updateGreetingLoadingStatusMessage: state.user.get('updateGreetingLoadingStatusMessage'),
		userBankCardLoadingStatus: state.userBankCards.get('loadingStatus'),
		userBankCardLoadingStatusMessage: state.userBankCards.get('loadingStatusMessage'),
		teamStatsLoadingStatus: state.myTeam.stats.get('loadingStatus'),
		teamStatsLoadingStatusMessage: state.myTeam.stats.get('loadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		startUpdateUserNicknameAction: (password, nickname) => dispatch(startUpdateUserNicknameAction(password, nickname)),
		startUpdateUserGreetingAction: (password, greeting) => dispatch(startUpdateUserGreetingAction(password, greeting)),
		fetchUserBankCardsAction: () => dispatch(fetchUserBankCardsAction()),
		fetchTeamStatsAction: () => dispatch(fetchTeamStatsAction()),
	};
}

MemberInformationPage.propTypes = propTypes;
MemberInformationPage.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'updateNicknameLoadingStatus',
				loadingStatusMessage: 'updateNicknameLoadingStatusMessage',
			},
			{
				loadingStatus: 'updateGreetingLoadingStatus',
				loadingStatusMessage: 'updateGreetingLoadingStatusMessage',
			},
			{
				loadingStatus: 'userBankCardLoadingStatus',
				loadingStatusMessage: 'userBankCardLoadingStatusMessage',
			},
			{
				loadingStatus: 'teamStatsLoadingStatus',
				loadingStatusMessage: 'teamStatsLoadingStatusMessage',
			},
		],
		MemberInformationPage,
	)
);
