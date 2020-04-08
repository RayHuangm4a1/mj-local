const {
	ENUM_USER_TYPE,
	ENUM_WALLET_TYPE,
	ENUM_WALLET_CODE,
	ENUM_FINANCIAL_LEVEL_ID,
} = require("../../lib/enum");
const {
	STATUSES_DEFAULT_VALUE,
} = require("../../schemas/mysql/user");

module.exports = [
	{
		"id": 1,
		"accountId": "5d4aea86e48b697af60c1213",
		"username": "root",
		"type": ENUM_USER_TYPE.ZHAOSHANG,
		"parentId": null,
		"parentUsername": null,
		"ancestorUsernames": [],
		"wallets": [
			{
				"name": "彩票钱包",
				"type": ENUM_WALLET_TYPE.CURRENCY,
				"code": ENUM_WALLET_CODE.PRIMARY,
				"balance": 0,
				"isUsed": false
			},
			{
				"name": "监管钱包",
				"type": ENUM_WALLET_TYPE.CURRENCY,
				"code": ENUM_WALLET_CODE.SUPERVISION,
				"balance": 0,
				"isUsed": false
			}
		],
		"deltaBonus": 0,
		"fixedWage": 2,
		"nickname": "root",
		"greeting": null,
		"qq": null,
		"wechat": null,
		"phone": null,
		"payer": null,
		"bankCardIds": [],
		"levelId": ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
		"createdBy": "admin",
		"statuses": STATUSES_DEFAULT_VALUE
	},
	{
		"id": 2,
		"accountId": "5d4aea86e48b697af60c1210",
		"username": "zhaoshang01",
		"type": ENUM_USER_TYPE.ZHAOSHANG,
		"parentId": 1,
		"parentUsername": "root",
		"ancestorUsernames": [
			"root"
		],
		"wallets": [
			{
				"name": "彩票钱包",
				"type": ENUM_WALLET_TYPE.CURRENCY,
				"code": ENUM_WALLET_CODE.PRIMARY,
				"balance": 1000000,
				"isUsed": true
			},
			{
				"name": "监管钱包",
				"type": ENUM_WALLET_TYPE.CURRENCY,
				"code": ENUM_WALLET_CODE.SUPERVISION,
				"balance": 10000,
				"isUsed": false
			}
		],
		"deltaBonus": 0,
		"fixedWage": 2,
		"nickname": "zhaoshang01",
		"greeting": null,
		"qq": null,
		"wechat": null,
		"phone": null,
		"payer": null,
		"bankCardIds": [],
		"levelId": ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
		"createdBy": "admin",
		"statuses": STATUSES_DEFAULT_VALUE
	},
	{
		"id": 3,
		"accountId": "5d4aea86e48b697af60c1211",
		"username": "test01",
		"type": ENUM_USER_TYPE.AGENT,
		"parentId": 2,
		"parentUsername": "zhaoshang01",
		"ancestorUsernames": [
			"zhaoshang01",
			"root"
		],
		"wallets": [
			{
				"name": "彩票钱包",
				"type": ENUM_WALLET_TYPE.CURRENCY,
				"code": ENUM_WALLET_CODE.PRIMARY,
				"balance": 1000000,
				"isUsed": true
			},
			{
				"name": "监管钱包",
				"type": ENUM_WALLET_TYPE.CURRENCY,
				"code": ENUM_WALLET_CODE.SUPERVISION,
				"balance": 10000,
				"isUsed": false
			}
		],
		"deltaBonus": -2,
		"fixedWage": 1.8,
		"nickname": "test01",
		"greeting": null,
		"qq": null,
		"wechat": null,
		"phone": null,
		"payer": "測試者",
		"bankCardIds": [1],
		"levelId": ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
		"createdBy": "admin",
		"statuses": STATUSES_DEFAULT_VALUE
	},
	{
		"id": 4,
		"accountId": "5d4aea86e48b697af60c1212",
		"username": "test0301",
		"type": ENUM_USER_TYPE.MEMBER,
		"parentId": 3,
		"parentUsername": "test01",
		"ancestorUsernames": [
			"test01",
			"zhaoshang01",
			"root"
		],
		"wallets": [
			{
				"name": "彩票钱包",
				"type": ENUM_WALLET_TYPE.CURRENCY,
				"code": ENUM_WALLET_CODE.PRIMARY,
				"balance": 1000000,
				"isUsed": true
			},
			{
				"name": "监管钱包",
				"type": ENUM_WALLET_TYPE.CURRENCY,
				"code": ENUM_WALLET_CODE.SUPERVISION,
				"balance": 0,
				"isUsed": false
			}
		],
		"deltaBonus": -4,
		"fixedWage": 1.6,
		"nickname": "test0301",
		"greeting": null,
		"qq": null,
		"wechat": null,
		"phone": null,
		"payer": null,
		"bankCardIds": [],
		"levelId": ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
		"createdBy": "admin",
		"statuses": STATUSES_DEFAULT_VALUE
	}
];
