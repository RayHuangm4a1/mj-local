import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, LabelText, Button, Icon, Loading, Notify } from 'ljit-react-components';
import ResetPasswordButton from './modal-button/reset-password-button';
import ModifyLoginPasswordButton from './modal-button/modify-login-password-button';
import ModifyFundPasswordButton from './modal-button/modify-fund-password-button';
import ModifyBettingPasswordButton from './modal-button/modify-betting-password-button';
import SecurityQuestionsButton from './modal-button/security-questions-button';
import WechatButton from './modal-button/wechat-button';
import WechatQRCodeButton from './modal-button/wechat-qr-code-button';
import BindGoogleButton from './modal-button/bind-google-button';
import UnbindGoogleButton from './modal-button/unbind-google-button';
import GeoVerificationSwitchButton from './modal-button/geo-verification-switch-button';
import { connect } from 'ljit-store-connecter';
import {
	securityQuestionActions,
	userSecurityActions,
	userBankCardsAction,
} from '../../../../controller';
import { connectObservable, } from 'ljit-observable/react-observable';
import { EventEnum, LoadingStatusEnum, } from '../../../../lib/enums';
import { default as compose } from 'lodash/flowRight';
import { RouteKeyEnums } from '../../../../route-modals/member-center/routes';
import './style.styl';

const {
	fetchSecurityQuestionsAction,
} = securityQuestionActions;
const {
	enableLoginGeoValidationAction,
	disableLoginGeoValidationAction,
} = userSecurityActions;
const { fetchUserSecurityAction, } = userSecurityActions;
const {
	fetchUserBankCardsAction,
} = userBankCardsAction;

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const propTypes = {
	userBankCards: PropTypes.arrayOf(PropTypes.shape({
		payer: PropTypes.string,
	})),
	userSecurityData: PropTypes.shape({
		username: PropTypes.string,
		totp: PropTypes.shape({ isEnabled: PropTypes.bool }),
		wechat:PropTypes.shape({ isEnabled: PropTypes.bool }),
		betCredential: PropTypes.shape({ isEnabled: PropTypes.bool }),
		fundsCredential:PropTypes.shape({ isEnabled: PropTypes.bool }),
		finCredential:PropTypes.shape({ isEnabled: PropTypes.bool }),
		loginGeoValidation:PropTypes.shape({ isEnabled: PropTypes.bool }),
		lastLoginAudit: PropTypes.shape({
			_id: PropTypes.string,
			ip: PropTypes.string,
			geo: PropTypes.string,
			createdAt: PropTypes.string,
		}),
		securityQuestions: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
		})),
		numOfFailedLogin: PropTypes.number,
	}),
	userSecurityLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	userSecurityLoadingStatusMessage: PropTypes.string.isRequired,
	loginPasswordLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	loginPasswordLoadingStatusMessage: PropTypes.string.isRequired,
	betPasswordLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	betPasswordLoadingStatusMessage: PropTypes.string.isRequired,
	fundsPasswordLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	fundsPasswordLoadingStatusMessage: PropTypes.string.isRequired,
	disableLoginGeoValidationLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	disableLoginGeoValidationLoadingStatusMessage: PropTypes.string.isRequired,
	enableLoginGeoValidationLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	enableLoginGeoValidationLoadingStatusMessage: PropTypes.string.isRequired,
	notifyToChangeModalRoute: PropTypes.func.isRequired,
	enableLoginGeoValidationAction: PropTypes.func.isRequired,
	disableLoginGeoValidationAction: PropTypes.func.isRequired,
	bindGoogleAuthenticationLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	unbindGoogleAuthenticationLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	fetchSecurityQuestionsAction: PropTypes.func.isRequired,
	fetchUserSecurityAction: PropTypes.func.isRequired,
	fetchUserBankCardsAction: PropTypes.func.isRequired,
};

const defaultProps = {
	userSecurityData: {},
};

const {
	SizeEnums,
	IconTypeEnums,
} = Icon;

const {
	SMALL
} = SizeEnums;

const {
	LOCK_OUTLINE,
	EXCLAMATION_CIRCLE,
	BANK_CARD,
	WECHAT,
	GOOGLE_OUTLINE,
} = IconTypeEnums;

// TODO 與設計確認密碼之間的相依性
// 每一個 popup 確認是否要有驗證
class MemberSecurityPage extends Component {
	constructor() {
		super();

		this._handleSendSuccessNotify = this._handleSendSuccessNotify.bind(this);
		this._handleSendErrorNotify = this._handleSendErrorNotify.bind(this);
		this._handleRedirectToBankInformationPage = this._handleRedirectToBankInformationPage.bind(this);
		this._handleChangeGeoVerification = this._handleChangeGeoVerification.bind(this);
		this._renderLoginInfo = this._renderLoginInfo.bind(this);
		this._renderLoginPassword = this._renderLoginPassword.bind(this);
		this._renderFundsPassword = this._renderFundsPassword.bind(this);
		this._renderBettingPassword = this._renderBettingPassword.bind(this);
		this._renderSecurityQuestions = this._renderSecurityQuestions.bind(this);
		this._renderBankCard = this._renderBankCard.bind(this);
		this._renderWechatBinding = this._renderWechatBinding.bind(this);
		this._renderRemoteVerification = this._renderRemoteVerification.bind(this);
		this._renderGoogleAuth = this._renderGoogleAuth.bind(this);
	}
	_handleRedirectToBankInformationPage() {
		const { notifyToChangeModalRoute, } = this.props;

		return notifyToChangeModalRoute(RouteKeyEnums.MEMBER_BANK_INFORMATION);
	}
	_handleChangeGeoVerification(isEnable, payer) {
		const {
			enableLoginGeoValidationAction,
			disableLoginGeoValidationAction,
		} = this.props;

		if (isEnable) {
			enableLoginGeoValidationAction();
		} else {
			disableLoginGeoValidationAction(payer);
		}
	}
	_handleSendSuccessNotify(prevStatus, nowStatus, message) {
		if (prevStatus === LOADING && nowStatus === SUCCESS) {
			Notify.success(message, 5000);
		}
	}

	_handleSendErrorNotify(prevStatus, nowStatus, message) {
		if (prevStatus === LOADING && nowStatus === FAILED) {
			Notify.error(message, 5000);
		}
	}

	_renderLoginInfo() {
		const { userSecurityData: { lastLoginAudit, }, } = this.props;
		const { ip, geo, createdAt } = lastLoginAudit;

		return (
			<div className="ljit-member-security__login-info">
				<div>
					<LabelText
						label="最近登陆 IP :"
						text={ip}
						labelColType={LabelText.SizeEnums.MEDIUM}
						fontSize={LabelText.SizeEnums.MEDIUM}
					/>
					<LabelText
						label="最近登陆时间 :"
						text={createdAt}
						labelColType={LabelText.SizeEnums.MEDIUM}
						fontSize={LabelText.SizeEnums.MEDIUM}
					/>
					<LabelText
						label="最近登陆地址 :"
						text={geo}
						labelColType={LabelText.SizeEnums.MEDIUM}
						fontSize={LabelText.SizeEnums.MEDIUM}
					/>
				</div>
				<ResetPasswordButton/>
			</div>
		);
	}
	_renderLoginPassword() {
		return (
			<React.Fragment>
				<ListItem
					title={(
						<div>
							<Icon
								type={LOCK_OUTLINE}
								size={SMALL}
							/>
								登錄密碼
						</div>
					)}
					description="建议使用字母、数字、混合大小写、特殊符号等进行组合，尽量不要使用单一的字母或数字作为密码，设置的密码长度越长越安全。"
					right={
						<div>
							<ModifyLoginPasswordButton/>
						</div>
					}
				/>
			</React.Fragment>
		);
	}
	_renderFundsPassword() {
		return (
			<React.Fragment>
				<ListItem
					title={(
						<div>
							<Icon
								type={LOCK_OUTLINE}
								size={SMALL}
							/>
								資金密碼
						</div>
					)}
					description="在进行银行卡绑定、转账、提款等使用资金操作需要进行的资金密码确认，以提高您的资金安全性。"
					right={
						<div>
							<ModifyFundPasswordButton/>
						</div>
					}
				/>
			</React.Fragment>
		);
	}
	_renderBettingPassword() {
		return (
			<React.Fragment>
				<ListItem
					title={(
						<div>
							<Icon
								type={LOCK_OUTLINE}
								size={SMALL}
							/>
								投注密碼
						</div>
					)}
					description="在进行游戏时，第一次操作需要进行的投注密码确认，以提高您的资金安全性。"
					right={
						<div>
							<ModifyBettingPasswordButton/>
						</div>
					}
				/>
			</React.Fragment>
		);
	}
	_renderSecurityQuestions() {
		const {
			userSecurityData: {
				securityQuestions = [],
			},
		} = this.props;
		const isSetting = securityQuestions.length > 0 ;
		const button = (
			<SecurityQuestionsButton
				isDisabled={isSetting}
			/>
		);

		function questions() {
			return (
				<React.Fragment>
					<div>当忘记密码后可以使用安全问题来重置您的新密码。</div>
					{
						securityQuestions.map((item, index) => (
							<div
								key={`${item.id}`}
								className="ljit-member-security__security-question"
							>
								已設置的安全问题{index+1}：{item.name}
							</div>
						))
					}
				</React.Fragment>
			);
		}

		return (
			<React.Fragment>
				<ListItem
					title={(
						<div>
							<Icon
								type={EXCLAMATION_CIRCLE}
								size={SMALL}
							/>
								安全问题
						</div>
					)}
					content={isSetting ? '' : '未设定'}
					description={questions()}
					right={button}
				/>
			</React.Fragment>
		);
	}
	_renderBankCard() {
		const {
			userSecurityData: {
				finCredential = {},
			},
		} = this.props;
		const { isEnabled, } = finCredential;
		const { _handleRedirectToBankInformationPage, } = this;

		// TODO redirect to bank card page
		return (
			<React.Fragment>
				<ListItem
					title={(
						<div>
							<Icon
								type={BANK_CARD}
								size={SMALL}
							/>
								銀行卡
						</div>
					)}
					content={isEnabled ? '已设定' : '未设定'}
					description="定银行卡后，您可以快速的通过绑定后的银行卡进行充值、转账、提款等使用资金。"
					right={
						<div>
							<Button
								onClick={_handleRedirectToBankInformationPage}
								outline={Button.OutlineEnums.HOLLOW}
							>设定</Button>
						</div>
					}
				/>
			</React.Fragment>
		);
	}
	_renderWechatBinding() {
		const { userSecurityData: { wechat = {}, }, } = this.props;
		const { isEnabled, } = wechat;

		let data = {
			content: '未綁定',
			button: <WechatButton/>
		};

		if (isEnabled) {
			data = {
				content: <span className="ljit-member-security__text-binding">
					{/* TODO show covered wechat account */}
						已綁定微信号：*****
				</span>,
				button: <WechatQRCodeButton/>
			};
		}
		const { content, button } = data;

		return (
			<React.Fragment>
				<ListItem
					title={(
						<div>
							<Icon
								type={WECHAT}
								size={SMALL}
							/>
								微信绑定
						</div>
					)}
					content={content}
					description="微信绑定后可以让用户直接使用手机微信进行扫一扫进行快速授权认证登录。"
					right={
						<div>
							{button}
						</div>
					}
				/>
			</React.Fragment>
		);
	}
	_renderRemoteVerification() {
		const {
			userSecurityData: {
				loginGeoValidation = {},
			},
			userBankCards,
		} = this.props;
		const { isEnabled, } = loginGeoValidation;
		const {
			_handleChangeGeoVerification,
			_handleRedirectToBankInformationPage
		} = this;
		const hasBoundBankCard = confirmHasBoundBankCard(userBankCards);

		return (
			<React.Fragment>
				<ListItem
					title={(
						<div>
							<Icon
								type={EXCLAMATION_CIRCLE}
								size={SMALL}
							/>
								异地登录验证
						</div>
					)}
					titleHint="绑定银行卡该功能才可用"
					content={isEnabled ? '开启中' : '未开启'}
					description="防止帐号被盗用，保护帐户安全"
					right={
						<GeoVerificationSwitchButton
							isGeoVerification={isEnabled}
							onToggleSwitch={_handleChangeGeoVerification}
							hasBoundBankCard={hasBoundBankCard}
							onVerifyUserBankCardFailed={_handleRedirectToBankInformationPage}
						/>
					}
				/>
			</React.Fragment>
		);
	}

	_renderGoogleAuth() {
		const {
			userSecurityData: {
				totp = {},
			},
		} = this.props;
		const { isEnabled, } = totp;

		let data = {
			content: '未綁定',
			button: <BindGoogleButton />,
		};

		if (isEnabled) {
			data = {
				content: (
					<span className="ljit-member-security__text-binding">
						已綁定
					</span>
				),
				button: <UnbindGoogleButton />,
			};
		}
		const { content, button, } = data;

		return (
			<React.Fragment>
				<ListItem
					title={(
						<div>
							<Icon
								type={GOOGLE_OUTLINE}
								size={SMALL}
							/>
							谷歌身份认证
						</div>
					)}
					content={content}
					description="当修改密码或绑定安全问题以及申请谷歌身份验证时，都必须先绑定安全邮箱后才能操作。"
					right={(
						<div>
							{button}
						</div>
					)}
				/>
			</React.Fragment>
		);
	}

	render() {
		const { userSecurityLoadingStatus, } = this.props;
		const {
			_renderLoginInfo,
			_renderLoginPassword,
			_renderFundsPassword,
			_renderBettingPassword,
			_renderSecurityQuestions,
			_renderBankCard,
			_renderWechatBinding,
			_renderRemoteVerification,
			_renderGoogleAuth,
		} = this;

		if (userSecurityLoadingStatus === NONE || userSecurityLoadingStatus === LOADING) {
			return <Loading />;
		}

		return (
			<div className="ljit-member-security">
				{_renderLoginInfo()}
				<div className="ljit-member-security__container">
					{_renderLoginPassword()}
					{_renderFundsPassword()}
					{_renderBettingPassword()}
					{_renderSecurityQuestions()}
					{_renderBankCard()}
					{_renderWechatBinding()}
					{_renderRemoteVerification()}
					{_renderGoogleAuth()}
				</div>
			</div>
		);
	}

	componentDidMount() {
		const {
			fetchSecurityQuestionsAction,
			fetchUserSecurityAction,
			fetchUserBankCardsAction,
		} = this.props;

		fetchSecurityQuestionsAction();
		fetchUserSecurityAction();
		fetchUserBankCardsAction();
	}

	componentDidUpdate(prevProps) {
		const {
			userSecurityLoadingStatus,
			userSecurityLoadingStatusMessage,
			loginPasswordLoadingStatus,
			loginPasswordLoadingStatusMessage,
			betPasswordLoadingStatus,
			betPasswordLoadingStatusMessage,
			fundsPasswordLoadingStatus,
			fundsPasswordLoadingStatusMessage,
			enableLoginGeoValidationLoadingStatus,
			enableLoginGeoValidationLoadingStatusMessage,
			disableLoginGeoValidationLoadingStatus,
			disableLoginGeoValidationLoadingStatusMessage,
			bindGoogleAuthenticationLoadingStatus,
			unbindGoogleAuthenticationLoadingStatus,
		} = this.props;
		const {
			_handleSendSuccessNotify,
			_handleSendErrorNotify,
		} = this;

		_handleSendErrorNotify(prevProps.userSecurityLoadingStatus, userSecurityLoadingStatus, userSecurityLoadingStatusMessage);

		_handleSendSuccessNotify(prevProps.loginPasswordLoadingStatus, loginPasswordLoadingStatus, '登入密码修改成功');
		_handleSendErrorNotify(prevProps.loginPasswordLoadingStatus, loginPasswordLoadingStatus, loginPasswordLoadingStatusMessage);

		_handleSendSuccessNotify(prevProps.betPasswordLoadingStatus, betPasswordLoadingStatus, '投注密码修改成功');
		_handleSendErrorNotify(prevProps.betPasswordLoadingStatus, betPasswordLoadingStatus, betPasswordLoadingStatusMessage);

		_handleSendSuccessNotify(prevProps.fundsPasswordLoadingStatus, fundsPasswordLoadingStatus, '资金密码修改成功');
		_handleSendErrorNotify(prevProps.fundsPasswordLoadingStatus, fundsPasswordLoadingStatus, fundsPasswordLoadingStatusMessage);

		_handleSendSuccessNotify(prevProps.bindGoogleAuthenticationLoadingStatus, bindGoogleAuthenticationLoadingStatus, '谷歌身份认证绑定成功');
		_handleSendSuccessNotify(prevProps.unbindGoogleAuthenticationLoadingStatus, unbindGoogleAuthenticationLoadingStatus, '谷歌身份认证解绑成功');

		_handleSendSuccessNotify(prevProps.enableLoginGeoValidationLoadingStatus, enableLoginGeoValidationLoadingStatus, '异地登录验证开启成功');
		_handleSendErrorNotify(prevProps.enableLoginGeoValidationLoadingStatus, enableLoginGeoValidationLoadingStatus, enableLoginGeoValidationLoadingStatusMessage);

		_handleSendSuccessNotify(prevProps.disableLoginGeoValidationLoadingStatus, disableLoginGeoValidationLoadingStatus, '异地登录验证关闭成功');
		_handleSendErrorNotify(prevProps.disableLoginGeoValidationLoadingStatus, disableLoginGeoValidationLoadingStatus, disableLoginGeoValidationLoadingStatusMessage);
	}
}

MemberSecurityPage.propTypes = propTypes;
MemberSecurityPage.defaultProps = defaultProps;

function confirmHasBoundBankCard(userBankCards = []) {
	return Boolean(userBankCards.length ? userBankCards[0].payer : '');
}

function mapNotifyToProps(notify) {
	return {
		notifyToChangeModalRoute: (data) => notify(EventEnum.CHANGE_MEMBER_CENTER_ROUTE, data),
	};
}

function mapStateToProps(state) {
	return {
		userBankCards: state.userBankCards.get('data').toArray(),
		userSecurityData: state.userSecurity.get('data').toObject(),
		userSecurityLoadingStatus: state.userSecurity.get('loadingStatus'),
		userSecurityLoadingStatusMessage: state.userSecurity.get('loadingStatusMessage'),
		loginPasswordLoadingStatus: state.userSecurity.get('loginPasswordLoadingStatus'),
		loginPasswordLoadingStatusMessage: state.userSecurity.get('loginPasswordLoadingStatusMessage'),
		betPasswordLoadingStatus: state.userSecurity.get('betPasswordLoadingStatus'),
		betPasswordLoadingStatusMessage: state.userSecurity.get('betPasswordLoadingStatusMessage'),
		fundsPasswordLoadingStatus: state.userSecurity.get('fundsPasswordLoadingStatus'),
		fundsPasswordLoadingStatusMessage: state.userSecurity.get('fundsPasswordLoadingStatusMessage'),
		enableLoginGeoValidationLoadingStatus: state.userSecurity.get('enableLoginGeoValidationLoadingStatus'),
		enableLoginGeoValidationLoadingStatusMessage: state.userSecurity.get('enableLoginGeoValidationLoadingStatusMessage'),
		disableLoginGeoValidationLoadingStatus: state.userSecurity.get('disableLoginGeoValidationLoadingStatus'),
		disableLoginGeoValidationLoadingStatusMessage: state.userSecurity.get('disableLoginGeoValidationLoadingStatusMessage'),
		bindGoogleAuthenticationLoadingStatus: state.userSecurity.get('bindGoogleAuthenticationLoadingStatus'),
		unbindGoogleAuthenticationLoadingStatus: state.userSecurity.get('unbindGoogleAuthenticationLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchSecurityQuestionsAction: () => dispatch(fetchSecurityQuestionsAction()),
		enableLoginGeoValidationAction: () => dispatch(enableLoginGeoValidationAction()),
		disableLoginGeoValidationAction: (payer) => dispatch(disableLoginGeoValidationAction(payer)),
		fetchUserSecurityAction: () => dispatch(fetchUserSecurityAction()),
		fetchUserBankCardsAction: () => dispatch(fetchUserBankCardsAction())
	};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	connectObservable(mapNotifyToProps)
)(MemberSecurityPage);
