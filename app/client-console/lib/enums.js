export { LoadingStatusEnum, } from '../../lib/enums';

export const PlayClassesEnum = {
	STANDARD: 'standard',
	XINYONG: 'xinyong',
	KILL_NUMBER: 'kill-number',
	PLANNING: 'planning',
};

export const TransactionLogTypeEnum = {
	BETTING: 1, // 下注
	TRACE: 2,   // 追號
	CANCEL_BETTING: 3,	// 撤單
	BETTING_REWARD: 4,  // 獎金
	BETTING_REBATE: 5,	// 返點
	SELF_FIXED_WAGE: 6, // 固定工資
	TEAM_REBATE: 7,     // 團隊返點
	TEAM_FIXED_WAGE: 8, // 團隊固定工資
	// TODO 確認下面API type number
	THIRD_PARTY: 10,	// 游戏帐变
	AMUSE_SALARY: 11,	// 娱乐工资
	SA_TRANSACTION: 12,	// SA转帐
	UG_TRANSACTION: 13,	// UG转帐
	KY_TRANSACTION: 14, // KY转帐
	DIVIDEND_TRANSACTION: 15,	// 分红转帐
	ANY_TRANSACTION: 16,	// 任意转帐
	AG_TRANSACTION: 17,	// AG转帐
	CMD_TRANSACTION: 18,	// CMD转帐
	GAMMA_TRANSACTION: 19,	// GAMMA转帐
	LOTTERY: 20,	// 彩票帐变
	BETTING_WIN: 24,	// 中奖
	PC_SALARY: 25,	// PC蛋蛋工资
	SALARY: 26, // 工资
	OTHERS: 30,	// 其他帐变
	RECHARGE: 31,	// 充值
	WITHDRAWAL: 32,	// 提现
	REFUND: 33,	// 退款
	REWARD: 34,	// 奖励
	EVENT: 35,	// 活动
	DIVIDEND: 36,	// 分红
	TRANSFER_RECHARGE: 37,	// 转充值
	TRANSFER_EVENT: 38,	// 转活动
	TRANSFER_DIVIDEND: 39,	// 转分红
	TRANSFER_REWARD: 40,	// 转奖励
};

export const DividendTransactionLogTypeEnum = {
	// 發放分紅
	DIVIDEND_TRANSFER_OUT: 13,
	DIVIDEND_GRANTED_FROM_SUPERVISION: 15,
	// 接收分紅
	DIVIDEND_RECEIVED: 17,
};

export const DeviceEnum = {
	UNKNOWN: 'unknown',
	WEBSITE: 'website',
	ANDROID: 'android',
	IOS: 'ios',
};

export const BettingRecordStatusEnum = {
	NEW: 1,
	WIN: 2,
	LOSE: 3,
	DRAW: 4,
	FAILED: 5,
	CANCELED: 6,
	EXPIRED: 7,
	NOT_OPENED: 8,
	OPENING: 9,
};

export const BettingRecordTypeEnum = {
	GENERAL: 1,
	TRACE: 2,
};

export const TraceRecordStatusEnum = {
	INCOMPLETE: 1,
	COMPLETE: 2,
};

export const TraceRecordTypeEnum = {
	CONTINUE: 'continue',
	STOP: 'stop',
};

export const UserTypeEnum = {
	ZHAOSHANG: 1,
	AGENT: 2,
	MEMBER: 3,
	FIN: 4,
	CS: 5,
	ADMIN: 6,
	DIRECT_CUSTOMER: 7,
	ACCOUNTANT: 8,
};

export const WalletTypeEnum = {
	CURRENCY: 1, 		// 真實貨幣
	CRYPTO_CURRENCY: 2,	// 加密貨幣
	THIRD_PARTY: 3,		// 外接錢包
};
export const WalletCodeEnum = {
	PRIMARY: 100,		// 主要錢包
	SUPERVISION: 101,	// 監管錢包
};

export const EventEnum = {
	SHOW_MEMBER_CENTER: 'show-member-center',
	CHANGE_MEMBER_CENTER_ROUTE: 'change-member-center-route',
	VALIDATE_BETTING_PASSWORD: 'validate-betting-password',
};

// TODO 確認第三方 code enums
export const ThirdPartyTypeEnums = {
	CHESS: 1,
	REAL_PERSON: 2,
	ELECTRONIC: 3,
	FISHING: 4,
	SPORT: 5
};

export const DividendStatusEnums = {
	NOT_SET: 1,
	NOT_QUALIFIED: 2,
	NOT_GRANTED: 3,
	PARTIAL_GRANTED: 4,
	FULL_GRANTED: 5,
	TEAM_WIN: 6,
};

export const FeatureCodeEnum = {
	DASHBOARD: 'dashboard',
	STANDARD_BETTING_BLOCK: 'standard-betting-block',
	LOTTERY_INFO_HEADER: 'lottery-info-header',
	LOTTERY: 'lottery',
	MEMBER_CENTER: 'member-center',
};
