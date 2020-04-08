import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Select,
	TimePicker,
	InputDynamicTable,
} from 'ljit-react-components';
import PageModal from '../../../components/page-modal';
import { formatDate } from '../../../../lib/moment-utils';

const propTypes = {
	data: PropTypes.shape({
		type: PropTypes.string,
		game: PropTypes.string,
		maintainDays: PropTypes.arrayOf(PropTypes.shape({
			key: PropTypes.string,
			weekday: PropTypes.string,
			startAt: PropTypes.number,
			endAt: PropTypes.number
		}))
	}),
	isVisible: PropTypes.bool,
	title: PropTypes.string,
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};

const defaultProps = {
	isVisible: false,
	onCancel: () => {},
	onSubmit: () => {},
};

class PresetMaintainEditingModal extends Component {
	constructor() {
		super();
		this.state = {
			disableTimeByRows: {},
		};

		this._setDisableTimeByRows = this._setDisableTimeByRows.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
	}
	_setDisableTimeByRows(values = []) {
		let disableTimeByRows = {};

		values.forEach(item => {
			const selectHour = parseInt(formatDate(item.startAt, 'HH'));
			const selectMinute = parseInt(formatDate(item.startAt, 'mm'));
			const disabledHours = getDisableTimeArray(selectHour);
			const disabledMinutes = getDisableTimeArray(selectMinute);

			disableTimeByRows[item.key] = {
				hours: disabledHours,
				minutes: disabledMinutes,
			};
		});

		this.setState({ disableTimeByRows, });
	}

	_handleCancel() {
		const { onCancel } = this.props;
		const form = this.formInstance.getForm();

		form.resetFields();
		onCancel();
	}
	_handleSubmit() {
		// TODO send add api
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values);
				form.resetFields();
			}
		});
	}

	render() {
		const {
			data,
			isVisible,
			title,
		} = this.props;
		const { disableTimeByRows, } = this.state;
		const {
			_setDisableTimeByRows,
			_handleCancel,
			_handleSubmit,
		} = this;
		const { type, game, maintainDays, } = data;
		const inputStyle = { width: 468, };
		const tableInputStyle = { width: 87, };

		return (
			<PageModal
				visible={isVisible}
				title={title}
				onClickCancel={_handleCancel}
				onClickOk={_handleSubmit}
				className="preset-maintain-editing-modal"
			>
				<Form
					ref={(refForm) => this.formInstance = refForm}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						label="类型"
						itemName="type"
						columnType={FormItem.ColumnTypeEnums.SMALL}
						itemConfig={{ initialValue: type, }}
					>
						<Select
							style={inputStyle}
							// TODO get options
							options={[
								{ label: '真人视讯', value: '真人视讯' },
								{ label: '体育', value: '体育' },
								{ label: '棋牌', value: '棋牌' },
							]}
						/>
					</FormItem>
					<FormItem
						label="平台"
						itemName="game"
						columnType={FormItem.ColumnTypeEnums.SMALL}
						itemConfig={{ initialValue: game, }}
					>
						<Select
							style={inputStyle}
							// TODO get options
							options={[
								{ label: 'AG', value: 'AG' },
								{ label: 'UG', value: 'UG' },
								{ label: 'SA', value: 'SA' },
							]}
						/>
					</FormItem>
					<FormItem
						itemName="maintainDays"
						itemConfig={{ initialValue: maintainDays, }}
					>
						<InputDynamicTable
							value={maintainDays}
							columns={[
								{
									title: '星期',
									dataIndex: 'weekday',
									renderField: (record, rowIndex, onChange) => (
										<Select
											value={record.weekday}
											// TODO get options value
											options={[
												{ label: '礼拜一', value: '礼拜一', },
												{ label: '礼拜二', value: '礼拜二', },
												{ label: '礼拜三', value: '礼拜三', },
												{ label: '礼拜四', value: '礼拜四', },
												{ label: '礼拜五', value: '礼拜五', },
												{ label: '礼拜六', value: '礼拜六', },
												{ label: '礼拜日', value: '礼拜日', },
											]}
											onChange={value => onChange('weekday', value, rowIndex)}
											style={tableInputStyle}
										/>
									)
								},
								{
									title: '开始时间',
									dataIndex: 'startAt',
									renderField:  (record, rowIndex, onChange) => (
										<TimePicker
											format={TimePicker.FormatTypeEnums.HHmm}
											value={record.startAt}
											onChange={value => onChange('startAt', value, rowIndex)}
											style={tableInputStyle}
											placeholder="选时间"
										/>
									)
								},
								{
									title: '结束时间',
									dataIndex: 'endAt',
									renderField:  (record, rowIndex, onChange) => (
										<TimePicker
											format={TimePicker.FormatTypeEnums.HHmm}
											disabledHours={disableTimeByRows[record.key] ? disableTimeByRows[record.key].hours: []}
											calculateDisabledMinutes={(selectHour) => {
												const startAtHour = parseInt(formatDate(record.startAt, 'HH'));

												if (selectHour === startAtHour && disableTimeByRows[record.key]) {
													return disableTimeByRows[record.key].minutes;
												}
											}}
											value={record.startAt < record.endAt ? record.endAt: record.startAt}
											onChange={value => onChange('endAt', value, rowIndex)}
											style={tableInputStyle}
											placeholder="选时间"
										/>
									)
								}
							]}
							onChange={_setDisableTimeByRows}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
	componentDidMount() {
		const { _setDisableTimeByRows } = this;
		const { data } = this.props;

		_setDisableTimeByRows(data.maintainDays);
	}
	componentDidUpdate(prevProps) {
		const { _setDisableTimeByRows } = this;
		const { data } = this.props;

		if (prevProps.data !== data) {
			_setDisableTimeByRows(data.maintainDays);
		}
	}
}

PresetMaintainEditingModal.propTypes = propTypes;
PresetMaintainEditingModal.defaultProps = defaultProps;

export default PresetMaintainEditingModal;

function getDisableTimeArray(number) {
	const arr = [];

	for (let i = 0; i < number; i++) {
		arr.push(i);
	}
	return arr;
}
