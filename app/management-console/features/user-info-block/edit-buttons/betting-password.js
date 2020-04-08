import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Input,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import EditUserAccountFormModalButton from '../modal-buttons/edit-user-acount-form-modal-button';
import { userAccountActions, } from '../../../controller';
import { PasswordVerificationRules } from '../utils';

const {
	updateUserBettingPasswordAction,
} = userAccountActions;

const propTypes = {
	updateUserBettingPasswordAction: PropTypes.func.isRequired,
	userId: PropTypes.number,
};

class BettingPasswordEditButton extends Component {
	constructor(props) {
		super(props);
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
	}

	_handleSubmitForm({ password }) {
		const {
			userId,
			updateUserBettingPasswordAction,
		} = this.props;

		updateUserBettingPasswordAction(userId, password);
	}

	_renderFormBody() {
		return (
			<FormItem
				label="投注密码"
				itemName="password"
				itemConfig={{
					rules: PasswordVerificationRules
				}}
			>
				<Input type="password"/>
			</FormItem>
		);
	}

	render() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserAccountFormModalButton
				formTitle="投注密码"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
}

BettingPasswordEditButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		userId: state.userData.profile.get('data').toObject().id,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserBettingPasswordAction: (userId, password) => dispatch(updateUserBettingPasswordAction(userId, password))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(BettingPasswordEditButton);
