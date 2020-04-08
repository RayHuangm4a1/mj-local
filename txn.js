const logger = require("ljit-logger")("debug");
const { product } = require("./env");
const config = require("./config");
global.CONFIG = config.getServer(product);

const { mysqlURL } = global.CONFIG;

require("ljit-db/sequelize").connect(mysqlURL);

const TransactionLogModel = require("./server/models/transaction-log");

function drop() {
	return TransactionLogModel.getInstance().sync({ force: true });
}

const {
	ENUM_TRANSACTION_TYPE: {
		DIVIDEND_TRANSFER_OUT, // 13 系統定期從監管錢包轉出到彩票錢包
		DIVIDEND_TRANSFER_IN, // 14 彩票錢包收到系統定期從監管轉過來的錢
		DIVIDEND_GRANTED_FROM_SUPERVISION, // 15 上級從監管錢包發放分紅給下級
		DIVIDEND_GRANTED_FROM_PRIMARY, // 16 上級從彩票錢包發放分紅給下級
		DIVIDEND_RECEIVED, // 17 平台月初發分紅到招商的監管錢包、下級收到上級發的分紅
	},
	ENUM_WALLET_CODE: {
		PRIMARY, SUPERVISION,
	},
	ENUM_TRANSACTION_STATUS: {
		DONE,
	}
} = require("./server/lib/enum");

/*
	彩票錢包金額的異動紀錄稱之為帳變明細
	監管錢包(分紅錢包)金額的異動紀錄稱之為分紅帳變
*/

const fixturedTransactionLogs = [
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_OUT, // 13
		walletCode: SUPERVISION,
		amount: -10000,
		balance: 0,
		description: `转入彩票钱包`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_IN, // 14
		walletCode: PRIMARY,
		amount: 10000,
		balance: 20000,
		description: `分红钱包转入`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_SUPERVISION, // 15
		walletCode: SUPERVISION,
		amount: -200,
		balance: 9800,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_PRIMARY, // 16
		walletCode: PRIMARY,
		amount: -300,
		balance: 9700,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 25000,
		balance: 25000,
		description: `招商分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 200,
		balance: 5000,
		description: `收到上级发放的分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_OUT, // 13
		walletCode: SUPERVISION,
		amount: -10000,
		balance: 0,
		description: `转入彩票钱包`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_IN, // 14
		walletCode: PRIMARY,
		amount: 10000,
		balance: 20000,
		description: `分红钱包转入`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_SUPERVISION, // 15
		walletCode: SUPERVISION,
		amount: -200,
		balance: 9800,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_PRIMARY, // 16
		walletCode: PRIMARY,
		amount: -300,
		balance: 9700,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 25000,
		balance: 25000,
		description: `招商分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 200,
		balance: 5000,
		description: `收到上级发放的分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_OUT, // 13
		walletCode: SUPERVISION,
		amount: -10000,
		balance: 0,
		description: `转入彩票钱包`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_IN, // 14
		walletCode: PRIMARY,
		amount: 10000,
		balance: 20000,
		description: `分红钱包转入`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_SUPERVISION, // 15
		walletCode: SUPERVISION,
		amount: -200,
		balance: 9800,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_PRIMARY, // 16
		walletCode: PRIMARY,
		amount: -300,
		balance: 9700,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 25000,
		balance: 25000,
		description: `招商分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 200,
		balance: 5000,
		description: `收到上级发放的分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_OUT, // 13
		walletCode: SUPERVISION,
		amount: -10000,
		balance: 0,
		description: `转入彩票钱包`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_IN, // 14
		walletCode: PRIMARY,
		amount: 10000,
		balance: 20000,
		description: `分红钱包转入`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_SUPERVISION, // 15
		walletCode: SUPERVISION,
		amount: -200,
		balance: 9800,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_PRIMARY, // 16
		walletCode: PRIMARY,
		amount: -300,
		balance: 9700,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 25000,
		balance: 25000,
		description: `招商分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 200,
		balance: 5000,
		description: `收到上级发放的分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_OUT, // 13
		walletCode: SUPERVISION,
		amount: -10000,
		balance: 0,
		description: `转入彩票钱包`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_TRANSFER_IN, // 14
		walletCode: PRIMARY,
		amount: 10000,
		balance: 20000,
		description: `分红钱包转入`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_SUPERVISION, // 15
		walletCode: SUPERVISION,
		amount: -200,
		balance: 9800,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 彩票錢包金額異動 -> 帳變明細
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_GRANTED_FROM_PRIMARY, // 16
		walletCode: PRIMARY,
		amount: -300,
		balance: 9700,
		description: `给直属下级[test0301]发放分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 25000,
		balance: 25000,
		description: `招商分红`,
		status: DONE,
	},
	{
		// 監管錢包金額異動 -> 分紅帳變
		userId: 12,
		username: "test01",
		associateId: -1,
		type: DIVIDEND_RECEIVED, // 17
		walletCode: SUPERVISION,
		amount: 200,
		balance: 5000,
		description: `收到上级发放的分红`,
		status: DONE,
	}
];

async function bulkCreateTransactionLogs() {
	// 需要清除 transaction logs table 的資料時，就把下面那一行的註解取消
	// await drop();
	await TransactionLogModel.insertMany(fixturedTransactionLogs);

	logger.info("[mysql][transaction-logs] fixture done");

	process.exit();
}

bulkCreateTransactionLogs();