import React from 'react';
import PropTypes from 'prop-types';
import PagerTable from '../../../../components/pager-table';
import {
	dateSorter,
	fieldSorter,
} from './utils';

const propTypes = {
	isLoading: PropTypes.bool,
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		// TODO check third party data from api
		date: PropTypes.string,
		transferIn: PropTypes.number,
		transferOut: PropTypes.number,
		consumption: PropTypes.number,
		betting: PropTypes.number,
		yesterdayBalance: PropTypes.number,
		currentBalance: PropTypes.number,
		profit: PropTypes.number,
	})),
	onTableChange: PropTypes.func,
};
const defaultProps = {
	isLoading: false,
	onTableChange: () => {},
};

const ThirdPartyTable = ({ isLoading, dataSource, onTableChange, }) => {
	const columns = [
		{
			title: '日期',
			dataIndex: 'date',
			width: 140,
			sorter: dateSorter,
		},
		{
			title: '转入',
			dataIndex: 'transferIn',
			width: 118,
			sorter: fieldSorter('transferIn'),
		},
		{
			title: '转出',
			dataIndex: 'transferOut',
			width: 130,
			sorter: fieldSorter('transferOut'),
		},
		{
			title: '小费',
			dataIndex: 'consumption',
			width: 130,
			sorter: fieldSorter('consumption'),
		},
		{
			title: '投注',
			dataIndex: 'betting',
			width: 118,
			sorter: fieldSorter('betting'),
		},
		{
			title: '昨天余额',
			dataIndex: 'yesterdayBalance',
			width: 118,
			sorter: fieldSorter('yesterdayBalance'),
		},
		{
			title: '当前余额',
			dataIndex: 'currentBalance',
			width: 118,
			sorter: fieldSorter('currentBalance'),
		},
		{
			title: '盈利',
			dataIndex: '',
			width: 118,
			sorter: fieldSorter('profit'),
		},
	];

	return (
		<PagerTable
			rowKey="id"
			isLoading={isLoading}
			dataSource={dataSource}
			columns={columns}
			onTableChange={onTableChange}
			hasPagination={false}
		/>
	);
};

ThirdPartyTable.propTypes = propTypes;
ThirdPartyTable.defaultProps = defaultProps;

export default ThirdPartyTable;
