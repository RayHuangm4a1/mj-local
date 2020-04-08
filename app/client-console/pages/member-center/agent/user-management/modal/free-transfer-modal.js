import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	Input,
	InputNumber,
	Icon,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../../components/submit-form-modal';
import PropTypes from 'prop-types';
import cx from 'classnames';

const PREFIX_CLASS = 'free-transfer-modal';

const propTypes = {
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	onClickOk: PropTypes.func,
	onClickCancel: PropTypes.func,
};
const defaultProps = {
	onClickOk: () => {},
	onClickCancel: () => {},
	isVisible: false,
};

class FreeTransferModal extends Component {
	constructor() {
		super();

		this.resetForm = this.resetForm.bind(this);
		this._handleClickOK = this._handleClickOK.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
	}
	resetForm() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	_handleClickOK() {
		const { onClickOk, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onClickOk(values);
			}
		});
	}

	_handleClickCancel() {
		const { onClickCancel, } = this.props;
		const form = this.formInstance.getForm();

		onClickCancel();
		form.resetFields();
	}

	render() {
		const {
			_handleClickOK,
			_handleClickCancel,
		} = this;
		const {
			isVisible,
			className,
		} = this.props;

		return (
			<SubmitFormModal
				title='任意转帐'
				width="440px"
				isVisible={isVisible}
				onClickCancel={_handleClickCancel}
				onClickOk={_handleClickOK}
				className={cx(PREFIX_CLASS, className)}
			>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<FormItem
						label="会员名"
						itemName="username"
						labelColon={false}
						itemConfig={{
							rules: [{
								required: true,
								message: '会员名称为必填',
							}]
						}}
					>
						<Input
							placeholder="请输入会员名"
						/>
					</FormItem>
					<FormItem
						label="会员任意银行卡后六位"
						itemName="bankCardNumber"
						labelColon={false}
						itemConfig={{
							rules: [{
								required: true,
								message: '银行卡号为必填',
							}]
						}}
					>
						<Input
							placeholder="请输入会员任意银行卡后六位"
						/>
					</FormItem>
					<FormItem
						label="转帐金额"
						itemName="amount"
						labelColon={false}
						itemConfig={{
							rules: [{
								required: true,
								message: '转帐金额为必填',
							}]
						}}
					>
						<InputNumber
							placeholder="请输入转帐金额"
						/>
					</FormItem>
					<FormItem
						label="资金密码"
						itemName="password"
						labelColon={false}
						itemConfig={{
							rules: [{
								required: true,
								message: '资金密码为必填',
							}]
						}}
					>
						<Input
							placeholder="请输入资金密码"
							type="password"
						/>
					</FormItem>
					<FormItem
						label="谷歌动态密码"
						itemName="totp"
						labelColon={false}
						itemConfig={{
							rules: [{
								required: true,
								message: '谷歌动态密码为必填',
							}]
						}}
					>
						<Input
							placeholder="请输入谷歌动态密码"
							type="password"
						/>
					</FormItem>
					<div className="prompt-message">
						<Icon
							type={Icon.IconTypeEnums.INFO_FILL}
							size={Icon.SizeEnums.X_SMALL}
						/>
						任意转帐不影响任何报表
					</div>
				</Form>
			</SubmitFormModal>
		);
	}
}

FreeTransferModal.propTypes = propTypes;
FreeTransferModal.defaultProps = defaultProps;

export default FreeTransferModal;
