const request = require("supertest");
const {
	INTERNAL_SERVER_ERROR_MSG,
} = require('../__mocks__/user');
const {
	AuthenticationError,
	ForbiddenError,
	NotFoundError,
} = require('ljit-error');
const {
	ACCOUNT_INVALID_PASSWORD_CREDENTIALS,
	ACCOUNT_UNBIND_PASSWORD_CREDENTIALS,
} = require('mj-service-sdks/error/code');
const {
	BANK_CARD_NOT_FOUND,
} = require('../../../../server/lib/error/code');

jest.mock("ljit-db/model");
jest.mock("../../../../server/session");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/services/bank-card");
jest.mock("../../../../server/services/withdrawal");
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
const BANK_CARDS = [
	{
		"id": 1,
		"bankName": "招商银行",
		"number": "9524",
		"payer": "**者",
		"activatedAt": "2020-01-15T09:19:52.000Z",
		"withdrawableAt": "2020-01-15T09:19:52.000Z"
	},
];
const BANK_CARD_ID = 1;
const FUNDS_PASSWORD = '123qwe';

describe('GET /v1/bank-cards', () => {
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

	it('GET /v1/bank-cards 200 OK', (done) => {
		const expected = BANK_CARDS;

		require('../../../../server/services/bank-card').getActiveBankCardsByUserId.mockImplementation(() => {
			return Promise.resolve(BANK_CARDS);
		});

		request(app)
			.get(`/api/v1/bank-cards`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(200, expected, done);
	});

	it('GET /v1/bank-cards 500 Internal server error', (done) => {
		require('../../../../server/services/bank-card').getActiveBankCardsByUserId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get(`/api/v1/bank-cards`)
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});

describe('DELETE /v1/bank-cards/id=:bankCardId', () => {
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

	it(`DELETE /v1/bank-cards/id=${BANK_CARD_ID} 204 成功`, (done) => {
		require('../../../../server/services/user').validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require('../../../../server/services/withdrawal').countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId.mockImplementation(() => {
			return Promise.resolve(0);
		});
		require('../../../../server/services/bank-card').archiveBankCardByIdAndUserId.mockImplementation(() => {
			return Promise.resolve();
		});

		request(app)
			.delete(`/api/v1/bank-cards/id=${BANK_CARD_ID}`)
			.send({ password: FUNDS_PASSWORD })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(204, done);
	});

	it(`DELETE /v1/bank-cards/id=${BANK_CARD_ID} 403 有提現單正在使用此卡`, (done) => {
		const expected = {
			"type": "ForbiddenError",
			"message": "有提现单正在使用此卡，不可解除绑定",
			"code": "888.017.406"
		};

		require('../../../../server/services/user').validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require('../../../../server/services/withdrawal').countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId.mockImplementation(() => {
			return Promise.resolve(1);
		});
		require('../../../../server/services/bank-card').archiveBankCardByIdAndUserId.mockImplementation(() => {
			return Promise.resolve();
		});

		request(app)
			.delete(`/api/v1/bank-cards/id=${BANK_CARD_ID}`)
			.send({ password: FUNDS_PASSWORD })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expected, done);
	});

	it(`DELETE /v1/bank-cards/id=${BANK_CARD_ID} 401 資金密碼錯誤`, (done) => {
		const expected = {
			"type": "AuthenticationError",
			"message": "帐密错误",
			"code": "002.002.402",
		};

		require('../../../../server/services/withdrawal').countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId.mockImplementation(() => {
			return Promise.resolve(0);
		});
		require('../../../../server/services/user').validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(
				ACCOUNT_INVALID_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.delete(`/api/v1/bank-cards/id=${BANK_CARD_ID}`)
			.send({ password: FUNDS_PASSWORD })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(401, expected, done);
	});

	it(`DELETE /v1/bank-cards/id=${BANK_CARD_ID} 403 資金密碼未綁定`, (done) => {
		const expected = {
			"type": "ForbiddenError",
			"message": "密码未绑定",
			"code": "002.002.403",
		};

		require('../../../../server/services/withdrawal').countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId.mockImplementation(() => {
			return Promise.resolve(0);
		});
		require('../../../../server/services/user').validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.delete(`/api/v1/bank-cards/id=${BANK_CARD_ID}`)
			.send({ password: FUNDS_PASSWORD })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(403, expected, done);
	});

	it(`DELETE /v1/bank-cards/id=${BANK_CARD_ID} 404 銀行卡不存在`, (done) => {
		const expected = {
			"type": "NotFoundError",
			"message": "银行卡不存在",
			"code": "888.017.404",
		};

		require('../../../../server/services/withdrawal').countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId.mockImplementation(() => {
			return Promise.resolve(0);
		});
		require('../../../../server/services/user').validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require('../../../../server/services/bank-card').archiveBankCardByIdAndUserId.mockImplementation(() => {
			return Promise.reject(new NotFoundError(
				BANK_CARD_NOT_FOUND.MESSAGE,
				BANK_CARD_NOT_FOUND.CODE
			));
		});

		request(app)
			.delete(`/api/v1/bank-cards/id=${BANK_CARD_ID}`)
			.send({ password: FUNDS_PASSWORD })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(404, expected, done);
	});

	it(`DELETE /v1/bank-cards/id=${BANK_CARD_ID} 500 內部伺服器錯誤`, (done) => {
		require('../../../../server/services/withdrawal').countPreviousWithdrawalApplicationFormsByUserIdAndBankCardId.mockImplementation(() => {
			return Promise.resolve(0);
		});
		require('../../../../server/services/user').validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require('../../../../server/services/bank-card').archiveBankCardByIdAndUserId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.delete(`/api/v1/bank-cards/id=${BANK_CARD_ID}`)
			.send({ password: FUNDS_PASSWORD })
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.expect(500, done);
	});
});
