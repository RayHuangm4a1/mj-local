import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const inputStyle = {
	width: 330
};

const propTypes = {
	initialValues: PropTypes.shape({
		linkUrl: PropTypes.string,
		forestageUrl: PropTypes.string,
	}),
	isFormVisible: PropTypes.bool,
	formTitle: PropTypes.string,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
	isFormVisible: false,
	onSubmit: () => {},
	onCancel: () => {},
};

class UrlForm extends Component {
	constructor() {
		super();
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((error, data) => {
			if (error) {
				return;
			}

			this.props.onSubmit(data);
			form.resetFields();
		});
	}
	_handleCancel() {
		const form = this.formInstance.getForm();

		this.props.onCancel();
		form.resetFields();
	}

	render() {
		const {
			formTitle,
			isFormVisible,
			initialValues,
		} = this.props;

		return (
			<PageModal
				visible={isFormVisible}
				title={formTitle}
				onClickOk={this._handleSubmit}
				onClickCancel={this._handleCancel}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						itemName="linkUrl"
						label="连结网址："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{
							initialValue: initialValues.linkUrl,
						}}
					>
						<Input
							style={inputStyle}
						/>
					</FormItem>
					<FormItem
						itemName="forestageUrl"
						label="前台网址："
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
						itemConfig={{
							initialValue: initialValues.forestageUrl,
						}}
					>
						<Input
							style={inputStyle}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

UrlForm.propTypes = propTypes;
UrlForm.defaultProps = defaultProps;

export default UrlForm;
