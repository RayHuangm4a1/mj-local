import React from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	InputNumber,
	Select,
	RadioGroup,
} from 'ljit-react-components';
import PageModal from '../../../components/page-modal';
import { PREFIX_CLASS, } from './utils';

const propTypes = {
	isVisible: PropTypes.bool,
	initialValues: PropTypes.shape({
		transactionPlatformId: PropTypes.string,
		transactionType: PropTypes.string,
		transactionAmount: PropTypes.number,
	}),
	platformOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	transactionTypeOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	initialValues: {},
	platformOptions: [],
	transactionTypeOptions: [],
	onCancel: () => {},
	onSubmit: () => {},
};

function SingleTransferModal({
	isVisible,
	initialValues,
	platformOptions,
	transactionTypeOptions,
	onCancel,
	onSubmit,
}) {
	const formInstance = React.useRef(null);
	const _handleSubmit = (event) => {
		const form = formInstance.current.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values, form);
				form.resetFields();
			}
		});
	};
	const _handleCancel = (event) => {
		const form = formInstance.current.getForm();

		onCancel(event, form);
		form.resetFields();
	};

	return (
		<PageModal
			className={`${PREFIX_CLASS}__single-transfer-modal`}
			visible={isVisible}
			title="单笔转换"
			onClickCancel={_handleCancel}
			onClickOk={_handleSubmit}
		>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					itemName="transactionPlatformId"
					label="交易平台"
					labelColon
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					itemConfig={{
						initialValue: initialValues.transactionPlatformId,
						rules: [
							{
								required: true,
								message: '交易平台不能为空',
							},
						],
					}}
				>
					<Select
						placeholder="请选择平台"
						options={platformOptions}
					/>
				</FormItem>
				<FormItem
					itemName="transactionType"
					label="交易类型"
					labelColon
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					itemConfig={{
						initialValue: initialValues.transactionType,
					}}
				>
					<RadioGroup
						options={transactionTypeOptions}
					/>
				</FormItem>
				<FormItem
					itemName="transactionAmount"
					label="交易金额"
					labelColon
					noMargin
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					itemConfig={{
						initialValue: initialValues.transactionAmount,
						rules: [
							{
								required: true,
								message: '交易金额不能为空',
							},
						],
					}}
				>
					<InputNumber
						min={0}
					/>
				</FormItem>
			</Form>
		</PageModal>
	);
}

SingleTransferModal.propTypes = propTypes;
SingleTransferModal.defaultProps = defaultProps;

export default SingleTransferModal;
