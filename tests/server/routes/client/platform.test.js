const request = require("supertest");

jest.mock("ljit-db/model");
jest.mock("../../../../server/session");
jest.mock("../../../../server/services/platform");
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
const PLATFORM = {
	"bonus": {
		"list": [
			1956,
			1954,
			1952,
			1950,
			1800,
			1700
		],
		"max": 1956,
		"min": 1700
	},
	"id": 1,
	"_id": "5cd151312dfa1d244dd54517",
	"name": "麥傑",
	"code": "mj",
	"couldEqualToPlatformMaxBonus": true,
	"couldEqualToParentBonus": false,
	"rewardMode": "奖金模式",
	"nonPKMaxProfit": 500000,
	"pkMaxProfit": 10000,
	"status": "online",
	"createdAt": "2019-08-08T02:50:18.000Z",
	"updatedAt": "2019-08-08T02:50:18.000Z"
};
const INTERNAL_SERVER_ERROR_MSG = "syntax error";

describe("/api/v1/platform", () => {
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

	it("GET /api/v1/platform 200 OK", (done) => {
		const expected = PLATFORM;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});

		request(app)
			.get("/api/v1/platform")
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});
	it("GET /api/v1/platform 500 Internal Server Error", (done) => {
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get("/api/v1/platform")
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});
