import React, { Component, } from 'react';
import {
	Form,
	FormItem,
	TimePicker,
	InputNumber,
	InputGroup,
	RadioGroup,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';

const DATE_MAX_NUMBER = 31;
const DATE_MIX_NUMBER = 1;
const DateKeyEnums = {
	FIRST_DATE: 'first',
	SECOND_DATE: 'second',
	THIRD_DATE: 'third',
};
const { FIRST_DATE, SECOND_DATE, THIRD_DATE, } = DateKeyEnums;
const dateItemKeyConfigs = [
	{
		key: FIRST_DATE,
		label: '平台维护日期1',
	},{
		key: SECOND_DATE,
		label: '平台维护日期2',
	},{
		key: THIRD_DATE,
		label: '平台维护日期3',
	},
];

const timePickerStyle = {
	width: '152px',
};

const dateSpanStyle = {
	paddingLeft: '12px',
	paddingRight: '20px',
};

const timeSpanStyle = {
	paddingLeft: '12px',
	paddingRight: '12px',
};


const propTypes = {};
const defaultProps = {};

class SystemSettingPlatformMaintenancePage extends Component {
	constructor() {
		super();

		this._renderDateGroupItems = this._renderDateGroupItems.bind(this);
		this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
	}
	_handleFormSubmitClick(event) {
		//TODO submit api
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {

		});
	}
	_renderDateGroupItems(items = []) {
		return items.map(item => {
			return (
				<FormItem
					key ={item.key}
					label={item.label}
					columnType={FormItem.ColumnTypeEnums.MEDIUM}
					groupItemNames={getGroupItemNames(item.key)}
					isInputGroup
				>
					<InputGroup>
						<InputNumber
							max={DATE_MAX_NUMBER}
							min={DATE_MIX_NUMBER}
							key={`inputNumber-${item.key}`}
							style={{ width: '64px', }}
						/>
						<span key={`spanDate-${item.key}`} style={dateSpanStyle}>號</span>
						<TimePicker
							key={`startTime-${item.key}`}
							placeholder="開始時間"
							format={TimePicker.FormatTypeEnums.HHmm}
							style={timePickerStyle}
						/>
						<span key={`spanTime-${item.key}`} style={timeSpanStyle}>-</span>
						<TimePicker
							key={`endTime-${item.key}`}
							placeholder="結束時間"
							format={TimePicker.FormatTypeEnums.HHmm}
							style={timePickerStyle}
						/>
					</InputGroup>
				</FormItem>
			);
		});
	}
	render() {
		return (
			<PageBlock>
				<Form
					onSubmit={this._handleFormSubmitClick}
					submitText="储存变更"
					ref={(refForm) => this.formInstance = refForm }
					cancelButtonDisabled
				>
					<FormItem label="平台是否维护中 " itemName="isMaintenance" columnType={FormItem.ColumnTypeEnums.MEDIUM}>
						<RadioGroup
							options={[
								{ label: '是', value: true, },
								{ label: '否', value: false, },
							]}
						/>
					</FormItem>
					<FormItem label="维护结束时间" itemName="maintenanceEndAt" columnType={FormItem.ColumnTypeEnums.MEDIUM}>
						<TimePicker
							placeholder="結束時間"
							format={TimePicker.FormatTypeEnums.HHmm}
							style={timePickerStyle}
						/>
					</FormItem>
					{this._renderDateGroupItems(dateItemKeyConfigs)}
				</Form>
			</PageBlock>
		);
	}
}

SystemSettingPlatformMaintenancePage.propTypes = propTypes;
SystemSettingPlatformMaintenancePage.defaultProps = defaultProps;

function getGroupItemNames(key = '')
{
	return [
		`maintenance-${key}-dateAt`,
		'labelDate',
		`maintenance-${key}-startAt`,
		'labelTime',
		`maintenance-${key}-endAt`,
	];
}

export default SystemSettingPlatformMaintenancePage;
