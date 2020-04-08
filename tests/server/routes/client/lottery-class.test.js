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
const LOTTERY_CLASSES = [
	{
		"_id": "5d130d5d0737be0e5a531158",
		"status": "online",
		"id": 4,
		"name": "PC蛋蛋",
		"code": "pcdd",
		"createdAt": "2019-06-26T06:14:53.193Z",
		"updatedAt": "2019-06-26T06:14:53.193Z"
	}
];
const INTERNAL_SERVER_ERROR_MSG = "syntax error";

describe("/api/v1/lottery-classes", () => {
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

	it("GET /api/v1/lottery-classes 200 OK", (done) => {
		const expected = LOTTERY_CLASSES;

		require("../../../../server/services/lottery").getPrimaryOnlineLotteryClasses.mockImplementation(() => {
			return Promise.resolve(LOTTERY_CLASSES);
		});

		request(app)
			.get("/api/v1/lottery-classes")
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});
	it("GET /v1/lottery-classes 500 Internal Server Error", (done) => {
		require("../../../../server/services/lottery").getPrimaryOnlineLotteryClasses.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get("/api/v1/lottery-classes")
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});
