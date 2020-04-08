import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	StatusTag,
	CheckBox,
	DecimalNumber,
} from 'ljit-react-components';
import {
	bettingRecordPropType,
	checkIsBettingRecordStatus,
	checkIsNotOpenBettingRecordStatus,
	getBettingRecordStatusMap,
} from '../../lib/betting-utils';
import PagerTable from '../../components/pager-table';

const PREFIX_CLASS = 'selectable-betting-record-table';
const CHECKBOX_PREFIX_CLASS = `${PREFIX_CLASS}__checkbox`;
const EMPTY_TEXT = '-';

const propTypes = {
	isLoading: PropTypes.bool,
	selectedRowKeys: PropTypes.arrayOf(PropTypes.number),
	traceRecordBettings: PropTypes.arrayOf(bettingRecordPropType),
	className: PropTypes.string,
	onSelect: PropTypes.func,
	paginationProps: PropTypes.shape({
		pageSize: PropTypes.number,
		total: PropTypes.number,
	}),
	onChange: PropTypes.func,
};
const defaultProps = {
	isLoading: false,
	selectedRowKeys: [],
	traceRecordBettings: [],
	className: '',
	onSelect: () => {},
	onChange: () => {},
};

class SelectableBettingRecordTable extends Component {
	constructor(props) {
		super(props);

		this._handleSelectAll = this._handleSelectAll.bind(this);
		this._handleSelect = this._handleSelect.bind(this);
		this._renderStatusTag = this._renderStatusTag.bind(this);
		this._renderSelectAllHead = this._renderSelectAllHead.bind(this);
		this._renderDetails = this._renderDetails.bind(this);
	}

	_handleSelectAll(event) {
		const {
			traceRecordBettings,
			selectedRowKeys: prevSelectedRowKeys,
			onSelect,
		} = this.props;
		const {
			target: {
				checked,
			},
		} = event;
		const selectableIds = filterBettingNotOpenedStatusRowIds(traceRecordBettings);

		if (checked) {
			const selectedRowKeysSet = new Set(prevSelectedRowKeys.concat(selectableIds));

			onSelect([...selectedRowKeysSet]);
		} else {
			const selectedRowKeys = prevSelectedRowKeys.filter(key => selectableIds.indexOf(key) === -1);

			onSelect(selectedRowKeys);
		}
	}

	_handleSelect(_selectedRowKeys, selectedRows) {
		const {
			onSelect,
		} = this.props;
		const newSelectedRowKeys = filterBettingNotOpenedStatusRowIds(selectedRows);
		
		onSelect(newSelectedRowKeys);
	}

	_renderSelectAllHead() {
		const {
			traceRecordBettings,
			selectedRowKeys,
		} = this.props;
		const selectableIds = filterBettingNotOpenedStatusRowIds(traceRecordBettings);

		if (!selectableIds.length) {
			return null;
		}
		const isCheckedAll = selectableIds.every(key => selectedRowKeys.indexOf(key) > -1);

		return (
			<CheckBox
				value={isCheckedAll}
				onChange={this._handleSelectAll}
			/>
		);
	}

	_renderStatusTag(status) {
		if (!checkIsBettingRecordStatus(status)) {
			return EMPTY_TEXT;
		}

		const statusMap = getBettingRecordStatusMap(status);

		return <StatusTag status={statusMap.statusTag} text={statusMap.text} />;
	}

	_renderDetails(details = []) {
		if (!details.length) {
			return EMPTY_TEXT;
		}

		// TODO confrim real detail view
		return details
			.map((detail = {}) => `${detail.count} ${detail.name} ${detail.reward}`)
			.join('/');
	}

	render() {
		const {
			isLoading,
			selectedRowKeys,
			traceRecordBettings,
			className,
			paginationProps,
			onChange,
		} = this.props;

		return (
			<PagerTable
				isLoading={isLoading}
				className={cx(PREFIX_CLASS, className)}
				rowKey={getRowId}
				columns={[
					{
						title: '期号',
						dataIndex: 'issue',
						width: 172,
						render: data => data || EMPTY_TEXT,
					},
					{
						title: '倍数',
						dataIndex: 'multiple',
						width: 70,
						render: data => data || EMPTY_TEXT,
					},
					{
						title: '开奖号码',
						dataIndex: 'opencode',
						width: 162,
						render: data => data || EMPTY_TEXT,
					},
					{
						title: '奖金',
						dataIndex: 'reward',
						width: 88,
						render: data => data ? <DecimalNumber data={data} hasSeparator /> : EMPTY_TEXT,
					},
					{
						title: '状态',
						dataIndex: 'status',
						width: 119,
						render: this._renderStatusTag,
					},
					{
						title: '中奖说明',
						dataIndex: 'details',
						width: 164,
						render: this._renderDetails,
					},
				]}
				dataSource={traceRecordBettings}
				rowSelection={{
					selectedRowKeys,
					columnTitle: this._renderSelectAllHead,
					getCheckboxProps: (record = {}) => Object.assign({}, record, {
						className: getBettingCheckboxClassName(record.status),
						id: getRowId(record) + '',
					}),
					onChange: this._handleSelect,
				}}
				paginationProps={paginationProps}
				onTableChange={onChange}
			/>
		);
	}
}

SelectableBettingRecordTable.propTypes = propTypes;
SelectableBettingRecordTable.defaultProps = defaultProps;

function getBettingCheckboxClassName(status) {
	const isHidden = !checkIsNotOpenBettingRecordStatus(status);

	return cx(CHECKBOX_PREFIX_CLASS, {
		[`${CHECKBOX_PREFIX_CLASS}--hidden`]: isHidden,
	});
}

function getRowId(record = {}) {
	return record.id;
}

function filterBettingNotOpenedStatusRowIds(selectedRows = []) {
	return selectedRows
		.filter((row = {}) => checkIsNotOpenBettingRecordStatus(row.status))
		.map(getRowId);
}

export default SelectableBettingRecordTable;
