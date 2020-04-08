import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Input, ListItem, } from 'ljit-react-components';
import EditUserProfileFormModalButton from '../../../../../features/user-info-block/modal-buttons/edit-user-profile-form-modal-button';

const fakePhone = "3345678";

const propTypes = {
	phone: PropTypes.string,
};
const defaultProps = {
	phone: '',
};

class PhoneEditElement extends Component {
	constructor() {
		super();
		this.state = {
			// TODO remove this, get data from props
			phone: fakePhone,
		};

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}

	_handleSubmitForm(value) {
		// TODO send edit api
		const { phone, } = value;

		this.setState({ phone, });
	}
	_renderFormBody() {
		const { phone, } = this.state;

		return (
			<FormItem
				label="联系电话"
				itemName="phone"
				itemConfig={{
					initialValue: phone,
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
				formTitle="联系电话"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
	render() {
		const { phone, } = this.state;
		const { _renderOperation, } = this;
		const phoneContent = phone ? phone : '未设定';

		return (
			<ListItem
				title="联系电话"
				content={phoneContent}
				right={_renderOperation()}
			/>
		);
	}
}

PhoneEditElement.propTypes = propTypes;
PhoneEditElement.defaultProps = defaultProps;

export default PhoneEditElement;
