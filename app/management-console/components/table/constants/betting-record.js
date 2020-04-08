import PropTypes from 'prop-types';
import { StatusTag, } from 'ljit-react-components';
import { BettingRecordStatusEnum, GameTypeEnums, } from '../../../lib/enums';
import { BettingRecordPropTypes, } from '../../../lib/prop-types-utils';

export const StatusEnums = BettingRecordStatusEnum;

const {
	NEW,
	WIN,
	LOSE,
	DRAW,
	CANCELED,
	NOT_OPENED,
	OPENING,
} = StatusEnums;

export const ColumnEnums = {
	USERNAME: 'username',
	GAME_TIME: 'gameTime',
	REPORT_TIME: 'reportTime',
	GAME_NAME: 'gameName',
	AMOUNT: 'amount',
	REWORD: 'reward',
	ACCUMULATE_PRIZE: 'accumulatePrize',
	TRANSACTION_ID: 'transactionId',
	LOTTERY_TYPE: 'lotteryType',
	PLAY: 'play',
	TIME: 'time',
	STATUS: 'status',
	OPERATION: 'operation',
	VALID: 'valid',
	DETAIL: 'detail',
	NOTE: 'note',
};

export const BettingRecordTablePropTypes = {
	bettingRecords: BettingRecordPropTypes,
	gameType: PropTypes.oneOf(Object.values(GameTypeEnums)),
	isLoading: PropTypes.bool,
	hasAccountField: PropTypes.bool,
	hasOperationField: PropTypes.bool,
	hasPagination: PropTypes.bool,
	onDiscard: PropTypes.func,
};

const TagStatusEnums = StatusTag.StatusEnums;

export const StatusMap = {
	[WIN]: { text: '中奖', statusTag: TagStatusEnums.WIN, },
	[LOSE]: { text: '未中奖', statusTag: TagStatusEnums.LOSE, },
	[NOT_OPENED]: { text: '未开奖', statusTag: TagStatusEnums.BET_UNOPENED, },
	[NEW]: { text: '未开奖', statusTag: TagStatusEnums.PENDING, },
	[OPENING]: { text: '开奖中', statusTag: TagStatusEnums.WARNING, },
	[DRAW]: { text: '平局', statusTag: TagStatusEnums.DRAW, },
	[CANCELED]: { text: '已撤单', statusTag: TagStatusEnums.ERROR, },
};
