const {
	ENUM_DEPOSIT_AMOUNT_STATUS,
} = require("../../lib/enum");

module.exports = [
	// 給測試的充值單 id = 1 所使用的充值金額
	{
		"id": 1,
		"integer": 100,
		"fraction": 1,
		"status": ENUM_DEPOSIT_AMOUNT_STATUS.BUSY,
	},
	// 給測試的充值單 id = 3 所使用的充值金額
	{
		"id": 2,
		"integer": 50,
		"fraction": 1,
		"status": ENUM_DEPOSIT_AMOUNT_STATUS.BUSY,
	},
];
