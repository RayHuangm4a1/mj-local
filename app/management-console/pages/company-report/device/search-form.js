import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	RadioGroup,
	DatePicker,
	DateRangePicker,
	RemindText,
} from 'ljit-react-components';

export const UnitEnums = {
	'DAY': '1',
	'HOUR': '2',
};
const {
	DAY,
	HOUR,
} = UnitEnums;
const DATE_LABEL = '日期';
const DATE_PLACEHOLDER = '請輸入日期';
const DATE_FORMAT = 'YYYY/MM/DD';

const propTypes = {
	initialValues: PropTypes.shape({
		unit: PropTypes.string,
		period: PropTypes.arrayOf(PropTypes.object),
		date: PropTypes.object,
	}),
	onSearch: PropTypes.func,
	onReset: PropTypes.func,
};
const defaultProps = {
	initialValues: {},
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
		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_renderPreiod() {
		return (
			<FormItem
				label={DATE_LABEL}
				className="chart-search-form__item"
				noMargin
				itemName="period"
				itemConfig={{
					initialValue: this.props.initialValues.period || [],
				}}
			>
				<DateRangePicker
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
				className="chart-search-form__item"
				noMargin
				itemName="date"
				itemConfig={{
					initialValue: this.props.initialValues.date,
				}}
			>
				<DatePicker
					placeholder={DATE_PLACEHOLDER}
					format={DATE_FORMAT}
					showToday
				/>
			</FormItem>
		);
	}

	_getDatePicker(unitValue) {
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
		} = this.props;
		const {
			unitValue,
		} = this.state;

		return (
			<Form
				ref={formRef => this.formInstance = formRef}
				onSubmit={this._handleSearch}
				onChange={() => {}}
				onCancel={this._handleReset}
				submitText="查询"
				cancelText="重置"
				className="chart-search-form"
			>
				<FormItem
					label="單位"
					className="chart-search-form__item"
					itemName="unit"
					itemConfig={{
						initialValue: initialValues.unit,
					}}
				>
					<RadioGroup
						onChange={this._handleRadioChange}
						options={[
							{ label: '天', value: DAY, },
							{ label: '小時', value: HOUR, },
						]}
					/>
				</FormItem>
				{this._getDatePicker(unitValue)}
				<RemindText
					text={(
						<div>
							<div>总投注次数 = [PC装置总投注次数] + [Mobile装置总投注次数]</div>
							<div>Mobile装置总投注次数 = [Mobile 帳密登入投注次数] + [Mobile Wechat登入投注次数]</div>
							<div>投注量与登入次数逻辑同上</div>
						</div>
					)}
				/>
			</Form>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export function checkDayUnit(unitValue) {
	return unitValue === DAY;
}

export function checkHourUnit(unitValue) {
	return unitValue === HOUR;
}

export default SearchForm;
