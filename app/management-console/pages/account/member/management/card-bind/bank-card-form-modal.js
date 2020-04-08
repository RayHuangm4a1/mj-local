import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import PageModal from '../../../../../components/page-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	payer: PropTypes.string,
	number: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	title: PropTypes.string,
	className: PropTypes.string,
};
const defaultProps = {
	isVisible: false,
	onSubmit: () => {},
	onCancel: () => {},
	title: '',
	className: '',
};

function BankCardFormModal({
	isVisible,
	onSubmit,
	onCancel,
	payer,
	number,
	title,
	className,
}) {
	const formRef = useRef(null);

	function _handleSubmit() {
		const form = formRef.current.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				form.resetFields();
			}
		});
	}

	function _handleCancel() {
		const form = formRef.current.getForm();

		onCancel();
		form.resetFields();
	}

	return (
		<PageModal
			visible={isVisible}
			title={title}
			onClickCancel={_handleCancel}
			onClickOk={_handleSubmit}
			className={className}
		>
			<Form
				ref={formRef}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					itemName="payer"
					itemConfig={{ initialValue: payer, }}
					label="姓名"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						disabled
					/>
				</FormItem>
				<FormItem
					itemName="number"
					itemConfig={{
						initialValue: number,
						rules: [{
							required: true,
							message: '请输入银行卡号'
						},]
					}}
					label="卡号"
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<Input
						placeholder="请输入卡号"
					/>
				</FormItem>
			</Form>
		</PageModal>
	);
}

BankCardFormModal.propTypes = propTypes;
BankCardFormModal.defaultProps = defaultProps;

export default BankCardFormModal;
