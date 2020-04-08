import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Select,
	InputTextarea,
	Modal,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const propTypes = {
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	visible: PropTypes.bool,
	title: PropTypes.string,
	initialValues: PropTypes.shape({
		version: PropTypes.string,
		platform: PropTypes.string,
		url: PropTypes.string,
		discription: PropTypes.string,
	}),
};
const defaultProps = {};

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
		const { visible, title, initialValues, } = this.props;
		const { _handleSubmit, _handleReset, } = this;

		return (
			<PageModal
				visible={visible}
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
						label="版本号"
						itemName="version"
						itemConfig={{
							initialValue: initialValues.version,
						}}
						className="app-version-setting-modal-form-item"
					>
						<Input
							placeholder=""
							style={inputStyle}
						/>
					</FormItem>
					<FormItem
						label="平台"
						itemName="platform"
						itemConfig={{
							initialValue: initialValues.platform,
						}}
						className="app-version-setting-modal-form-item"
					>
						<Select
							options={[
								{ label: 'ios', value: 'ios' },
								{ label: 'android', value: 'android' },
							]}
							placeholder=""
							style={inputStyle}
						/>
					</FormItem>
					<FormItem
						label="连结网址"
						itemName="url"
						itemConfig={{
							initialValue: initialValues.url,
						}}
						className="app-version-setting-modal-form-item"
					>
						<Input
							placeholder=""
							style={inputStyle}
						/>
					</FormItem>
					<FormItem
						label="描述"
						itemName="discription"
						itemConfig={{
							initialValue: initialValues.discription,
						}}
						className="app-version-setting-modal-form-item"
					>
						<InputTextarea
							minRows={4}
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
