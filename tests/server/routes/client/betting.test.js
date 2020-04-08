const request = require("supertest");
const { cloneDeep } = require("lodash");
const {
	LOTTERY_ID,
	INVALID_LOTTERY_ID,
	PLATFORM,
	USER_PROFILE,
	DRAWING,
	PLAYS,
	PLAYS_LOTTERYCLASS_STATUS_OFFLINE,
	PLAYS_LOTTERY_STATUS_OFFLINE,
	PLAYS_STATUS_OFFLINE,
	PLAYS_INVALID_LOTTERYCLASS_ID,
	PLAYS_DINWEDAN_ZUHE_DA_XIAO_DAN_SHUANG,
	BETTINGS,
	CANCEL_BETTING_ID,
	WALLET,
	INTERNAL_SERVER_ERROR_MSG,
	BET_PASSWORD,
} = require("../__mocks__/betting");
const {
	attachUserMethods,
} = require("../utils");
const {
	ForbiddenError,
	AuthenticationError,
} = require("ljit-error");
const {
	ACCOUNT_INVALID_PASSWORD_CREDENTIALS,
	ACCOUNT_UNBIND_PASSWORD_CREDENTIALS,
} = require("mj-service-sdks/error/code");
const {
	BETTING_INSUFFICIENT_BALANCE,
	BETTING_NOT_CANCELABLE,
	BETTING_NOT_FOUND,
	WALLET_NOT_FOUND,
} = require("../../../../server/lib/error/code");
const {
	ENUM_WALLET_CODE,
	ENUM_USER_TYPE,
} = require("../../../../server/lib/enum");

jest.mock("ljit-db/model");
jest.mock("../../../../server/session");
jest.mock("../../../../server/services/platform");
jest.mock("../../../../server/services/lottery");
jest.mock("../../../../server/services/betting");
jest.mock("../../../../server/services/wallet");
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
const NOT_VALIDATED_BET_PASSWORD_USER = {
	accountId: "5d4aea86e48b697af60c1201",
	id: 1,
	username: "admin",
	isBetCredentialsAuthenticated: false,
};

describe("/v1/lotteries/id=:lotteryId/bettings, validateBettingsRequest", () => {
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		app = require('../../../../server/client');
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid lotteryId", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["lotteryId"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${INVALID_LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid walletCode", (done) => {
		const body = {
			walletId: "aaaaa",
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["walletCode"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid walletCode", (done) => {
		const body = {
			walletCode: "",
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["walletCode"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, missing data in body", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data", "data"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, data type should be array", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: {}
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, data should not be empty", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: []
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, data contains empty object", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": [
				"data[0].playId",
				"data[0].betcontent",
				"data[0].betcontent",
				"data[0].weizhi",
				"data[0].rebate",
				"data[0].rebate",
				"data[0].multiple",
				"data[0].amountPerBet",
			]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, invalid play _id", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": "abc",
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].playId"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, betcontent should not be empty", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].betcontent"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, betcontent type should be string", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": {},
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].betcontent"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, weizhi type should be string", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": {},
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].weizhi"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, multiple min should be 1", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 0,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].multiple"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, multiple should be integer", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1.1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].multiple"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, multiple max should be 999999", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1000000,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].multiple"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, amountPerBet precision should be 3", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 0.0001,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].amountPerBet"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, amountPerBet min should be 0.001", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 0,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].amountPerBet"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, amountPerBet max should be 999", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1000,
				"rebate": 10.2
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].amountPerBet"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, rebate min should be 0", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": -1
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].rebate"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, rebate max should be 100", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 101
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].rebate"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, rebate precision should be 1", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 1.12
			}]
		};

		const expect = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.007.422",
			"fields": ["data[0].rebate"]
		};

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
});

describe("/v1/lotteries/id=:lotteryId/bettings, preparePlatform", () => {
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

	it("POST /v1/lotteries/id=:lotteryId/bettings 500 Internal Server Error, getPlatform error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});

describe("/v1/lotteries/id=:lotteryId/bettings, prepareActiveUserProfile", () => {
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

	it("POST /v1/lotteries/id=:lotteryId/bettings 500 Internal Server Error, getUserById error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});

describe("/v1/lotteries/id=:lotteryId/bettings, prepareBettingOrders", () => {
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

	it("POST /v1/lotteries/id=:lotteryId/bettings 422, play not exist", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": "11111111111111",
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			type: "RequestValidationError",
			message: "玩法不存在",
			code: "888.007.404",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422 play lotteryClass status should be online", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
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
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS_LOTTERYCLASS_STATUS_OFFLINE);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422, play lottery status should be online", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
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
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS_LOTTERY_STATUS_OFFLINE);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422, play status should be online", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			type: "RequestValidationError",
			message: "该玩法关闭",
			code: "888.007.406",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS_STATUS_OFFLINE);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422, invalid play lotteryClass id", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};
		const expect = {
			type: "RequestValidationError",
			message: "invalid classId(-1), lotteryId(16), playId(53376) mapping",
			code: "000.000.000",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS_INVALID_LOTTERYCLASS_ID);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422, betcontent should be validFormat", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "00000",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			type: "RequestValidationError",
			message: "号码格式错误",
			code: "888.007.423",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422, invalid weizhi", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "abcde",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		const expect = {
			type: "RequestValidationError",
			message: "位置格式错误",
			code: "888.007.424",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422, exceed rebate max", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 100
			}]
		};
		const expect = {
			type: "RequestValidationError",
			message: "超过返点最大限制",
			code: "888.007.425",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422, count should greater than or equal to 1", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": ",,,,",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};
		const expect = {
			type: "RequestValidationError",
			message: "号码格式错误",
			code: "888.007.423",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS_DINWEDAN_ZUHE_DA_XIAO_DAN_SHUANG);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 422, multiple * amountPerBet * count min should be 0.2", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 0.001,
				"rebate": 1
			}]
		};

		const expect = {
			type: "RequestValidationError",
			message: "注单金额不能低于0.2元",
			code: "888.007.426",
			fields: []
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 500 Internal Server Error, getPrimaryCurrentDrawingByLotteryId error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(USER_PROFILE);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 500 Internal Server Error, getPrimaryPlaysByLotteryIdAndIds error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});

describe("/v1/lotteries/id=:lotteryId/bettings, validatePlatformBettingPolicy", () => {
	let app;

	let userProfile;

	beforeEach(() => {
		require("../../../../server/session").mockImplementationOnce(() => {
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

	it(`POST /v1/lotteries/id=:lotteryId/bettings 422 Invalid data, data max length should be ${PLATFORM.maxOrdersPerRequest}`, (done) => {
		const data = [];

		for (let i = 0; i < PLATFORM.bettingPolicy.maxOrdersPerRequest + 1; i++) {
			data.push({
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
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
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(422, expect, done);
	});
});

describe("/v1/lotteries/id=:lotteryId/bettings, handleBettingsRequest", () => {
	let app;

	let userProfile;

	beforeEach(() => {
		require("../../../../server/session").mockImplementationOnce(() => {
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

	it("POST /v1/lotteries/id=:lotteryId/bettings 201, valid orders", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};
		const expect = {
			wallet: WALLET,
			results: BETTINGS,
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});
		require("../../../../server/services/betting").createBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.resolve({ wallet: WALLET, bettings: BETTINGS });
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(201, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 207, multiple state", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}, {
				"playId": 123456789,
				"betcontent": "1,2,3,4,5",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};
		const expect = {
			wallet: WALLET,
			results: [
				BETTINGS[0],
				{
					type: "RequestValidationError",
					message: "玩法不存在",
					code: "888.007.404",
					fields: []
				}
			],
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});
		require("../../../../server/services/betting").createBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.resolve({ wallet: WALLET, bettings: [BETTINGS[0]] });
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(207, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 403 Forbidden, user insufficient balance or wallet not found", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};
		const expect = {
			type: 'ForbiddenError',
			message: '余额不足',
			code: '888.007.407'
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});
		require("../../../../server/services/betting").createBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				BETTING_INSUFFICIENT_BALANCE.MESSAGE,
				BETTING_INSUFFICIENT_BALANCE.CODE)
			);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 500 Internal Server Error, createBettingsByUserIdAndWalletCode error", (done) => {
		const body = {
			walletCode: ENUM_WALLET_CODE.PRIMARY,
			data: [{
				"playId": 53376,
				"betcontent": "无牛",
				"weizhi": "",
				"multiple": 1,
				"amountPerBet": 1,
				"rebate": 10.2
			}]
		};

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});
		require("../../../../server/services/betting").createBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});

describe("POST /v1/lotteries/id=:lotteryId/bettings validateIsUserBetable", () => {
	let app;
	let userProfile;

	const body = {
		walletCode: ENUM_WALLET_CODE.PRIMARY,
		data: [{
			"playId": 53376,
			"betcontent": "无牛",
			"weizhi": "",
			"multiple": 1,
			"amountPerBet": 1,
			"rebate": 10.2
		}, {
			"playId": 123456789,
			"betcontent": "1,2,3,4,5",
			"weizhi": "",
			"multiple": 1,
			"amountPerBet": 1,
			"rebate": 10.2
		}]
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
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
		require("../../../../server/services/lottery").isDrawingStoppedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});
		require("../../../../server/services/betting").createBettingsByUserIdAndWalletCode.mockImplementation(() => {
			return Promise.resolve({ wallet: WALLET, bettings: [BETTINGS[0]] });
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /v1/lotteries/id=:lotteryId/bettings validateIsUserBetable, 207 用戶投注未被禁止", (done) => {
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			userProfile.statuses.isBetable = true;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(207, done);
	});

	it("POST /v1/lotteries/id=:lotteryId/bettings validateIsUserBetable fails, 403 用戶投注被禁止", (done) => {
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
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expect, done);
	});

	it("POST /v1/lotteries/id=:lotteryId/bettings validateIsUserBetable fails, 403 招商投注被禁止", (done) => {
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
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expect, done);
	});
});

//TODO: 等 mock session 的 middleware 移除，再解開 skip
describe.skip("/v1/lotteries/id=:lotteryId/bettings, authenticate('betPassword')", () => {
	const ORDERS = [{
		"playId": 79,
		"betcontent": "1,2,3,4,5",
		"weizhi": "",
		"multiple": 1,
		"amountPerBet": 1,
		"rebate": 10.2
	}];
	const WALLET_ID = 1;

	beforeEach(() => {
		const userProfile = attachUserMethods({ ...USER_PROFILE });

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/lottery").getPrimaryCurrentDrawingByLotteryId.mockImplementation(() => {
			return Promise.resolve(DRAWING);
		});
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryIdAndIds.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /v1/lotteries/id=:lotteryId/bettings 207, 驗證投注密碼成功", (done) => {
		const body = {
			walletId: WALLET_ID,
			data: ORDERS,
			password: BET_PASSWORD,
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = cloneDeep(NOT_VALIDATED_BET_PASSWORD_USER);

				next();
			};
		});
		require("../../../../server/services/user").validateBetPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});

		const app = require("../../../../server/client");

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(207, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 401, 驗證投注密碼失敗，密碼錯誤", (done) => {
		const body = {
			walletId: WALLET_ID,
			data: ORDERS,
			password: "000000",
		};
		const expect = {
			"type": "AuthenticationError",
			"message": "帐密错误",
			"code": "002.002.402",
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = cloneDeep(NOT_VALIDATED_BET_PASSWORD_USER);

				next();
			};
		});
		require("../../../../server/services/user").validateBetPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(ACCOUNT_INVALID_PASSWORD_CREDENTIALS.MESSAGE, ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE));
		});

		const app = require("../../../../server/client");

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(401, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 403, 驗證投注密碼失敗，密码未绑定", (done) => {
		const body = {
			walletId: WALLET_ID,
			data: ORDERS,
			password: BET_PASSWORD,
		};
		const expect = {
			"type": "ForbiddenError",
			"message": "密码未绑定",
			"code": "002.002.403",
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = cloneDeep(NOT_VALIDATED_BET_PASSWORD_USER);

				next();
			};
		});
		require("../../../../server/services/user").validateBetPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.MESSAGE, ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.CODE));
		});

		const app = require("../../../../server/client");

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expect, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 207, 不帶投注密碼 之前已驗證過投注密碼", (done) => {
		const body = {
			walletId: WALLET_ID,
			data: ORDERS,
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		const app = require("../../../../server/client");

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(207, done);
	});
	it("POST /v1/lotteries/id=:lotteryId/bettings 500, 內部伺服器錯誤", (done) => {
		const body = {
			walletId: WALLET_ID,
			data: ORDERS,
			password: BET_PASSWORD,
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = cloneDeep(NOT_VALIDATED_BET_PASSWORD_USER);

				next();
			};
		});
		require("../../../../server/services/user").validateBetPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		const app = require("../../../../server/client");

		request(app)
			.post(`/api/v1/lotteries/id=${LOTTERY_ID}/bettings`)
			.send(body)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});

describe("DELETE /v1/bettings/id=:bettingId", () => {
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementationOnce(() => {
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

	it("DELETE /v1/bettings/id=:bettingId 200 OK", (done) => {
		require("../../../../server/services/betting").cancelBettingByIdAndUserId.mockImplementation(() => {
			return Promise.resolve({ wallet: WALLET, betting: BETTINGS[0] });
		});

		const expected = {
			wallet: WALLET,
			result: BETTINGS[0],
		};

		request(app)
			.delete(`/api/v1/bettings/id=${CANCEL_BETTING_ID}`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(200, expected, done);
	});
	it("DELETE /v1/bettings/id=:bettingId 403 betting not cancelable", (done) => {
		require("../../../../server/services/betting").cancelBettingByIdAndUserId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				BETTING_NOT_CANCELABLE.MESSAGE,
				BETTING_NOT_CANCELABLE.CODE
			));
		});

		request(app)
			.delete(`/api/v1/bettings/id=${CANCEL_BETTING_ID}`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, done);
	});
	it("DELETE /v1/bettings/id=:bettingId 403 betting not found", (done) => {
		require("../../../../server/services/betting").cancelBettingByIdAndUserId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				BETTING_NOT_FOUND.MESSAGE,
				BETTING_NOT_FOUND.CODE
			));
		});

		request(app)
			.delete(`/api/v1/bettings/id=${CANCEL_BETTING_ID}`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, done);
	});
	it("DELETE /v1/bettings/id=:bettingId 403 wallet not found", (done) => {
		require("../../../../server/services/betting").cancelBettingByIdAndUserId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				WALLET_NOT_FOUND.MESSAGE,
				WALLET_NOT_FOUND.CODE
			));
		});

		request(app)
			.delete(`/api/v1/bettings/id=${CANCEL_BETTING_ID}`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, done);
	});
	it("DELETE /v1/bettings/id=:bettingId 500 Error", (done) => {
		require("../../../../server/services/betting").cancelBettingByIdAndUserId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.delete(`/api/v1/bettings/id=${CANCEL_BETTING_ID}`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});
