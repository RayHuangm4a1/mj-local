import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Modal,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const propTypes = {
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	isVisible: PropTypes.bool,
	title: PropTypes.string,
	initialValues: PropTypes.shape({
		version: PropTypes.string,
		platform: PropTypes.string,
		url: PropTypes.string,
		description: PropTypes.string,
	}),
	isNameReadOnly: PropTypes.bool,
};
const defaultProps = {
	isNameReadOnly: false,
	initialValues: {
		name: '',
		value: '',
		description: '',
	},
};

const inputStyle = {
	width: '516px',
};

class SettingForm extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_handleSubmit(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				this.props.onSubmit(values);
			}
		});
	}

	_handleReset(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.resetFields();
		this.props.onCancel();
	}

	render() {
		const { isVisible, title, initialValues, isNameReadOnly, } = this.props;
		const { _handleSubmit, _handleReset, } = this;

		return (
			<PageModal
				visible={isVisible}
				title={title}
				modalSize={Modal.ModalSizeEnum.NORMAL}
				onClickCancel={_handleReset}
				onClickOk={_handleSubmit}
			>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
					onChange={() => {}}
					ref={(refForm) => this.formInstance = refForm }
				>
					<FormItem
						label="字典名称"
						itemName="name"
						itemConfig={{
							initialValue: initialValues.name,
						}}
						className="dictionary-setting-modal-form-item"
					>
						<Input
							placeholder="请输入字典名称"
							readOnly={isNameReadOnly}
							style={inputStyle}
						/>
					</FormItem>
					<FormItem
						label="字典值"
						itemName="value"
						itemConfig={{
							initialValue: initialValues.value,
						}}
						className="dictionary-setting-modal-form-item"
					>
						<Input
							placeholder="请输入字典值"
							style={inputStyle}
						/>
					</FormItem>
					<FormItem
						label="字典说明"
						itemName="description"
						itemConfig={{
							initialValue: initialValues.description,
						}}
						className="dictionary-setting-modal-form-item"
					>
						<Input
							placeholder="请输入字典说明"
							style={inputStyle}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

SettingForm.propTypes = propTypes;
SettingForm.defaultProps = defaultProps;

export default SettingForm;
