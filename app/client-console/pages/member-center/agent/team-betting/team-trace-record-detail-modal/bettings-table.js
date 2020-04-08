import React from 'react';
import PropTypes from 'prop-types';
import {
	StatusTag,
	DecimalNumber,
} from 'ljit-react-components';
import {
	bettingRecordPropType,
	checkIsBettingRecordStatus,
	getBettingRecordStatusMap,
} from '../../../../../lib/betting-utils';
import PagerTable from '../../../../../components/pager-table';

const PREFIX_CLASS = 'betting-table';
const EMPTY_TEXT = '-';

const propTypes = {
	isLoading: PropTypes.bool,
	data: PropTypes.arrayOf(bettingRecordPropType),
	paginationProps: PropTypes.shape({
		pageSize: PropTypes.number,
		total: PropTypes.number,
	}),
	onChangeTable: PropTypes.func,
};
const defaultProps = {
	isLoading: false,
	data: [],
	paginationProps: {},
	onChangeTable: () => {},
};

function BettingsTable({
	data,
	isLoading,
	onChangeTable,
	paginationProps,
}) {
	function _renderStatusTag(status) {
		if (!checkIsBettingRecordStatus(status)) {
			return EMPTY_TEXT;
		}
		const statusMap = getBettingRecordStatusMap(status);

		return <StatusTag status={statusMap.statusTag} text={statusMap.text} />;
	}
	function _renderDetails(details = []) {
		if (!details.length) {
			return EMPTY_TEXT;
		}
		// TODO confirm real detail view
		return details
			.map((detail = {}) => `${detail.count} ${detail.name}`)
			.join('/');
	}
	return (
		<PagerTable
			isLoading={isLoading}
			className={PREFIX_CLASS}
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
					render: function render(data) {
						return data ? <DecimalNumber data={data} hasSeparator /> : EMPTY_TEXT;
					},
				},
				{
					title: '状态',
					dataIndex: 'status',
					width: 119,
					render: _renderStatusTag,
				},
				{
					title: '中奖说明',
					dataIndex: 'details',
					width: 164,
					render: _renderDetails,
				},
			]}
			dataSource={data}
			paginationProps={paginationProps}
			onTableChange={onChangeTable}
		/>
	);
}

BettingsTable.propTypes = propTypes;
BettingsTable.defaultProps = defaultProps;

function getRowId(record = {}) {
	return record.id;
}

export default BettingsTable;
