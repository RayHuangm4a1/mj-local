import React from 'react';
import PropTypes from 'prop-types';
import { DecimalNumber } from 'ljit-react-components';
import PagerTable from '../../../../components/pager-table';
import { DATE, isDateValid, formatDate, } from '../../../../../lib/moment-utils';
import {
	PREFIX_CLASS,
	getProfit,
	getReward,
	dateSorter,
	functionSorter,
	fieldSorter,
} from './utils';

const propTypes = {
	isLoading: PropTypes.bool,
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		activityAmount: PropTypes.number,
		bettingAmount: PropTypes.number,
		bettingReward: PropTypes.number,
		createdAt: PropTypes.string,
		date: PropTypes.string,
		depositAmount: PropTypes.number,
		dividendAmount: PropTypes.number,
		fixedWageAmount: PropTypes.number,
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		rebateAmount: PropTypes.number,
		updatedAt: PropTypes.string,
		userId: PropTypes.number,
		username: PropTypes.string,
		walletCode: PropTypes.number,
		withdrawalAmount: PropTypes.number,
		incentiveAmount: PropTypes.number,
	})),
	onTableChange: PropTypes.func,
};
const defaultProps = {
	isLoading: false,
	onTableChange: () => {},
};
const LotteryTable = ({ isLoading, dataSource, onTableChange, }) => {
	const _renderProfitText = (value) => {
		let className;

		if (value > 0) {
			className = `${PREFIX_CLASS}__text--profit`;
		}
		if (value < 0) {
			className = `${PREFIX_CLASS}__text--deficit`;
		}
		return (
			<div className={className}><DecimalNumber data={value} hasSeparator isCurrency/></div>
		);
	};

	const columns = [
		{
			title: '日期',
			dataIndex: 'date',
			width: 140,
			sorter: dateSorter,
			render: (date) => {
				if (isDateValid(date)) {
					return formatDate(date, DATE);
				}
				if (date === '汇总') {
					return date;
				}
				return '-';
			},
		},
		{
			title: '盈利',
			dataIndex: '',
			width: 118,
			sorter: functionSorter(getProfit),
			render: (record) => _renderProfitText(getProfit(record)),
		},
		{
			title: '消費',
			dataIndex: 'bettingAmount',
			width: 130,
			sorter: fieldSorter('bettingAmount'),
		},
		{
			title: '中奖',
			dataIndex: 'bettingReward',
			width: 130,
			sorter: fieldSorter('bettingReward'),
		},
		{
			title: '充值',
			dataIndex: 'depositAmount',
			width: 118,
			sorter: fieldSorter('depositAmount'),
		},
		{
			title: '提款',
			dataIndex: 'withdrawalAmount',
			width: 118,
			sorter: fieldSorter('withdrawalAmount'),
		},
		{
			title: '奖励',
			dataIndex: '',
			width: 118,
			sorter: functionSorter(getReward),
			render: (record) => getReward(record),
		},
		{
			title: '返点',
			dataIndex: 'rebateAmount',
			width: 118,
			sorter: fieldSorter('rebateAmount'),
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

LotteryTable.propTypes = propTypes;
LotteryTable.defaultProps = defaultProps;

export default LotteryTable;
