import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FormItem, RadioGroup, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { userProfileActions, } from '../../../controller';
import EditUserProfileFormModalButton from '../modal-buttons/edit-user-profile-form-modal-button';

const { enableUserTransferAction, disableUserTransferAction, } = userProfileActions;

const propTypes = {
	userId: PropTypes.number,
	isTransferable: PropTypes.bool,
	enableUserTransferAction: PropTypes.func.isRequired,
	disableUserTransferAction: PropTypes.func.isRequired,
};
const defaultProps = {
	userId: null,
	isTransferable: false,
};

class TransferableEditButton extends Component {
	constructor() {
		super();
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
	}

	_handleSubmitForm({ isTransferable: updatedIsTransferable, }) {
		const {
			userId,
			enableUserTransferAction,
			disableUserTransferAction,
		} = this.props;

		if (updatedIsTransferable) {
			enableUserTransferAction(userId);
		} else {
			disableUserTransferAction(userId);
		}
	}
	_renderFormBody() {
		const { isTransferable, } = this.props;

		return (
			<FormItem
				label="任意转帐"
				itemName="isTransferable"
				itemConfig={{ initialValue: isTransferable, }}
			>
				<RadioGroup
					options={[
						{ label: '未禁止', value: true, },
						{ label: '禁止', value: false, },
					]}
				/>
			</FormItem>
		);
	}
	render() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserProfileFormModalButton
				formTitle="任意转帐"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
}

TransferableEditButton.propTypes = propTypes;
TransferableEditButton.defaultProps = defaultProps;

function mapStateToProps(state) {
	const userProfileData = state.userData.profile.get('data').toObject();
	const { id: userId, statuses = {}, } = userProfileData;
	const { isTransferable,  } = statuses;

	return {
		userId,
		isTransferable,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		enableUserTransferAction: (userId) => dispatch(enableUserTransferAction(userId)),
		disableUserTransferAction: (userId) => dispatch(disableUserTransferAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferableEditButton);
