const request = require("supertest");
const { cloneDeep } = require("lodash");
const {
	AuthenticationError,
	ConflictError,
	ForbiddenError,
} = require("ljit-error");
const {
	ACCOUNT_INVALID_PASSWORD_CREDENTIALS,
	ACCOUNT_NEW_PASSWORD_IS_DUPLICATED,
	ACCOUNT_UNBIND_TOTP_CREDENTIALS,
	ACCOUNT_INVALID_TOTP_CREDENTIALS,
} = require("mj-service-sdks/error/code");

jest.mock("ljit-db/model");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/session");
jest.mock("ljit-device-detection/middlewares");
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

describe("/api/v1/guests/username=:username?captcha=123456", () => {
	const GREETING = "hello";
	const IP = "123.456.789";
	const DEFAULT_USER = {
		id: 12,
		username: 'test01',
		accountId: "5d4aea86e48b697af60c1212",
		type: 2,
		greeting: GREETING,
		ip: IP,
		isDefaultPasswordChanged: () => true,
		isBlocked: () => false,
	};
	const DEFAULT_ACCOUNT = {
		loginGeoValidation: {
			isEnabled: false
		},
		loginCredential: {
			isDefault: false
		}
	};
	const USERNAME = "test01";
	const CAPTCHA = "123456";

	let app;

	beforeEach(() => {
		const now = "2020-01-02T11:07:52.457Z";
		const fiveMiutesFromNow = "2020-01-02T11:12:52.457Z";

		Date.now = jest.fn(() => now);

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					captcha: CAPTCHA,
					captchaExpiredAt: new Date(fiveMiutesFromNow),
				};

				next();
			};
		});
		require("ljit-device-detection/middlewares").mockImplementation(() => {
			return (req, res, next) => {
				req.device = {
					ip: IP
				};

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("GET /api/v1/guests/username=:username?captcha=123456 200", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			greeting: GREETING,
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => true);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});

	it("GET /api/v1/guests/username=:username?captcha=123456 422", (done) => {
		const username = "a";
		const captcha = "12345";
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.012.422",
			"fields": [
				"username",
				"captcha"
			]
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => true);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/guests/username=:username?captcha=123456 303 ip與上次不同,異地登入開啟", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			const user = cloneDeep(DEFAULT_USER);

			user.ip = "987.654.321";

			return user;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => false);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(303, done);
	});

	it("GET /api/v1/guests/username=:username?captcha=123456 403 captcha過期", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			"type": "ForbiddenError",
			"message": "验证码已超时",
			"code": "888.010.406"
		};

		Date.now = jest.fn(() => new Date("2020-01-02T11:23:52.457Z"));

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => true);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/uername=:username?captcha=654321 403 captcha錯誤", (done) => {
		const username = USERNAME;
		const captcha = "654321";
		const expected = {
			"type": "ForbiddenError",
			"message": "验证码错误",
			"code": "888.010.405"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => true);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/username=:username?captcha=123456 403 帳號尚未啟用", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			"type": "ForbiddenError",
			"message": "请先修改预设登入密码",
			"code": "888.012.431"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			const account = cloneDeep(DEFAULT_ACCOUNT);

			account.loginCredential.isDefault = true;

			return account;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => true);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/username=:username?captcha=123456 404 找不到帳號", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			"type": "NotFoundError",
			"message": "用户不存在",
			"code": "888.012.404"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return null;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => true);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/guests/username=:username?captcha=123456 403 帳號被凍結", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			"type": "ForbiddenError",
			"message": "帐户被冻结",
			"code": "888.012.402"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			const user = cloneDeep(DEFAULT_USER);

			user.isBlocked = () => true;

			return user;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => true);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/username=:username?captcha=123456 500", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.reject("internal server error");
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		require("../../../../server/services/user").validateLoginGeoByAccountId.mockImplementation(() => true);

		request(app)
			.get(`/api/v1/guests/username=${username}?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("GET /api/v1/guests/id=me/payers/name=:payer", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("ljit-device-detection/middlewares").mockImplementation(() => {
			return (req, res, next) => {
				req.device = {
					ip: "123.456.789"
				};

				next();
			};
		});
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("GET /api/v1/guests/id=me/payers/name=:payer, 204", (done) => {
		const payer = "abc";

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						userId:12
					}
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").isPayerExistedByIdAndPayer.mockImplementation(() => {
			return Promise.resolve(true);
		});

		request(app)
			.get(`/api/v1/guests/id=me/payers/name=${payer}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});

	it("GET /api/v1/guests/id=me/payers/name=:payer, 403 userId is not in session", (done) => {
		const payer = "abc";
		const expected = {
			"type": "ForbiddenError",
			"message": "非法操作",
			"code": "888.012.403"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {};

				next();
			};
		});

		app = require("../../../../server/client");

		request(app)
			.get(`/api/v1/guests/id=me/payers/name=${payer}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/id=me/payers/name=:payer, 403 session expired", (done) => {
		const payer = "abc";
		const expected = {
			"type": "ForbiddenError",
			"message": "非法操作",
			"code": "888.012.403"
		};

		Date.now = jest.fn(() => new Date("2020-01-02T11:23:52.457Z"));

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						expiredAt: new Date("2020-01-02T11:00:52.457Z")
					}
				};

				next();
			};
		});

		app = require("../../../../server/client");

		request(app)
			.get(`/api/v1/guests/id=me/payers/name=${payer}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/id=me/payers/name=:payer, 404 user payer not found", (done) => {
		const payer = "abc";

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						userId:12
					}
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").isPayerExistedByIdAndPayer.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.get(`/api/v1/guests/id=me/payers/name=${payer}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, done);
	});

	it("GET /api/v1/guests/id=me/payers/name=:payer, 422 invalid payer", (done) => {
		const payer = "123";
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "002.002.422",
			"fields": [
				"payer"
			]
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {};

				next();
			};
		});

		app = require("../../../../server/client");

		request(app)
			.get(`/api/v1/guests/id=me/payers/name=${payer}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/guests/id=me/payers/name=:payer, 500 INTERNAL_SERVER_ERROR", (done) => {
		const payer = "abc";

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						userId:12
					}
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").isPayerExistedByIdAndPayer.mockImplementation(() => {
			return Promise.reject(new Error("internal server error"));
		});

		request(app)
			.get(`/api/v1/guests/id=me/payers/name=${payer}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("/api/v1/guests/username=:username/password-resetting-methods?captcha=123456", () => {
	const USERNAME = "test01";
	const CAPTCHA = "123456";
	const IP = "123.123.123.123";
	const SECURITY_QUESTIONS = [{
		id: 1,
		answer: "123414124",
	}, {
		id: 2,
		answer: "123414124",
	}, {
		id: 3,
		answer: "123414124",
	}];

	const DEFAULT_USER = {
		accountId: "528f43456fdfsf42a",
		isBlocked: () => false,
	};
	const DEFAULT_ACCOUNT = {
		securityQuestions: [],
		totp: {
			isEnabled: false
		}
	};

	let app;

	beforeEach(() => {
		const now = "2020-01-02T11:07:52.457Z";
		const fiveMiutesFromNow = "2020-01-02T11:12:52.457Z";

		Date.now = jest.fn(() => now);

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					captcha: CAPTCHA,
					captchaExpiredAt: new Date(fiveMiutesFromNow),
				};

				next();
			};
		});

		require("ljit-device-detection/middlewares").mockImplementation(() => {
			return (req, res, next) => {
				req.device = {
					ip: IP
				};

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 200 沒有安全問題,沒有開啟Google驗證碼", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			'security-questions': [],
			'google-totp': false
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 200 有安全問題,沒有開啟Google驗證碼", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			'security-questions': [
				{
					id: 1
				},
				{
					id: 2
				},
				{
					id: 3
				}
			],
			'google-totp': false
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			const account = cloneDeep(DEFAULT_ACCOUNT);

			account.securityQuestions = SECURITY_QUESTIONS;

			return account;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 200 沒有安全問題,有開啟Google驗證碼", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			'security-questions': [],
			'google-totp': true
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			const account = cloneDeep(DEFAULT_ACCOUNT);

			account.totp.isEnabled = true;

			return account;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 200 有安全問題,有開啟Google驗證碼", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected =  {
			'security-questions': [
				{
					id: 1
				},
				{
					id: 2
				},
				{
					id: 3
				}
			],
			'google-totp': true
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			const account = cloneDeep(DEFAULT_ACCOUNT);

			account.securityQuestions = SECURITY_QUESTIONS;
			account.totp.isEnabled = true;

			return account;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 422", (done) => {
		const username = "test";
		const captcha = "1";
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.012.422",
			"fields": [
				"username",
				"captcha"
			]
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 403 captcha過期", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			"type": "ForbiddenError",
			"message": "验证码已超时",
			"code": "888.010.406"
		};

		Date.now = jest.fn(() => new Date("2020-01-02T11:23:52.457Z"));

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 403 captcha錯誤", (done) => {
		const username = USERNAME;
		const captcha = "654321";
		const expected = {
			"type": "ForbiddenError",
			"message": "验证码错误",
			"code": "888.010.405"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return DEFAULT_USER;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 404 找不到帳號", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			"type": "NotFoundError",
			"message": "用户不存在",
			"code": "888.012.404"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return null;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 403 帳號被凍結", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;
		const expected = {
			"type": "ForbiddenError",
			"message": "帐户被冻结",
			"code": "888.012.402"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			const user = cloneDeep(DEFAULT_USER);

			user.isBlocked = () => true;

			return user;
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("GET /api/v1/guests/username=:username/password-resetting-methods?captcha=123456 500", (done) => {
		const username = USERNAME;
		const captcha = CAPTCHA;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.reject("internal server error");
		});

		require("../../../../server/services/user").getAccountById.mockImplementation(() => {
			return DEFAULT_ACCOUNT;
		});

		request(app)
			.get(`/api/v1/guests/username=${username}/password-resetting-methods?captcha=${captcha}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password", () => {
	const PASSWORD = "123qwe";
	const IP = "123.456.789";

	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("ljit-device-detection/middlewares").mockImplementation(() => {
			return (req, res, next) => {
				req.device = {
					ip: IP
				};

				next();
			};
		});
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 201 Created", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": PASSWORD,
			"confirmedPassword": PASSWORD
		};
		const profile = {
			id: 12,
		};
		const account = {
			loginCredential:{
				isDefault: true,
			},
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						userId: 12,
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			return Promise.resolve(profile);
		});
		require("../../../../server/services/user").getAccountById.mockImplementationOnce(() => {
			return Promise.resolve(account);
		});
		require("../../../../server/services/user").updateLoginPasswordViaPasswordByAccountId.mockImplementationOnce(() => {
			return Promise.resolve(profile);
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 401 Invalid password", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": PASSWORD,
			"confirmedPassword": PASSWORD
		};
		const profile = {
			id: 12,
		};
		const account = {
			loginCredential:{
				isDefault: true,
			},
		};
		const expected = {
			"type": "AuthenticationError",
			"message": "帐密错误",
			"code": "002.002.402"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						userId: 12,
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			return Promise.resolve(profile);
		});
		require("../../../../server/services/user").getAccountById.mockImplementationOnce(() => {
			return Promise.resolve(account);
		});
		require("../../../../server/services/user").updateLoginPasswordViaPasswordByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new AuthenticationError(
				ACCOUNT_INVALID_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 403 userId is not in session", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": PASSWORD,
			"confirmedPassword": PASSWORD
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "非法操作",
			"code": "888.012.403"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {};

				next();
			};
		});

		app = require("../../../../server/client");

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 403 session expired", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": PASSWORD,
			"confirmedPassword": PASSWORD
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "非法操作",
			"code": "888.012.403"
		};

		Date.now = jest.fn(() => new Date("2020-01-02T11:23:52.457Z"));

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						expiredAt: new Date("2020-01-02T11:00:52.457Z")
					}
				};

				next();
			};
		});

		app = require("../../../../server/client");

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 409 User default password already changed", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": PASSWORD,
			"confirmedPassword": PASSWORD
		};
		const profile = {
			id: 12,
		};
		const account = {
			loginCredential:{
				isDefault: false,
			},
		};
		const expected = {
			"type": "ConflictError",
			"message": "帐号预设密码已更改",
			"code": "888.012.413"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						userId: 12,
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			return Promise.resolve(profile);
		});
		require("../../../../server/services/user").getAccountById.mockImplementationOnce(() => {
			return Promise.resolve(account);
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(409, expected, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 409 user password is duplicated", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": PASSWORD,
			"confirmedPassword": PASSWORD
		};
		const profile = {
			id: 12,
		};
		const account = {
			loginCredential:{
				isDefault: true,
			},
		};
		const expected = {
			"type": "ConflictError",
			"message": "新密码不可与帐号或其他密码重複",
			"code": "002.002.411"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						userId: 12,
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			return Promise.resolve(profile);
		});
		require("../../../../server/services/user").getAccountById.mockImplementationOnce(() => {
			return Promise.resolve(account);
		});
		require("../../../../server/services/user").updateLoginPasswordViaPasswordByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new ConflictError(
				ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.MESSAGE,
				ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(409, expected, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 422 Invalid password", (done) => {
		const body = {
			"password": "",
			"newPassword": PASSWORD,
			"confirmedPassword": PASSWORD
		};
		const expected =
		{
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.012.422",
			"fields": [
				"password"
			]
		};

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 422 Invalid newPassword", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": "",
			"confirmedPassword": ""
		};
		const expected =
		{
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.012.422",
			"fields": [
				"newPassword"
			]
		};

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 422 Invalid confirmedPassword", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": PASSWORD,
			"confirmedPassword": ""
		};
		const expected =
		{
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.012.422",
			"fields": [
				"confirmedPassword"
			]
		};

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("PUT /api/v1/guests/id=me/credentials/type=login?via=default-password, 500 Internal server error", (done) => {
		const body = {
			"password": PASSWORD,
			"newPassword": PASSWORD,
			"confirmedPassword": PASSWORD
		};
		const profile = {
			id: 12,
		};
		const account = {
			loginCredential:{
				isDefault: true,
			},
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						userId: 12,
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			return Promise.resolve(profile);
		});
		require("../../../../server/services/user").getAccountById.mockImplementationOnce(() => {
			return Promise.resolve(account);
		});
		require("../../../../server/services/user").updateLoginPasswordViaPasswordByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new Error("internal server error"));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=default-password")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("PUT /api/v1/guests/id=me/credentials/type=login?via=google-totp", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("ljit-device-detection/middlewares").mockImplementation(() => {
			return (req, res, next) => {
				req.device = {
					ip: "123.456.789",
				};

				next();
			};
		});
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("204, Update login password seccessfully", (done) => {
		const body = {
			newPassword: "123qwe",
			totp: "123456",
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest:{
						accountId: "5d4aea86e48b697af60c1211",
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.resolve(null);
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});

	it("401, Account invalid google TOTP credentials", (done) => {
		const body = {
			newPassword: "123qwe",
			totp: "123456",
		};
		const expected = {
			"type": "AuthenticationError",
			"message": "谷歌验证码错误",
			"code": "002.002.406"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest:{
						accountId: "5d4aea86e48b697af60c1211",
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(
				ACCOUNT_INVALID_TOTP_CREDENTIALS.MESSAGE,
				ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});

	it("403, Account unbind google TOTP credentials", (done) => {
		const body = {
			newPassword: "123qwe",
			totp: "123456",
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "谷歌验证码未绑定",
			"code": "002.002.405"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest:{
						accountId: "5d4aea86e48b697af60c1211",
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_UNBIND_TOTP_CREDENTIALS.MESSAGE,
				ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("403, guest is not in session", (done) => {
		const body = {
			newPassword: "123qwe",
			totp: "123456",
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "非法操作",
			"code": "888.012.403"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_UNBIND_TOTP_CREDENTIALS.MESSAGE,
				ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("403, session expired", (done) => {
		const body = {
			newPassword: "123qwe",
			totp: "123456",
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "非法操作",
			"code": "888.012.403"
		};

		Date.now = jest.fn(() => new Date("2020-01-02T11:23:52.457Z"));

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest: {
						expiredAt: new Date("2020-01-02T11:00:52.457Z")
					}
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_UNBIND_TOTP_CREDENTIALS.MESSAGE,
				ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("409, Account new password is duplicated", (done) => {
		const body = {
			newPassword: "123qwe",
			totp: "123456",
		};
		const expected = {
			"type": "ConflictError",
			"message": "新密码不可与帐号或其他密码重複",
			"code": "002.002.411"
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest:{
						accountId: "5d4aea86e48b697af60c1211",
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.reject(new ConflictError(
				ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.MESSAGE,
				ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(409, expected, done);
	});

	it("422, Invalid newPassword", (done) => {
		const body = {
			newPassword: "",
			totp: "123456",
		};
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.012.422",
			"fields": [
				"newPassword"
			]
		};

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.reject(new ConflictError(
				ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.MESSAGE,
				ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("422, Invalid TOTP", (done) => {
		const body = {
			newPassword: "123qwe",
			totp: "",
		};
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.012.422",
			"fields": [
				"totp"
			]
		};

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.reject(new ConflictError(
				ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.MESSAGE,
				ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE
			));
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("500, Invalid server error", (done) => {
		const body = {
			newPassword: "123qwe",
			totp: "123456",
		};

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.session = {
					guest:{
						accountId: "5d4aea86e48b697af60c1211",
					},
				};

				next();
			};
		});

		app = require("../../../../server/client");

		require("../../../../server/services/user").updateLoginPasswordViaGoogleTOTPByAccountId.mockImplementation(() => {
			return Promise.reject("internal server error");
		});

		request(app)
			.put("/api/v1/guests/id=me/credentials/type=login?via=google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});
