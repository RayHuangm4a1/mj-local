const request = require("supertest");

jest.mock("ljit-db/model");
jest.mock("../../../../server/session");
jest.mock("../../../../server/services/lottery");
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
	id: 3,
	accountId: "5d4aea86e48b697af60c1211",
	username: "test01",
	isBetCredentialsAuthenticated: true,
};
const LOTTERY_ID = 16;
const INVALID_LOTTERY_ID = "abc";
const PLAYS = [{
	"_id": "5d6345f2a7ea5f0fa48114dc",
	"status": "online",
	"platform": {
		"_id": "5cd151312dfa1d244dd54516",
		"name": "官方",
		"code": "official"
	},
	"lotteryClass": {
		"status": "online",
		"_id": "5d6345f1a7ea5f0fa4811438",
		"id": 0,
		"name": "时时彩",
		"code": "ssc"
	},
	"lottery": {
		"_id": "5d6345f2a7ea5f0fa4811448",
		"id": 12,
		"name": "东京1.5分彩",
		"code": "dj1.5fc",
		"status": "online"
	},
	"playCondition": {
		"_id": "5d6345f2a7ea5f0fa48114c8",
		"id": 1,
		"name": "五星"
	},
	"playSubcondition": {
		"_id": "5d6345f2a7ea5f0fa48114d9",
		"id": 1001,
		"name": "五星直选"
	},
	"id": 1,
	"name": "直选复式",
	"unit": 2,
	"awards": {
		"中奖": {
			"deltaBonus": 0,
			"numerator": 1,
			"denominator": 10000
		}
	},
	"positions": [],
	"policy": {
		"bonusLimiting": {
			"isEnabled": false,
			"content": []
		},
		"betLimiting": {
			"isEnabled": false,
			"content": []
		},
		"pk": {
			"isEnabled": false,
			"content": {
				"count": 0
			}
		}
	},
	"description": "从万位、千位、百位、十位、个位各选一个号码组成一注。 从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。 投注方案：13456;开奖号码：13456，即中五星直选。",
	"createdAt": "2019-08-26T02:37:42.719Z",
	"updatedAt": "2019-08-26T02:37:42.719Z"
}];
const INVALID_LOTTERY_ID_ERROR = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.005.422",
	"fields": ["lotteryId"],
};
const INTERNAL_SERVER_ERROR_MSG = "syntax error";


describe("/api/v1/lotteries/id=:lotteryId/plays", () => {
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

	it("GET /api/v1/lotteries/id=:lotteryId/plays 200 OK", (done) => {
		const expected = PLAYS;

		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryId.mockImplementation(() => {
			return Promise.resolve(PLAYS);
		});

		request(app)
			.get(`/api/v1/lotteries/id=${LOTTERY_ID}/plays`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(200, expected, done);
	});
	it("GET /api/v1/lotteries/id=:lotteryId/plays 422 Invalid lotteryId", (done) => {
		const expected = INVALID_LOTTERY_ID_ERROR;

		request(app)
			.get(`/api/v1/lotteries/id=${INVALID_LOTTERY_ID}/plays`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(422, expected, done);
	});
	it("GET /api/v1/lotteries/id=:lotteryId/plays 500 Internal Server Error", (done) => {
		require("../../../../server/services/lottery").getPrimaryPlaysByLotteryId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get(`/api/v1/lotteries/id=${LOTTERY_ID}/plays`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(500, done);
	});
});
