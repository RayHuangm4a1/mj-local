const {
	ENUM_TRANSACTION_TYPE,
} = require("../lib/enum");
const TRANSACTION_LOG_TYPES = [
	ENUM_TRANSACTION_TYPE.BETTING,
	ENUM_TRANSACTION_TYPE.TRACE,
	ENUM_TRANSACTION_TYPE.CANCEL_BETTING,
	ENUM_TRANSACTION_TYPE.BETTING_REWARD,
	ENUM_TRANSACTION_TYPE.BETTING_REBATE,
	ENUM_TRANSACTION_TYPE.SELF_FIXED_WAGE,
	ENUM_TRANSACTION_TYPE.TEAM_REBATE,
	ENUM_TRANSACTION_TYPE.TEAM_FIXED_WAGE,
	ENUM_TRANSACTION_TYPE.DEPOSIT,
	ENUM_TRANSACTION_TYPE.WITHDRAWAL,
	ENUM_TRANSACTION_TYPE.ACTIVITY,
	ENUM_TRANSACTION_TYPE.DIVIDEND_TRANSFER_IN,
	ENUM_TRANSACTION_TYPE.DIVIDEND_GRANTED_FROM_PRIMARY,
	ENUM_TRANSACTION_TYPE.INCENTIVE,
	ENUM_TRANSACTION_TYPE.STAFF_CANCELED,
];
const DIVIDEND_TRANSACTION_LOG_TYPES = [
	ENUM_TRANSACTION_TYPE.DIVIDEND_TRANSFER_OUT,
	ENUM_TRANSACTION_TYPE.DIVIDEND_GRANTED_FROM_SUPERVISION,
	ENUM_TRANSACTION_TYPE.DIVIDEND_RECEIVED,
];

module.exports = {
	TRANSACTION_LOG_TYPES,
	DIVIDEND_TRANSACTION_LOG_TYPES,
};
