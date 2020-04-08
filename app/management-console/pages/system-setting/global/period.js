
import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
	Form, Col, FormItem, LabelContent, DateRangePicker, Divider, RadioGroup, Table, Select, Button,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { PeriodOptions, DateOptions, PeriodEnums, } from './utils';

const dateFormat = 'YYYY/MM/DD';
const DAYS_BEFORE = 3;
const { ONE, TWO, THREE, } = PeriodEnums;

const propTypes = {
	data: PropTypes.object,
	initialValues: PropTypes.shape({
		marketClose: PropTypes.arrayOf(PropTypes.object),
		daylightTime: PropTypes.arrayOf(PropTypes.object),
		period: PropTypes.string,
		periodOne: PropTypes.string,
		periodTwo: PropTypes.string,
		periodThree: PropTypes.string,
	}),
};

const defaultProps = {
	initialValues: {
		marketClose: [moment('2019/02/04', dateFormat), moment('2019/02/10', dateFormat)],
		daylightTime: [moment('2019/03/11', dateFormat), moment('2019/11/11', dateFormat)],
		period: THREE,
		periodOne: '1',
		periodThree: 'last',
	},
};

const inputStyle = {
	width: '100%',
	maxWidth: '136px',
};

class SystemSettingGlobalPeriodPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			period: props.initialValues.period,
		};
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handlePeriodChange = this._handlePeriodChange.bind(this);
		this._handleSelectDayDisable = this._handleSelectDayDisable.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {});
	}

	_handlePeriodChange(value) {
		this.setState({
			period: value,
		});
	}

	_handleSelectDayDisable(periodName) {
		const { period, } = this.state;

		if (periodName === 'periodTwo' && period === ONE) {
			return true;
		}
		if (periodName === 'periodThree' && period !== THREE) {
			return true;
		}
		return false;
	}

	render() {
		const { initialValues, } = this.props;

		return (
			<Fragment>
				<PageBlock.Title text="时间与周期设置"/>
				<Form
					submitButtonDisabled
					cancelButtonDisabled
					ref={(refForm) => this.formInstance = refForm }
				>
					<FormItem
						className="period-form-item"
						label="休市时间"
						itemName="marketClose"
						itemConfig={{
							initialValue: initialValues.marketClose,
							rules: [{
								validator: (rule, value, callback) => {
									const beginDiff = value[0].diff(moment(), 'days');
									const invalidCondition = beginDiff < DAYS_BEFORE;

									if (invalidCondition) {
										callback('请在休市三日以前设置');
									} else {
										callback();
									}
								},
							},]
						}}
						columnType={FormItem.ColumnTypeEnums.SMALL}
						labelColon={false}
					>
						<DateRangePicker
							ranges={['today', 'lastSevenDays', 'lastThirtyDays', 'presentPeriod', 'previousPeriod',]}
						/>
					</FormItem>
					<div style={{ height: '1px', }}/>
					<FormItem
						className="period-form-item"
						label="日光节约时间"
						itemName="daylightTime"
						itemConfig={{
							initialValue: initialValues.daylightTime,
							rules: [{
								validator: (rule, value, callback) => {
									const beginDiff = value[0].diff(moment(), 'days');
									const invalidCondition = beginDiff < DAYS_BEFORE;

									if (invalidCondition) {
										callback('请在开始三日以前设置');
									} else {
										callback();
									}
								},
							},]
						}}
						columnType={FormItem.ColumnTypeEnums.SMALL}
						labelColon={false}
					>
						<DateRangePicker
							ranges={['today', 'lastSevenDays', 'lastThirtyDays', 'presentPeriod', 'previousPeriod',]}
						/>
					</FormItem>
					<Divider/>
					<LabelContent
						className="period-times-radio"
						label="分红周期"
						labelColon={false}
						columnType={LabelContent.ColumnTypeEnums.SMALL}
					>
						<FormItem
							className="period-times-radio-form-item"
							label="每月"
							itemName="period"
							itemConfig={{ initialValue: initialValues.period }}
							labelColon={false}
						>
							<RadioGroup
								options={PeriodOptions}
								onChange={(event) => this._handlePeriodChange(event.target.value)}
							/>
						</FormItem>
					</LabelContent>
					<Col offset={2} style={{ width: '60%' }}>
						<Table
							className="period-table"
							dataSource={[
								{ key: 1, period: ONE, time: 'periodOne', },
								{ key: 2, period: TWO, time: 'periodTwo', },
								{ key: 3, period: THREE, time: 'periodThree', },
							]}
							columns={[
								{
									title: '周期', dataIndex: 'period', key: 'period', width: '50%',
								},
								{
									title: '分紅時間', dataIndex: 'time', key: 'time', width: '50%',
									render: (record) => (
										<FormItem
											itemName={record}
											itemConfig={{ initialValue: initialValues[record] }}
											className="table-form-item"
										>
											<Select
												style={inputStyle}
												options={DateOptions}
												disabled={this._handleSelectDayDisable(record)}
												placeholder="请选择日期"
											/>
										</FormItem>
									),
								},
							]}
						/>
					</Col>
					<div style={{ textAlign: 'right' }}>
						<Button outline={Button.OutlineEnums.SOLID} onClick={this._handleSubmit}>保存设置</Button>
					</div>
				</Form>
			</Fragment>
		);
	}
}

SystemSettingGlobalPeriodPage.propTypes = propTypes;
SystemSettingGlobalPeriodPage.defaultProps = defaultProps;

export default SystemSettingGlobalPeriodPage;
