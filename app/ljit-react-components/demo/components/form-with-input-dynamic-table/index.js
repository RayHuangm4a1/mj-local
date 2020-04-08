import React, { Component, } from 'react';
import {
	Input,
	Select,
	Form,
	FormItem,
	LabelContent,
} from 'ljit-react-components';
import InputDynamicTable from '../../../src/components/input-dynamic-table';
import './style.styl';

const fakeData = [
	{
		key: '0',
		ip:'ip1234',
		note:'note1',
		volsMinValue: '202520',
		volsMaxValue: '202521',
	},
	{
		key: '1',
		ip:'ip5678',
		note:'note2',
		volsMinValue: '202530',
		volsMaxValue: '202535',
	},
];

class FormWithDynamicTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			initialDatas: fakeData || [],
		};
		this.tableName = 'whiteList';
		this.columns = [
			{
				title: 'IP',
				dataIndex: 'ip',
				width: '25%',
				renderField: (record, rowIndex, onChange) => (
					<LabelContent
						validateStatus={record.ip ? LabelContent.ValidateStatusEnums.SUCCESS : LabelContent.ValidateStatusEnums.ERROR}
						helpMessage={record.ip ? null : 'IP 为必填'}
					>
						<Input
							style={{ width: '98px', }}
							value={record.ip}
							onChange={e => onChange('ip', e.target.value, rowIndex)}
						/>
					</LabelContent>
				),
			},
			{
				title: '备注',
				dataIndex: 'note',
				width: '25%',
				renderField: (record, rowIndex, onChange) => (
					<LabelContent
						validateStatus={record.note ? LabelContent.ValidateStatusEnums.SUCCESS : LabelContent.ValidateStatusEnums.ERROR}
						helpMessage={record.note ? null : '备注 为必填'}
					>
						<Select
							options={[
								{ label: 'note1', value: 'note1', },
								{ label: 'note2', value: 'note2', },
							]}
							value={record.note}
							onChange={e => onChange('note', e, rowIndex)}
						/>
					</LabelContent>
				),
			},
			{
				title: '期号',
				dataIndex: 'vols',
				width: '45%',
				renderField: (record, rowIndex, onChange) => (
					<div className="range-inputs-wrap">
						<LabelContent
							validateStatus={record.volsMinValue ? LabelContent.ValidateStatusEnums.SUCCESS : LabelContent.ValidateStatusEnums.ERROR}
							helpMessage={record.volsMinValue ? null : '期号 为必填'}
						>
							<Input
								style={{ width: '98px', }}
								value={record.volsMinValue}
								id="volsMinValue"
								onChange={e => onChange('volsMinValue', e.target.value, rowIndex)}
							/>
						</LabelContent>
						<span className="range-sign"> ~ </span>
						<LabelContent
							validateStatus={record.volsMaxValue ? LabelContent.ValidateStatusEnums.SUCCESS : LabelContent.ValidateStatusEnums.ERROR}
							helpMessage={record.volsMaxValue ? null : '期号 为必填'}
						>
							<Input
								style={{ width: '98px', }}
								value={record.volsMaxValue}
								id="volsMaxValue"
								onChange={e => onChange('volsMaxValue', e.target.value, rowIndex)}
							/>
						</LabelContent>
					</div>
				),
			},
		];

		this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
		this._handleFormCancelClick = this._handleFormCancelClick.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
	}

	_handleFormSubmitClick(e) {
		// TODO: API
		e.preventDefault();
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			console.log("Values",values)
		});
		console.log("form.getFieldsValue()", form.getFieldsValue());
	}

	_handleFormCancelClick() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	_handleFormChange(allValues) {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			console.log('allValues: ', allValues);
		});
	}

	_handleTableChange(value) {
		const tableName = this.tableName;
		const form = this.formInstance.getForm();
		const updatedTableData = {};

		updatedTableData[tableName] = value;

		form.setFieldsValue(updatedTableData);
	}

	render() {
		const { initialDatas, } = this.state;
		const {
			tableName,
			columns,
			_handleFormSubmitClick,
			_handleFormCancelClick,
			_handleFormChange,
			_handleTableChange,
		} = this;

		return (
			<Form
				onSubmit={_handleFormSubmitClick}
				onCancel={_handleFormCancelClick}
				onChange={_handleFormChange}
				ref={(refForm) => this.formInstance = refForm }
			>
				<FormItem
					key={'username'}
					itemName="username"
					columnType={FormItem.ColumnTypeEnums.SMALL}
					itemConfig={{
						rules: [{
							required: true,
							message: `username 为必填`,
						},],
					}}
				>
					<Input placeholder="請輸入 user name"/>
				</FormItem>

				<FormItem
					key={tableName}
					itemName={tableName}
					itemConfig={{
						initialValue: initialDatas,
					}}
				>
					<InputDynamicTable
						tableName={tableName}
						columns={columns}
						value={initialDatas}
						onChange={_handleTableChange}
					/>
				</FormItem>
			</Form>
		);
	}
}

export default FormWithDynamicTable;
