const request = require("supertest");

jest.mock("ljit-db/model");
jest.mock("../../../../server/services/wallet");
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

const USERNAME = "test01";
const WALLETS = [
	{
		"userId": 3,
		"name": "彩票钱包",
		"code": "primary",
		"balance": "10000.0000"
	},
	{
		"userId": 3,
		"name": "监管钱包",
		"code": "supervision",
		"balance": "10000.0000"
	}
];
const INTERNAL_SERVER_ERROR_MSG = "syntax error";


describe("/api/v1/wallets", () => {
	let app;

	beforeEach(() => {
		jest.mock("../../../../server/session");

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = {
					username: USERNAME,
				};

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("GET /api/v1/wallets 200 OK", (done) => {
		const expected = WALLETS;

		require("../../../../server/services/wallet").getWalletsByUserId.mockImplementation(() => {
			return Promise.resolve(WALLETS);
		});

		request(app)
			.get(`/api/v1/wallets`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});
	it("GET /api/v1/wallets 500 Internal Server Error", (done) => {
		require("../../../../server/services/wallet").getWalletsByUserId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get(`/api/v1/wallets`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});
