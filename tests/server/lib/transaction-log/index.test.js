const TransactionLogger = require("../../../../server/lib/transaction-log");
const {
	ENUM_TRANSACTION_TYPE,
	ENUM_TRANSACTION_STATUS,
	ENUM_WALLET_TYPE,
	ENUM_WALLET_CODE,
} = require("../../../../server/lib/enum");
const WALLET = {
	"id": 26,
	"userId": 4,
	"name": "彩票钱包",
	"type": ENUM_WALLET_TYPE.CURRENCY,
	"code": ENUM_WALLET_CODE.PRIMARY,
	"balance": 100,
	"isUsed": 1
};
const BETTINGS = [
	{
		"opencode": "",
		"reward": 0,
		"details": [],
		"id": 1,
		"userId": 3,
		"username": "test01",
		"walletCode": ENUM_WALLET_CODE.PRIMARY,
		"type": 1,
		"traceId": 0,
		"lotteryClassId": 0,
		"lotteryId": 16,
		"lotteryName": "腾讯分分彩",
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
		"issue": 202001010001,
		"amountPerBet": 1,
		"multiple": 1,
		"count": 1,
		"amount": 1,
		"betcontent": "1,2,3,4,5",
		"weizhi": "",
		"isPK": false,
		"status": "new",
		"device": null,
		"oid": 0,
		"createdAt": "2019-08-21T02:11:58.310Z",
		"updatedAt": "2019-08-21T02:11:58.310Z"
	},
	{
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
		"lotteryId": 16,
		"lotteryName": "腾讯分分彩",
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
		"issue": 202001010001,
		"amountPerBet": 1,
		"multiple": 1,
		"count": 1,
		"amount": 2,
		"betcontent": "1,2,3,4,5",
		"weizhi": "",
		"isPK": false,
		"status": "new",
		"device": null,
		"oid": 0,
		"createdAt": "2019-08-21T02:11:58.310Z",
		"updatedAt": "2019-08-21T02:11:58.310Z"
	},
];
const TRACE_BETTINGS = [
	{
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
		"lotteryId": 16,
		"lotteryName": "腾讯分分彩",
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
		"issue": 202001010001,
		"amountPerBet": 1,
		"multiple": 1,
		"count": 1,
		"amount": 1,
		"betcontent": "1,2,3,4,5",
		"weizhi": "",
		"isPK": false,
		"status": "new",
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
		"lotteryId": 16,
		"lotteryName": "腾讯分分彩",
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
		"issue": 202001010001,
		"amountPerBet": 1,
		"multiple": 1,
		"count": 1,
		"amount": 2,
		"betcontent": "1,2,3,4,5",
		"weizhi": "",
		"isPK": false,
		"status": "new",
		"device": null,
		"oid": 0,
		"createdAt": "2019-08-21T02:11:58.310Z",
		"updatedAt": "2019-08-21T02:11:58.310Z"
	}
];
const ONE_OPENED_BETTING_RESULTS = [
	{
		userId: 12,
		walletCode: ENUM_WALLET_CODE.PRIMARY,
		bettings: [
			{
				id: 2,
				userId: 12,
				username: "test01",
				opencode: "9,4,3,2,6",
				reward: 1,
				status: "win",
				details: [
					{ "name": "五等奖", "count": 1 }
				],
				amount: 1,
				bonus: 1936,
				bettingRebateAmount: 2,
				fixedWageAmount: 3,
			}
		]
	}
];
const MULTIPLE_OPENED_BETTING_RESULTS = [
	{
		userId: 12,
		walletCode: ENUM_WALLET_CODE.PRIMARY,
		bettings: [
			{
				id: 2,
				userId: 12,
				username: "test01",
				opencode: "9,4,3,2,6",
				reward: 1,
				status: "win",
				details: [
					{ "name": "五等奖", "count": 1 }
				],
				amount: 1,
				bonus: 1936,
				bettingRebateAmount: 2,
				fixedWageAmount: 3,
			},
			{
				id: 3,
				userId: 12,
				username: "test01",
				opencode: "9,4,3,2,6",
				reward: 2,
				status: "win",
				details: [
					{ "name": "五等奖", "count": 1 }
				],
				amount: 1,
				bonus: 1936,
				bettingRebateAmount: 3,
				fixedWageAmount: 4,
			}
		]
	}
];
const MULTIPLE_COMMISSIONS = [
	{
		ancestorId: 11,
		rebates: [
			{
				ancestorId: 11,
				ancestorUsername: "test000",
				descendantId: 12,
				descendantUsername: "test01",
				bettingId: 1,
				amount: 1
			},
			{
				ancestorId: 11,
				ancestorUsername: "test000",
				descendantId: 13,
				descendantUsername: "test0301",
				bettingId: 2,
				amount: 2
			}
		],
		fixedWages: [
			{
				ancestorId: 11,
				ancestorUsername: "test000",
				descendantId: 12,
				descendantUsername: "test01",
				bettingId: 1,
				amount: 3
			},
			{
				ancestorId: 11,
				ancestorUsername: "test000",
				descendantId: 12,
				descendantUsername: "test0301",
				bettingId: 2,
				amount: 4
			}
		]
	}
];
const PENDING_TRANSACTION_LOGS = [
	{
		id: 1,
		userId: 12,
		username: "test01",
		associateId: 4,
		type: ENUM_TRANSACTION_TYPE.TEAM_REBATE,
		walletCode: ENUM_WALLET_CODE.PRIMARY,
		amount: 1,
		balance: null,
		description: '从test0301返点',
		status: ENUM_TRANSACTION_STATUS.PENDING,
		createdAt: new Date("2019-11-08T00:32:51Z"),
	},
	{
		id: 2,
		userId: 12,
		username: "test01",
		associateId: 4,
		type: ENUM_TRANSACTION_TYPE.TEAM_FIXED_WAGE,
		walletCode: ENUM_WALLET_CODE.PRIMARY,
		amount: 2,
		balance: null,
		description: '从test0301返回工资',
		status: ENUM_TRANSACTION_STATUS.PENDING,
		createdAt: new Date("2019-11-08T00:32:51Z"),
	},
];

describe("generateBettingTransactionLogs", () => {
	afterEach(() =>  {
		jest.resetModules();
	});

	it("multi betting result OK", () => {
		const EXPECTED = [
			{
				userId: 3,
				username: "test01",
				associateId: 1,
				type: ENUM_TRANSACTION_TYPE.BETTING,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: -1,
				balance: 102,
				description: `投注金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 3,
				username: "test01",
				associateId: 2,
				type: ENUM_TRANSACTION_TYPE.BETTING,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: -2,
				balance: 100,
				description: `投注金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			}
		];

		const result = TransactionLogger.generateBettingTransactionLogs(WALLET, BETTINGS);

		expect(result).toMatchObject(EXPECTED);
	});
});
const DRAWING = {
	id: 1,
	lotteryId: 16,
	issue: 202001010001,
};

describe("generateTraceTransactionLogs", () => {
	afterEach(() =>  {
		jest.resetModules();
	});

	it("multi trace betting result OK", () => {
		const EXPECTED = [
			{
				userId: 3,
				username: "test01",
				associateId: 3,
				type: ENUM_TRANSACTION_TYPE.TRACE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: -1,
				balance: 102,
				description: `投注金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 3,
				username: "test01",
				associateId: 4,
				type: ENUM_TRANSACTION_TYPE.TRACE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: -2,
				balance: 100,
				description: `投注金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			}
		];


		const result = TransactionLogger.generateTraceTransactionLogs(WALLET, TRACE_BETTINGS);

		expect(result).toMatchObject(EXPECTED);
	});
});

describe("generateCanceledBettingTransactionLogs", () => {
	afterEach(() =>  {
		jest.resetModules();
	});

	it("multi cancled betting result OK", () => {
		const EXPECTED = [
			{
				userId: 3,
				username: "test01",
				associateId: 1,
				type: ENUM_TRANSACTION_TYPE.CANCEL_BETTING,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 1,
				balance: 98,
				description: `返回撤单金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 3,
				username: "test01",
				associateId: 2,
				type: ENUM_TRANSACTION_TYPE.CANCEL_BETTING,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 2,
				balance: 100,
				description: `返回撤单金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			}
		];


		const result = TransactionLogger.generateCanceledBettingTransactionLogs(WALLET, BETTINGS);

		expect(result).toMatchObject(EXPECTED);
	});
});

describe("generateBettingRewardGrantedTransactionLogs", () => {
	afterEach(() =>  {
		jest.resetModules();
	});

	it("one betting result OK", () => {
		const EXPECTED = [
			{
				userId: 12,
				username: "test01",
				associateId: 2,
				type: ENUM_TRANSACTION_TYPE.BETTING_REWARD,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 1,
				balance: 95,
				description: `返回中奖金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 12,
				username: "test01",
				associateId: 2,
				type: ENUM_TRANSACTION_TYPE.BETTING_REBATE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 2,
				balance: 97,
				description: `自身返点`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 12,
				username: "test01",
				associateId: 2,
				type: ENUM_TRANSACTION_TYPE.SELF_FIXED_WAGE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 3,
				balance: 100,
				description: `返回自身工资`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			}
		];


		const result = TransactionLogger.generateBettingRewardGrantedTransactionLogs(WALLET, ONE_OPENED_BETTING_RESULTS[0].bettings);

		expect(result).toMatchObject(EXPECTED);
	});

	it("multi betting result OK", () => {
		const EXPECTED = [
			{
				userId: 12,
				username: "test01",
				associateId: 2,
				type: ENUM_TRANSACTION_TYPE.BETTING_REWARD,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 1,
				balance: 86,
				description: `返回中奖金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 12,
				username: "test01",
				associateId: 2,
				type: ENUM_TRANSACTION_TYPE.BETTING_REBATE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 2,
				balance: 88,
				description: `自身返点`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 12,
				username: "test01",
				associateId: 2,
				type: ENUM_TRANSACTION_TYPE.SELF_FIXED_WAGE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 3,
				balance: 91,
				description: `返回自身工资`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 12,
				username: "test01",
				associateId: 3,
				type: ENUM_TRANSACTION_TYPE.BETTING_REWARD,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 2,
				balance: 93,
				description: `返回中奖金额`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 12,
				username: "test01",
				associateId: 3,
				type: ENUM_TRANSACTION_TYPE.BETTING_REBATE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 3,
				balance: 96,
				description: `自身返点`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			},
			{
				userId: 12,
				username: "test01",
				associateId: 3,
				type: ENUM_TRANSACTION_TYPE.SELF_FIXED_WAGE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 4,
				balance: 100,
				description: `返回自身工资`,
				status: ENUM_TRANSACTION_STATUS.DONE,
			}
		];

		const result = TransactionLogger.generateBettingRewardGrantedTransactionLogs(WALLET, MULTIPLE_OPENED_BETTING_RESULTS[0].bettings);

		expect(result).toMatchObject(EXPECTED);
	});
});

describe("generateTeamRebateGrantingTransactionLogs", () => {
	afterEach(() =>  {
		jest.resetModules();
	});

	it("multiple team rebates result OK", () => {
		const EXPECTED = [
			{
				userId: 11,
				username: "test000",
				associateId: 1,
				lotteryId: 16,
				issue: 202001010001,
				type: ENUM_TRANSACTION_TYPE.TEAM_REBATE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 1,
				balance: null,
				description: `从test01返点`,
				status: ENUM_TRANSACTION_STATUS.PENDING,
			},
			{
				userId: 11,
				username: "test000",
				associateId: 2,
				lotteryId: 16,
				issue: 202001010001,
				type: ENUM_TRANSACTION_TYPE.TEAM_REBATE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 2,
				balance: null,
				description: `从test0301返点`,
				status: ENUM_TRANSACTION_STATUS.PENDING,
			},
		];

		const result = TransactionLogger.generateTeamRebateGrantingTransactionLogs(WALLET, MULTIPLE_COMMISSIONS[0].rebates, DRAWING);

		expect(result).toMatchObject(EXPECTED);
	});
});

describe("generateTeamFixedWageGrantingTransactionLogs", () => {
	afterEach(() =>  {
		jest.resetModules();
	});

	it("multiple team fixed wages result OK", () => {
		const EXPECTED = [
			{
				userId: 11,
				username: "test000",
				associateId: 1,
				lotteryId: 16,
				issue: 202001010001,
				type: ENUM_TRANSACTION_TYPE.TEAM_FIXED_WAGE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 3,
				balance: null,
				description: `从test01返回工资`,
				status: ENUM_TRANSACTION_STATUS.PENDING,
			},
			{
				userId: 11,
				username: "test000",
				associateId: 2,
				lotteryId: 16,
				issue: 202001010001,
				type: ENUM_TRANSACTION_TYPE.TEAM_FIXED_WAGE,
				walletCode: ENUM_WALLET_CODE.PRIMARY,
				amount: 4,
				balance: null,
				description: `从test0301返回工资`,
				status: ENUM_TRANSACTION_STATUS.PENDING,
			},
		];

		const result = TransactionLogger.generateTeamFixedWageGrantingTransactionLogs(WALLET, MULTIPLE_COMMISSIONS[0].fixedWages, DRAWING);

		expect(result).toMatchObject(EXPECTED);
	});
});

describe("addBalanceToTeamCommissionGrantingTransactionLogs", () => {
	afterEach(() =>  {
		jest.resetModules();
	});

	it("add balance to pending team commission result OK", () => {
		const EXPECTED = [
			{
				id: 1,
				balance: 98,
				status: ENUM_TRANSACTION_STATUS.DONE,
				createdAt: new Date("2019-11-08T00:32:51Z"),
			},
			{
				id: 2,
				balance: 100,
				status: ENUM_TRANSACTION_STATUS.DONE,
				createdAt: new Date("2019-11-08T00:32:51Z"),
			},
		];

		const result = TransactionLogger.addBalanceToTeamCommissionGrantingTransactionLogs(WALLET, PENDING_TRANSACTION_LOGS);

		expect(result).toMatchObject(EXPECTED);
	});
});
