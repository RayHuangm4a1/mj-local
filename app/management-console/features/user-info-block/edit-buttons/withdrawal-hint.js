import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	InputTextarea,
	Modal,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import EditFormModalButton from '../../../components/modal-buttons/edit-form-modal-button';
import { userWithdrawalActions } from '../../../controller';

const {
	updateUserWithdrawalMessageAction,
	deleteUserWithdrawalMessageAction,
} = userWithdrawalActions;

const propTypes = {
	withdrawalMessage: PropTypes.string,
	userId: PropTypes.number,
	updateUserWithdrawalMessageAction: PropTypes.func.isRequired,
	deleteUserWithdrawalMessageAction: PropTypes.func.isRequired,
};

class WithdrawalHintEditButton extends Component {
	constructor() {
		super();
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
	}

	_handleSubmitForm({ withdrawalMessage }) {
		const {
			userId,
			updateUserWithdrawalMessageAction,
			deleteUserWithdrawalMessageAction,
		} = this.props;
		const regexp = /^[ ]+$/g;
		const allSpace = regexp.test(withdrawalMessage);

		if (withdrawalMessage.length > 0 && !allSpace) {
			updateUserWithdrawalMessageAction(userId, withdrawalMessage);
		} else {
			deleteUserWithdrawalMessageAction(userId);
		}
	}

	_renderFormBody() {
		const { withdrawalMessage, } = this.props;

		return (
			<FormItem
				label="提示文字"
				itemName="withdrawalMessage"
				itemConfig={{
					initialValue: withdrawalMessage,
					rules: [{
						max: 100,
						message: '提示文字不能过 100 个字'
					}]
				}}
			>
				<InputTextarea
					style={{ width: 451, margin: 10, }}
					minRows={5}
					maxRows={5}
				/>
			</FormItem>
		);
	}

	render() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditFormModalButton
				formTitle="提现提示"
				okText="储 存"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
				modalSize={Modal.ModalSizeEnum.NORMAL}
			/>
		);
	}
}

WithdrawalHintEditButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		userId: state.userData.profile.get('data').toObject().id,
		withdrawalMessage: state.userData.withdrawalMessage.get('data'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserWithdrawalMessageAction: (userId, message) => dispatch(updateUserWithdrawalMessageAction(userId, message)),
		deleteUserWithdrawalMessageAction: (userId) => dispatch(deleteUserWithdrawalMessageAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawalHintEditButton);
