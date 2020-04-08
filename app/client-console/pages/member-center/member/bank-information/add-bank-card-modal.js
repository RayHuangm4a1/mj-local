import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import SubmitFormModal from '../../../../components/submit-form-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	payer: PropTypes.string,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	onSubmit: () => {},
	onCancel: () => {},
};

const PREFIX_CLASS = 'ljit-member-bank-info';

class AddBankCardModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}
	_handleSubmit() {
		const form = this.FormInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const { onSubmit, } = this.props;
				const { payer, number, } = values;
				const payerTrimmed = payer.trim();
				const numberTrimmed = number.replace(/\s+/g, '');

				onSubmit({ payer: payerTrimmed, number: numberTrimmed, });
				form.resetFields();
			}
		});
	}
	_handleCancel() {
		const { onCancel, } = this.props;
		const form = this.FormInstance.getForm();

		onCancel();
		form.resetFields();
	}

	render() {
		const {
			isVisible,
			payer,
		} = this.props;
		const {
			_handleSubmit,
			_handleCancel,
		} = this;

		return (
			<SubmitFormModal
				isVisible={isVisible}
				title="添加银行卡"
				onClickCancel={_handleCancel}
				onClickOk={_handleSubmit}
				width="440px"
				className={`${PREFIX_CLASS}__modal`}
			>
				<Form
					ref={formInstance => this.FormInstance = formInstance}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<div className={`${PREFIX_CLASS}__modal-content`}>
						<FormItem
							className={`${PREFIX_CLASS}__form-item`}
							label="持卡人姓名"
							labelColon={false}
							itemName="payer"
							itemConfig={{
								initialValue: payer,
								rules: [
									{
										required: true,
										message: '持卡人姓名不能为空',
									},{
										pattern: /^[A-Za-z\u4e00-\u9fa5/]+$/,
										message: '持卡人姓名不能包含数字和特殊字元',
									},{
										max: 32,
										message: '持卡人姓名不能超過32個字元'
									}
								],
							}}
						>
							<Input
								placepayer="输入持卡人姓名"
								disabled={Boolean(payer)}
							/>
						</FormItem>
						<FormItem
							className={`${PREFIX_CLASS}__form-item`}
							label="银行卡号"
							labelColon={false}
							itemName="number"
							itemConfig={{
								initialValue: null,
								rules: [
									{
										required: true,
										message: '银行卡号不能为空',
									},
								],
							}}
						>
							<Input
								placepayer="输入银行卡号"
							/>
						</FormItem>
					</div>
				</Form>
			</SubmitFormModal>
		);
	}
}

AddBankCardModal.propTypes = propTypes;
AddBankCardModal.defaultProps = defaultProps;

export default AddBankCardModal;
