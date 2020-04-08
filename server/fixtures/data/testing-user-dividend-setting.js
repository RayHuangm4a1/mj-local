const {
	ENUM_DIVIDEND_TYPE,
} = require("../../lib/enum");

module.exports = [
	// 設定 test01 的分紅標準
	{
		"userId": 3,
		"type": ENUM_DIVIDEND_TYPE.SELF,
		"dividendSettings": [
			{ "amount": 300000, "ratio": 0 },
			{ "amount": 600000, "ratio": 8 },
			{ "amount": 900000, "ratio": 9 },
			{ "amount": 100000000, "ratio": 20 },
		],
	},
	// 設定 test0301 的分紅標準
	{
		"userId": 4,
		"type": ENUM_DIVIDEND_TYPE.SELF,
		"dividendSettings": [
			{ "amount": 300000, "ratio": 0 },
			{ "amount": 600000, "ratio": 5 },
			{ "amount": 1000000, "ratio": 10 },
			{ "amount": 100000000, "ratio": 20 },
		],
	},
	// 設定 test0302 的分紅標準
	{
		"userId": 5,
		"type": ENUM_DIVIDEND_TYPE.SELF,
		"dividendSettings": [
			{ "amount": 300000, "ratio": 0 },
			{ "amount": 600000, "ratio": 2 },
			{ "amount": 1000000, "ratio": 4 },
			{ "amount": 100000000, "ratio": 6 },
		],
	},
	// 設定 test0303 的分紅標準
	{
		"userId": 6,
		"type": ENUM_DIVIDEND_TYPE.SELF,
		"dividendSettings": [
			{ "amount": 300000, "ratio": 0 },
			{ "amount": 600000, "ratio": 2 },
			{ "amount": 1000000, "ratio": 4 },
			{ "amount": 100000000, "ratio": 6 },
		],
	},
	// 設定 test0304 的分紅標準
	{
		"userId": 7,
		"type": ENUM_DIVIDEND_TYPE.SELF,
		"dividendSettings": [
			{ "amount": 300000, "ratio": 0 },
			{ "amount": 600000, "ratio": 2 },
			{ "amount": 1000000, "ratio": 3 },
			{ "amount": 100000000, "ratio": 5 },
		],
	},
];
