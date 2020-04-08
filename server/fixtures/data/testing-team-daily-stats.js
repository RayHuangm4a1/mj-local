const {
	ENUM_WALLET_CODE,
} = require("../../lib/enum");
const [threeDurationsAgo, twoDurationsAgo, oneDurationAge, current] = require("./testing-dividend-duration");

module.exports = [
	// 前一週期的團隊統計
	// 達標, 虧 100000, 比例 20%
	{
		"userId": 4,
		"username": "test0301",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"date": oneDurationAge.closedAt,
		"bettingAmount": 2000000,
		"bettingReward": 1850000,
		"rebateAmount": 30000,
		"fixedWageAmount": 20000,
	},
	// 達標, 虧 50000, 比例 2%
	{
		"userId": 5,
		"username": "test0302",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"date": oneDurationAge.closedAt,
		"bettingAmount": 600000,
		"bettingReward": 500000,
		"rebateAmount": 30000,
		"fixedWageAmount": 20000,
	},
	// 未達標, 虧 9999, 比例 0%
	{
		"userId": 6,
		"username": "test0303",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"date": oneDurationAge.closedAt,
		"bettingAmount": 299999,
		"bettingReward": 240000,
		"rebateAmount": 30000,
		"fixedWageAmount": 20000,
	},
	// 達標, 賺 50000, 比例 2%
	{
		"userId": 7,
		"username": "test0304",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"date": oneDurationAge.closedAt,
		"bettingAmount": 600000,
		"bettingReward": 600000,
		"rebateAmount": 30000,
		"fixedWageAmount": 20000,
	},
	// 未設置
	{
		"userId": 8,
		"username": "test0305",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"date": oneDurationAge.closedAt,
		"bettingAmount": 400000,
		"bettingReward": 320000,
		"rebateAmount": 30000,
		"fixedWageAmount": 20000,
	},
	{
		"userId": 3,
		"username": "test01",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"date": oneDurationAge.closedAt,
		"bettingAmount": 3900000,
		"bettingReward": 3510000,
		"rebateAmount": 150000,
		"fixedWageAmount": 100000,
	},
	{
		"userId": 2,
		"username": "zhaoshang01",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"date": oneDurationAge.closedAt,
		"bettingAmount": 3900000,
		"bettingReward": 3510000,
		"rebateAmount": 150000,
		"fixedWageAmount": 100000,
	},
	{
		"userId": 1,
		"username": "root",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"date": oneDurationAge.closedAt,
		"bettingAmount": 3900000,
		"bettingReward": 3510000,
		"rebateAmount": 150000,
		"fixedWageAmount": 100000,
	},
];
