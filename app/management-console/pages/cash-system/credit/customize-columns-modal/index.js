import React, { useState, useRef, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import PageModal from '../../../../components/page-modal';
import {
	Form,
	FormItem,
	CheckBoxGroup,
	RemindText,
} from 'ljit-react-components';

const propTypes = {
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	enabledColumns: PropTypes.array,
	onSubmit: PropTypes.func,
	onClickCancel: PropTypes.func,
	columnDefinitionMap: PropTypes.object,
	defaultEnabledColumns: PropTypes.array,
};
const defaultProps = {
	className: '',
	isVisible: false,
	enabledColumns: [],
	onSubmit: () => {},
	onClickCancel: () => {},
	columnDefinitionMap: [],
	defaultEnabledColumns: [],
};

const MAX_COLUMN_COUNT = 11;

export function createInitCheckboxOptions(columnDefinitionMap = [], defaultEnabledColumns = []) {
	return Object.keys(columnDefinitionMap)
		.map((column) => {
			return {
				label: columnDefinitionMap[column].title,
				value: column,
				disabled: defaultEnabledColumns.indexOf(column) === -1,
				checkBoxElementLocation: columnDefinitionMap[column].checkBoxElementLocation,
			};
		}).sort((a, b) => a.checkBoxElementLocation - b.checkBoxElementLocation);
}

function CustomizeColumnsModal({
	className,
	isVisible,
	enabledColumns,
	onSubmit,
	onClickCancel,
	columnDefinitionMap,
	defaultEnabledColumns,
}) {
	const [isReachLimitCount, setIsReachLimitCount] = useState(true);
	const [checkboxOptions, setCheckboxOptions] = useState(createInitCheckboxOptions(columnDefinitionMap, defaultEnabledColumns));
	const FormInstance = useRef(null);
	const _handleSubmitForm = () => {
		const form = FormInstance.current.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const { columns = [] } = values;
				const enabledColumns = [ ...columns ];

				onSubmit(enabledColumns);
				form.resetFields();
			}
		});
	};
	const _handleCancel = () => {
		const form = FormInstance.current.getForm();

		onClickCancel();
		form.resetFields();
	};
	const _handleChangeCheckBoxGroup = (checkedValues) => {
		const currentSelectedItemCount = checkedValues.length;

		let nextCheckboxOptions, isReachLimitCount;

		if (currentSelectedItemCount >= MAX_COLUMN_COUNT) {
			nextCheckboxOptions = checkboxOptions.map((option) => {
				if (checkedValues.indexOf(option.value) === -1 && !option.disabled) {
					option.disabled = true;
				}
				return option;
			});
			isReachLimitCount = true;
		} else {
			nextCheckboxOptions = checkboxOptions.map((option) => {
				if (checkedValues.indexOf(option.value) === -1) {
					option.disabled = false;
				}
				return option;
			});
			isReachLimitCount = false;
		}
		setIsReachLimitCount(isReachLimitCount);
		setCheckboxOptions(nextCheckboxOptions);
	};
	const _renderRemindText = () => {
		if (isReachLimitCount) {
			return (
				<RemindText
					text={`显示项目最多为${MAX_COLUMN_COUNT}项！`}
					styleType="error"
				/>
			);
		}
		return null; 
	};

	return (
		<PageModal
			title="自订显示项目"
			modalSize="normal"
			className={cx(className, "customize-columns-modal")}
			visible={isVisible}
			onClickOk={_handleSubmitForm}
			onClickCancel={_handleCancel}
		>
			<Form
				ref={FormInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<FormItem
					itemName="columns"
					itemConfig={{
						initialValue: enabledColumns,
					}}
				>
					<CheckBoxGroup
						options={checkboxOptions}
						onChange={_handleChangeCheckBoxGroup}
					/>
				</FormItem>
				{_renderRemindText()}
			</Form>
		</PageModal>
	);
}

CustomizeColumnsModal.propTypes = propTypes;
CustomizeColumnsModal.defaultProps = defaultProps;

export default CustomizeColumnsModal;