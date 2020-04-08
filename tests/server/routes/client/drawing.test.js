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
const ISSUE = 201907050723;
const INVALID_LOTTERY_ID = "00000";
const INVALID_ISSUE = "abcde";
const INVALID_LOTTERY_ID_ERROR = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.006.422",
	"fields": [
		"lotteryId"
	]
};
const INTERNAL_SERVER_ERROR_MSG = "syntax error";

describe("/v1/lotteries/id=:lotteryId/drawings/issue=:issue", () => {
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

	it("HEAD /v1/lotteries/id=:lotteryId/drawings/issue=:issue 200 OK", (done) => {
		require("../../../../server/services/lottery").isDrawingExistedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.resolve(true);
		});

		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${ISSUE}`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(200, done);
	});
	it("HEAD /v1/lotteries/id=:lotteryId/drawings/issue=:issue 404 Not Found", (done) => {
		require("../../../../server/services/lottery").isDrawingExistedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.reject(false);
		});

		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${ISSUE}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, done);
	});
	it("HEAD /v1/lotteries/id=:lotteryId/drawings/issue=:issue 422 Invalid lotteryId", (done) => {
		request(app)
			.head(`/api/v1/lotteries/id=${INVALID_LOTTERY_ID}/drawings/issue=${ISSUE}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("HEAD /v1/lotteries/id=:lotteryId/drawings/issue=:issue 422 Invalid issue", (done) => {
		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${INVALID_ISSUE}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("HEAD /v1/lotteries/id=:lotteryId/drawings/issue=:issue 500 Internal Server Error", (done) => {
		require("../../../../server/services/lottery").isDrawingExistedByLotteryIdAndIssue.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.head(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings/issue=${ISSUE}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("/v1/lottery/id=:lotteryId/drawings", () => {
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

	it("GET /v1/lottery/id=:lotteryId/drawings 200 OK", (done) => {
		const expected = [];

		require("../../../../server/services/lottery").getDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve([]);
		});

		request(app)
			.get(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set('Accept-Encoding', 'application/gzip')
			.expect(200, expected, done);
	});
	it("GET /v1/lottery/id=:lotteryId/drawings 422 Invalid lotteryId", (done) => {
		const expected = INVALID_LOTTERY_ID_ERROR;

		request(app)
			.get(`/api/v1/lotteries/id=${INVALID_LOTTERY_ID}/drawings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(422, expected, done);
	});
	it("GET /v1/lottery/id=:lotteryId/drawings 500 Internal Server Error", (done) => {
		require("../../../../server/services/lottery").getDrawingsByLotteryId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.set('Accept-Encoding', 'application/gzip')
			.expect(500, done);
	});
});

describe("/api/v1/lotteries/id=:lotteryId/drawings?before=1&current=1", () => {
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

	it("GET /api/v1/lotteries/id=:lotteryId/drawings?before=1&current=1 200 OK", (done) => {
		require("../../../../server/services/lottery").getPrimaryPreviousAndCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve([{}, {}]);
		});

		request(app)
			.get(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings?before=1&current=1`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, done);
	});

	it("GET /api/v1/lotteries/id=:lotteryId/drawings?before=1&current=1 422 Invalid lotteryId", (done) => {
		require("../../../../server/services/lottery").getPrimaryPreviousAndCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.resolve([{}, {}]);
		});

		request(app)
			.get(`/api/v1/lotteries/id=${INVALID_LOTTERY_ID}/drawings?before=1&current=1`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("GET /api/v1/lotteries/id=:lotteryId/drawings?before=1&current=1 500 Internal Server Error", (done) => {
		require("../../../../server/services/lottery").getPrimaryPreviousAndCurrentDrawingsByLotteryId.mockImplementation(() => {
			return Promise.reject(new Error());
		});

		request(app)
			.get(`/api/v1/lotteries/id=${LOTTERY_ID}/drawings?before=1&current=1`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});
