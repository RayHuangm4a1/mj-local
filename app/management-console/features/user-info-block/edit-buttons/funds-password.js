import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Input,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { userAccountActions, } from '../../../controller';
import EditUserAccountFormModalButton from '../modal-buttons/edit-user-acount-form-modal-button';
import { PasswordVerificationRules } from '../utils';

const {
	updateUserFundsPasswordAction,
} = userAccountActions;

const propTypes = {
	userId: PropTypes.number,
	updateUserFundsPasswordAction: PropTypes.func.isRequired,
};

class FundsPasswordEditButton extends Component {
	constructor() {
		super();

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
	}

	_handleSubmitForm({ password, }) {
		const {
			userId,
			updateUserFundsPasswordAction,
		} = this.props;

		updateUserFundsPasswordAction(userId, password);
	}

	_renderFormBody() {
		return (
			<FormItem
				label="资金密码"
				itemName="password"
				itemConfig={{
					rules: PasswordVerificationRules
				}}
			>
				<Input type="password" />
			</FormItem>
		);
	}

	render() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserAccountFormModalButton
				formTitle="资金密码"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
}

FundsPasswordEditButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		userId: state.userData.profile.get('data').toObject().id,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserFundsPasswordAction: (...args) => dispatch(updateUserFundsPasswordAction(...args))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(FundsPasswordEditButton);
