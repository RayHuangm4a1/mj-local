
import React from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	InputNumber,
} from 'ljit-react-components';
import PageModal from '../../../components/page-modal';
import { PREFIX_CLASS, } from './utils';

const propTypes = {
	initialValues: PropTypes.shape({
		damaBet: PropTypes.number,
	}),
	isVisible: PropTypes.bool,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
	isVisible: false,
	onCancel: () => {},
	onSubmit: () => {},
};

function AdjustmentModal({
	initialValues,
	isVisible,
	onSubmit,
	onCancel,
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
			className={`${PREFIX_CLASS}__adjustment-modal`}
			modalSize="small"
			isCentered
			visible={isVisible}
			title="调整打码量"
			onClickCancel={_handleCancel}
			onClickOk={_handleSubmit}
		>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					noMargin
					labelColon
					label="打码量"
					itemName="damaBet"
					itemConfig={{
						initialValue: initialValues.damaBet,
						rules: [
							{
								required: true,
								message: '打码量不能为空',
							},
						],
					}}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
				>
					<InputNumber
						min={0}
					/>
				</FormItem>
			</Form>
		</PageModal>
	);
}

AdjustmentModal.propTypes = propTypes;
AdjustmentModal.defaultProps = defaultProps;

export default AdjustmentModal;
