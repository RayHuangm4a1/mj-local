import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	Button,
} from 'ljit-react-components';
import FormBlock from './form-block';

const inputStyle = {
	width: 397,
};

const propTypes = {
	onSubmit: PropTypes.func,
};
const defaultProps = {
	onSubmit: () => {},
};

class ChangePasswordForm extends Component {
	constructor() {
		super();
		this.state = {
			newPasswordDirty: false,
			confirmDirty: false,
		};
		this._validateToNextPassword = this._validateToNextPassword.bind(this);
		this._handleConfirmBlur = this._handleConfirmBlur.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_validateToNextPassword(isValidatable = false, nextPasswordName = '') {
		const form = this.formInstance.getForm();

		if (isValidatable) {
			form.validateFields([nextPasswordName], { force: true });
		}
	};

	_handleConfirmBlur(key = '', value) {
		this.setState({ [key]: this.state[key] || !!value });
	};

	_handleSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((error, data) => {
			if (error) {
				return;
			}

			this.props.onSubmit(data);
		});
	}

	render() {
		return (
			<FormBlock
				header="修改登录密码"
				footer={(
					<Button
						className="form-button"
						onClick={this._handleSubmit}
					>
						保存设置
					</Button>
				)}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						className="form-item"
						label="输入旧登录密码："
						itemName="password"
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									message: '请输入旧登录密码',
								},
								{
									validator: (rule, value, callback) => {
										const isValidatable = value && this.state.newPasswordDirty;
										const nextPasswordName = 'newPassword';

										this._validateToNextPassword(isValidatable, nextPasswordName);
										callback();
									},
								},
							],
						}}
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<Input
							type="password"
							style={inputStyle}
							placeholder="请输入旧登录密码"
						/>
					</FormItem>
					<FormItem
						className="form-item"
						label="輸入新登录密碼："
						itemName="newPassword"
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									message: '请输入新登录密码',
								},
								{
									validator: (rule, value, callback) => {
										const isValidatable = value && this.state.confirmDirty;
										const nextPasswordName = 'confirmedNewPassword';

										this._validateToNextPassword(isValidatable, nextPasswordName);
										callback();
									},
								},
								{
									validator: (rule, value, callback) => {
										const form = this.formInstance.getForm();
										const isInvalid = value && value === form.getFieldValue('password');
										const message = '新密码不能设置为与旧密码相同';

										if (isInvalid) {
											callback(message);
										} else {
											callback();
										}
									},
								},
							],
						}}
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<Input
							type="password"
							onBlur={(event) => {
								this._handleConfirmBlur('newPasswordDirty', event.target.value);
							}}
							style={inputStyle}
							placeholder="请输入新登录密码"
						/>
					</FormItem>
					<FormItem
						className="form-item"
						label="确认新登录密码："
						itemName="confirmedNewPassword"
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									message: '请输入新登录密码',
								},
								{
									validator: (rule, value, callback) => {
										const form = this.formInstance.getForm();
										const isInvalid = value && value !== form.getFieldValue('newPassword');
										const message = '新密码与确认密码不相符';

										if (isInvalid) {
											callback(message);
										} else {
											callback();
										}
									},
								},
							],
						}}
						columnType={FormItem.ColumnTypeEnums.LARGE}
					>
						<Input
							type="password"
							onBlur={(event) => {
								this._handleConfirmBlur('confirmDirty', event.target.value);
							}}
							style={inputStyle}
							placeholder="请输入新登录密码"
						/>
					</FormItem>
				</Form>
			</FormBlock>
		);
	}
}

ChangePasswordForm.propTypes = propTypes;
ChangePasswordForm.defaultProps = defaultProps;

export default ChangePasswordForm;
