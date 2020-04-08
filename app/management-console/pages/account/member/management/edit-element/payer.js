import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Input, ListItem, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { userProfileActions, } from '../../../../../controller';
import EditUserProfileFormModalButton from '../../../../../features/user-info-block/modal-buttons/edit-user-profile-form-modal-button';

const {
	updateUserPayerAction,
} = userProfileActions;

const propTypes = {
	payer: PropTypes.string,
	updateUserPayerAction: PropTypes.func.isRequired,
	userId: PropTypes.number.isRequired,
};
const defaultProps = {
	payer: '',
};
const MAX_NAME_LENGTH = 20;

class PayerEditElement extends Component {
	constructor() {
		super();
		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}

	_handleSubmitForm({ payer }) {
		const {
			updateUserPayerAction,
			userId,
		} = this.props;

		updateUserPayerAction(userId, payer);
	}
	_renderFormBody() {
		const { payer, } = this.props;

		return (
			<FormItem
				label="真实姓名"
				itemName="payer"
				itemConfig={{
					initialValue: payer,
					rules: [{
						required: true,
						message: '真实姓名不能为空'
					},{
						validator: (rule, value, callback) => {
							const hasNumber = value.match(/[0-9]/g);
							const hasSymbol = value.replace(/[A-Za-z\u4e00-\u9fa5]/g, '');
							const isTooLong = value.length > MAX_NAME_LENGTH;

							if (hasNumber) {
								callback('真实姓名不能使用数字');
							}
							if (hasSymbol) {
								callback('真实姓名不能使用符号');
							}
							if (isTooLong) {
								callback('真实姓名不能超过 20 个字');
							}
							callback();
						},
					}],
				}}
			>
				<Input />
			</FormItem>
		);
	}
	_renderOperation() {
		const { _handleSubmitForm, _renderFormBody, } = this;

		return (
			<EditUserProfileFormModalButton
				formTitle="真实姓名"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
	render() {
		const { payer, } = this.props;
		const { _renderOperation, } = this;
		const payerContent = payer ? payer : '未设定';

		return (
			<ListItem
				title="真实姓名"
				content={payerContent}
				right={_renderOperation()}
			/>
		);
	}
}

PayerEditElement.propTypes = propTypes;
PayerEditElement.defaultProps = defaultProps;

function mapStateToProps(state) {
	const { profile: userProfile, } = state.userData;

	return {
		userId: userProfile.get('data').toObject().id,
		payer: userProfile.get('data').toObject().payer,
	};
}
function mapDispatchToProps(dispatch) {
	return {
		updateUserPayerAction: (userId, payer) => dispatch(updateUserPayerAction(userId, payer))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PayerEditElement);
