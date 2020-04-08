import React, { Component } from 'react';
import {
	InputTextarea,
	Form,
	FormItem,
} from 'ljit-react-components';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	onSubmit: PropTypes.func,
	label: PropTypes.string,
	itemName: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	itemConfig: PropTypes.object,
};

const defaultProps = {
	onSubmit: () => {},
	label: '',
	placeholder: '',
	itemConfig: {},
};

class ImportForm extends Component {
	constructor() {
		super();

		this.resetFrom = this.resetFrom.bind(this);
		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
	}
	resetFrom() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}
	_handleSubmitAdd() {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
			}
		});
	}

	render() {
		const { _handleSubmitAdd, } = this;
		const { label, itemName, placeholder, itemConfig, } = this.props;

		return (
			<div className="import-form">
				<Form
					ref={formRef => this.formInstance = formRef }
					onSubmit={_handleSubmitAdd}
					submitText="新增"
					cancelButtonDisabled
				>
					<FormItem
						label={label}
						itemName={itemName}
						labelColon={false}
						itemConfig={itemConfig}
					>
						<InputTextarea
							minRows={10}
							placeholder={placeholder}
						/>
					</FormItem>
				</Form>
			</div>
		);
	}
}

ImportForm.propTypes = propTypes;
ImportForm.defaultProps = defaultProps;

export default ImportForm;
