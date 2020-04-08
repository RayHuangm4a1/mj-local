import React from 'react';
import PropTypes from 'prop-types';
import {
	BettingRecordCard,
	StatusTag,
	DecimalNumber,
} from 'ljit-react-components';
import { formatDate, } from '../../../../../lib/moment-utils';
import {
	bettingRecordPropType,
	getTraceRecordTypeMap,
	getTraceRecordStatusMap,
	convertTerminatedIfWinToType,
} from '../../../../lib/betting-utils';
import { TraceRecordStatusEnum, } from '../../../../lib/enums';

const {
	StatusMap,
	StatusEnums,
} = BettingRecordCard;

const {
	NOT_OPENED,
	WIN,
	LOSE,
	CANCELED,
	OPENING,
} = StatusEnums;

export const TableColumnItemsEnum = {
	ID: 'id',
	USERNAME: 'username',
	LOTTERY_NAME: 'lotteryName',
	NAME: 'name',
	CREATED_AT: 'createdAt',
	AMOUNT :'amount',
	OPENCODE: 'opencode',
	REWARD: 'reward',
	STATUS: 'status',
	TRACE_STATUS: 'traceStatus',
	TYPE: 'isTerminatedIfWin',
	COUNT: 'count',
	NUM_OF_ISSUES: 'numOfIssues',
	NUM_OF_FINISHED_ISSUES: 'numOfFinishedIssues'
};

const {
	ID,
	USERNAME,
	LOTTERY_NAME,
	NAME,
	CREATED_AT,
	AMOUNT,
	OPENCODE,
	REWARD,
	STATUS,
	TRACE_STATUS,
	COUNT,
	TYPE,
	NUM_OF_ISSUES,
	NUM_OF_FINISHED_ISSUES,
} = TableColumnItemsEnum;

export const BettingTypeEnum = {
	TEAM_BETTING: 0,
	TEAM_TRACE: 1,
	TEAM_VR: 2.
};

const {
	TEAM_BETTING,
	TEAM_TRACE,
	TEAM_VR,
} = BettingTypeEnum;

export const TableColumnItemsListMap = {
	[TEAM_BETTING]: [ID, USERNAME, LOTTERY_NAME, NAME, CREATED_AT, AMOUNT, OPENCODE, REWARD, STATUS],
	[TEAM_TRACE]: [ID, USERNAME, LOTTERY_NAME, NAME, CREATED_AT, COUNT, AMOUNT, TYPE, NUM_OF_ISSUES, NUM_OF_FINISHED_ISSUES, TRACE_STATUS],
	[TEAM_VR]: [ID, USERNAME, LOTTERY_NAME, NAME, CREATED_AT, AMOUNT, OPENCODE, REWARD, STATUS],
};

const {
	INCOMPLETE,
	COMPLETE,
} = TraceRecordStatusEnum;

const teamTraceStatusFilterOptions = [
	{ text: getTraceRecordStatusMap(INCOMPLETE).text, value: INCOMPLETE, },
	{ text: getTraceRecordStatusMap(COMPLETE).text, value: COMPLETE, }
];

const teamBettingAndTeamVRStatusFilterOptions = [
	{ text: StatusMap[WIN].text, value: WIN, },
	{ text: StatusMap[LOSE].text, value: LOSE, },
	{ text: StatusMap[NOT_OPENED].text, value: NOT_OPENED, },
	{ text: StatusMap[CANCELED].text, value: CANCELED, },
	{ text: StatusMap[OPENING].text, value: OPENING, }
];

export const TableColumnItemsConfig = {
	[ID]: {
		title: '方案号 / 期号',
		dataIndex: ID,
		width: 140,
	},
	[USERNAME]: {
		title: '会员',
		dataIndex: USERNAME,
		width: 107,
	},
	[LOTTERY_NAME]: {
		title: '彩种',
		dataIndex: LOTTERY_NAME,
		width: 107,
	},
	[NAME]: {
		title: '玩法',
		dataIndex: NAME,
		width: 107,
	},
	[CREATED_AT]: {
		title: '时间',
		dataIndex: CREATED_AT,
		width: 156,
		// TODO: get sorted data from API response
		sorter: () => 0,
		render: (value) => formatDate(value),
	},
	[AMOUNT]: {
		title: '投注金额',
		dataIndex: AMOUNT,
		width: 120,
		// TODO: get sorted data from API response
		sorter: () => 0,
		render: function render(amount) {
			return <DecimalNumber data={amount} hasSeparator/>;
		},
	},
	[COUNT]: {
		title: '注数',
		dataIndex: COUNT,
		width: 75,
		// TODO: get sorted data from API response
		sorter: () => 0,
	},
	[TYPE]: {
		title: '类型',
		dataIndex: TYPE,
		width: 96,
		render: function render(type) {
			const convertedType = convertTerminatedIfWinToType(type);
			const matchedStatusMap = getTraceRecordTypeMap(convertedType);

			return (
				<StatusTag
					className="terminated-type"
					status={matchedStatusMap.statusTag}
					text={matchedStatusMap.text}
				/>
			);
		},
	},
	[NUM_OF_ISSUES]: {
		title: '期数',
		dataIndex: NUM_OF_ISSUES,
		width: 50,
	},
	[NUM_OF_FINISHED_ISSUES]: {
		title: '完成数',
		dataIndex: NUM_OF_FINISHED_ISSUES,
		width: 75,
	},
	[OPENCODE]: {
		title: '中奖号码',
		dataIndex: OPENCODE,
		width: 86,
		render: (opencode, record) => {
			const canShowOpencode = record.status === WIN || record.status === LOSE;

			return canShowOpencode ? opencode : '-';
		}
	},
	[REWARD]: {
		title: '中奖金额',
		dataIndex: REWARD,
		width: 120,
		// TODO: get sorted data from API response
		sorter: () => 0,
		render: function render(reward, record) {
			const canShowReward = record.status === WIN || record.status === LOSE;

			return canShowReward ? <DecimalNumber data={reward} hasSeparator/> : '-';
		}
	},
	[STATUS]: {
		title: '状态',
		dataIndex: STATUS,
		width: 84,
		filters: teamBettingAndTeamVRStatusFilterOptions,
		// TODO: get filtered data from API response
		onFilter: () => true,
		filterMultiple: false,
		render: (status) => {
			const matchedStatusMap = StatusMap[status] ? StatusMap[status] : {};
			const { statusTag = '', text = '', } = matchedStatusMap;

			return (
				<StatusTag
					status={statusTag}
					text={text}
				/>
			);
		},
	},
	[TRACE_STATUS]: {
		title: '状态',
		dataIndex: STATUS,
		width: 84,
		// TODO: get filtered data from API response
		filters: teamTraceStatusFilterOptions,
		onFilter: () => true,
		filterMultiple: false,
		render: function render(status) {
			const matchedStatusMap = getTraceRecordStatusMap(status);

			return (
				<StatusTag
					status={matchedStatusMap.statusTag}
					text={matchedStatusMap.text}
				/>
			);
		},
	},
};

// Prop Types defined
export const teamTraceRecordDetailBettingsPropTypes = PropTypes.shape({
	data: PropTypes.arrayOf(bettingRecordPropType),
	page: PropTypes.number,
	numOfItems: PropTypes.number,
	numOfPages: PropTypes.number,
});

export const teamTraceRecordDetailPropTypes = PropTypes.shape({
	id: PropTypes.number,
	username: PropTypes.string,
	lotteryName: PropTypes.string,
	name: PropTypes.string,
	isTerminatedIfWin: PropTypes.oneOfType([
		PropTypes.boolean,
		PropTypes.number,
	]),
	numOfIssues: PropTypes.number,
	numOfFinishedIssues: PropTypes.number,
	rebate: PropTypes.number,
	amountPerBet: PropTypes.number,
	amount: PropTypes.number,
	betcontent: PropTypes.string,
	weizhi: PropTypes.string,
	status: PropTypes.number,
	device: PropTypes.string,
	createdAt: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(Date),
	]),
});
