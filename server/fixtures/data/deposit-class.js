const {
	ENUM_DEPOSIT_CLASS_STATUS,
} = require("../../lib/enum");

module.exports = [
	{
		"id": 1,
		"name": "网银转帐",
		"ordering": 1,
		"status": ENUM_DEPOSIT_CLASS_STATUS.ACTIVE,
	},
];
