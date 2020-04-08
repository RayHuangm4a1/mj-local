const request = require("supertest");
const {
	NotFoundError,
	InternalServerError,
} = require("ljit-error");
const {
	DRAWING_NOT_FOUND,
} = require("mj-service-sdks/error/code");

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
const ISSUE = 20190701001;
const INVALID_LOTTERY_ID = "abc";
const INVALID_ISSUE = "20190701-abc";
const INTERNAL_SERVER_ERROR_MSG = "syntax error";

describe("/api/v1/lotteries/id=:lotteryId/drawings/issue=:issue/next", () => {
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

	it("HEAD /api/v1/lotteries/id=:lotteryId/drawings/issue=:issue/next 200 OK", (done) => {
		require("../../../../server/services/lottery").isPrimaryNextDrawingOpeningByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(true);
		});

		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${ISSUE}/next`)
			.expect(200, done);
	});
	it("HEAD /api/v1/lotteries/id=:lotteryId/drawings/issue=:issue/next 404 Not Found", (done) => {
		require("../../../../server/services/lottery").isPrimaryNextDrawingOpeningByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${ISSUE}/next`)
			.expect(404, done);
	});
	it("HEAD /api/v1/lotteries/id=:lotteryId/drawings/issue=:issue/next 404 Not Found", (done) => {
		require("../../../../server/services/lottery").isPrimaryNextDrawingOpeningByLotteryIdAndIssue.mockImplementation(() => {
			throw new NotFoundError(DRAWING_NOT_FOUND.MESSAGE, DRAWING_NOT_FOUND.CODE);
		});

		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${ISSUE}/next`)
			.expect(404, done);
	});
	it("HEAD /api/v1/lotteries/id=:lotteryId/drawings/issue=:issue/next 422 Unprocessable Entity", (done) => {
		request(app)
			.head(`/api/v1/lotteries/id=${INVALID_LOTTERY_ID}/drawings/issue=${ISSUE}/next`)
			.expect(422, done);
	});
	it("HEAD /api/v1/lotteries/id=:lotteryId/drawings/issue=:issue/next 422 Unprocessable Entity", (done) => {
		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${INVALID_ISSUE}/next`)
			.expect(422, done);
	});
	it("HEAD /api/v1/lotteries/id=:lotteryId/drawings/issue=:issue/next 500 Internal Server Error", (done) => {
		require("../../../../server/services/lottery").isPrimaryNextDrawingOpeningByLotteryIdAndIssue.mockImplementation(() => {
			throw new InternalServerError(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${ISSUE}/next`)
			.expect(500, done);
	});
});
