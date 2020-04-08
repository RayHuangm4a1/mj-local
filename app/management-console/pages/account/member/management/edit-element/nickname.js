import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Input, ListItem, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { userProfileActions, } from '../../../../../controller';
import EditUserProfileFormModalButton from '../../../../../features/user-info-block/modal-buttons/edit-user-profile-form-modal-button';

const {
	updateUserNicknameAction,
} = userProfileActions;

const propTypes = {
	nickname: PropTypes.string,
	updateUserNicknameAction: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
};
const defaultProps = {
	nickname: '',
};

class NicknameEditElement extends Component {
	constructor() {
		super();
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}

	_handleSubmitForm({ nickname }) {
		const {
			updateUserNicknameAction,
			userId,
		} = this.props;

		updateUserNicknameAction(userId, nickname);
	}
	_renderFormBody() {
		const { nickname, } = this.props;

		return (
			<FormItem
				label="昵称"
				itemName="nickname"
				itemConfig={{
					initialValue: nickname,
					rules: [{
						max: 20,
						message: '昵称不能超过 20 个字'
					},{
						required: true,
						message: '昵称不能为空'
					},]
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
				formTitle="昵称"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
	render() {
		const { nickname, } = this.props;
		const { _renderOperation, } = this;
		const nicknameContent = nickname ? nickname : '未设定';

		return (
			<ListItem
				title="昵称"
				content={nicknameContent}
				right={_renderOperation()}
			/>
		);
	}
}

NicknameEditElement.propTypes = propTypes;
NicknameEditElement.defaultProps = defaultProps;

function mapStateToProps(state) {
	const { profile: userProfile, } = state.userData;
	const userProfileData = userProfile.get('data').toObject();

	return {
		userId: userProfileData.id,
		nickname: userProfileData.nickname,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserNicknameAction: (userId, nickname) => dispatch(updateUserNicknameAction(userId, nickname))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NicknameEditElement);
