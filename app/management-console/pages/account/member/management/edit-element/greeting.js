import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Input, ListItem, } from 'ljit-react-components';
import EditUserProfileFormModalButton from '../../../../../features/user-info-block/modal-buttons/edit-user-profile-form-modal-button';
import { connect, } from 'ljit-store-connecter';
import { userProfileActions } from '../../../../../controller';

const {
	updateUserGreetingAction
} = userProfileActions;

const propTypes = {
	userId: PropTypes.number,
	greeting: PropTypes.string,
	updateUserGreetingAction: PropTypes.func.isRequired,
};

class GreetingEditElement extends Component {
	constructor() {
		super();

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}

	_handleSubmitForm({ greeting, }) {
		const {
			userId,
			updateUserGreetingAction,
		} = this.props;

		updateUserGreetingAction(userId, greeting);
	}
	_renderFormBody() {
		const { greeting } = this.props;

		return (
			<FormItem
				label="登录问候语"
				itemName="greeting"
				itemConfig={{
					initialValue: greeting,
					rules: [
						{
							max: 16,
							message: '登录问候语不能超过 16 个字'
						}
					]
				}}
			>
				<Input/>
			</FormItem>
		);
	}
	_renderOperation() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserProfileFormModalButton
				formTitle="登录问候语"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
	render() {
		const { greeting } = this.props;
		const { _renderOperation, } = this;
		const greetingContent = greeting ? greeting : '未设定';

		return (
			<ListItem
				title="登录问候语"
				content={greetingContent}
				right={_renderOperation()}
			/>
		);
	}
}

GreetingEditElement.propTypes = propTypes;

function mapStateToProps(state) {
	const {
		profile: userProfile,
	} = state.userData;

	return {
		userId: userProfile.get('data').toObject().id,
		greeting: userProfile.get('data').toObject().greeting,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserGreetingAction: (userId, greeting) => dispatch(updateUserGreetingAction(userId, greeting))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(GreetingEditElement);
