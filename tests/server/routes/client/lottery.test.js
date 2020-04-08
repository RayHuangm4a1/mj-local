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
const LOTTERIES = [
	{
		"_id" : "5d317d37ae20f6f3c1c2222e",
		"status" : "online",
		"platform" : {
			"_id" : "5cd151312dfa1d244dd54517",
			"name" : "麥傑",
			"code" : "mj"
		},
		"lotteryClass" : {
			"status" : "online",
			"_id" : "5d317d37ae20f6f3c1c22229",
			"id" : 0,
			"name" : "时时彩",
			"code" : "ssc"
		},
		"playClasses" : [
			{
				"_id" : "5d317d36ae20f6f3c1c22222",
				"name" : "官方",
				"code" : "standard"
			},
			{
				"_id" : "5d317d36ae20f6f3c1c22223",
				"name" : "信用",
				"code" : "xinyong"
			}
		],
		"id" : 16,
		"name" : "腾讯分分彩",
		"code" : "txffc",
		"numOfIssues" : 1440,
		"__v" : 0,
		"createdAt" : "2019-07-19T08:20:07.092Z",
		"updatedAt" : "2019-07-19T08:20:07.092Z",
	}
];
const INTERNAL_SERVER_ERROR_MSG = "syntax error";

describe("/api/v1/lotteries", () => {
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

	it("GET /api/v1/lotteries 200 OK", (done) => {
		const expected = LOTTERIES;

		require("../../../../server/services/lottery").getPrimaryLotteries.mockImplementation(() => {
			return Promise.resolve(LOTTERIES);
		});

		request(app)
			.get("/api/v1/lotteries")
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(200, expected, done);
	});
	it("GET /v1/lotteries 500 Internal Server Error", (done) => {
		require("../../../../server/services/lottery").getPrimaryLotteries.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get("/api/v1/lotteries")
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(500, done);
	});
});
