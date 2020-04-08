import React, { useRef, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	InputNumber,
} from '../../../src';

const propTypes = {
	onSearch: PropTypes.func,
	onReset: PropTypes.func,
};

const CustomFilterForm = ({
	onSearch = () => {},
	onReset = () => {},
}) => {
	const formInstance = useRef(null);

	function getForm() {
		return formInstance.current.getForm();
	}

	function _handleSearch(event) {
		event.preventDefault();

		const form = getForm();

		form.validateFields((error, formData) => {
			if (!error) {
				onSearch(formData);
			}
		});
	}
	function _handleReset() {
		const form = getForm();

		form.resetFields();
		onReset();
	}

	return (
		<Form
			onSubmit={_handleSearch}
			onCancel={_handleReset}
			cancelText="重置"
			ref={formInstance}
		>
			<FormItem
				label="Name"
				itemName="name"
				columnType={FormItem.ColumnTypeEnums.SMALL}
			>
				<Input />
			</FormItem>
			<FormItem
				label="Age"
				itemName="age"
				columnType={FormItem.ColumnTypeEnums.SMALL}
			>
				<InputNumber
					min={0}
					max={200}
				/>
			</FormItem>
			<FormItem
				label="Address0"
				itemName="address0"
				columnType={FormItem.ColumnTypeEnums.SMALL}
			>
				<Input />
			</FormItem>
		</Form>
	);
};

CustomFilterForm.propTypes = propTypes;

export default CustomFilterForm;
