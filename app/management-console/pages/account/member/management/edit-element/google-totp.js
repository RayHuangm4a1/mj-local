import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { ListItem, } from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import ConfirmMessageButton from '../../../../../components/modal-buttons/confirm-message-button';
import {
	notifyHandlingActions,
	userAccountActions,
} from '../../../../../controller';
import {
	notifications,
} from '../../../../../../lib/notify-handler';
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

const { disableUserGoogleTotpAction, } = userAccountActions;
const propTypes = {
	userId: PropTypes.number,
	isGoogleTotpEnable: PropTypes.bool,
	userAccountUpdateLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	notifyHandlingAction: PropTypes.func.isRequired,
	disableUserGoogleTotpAction: PropTypes.func.isRequired,
};
const defaultProps = {
	isGoogleTotpEnable: false,
};

class GoogleTotpEditElement extends Component {
	constructor() {
		super();
		this.state = {
			idUnbinded: false,
		};

		this._handleUnbindGoogleTotp = this._handleUnbindGoogleTotp.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}
	_handleUnbindGoogleTotp() {
		const {
			userId,
			disableUserGoogleTotpAction,
		} = this.props;

		disableUserGoogleTotpAction(userId);
		this.setState({ idUnbinded: true, });
	}
	_renderOperation() {
		const { isGoogleTotpEnable, } = this.props;
		const { _handleUnbindGoogleTotp, } = this;

		return (
			<ConfirmMessageButton
				buttonText="解除绑定"
				title="确认提示"
				message="是否解除绑定"
				onConfirm={_handleUnbindGoogleTotp}
				isDisabled={!isGoogleTotpEnable}
			/>
		);
	}
	render() {
		const { isGoogleTotpEnable, } = this.props;
		const { _renderOperation, } = this;
		const googleToptContent = isGoogleTotpEnable ? '已绑定' : '未绑定';

		return (
			<ListItem
				title="谷歌认证"
				content={googleToptContent}
				right={_renderOperation()}
			/>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			userAccountUpdateLoadingStatus,
			notifyHandlingAction,
		} = this.props;
		const { idUnbinded, } = this.state;

		if (idUnbinded && userAccountUpdateLoadingStatus === SUCCESS && prevProps.userAccountUpdateLoadingStatus === LOADING) {
			notifyHandlingAction(new Success('解除谷歌验证成功'));
		}
	}
}

GoogleTotpEditElement.propTypes = propTypes;
GoogleTotpEditElement.defaultProps = defaultProps;

function mapStateToProps(state) {
	const {
		profile: userProfile,
		account: userAccount,
	} = state.userData;
	const userId = userProfile.getIn(['data', 'id']);
	const totp = userAccount.getIn(['data', 'totp']) || {};

	return {
		userId,
		isGoogleTotpEnable: totp.isEnabled,
		userAccountUpdateLoadingStatus: userAccount.get('updateLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
		disableUserGoogleTotpAction: (userId) => dispatch(disableUserGoogleTotpAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleTotpEditElement);
