import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	InputNumber,
	Select,
	RadioGroup,
	DatePicker,
	DateRangePicker,
	Row,
	Col,
} from 'ljit-react-components';
import {
	UnitEnums,
	checkHourUnit,
} from '../utils';


const {
	DAY,
	HOUR,
} = UnitEnums;
const COLUMN_SPAN = 8;
const DATE_LABEL = '日期';
const DATE_PLACEHOLDER = '請輸入日期';
const DATE_FORMAT = 'YYYY/MM/DD';

const propTypes = {
	initialValues: PropTypes.shape({
		account: PropTypes.string,
		achieveAmount: PropTypes.number,
		gameType: PropTypes.string,
		unit: PropTypes.string,
		period: PropTypes.arrayOf(PropTypes.object),
		date: PropTypes.object
	}),
	gameTypeOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onSearch: PropTypes.func,
	onReset: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
	gameTypeOptions: [],
	onSearch: () => {},
	onReset: () => {},
};

class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			unitInitialValue: props.initialValues.unit,
			unitValue: props.initialValues.unit,
		};
		this._handleRadioChange = this._handleRadioChange.bind(this);
		this._renderPreiod = this._renderPreiod.bind(this);
		this._renderDate = this._renderDate.bind(this);
		this._renderDatePicker = this._renderDatePicker.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_renderPreiod() {
		return (
			<FormItem
				label={DATE_LABEL}
				itemName="period"
				itemConfig={{
					initialValue: this.props.initialValues.period || [],
				}}
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<DateRangePicker
					className="chart-picker"
					style={{ width: '100%', }}
					placeholder={DATE_PLACEHOLDER}
					format={DATE_FORMAT}
					ranges={[
						'today',
						'lastSevenDays',
						'lastThirtyDays',
					]}
				/>
			</FormItem>
		);
	}
	_renderDate() {
		return (
			<FormItem
				label={DATE_LABEL}
				itemName="date"
				itemConfig={{
					initialValue: this.props.initialValues.date,
				}}
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<DatePicker
					className="chart-picker"
					placeholder={DATE_PLACEHOLDER}
					format={DATE_FORMAT}
					isShowToday
				/>
			</FormItem>
		);
	}

	_renderDatePicker(unitValue) {
		let picker = null;

		if (unitValue === DAY) {
			picker = this._renderPreiod();
		} else if (checkHourUnit(HOUR)) {
			picker = this._renderDate();
		}

		return picker;
	}

	_handleRadioChange(event) {
		const {
			target: { value, },
		} = event;

		this.setState({ unitValue: value, });
	}

	_handleSearch(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.validateFields((error, data) => {
			if (!error) {
				let formData;
				let date = data.date;

				if (checkHourUnit(data.unit)) {
					date = [date];
				}

				formData = Object.assign({}, data, {
					date,
				});
				this.props.onSearch(formData);
			}
		});
	}
	_handleReset(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		this.setState({ unitValue: this.state.unitInitialValue, });
		this.props.onReset(event);
		form.resetFields();
	}

	render() {
		const {
			initialValues,
			gameTypeOptions,
		} = this.props;
		const {
			unitValue,
		} = this.state;
		const datePicker = this._renderDatePicker(unitValue);

		return (
			<Form
				ref={formRef => this.formInstance = formRef}
				onSubmit={this._handleSearch}
				onChange={() => {}}
				onCancel={this._handleReset}
				submitText="查询"
				cancelText="重置"
			>
				<Row type={Row.TypeEnums.FLEX}>
					<Col span={COLUMN_SPAN}>
						<FormItem
							label="代理帐号："
							itemName="account"
							itemConfig={{
								initialValue: initialValues.account,
							}}
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								placeholder="请输入"
							/>
						</FormItem>
					</Col>
					<Col span={COLUMN_SPAN}>
						<FormItem
							label="达投注量："
							itemName="achieveAmount"
							itemConfig={{
								initialValue: initialValues.achieveAmount,
							}}
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<InputNumber
								style={{ width: '100%', }}
								min={0}
							/>
						</FormItem>
					</Col>
					<Col span={COLUMN_SPAN}>
						<FormItem
							label="游戏类型："
							itemName="gameType"
							itemConfig={{
								initialValue: initialValues.gameType,
							}}
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Select
								placeholder="请输入"
								options={gameTypeOptions}
							/>
						</FormItem>
					</Col>
					<Col span={COLUMN_SPAN}>
						{datePicker}
					</Col>
					<Col span={COLUMN_SPAN}>
						<FormItem
							label="單位"
							itemName="unit"
							itemConfig={{
								initialValue: initialValues.unit,
							}}
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<RadioGroup
								onChange={this._handleRadioChange}
								options={[
									{ label: '天', value: DAY, },
									{ label: '小時', value: HOUR, },
								]}
							/>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
