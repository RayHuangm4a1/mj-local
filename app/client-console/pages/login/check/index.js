import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect, } from 'ljit-store-connecter';
import { Form, FormItem, Input, Icon, Button, } from 'ljit-react-components';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../lib/notify-handler';
import CardInkbarTabs from '../../../components/card-inkbar-tabs';
import ClientMessageModal from '../../../components/client-message-modal';
import { RouteKeyEnums, } from '../../../route';
import { authActions, } from '../../../controller';
import { LoadingStatusEnum, } from '../../../lib/enums';
import ResetPasswordModal from './reset-password-modal';
import FirstTimeLoginModifyPasswordModal from './first-time-login-modify-password-modal';
import GeoValidationModal from './geo-validation-modal';
import LoginLogo from '../login-logo';
import { ResetTypeEnums, } from './utils';

const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;
const { SECURITY_QUESTIONS, GOOGLE_TOTP, } = ResetTypeEnums;

const {
	fetchCaptchaAction,
	updateDefaultPasswordAction,
	checkCaptchaAction,
	setIsGeoValidation,
	loginViaGoogleTotpAction,
	geoValidateWithPayerAction,
	fetchPasswordResetMethodsAction,
	resetPasswordViaSecurityQuestionsAction,
	resetPasswordViaGoogleTotpAction,
} = authActions;
const { Success, } = notifications.successNotifications;

const propTypes = {
	passwordResetMethods: PropTypes.shape({
		[SECURITY_QUESTIONS]: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.number,
			question: PropTypes.string,
		})),
		[GOOGLE_TOTP]: PropTypes.bool,
	}).isRequired,
	authData: PropTypes.shape({
		username: PropTypes.string,
	}),
	captcha: PropTypes.string.isRequired,
	isFirstTimeLogin: PropTypes.bool.isRequired,
	onNavigate: PropTypes.func.isRequired,
	fetchCaptchaAction: PropTypes.func.isRequired,
	checkCaptchaAction: PropTypes.func.isRequired,
	geoValidateLoadingStatus: PropTypes.number.isRequired,
	geoValidateLoadingStatusMessage: PropTypes.string.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	setIsGeoValidation: PropTypes.func.isRequired,
	isGeoValidation: PropTypes.bool.isRequired,
	geoValidateWithPayerAction: PropTypes.func.isRequired,
	updateDefaultPasswordAction: PropTypes.func.isRequired,
	fetchPasswordResetMethodsAction: PropTypes.func.isRequired,
	resetPasswordViaSecurityQuestionsAction: PropTypes.func.isRequired,
	resetPasswordViaGoogleTotpAction: PropTypes.func.isRequired,
	checkCaptchaLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	checkCaptchaLoadingStatusMessage: PropTypes.string.isRequired,
	fetchPasswordResetMethodsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	fetchPasswordResetMethodsLoadingStatusMessage: PropTypes.string.isRequired,
	updateDefaultPasswordLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	updateDefaultPasswordLoadingStatusMessage: PropTypes.string.isRequired,
	passwordResetViaSecurityQuestionsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	passwordResetViaSecurityQuestionsLoadingStatusMessage: PropTypes.string.isRequired,
	passwordResetViaGoogleTotpLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	passwordResetViaGoogleTotpLoadingStatusMessage: PropTypes.string.isRequired,
	loginViaGoogleTotpAction: PropTypes.func.isRequired,
	loginViaGoogleTotpLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	loginViaGoogleTotpLoadingStatusMessage: PropTypes.string.isRequired,
};
const defaultProps = {};
const {
	HOME,
	LOGIN_CONFIRMED,
	LOGIN_ACCOUNT_FREEZED,
} = RouteKeyEnums;
const {
	USER_OUTLINE,
	GOOGLE_OUTLINE,
	SAFETY_OUTLINE,
	WECHAT,
} = Icon.IconTypeEnums;
const {
	USERNAME,
	GOOGLE_PASSWORD,
} = GeoValidationModal.GeoValidationTypeEnum;

const tabKeyEnum = {
	KEY_ACCOUNT: 'account',
	KEY_GOOGLE: 'google',
	KEY_WECHAT: 'wechat',
};

const {
	KEY_ACCOUNT,
	KEY_GOOGLE,
	KEY_WECHAT,
} = tabKeyEnum;

const PREFIX_CLASS = 'client-login';

class LoginCheckPage extends Component {
	constructor() {
		super();
		this.state = {
			activeKey: KEY_ACCOUNT,
			isResetPasswordModalVisible: false,
			isShowMessageModal: false,
			isFirstTimeLoginModifyPasswordModalVisible: false,
			message: '',
		};

		this.formInstance = {
			[KEY_ACCOUNT]: null,
			[KEY_GOOGLE]: null,
		};
		this._handleFetchPasswordResetMethods = this._handleFetchPasswordResetMethods.bind(this);
		this._handleCloseResetPasswordModal = this._handleCloseResetPasswordModal.bind(this);
		this._handleResetPassword = this._handleResetPassword.bind(this);
		this._handleClickFirstTimeLoginModifyPasswordModalOk = this._handleClickFirstTimeLoginModifyPasswordModalOk.bind(this);
		this._handleClickFirstTimeLoginModifyPasswordModalCancel = this._handleClickFirstTimeLoginModifyPasswordModalCancel.bind(this);
		this._handleCloseErrorMessageModal = this._handleCloseErrorMessageModal.bind(this);
		this._handleLoginViaAccount = this._handleLoginViaAccount.bind(this);
		this._handleLoginViaGoogleTotp = this._handleLoginViaGoogleTotp.bind(this);
		this._handleClickGeoValidateModalOk = this._handleClickGeoValidateModalOk.bind(this);
		this._handleCheckCaptchaLoadingStatus = this._handleCheckCaptchaLoadingStatus.bind(this);
		this._handleFetchPasswordResetMethodsLoadingStatus = this._handleFetchPasswordResetMethodsLoadingStatus.bind(this);
		this._handleIsPasswordResetViaSecurityQuestionsLoadingStatus = this._handleIsPasswordResetViaSecurityQuestionsLoadingStatus.bind(this);
		this._handleIsPasswordResetViaGoogleTotpLoadingStatus = this._handleIsPasswordResetViaGoogleTotpLoadingStatus.bind(this);
		this._handleUpdateDefaultPasswordLoadingStatus = this._handleUpdateDefaultPasswordLoadingStatus.bind(this);
		this._handleLoginViaGoogleTotpLoadingStatus = this._handleLoginViaGoogleTotpLoadingStatus.bind(this);
		this._handleGeoValidateLoadingStatus = this._handleGeoValidateLoadingStatus.bind(this);
		this._resetLoginForm = this._resetLoginForm.bind(this);
		this._renderFreezeAccountLink = this._renderFreezeAccountLink.bind(this);
	}

	_handleFetchPasswordResetMethods() {
		const { fetchPasswordResetMethodsAction, } = this.props;
		const form = this.formInstance[KEY_ACCOUNT].getForm();

		form.validateFields((err, values) => {
			const {
				username,
				captcha,
			} = values;

			if (!err) {
				fetchPasswordResetMethodsAction(username, captcha);
			}
		});
	}

	_handleCloseResetPasswordModal() {
		this.setState({ isResetPasswordModalVisible: false, });
	}

	_handleResetPassword(data) {
		const {
			resetPasswordViaSecurityQuestionsAction,
			resetPasswordViaGoogleTotpAction,
		} = this.props;

		const { type, } = data;

		if (type === SECURITY_QUESTIONS) {
			const { newPassword, ...rest } = data;

			let answers = { ...rest };

			const securityQuestionAnswers = Object.keys(answers).map(answer => {
				const id = parseInt(answer.replace(/question/, ''), 10);

				return {
					id: id,
					answer: answers[answer],
				};
			});

			resetPasswordViaSecurityQuestionsAction(securityQuestionAnswers, newPassword);
		}

		if (type === GOOGLE_TOTP) {
			const { totp, newPassword, } = data;

			resetPasswordViaGoogleTotpAction(totp, newPassword);
		}

		this._handleCloseResetPasswordModal();
	}

	_handleClickFirstTimeLoginModifyPasswordModalOk(values = {}) {
		const { password, newPassword, confirmedPassword, } = values;

		this.props.updateDefaultPasswordAction(password, newPassword, confirmedPassword);
	}

	_handleClickFirstTimeLoginModifyPasswordModalCancel() {
		this.setState({ isFirstTimeLoginModifyPasswordModalVisible: false, });
	}

	_handleCloseErrorMessageModal() {
		const { _resetLoginForm } = this;

		_resetLoginForm();

		this.setState({ isShowMessageModal: false, });
	}

	_handleLoginViaAccount(e) {
		e.preventDefault();
		const form = this.formInstance[KEY_ACCOUNT].getForm();

		form.validateFields((err, values) => {
			const { username, captcha, } = values;

			if (!err) {
				this.props.checkCaptchaAction(username, captcha);
			}
		});
	}

	_handleLoginViaGoogleTotp(e) {
		e.preventDefault();
		const form = this.formInstance[KEY_GOOGLE].getForm();

		form.validateFields((err, values) => {
			const { username, totp, } = values;

			if (!err) {
				this.props.loginViaGoogleTotpAction(username, totp);
			}
		});
	}

	_handleClickGeoValidateModalOk({ type, inputValue, }) {
		const {
			authData: { username, },
			loginViaGoogleTotpAction,
			geoValidateWithPayerAction,
		} = this.props;

		if (type === GOOGLE_PASSWORD) {
			loginViaGoogleTotpAction(username, inputValue);
		} else if (type === USERNAME) {
			geoValidateWithPayerAction(inputValue);
		}
	}

	_handleCheckCaptchaLoadingStatus() {
		const {
			onNavigate,
			checkCaptchaLoadingStatus,
			checkCaptchaLoadingStatusMessage,
			isFirstTimeLogin,
		} = this.props;

		if (checkCaptchaLoadingStatus === SUCCESS) {
			onNavigate(LOGIN_CONFIRMED);
		} else if (checkCaptchaLoadingStatus === FAILED) {
			if (isFirstTimeLogin) {
				this.setState({ isFirstTimeLoginModifyPasswordModalVisible: true, });
			} else {
				this.setState({
					isShowMessageModal: true,
					message: checkCaptchaLoadingStatusMessage,
				});
			}
		}
	}

	_handleFetchPasswordResetMethodsLoadingStatus() {
		const {
			fetchPasswordResetMethodsLoadingStatus,
			fetchPasswordResetMethodsLoadingStatusMessage,
		} = this.props;

		if (fetchPasswordResetMethodsLoadingStatus === SUCCESS) {
			this.setState({
				isResetPasswordModalVisible: true,
			});
		}
		if (fetchPasswordResetMethodsLoadingStatus === FAILED) {
			this.setState({
				isShowMessageModal: true,
				message: fetchPasswordResetMethodsLoadingStatusMessage,
			});
		}
	}

	_handleIsPasswordResetViaSecurityQuestionsLoadingStatus() {
		const {
			passwordResetViaSecurityQuestionsLoadingStatus,
			passwordResetViaSecurityQuestionsLoadingStatusMessage
		} = this.props;

		if (passwordResetViaSecurityQuestionsLoadingStatus === FAILED) {
			this.setState({
				isShowMessageModal: true,
				message: passwordResetViaSecurityQuestionsLoadingStatusMessage,
			});
		}

		if (passwordResetViaSecurityQuestionsLoadingStatus === SUCCESS) {
			this.setState({
				isShowMessageModal: true,
				message: '登入密码修改成功',
			});
		}
	}

	_handleIsPasswordResetViaGoogleTotpLoadingStatus() {
		const {
			passwordResetViaGoogleTotpLoadingStatus,
			passwordResetViaGoogleTotpLoadingStatusMessage
		} = this.props;

		if (passwordResetViaGoogleTotpLoadingStatus === FAILED) {
			this.setState({
				isShowMessageModal: true,
				message: passwordResetViaGoogleTotpLoadingStatusMessage,
			});
		}

		if (passwordResetViaGoogleTotpLoadingStatus === SUCCESS) {
			this.setState({
				isShowMessageModal: true,
				message: '登入密码修改成功',
			});
		}
	}

	_handleUpdateDefaultPasswordLoadingStatus() {
		const {
			updateDefaultPasswordLoadingStatus,
			updateDefaultPasswordLoadingStatusMessage,
		} = this.props;

		if (updateDefaultPasswordLoadingStatus === SUCCESS) {
			this.setState({
				isFirstTimeLoginModifyPasswordModalVisible: false,
				isShowMessageModal: true,
				message: '初次修改登录密码成功！'
			});
		} else if (updateDefaultPasswordLoadingStatus === FAILED) {
			this.setState({
				isShowMessageModal: true,
				message: updateDefaultPasswordLoadingStatusMessage
			});
		}
	}
	_handleGeoValidateLoadingStatus() {
		const {
			setIsGeoValidation,
			geoValidateLoadingStatus,
			notifyHandlingAction,
			onNavigate,
		} = this.props;

		if (geoValidateLoadingStatus === SUCCESS) {
			setIsGeoValidation(false);
			notifyHandlingAction(new Success('帐户安全验证成功'));
			onNavigate(LOGIN_CONFIRMED);
		}
	}

	_handleLoginViaGoogleTotpLoadingStatus() {
		const {
			onNavigate,
			loginViaGoogleTotpLoadingStatus,
			loginViaGoogleTotpLoadingStatusMessage,
		} = this.props;

		if (loginViaGoogleTotpLoadingStatus === SUCCESS) {
			onNavigate(HOME);
		} else if (loginViaGoogleTotpLoadingStatus === FAILED) {
			this.setState({
				isShowMessageModal: true,
				message: loginViaGoogleTotpLoadingStatusMessage,
			});
		}
	}

	_resetLoginForm() {
		const { props, state, formInstance, } = this;
		const form = formInstance[state.activeKey].getForm();

		form.resetFields();
		props.fetchCaptchaAction();
	}

	_renderFreezeAccountLink() {
		const { onNavigate, } = this.props;

		return (
			<p
				className="account-freeze"
				onClick={() => onNavigate(LOGIN_ACCOUNT_FREEZED)}
			>
				帐号被盗？点击这里紧急冻结
			</p>
		);
	}

	render() {
		const {
			props,
			state,
			_handleLoginViaAccount,
			_handleLoginViaGoogleTotp,
			_handleResetPassword,
			_renderFreezeAccountLink,
			_handleClickGeoValidateModalOk,
			_handleCloseResetPasswordModal,
			_handleClickFirstTimeLoginModifyPasswordModalCancel,
			_handleClickFirstTimeLoginModifyPasswordModalOk,
			_handleCloseErrorMessageModal,
			_handleFetchPasswordResetMethods,
		} = this;
		const {
			isResetPasswordModalVisible,
			activeKey,
			isShowMessageModal,
			isFirstTimeLoginModifyPasswordModalVisible,
			message,
		} = state;
		const {
			captcha,
			isGeoValidation,
			setIsGeoValidation,
			passwordResetMethods,
			fetchCaptchaAction,
		} = props;
		const captchaImg = captcha ? generateSVG(captcha) : null;

		return (
			<Fragment>
				<div className={cx(PREFIX_CLASS, 'login-page__container')}>
					<LoginLogo />
					<CardInkbarTabs
						className={`${PREFIX_CLASS}__tabs`}
						activeKey={activeKey}
						onChange={tabKey => this.setState({ activeKey: tabKey, })}
					>
						<CardInkbarTabs.TabPane
							key={KEY_ACCOUNT}
							tab={<span><Icon type={USER_OUTLINE} />帐密登入</span>}
						>
							<Form
								ref={(refForm) => this.formInstance[KEY_ACCOUNT] = refForm}
								submitText="开始登录"
								cancelButtonDisabled
								onSubmit={_handleLoginViaAccount}
							>
								<FormItem
									itemName="username"
									itemConfig={{
										rules: [
											{
												required: true,
												message: '用户名不能为空',
											},
										],
									}}
								>
									<Input
										prefix={<Icon type={USER_OUTLINE} size={Icon.SizeEnums.X_SMALL} />}
										placeholder="请输入用户名"
									/>
								</FormItem>
								<FormItem
									itemName="captcha"
									itemConfig={{
										rules: [
											{
												required: true,
												message: '验证码不能为空',
											},
										],
									}}
								>
									<Input
										prefix={<Icon type={SAFETY_OUTLINE} size={Icon.SizeEnums.X_SMALL} />}
										placeholder="验证码"
										suffix={
											<span
												className="ant-input-suffix__svg"
												dangerouslySetInnerHTML={captchaImg}
												onClick={() => fetchCaptchaAction()}
											/>
										}
									/>
								</FormItem>
							</Form>
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								isFullWidth={true}
								onClick={_handleFetchPasswordResetMethods}
								className={`${PREFIX_CLASS}__btn-reset-password`}
							>
								忘记密码
							</Button>
							{_renderFreezeAccountLink()}
						</CardInkbarTabs.TabPane>
						<CardInkbarTabs.TabPane
							key={KEY_GOOGLE}
							tab={<span><Icon type={GOOGLE_OUTLINE} />谷歌登入</span>}
							className={`${PREFIX_CLASS}__tab-google`}
						>
							<Form
								ref={(refForm) => this.formInstance[KEY_GOOGLE] = refForm }
								submitText="开始登录"
								cancelButtonDisabled
								onSubmit={_handleLoginViaGoogleTotp}
							>
								<FormItem
									itemName="username"
									itemConfig={{
										rules: [
											{
												required: true,
												message: '用户名不能为空',
											},
										],
									}}
								>
									<Input
										prefix={<Icon type={USER_OUTLINE} size={Icon.SizeEnums.X_SMALL} />}
										placeholder="请输入用户名"
									/>
								</FormItem>
								<FormItem
									key="totp"
									itemName="totp"
									itemConfig={{
										rules: [
											{
												required: true,
												message: '谷歌动态码不能为空',
											},
										],
									}}
								>
									<Input
										prefix={<Icon type={GOOGLE_OUTLINE} size={Icon.SizeEnums.X_SMALL} />}
										placeholder="请输入谷歌动态码"
									/>
								</FormItem>
							</Form>
							{_renderFreezeAccountLink()}
						</CardInkbarTabs.TabPane>
						<CardInkbarTabs.TabPane
							key={KEY_WECHAT}
							tab={
								<span className="wechat-icon-wrap">
									<Icon type={WECHAT} />
									微信登入
								</span>
							}
						>
							{/* TODO: 實作微信登入 */}
							微信登入
						</CardInkbarTabs.TabPane>
					</CardInkbarTabs>
					<ResetPasswordModal
						loginType={activeKey}
						isModalVisible={isResetPasswordModalVisible}
						onClickOk={_handleResetPassword}
						onCancel={_handleCloseResetPasswordModal}
						passwordResetMethods={passwordResetMethods}
					/>
					<FirstTimeLoginModifyPasswordModal
						isVisible={isFirstTimeLoginModifyPasswordModalVisible}
						onClickCancel={_handleClickFirstTimeLoginModifyPasswordModalCancel}
						onClickOk={_handleClickFirstTimeLoginModifyPasswordModalOk}
					/>
				</div>
				<ClientMessageModal
					className="client-login__message-modal"
					message={message}
					isVisible={isShowMessageModal}
					isCentered={false}
					isHideCancelButton
					onClickOk={_handleCloseErrorMessageModal}
				/>
				<GeoValidationModal
					isVisible={isGeoValidation}
					onClickOk={_handleClickGeoValidateModalOk}
					onClickCancel={() => setIsGeoValidation(false)}
				/>
			</Fragment>
		);
	}

	componentDidMount() {
		const { fetchCaptchaAction } = this.props;

		fetchCaptchaAction();
	}

	componentDidUpdate(prevProps) {
		const {
			_handleCheckCaptchaLoadingStatus,
			_handleFetchPasswordResetMethodsLoadingStatus,
			_handleIsPasswordResetViaSecurityQuestionsLoadingStatus,
			_handleIsPasswordResetViaGoogleTotpLoadingStatus,
			_handleUpdateDefaultPasswordLoadingStatus,
			_handleLoginViaGoogleTotpLoadingStatus,
			_handleGeoValidateLoadingStatus,
		} = this;

		if (prevProps.checkCaptchaLoadingStatus === LOADING) {
			_handleCheckCaptchaLoadingStatus();
		}

		if (prevProps.fetchPasswordResetMethodsLoadingStatus === LOADING) {
			_handleFetchPasswordResetMethodsLoadingStatus();
		}

		if (prevProps.passwordResetViaSecurityQuestionsLoadingStatus === LOADING) {
			_handleIsPasswordResetViaSecurityQuestionsLoadingStatus();
		}

		if (prevProps.passwordResetViaGoogleTotpLoadingStatus === LOADING) {
			_handleIsPasswordResetViaGoogleTotpLoadingStatus();
		}

		if (prevProps.updateDefaultPasswordLoadingStatus === LOADING) {
			_handleUpdateDefaultPasswordLoadingStatus();
		}

		if (prevProps.loginViaGoogleTotpLoadingStatus === LOADING) {
			_handleLoginViaGoogleTotpLoadingStatus();
		}

		if (prevProps.geoValidateLoadingStatus === LOADING) {
			_handleGeoValidateLoadingStatus();
		}
	}
}

LoginCheckPage.propTypes = propTypes;
LoginCheckPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		captcha: state.auth.get('captcha'),
		authData: state.auth.get('data').toObject(),
		isGeoValidation: state.auth.get('isGeoValidation'),
		checkCaptchaLoadingStatus: state.auth.get('checkCaptchaLoadingStatus'),
		checkCaptchaLoadingStatusMessage: state.auth.get('checkCaptchaLoadingStatusMessage'),
		loginViaGoogleTotpLoadingStatus: state.auth.get('loginViaGoogleTotpLoadingStatus'),
		loginViaGoogleTotpLoadingStatusMessage: state.auth.get('loginViaGoogleTotpLoadingStatusMessage'),
		geoValidateLoadingStatus: state.auth.get('geoValidateLoadingStatus'),
		geoValidateLoadingStatusMessage: state.auth.get('geoValidateLoadingStatusMessage'),
		isFirstTimeLogin: state.auth.get('isFirstTimeLogin'),
		updateDefaultPasswordLoadingStatus: state.auth.get('updateDefaultPasswordLoadingStatus'),
		updateDefaultPasswordLoadingStatusMessage: state.auth.get('updateDefaultPasswordLoadingStatusMessage'),
		fetchPasswordResetMethodsLoadingStatus: state.auth.get('fetchPasswordResetMethodsLoadingStatus'),
		fetchPasswordResetMethodsLoadingStatusMessage: state.auth.get('fetchPasswordResetMethodsLoadingStatusMessage'),
		passwordResetMethods: state.auth.getIn(['data', 'passwordResetMethods']).toObject(),
		passwordResetViaSecurityQuestionsLoadingStatus: state.auth.get('passwordResetViaSecurityQuestionsLoadingStatus'),
		passwordResetViaSecurityQuestionsLoadingStatusMessage: state.auth.get('passwordResetViaSecurityQuestionsLoadingStatusMessage'),
		passwordResetViaGoogleTotpLoadingStatus: state.auth.get('passwordResetViaGoogleTotpLoadingStatus'),
		passwordResetViaGoogleTotpLoadingStatusMessage: state.auth.get('passwordResetViaGoogleTotpLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchCaptchaAction: () => dispatch(fetchCaptchaAction()),
		updateDefaultPasswordAction: (password, newPassword, confirmedPassword) => dispatch(updateDefaultPasswordAction(password, newPassword, confirmedPassword)),
		checkCaptchaAction: (username, captcha) => dispatch(checkCaptchaAction(username, captcha)),
		setIsGeoValidation: (isGeoValidation) => dispatch(setIsGeoValidation(isGeoValidation)),
		loginViaGoogleTotpAction: (username, totp) => dispatch(loginViaGoogleTotpAction(username, totp)),
		geoValidateWithPayerAction: (payer) => dispatch(geoValidateWithPayerAction(payer)),
		fetchPasswordResetMethodsAction: (username, captcha) => dispatch(fetchPasswordResetMethodsAction(username, captcha)),
		resetPasswordViaSecurityQuestionsAction: (securityQuestionAnswers, newPassword) => dispatch(resetPasswordViaSecurityQuestionsAction(securityQuestionAnswers, newPassword)),
		resetPasswordViaGoogleTotpAction: (totp, newPassword) => dispatch(resetPasswordViaGoogleTotpAction(totp, newPassword)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'geoValidateLoadingStatus',
				loadingStatusMessage: 'geoValidateLoadingStatusMessage',
			},
		],
		LoginCheckPage,
	)
);

function generateSVG(source) {
	return { __html: source };
}
