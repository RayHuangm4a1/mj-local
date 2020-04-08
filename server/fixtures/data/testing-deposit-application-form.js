const {
	ENUM_DEPOSIT_APPLICATION_FORM_STATUS,
	ENUM_FINANCIAL_DEPARTMENT_ID,
	ENUM_WALLET_CODE,
} = require("../../lib/enum");
const {
	getDateAfterNHours,
} = require("../../lib/date");

module.exports = [
	// test01 正常的充值申請單
	{
		"id": 1,
		"userId": 3,
		"username": "test01",
		"userLevelId": 1,
		"departmentId": 1,
		"depositClassId": 1,
		"walletCode": 100,
		"bankId": 1000000,
		"bankName": "邮政储汇",
		"bankAccountId": 1,
		"bankAccountNumber": "0129000100000123456",
		"amount": 99.01,
		"payer": "測試者",
		"status": ENUM_DEPOSIT_APPLICATION_FORM_STATUS.NEW,
		"expiredAt": getDateAfterNHours(2),
		"depositAmountId": 1,
	},
	/*
		殘留充值單，金額相符，但銀行卡名稱不相符
		銀行打進來的資訊，至少會知道是哪個 bankAccountNumber
		用此 bankAccountNumber 去 bank-account table 就可取得
		bankAccountId, departmentId, bankId, bankName 這些資料
	*/
	{
		"id": 2,
		"userId": -1,
		"username": "",
		"userLevelId": -1,
		"departmentId": ENUM_FINANCIAL_DEPARTMENT_ID.A,
		"depositClassId": 1,
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"bankId": 1000000,
		"bankName": "邮政储汇",
		"bankAccountId": 1,
		"bankCardId": -1,
		"bankAccountNumber": "0129000100000123456",
		"amount": 99.01,
		"payer": "張三",
		"payerAccountNumber": "6210956825923317322",
		"depositAmountId": -1,
		"status": ENUM_DEPOSIT_APPLICATION_FORM_STATUS.INCONSISTENT,
		"expiredAt": new Date("9999-12-31"),
	},
	// test0301 正常的充值申請單
	{
		"id": 3,
		"userId": 4,
		"username": "test0301",
		"userLevelId": 1,
		"departmentId": 1,
		"depositClassId": 1,
		"walletCode": 100,
		"bankId": 1000000,
		"bankName": "邮政储汇",
		"bankAccountId": 1,
		"bankAccountNumber": "0129000100000123456",
		"amount": 49.01,
		"payer": "測試者B",
		"status": ENUM_DEPOSIT_APPLICATION_FORM_STATUS.NEW,
		"expiredAt": getDateAfterNHours(2),
		"depositAmountId": 2,
	},
	// 殘留充值單，金額不相符，銀行卡名稱也不相符
	{
		"id": 4,
		"userId": -1,
		"username": "",
		"userLevelId": -1,
		"departmentId": ENUM_FINANCIAL_DEPARTMENT_ID.A,
		"depositClassId": 1,
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"bankId": 1000000,
		"bankName": "邮政储汇",
		"bankAccountId": 1,
		"bankCardId": -1,
		"bankAccountNumber": "0129000100000123456",
		"amount": 50,
		"payer": "李四",
		"payerAccountNumber": "62258080179871010",
		"depositAmountId": -1,
		"status": ENUM_DEPOSIT_APPLICATION_FORM_STATUS.INCONSISTENT,
		"expiredAt": new Date("9999-12-31"),
	},
];
