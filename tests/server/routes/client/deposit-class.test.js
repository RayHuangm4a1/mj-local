const request = require("supertest");
const {
	USER_TEST01_PROFILE,
	INTERNAL_SERVER_ERROR_MSG,
} = require('../__mocks__/user');
const {
	attachUserMethods,
} = require('../utils');

jest.mock("ljit-db/model");
jest.mock("../../../../server/session");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/services/deposit");
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
	id: 12,
	accountId: "5d4aea86e48b697af60c1211",
	username: "test01",
	isBetCredentialsAuthenticated: true,
};
const DEPOSIT_CLASSES_WITH_BANK_ACCOUNTS = [
	{
		"id": 1,
		"name": "网银转帐",
		"ordering": 1,
		"bankAccounts": [
			{
				"id": 1,
				"name": "网银一号",
				"depositClassId": 1,
				"receivedAmountType": 1,
				"minReceivedAmount": 20,
				"maxReceivedAmount": 2000,
				"fixedReceivedAmounts": [],
				"balance": 0,
			},
		],
	},
];

describe('GET /v1/deposit-classes', () => {
	let app;
	let userProfile;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = USER;

				next();
			};
		});

		app = require('../../../../server/client');
		userProfile = attachUserMethods(USER_TEST01_PROFILE);
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('GET /v1/deposit-classes 200 OK', (done) => {
		const expected = DEPOSIT_CLASSES_WITH_BANK_ACCOUNTS;

		require('../../../../server/services/user').getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require('../../../../server/services/deposit').getDepositClassesWithinBankAccountsByLevelId.mockImplementation(() => {
			return Promise.resolve(DEPOSIT_CLASSES_WITH_BANK_ACCOUNTS);
		});

		request(app)
			.get(`/api/v1/deposit-classes`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(200, expected, done);
	});

	it('GET /v1/deposit-classes 500 Internal server error', (done) => {
		require('../../../../server/services/user').getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require('../../../../server/services/deposit').getDepositClassesWithinBankAccountsByLevelId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get(`/api/v1/deposit-classes`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});
