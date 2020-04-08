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
const PLAY_CONDITIONS = [{
	"_id" : "5d317d37ae20f6f3c1c22236",
	"platform" : {
		"_id" : "5cd151312dfa1d244dd54517",
		"name" : "麥傑",
		"code" : "mj"
	},
	"lottery" : {
		"_id" : "5d317d37ae20f6f3c1c22234",
		"id" : 12,
		"name" : "东京1.5分彩",
		"code" : "dj1.5fc"
	},
	"playClass" : {
		"_id" : "5d317d36ae20f6f3c1c22222",
		"name" : "官方",
		"code" : "standard"
	},
	"id" : 1,
	"name" : "五星",
	"subconditions" : [
		{
			"_id" : "5d317d37ae20f6f3c1c22237",
			"id" : 1001,
			"name" : "五星直选",
			"plays" : [
				{
					"_id" : "5d317d37ae20f6f3c1c22238",
					"id" : 1,
					"name" : "直选复式"
				}
			]
		}
	],
	"__v" : 0,
	"createdAt" : "2019-07-19T08:20:07.458Z",
	"updatedAt" : "2019-07-19T08:20:07.458Z",
}];
const INVALID_LOTTERY_ID_ERROR = {
	type: 'RequestValidationError',
	message: '输入格式错误',
	code: '888.004.422',
	fields: ['lotteryId'],
};
const INTERNAL_SERVER_ERROR_MSG = "syntax error";

describe("/api/v1/lotteries/id=:lotteryId/play-conditions", () => {
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

	it("GET /api/v1/lotteries/id=:lotteryId/play-conditions 200 OK", (done) => {
		const expected = PLAY_CONDITIONS;

		require("../../../../server/services/lottery").getPrimaryPlayConditionsByLotteryId.mockImplementation(() => {
			return Promise.resolve(PLAY_CONDITIONS);
		});

		request(app)
			.get(`/api/v1/lotteries/id=${LOTTERY_ID}/play-conditions`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(200, expected, done);
	});
	it("GET /api/v1/lotteries/id=:lotteryId/play-conditions 422 Invalid lotteryId", (done) => {
		const expected = INVALID_LOTTERY_ID_ERROR;

		request(app)
			.get(`/api/v1/lotteries/id=${INVALID_LOTTERY_ID}/play-conditions`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(422, expected, done);
	});
	it("GET /api/v1/lotteries/id=:lotteryId/play-conditions 500 Internal Server Error", (done) => {
		require("../../../../server/services/lottery").getPrimaryPlayConditionsByLotteryId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get(`/api/v1/lotteries/id=${LOTTERY_ID}/play-conditions`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(500, done);
	});
});
