module.exports = {
	// COMMON
	COMMON_INVALID_QUERIED_DATE_RANGE: {
		CODE: "888.000.001",
		MESSAGE: "查询日期范围错误, 请缩短天数查询",
	},
	// LOTTERY_CLASS
	LOTTERY_CLASS_INVALID_REQUEST: {
		CODE: "888.001.422",
		MESSAGE: "输入格式错误",
	},
	// LOTTERY
	LOTTERY_NOT_FOUND: {
		CODE: "888.002.404",
		MESSAGE: "此彩种不存在",
	},
	LOTTERY_INVALID_REQUEST: {
		CODE: "888.002.422",
		MESSAGE: "输入格式错误",
	},
	// PLAY
	PLAY_CONDITION_INVALID_REQUEST: {
		CODE: "888.004.422",
		MESSAGE: "输入格式错误",
	},
	PLAY_INVALID_REQUEST: {
		CODE: "888.005.422",
		MESSAGE: "输入格式错误",
	},
	// DRAWING
	DRAWING_COULD_NOT_BE_STOPPED: {
		CODE: "888.006.403",
		MESSAGE: "此期号已非开盘中或非开奖中不可停止",
	},
	DRAWING_COULD_NOT_BE_CANCELED: {
		CODE: "888.006.404",
		MESSAGE: "此期号非停止中不可撤单",
	},
	DRAWING_DUPLICATED: {
		CODE: "888.006.405",
		MESSAGE: "此期号已存在",
	},
	DRAWING_COULD_NOT_BE_UPDATED: {
		CODE: "888.006.406",
		MESSAGE: "此期号非停止中或已派獎不可修改獎號",
	},
	DRAWING_NOT_FOUND: {
		CODE: "888.006.407",
		MESSAGE: "此期号不存在",
	},
	DRAWING_INVALID_REQUEST: {
		CODE: "888.006.422",
		MESSAGE: "输入格式错误",
	},
	DRAWING_DUPLICATED_OPENCODE: {
		CODE: "888.006.409",
		MESSAGE: "连续两期相同开奖号码",
	},
	DRAWING_EARLY_OPENED: {
		CODE: "888.006.410",
		MESSAGE: "开奖号码早开",
	},
	DRAWING_INVALID_QUERY_ISSUE: {
		CODE: "888.006.411",
		MESSAGE: "此期号非开盘中",
	},
	// BETTING
	BETTING_LOTTERY_CLASS_OFFLINE: {
		CODE: "888.007.403",
		MESSAGE: "该彩种类别关闭",
	},
	BETTING_PLAY_NOT_FOUND: {
		CODE: "888.007.404",
		MESSAGE: "玩法不存在",
	},
	BETTING_LOTTERY_OFFLINE: {
		CODE: "888.007.405",
		MESSAGE: "该彩票关闭",
	},
	BETTING_PLAY_OFFLINE: {
		CODE: "888.007.406",
		MESSAGE: "该玩法关闭",
	},
	BETTING_INSUFFICIENT_BALANCE: {
		CODE: "888.007.407",
		MESSAGE: "余额不足",
	},
	BETTING_NOT_CANCELABLE: {
		CODE: "888.007.408",
		MESSAGE: "已封盘, 注单无法撤销",
	},
	BETTING_NOT_FOUND: {
		CODE: "888.007.409",
		MESSAGE: "注单不存在",
	},
	BETTING_IS_STOPPED: {
		CODE: "888.007.410",
		MESSAGE: "该期已停止下注",
	},
	ZHAOSHANG_IS_NOT_BETABLE: {
		CODE: "888.007.411",
		MESSAGE: "招商禁止投注",
	},
	USER_IS_NOT_BETABLE: {
		CODE: "888.007.412",
		MESSAGE: "用户投注被禁止",
	},
	BETTING_INVALID_REQUEST: {
		CODE: "888.007.422",
		MESSAGE: "输入格式错误",
	},
	BETTING_INVALID_BETCONTENT: {
		CODE: "888.007.423",
		MESSAGE: "号码格式错误",
	},
	BETTING_INVALID_WEIZHI: {
		CODE: "888.007.424",
		MESSAGE: "位置格式错误",
	},
	BETTING_INVALID_REBATE: {
		CODE: "888.007.425",
		MESSAGE: "超过返点最大限制",
	},
	BETTING_INVALID_AMOUNT_PER_ORDER: {
		CODE: "888.007.426",
		MESSAGE: "注单金额不能低于0.2元",
	},
	TRACE_NOT_FOUND: {
		CODE: "888.007.404",
		MESSAGE: "追号单不存在",
	},
	TRACE_INVALID_REQUEST: {
		CODE: "888.007.422",
		MESSAGE: "输入格式错误",
	},
	TRACE_INVALID_AMOUNT_PER_BETTING: {
		CODE: "888.007.427",
		MESSAGE: "追号每期注单金额不能低于0.2元",
	},
	EXCEEDED_MAX_AMOUNT_OF_TOTAL_TRACES_PER_REQUEST: {
		CODE: "888.007.428",
		MESSAGE: "当前追号方案总投注额大于{AMOUNT}，请您降低收益率或者减少追号期数",
	},
	EXCEEDED_MAX_ORDERS_PER_REQUEST: {
		CODE: "888.007.429",
		MESSAGE: "追号注单数超过最大限制{AMOUNT}",
	},
	EXCEEDED_MAX_ISSUES_PER_TRACE: {
		CODE: "888.007.430",
		MESSAGE: "追号期数超过最大限制{AMOUNT}",
	},
	// WALLET
	WALLET_NOT_FOUND: {
		CODE: "888.008.404",
		MESSAGE: "钱包不存在",
	},
	WALLET_INSUFFICIENT_BALANCE: {
		CODE: "888.008.405",
		MESSAGE: "余额不足",
	},
	TRANSFER_OVERFLOW: {
		CODE: "888.008.406",
		MESSAGE: "一天转账额度上限2000000元",
	},
	TRANSFER_RECEIVER_NOT_FOUND: {
		CODE: "888.008.407",
		MESSAGE: "会员名错误",
	},
	TRANSFER_RECEIVER_BANK_CARD_NUMBER_INVALID: {
		CODE: "888.008.408",
		MESSAGE: "银行卡错误",
	},
	TRANSFER_RECEIVER_NEVER_BIND_BANK_CARD: {
		CODE: "888.008.409",
		MESSAGE: "该会员未绑定银行卡，无法给他執行转帐操作",
	},
	TRANSFER_SELF: {
		CODE: "888.008.410",
		MESSAGE: "不可转帐给自己",
	},
	WALLET_INVALID_REQUEST: {
		CODE: "888.008.422",
		MESSAGE: "输入格式错误",
	},
	// STAFF
	STAFF_IS_BLOCKED: {
		CODE: "888.009.403",
		MESSAGE: "帐户被停用",
	},
	STAFF_NOT_FOUND: {
		CODE: "888.009.404",
		MESSAGE: "用户不存在",
	},
	STAFF_COULD_NOT_BE_UPDATED: {
		CODE: "888.009.405",
		MESSAGE: "不是同类型、同级或下级的帐号，禁止修改",
	},
	ROLE_COULD_NOT_BE_CHOSEN: {
		CODE: "888.009.406",
		MESSAGE: "不能选择其他类型或上级的角色",
	},
	STAFF_COULD_NOT_UPDATE_SELF: {
		CODE: "888.009.407",
		MESSAGE: "不可更新自己",
	},
	STAFF_DUPLICATED: {
		CODE: "888.009.409",
		MESSAGE: "帐号已存在",
	},
	STAFF_INVALID_REQUEST: {
		CODE: "888.009.422",
		MESSAGE: "输入格式错误",
	},
	// AUTH
	INVALID_LOGIN_CREDENTIALS: {
		CODE: "888.010.401",
		MESSAGE: "帐密错误",
	},
	WITHOUT_LOGGED_IN: {
		CODE: "888.010.402",
		MESSAGE: "请先登入",
	},
	INVALID_CAPTCHA: {
		CODE: "888.010.405",
		MESSAGE: "验证码错误",
	},
	EXPIRED_CAPTCHA: {
		CODE: "888.010.406",
		MESSAGE: "验证码已超时",
	},
	ILLEGAL_OPERATION: {
		CODE: "888.012.403",
		MESSAGE: "非法操作",
	},
	INVALID_GOOGLE_TOTP_LOGIN_CREDENTIALS: {
		CODE: "888.010.407",
		MESSAGE: "帐号或Google认证码错误",
	},
	INVALID_AUTH_REQUEST: {
		CODE: "888.010.422",
		MESSAGE: "输入格式错误",
	},
	// PLATFORM
	PLATFORM_INVALID_REQUEST: {
		CODE: "888.011.422",
		MESSAGE: "输入格式错误",
	},
	PLATFORM_FIXED_WAGE_INPUT_NOT_IN_WHITELIST: {
		CODE: "888.011.423",
		MESSAGE: "非法固定工资",
	},
	// USER
	USER_IS_BLOCKED: {
		CODE: "888.012.402",
		MESSAGE: "帐户被冻结",
	},
	USER_INVALID_BONUS: {
		CODE: "888.012.403",
		MESSAGE: "非法奖金号",
	},
	USER_NOT_FOUND: {
		CODE: "888.012.404",
		MESSAGE: "用户不存在",
	},
	USER_IS_FORBIDDEN: {
		CODE: "888.012.405",
		MESSAGE: "用户无此权限",
	},
	USER_IS_NOT_AGENT_OR_MEMBER: {
		CODE: "888.012.406",
		MESSAGE: "会员类型不支援修改",
	},
	USER_HAS_DESCENDANTS: {
		CODE: "888.012.407",
		MESSAGE: "此代理有下级, 无法修改会员类型",
	},
	USER_TYPE_IS_IDENTICAL: {
		CODE: "888.012.408",
		MESSAGE: "会员类型不能相同",
	},
	USER_DUPLICATED: {
		CODE: "888.012.409",
		MESSAGE: "帐号已存在",
	},
	USER_PINNED_COMMENT_IS_EXCEEDED: {
		CODE: "888.012.410",
		MESSAGE: "置顶数超过最大限制",
	},
	USER_COMMENT_NOT_FOUND: {
		CODE: "888.012.411",
		MESSAGE: "备注不存在",
	},
	INVALID_USER_PAYER: {
		CODE: "888.012.412",
		MESSAGE: "持卡人输入错误",
	},
	USER_DEFAULT_PASSWORD_ALREADY_CHANGED: {
		CODE: "888.012.413",
		MESSAGE: "帐号预设密码已更改",
	},
	USER_IS_NOT_CREATABLE: {
		CODE: "888.012.414",
		MESSAGE: "禁止开下级",
	},
	USER_IS_MODIFIED:{
		CODE: "888.012.415",
		MESSAGE: "用户资料已被更新, 请重新再试一次",
	},
	USER_LOGIN_PASSWORD_IS_MODIFIED:{
		CODE: "888.012.416",
		MESSAGE: "登录密码已更新，请重新登录",
	},
	ROOT_COULD_NOT_MODIFIED: {
		CODE: "888.012.417",
		MESSAGE: "此為root帳號禁止修改",
	},
	USER_BONUS_EQUAL_TO_BEFORE: {
		CODE: "888.012.418",
		MESSAGE: "会员奖金号与先前相同，无法更改",
	},
	USER_LEVEL_EQUAL_TO_BEFORE: {
		CODE: "888.012.419",
		MESSAGE: "会员阶层与先前相同，无法更改",
	},
	USER_INVALID_REQUEST: {
		CODE: "888.012.422",
		MESSAGE: "输入格式错误",
	},
	USER_SETTING_NOT_FOUND: {
		CODE: "888.012.423",
		MESSAGE: "用户设定栏位不存在",
	},
	USER_DAILY_STATS_INVALID_REQUEST: {
		CODE: "888.012.424",
		MESSAGE: "输入格式错误",
	},
	USER_BONUS_GREATER_THAN_PARENT: {
		CODE: "888.012.425",
		MESSAGE: "设置的奖金号不可比上级高",
	},
	USER_FIXED_WAGE_INPUT_NOT_IN_WHITELIST: {
		CODE: "888.012.426",
		MESSAGE: "非法固定工资",
	},
	USER_FIXED_WAGE_INPUT_GREATER_THAN_PARENT: {
		CODE: "888.012.427",
		MESSAGE: "下级固定工资不可高于上级",
	},
	USER_PAYER_IS_EMPTY: {
		CODE: "888.012.428",
		MESSAGE: "持卡人姓名为空, 请先设定真实姓名",
	},
	USER_IS_NOT_DEPOSITABLE: {
		CODE: "888.012.429",
		MESSAGE: "您目前已被禁止充值, 如有问题请洽客服处理",
	},
	USER_LEVEL_IS_NOT_MATCHED_BANK_ACCOUNT: {
		CODE: "888.012.430",
		MESSAGE: "使用者层级与银行帐户不匹配",
	},
	USER_DEFAULT_PASSWORD_IS_NOT_CHANGED: {
		CODE: "888.012.431",
		MESSAGE: "请先修改预设登入密码",
	},
	USER_IS_NOT_WITHDRAWABLE: {
		CODE: "888.012.432",
		MESSAGE: "您目前已被禁止提现, 如有问题请洽客服处理",
	},
	USER_IS_NOT_FUNDSABLE: {
		CODE: "888.012.433",
		MESSAGE: "您已被冻结资金, 如有问题请洽客服处理",
	},
	USER_FIXED_WAGE_EQUAL_TO_BEFORE: {
		CODE: "888.012.434",
		MESSAGE: "会员固定工资与先前相同，无法更改",
	},
	USER_WITHDRAWAL_MESSAGE_NOT_FOUND: {
		CODE: "888.012.435",
		MESSAGE: "提现提示不存在",
	},
	USER_NEVER_BIND_BANK_CARD: {
		CODE: "888.012.435",
		MESSAGE: "请先绑定银行卡",
	},
	USER_IS_NOT_TRANSFERABLE: {
		CODE: "888.012.436",
		MESSAGE: "不允许任意转帐",
	},
	USER_ACHIEVED_DIVIDEND_SETTING_NOT_FOUND: {
		CODE: "888.012.437",
		MESSAGE: "未正确设定分红上限，找不到达标的分红规则",
	},
	// TRANSACTION_LOG
	TRANSACTION_LOG_INVALID_REQUEST: {
		CODE: "888.013.422",
		MESSAGE: "输入格式错误",
	},
	// TEAM
	TEAM_CHILDREN_NOT_FOUND: {
		CODE: "888.015.404",
		MESSAGE: "此用户不属于直属下级",
	},
	TEAM_INVALID_REQUEST: {
		CODE: "888.015.422",
		MESSAGE: "输入格式错误",
	},
	FIXED_WAGE_INPUT_NOT_IN_WHITELIST: {
		CODE: "888.015.423",
		MESSAGE: "非法固定工资",
	},
	FIXED_WAGE_INPUT_LESS_THAN_EQUAL_CURRENT: {
		CODE: "888.015.424",
		MESSAGE: "设置低于目前固定工资",
	},
	FIXED_WAGE_INPUT_GREATER_THAN_PARENT: {
		CODE: "888.015.425",
		MESSAGE: "下级固定工资不可高于上级",
	},
	// DIVIDEND_DURATION
	PREVIOUS_DIVIDEND_DURATION_NOT_FOUND: {
		CODE: "888.015.426",
		MESSAGE: "上一分红周期不存在",
	},
	// TEAM_DURATION_STATS
	TEAM_DURATION_STATS_NOT_FOUND: {
		CODE: "888.015.427",
		MESSAGE: "分红统计资料不存在",
	},
	DIVIDEND_STATUS_IS_INVALID: {
		CODE: "888.015.428",
		MESSAGE: "分红状态不符合发放资格",
	},
	DIVIDEND_EXCEEDED_PROFIT: {
		CODE: "888.015.429",
		MESSAGE: "发放分红超过团队亏损金额",
	},
	DIVIDEND_INSUFFICIENT_BALANCE: {
		CODE: "888.015.430",
		MESSAGE: "钱包余额不足, 无法发放分红",
	},
	// BANK_CARD
	BANK_CARD_IS_NOT_WITHDRAWABLE: {
		CODE: "888.017.403",
		MESSAGE: "此银行卡目前不可提现",
	},
	BANK_CARD_NOT_FOUND: {
		CODE: "888.017.404",
		MESSAGE: "银行卡不存在",
	},
	BANK_CARD_IS_BLOCKED: {
		CODE: "888.017.405",
		MESSAGE: "此银行卡已被列入黑名单",
	},
	BANK_CARD_HAS_BE_WITHDRAWAL_APPLICATION_FORM_USED: {
		CODE: "888.017.406",
		MESSAGE: "有提现单正在使用此卡，不可解除绑定",
	},
	BANK_CARD_ALREADY_BOUND: {
		CODE: "888.017.409",
		MESSAGE: "银行卡已绑定",
	},
	BANK_CARD_INVALID_REQUEST: {
		CODE: "888.017.422",
		MESSAGE: "输入格式错误",
	},
	BANK_CARD_BANK_NOT_EXIST: {
		CODE: "888.017.424",
		MESSAGE: "发卡银行不存在",
	},
	BANK_CARD_INVALID_PAYER: {
		CODE: "888.017.425",
		MESSAGE: "持卡人姓名错误",
	},
	// DEPOSIT
	DEPOSIT_INVALID_REQUEST: {
		CODE: "888.019.422",
		MESSAGE: "输入格式错误",
	},
	DEPOSIT_AMOUNT_OUT_OF_RANGE: {
		CODE: "888.019.403",
		MESSAGE: "充值金额不符合所选充值通道的单次充值额度限制",
	},
	WITHOUT_AVAILABLE_DEPOSIT_AMOUNT: {
		CODE: "888.019.405",
		MESSAGE: "目前无可用的小数点数值可分配",
	},
	// WITHDRAW
	WITHDRAW_INVALID_REQUEST: {
		CODE: "888.020.422",
		MESSAGE: "输入格式错误",
	},
	HAS_PREVIOUS_WITHDRAWAL_APPLICATION_FORMS: {
		CODE: "888.020.409",
		MESSAGE: "您还有未处理的款项, 请稍候再提",
	},
	EXCEEDED_MAX_NUM_OF_WITHDRAWALS_PER_DAY: {
		CODE: "888.020.405",
		MESSAGE: "已达单日提现次数上限, 无法提现",
	},
	WITHDRAWAL_AMOUNT_LESS_THAN_MIN_AMOUNT: {
		CODE: "888.020.406",
		MESSAGE: "单次提款金额至少{AMOUNT}元",
	},
	WITHDRAWAL_AMOUNT_GREATER_THAN_MAX_AMOUNT: {
		CODE: "888.020.407",
		MESSAGE: "单次提款金额不可超过{AMOUNT}元",
	},
	EXCEEDED_MAX_WITHDRAWAL_AMOUNT_PER_DAY: {
		CODE: "888.020.408",
		MESSAGE: "你已超过单日最大提款额",
	},
	WITHDRAWAL_INSUFFICIENT_BALANCE: {
		CODE: "888.020.410",
		MESSAGE: "余额不足, 无法提现",
	},
	// LEVEL
	LEVEL_NOT_FOUND: {
		CODE: "888.021.404",
		MESSAGE: "层级不存在",
	},
	MEMBERS_IN_LEVEL_COULD_NOT_ARCHIVE: {
		CODE: "888.021.405",
		MESSAGE: "需先将该层级的所有人移动后才可关闭该层级",
	},
	LEVEL_DUPLICATED: {
		CODE: "888.021.406",
		MESSAGE: "层级描述名称已存在",
	},
	LEVEL_INVALID_REQUEST: {
		CODE: "888.021.422",
		MESSAGE: "输入格式错误",
	},
	// BANK_ACCOUNT
	BANK_ACCOUNT_NOT_FOUND: {
		CODE: "888.022.404",
		MESSAGE: "银行帐户不存在",
	},
	// DEPOSIT_APPLICATION_FORM
	DEPOSIT_APPLICATION_FORM_NOT_FOUND: {
		CODE: "888.023.404",
		MESSAGE: "充值单不存在",
	},
	DEPOSIT_APPLICATION_FORM_INVALID_REQUEST: {
		CODE: "888.023.422",
		MESSAGE: "输入格式错误",
	},
	// ROLE
	ROLE_NOT_FOUND: {
		CODE: "888.024.404",
		MESSAGE: "角色不存在",
	},
	// WITHDRAWAL_APPLICATION_FORM
	WITHDRAWAL_USER_FIRST_WITHDRAW: {
		CODE: "888.025.431",
		MESSAGE: "第一次出款无法自动出款",
	},
	WITHDRAWAL_ALERTED_USER: {
		CODE: "888.025.432",
		MESSAGE: "警示帐号",
	},
	WITHDRAWAL_DISALLOWED_LEVEL: {
		CODE: "888.025.433",
		MESSAGE: "使用者未在自动出款层级",
	},
	WITHDRAWAL_USER_DAMA_AMOUNT_GREATER_THAN_ZERO: {
		CODE: "888.025.434",
		MESSAGE: "使用者打码量>0",
	},
	WITHDRAWAL_MIN_REGISTERED_DAYS_UNREACH: {
		CODE: "888.025.435",
		MESSAGE: "使用者注册未满规定天数",
	},
	WITHDRAWAL_MAX_DAILY_BETTING_PROFIT_EXCEED: {
		CODE: "888.025.436",
		MESSAGE: "使用者彩票当日盈利金额超过规定金额",
	},
	WITHDRAWAL_MAX_30DAYS_BETTING_PROFIT_EXCEED: {
		CODE: "888.025.437",
		MESSAGE: "使用者彩票30日盈利金额超过规定金额",
	},
	WITHDRAWAL_USER_BETTING_ISSUE_IN_BLACK_LIST: {
		CODE: "888.025.438",
		MESSAGE: "使用者注单在彩票黑名单内",
	},
	WITHDRAWAL_NO_REMIT_CHANNEL_WITHIN_AMOUNT: {
		CODE: "888.025.439",
		MESSAGE: "该金额没有自动出款通道",
	},
	WITHDRAWAL_REMIT_TO_BLOCKED_BANK: {
		CODE: "888.025.440",
		MESSAGE: "自动出款单包含银行黑名单",
	},
	// USER LEVEL LOG
	USER_LEVEL_LOG_INVALID_REQUEST: {
		CODE: "888.026.422",
		MESSAGE: "输入格式错误",
	}
};