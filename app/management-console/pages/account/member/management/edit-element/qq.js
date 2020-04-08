import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { FormItem, Input, ListItem, } from 'ljit-react-components';
import EditUserProfileFormModalButton from '../../../../../features/user-info-block/modal-buttons/edit-user-profile-form-modal-button';

const fakeQQ = "qq account";

const propTypes = {
	qq: PropTypes.string,
};
const defaultProps = {
	qq: '',
};

class QQEditElement extends Component {
	constructor() {
		super();
		this.state = {
			// TODO remove this, get data from props
			qq: fakeQQ,
		};

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._renderFormBody = this._renderFormBody.bind(this);
		this._renderOperation = this._renderOperation.bind(this);
	}

	_handleSubmitForm(values) {
		// TODO send edit api
		const { qq } = values;

		this.setState({ qq, });
	}
	_renderFormBody() {
		const { qq, } = this.state;

		return (
			<FormItem
				label="QQ号码"
				itemName="qq"
				itemConfig={{
					initialValue: qq,
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
				formTitle="QQ号码"
				onSubmitForm={_handleSubmitForm}
				formBody={_renderFormBody()}
			/>
		);
	}
	render() {
		const { qq, } = this.state;
		const { _renderOperation, } = this;
		const qqContent = qq ? qq : '未设定';

		return (
			<ListItem
				title="QQ号码"
				content={qqContent}
				right={_renderOperation()}
			/>
		);
	}
}

QQEditElement.propTypes = propTypes;
QQEditElement.defaultProps = defaultProps;

export default QQEditElement;
