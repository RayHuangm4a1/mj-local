import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, } from 'ljit-react-components';
import ReturnRebateFieldGroup from './return-rebate-field-group';

const propTypes = {
	dataSource: PropTypes.object,
};
const defaultProps = {};

class RebateForm extends Component {
	constructor() {
		super();
		this._handleFormSubmit = this._handleFormSubmit.bind(this);
	}

	_handleFormSubmit(event) {
		event.preventDefault();
		const form = this.settingFormRef.getForm();

		form.validateFields((error, data) => {
			if (error) {
				return;
			}
			// TODO call api
			form.resetFields();
		});
	}

	render() {
		const {
			dataSource = {
				lottery: 0,
				treasure: 0,
				video: 0,
				ug: 0,
				live: 0,
			},
		} = this.props;

		return (
			<Form
				className="member-rebate-form"
				onSubmit={this._handleFormSubmit}
				ref={formRef => this.settingFormRef = formRef}
				onChange={() => {}}
				submitText="储存变更"
				cancelButtonDisabled
			>
				<ReturnRebateFieldGroup
					initialValues={dataSource}
					isDividerVisible
				/>
			</Form>
		);
	}
}

RebateForm.propTypes = propTypes;
RebateForm.defaultProps = defaultProps;

export default RebateForm;
