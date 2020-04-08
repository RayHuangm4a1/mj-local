import React from 'react';
import PropTypes from 'prop-types';
import PagerTable from '../../../../components/pager-table';
import { formatDate, } from '../../../../../lib/moment-utils';
import {
	Tag,
	StatusTag,
	TraceRecordCard,
	DecimalNumber,
} from 'ljit-react-components';
import { traceRecordDataPropType, } from '../../../../lib/betting-utils';
import {
	PREFIX_CLASS,
} from './utils';

const { StatusMap, StatusEnums, } = TraceRecordCard;
const {
	INCOMPLETE,
	COMPLETE,
} = StatusEnums;

const propTypes = {
	isLoading: PropTypes.bool,
	traceRecords: PropTypes.arrayOf(traceRecordDataPropType),
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
const LotteryTraceTable = ({ isLoading, traceRecords, paginationProps, onClickRecord, onTableChange, }) => {
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
			width: 76,
			title: '类型',
			dataIndex: 'isTerminatedIfWin',
			render: (isTerminatedIfWin) => {
				if (isTerminatedIfWin) {
					return (
						<Tag
							color={Tag.ColorEnums.BLACK}
							text="中奖后停止"
						/>
					);
				} else {
					return (
						<Tag
							color={Tag.ColorEnums.BUTTERSCOTCH}
							text="中奖后继续"
						/>
					);
				}
			},
		},
		{
			title: '期数',
			dataIndex: 'numOfIssues',
			render: (numOfIssues) => <DecimalNumber data={numOfIssues}/>,
		},
		{
			title: '完成数',
			dataIndex: 'numOfFinishedIssues',
			render: (numOfFinishedIssues) => <DecimalNumber data={numOfFinishedIssues}/>,
		},
		{
			title: '状态',
			dataIndex: 'status',
			width: 98,
			filters: [
				{ text: StatusMap[INCOMPLETE].text, value: INCOMPLETE, },
				{ text: StatusMap[COMPLETE].text,  value: COMPLETE, },
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
			dataSource={traceRecords}
			columns={columns}
			paginationProps={paginationProps}
			onTableChange={onTableChange}
		/>
	);
};

LotteryTraceTable.propTypes = propTypes;
LotteryTraceTable.defaultProps = defaultProps;

export default LotteryTraceTable;
