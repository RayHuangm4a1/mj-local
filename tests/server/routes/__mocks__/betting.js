const LOTTERY_ID = 16;
const INVALID_LOTTERY_ID = "abc";
const INTERNAL_SERVER_ERROR_MSG = "syntax error";
const CANCEL_BETTING_ID = 2;
const CANCEL_TRACE_ID = 1;
const {
	ENUM_WALLET_CODE,
	ENUM_USER_TYPE,
	ENUM_BETTING_STATUS,
} = require("../../../../server/lib/enum");

const PLAYS = {
	"53376": {
		"_id": "5d317236d69a040035430d2b",
		"status": "online",
		"lotteryClass": {
			"status": "online",
			"id": 0,
			"name": "时时彩",
			"code": "ssc"
		},
		"lottery": {
			"id": 16,
			"name": "腾讯分分彩",
			"code": "txffc",
			"status": "online"
		},
		"playCondition": {
			"id": 23,
			"name": "斗牛"
		},
		"playSubcondition": {
			"id": 23001,
			"name": "斗牛"
		},
		"id": 53376,
		"name": "无牛",
		"numerator": 1,
		"denominator": 100000,
		"unit": 2,
		"pk": {
			"isSupported": true,
			"isOnlyPlay": true,
			"awards": {
				"中奖": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"awards": {
			"中奖": {
				"delta": 0,
				"pk": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"positions": [
			{
				"name": "万",
				"isEnabled": true,
			},
			{
				"name": "千",
				"isEnabled": true,
			},
			{
				"name": "百",
				"isEnabled": true,
			},
			{
				"name": "十",
				"isEnabled": true,
			},
			{
				"name": "个",
				"isEnabled": true,
			},
		],
		"policy": {
			"bonusLimiting": {
				"isEnabled": false,
				"content": []
			},
			"betLimiting": {
				"isEnabled": false,
				"content": []
			}
		},
		"description": "no description yet",
		"closedAt": "2019-07-19T07:33:58.752Z",
		"createdAt": "2019-07-19T07:33:18.752Z",
		"updatedAt": "2019-07-19T07:33:18.752Z"
	},
	"2": {
		"_id" : "5d635aa9a30e75d1bc261ccd",
		"status" : "online",
		"lotteryClass" : {
			"status" : "online",
			"id" : 0,
			"name" : "时时彩",
			"code" : "ssc"
		},
		"lottery" : {
			"id" : 16,
			"name" : "腾讯分分彩",
			"code" : "txffc",
			"status" : "online"
		},
		"playCondition" : {
			"id" : 1,
			"name" : "五星"
		},
		"playSubcondition" : {
			"id" : 1001,
			"name" : "五星直选"
		},
		"id" : 2,
		"name" : "直选单式",
		"unit" : 2,
		"pk": {
			"isSupported": true,
			"isOnlyPlay": true,
			"awards": {
				"中奖": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"awards" : {
			"中奖" : {
				"deltaBonus" : 0,
				"numerator" : 1,
				"denominator" : 10000,
				"pk" : {
					"isEnabled" : false,
					"count" : 0
				}
			}
		},
		"positions" : [],
		"policy" : {
			"bonusLimiting" : {
				"isEnabled" : false,
				"content" : []
			},
			"betLimiting" : {
				"isEnabled" : false,
				"content" : []
			}
		},
		"description" : "手动输入号码，至少输入1个五位数号码组成一注。 手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。 投注方案：23456;开奖号码：23456，即中五星直选。",
		"createdAt" : "2019-08-26T04:06:09.946Z",
		"updatedAt" : "2019-08-26T04:06:09.946Z"
	}
};
const PLAYS_LOTTERYCLASS_STATUS_OFFLINE = {
	"53376": {
		"_id": "5d317236d69a040035430d2b",
		"status": "online",
		"lotteryClass": {
			"status": "offline",
			"id": 0,
			"name": "时时彩",
			"code": "ssc"
		},
		"lottery": {
			"id": 16,
			"name": "腾讯分分彩",
			"code": "txffc",
			"status": "online"
		},
		"playCondition": {
			"id": 23,
			"name": "斗牛"
		},
		"playSubcondition": {
			"id": 23001,
			"name": "斗牛"
		},
		"id": 53376,
		"name": "无牛",
		"numerator": 1,
		"denominator": 100000,
		"unit": 2,
		"pk": {
			"isSupported": true,
			"isOnlyPlay": true,
			"awards": {
				"中奖": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"awards": {
			"中奖": {
				"delta": 0,
				"pk": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"positions": [
			{
				"name": "万",
				"isEnabled": true,
			},
			{
				"name": "千",
				"isEnabled": true,
			},
			{
				"name": "百",
				"isEnabled": true,
			},
			{
				"name": "十",
				"isEnabled": true,
			},
			{
				"name": "个",
				"isEnabled": true,
			},
		],
		"policy": {
			"bonusLimiting": {
				"isEnabled": false,
				"content": []
			},
			"betLimiting": {
				"isEnabled": false,
				"content": []
			}
		},
		"description": "no description yet",
		"createdAt": "2019-07-19T07:33:18.752Z",
		"updatedAt": "2019-07-19T07:33:18.752Z"
	}
};
const PLAYS_LOTTERY_STATUS_OFFLINE = {
	"53376": {
		"_id": "5d317236d69a040035430d2b",
		"status": "online",
		"lotteryClass": {
			"status": "online",
			"id": 0,
			"name": "时时彩",
			"code": "ssc"
		},
		"lottery": {
			"id": 16,
			"name": "腾讯分分彩",
			"code": "txffc",
			"status": "offline"
		},
		"playCondition": {
			"id": 23,
			"name": "斗牛"
		},
		"playSubcondition": {
			"id": 23001,
			"name": "斗牛"
		},
		"id": 53376,
		"name": "无牛",
		"numerator": 1,
		"denominator": 100000,
		"unit": 2,
		"pk": {
			"isSupported": true,
			"isOnlyPlay": true,
			"awards": {
				"中奖": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"awards": {
			"中奖": {
				"delta": 0,
				"pk": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"positions": [
			{
				"name": "万",
				"isEnabled": true,
			},
			{
				"name": "千",
				"isEnabled": true,
			},
			{
				"name": "百",
				"isEnabled": true,
			},
			{
				"name": "十",
				"isEnabled": true,
			},
			{
				"name": "个",
				"isEnabled": true,
			},
		],
		"policy": {
			"bonusLimiting": {
				"isEnabled": false,
				"content": []
			},
			"betLimiting": {
				"isEnabled": false,
				"content": []
			}
		},
		"description": "no description yet",
		"createdAt": "2019-07-19T07:33:18.752Z",
		"updatedAt": "2019-07-19T07:33:18.752Z"
	}
};
const PLAYS_STATUS_OFFLINE = {
	"53376": {
		"_id": "5d317236d69a040035430d2b",
		"status": "offline",
		"lotteryClass": {
			"status": "online",
			"id": 0,
			"name": "时时彩",
			"code": "ssc"
		},
		"lottery": {
			"id": 16,
			"name": "腾讯分分彩",
			"code": "txffc",
			"status": "online"
		},
		"playCondition": {
			"id": 23,
			"name": "斗牛"
		},
		"playSubcondition": {
			"id": 23001,
			"name": "斗牛"
		},
		"id": 53376,
		"name": "无牛",
		"numerator": 1,
		"denominator": 100000,
		"unit": 2,
		"pk": {
			"isSupported": true,
			"isOnlyPlay": true,
			"awards": {
				"中奖": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"awards": {
			"中奖": {
				"delta": 0,
				"pk": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"positions": [
			{
				"name": "万",
				"isEnabled": true,
			},
			{
				"name": "千",
				"isEnabled": true,
			},
			{
				"name": "百",
				"isEnabled": true,
			},
			{
				"name": "十",
				"isEnabled": true,
			},
			{
				"name": "个",
				"isEnabled": true,
			},
		],
		"policy": {
			"bonusLimiting": {
				"isEnabled": false,
				"content": []
			},
			"betLimiting": {
				"isEnabled": false,
				"content": []
			}
		},
		"description": "no description yet",
		"createdAt": "2019-07-19T07:33:18.752Z",
		"updatedAt": "2019-07-19T07:33:18.752Z"
	}
};
const PLAYS_INVALID_LOTTERYCLASS_ID = {
	"53376": {
		"_id": "5d317236d69a040035430d2b",
		"status": "online",
		"lotteryClass": {
			"status": "online",
			"id": -1,
			"name": "时时彩",
			"code": "ssc"
		},
		"lottery": {
			"id": 16,
			"name": "腾讯分分彩",
			"code": "txffc",
			"status": "online"
		},
		"playCondition": {
			"id": 23,
			"name": "斗牛"
		},
		"playSubcondition": {
			"id": 23001,
			"name": "斗牛"
		},
		"id": 53376,
		"name": "无牛",
		"numerator": 1,
		"denominator": 100000,
		"unit": 2,
		"pk": {
			"isSupported": true,
			"isOnlyPlay": true,
			"awards": {
				"中奖": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"awards": {
			"中奖": {
				"delta": 0,
				"pk": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"positions": [
			{
				"name": "万",
				"isEnabled": true,
			},
			{
				"name": "千",
				"isEnabled": true,
			},
			{
				"name": "百",
				"isEnabled": true,
			},
			{
				"name": "十",
				"isEnabled": true,
			},
			{
				"name": "个",
				"isEnabled": true,
			},
		],
		"policy": {
			"bonusLimiting": {
				"isEnabled": false,
				"content": []
			},
			"betLimiting": {
				"isEnabled": false,
				"content": []
			}
		},
		"description": "no description yet",
		"createdAt": "2019-07-19T07:33:18.752Z",
		"updatedAt": "2019-07-19T07:33:18.752Z"
	}
};
const PLAYS_DINWEDAN_ZUHE_DA_XIAO_DAN_SHUANG = {
	"53376": {
		"_id": "5d317236d69a040035430d2b",
		"positions": [
			{
				"name": "万",
				"isEnabled": true
			},
			{
				"name": "千",
				"isEnabled": true
			},
			{
				"name": "百",
				"isEnabled": true
			},
			{
				"name": "十",
				"isEnabled": true
			},
			{
				"name": "个",
				"isEnabled": true
			}
		],
		"status": "online",
		"platform": {
			"_id": "5cd151312dfa1d244dd54516",
			"name": "官方",
			"code": "official"
		},
		"lotteryClass": {
			"_id": "5d1c43c699231fe9883fed69",
			"id": 0,
			"name": "时时彩",
			"code": "ssc",
			"status": "online"
		},
		"lottery": {
			"id": 16,
			"name": "腾讯分分彩",
			"code": "txffc",
			"status": "online"
		},
		"playCondition": {
			"_id": "5d1c43c699231fe9883fed7b",
			"name": "定位膽"
		},
		"playSubcondition": {
			"_id": "5d1c43c699231fe9883fed7c",
			"name": "五星直选"
		},
		"id": 52000,
		"name": "組合大小單雙",
		"numerator": 1,
		"denominator": 100000,
		"unit": 2,
		"pk": {
			"isSupported": true,
			"isOnlyPlay": true,
			"awards": {
				"中奖": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"awards": {
			"中奖": {
				"delta": 0,
				"pk": {
					"isEnabled": false,
					"count": 0
				}
			}
		},
		"policy": {
			"bonusLimiting": {
				"isEnabled": false,
				"content": []
			},
			"betLimiting": {
				"isEnabled": false,
				"content": []
			}
		},
		"description": "从万位、千位、百位、十位、个位各选一个号码组成一注。 从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。 投注方案：13456;开奖号码：13456，即中五星直选。",
		"createdAt": "2019-07-03T05:57:26.675Z",
		"updatedAt": "2019-07-03T05:57:26.675Z"
	}
};
const BETTINGS = [{
	"opencode": "",
	"reward": 0,
	"details": [],
	"id": 2,
	"userId": 3,
	"username": "test01",
	"walletCode": ENUM_WALLET_CODE.PRIMARY,
	"type": 1,
	"traceId": 0,
	"lotteryClassId": 0,
	"lotteryId": 12,
	"lotteryName": "东京1.5分彩",
	"playId": 1,
	"unit": 2,
	"awards": {
		"中奖": {
			"deltaBonus": 0
		}
	},
	"name": "五星 直选复式",
	"bonus": 1956,
	"rebate": 1,
	"issue": 20190821409,
	"amountPerBet": 1,
	"multiple": 1,
	"count": 1,
	"amount": 1,
	"betcontent": "1,2,3,4,5",
	"weizhi": "",
	"isPK": false,
	"status": ENUM_BETTING_STATUS.NEW,
	"device": null,
	"oid": 0,
	"createdAt": "2019-08-21T02:11:58.310Z",
	"updatedAt": "2019-08-21T02:11:58.310Z"
}];
const TRACE_BETTINGS = [{
	"opencode": "",
	"reward": 0,
	"details": [],
	"id": 3,
	"userId": 3,
	"username": "test01",
	"walletCode": ENUM_WALLET_CODE.PRIMARY,
	"type": 2,
	"traceId": 1,
	"lotteryClassId": 0,
	"lotteryId": 12,
	"lotteryName": "东京1.5分彩",
	"playId": 1,
	"unit": 2,
	"awards": {
		"中奖": {
			"deltaBonus": 0
		}
	},
	"name": "五星 直选复式",
	"bonus": 1956,
	"rebate": 1,
	"issue": 20190821409,
	"amountPerBet": 1,
	"multiple": 1,
	"count": 1,
	"amount": 1,
	"betcontent": "1,2,3,4,5",
	"weizhi": "",
	"isPK": false,
	"status": ENUM_BETTING_STATUS.NEW,
	"device": null,
	"oid": 0,
	"createdAt": "2019-08-21T02:11:58.310Z",
	"updatedAt": "2019-08-21T02:11:58.310Z"
},
{
	"opencode": "",
	"reward": 0,
	"details": [],
	"id": 4,
	"userId": 3,
	"username": "test01",
	"walletCode": ENUM_WALLET_CODE.PRIMARY,
	"type": 2,
	"traceId": 1,
	"lotteryClassId": 0,
	"lotteryId": 12,
	"lotteryName": "东京1.5分彩",
	"playId": 1,
	"unit": 2,
	"awards": {
		"中奖": {
			"deltaBonus": 0
		}
	},
	"name": "五星 直选复式",
	"bonus": 1956,
	"rebate": 1,
	"issue": 20190821409,
	"amountPerBet": 1,
	"multiple": 1,
	"count": 1,
	"amount": 1,
	"betcontent": "1,2,3,4,5",
	"weizhi": "",
	"isPK": false,
	"status": ENUM_BETTING_STATUS.NEW,
	"device": null,
	"oid": 0,
	"createdAt": "2019-08-21T02:11:58.310Z",
	"updatedAt": "2019-08-21T02:11:58.310Z"
}];
const PLATFORM = {
	"id": 1,
	"bonus": {
		"list": [
			1956,
			1954,
			1952,
			1950,
			1800,
			1700
		],
		"max": 1956,
		"min": 1700
	},
	"bettingPolicy": {
		"maxOrdersPerRequest": 200,
		"maxAmountOfTotalTracesPerRequest": 200000,
		"maxIssuesPerTrace": 100,
		"isZhaoShangBetable": false,
	}
};
const WALLET = {
	"userId": 3,
	"name": "彩票钱包",
	"type": "currency",
	"code": "primary",
	"balance": 9999,
	"isUsed": 1,
	"createdAt": "2019-08-21T02:09:48.000Z",
	"updatedAt": "2019-08-21T02:10:13.000Z"
};
const DRAWING = {
	"id": 1,
	"lotteryId": 12,
	"issue": 20190821429,
	"index": "429",
	"opencode": "8,4,4,4,1",
	"openedAt": "2019-08-21T02:43:30.000Z",
	"missing": {
		"万": {
			"0": 1,
			"1": 2,
			"2": 5,
			"3": 9,
			"4": 4,
			"5": 23,
			"6": 6,
			"7": 10,
			"8": 0,
			"9": 16
		},
		"个": {
			"0": 4,
			"1": 0,
			"2": 7,
			"3": 3,
			"4": 13,
			"5": 14,
			"6": 1,
			"7": 9,
			"8": 20,
			"9": 8
		},
		"十": {
			"0": 3,
			"1": 4,
			"2": 1,
			"3": 2,
			"4": 0,
			"5": 10,
			"6": 9,
			"7": 18,
			"8": 6,
			"9": 16
		},
		"千": {
			"0": 11,
			"1": 14,
			"2": 9,
			"3": 12,
			"4": 0,
			"5": 3,
			"6": 24,
			"7": 6,
			"8": 17,
			"9": 1
		},
		"百": {
			"0": 13,
			"1": 1,
			"2": 12,
			"3": 11,
			"4": 0,
			"5": 7,
			"6": 4,
			"7": 3,
			"8": 2,
			"9": 22
		}
	},
	"status": "opened"
};
const USER_PROFILE = {
	id: 11,
	type: ENUM_USER_TYPE.MEMBER,
	deltaBonus: 0,
	statuses: {
		isBetable: true,
		isBlocked: false,
		isDepositable: true,
		isWithdrawable: true,
		isTeamBetable: true,
		isTeamBlocked: false,
		isTeamDepositable: true,
		isTeamWithdrawable: true,
	},
};
const BET_PASSWORD = "123456";

module.exports = {
	PLAYS,
	PLAYS_LOTTERYCLASS_STATUS_OFFLINE,
	PLAYS_LOTTERY_STATUS_OFFLINE,
	PLAYS_STATUS_OFFLINE,
	PLAYS_INVALID_LOTTERYCLASS_ID,
	PLAYS_DINWEDAN_ZUHE_DA_XIAO_DAN_SHUANG,
	BETTINGS,
	TRACE_BETTINGS,
	PLATFORM,
	WALLET,
	DRAWING,
	LOTTERY_ID,
	INVALID_LOTTERY_ID,
	INTERNAL_SERVER_ERROR_MSG,
	USER_PROFILE,
	BET_PASSWORD,
	CANCEL_BETTING_ID,
	CANCEL_TRACE_ID,
};
