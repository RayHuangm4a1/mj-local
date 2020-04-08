import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Input,
	InputNumber,
	Select,
	CollapsableForm,
	DateRangePicker,
	CheckBox,
	CheckBoxGroup,
} from 'ljit-react-components';
import {
	DepositStatusEnum,
	LevelIdEnums,
	LevelIdTextEnums,
} from '../../../../../lib/enums';
import './style.styl';

const {
	ColumnSizeEnums,
	CollapseTypeEnum,
} = CollapsableForm;

const propTypes = {
	collapseItemsLength: PropTypes.number,
	onSearch: PropTypes.func,
};
const defaultProps = {
	onSearch: () => {},
};

const {
	TODAY,
	YESTERDAY,
	LAST_SEVEN_DAYS,
	LAST_THIRTY_DAYS,
} = DateRangePicker.RangesEnums;

const datePickerRange = [
	TODAY,
	YESTERDAY,
	LAST_SEVEN_DAYS,
	LAST_THIRTY_DAYS
];

const dateFormat = 'YYYY/M/DD hh:mm';

const inputStyle = {
	width: '250px',
};

const {
	NEW,
	CONFIRMED,
	CANCELED,
	INCONSISTENT,
	EXPIRED,
} = DepositStatusEnum;

const {
	NORMAL_ONE,
	NORMAL_TWO,
	NORMAL_THREE,
	NORMAL_FOUR,
	NORMAL_FIVE,
	NORMAL_SIX,
	NORMAL_SEVEN,
	NORMAL_EIGHT,
	NORMAL_NINE,
	NORMAL_TEN,
	SPECIAL_ONE,
	SPECIAL_TWO,
	SPECIAL_THREE,
	SPECIAL_FOUR,
	SPECIAL_FIVE,
	SPECIAL_SIX,
	SPECIAL_SEVEN,
	SPECIAL_EIGHT,
	SPECIAL_NINE,
	SPECIAL_TEN,
} = LevelIdEnums;

const checkedBoxOption = [
	{ label: '已确认', value: CONFIRMED, },
	{ label: '已取消', value: CANCELED, },
	{ label: '残留', value: INCONSISTENT, },
	{ label: '已过期', value: EXPIRED, },
	{ label: '待确认', value: NEW, },
];

// TODO use fetchFinanceLevelsAction to get data and delete this and enums
const levelOptions = [
	{ label: '全选', value: null },
	{ label: LevelIdTextEnums[NORMAL_ONE], value: NORMAL_ONE, },
	{ label: LevelIdTextEnums[NORMAL_TWO], value: NORMAL_TWO, },
	{ label: LevelIdTextEnums[NORMAL_THREE], value: NORMAL_THREE, },
	{ label: LevelIdTextEnums[NORMAL_FOUR], value: NORMAL_FOUR, },
	{ label: LevelIdTextEnums[NORMAL_FIVE], value: NORMAL_FIVE, },
	{ label: LevelIdTextEnums[NORMAL_SIX], value: NORMAL_SIX, },
	{ label: LevelIdTextEnums[NORMAL_SEVEN], value: NORMAL_SEVEN, },
	{ label: LevelIdTextEnums[NORMAL_EIGHT], value: NORMAL_EIGHT, },
	{ label: LevelIdTextEnums[NORMAL_NINE], value: NORMAL_NINE, },
	{ label: LevelIdTextEnums[NORMAL_TEN], value: NORMAL_TEN, },
	{ label: LevelIdTextEnums[SPECIAL_ONE], value: SPECIAL_ONE, },
	{ label: LevelIdTextEnums[SPECIAL_TWO], value: SPECIAL_TWO, },
	{ label: LevelIdTextEnums[SPECIAL_THREE], value: SPECIAL_THREE, },
	{ label: LevelIdTextEnums[SPECIAL_FOUR], value: SPECIAL_FOUR, },
	{ label: LevelIdTextEnums[SPECIAL_FIVE], value: SPECIAL_FIVE, },
	{ label: LevelIdTextEnums[SPECIAL_SIX], value: SPECIAL_SIX, },
	{ label: LevelIdTextEnums[SPECIAL_SEVEN], value: SPECIAL_SEVEN, },
	{ label: LevelIdTextEnums[SPECIAL_EIGHT], value: SPECIAL_EIGHT, },
	{ label: LevelIdTextEnums[SPECIAL_NINE], value: SPECIAL_NINE, },
	{ label: LevelIdTextEnums[SPECIAL_TEN], value: SPECIAL_TEN, },
];

class DepositRecordSearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			expand: true,
			isSelectAllStatuses: false,
		};
		this._handleSearchForm = this._handleSearchForm.bind(this);
		this._handleResetForm = this._handleResetForm.bind(this);
		this._handleChangeCheckBox = this._handleChangeCheckBox.bind(this);
		this._handleChangeCheckBoxGroup = this._handleChangeCheckBoxGroup.bind(this);
		this._renderContentFields = this._renderContentFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
	}
	_handleSearchForm() {
		const {
			props,
			collapsableFormInstance,
		} = this;
		const form = collapsableFormInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				props.onSearch(values);
			}
		});
	}
	_handleResetForm() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
		this.setState({ isSelectAllStatuses: false, });
	}
	_handleChangeCheckBox() {
		const form = this.collapsableFormInstance.getForm();
		const allStatusList = checkedBoxOption.map(item => item.value);
		const status = this.state.isSelectAllStatuses ? [] : allStatusList;

		form.setFieldsValue({ status, });
		this.setState(prevState => ({ isSelectAllStatuses: !prevState.isSelectAllStatuses, }));
	}
	_handleChangeCheckBoxGroup(value) {
		const isSelectAllStatuses = value.length === checkedBoxOption.length;

		this.setState({ isSelectAllStatuses, });
	}
	_renderContentFields() {
		const {
			state,
			_handleChangeCheckBox,
			_handleChangeCheckBoxGroup,
		} = this;

		const content = [
			<FormItem label="会员" key={1} itemName="username" className="deposit-form-item">
				<Input
					style={inputStyle}
					placeholder="请输入会员帐号"
				/>
			</FormItem>,
			<FormItem label="层级" key={2} itemName="levelId" className="deposit-form-item"  itemConfig={{ initialValue: null, }}>
				<Select
					style={inputStyle}
					options={levelOptions}
					placeholder={'不指定'}
				/>
			</FormItem>,
			<FormItem label="订单编号" key={3} itemName="id" className="deposit-form-item">
				<Input
					style={inputStyle}
					placeholder="请输入订单编号"
				/>
			</FormItem>,
			<FormItem label="存入银行" key={4} itemName="bankId" className="deposit-form-item"  itemConfig={{ initialValue: null, }}>
				<Select
					style={inputStyle}
					options={[
						{ label: '全选', value: null, },
						{ label: '中国银行', value: '中国银行' },
						{ label: '兴业银行', value: '兴业银行' },
						{ label: '中信银行', value: '中信银行' },
					]}
					placeholder={'不指定'}
				/>
			</FormItem>,
			<FormItem label="存款人姓名" key={5} itemName="payer" className="deposit-form-item">
				<Input
					style={inputStyle}
					placeholder="请输入存款人姓名"
				/>
			</FormItem>,
			<FormItem label="订单金额" key={6} itemName="amount" className="deposit-form-item">
				<InputNumber
					style={inputStyle}
					placeholder="请输入订单金额"
					min={0}
				/>
			</FormItem>,
			<FormItem label="申请日期" key={7} itemName="createdDate" className="deposit-form-item">
				<DateRangePicker
					format={dateFormat}
					inputStyle={inputStyle}
					ranges={datePickerRange}
				/>
			</FormItem>,
			<FormItem label="确认日期" key={8} itemName="confirmDate" className="deposit-form-item">
				<DateRangePicker
					format={dateFormat}
					inputStyle={inputStyle}
					ranges={datePickerRange}
				/>
			</FormItem>,
			<div key={9} className="status-block">
				<CheckBox
					onChange={_handleChangeCheckBox}
					value={state.isSelectAllStatuses}
				>
					全选
				</CheckBox>
				<FormItem label="状态" itemName="status" className="deposit-form-item">
					<CheckBoxGroup
						options={checkedBoxOption}
						onChange={_handleChangeCheckBoxGroup}
					/>
				</FormItem>
			</div>,
		];

		return content;
	}
	_renderCollapseFields(content) {
		const { collapseItemsLength = 0, } = this.props;

		if (collapseItemsLength > 0) {
			return content.slice(0, collapseItemsLength);
		}
		return content;
	}
	render() {
		const {
			state,
			_handleSearchForm,
			_handleResetForm,
			_renderContentFields,
			_renderCollapseFields,
		} = this;
		const content = _renderContentFields();
		const collapse = _renderCollapseFields(content);

		return (
			<CollapsableForm
				expand={state.expand}
				onSubmit={_handleSearchForm}
				onCancel={_handleResetForm}
				submitText="查询"
				cancelText="重置"
				collapseType={CollapseTypeEnum.INSERTROW}
				columnSize={ColumnSizeEnums.SMALL}
				ref={(refForm) => this.collapsableFormInstance = refForm}
				expandChildren={content}
				collapseChildren={collapse}
			/>
		);
	}
}

DepositRecordSearchForm.propTypes = propTypes;
DepositRecordSearchForm.defaultProps = defaultProps;

export default DepositRecordSearchForm;
