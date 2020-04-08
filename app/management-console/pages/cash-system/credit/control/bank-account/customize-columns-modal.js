import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
	Form,
	FormItem,
	CheckBoxGroup,
	RemindText,
} from 'ljit-react-components';
import PageModal from '../../../../../components/page-modal';
import {
	ColumnDefinitionEnums,
	ColumnDefinitionMap,
} from './utils';

const {
	NAME,
	BANK,
	BANK_ACCOUNT,
	STATUS,
} = ColumnDefinitionEnums;

const propTypes = {
	isModalVisible: PropTypes.bool,
	enabledColumns: PropTypes.array,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

const defaultProps = {
	isModalVisible: false,
	enabledColumns: [],
	onSubmit: () => {},
	onCancel: () => {},
};

const disabledCheckboxOptions = [NAME, BANK, BANK_ACCOUNT, STATUS];

function createCheckboxOptions() {
	return Object.keys(ColumnDefinitionMap).map((column) => {
		return {
			label: ColumnDefinitionMap[column].title,
			value: column,
			disabled: disabledCheckboxOptions.indexOf(column) !== -1
		};
	});
}

const PREFIX_CLASS = 'customize-columns-modal';
const MAX_COLUMN_COUNT = 9;

class CustomizeColumnsModal extends Component {
	constructor(props) {
		super(props);
		const initCheckboxOptions = createCheckboxOptions();

		this.state = {
			checkboxOptions: initCheckboxOptions,
			isReachLimitCount: false,
		};

		this._handleSubmitForm = this._handleSubmitForm.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleToggleCheckbox = this._handleToggleCheckbox.bind(this);
		this._renderRemindText = this._renderRemindText.bind(this);
	}

	_handleSubmitForm() {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const { columns = [] } = values;
				const enabledColumns = [...columns];

				this.props.onSubmit(enabledColumns);
				form.resetFields();
			}
		});
	}

	_handleCancel() {
		const form = this.formInstance.getForm();

		form.resetFields();
		this.props.onCancel();
	}

	_handleToggleCheckbox(checkedValues) {
		const currentSelectsCount = checkedValues.length;
		const { enabledColumns } = this.props;

		let options = [...this.state.checkboxOptions];

		if (currentSelectsCount >= MAX_COLUMN_COUNT) {
			options.forEach(option => {
				if (checkedValues.indexOf(option.value) === -1
					&& !option.disabled
				) {
					option.disabled = true;
				}
			});

			this.setState({
				isReachLimitCount: true,
			});
		} else {
			options.forEach(option => {
				if (enabledColumns.indexOf(option.value) === -1) {
					option.disabled = false;
				}
			});

			this.setState({
				isReachLimitCount: false,
			});
		}

		this.setState({
			checkboxOptions: options,
		});
	}

	_renderRemindText() {
		const { isReachLimitCount } = this.state;

		if (!isReachLimitCount) {
			return false;
		}

		return (
			<RemindText
				text={`显示项目最多为 ${MAX_COLUMN_COUNT} 项！`}
				styleType="error"
			/>
		);
	}

	render() {
		const {
			checkboxOptions,
		} = this.state;
		const { 
			isModalVisible,
			enabledColumns,
		} = this.props;
		const {
			_handleSubmitForm,
			_handleCancel,
			_handleToggleCheckbox,
			_renderRemindText,
		} = this;

		return (
			<PageModal
				title="自订显示项目"
				visible={isModalVisible}
				onClickOk={_handleSubmitForm}
				onClickCancel={_handleCancel}
				modalSize="normal"
				className={PREFIX_CLASS}
			>
				<Form
					ref={formInstance => this.formInstance = formInstance}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						itemName="columns"
						itemConfig={{
							initialValue: enabledColumns
						}}
					>
						<CheckBoxGroup
							options={checkboxOptions}
							onChange={_handleToggleCheckbox}
						/>
					</FormItem>
				</Form>
				{_renderRemindText()}
			</PageModal>
		);
	}
}

CustomizeColumnsModal.propTypes = propTypes;
CustomizeColumnsModal.defaultProps = defaultProps;

export default CustomizeColumnsModal;
