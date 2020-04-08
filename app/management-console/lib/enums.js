export { LoadingStatusEnum, } from '../../lib/enums';

// TODO pages should get UserType from here.
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

export const UserStatusEnum = {
	ACTIVE: 'active',
	BLOCKED: 'blocked',
	ARCHIVED: 'archived',
	HIDE: 'hide',
};

export const CommentStatusEnum = {
	DEFAULT: 1,
	PIN: 2,
};

export const TagsCodeStatusEnums = {
	HOT: 'hot',
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

export const GameTypeEnums = {
	LOTTERY: '彩票',
	SAELECTRIC: 'SA电子',
	EBETELECTRIC: 'EBET电子',
	PTELECTRIC: 'PT电子',
	OPENCHESS: '开源棋牌',
	ASLIVE: 'AS直播',
	GAMMACHESS: 'Gamma棋牌',
	BINARYOPTION: '二元期权',
	CQNINE: 'CQ9',
	GDELECTRIC: 'GD电子',
	VRELECTRIC: 'VR电子',
	VRLIVELOTTERY: 'VR视讯彩',
	UGSPORT: 'UG体育',
	AGELECTRIC: 'AG电子',
	TREASURE: '连环夺宝',
};

export const DrawingStatusEnums = {
	REWARD_GRANTING: 1,         // 派獎中(取得開獎號), 處理個人注單開獎
	REWARD_GRANTED: 2,          // 派獎中(投注單開獎), 處理團隊開獎
	TEAM_COMMISSION_GRANTED: 3, // 上級返點，為開獎流程最後一階段
	STOPPED: 4,                 // 停止下注與開獎
	CANCELED: 5,                 // 取消/撤單
	MODIFIED: 6,                // 修改
	DUPLICATED: 7,              // 重複號碼/獎號與前10筆重複
	EARLY_OPENED: 8,            // 提早開
	CLOSED: 9,
	CANCELING: 10,
	OPENING: 11,                // 開盤中
	NOT_OPENING: 12,            // 開獎中
	MODIFYING: 13,              // 後台修改獎號中
};

export const DeviceEnum = {
	UNKNOWN: 'unknown',
	WEBSITE: 'website',
	ANDROID: 'android',
	IOS: 'ios',
};

export const DepositStatusEnum = {
	NEW: 1,             // 待確認
	CONFIRMED: 2,       // 已確認
	CANCELED: 3,        // 已取消
	INCONSISTENT: 4,    // 殘留
	EXPIRED: 5,         // 已過期
};

export const FinanceLevelTypeEnum = {
	NORMAL: 1,
	SPECIAL: 2,
};
export const FinanceLevelStatusEnum = {
	ENABLE: 1,
	DISABLE: 2,
};

export const LevelIdEnums = {
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

const {
	NORMAL_ONE,
	NORMAL_TWO,
	NORMAL_THREE,
	NORMAL_FOUR,
	NORMAL_FIVE,
	NORMAL_SIX,
	NORMAL_SEVEN,
	NORMAL_EIGHT,
	NORMAL_NINE,
	NORMAL_TEN,
	SPECIAL_ONE,
	SPECIAL_TWO,
	SPECIAL_THREE,
	SPECIAL_FOUR,
	SPECIAL_FIVE,
	SPECIAL_SIX,
	SPECIAL_SEVEN,
	SPECIAL_EIGHT,
	SPECIAL_NINE,
	SPECIAL_TEN,
} = LevelIdEnums;

export const LevelIdTextEnums = {
	[NORMAL_ONE]: '新人层',
	[NORMAL_TWO]: '第二层',
	[NORMAL_THREE]: '第三层',
	[NORMAL_FOUR]: '第四层',
	[NORMAL_FIVE]: '第五层',
	[NORMAL_SIX]: '第六层',
	[NORMAL_SEVEN]: '第七层',
	[NORMAL_EIGHT]: '第八层',
	[NORMAL_NINE]: '第九层',
	[NORMAL_TEN]: '第十层',
	[SPECIAL_ONE]: '自动加入层',
	[SPECIAL_TWO]: '特殊层A',
	[SPECIAL_THREE]: '特殊层B',
	[SPECIAL_FOUR]: '特殊层C',
	[SPECIAL_FIVE]: '特殊层D',
	[SPECIAL_SIX]: '特殊层E',
	[SPECIAL_SEVEN]: '特殊层F',
	[SPECIAL_EIGHT]: '特殊层G',
	[SPECIAL_NINE]: '特殊层H',
	[SPECIAL_TEN]: '特殊层I',
};

export const DebitAccountPayStatusEnums = {
	UNCONFIRM: 'unconfirm',
	CONFIRM: 'confirm',
	CANCEL: 'cancel',
	FAIL: 'fail',
	PROCESS: 'process',
	THIRD_PART_UNCONFIRM: 'thirdPartUnconfirm',
	THIRD_PART_PAY_FAIL: 'thirdPartPayFail',
	UN_AUTO_PAY: 'unAutoPay',
};

export const FeatureCodeEnum = {
	ANNOUNCEMENT_MARQUEE: 'announcement-marquee',
	ANNOUNCEMENT_POPUP: 'announcement-popup',
	COMPANY_REPORT: 'company-report',
	SYSTEM_SETTING_CLIENT: 'system-setting-client',
	SYSTEM_SETTING_PLATFORM: 'system-setting-platform',
	EXTERNAL_GAME_SETTING: 'external-game-setting',
	EXTERNAL_GAME_CONTENT: 'external-game-content',
	EXTERNAL_GAME_RULES: 'external-game-rules',
	EXTERNAL_GAME_MAINTENANCE: 'external-game-maintenance',
	USERREPORT_MEMBER_PROFIT: 'user-report-member-profit',
	USERREPORT_MEMBER_CONVERSION: 'user-report-member-conversion',
	MEMBER_LOG: 'member-log',
	LOTTERY_ODDS_SPECIAL: 'lottery-odds-special',
};

export const PlayStatusEnums = {
	ONLINE: 'online',
	OFFLINE: 'offline',
};

export const PlayClassIdEnums = {
	STANDARD: 1,
	XING_YONG: 2,
};

export const StaffRolesMeTypeEnum = {
	WITH_ME: 1,
	WITHOUT_ME: 0,
};
