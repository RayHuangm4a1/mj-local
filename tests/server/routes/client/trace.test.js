const request = require("supertest");
const { cloneDeep } = require("lodash");
const {
	LOTTERY_ID,
	INVALID_LOTTERY_ID,
	PLATFORM,
	USER_PROFILE,
	PLAYS,
	PLAYS_LOTTERYCLASS_STATUS_OFFLINE,
	PLAYS_LOTTERY_STATUS_OFFLINE,
	PLAYS_STATUS_OFFLINE,
	WALLET,
	INTERNAL_SERVER_ERROR_MSG,
	TRACE_BETTINGS,
	CANCEL_TRACE_ID,
} = require("../__mocks__/betting");
const {
	FUTURE_DRAWINGS,
	TRACES,
	FIRST_ELEMENT_PLAY_NOT_EXIST_TRACES,
} = require("../__mocks__/trace");
const {
	attachUserMethods,
} = require("../utils");
const {
	ENUM_WALLET_CODE,
	ENUM_USER_TYPE,
} = require("../../../../server/lib/enum");
const {
	BETTING_NOT_CANCELABLE,
} = require("../../../../server/lib/error/code");
const {
	ForbiddenError,
} = require("ljit-error");

jest.mock("ljit-db/model");
jest.mock("../../../../server/session");
jest.mock("../../../../server/services/platform");
jest.mock("../../../../server/services/lottery");
jest.mock("../../../../server/services/lottery");
jest.mock("../../../../server/services/betting");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/models/user", () => { return {}; });
jest.mock("../../../../server/models/bank-account-level", () => { return {}; });
jest.mock("../../../../server/models/user-bank-card", () => { return {}; });
jest.mock("../../../../server/models/transaction-log", () => { return {}; });
jest.mock("../../../../server/models/deposit-application-form", () => { return {}; });
jest.mock("../../../../server/models/withdrawal-application-form", () => { return {}; });
jest.mock("../../../../server/models/user-daily-stats", () => { return {}; });
jest.mock("../../../../server/models/team-stats", () => { return {}; });
jest.mock("../../../../server/models/staff", () => { return {}; });
jest.mock("../../../../server/models/role", () => { return {}; });
jest.mock("../../../../server/models/trace", () => { return {}; });

global.PRODUCT = require("../../../../env").product;
global.CONFIG = require("../../../../config").getServer(global.PRODUCT);
global.LOGGER = require("ljit-logger")("critical");
require("babel-polyfill");
require("ljit-error").initialize();

const USER = {
	accountId: "5d4aea86e48b697af60c1201",
	id: 1,
	username: "admin",
	isBetCredentialsAuthenticated: true,
};

describe("POST /v1/lotteries/id=:lotteryId/traces, validateTraceRequest", () => {
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("422 Invalid lotteryId (invalid format)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["lotteryId"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${INVALID_LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid walletCode (invalid format)", (done) => {
		const body = {
			walletCode: "aaaaaa",
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["walletCode"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid data (data is undefined)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
		};
		const expect = {
			"type": 'RequestValidationError',
			"message": '输入格式错误',
			"code": '888.007.422',
			"fields": ['data', 'data']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid data (data is an empty array)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [],
		};
		const expect = {
			"type": 'RequestValidationError',
			"message": '输入格式错误',
			"code": '888.007.422',
			"fields": ['data']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid data (data is not an array)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: {},
		};
		const expect = {
			"type": 'RequestValidationError',
			"message": '输入格式错误',
			"code": '888.007.422',
			"fields": ['data']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid data (data contains an empty object)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{}],
		};
		const expect = {
			"type": 'RequestValidationError',
			"message": '输入格式错误',
			"code": '888.007.422',
			"fields": [
				'data[0].playId',
				'data[0].betcontent',
				'data[0].betcontent',
				'data[0].weizhi',
				'data[0].rebate',
				'data[0].rebate',
				'data[0].amountPerBet',
				'data[0].multiples',
				'data[0].multiples',
				'data[0].isTerminatedIfWin',
			]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid playId (play is undefined)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": 'RequestValidationError',
			"message": '输入格式错误',
			"code": '888.007.422',
			"fields": ['data[0].playId']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid playId (playId is undefined)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"play": {},
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": 'RequestValidationError',
			"message": '输入格式错误',
			"code": '888.007.422',
			"fields": ['data[0].playId']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid playId (invalid format)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"play": {
					"_id": "0"
				},
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": 'RequestValidationError',
			"message": '输入格式错误',
			"code": '888.007.422',
			"fields": ['data[0].playId']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid betcontent (betcontent is undefined)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"weizhi": "",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].betcontent', 'data[0].betcontent']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid betcontent (betcontent is empty)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "",
				"weizhi": "",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].betcontent']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid betcontent (betcontent is not a string)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": 12345,
				"weizhi": "",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].betcontent']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid weizhi (weizhi is undefined)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].weizhi']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid weizhi (weizhi is not a string)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"weizhi": 0,
				"betcontent": "1,2,3,4,5",
				"multiples": [1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].weizhi']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid rebate (rebate is undefined)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 1],
				"amountPerBet": 1,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].rebate', 'data[0].rebate']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid rebate (rebate is less than 0)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 1],
				"amountPerBet": 1,
				"rebate": -1,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].rebate']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid rebate (rebate is greater than 100)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 1],
				"amountPerBet": 1,
				"rebate": 100.1,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].rebate']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid rebate (invalid precision)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 1],
				"amountPerBet": 1,
				"rebate": 1.23,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].rebate']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid amountPerBet (less than 0.001)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": -1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].amountPerBet']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid amountPerBet (greater than 999)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1000,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].amountPerBet']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid amountPerBet (invalid precision)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1.2345,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].amountPerBet']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid multiples (multiples is undefined)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].multiples', 'data[0].multiples']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid multiples (multiples is empty)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].multiples']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid multiples (multiples is not an array)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": 1,
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].multiples']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid multiple (less than 1)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 0],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].multiples[1]']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid multiple (greater than 999999)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1000000, 1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].multiples[0]']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid isTerminatedIfWin (undefined)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 1],
				"amountPerBet": 1,
				"rebate": 0,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].isTerminatedIfWin']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Invalid isTerminatedIfWin (not boolean type)", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 1],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": 123,
			}]
		};
		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ['data[0].isTerminatedIfWin']
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
});
describe("POST /v1/lotteries/id=:lotteryId/traces, preparePlatform", () => {
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("500 Internal Server Error, getPlatform error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});
describe("POST /v1/lotteries/id=:lotteryId/traces, prepareActiveUserProfile", () => {
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("500 Internal Server Error, getUserById error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});
describe("POST /v1/lotteries/id=:lotteryId/traces validateIsUserBetable", () => {
	let app;
	let userProfile;

	const body = {
		walletCode: ENUM_WALLET_CODE.PRIMARY,
		data: [{
			"playId": 2,
			"betcontent": "12345",
			"weizhi": "",
			"multiples": [1, 2, 4],
			"amountPerBet": 2,
			"rebate": 0,
			"isTerminatedIfWin": true
		}, {
			"playId": 2,
			"betcontent": "12345",
			"weizhi": "",
			"multiples": [1, 2],
			"amountPerBet": 4,
			"rebate": 0,
			"isTerminatedIfWin": true
		}],
	};

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(USER_PROFILE));

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/betting").createTracesAndBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.resolve({
				wallet: WALLET,
				traces: TRACES,
			});
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /v1/lotteries/id=:lotteryId/traces validateIsUserBetable, 201s 用戶投注未被禁止", (done) => {
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			userProfile.statuses.isBetable = true;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(201, done);
	});

	it("POST /v1/lotteries/id=:lotteryId/traces validateIsUserBetable fails, 403 用戶投注被禁止", (done) => {
		const expect = {
			"type":"ForbiddenError",
			"message":"用户投注被禁止",
			"code":"888.007.412"
		};

		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			userProfile.statuses.isBetable = false;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expect, done);
	});

	it("POST /v1/lotteries/id=:lotteryId/traces validateIsUserBetable fails, 403 用戶投注被禁止", (done) => {
		const expect = {
			"type":"ForbiddenError",
			"message":"招商禁止投注",
			"code":"888.007.411"
		};

		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			userProfile.type = ENUM_USER_TYPE.ZHAOSHANG;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expect, done);
	});
});
describe("POST /v1/lotteries/id=:lotteryId/traces, prepareTracesAndBettings", () => {
	let app;

	let userProfile;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		userProfile = attachUserMethods({ ...USER_PROFILE });

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("500 Internal Server Error, getPrimaryPlaysByLotteryIdAndIds error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
	it("500 Internal Server Error, getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
	it("422, exceeded max issues per trace", (done) => {
		const multiples = [];

		for (let i = 0; i < PLATFORM.bettingPolicy.maxIssuesPerTrace + 1; i++) {
			multiples.push(1);
		}

		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				multiples,
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			type: 'RequestValidationError',
			message: '追号期数超过最大限制100',
			code: '888.007.430',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, play is undefined", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 12345678,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		const expect = {
			type: 'RequestValidationError',
			message: '玩法不存在',
			code: '888.007.404',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, lotteryClass status is not equal to online", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		const expect = {
			type: "RequestValidationError",
			message: "该彩种类别关闭",
			code: "888.007.403",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS_LOTTERYCLASS_STATUS_OFFLINE);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, lottery status is not equal to online", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		const expect = {
			type: "RequestValidationError",
			message: "该彩票关闭",
			code: "888.007.405",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS_LOTTERY_STATUS_OFFLINE);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, play status is not equal to online", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		const expect = {
				type: 'RequestValidationError',
				message: '该玩法关闭',
				code: '888.007.406',
				fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS_STATUS_OFFLINE);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, invalid betcontent format", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};

		const expect = {
			type: 'RequestValidationError',
			message: '号码格式错误',
			code: '888.007.423',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, invalid weizhi", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "abcde",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			type: 'RequestValidationError',
			message: '位置格式错误',
			code: '888.007.424',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, invalid rebate", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 50,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			type: 'RequestValidationError',
			message: '超过返点最大限制',
			code: '888.007.425',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, invalid count", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "斗牛",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 10,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			type: 'RequestValidationError',
			message: '号码格式错误',
			code: '888.007.423',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422, one of the amount of issue is invalid", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 0.01,
				"rebate": 10,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			type: 'RequestValidationError',
			message: '追号每期注单金额不能低于0.2元',
			code: '888.007.427',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
});
describe("POST /v1/lotteries/id=:lotteryId/traces, validatePlatformTracePolicy", () => {
	let app;

	let userProfile;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});
		
		userProfile = attachUserMethods({ ...USER_PROFILE });

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("422 Unprocessable Entity, exceeded max orders per request", (done) => {
		const data = [];

		for (let i = 0; i < PLATFORM.bettingPolicy.maxOrdersPerRequest + 1; i++) {
			data.push({
				"playId": 2,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 1,
				"rebate": 0,
				"isTerminatedIfWin": true,
			});
		}

		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data
		};
		const expect = {
			type: 'RequestValidationError',
			message: '追号注单数超过最大限制200',
			code: '888.007.429',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("422 Unprocessable Entity, exceeded max amount of total trace per request", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 2,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [10000, 2],
				"amountPerBet": 90,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}]
		};
		const expect = {
			type: 'RequestValidationError',
			message: '当前追号方案总投注额大于200000，请您降低收益率或者减少追号期数',
			code: '888.007.428',
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
});

describe("POST /v1/lotteries/id=:lotteryId/traces, handleCreateTracesRequest", () => {
	let app;

	let userProfile;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		userProfile = attachUserMethods({ ...USER_PROFILE });

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("201 Created", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 2,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [1, 2, 4],
				"amountPerBet": 2,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}, {
				"playId": 2,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 4,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}],
		};
		const expect = {
			wallet: WALLET,
			results: TRACES,
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/betting").createTracesAndBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.resolve({
				wallet: WALLET,
				traces: TRACES,
			});
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(201, expect, done);
	});
	it("207 Multi-Status", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 12345678,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [1, 2, 4],
				"amountPerBet": 2,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}, {
				"playId": 2,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 4,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}],
		};
		const expect = {
			wallet: WALLET,
			results: FIRST_ELEMENT_PLAY_NOT_EXIST_TRACES,
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/betting").createTracesAndBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.resolve({
				wallet: WALLET,
				traces: [FIRST_ELEMENT_PLAY_NOT_EXIST_TRACES[1]],
			});
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(207, expect, done);
	});

	it("500 Internal Server Error, createTracesAndBettingsByUserIdAndWalletCode error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 2,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [1, 2, 4],
				"amountPerBet": 2,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}, {
				"playId": 2,
				"betcontent": "12345",
				"weizhi": "",
				"multiples": [1, 2],
				"amountPerBet": 4,
				"rebate": 0,
				"isTerminatedIfWin": true,
			}],
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve(FUTURE_DRAWINGS);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/betting").createTracesAndBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/traces`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});

describe("DELETE /v1/traces/id=:traceId/bettings", () => {
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("DELETE /v1/traces/id=:traceId/bettings 200 OK", (done) => {
		const body = [3];
		const betting = TRACE_BETTINGS[0];

		require("../../../../server/services/betting").cancelBettingsByTraceIdBettingIdsAndUserId.mockImplementation(() => {
			return Promise.resolve({
				wallet: WALLET,
				bettings: [betting],
			});
		});

		const expected = {
			wallet: WALLET,
			results: [betting],
		};

		request(app)
			.delete(`/api/v1/traces/id=${CANCEL_TRACE_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(200, expected, done);
	});

	it("DELETE /v1/traces/id=:traceId/bettings 200 OK", (done) => {
		const body = [3, 4];
		const bettings = TRACE_BETTINGS;

		require("../../../../server/services/betting").cancelBettingsByTraceIdBettingIdsAndUserId.mockImplementation(() => {
			return Promise.resolve({
				wallet: WALLET,
				bettings
			});
		});

		const expected = {
			wallet: WALLET,
			results: bettings,
		};

		request(app)
			.delete(`/api/v1/traces/id=${CANCEL_TRACE_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(200, expected, done);
	});

	it("DELETE /v1/traces/id=:traceId/bettings 207 Multi-Status", (done) => {
		const body = [3, 4];
		const exception = {
			"type": "ForbiddenError",
			"message": "已封盘, 注单无法撤销",
			"code": "888.007.408"
		};

		require("../../../../server/services/betting").cancelBettingsByTraceIdBettingIdsAndUserId.mockImplementation(() => {
			return Promise.resolve({
				wallet: WALLET,
				bettings: [TRACE_BETTINGS[1]],
			});
		});

		const expected = {
			wallet: WALLET,
			results: [exception, TRACE_BETTINGS[1]],
		};

		request(app)
			.delete(`/api/v1/traces/id=${CANCEL_TRACE_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(207, expected, done);
	});

	it("DELETE /v1/traces/id=:traceId/bettings 403 forbidden", (done) => {
		const body = [3, 4];
		const expected = {
			"type": "ForbiddenError",
			"message": "已封盘, 注单无法撤销",
			"code": "888.007.408"
		};

		require("../../../../server/services/betting").cancelBettingsByTraceIdBettingIdsAndUserId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				BETTING_NOT_CANCELABLE.MESSAGE,
				BETTING_NOT_CANCELABLE.CODE
			));
		});

		request(app)
			.delete(`/api/v1/traces/id=${CANCEL_TRACE_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expected, done);
	});

	it("DELETE /v1/traces/id=:traceId/bettings 500 internal server error", (done) => {
		const body = [3, 4];

		require("../../../../server/services/betting").cancelBettingsByTraceIdBettingIdsAndUserId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.delete(`/api/v1/traces/id=${CANCEL_TRACE_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});
