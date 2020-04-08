import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Form, FormItem, RadioGroup,DatePicker, DateRangePicker, Button, } from 'ljit-react-components';
import { UnitEnums } from '../utils';

const propTypes = {
	initialValues: PropTypes.shape({
		unit: PropTypes.string,
		period: PropTypes.arrayOf(PropTypes.object),
		date: PropTypes.object,
	}),
	collapseItemsLength: PropTypes.number,
	onSearch: PropTypes.func,
	onReset: PropTypes.func,
};

const defaultProps = {
	initialValues: {},
	onCancel: () => {},
	onSubmit: () => {},
};

const { HOUR, DAY, } = UnitEnums;

const formStyle = {
	display: 'flex',
};

const inputStyle = {
	width: '264px',
};

const dateFormat = 'YYYY/M/DD hh:mm';

class SearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			unit: props.initialValues.unit,
		};

		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleUnitChange = this._handleUnitChange.bind(this);
		this._renderDatePicker = this._renderDatePicker.bind(this);
	}

	_handleFormChange(allValues) {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			//TODO validate fields
		});
	}

	_handleSubmit(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {});
		this.props.onSearch(form.getFieldsValue());
	}

	_handleReset(event) {
		event.preventDefault();
		this.formInstance.getForm().resetFields();
		this.props.onReset();
	}

	_handleUnitChange(value) {
		this.formInstance.getForm().resetFields();
		this.setState({
			unit: value,
		});
	}

	_renderDatePicker() {
		const { initialValues, } = this.props;
		const { unit, } = this.state;

		if (unit === DAY) {
			return (
				<FormItem
					label="游戏時間"
					itemName="period"
					itemConfig={{
						initialValue: initialValues.period,
					}}
					key="period"
					style={formStyle}
				>
					<DateRangePicker
						format={dateFormat}
						inputStyle={inputStyle}
						ranges={['today','lastSevenDays','lastThirtyDays']}
					/>
				</FormItem>
			);
		}
		if (unit === HOUR) {
			return (
				<FormItem
					label="游戏時間"
					itemName="date"
					itemConfig={{
						initialValue: initialValues.date,
					}}
					key="date"
					style={formStyle}
				>
					<DatePicker
						format={dateFormat}
						style={inputStyle}
						isShowingTime
					/>
				</FormItem>
			);
		}
		return null;
	}

	render() {
		const { initialValues, } = this.props;
		const { _handleFormChange, _handleSubmit, _handleReset, } = this;

		return (
			<Form
				submitButtonDisabled={true}
				cancelButtonDisabled={true}
				onChange={_handleFormChange}
				ref={(refForm) => this.formInstance = refForm }
			>
				<FormItem
					label="單位"
					itemName="unit"
					itemConfig={{ initialValue: initialValues.unit }}
					key="unit"
					style={formStyle}
				>
					<RadioGroup
						options={[
							{ label: '天', value: DAY },
							{ label: '小時', value: HOUR, },
						]}
						onChange={(e) => this._handleUnitChange(e.target.value)}
					/>
				</FormItem>
				<div style={{ display: 'flex' }}>
					{this._renderDatePicker()}
					<div className="people-search-form-button-wrapper">
						<Button className="search-button" outline={Button.OutlineEnums.SOLID} onClick={_handleSubmit}>查询</Button>
						<Button outline={Button.OutlineEnums.HOLLOW} onClick={_handleReset}>重置</Button>
					</div>
				</div>
			</Form>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
