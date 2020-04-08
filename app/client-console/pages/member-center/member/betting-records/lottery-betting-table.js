import React from 'react';
import PropTypes from 'prop-types';
import PagerTable from '../../../../components/pager-table';
import { formatDate, } from '../../../../../lib/moment-utils';
import {
	StatusTag,
	BettingRecordCard,
	DecimalNumber,
} from 'ljit-react-components';
import { bettingRecordPropType, } from '../../../../lib/betting-utils';
import {
	PREFIX_CLASS,
} from './utils';
import './style.styl';

const { StatusMap, StatusEnums, } = BettingRecordCard;
const {
	NOT_OPENED,
	WIN,
	LOSE,
	DRAW,
	CANCELED,
	OPENING,
} = StatusEnums;

const propTypes = {
	isLoading: PropTypes.bool,
	bettingRecords: PropTypes.arrayOf(bettingRecordPropType),
	paginationProps: PropTypes.shape({
		pageSize: PropTypes.number,
		total: PropTypes.number,
	}),
	onClickRecord: PropTypes.func,
	onTableChange: PropTypes.func,
};
const defaultProps = {
	isLoading: false,
	onClickRecord: () => {},
	onTableChange: () => {},
};
const LotteryBettingTable = ({ isLoading, bettingRecords, paginationProps, onClickRecord, onTableChange, }) => {
	const columns = [
		{
			title: '方案号 / 期号',
			dataIndex: 'id',
			width: 156,
			render: (value, record) => {
				return (
					<div
						className={`${PREFIX_CLASS}__table-item`}
						onClick={() => onClickRecord(record)}
					>
						<div className={`${PREFIX_CLASS}__table-item--issue`}>
							{record.id}
						</div>
						<div className={`${PREFIX_CLASS}__table-item--id`}>
							({record.issue})
						</div>
					</div>
				);
			}
		},
		{
			title: '彩种',
			dataIndex: 'lotteryName',
			width: 107,
		},
		{
			title: '玩法',
			dataIndex: 'name',
			width: 107,
		},
		{
			title: '时间',
			dataIndex: 'createdAt',
			width: 203,
			sorter: () => 0,
			render: (value) => formatDate(value)
		},
		{
			title: '投注金额',
			dataIndex: 'amount',
			width: 115,
			sorter: () => 0,
			render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
		},
		{
			title: '中奖号码',
			dataIndex: 'opencode',
			width: 90,
		},
		{
			title: '中奖金额',
			dataIndex: 'reward',
			width: 116,
			sorter: () => 0,
			render: (reward) => <DecimalNumber data={reward} hasSeparator/>,
		},
		{
			title: '状态',
			dataIndex: 'status',
			width: 98,
			filters: [
				{ text: StatusMap[WIN].text, value: WIN, },
				{ text: StatusMap[LOSE].text,  value: LOSE, },
				{ text: StatusMap[DRAW].text,  value: DRAW, },
				{ text: StatusMap[NOT_OPENED].text,  value: NOT_OPENED, },
				{ text: StatusMap[CANCELED].text,  value: CANCELED, },
				{ text: StatusMap[OPENING].text,  value: OPENING, }
			],
			onFilter: () => true,
			filterMultiple: false,
			// TODO 跟後端確認一下filter條件 再新增
			render: (status) => (
				<StatusTag status={StatusMap[status].statusTag} text={StatusMap[status].text} />
			),
		},
	];

	return (
		<PagerTable
			rowKey="id"
			isLoading={isLoading}
			dataSource={bettingRecords}
			columns={columns}
			paginationProps={paginationProps}
			onTableChange={onTableChange}
		/>
	);
};

LotteryBettingTable.propTypes = propTypes;
LotteryBettingTable.defaultProps = defaultProps;

export default LotteryBettingTable;
