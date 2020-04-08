import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Input,
	Form,
	FormItem,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import { validatePassword, validateUsername } from '../../../../../lib/form-validation-utils';

const propTypes = {
	isModalVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
const defaultProps = {
	isModalVisible: false,
	onSubmit: () => {},
	onCancel: () => {},
};

class ZhaoShangSettingModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleSubmit() {
		const { formInstance: { validateFields, resetFields, } } = this;
		const { onSubmit } = this.props;

		validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				resetFields();
			}
		});
	}
	_handleCancel() {
		const { formInstance: { resetFields } } = this;
		const { onCancel } = this.props;

		resetFields();
		onCancel();
	}

	render() {
		const { isModalVisible, } = this.props;
		const { _handleSubmit, _handleCancel, } = this;
		const inputStyle = { width: 228, };

		return (
			<PageModal
				title="新增招商"
				className="zhaoshang-setting-modal"
				visible={isModalVisible}
				onClickOk={_handleSubmit}
				onClickCancel={_handleCancel}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						itemName="username"
						label="招商帐号"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									validator: validateUsername('招商帐号'),
								}
							],
						}}
					>
						<Input style={inputStyle} />
					</FormItem>
					<FormItem
						itemName="nickname"
						label="昵称"
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<Input style={inputStyle} />
					</FormItem>
					<FormItem
						itemName="password"
						label="招商密码"
						columnType={FormItem.ColumnTypeEnums.LARGE}
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									validator: validatePassword('招商密码'),
								},
							],
						}}
					>
						<Input
							style={inputStyle}
							type="password"
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

ZhaoShangSettingModal.propTypes = propTypes;
ZhaoShangSettingModal.defaultProps = defaultProps;

export default ZhaoShangSettingModal;
