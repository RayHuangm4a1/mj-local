import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChildrenTransferModal from '../modal/children-transfer-modal';
import EnableTransferModal from '../modal/enable-transfer-modal';
import { Button } from 'ljit-react-components';
import FundsPasswordChecker from '../../../../../features/funds-password-checker';

const propTypes = {
	onNotify: PropTypes.func,
};

class ChildrenTransferButton extends Component {
	constructor() {
		super();
		this.state = {
			// TODO get isEnableTransfer from API
			isEnableTransfer: false,
			isEnableTransferModalVisible: false,
			isChildrenTransferModalVisible: false,
		};
		this._handleClickChildrenTransfer = this._handleClickChildrenTransfer.bind(this);
		this._handleEnableTransfer = this._handleEnableTransfer.bind(this);
		this._handleCloseEnableTransferModal = this._handleCloseEnableTransferModal.bind(this);
		this._handlePostChildrenTransfer = this._handlePostChildrenTransfer.bind(this);
		this._handleCloseChildrenTransferModal = this._handleCloseChildrenTransferModal.bind(this);
		this._handleDisableTransfer = this._handleDisableTransfer.bind(this);
	}
	_handleClickChildrenTransfer() {
		if (this.state.isEnableTransfer) {
			this.setState({
				isChildrenTransferModalVisible: true,
			});
		} else {
			this.setState({
				isEnableTransferModalVisible: true,
			});
		}
	}

	_handleEnableTransfer(value) {
		// TODO POST data
		// TODO 等 API 格式確定，使用結構賦值 ({ password, googleCode, ...} 取代 value)
		console.log(value);
		this.props.onNotify();
		this._handleCloseEnableTransferModal();
		this.setState({
			isEnableTransfer: true,
		});
	}
	_handleCloseEnableTransferModal() {
		this.setState({
			isEnableTransferModalVisible: false,
		});
	}

	_handlePostChildrenTransfer(value) {
		// TODO POST data
		// TODO 等 API 格式確定，使用結構賦值 ({ password, googleCode, ...} 取代 value)
		console.log(value);
		this._handleCloseChildrenTransferModal();
	}
	_handleCloseChildrenTransferModal() {
		this.setState({
			isChildrenTransferModalVisible: false,
		});
	}
	_handleDisableTransfer() {
		// TODO disable open transfer
		console.log('disable transfer');
	}

	render() {
		const {
			_handleClickChildrenTransfer,
			_handleEnableTransfer,
			_handleCloseEnableTransferModal,
			_handlePostChildrenTransfer,
			_handleCloseChildrenTransferModal,
			_handleDisableTransfer,
		} = this;
		const {
			isEnableTransferModalVisible,
			isChildrenTransferModalVisible,
		} = this.state;

		return (
			<React.Fragment>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={_handleClickChildrenTransfer}
					color={Button.ColorEnums.ORANGE}
				> 下级转帐
				</Button>
				<ChildrenTransferModal
					title={"下级转帐"}
					isVisible={isChildrenTransferModalVisible}
					className="agent-user-management__modal"
					onClickOk={_handlePostChildrenTransfer}
					onClickCancel={_handleCloseChildrenTransferModal}
					onDisableTransfer={_handleDisableTransfer}
					transferTime={(new Date()).toString()}
				/>
				<FundsPasswordChecker
					isVisible={isEnableTransferModalVisible}
					onClose={_handleCloseEnableTransferModal}
				>
					<EnableTransferModal
						isVisible={isEnableTransferModalVisible}
						onClickOk={_handleEnableTransfer}
						onClickCancel={_handleCloseEnableTransferModal}
						className="agent-user-management__modal"
					/>
				</FundsPasswordChecker>
			</React.Fragment>
		);
	}
}

ChildrenTransferButton.propTypes = propTypes;

export default ChildrenTransferButton;
