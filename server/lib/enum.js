// 投注類型
const ENUM_BETTING_TYPE = {
	STANDARD: 1,
	TRACE: 2,
};

// 投注狀態
const ENUM_BETTING_STATUS = {
	NEW: 1,
	WIN: 2,
	LOSE: 3,
	DRAW: 4,
	FAILED: 5,
	CANCELED: 6,
	TERMINATING: 7,
	// virtual status: current date > closedAt, actually NEW in db
	NOT_OPENED: 8,
	// virtual status: current date < closedAt, actually NEW in db
	OPENING: 9,
};

// 撤單類型
const ENUM_BETTING_CANCELED_TYPE = {
	CANCELED_BY_USER: 1,
	CANCELED_BY_SYSTEM: 2,
	CANCELED_BY_STAFF: 3,
};

// 追號狀態
const ENUM_TRACE_STATUS = {
	NEW: 1,
	DONE: 2,
	TERMINATING: 7,
};

// 帳變類型
const ENUM_TRANSACTION_TYPE = {
	BETTING: 1,
	TRACE: 2,
	CANCEL_BETTING: 3,
	BETTING_REWARD: 4,
	BETTING_REBATE: 5,
	SELF_FIXED_WAGE: 6,
	TEAM_REBATE: 7,
	TEAM_FIXED_WAGE: 8,
	DEPOSIT: 9,
	WITHDRAWAL: 10,
	ACTIVITY: 11,
	DIVIDEND_TRANSFER_OUT: 13,
	DIVIDEND_TRANSFER_IN: 14,
	DIVIDEND_GRANTED_FROM_SUPERVISION: 15,
	DIVIDEND_GRANTED_FROM_PRIMARY: 16,
	DIVIDEND_RECEIVED: 17,
	INCENTIVE: 18,
	STAFF_CANCELED: 19,
	// 任意轉帳
	TRANSFER: 20,
	// 下級轉帳
	CHILDREN_TRANSFER: 21,
};

// 帳變狀態
const ENUM_TRANSACTION_STATUS = {
	DONE: 1,
	PENDING: 2,
};

// 分紅規則類別
const ENUM_DIVIDEND_TYPE = {
	SELF: 1,
	TEMPLATE: 2,
};

// 備註狀態
const ENUM_COMMENT_STATUS = {
	DEFAULT: 1,
	PINNED: 2,
};

// 基本設置類型
const ENUM_SETTING_TYPE = {
	USER: 1,
	TEAM: 2,
};

// 使用者類別
const ENUM_USER_TYPE = {
	ZHAOSHANG: 1,
	AGENT: 2,
	MEMBER: 3,
	DIRECT_CUSTOMER: 4,
};

const ENUM_RELATIONSHIP_DISTANCE = {
	ME: 0,
	CHILDREN: 1,
	PARENT: 1,
};

// 操作日誌
const ENUM_MANAGEMENT_TYPE = {
	USER: 1,
	LOTTERY: 2,
	LOTTERY_CLASS: 3,
	PLAY: 4,
	DEPOSIT: 5,
	WITHDRAWAL: 6,
	USER_LEVEL_MODIFICATION: 7,
	DIVIDEND_SETTING: 8,
	DRAWING: 9,
	PLATFORM: 10,
	BANK_CARD: 11,
	BETTING: 12,
	LEVEL: 13,
	STAFF: 14,
	TRACE: 15,
};
const ENUM_MANAGEMENT_ACTION = {
	CREATION: 1,
	MODIFICATION: 2,
	DELETION: 3,
};
const ENUM_MANAGEMENT_STATUS = {
	SUCCESS: 1,
	FAILED: 2,
};

// 開獎號碼
const ENUM_DRAWING_STATUS = {
	// 派獎中 (取得開獎號)
	REWARD_GRANTING: 1,
	// 派獎中 (投注單開獎)
	REWARD_GRANTED: 2,
	// 已派獎 (上級返點/工資)
	TEAM_COMMISSION_GRANTED: 3,
	// 停止下注與開獎
	STOPPED: 4,
	// 撤單
	CANCELED: 5,
	MODIFIED: 6,
	// 獎號與前10筆重複
	DUPLICATED: 7,
	// 獎號早開
	EARLY_OPENED: 8,
	CLOSED: 9,
	CANCELING: 10,
	// 開盤中
	OPENING: 11,
	// 開獎中
	NOT_OPENING: 12,
	// 後台修改獎號中
	MODIFYING: 13,
};

// 錢包
const ENUM_WALLET_TYPE = {
	CURRENCY: 1,
	CRYPTO_CURRENCY: 2,
	THIRD_PARTY: 3,
};
const ENUM_WALLET_CODE = {
	PRIMARY: 100,
	SUPERVISION: 101,
};

// 分紅狀態
const ENUM_DIVIDEND_STATUS = {
	NOT_SET: 1,
	NOT_QUALIFIED: 2,
	NOT_GRANTED: 3,
	PARTIAL_GRANTED: 4,
	FULL_GRANTED: 5,
	TEAM_WIN: 6,
};

// 充值種類狀態
const ENUM_DEPOSIT_CLASS_STATUS = {
	ACTIVE: 1,
	HIDDEN: 2,
	ARCHIVED: 3,
};

// 層級ID
const ENUM_FINANCIAL_LEVEL_ID = {
	NORMAL_ONE: 1,
	NORMAL_TWO: 2,
	NORMAL_THREE: 3,
	NORMAL_FOUR: 4,
	NORMAL_FIVE: 5,
	NORMAL_SIX: 6,
	NORMAL_SEVEN: 7,
	NORMAL_EIGHT: 8,
	NORMAL_NINE: 9,
	NORMAL_TEN: 10,
	SPECIAL_ONE: 11,
	SPECIAL_TWO: 12,
	SPECIAL_THREE: 13,
	SPECIAL_FOUR: 14,
	SPECIAL_FIVE: 15,
	SPECIAL_SIX: 16,
	SPECIAL_SEVEN: 17,
	SPECIAL_EIGHT: 18,
	SPECIAL_NINE: 19,
	SPECIAL_TEN: 20,
};

// 層級類型
const ENUM_FINANCIAL_LEVEL_TYPE = {
	NORMAL: 1,
	SPECIAL: 2,
};

// 層級狀態
const ENUM_FINANCIAL_LEVEL_STATUS = {
	ACTIVE: 1,
	ARCHIVED: 2,
};

// 財務部門ID
const ENUM_FINANCIAL_DEPARTMENT_ID = {
	A: 1,
	B: 2,
	C: 3,
};

// 收款金額類型
const ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE = {
	RANGE: 1,
	WHITELIST: 2,
};

// 收款帳戶狀態
const ENUM_BANK_ACCOUNT_STATUS = {
	ACTIVE: 1,
	ARCHIVED: 2,
};

// 提款單狀態
const ENUM_DEPOSIT_APPLICATION_FORM_STATUS = {
	NEW: 1,
	CONFIRMED: 2,
	CANCELED: 3,
	INCONSISTENT: 4,
	EXPIRED: 5,
	MERGED: 6,
};

// 銀行卡狀態
const ENUM_BANK_CARD_STATUS = {
	ACTIVE: 1,
	ARCHIVED: 2,
	BLOCKED: 3,
};

// 提款單狀態
const ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS = {
	NEW: 1,

	// 準備自動出款
	READY: 2,

	REMITED: 3,

	// 等待後台人員手動選擇出款方式
	AUTO_REMIT_REJECTED: 4,
	FAILED: 5,

	// 銀行, 第三方, 代付 處理中
	PROCESSING: 6,

	CANCELED: 7,
	THIRD_PARTY_PAYMENT_REQUEST_FORM: 8,
};

// 提款單禁止系統自動出款類型
const ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE = {
	FIRST_WITHDRAWAL: 1,
	ALERTED_USER: 2,
	DAMA_AMOUNT_GREATER_THAN_ZERO: 3,
	MIN_REGISTERED_DAYS: 4,
	BANK_IN_BLACKLIST: 5,
	DAILY_BETTING_PROFIT_TOO_MUCH: 6,
	THIRD_PARTY_GAME_PROFIT_TOO_MUCH: 7,
	TEAM_REBATE_TOO_MUCH: 8,
	ISSUE_IN_BLACKLIST: 9,
	TEAM_BETTING_AMOUNT_TOO_MUCH: 10,
	DISALLOWED_LEVEL: 11,
	THIRTY_DAYS_BETTING_PROFIT_TOO_MUCH: 12,
	NO_REMIT_CHANNEL_WITHIN_AMOUNT: 13,
	REMIT_TO_BLOCKED_BANK: 14,
};

const ENUM_REMIT_CHANNEL_STATUS = {
	ACTIVE: 1,
	BLOCKED: 2,
	ARCHIVED: 3,
};

const ENUM_PAYMENT_ACCOUNT_STATUS = {
	ACTIVE: 1,
	BLOCKED: 2,
	ARCHIVED: 3,
};

const ENUM_PAYMENT_CLASS_ID = {
	BANK: 1,
	THIRD_PARTY: 2,
	PROXY_PAYMENT: 3,
};

// 充值金額的使用狀態
const ENUM_DEPOSIT_AMOUNT_STATUS = {
	BUSY: 1,
	IDLE: 2,
};

// 移層原因
const ENUM_USER_LEVEL_LOG_STATUS = {
	IP: 1,
	LOCATION: 2,
	MANUALLY: 3,
	UPGRADE: 4,
	DIFFERENT_PAYER_FOR_BANK_CARD_AND_DEPOSIT: 5,
};

// 管理員狀態
const ENUM_STAFF_STATUS = {
	ACTIVE: 1,
	BLOCKED: 2,
};

// 管理員角色狀態
const ENUM_ROLE_STATUS = {
	ACTIVE: 1,
	BLOCKED: 2,
};

// 管理員角色類型
const ENUM_ROLE_TYPE = {
	FIN: 1,
	CS: 2,
	ADMIN: 3,
	ACCOUNTANT: 4,
};

// 角色的層級差距
const ENUM_ROLE_RELATIONSHIP_DISTANCE = {
	ME: 0,
	CHILDREN: 1,
	PARENT: 1,
};

module.exports = {
	ENUM_BETTING_TYPE,
	ENUM_BETTING_STATUS,
	ENUM_BETTING_CANCELED_TYPE,
	ENUM_TRACE_STATUS,
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
	ENUM_DIVIDEND_TYPE,
	ENUM_COMMENT_STATUS,
	ENUM_SETTING_TYPE,
	ENUM_USER_TYPE,
	ENUM_RELATIONSHIP_DISTANCE,
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
	ENUM_MANAGEMENT_STATUS,
	ENUM_DRAWING_STATUS,
	ENUM_WALLET_TYPE,
	ENUM_WALLET_CODE,
	ENUM_DIVIDEND_STATUS,
	ENUM_DEPOSIT_CLASS_STATUS,
	ENUM_FINANCIAL_LEVEL_ID,
	ENUM_FINANCIAL_LEVEL_TYPE,
	ENUM_FINANCIAL_LEVEL_STATUS,
	ENUM_FINANCIAL_DEPARTMENT_ID,
	ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE,
	ENUM_BANK_ACCOUNT_STATUS,
	ENUM_DEPOSIT_APPLICATION_FORM_STATUS,
	ENUM_BANK_CARD_STATUS,
	ENUM_WITHDRAWAL_APPLICATION_FORM_AUTO_REMIT_REJECT_TYPE,
	ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS,
	ENUM_REMIT_CHANNEL_STATUS,
	ENUM_PAYMENT_CLASS_ID,
	ENUM_PAYMENT_ACCOUNT_STATUS,
	ENUM_DEPOSIT_AMOUNT_STATUS,
	ENUM_USER_LEVEL_LOG_STATUS,
	ENUM_STAFF_STATUS,
	ENUM_ROLE_STATUS,
	ENUM_ROLE_TYPE,
	ENUM_ROLE_RELATIONSHIP_DISTANCE,
};
