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
	updateUserLoginPasswordAction,
} = userAccountActions;

const propTypes = {
	updateUserLoginPasswordAction: PropTypes.func.isRequired,
	userId: PropTypes.number,
};

class LoginPasswordEditButton extends Component {
	constructor() {
		super();

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
	}

	_handleSubmitForm({ password, }) {
		const {
			userId,
			updateUserLoginPasswordAction,
		} = this.props;

		updateUserLoginPasswordAction(userId, password);
	}

	_renderFormBody() {
		return (
			<FormItem
				label="登录密码"
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
		return (
			<EditUserAccountFormModalButton
				formTitle="登录密码"
				onSubmitForm={this._handleSubmitForm}
				formBody={this._renderFormBody()}
			/>
		);
	}
}

LoginPasswordEditButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		userId: state.userData.profile.get('data').toObject().id,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserLoginPasswordAction: (userId, password) => dispatch(updateUserLoginPasswordAction(userId, password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPasswordEditButton);
