import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import { Form, FormItem, Select, } from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const propTypes = {
	modalTitle: PropTypes.string,
	modalLabel: PropTypes.string,
	isShowModal: PropTypes.bool,
	wageValue: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	wageOptions: PropTypes.array,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};
const defaultProps = {
	isShowModal: false,
	modalTitle: '',
	modalLabel: '',
	wageValue: '',
	wageOptions: [],
	onSubmit: () => {},
	onCancel: () => {},
};

const wagePropName = 'fixedWage';

function WageRuleModal({
	isShowModal,
	modalTitle,
	modalLabel,
	wageValue,
	wageOptions,
	onSubmit,
	onCancel,
}) {
	const formElement = useRef(null);

	function _handleSubmit() {
		const { validateFields, resetFields, } = formElement.current;

		validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				resetFields();
			}
		});
	}

	function _handleCancel() {
		const { resetFields, } = formElement.current;

		resetFields();
		onCancel();
	}

	return (
		<PageModal
			title={modalTitle}
			visible={isShowModal}
			onClickOk={_handleSubmit}
			onClickCancel={_handleCancel}
		>
			<Form
				ref={formElement}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					label={modalLabel}
					itemName={wagePropName}
					itemConfig={{
						initialValue: wageValue,
					}}
					className="member-dividend-rule__modal-form"
				>
					<Select
						options={wageOptions}
					/>
				</FormItem>
			</Form>
		</PageModal>
	);
}

WageRuleModal.propTypes = propTypes;
WageRuleModal.defaultProps = defaultProps;

export default WageRuleModal;
