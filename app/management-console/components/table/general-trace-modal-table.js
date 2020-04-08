import React from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	DecimalNumber,
} from 'ljit-react-components';
import { StatusMap, } from './constants';
import { TraceRecordBettingsPropTypes, } from '../../lib/prop-types-utils';

const OperationEnums = {
	INFO: 'info',
	DISCARD: 'discard',
};

const { INFO, DISCARD, } = OperationEnums;

const propTypes = {
	traceRecordBettings: TraceRecordBettingsPropTypes,
	modalType: PropTypes.string,
	selectedRowKeys: PropTypes.array,
	onRowSelection: PropTypes.func,
};

const defaultProps = {
	traceRecordBettings: [],
	hasPagination: false,
};

const GeneralTraceModalTable = ({
	modalType, traceRecordBettings, selectedRowKeys, onRowSelection,
}) => {
	const modalColumns = [{
		title: '期号',
		dataIndex: 'issue',
		key: 'issue',
	},{
		title: '倍数',
		dataIndex: 'multiple',
		key: 'multiple',
	},{
		title: '开奖号码',
		dataIndex: 'opencode',
		key: 'opencode',
	},{
		title: '奖金',
		dataIndex: 'reward',
		key: 'reward',
		render: function render(reward) {
			return <DecimalNumber data={reward} hasSeparator/>;
		}
	},{
		title: '追号状态',
		dataIndex: 'status',
		key: 'status',
		render: function render(status) {
			return StatusMap[status] ? StatusMap[status].text : '';
		}
	},];

	const rowSelection = {
		columnTitle: <div/>,
		selectedRowKeys,
		onChange: onRowSelection,
	};

	if (modalType === INFO)	{
		return (
			<Table
				rowKey="id"
				dataSource={traceRecordBettings}
				columns={modalColumns}
			/>
		);
	}
	if (modalType === DISCARD) {
		return (
			<Table
				rowKey="id"
				dataSource={traceRecordBettings}
				columns={modalColumns}
				rowSelection={rowSelection}
			/>
		);
	}
	return null;
};

GeneralTraceModalTable.propTypes = propTypes;
GeneralTraceModalTable.defaultProps = defaultProps;

export default GeneralTraceModalTable;
