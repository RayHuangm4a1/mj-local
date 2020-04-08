import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Switch,  ListItem, } from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import {
	notifyHandlingActions,
	userAccountActions,
} from '../../../../../controller';
import {
	notifications,
} from '../../../../../../lib/notify-handler';
import PageModal from '../../../../../components/page-modal';
import { LoadingStatusEnum, } from '../../../../../lib/enums';

const {
	SUCCESS,
	LOADING,
} = LoadingStatusEnum;

const {
	notifyHandlingAction,
} = notifyHandlingActions;

const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;

const { Message, } = PageModal;

const {
	enableUserLoginGeoValidationAction,
	disableUserLoginGeoValidationAction,
} = userAccountActions;

const propTypes = {
	userId: PropTypes.number,
	isLoginGeoValidationEnable: PropTypes.bool,
	payer: PropTypes.string,
	userAccountUpdateLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	notifyHandlingAction: PropTypes.func.isRequired,
	enableUserLoginGeoValidationAction: PropTypes.func.isRequired,
	disableUserLoginGeoValidationAction: PropTypes.func.isRequired,
};
const defaultProps = {
	isLoginGeoValidationEnable: false,
};

class LoginGeoValidationEditElement extends Component {
	constructor() {
		super();
		this.state = {
			isConfirmMessageVisible: false,
			confirmMessage: '',
			confirmEnable: false,
			isLoginGeoValidationEdited: false,
		};

		this._handleChangeLoginGeoValidation = this._handleChangeLoginGeoValidation.bind(this);
		this._handleSubmitConfirm = this._handleSubmitConfirm.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}

	_handleChangeLoginGeoValidation(checked) {
		const confirmMessage = `确定${checked ? '开启' : '关闭' }异地登陆校验？`;

		this.setState({
			isConfirmMessageVisible: true,
			confirmMessage,
			confirmEnable: checked,
		});
	}
	_handleSubmitConfirm() {
		const { confirmEnable, } = this.state;
		const {
			userId,
			enableUserLoginGeoValidationAction,
			disableUserLoginGeoValidationAction,
		} = this.props;

		if (confirmEnable) {
			enableUserLoginGeoValidationAction(userId);
		} else {
			disableUserLoginGeoValidationAction(userId);
		}
		this.setState({
			isConfirmMessageVisible: false,
			confirmEnable: false,
			isLoginGeoValidationEdited: true,
		});
	}
	_renderOperation() {
		const { payer, isLoginGeoValidationEnable, } = this.props;
		const { _handleChangeLoginGeoValidation, } = this;
		const isBankCardUnbind = payer ? false : true;

		return (
			<Switch
				checked={isLoginGeoValidationEnable}
				onChange={_handleChangeLoginGeoValidation}
				disabled={isBankCardUnbind}
			/>
		);
	}
	render() {
		const { isLoginGeoValidationEnable, } = this.props;
		const { isConfirmMessageVisible, confirmMessage, } = this.state;
		const { _renderOperation, _handleSubmitConfirm, } = this;
		const loginGeoValidationContent = isLoginGeoValidationEnable ? '开启中': '关闭中';

		return (
			<>
				<ListItem
					title="异地登录校验"
					titleHint="(绑定银行卡该功能才可用)"
					content={loginGeoValidationContent}
					right={_renderOperation()}
				/>
				<Message
					visible={isConfirmMessageVisible}
					title="提示"
					message={confirmMessage}
					onClickOk={_handleSubmitConfirm}
					onClickCancel={() => this.setState({ isConfirmMessageVisible: false, })}
				/>
			</>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			userAccountUpdateLoadingStatus,
			notifyHandlingAction,
		} = this.props;
		const { isLoginGeoValidationEdited, } = this.state;

		if (isLoginGeoValidationEdited && userAccountUpdateLoadingStatus === SUCCESS && prevProps.userAccountUpdateLoadingStatus === LOADING) {
			const notification = prevProps.isLoginGeoValidationEnable ? '异地验证登入关闭' : '异地登入验证开启';
			
			notifyHandlingAction(new Success(notification));
			this.setState({ isLoginGeoValidationEdited: false, });
		}
	}
}

LoginGeoValidationEditElement.propTypes = propTypes;
LoginGeoValidationEditElement.defaultProps = defaultProps;

function mapStateToProps(state) {
	const {
		profile: userProfile,
		account: userAccount,
	} = state.userData;
	const userId = userProfile.getIn(['data', 'id']);
	const payer = userProfile.getIn(['data', 'payer']);
	const loginGeoValidation = userAccount.getIn(['data', 'loginGeoValidation']) || {};

	return {
		userId,
		payer,
		isLoginGeoValidationEnable: loginGeoValidation.isEnabled,
		userAccountUpdateLoadingStatus: userAccount.get('updateLoadingStatus'),
		userAccountUpdateLoadingStatusMessage: userAccount.get('updateLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
		enableUserLoginGeoValidationAction: (userId) => dispatch(enableUserLoginGeoValidationAction(userId)),
		disableUserLoginGeoValidationAction: (userId) => dispatch(disableUserLoginGeoValidationAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginGeoValidationEditElement);
