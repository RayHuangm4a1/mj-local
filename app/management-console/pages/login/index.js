import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import {
	authActions,
} from '../../controller';
import {
	LoadingStatusEnum,
} from '../../lib/enums';
import PageModal from '../../components/page-modal';
import { RouteKeyEnums, } from '../../routes';
import LoginForm from './login-form';
import './style.styl';

const { ROOT, } = RouteKeyEnums;
const { Message, } = PageModal;
const {
	loginAction,
} = authActions;
const {
	LOADING,
	FAILED,
	SUCCESS,
} = LoadingStatusEnum;

const PREFIX_CLASS = 'login-page';

const propTypes = {
	loginLoadingStatus: PropTypes.number,
	loginLoadingStatusMessage: PropTypes.string,
	loginAction: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired,
};
const defaultProps = {};

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isMessageVisible: false,
		};
		this._handleHideMessage = this._handleHideMessage.bind(this);
		this._handleLogin = this._handleLogin.bind(this);
	}

	_handleHideMessage() {
		this.setState({
			isMessageVisible: false,
		});
	}

	_handleLogin(values) {
		const {
			username,
			password,
		} = values;

		this.props.loginAction(username, password);
	}

	render() {
		const {
			loginLoadingStatus,
			loginLoadingStatusMessage,
		} = this.props;
		const {
			isMessageVisible,
		} = this.state;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__content`}>
					<div className={`${PREFIX_CLASS}__logo`}>
						<img src="https://via.placeholder.com/50?text=LOGO" />
					</div>
					<LoginForm
						className={`${PREFIX_CLASS}__form`}
						disabled={loginLoadingStatus === LOADING}
						onClickSubmit={this._handleLogin}
					/>
				</div>
				<div className={`${PREFIX_CLASS}__bottom`}>
					© 2020 YY娱乐 All Rights Reserved.   彩票有风险，投注需谨慎，不向未满18周岁的青少年出售彩票
				</div>
				<Message
					isFullMask
					title="通知"
					visible={isMessageVisible}
					message={loginLoadingStatusMessage}
					onClickCancel={this._handleHideMessage}
					footer={(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={this._handleHideMessage}
						>
							确 定
						</Button>
					)}
				/>
			</div>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			onNavigate,
			loginLoadingStatus,
		} = this.props;

		if (LOADING === prevProps.loginLoadingStatus) {
			if (SUCCESS === loginLoadingStatus) {
				onNavigate(ROOT);
			} else if (FAILED === loginLoadingStatus) {
				this.setState({
					isMessageVisible: true,
				});
			}
		}
	}
}

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	const { auth, } = state;

	return {
		loginLoadingStatus: auth.get('loginLoadingStatus'),
		loginLoadingStatusMessage: auth.get('loginLoadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		loginAction: (...args) => dispatch(loginAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
