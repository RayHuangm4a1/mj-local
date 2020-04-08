const {
	ENUM_FINANCIAL_DEPARTMENT_ID,
	ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE,
	ENUM_BANK_ACCOUNT_STATUS,
	ENUM_FINANCIAL_LEVEL_ID,
} = require("../../lib/enum");
const [
	POSTAL_SAVING_BANK_OF_CHINA_BEIJING,
	INDUSTRIAL_AND_COMMERCIAL_BANK_OF_CHINA,
	AGRICULTURAL_BANK_OF_CHINA,
	BANK_OF_CHINA_LIMITED,
] = require("./bank");

module.exports = [
	{
		"name": "网银一号",
		"departmentId": ENUM_FINANCIAL_DEPARTMENT_ID.A,
		"bankId": POSTAL_SAVING_BANK_OF_CHINA_BEIJING.id,
		"bankName": POSTAL_SAVING_BANK_OF_CHINA_BEIJING.name,
		"depositClassId": 1,
		"number": "0129000100000123456",
		"levelIds": [
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_TWO,
		],
		"payee": "Test01",
		"branch": "上海支行",
		"displayNumber": "0129000100000123456",
		"receivedAmountType": ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE.RANGE,
		"minReceivedAmount": 20,
		"maxReceivedAmount": 2000,
		"balance": 0,
		"status": ENUM_BANK_ACCOUNT_STATUS.ACTIVE,
	},
	{
		"name": "网银二号",
		"departmentId": ENUM_FINANCIAL_DEPARTMENT_ID.B,
		"bankId": INDUSTRIAL_AND_COMMERCIAL_BANK_OF_CHINA.id,
		"bankName": INDUSTRIAL_AND_COMMERCIAL_BANK_OF_CHINA.name,
		"depositClassId": 1,
		"number": "0129000200000123456",
		"levelIds": [
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_TWO,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_THREE,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_FOUR,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_FIVE,
		],
		"payee": "Test02",
		"branch": "北京市分行",
		"displayNumber": "0129000200000123456",
		"receivedAmountType": ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE.RANGE,
		"minReceivedAmount": 20,
		"maxReceivedAmount": 2000,
		"balance": 0,
		"status": ENUM_BANK_ACCOUNT_STATUS.ACTIVE,
	},
	{
		"name": "网银三号",
		"departmentId": ENUM_FINANCIAL_DEPARTMENT_ID.C,
		"bankId": AGRICULTURAL_BANK_OF_CHINA.id,
		"bankName": AGRICULTURAL_BANK_OF_CHINA.name,
		"depositClassId": 1,
		"number": "0129000300000123456",
		"levelIds": [
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_FOUR,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_FIVE,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_SIX,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_SEVEN,

		],
		"payee": "Test03",
		"branch": "北京市分行",
		"displayNumber": "0129000300000123456",
		"receivedAmountType": ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE.WHITELIST,
		"fixedReceivedAmounts": [
			20, 50, 100, 500,
			1000, 2000, 3000,
		],
		"balance": 0,
		"status": ENUM_BANK_ACCOUNT_STATUS.ACTIVE,
	},
	{
		"name": "网银四号",
		"departmentId": ENUM_FINANCIAL_DEPARTMENT_ID.A,
		"bankId": BANK_OF_CHINA_LIMITED.id,
		"bankName": BANK_OF_CHINA_LIMITED.name,
		"depositClassId": 1,
		"number": "0129000400000123456",
		"levelIds": [
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_SEVEN,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_EIGHT,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_NINE,
			ENUM_FINANCIAL_LEVEL_ID.NORMAL_TEN,
		],
		"payee": "Test04",
		"branch": "北京市分行",
		"displayNumber": "0129000400000123456",
		"receivedAmountType": ENUM_BANK_ACCOUNT_RECEIVED_AMOUNT_TYPE.WHITELIST,
		"fixedReceivedAmounts": [
			20, 50, 100, 500,
			1000, 2000, 3000,
		],
		"balance": 0,
		"status": ENUM_BANK_ACCOUNT_STATUS.ACTIVE,
	},
];
