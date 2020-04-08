import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Row,
	Col,
	Input,
	Select,
	DateRangePicker,
	Button,
} from 'ljit-react-components';

const ModeEnum = {
	SEARCH: 'search',
	ADD: 'add',
};
const { SEARCH, ADD, } = ModeEnum;

const propTypes = {
	mode: PropTypes.oneOf([
		SEARCH,
		ADD
	]).isRequired,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	onClickImport: PropTypes.func,
	onClickBatch: PropTypes.func,
};
const defaultProps = {
	onSubmit: () => {},
	onCancel: () => {},
	onClickImport: () => {},
	onClickBatch: () => {},
};

const fakeBanksOption = [
	{
		value: null,
		label: "全部"
	},
	{
		value: 1000000,
		label: "邮政储汇"
	},
	{
		value: 1020000,
		label: "工商银行"
	},
	{
		value: 1030000,
		label: "农业银行"
	},
	{
		value: 1040000,
		label: "中国银行"
	},
	{
		value: 1050000,
		label: "建设银行"
	},
	{
		value: 3010000,
		label: "交通银行"
	},
	{
		value: 3020000,
		label: "中信银行"
	},
	{
		value: 3030000,
		label: "光大银行"
	},
	{
		value: 3040000,
		label: "华夏银行"
	},
	{
		value: 3050000,
		label: "民生银行"
	},
	{
		value: 3060000,
		label: "广发银行"
	},
	{
		value: 3070010,
		label: "平安银行"
	},
	{
		value: 3080000,
		label: "招商银行"
	},
	{
		value: 3090000,
		label: "兴业银行"
	},
	{
		value: 3100000,
		label: "浦发银行"
	},
];

class InputForm extends Component {
	constructor() {
		super();

		this.resetForm = this.resetForm.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderDatePicker = this._renderDatePicker.bind(this);
		this._renderAddButtons = this._renderAddButtons.bind(this);
		this._renderBankField = this._renderBankField.bind(this);
	}
	resetForm() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}
	_handleSubmit(event) {
		event.preventDefault();
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
			}
		});
	}
	_handleReset() {
		const { resetForm, } = this;
		const { onCancel, } = this.props;

		onCancel();
		resetForm();
	}

	_renderDatePicker() {
		return (
			<Col span={8}>
				<FormItem
					label="日期"
					itemName="fromTo"
					columnType={FormItem.ColumnTypeEnums.SMALL}
				>
					<DateRangePicker/>
				</FormItem>
			</Col>
		);
	}

	_renderBankField() {
		return (
			<Col span={8}>
				<FormItem
					label="银行"
					itemName="bankId"
					columnType={FormItem.ColumnTypeEnums.SMALL}
				>
					<Select
						placeholder="请选择"
						// TODO Implement API to get bankId options
						options={fakeBanksOption}
					/>
				</FormItem>
			</Col>
		);
	}

	_renderAddButtons() {
		const { _handleSubmit, } = this;
		const {
			onClickBatch,
			onClickImport,
		} = this.props;

		return (
			<Col span={24} style={{ textAlign: 'right', }}>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					icon="plus"
					onClick={onClickImport}
				>
					单式汇入
				</Button>
				<Button
					icon="plus"
					outline={Button.OutlineEnums.HOLLOW}
					style={{ marginLeft: 16, }}
					onClick={onClickBatch}
				>
					批量新增
				</Button>
				<Button
					color={Button.ColorEnums.BRIGHTBLUE500}
					icon="plus"
					style={{ marginLeft: 16, }}
					onClick={_handleSubmit}
				>
					新增黑名单
				</Button>
			</Col>
		);
	}

	render() {
		const { mode, } = this.props;
		const {
			_handleSubmit,
			_handleReset,
			_renderDatePicker,
			_renderAddButtons,
			_renderBankField,
		} = this;

		let datePicker;
		let bank;
		let addButtons;
		let submitButtonDisabled;
		let cancelButtonDisabled;
		let isNumberRequired;

		if (mode === SEARCH) {
			datePicker = _renderDatePicker();
			bank = _renderBankField();
			addButtons = null;
			submitButtonDisabled = false;
			cancelButtonDisabled = false;
			isNumberRequired = false;
		}
		if (mode === ADD) {
			datePicker = null;
			bank = null;
			addButtons = _renderAddButtons();
			submitButtonDisabled = true;
			cancelButtonDisabled = true;
			isNumberRequired = true;
		}

		return (
			<Form
				ref={formRef => this.formInstance = formRef}
				onSubmit={_handleSubmit}
				onCancel={_handleReset}
				submitText="查询"
				cancelText="重置"
				submitButtonDisabled={submitButtonDisabled}
				cancelButtonDisabled={cancelButtonDisabled}
			>
				<Row gutter={32}>
					<Col span={8}>
						<FormItem
							label="姓名"
							itemName="blockedPayer"
							itemConfig={{
								rules: [
									{
										pattern: /^[A-Za-z\u4e00-\u9fa5/]+$/,
										message: '持卡人姓名不能包含数字和特殊字元',
									},{
										max: 32,
										message: '持卡人姓名不能超過32個字元'
									}
								]
							}}
							columnType={FormItem.ColumnTypeEnums.SMALL}
						>
							<Input
								placeholder="请输入姓名"
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							label="银行卡号"
							itemName="number"
							columnType={FormItem.ColumnTypeEnums.SMALL}
							itemConfig={{
								rules: [
									{
										required: isNumberRequired,
										message: '银行卡号不能为空',
									}
								]
							}}
						>
							<Input
								placeholder="请输入卡号"
							/>
						</FormItem>
					</Col>
					{bank}
					{datePicker}
					<Col span={8}>
						<FormItem
							label="备注"
							itemName="description"
							itemConfig={{
								rules: [{
									max: 32,
									message: '备注不能超過32個字元'
								}]
							}}
							columnType={FormItem.ColumnTypeEnums.SMALL}
						>
							<Input
								placeholder="请输入备注"
							/>
						</FormItem>
					</Col>
					{addButtons}
				</Row>
			</Form>
		);
	}
}

InputForm.propTypes = propTypes;
InputForm.defaultProps = defaultProps;

InputForm.ModeEnum = ModeEnum;

export default InputForm;
