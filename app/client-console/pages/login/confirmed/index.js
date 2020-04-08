import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { Form, FormItem, Input, Icon, LabelContent, } from 'ljit-react-components';
import ClientMessageModal from '../../../components/client-message-modal';
import { authActions } from '../../../controller';
import { LoadingStatusEnum, } from '../../../lib/enums';
import { RouteKeyEnums, } from '../../../route';
import LoginLogo from '../login-logo';

const {
	HOME,
	LOGIN,
} = RouteKeyEnums;
const {
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const {
	loginAction,
} = authActions;
const propTypes = {
	loginLoadingStatus: PropTypes.number.isRequired,
	loginLoadingStatusMessage: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired,
	loginAction: PropTypes.func.isRequired,
	authData: PropTypes.shape({
		username: PropTypes.string.isRequired,
		greeting: PropTypes.string,
	}).isRequired,
	isCaptchaValidate: PropTypes.bool.isRequired,
};

const {
	USER_OUTLINE,
	LOCK_OUTLINE,
	QUESTION_CIRCLE_OUTLINE,
} = Icon.IconTypeEnums;

const PREFIX_CLASS = 'client-login';

class LoginConfirmedPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginLoadingStatus: props.loginLoadingStatus,
			isShowErrorMessage: false,
		};

		this._handleFormSubmit = this._handleFormSubmit.bind(this);
		this._handleCloseModal = this._handleCloseModal.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const {
			loginLoadingStatus: nextLoginLoadingStatus,
		} = nextProps;

		if (prevState.loginLoadingStatus !== nextLoginLoadingStatus) {
			return {
				loginLoadingStatus: nextLoginLoadingStatus,
				isShowErrorMessage: nextLoginLoadingStatus === FAILED,
			};
		}
		return null;
	}

	_handleCloseModal() {
		const {
			loginLoadingStatusMessage,
			onNavigate,
		} = this.props;

		this.setState({ isShowErrorMessage: false, });
		// TODO: 之後要改用 code 來判斷
		if (loginLoadingStatusMessage === "帐户被冻结") {
			onNavigate(LOGIN);
		}
	}

	_handleFormSubmit(e) {
		const { loginAction, authData } = this.props;
		const form = this.formInstance.getForm();
		const username = authData.username;

		e.preventDefault();

		form.validateFields((err, values) => {
			if (!err) {
				const password = values.password;

				loginAction(username, password);
			}
		});
	}

	render() {
		const { isShowErrorMessage } = this.state;
		const {
			loginLoadingStatusMessage,
			authData,
			onNavigate,
		} = this.props;
		const {
			_handleFormSubmit,
			_handleCloseModal,
		} = this;
		const {
			username,
			greeting,
		} = authData;

		return (
			<React.Fragment>
				<div className={`${PREFIX_CLASS} ${PREFIX_CLASS}--password login-page__container`}>
					<LoginLogo />
					<div className={`${PREFIX_CLASS}__greeting`}>
						问候语：{greeting}
					</div>
					<Form
						ref={(refForm) => this.formInstance = refForm }
						submitText="确认登录"
						cancelButtonDisabled
						onSubmit={_handleFormSubmit}
					>
						<LabelContent key={"username"}>
							<Input
								prefix={<Icon type={USER_OUTLINE} size={Icon.SizeEnums.X_SMALL} style={{ color: 'rgba(0,0,0,.25)' }} />}
								value={username}
								disabled
							/>
						</LabelContent>
						<FormItem
							key={"password"}
							itemName="password"
							itemConfig={{
								rules: [
									{
										required: true,
										message: '密码不能为空',
									},
								],
							}}
						>
							<Input
								prefix={<Icon type={LOCK_OUTLINE} size={Icon.SizeEnums.X_SMALL} style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="密码"
								type="password"
							/>
						</FormItem>
					</Form>
					<div className={`${PREFIX_CLASS}--password__switch-user`}>
						<Icon type={QUESTION_CIRCLE_OUTLINE}/><span onClick={() => onNavigate(LOGIN)}>切换用户重新进行登录</span>
					</div>
				</div>
				<ClientMessageModal
					okText="确定"
					isVisible={isShowErrorMessage}
					isHideCancelButton
					onClickOk={_handleCloseModal}
					message={loginLoadingStatusMessage}
				/>
			</React.Fragment>
		);
	}

	componentDidMount() {
		const {
			onNavigate,
			isCaptchaValidate,
		} = this.props;

		if (!isCaptchaValidate) {
			onNavigate(LOGIN);
		}
	}

	componentDidUpdate(prevProps) {
		const { onNavigate, loginLoadingStatus } = this.props;

		if (prevProps.loginLoadingStatus === LOADING) {
			if (loginLoadingStatus === SUCCESS) {
				onNavigate(HOME);
			}
		}
	}
}

function mapStateToProps(state) {
	return {
		loginLoadingStatus: state.auth.get('loginLoadingStatus'),
		loginLoadingStatusMessage: state.auth.get('loginLoadingStatusMessage'),
		authData: state.auth.get('data').toObject(),
		isCaptchaValidate: state.auth.get('isCaptchaValidate'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		loginAction: (username, password) => (dispatch(loginAction(username, password))),
	};
}

LoginConfirmedPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LoginConfirmedPage);
