import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FreeTransferModal from '../modal/free-transfer-modal';
import { Button, } from 'ljit-react-components';
import FundsPasswordChecker from '../../../../../features/funds-password-checker';
import { connect } from 'ljit-store-connecter';
import { userActions } from '../../../../../controller';
import { withLoadingStatusNotification, notifications } from '../../../../../../lib/notify-handler';
import { LoadingStatusEnum } from '../../../../../../lib/enums';

const { transferToUserAction } = userActions;
const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const propTypes = {
	transferToUserAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	transferToUserLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
};

class FreeTransferButton extends Component {
	constructor() {
		super();
		this.state = {
			isTransferToUserModalVisible: false,
		};
		this._handleClickTransferToUser = this._handleClickTransferToUser.bind(this);
		this._handleTransferToUser = this._handleTransferToUser.bind(this);
		this._handleCloseTransferToUserModal = this._handleCloseTransferToUserModal.bind(this);
	}
	_handleClickTransferToUser() {
		this.setState({
			isTransferToUserModalVisible: true,
		});
	}
	_handleTransferToUser({ username, bankCardNumber, amount, password, totp }) {
		const { transferToUserAction } = this.props;

		transferToUserAction(username, bankCardNumber, amount, password, totp);
	}
	_handleCloseTransferToUserModal() {
		this.setState({
			isTransferToUserModalVisible: false,
		});
	}
	render() {
		const {
			_handleClickTransferToUser,
			_handleTransferToUser,
			_handleCloseTransferToUserModal,
		} = this;
		const {
			isTransferToUserModalVisible,
		} = this.state;

		return (
			<React.Fragment>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={_handleClickTransferToUser}
					color={Button.ColorEnums.ORANGE}
				> 任意转帐 </Button>
				<FundsPasswordChecker
					isVisible={isTransferToUserModalVisible}
					onClose={_handleCloseTransferToUserModal}
				>
					<FreeTransferModal
						ref={ref => this.transferModalInstance = ref}
						isVisible={isTransferToUserModalVisible}
						onClickOk={_handleTransferToUser}
						onClickCancel={_handleCloseTransferToUserModal}
						className="agent-user-management__modal"
					/>
				</FundsPasswordChecker>
			</React.Fragment>
		);
	}
	componentDidUpdate(prevProps) {
		const {
			notifyHandlingAction,
			transferToUserLoadingStatus,
		} = this.props;

		if (prevProps.transferToUserLoadingStatus === LOADING && transferToUserLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('转帐成功'));
			this._handleCloseTransferToUserModal();
			this.transferModalInstance.resetForm();
		}
	}
}

FreeTransferButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		transferToUserLoadingStatus: state.childrenUsers.get('transferToUserLoadingStatus'),
		transferToUserLoadingStatusMessage: state.childrenUsers.get('transferToUserLoadingStatusMessage')
	};
}
function mapDispatchToProps(dispatch) {
	return {
		transferToUserAction: (username, bankCardNumber, amount, password, totp) => dispatch(transferToUserAction(username, bankCardNumber, amount, password, totp)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'transferToUserLoadingStatus',
				loadingStatusMessage: 'transferToUserLoadingStatusMessage',
			}
		],
		FreeTransferButton,
	)
);
