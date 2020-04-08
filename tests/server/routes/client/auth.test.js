const request = require("supertest");
const {
	cloneDeep,
} = require("lodash");

jest.mock("ljit-db/model");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/models/user", () => { return {}; });
jest.mock("../../../../server/models/user-bank-card", () => { return {}; });
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

const {
	AuthenticationError,
	ForbiddenError,
} = require("ljit-error");
const {
	AUTH_INVALID_USERNAME_CREDENTIALS,
	AUTH_INVALID_PASSWORD_CREDENTIALS,
	AUTH_GOOGLE_LOGIN_INVALID_TOTP_CREDENTIALS,
	ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED,
} = require("mj-service-sdks/error/code");
const {
	ACCOUNT,
	USERNAME,
	PASSWORD,
	TOTP,
	USER_ME_PROFILE,
	INTERNAL_SERVER_ERROR_MSG,
} = require("../__mocks__/user");
const {
	attachUserMethods,
} = require("../utils");

describe("/api/v1/login", () => {
	const RESPONSES = {
		SUCCESS: { id: 1,
			username: 'admin',
			type: 'admin',
			parent: null,
			numOfDescendants: 1,
			deltaBonus: 0,
			nickname: 'admin',
			greeting: null,
			statuses: {
				isBetable: true,
				isBlocked: false,
				isFundsable: true,
				isDepositable: true,
				isTeamBetable: true,
				isTeamBlocked: false,
				isDividendable: true,
				isWithdrawable: true,
				isTeamFundsable: true,
				isTeamDepositable: true,
				isTeamWithdrawable: true
			},
			ip: '211.23.162.10',
			geo: '台湾省中华电信(HiNet)数据中心',
			loginAt: '2019-08-30T02:59:36.516Z',
		},
		INVALID_BODY: {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.010.422",
			"fields": [
				"username",
				"password"
			]
		},
		USER_IS_BLOCKED: {
			"type": "AuthenticationError",
			"message": "帐户被冻结",
			"code": "888.012.402"
		},
		INVALID_USERNAME_CREDENTIALS: {
			"type": "AuthenticationError",
			"message": "帐密错误",
			"code": "888.012.404"
		},
		AUTH_INVALID_USERNAME_CREDENTIALS: {
			"type": "AuthenticationError",
			"message": "帐密错误",
			"code": "002.001.401"
		},
		AUTH_INVALID_PASSWORD_CREDENTIALS: {
			"type": "AuthenticationError",
			"message": "帐密错误",
			"code": "002.001.402"
		},
	};

	let app;

	let userProfile;

	beforeEach(() => {
		const passport = require("../../../../server/passport");

		passport.setClientLoginStrategies();

		userProfile = attachUserMethods(cloneDeep(USER_ME_PROFILE));

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /api/v1/login 201 created", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.SUCCESS;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/user").login.mockImplementation(() => {
			return Promise.resolve(ACCOUNT);
		});

		request(app)
			.post("/api/v1/login")
			.send({
				username,
				password,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("POST /api/v1/login 422 invalid body", (done) => {
		const username = "q";
		const password = "a";
		const expected = RESPONSES.INVALID_BODY;

		request(app)
			.post("/api/v1/login")
			.send({
				username,
				password,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
	it("POST /api/v1/login 401 user is blocked", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.USER_IS_BLOCKED;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			userProfile.statuses.isBlocked = true;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post("/api/v1/login")
			.send({
				username,
				password,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("POST /api/v1/login 401 invalid username credentials", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.INVALID_USERNAME_CREDENTIALS;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.resolve(null);
		});

		request(app)
			.post("/api/v1/login")
			.send({
				username,
				password,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("POST /api/v1/login 401 auth invalid username credentials", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.AUTH_INVALID_USERNAME_CREDENTIALS;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/user").login.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(AUTH_INVALID_USERNAME_CREDENTIALS.MESSAGE, AUTH_INVALID_USERNAME_CREDENTIALS.CODE));
		});

		request(app)
			.post("/api/v1/login")
			.send({
				username,
				password,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("POST /api/v1/login 401 auth invalid password credentials", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.AUTH_INVALID_PASSWORD_CREDENTIALS;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/user").login.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(AUTH_INVALID_PASSWORD_CREDENTIALS.MESSAGE, AUTH_INVALID_PASSWORD_CREDENTIALS.CODE));
		});

		request(app)
			.post("/api/v1/login")
			.send({
				username,
				password,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("POST /api/v1/login 403 default password not changed", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = {
			"type": "ForbiddenError",
			"message": "登入预设密码尚未更改",
			"code": "002.002.417",
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/user").login.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED.MESSAGE, ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED.CODE));
		});

		request(app)
			.post("/api/v1/login")
			.send({
				username,
				password,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("POST /api/v1/login 500 internal server error", (done) => {
		const username = USERNAME;
		const password = PASSWORD;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post("/api/v1/login")
			.send({
				username,
				password,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("/api/v1/login?via=google-totp", () => {
	let app;

	let userProfile;

	beforeEach(() => {
		const passport = require("../../../../server/passport");

		passport.setClientLoginStrategies();

		userProfile = attachUserMethods(cloneDeep(USER_ME_PROFILE));

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /api/v1/login?via=google-totp 201 created", (done) => {
		const username = USERNAME;
		const totp = TOTP;
		const expected = {
			id: 1,
			username: 'admin',
			type: 'admin',
			parent: null,
			numOfDescendants: 1,
			deltaBonus: 0,
			nickname: 'admin',
			greeting: null,
			statuses: {
				isBetable: true,
				isBlocked: false,
				isFundsable: true,
				isDepositable: true,
				isTeamBetable: true,
				isTeamBlocked: false,
				isDividendable: true,
				isWithdrawable: true,
				isTeamFundsable: true,
				isTeamDepositable: true,
				isTeamWithdrawable: true
			},
			ip: '211.23.162.10',
			geo: '台湾省中华电信(HiNet)数据中心',
			loginAt: '2019-08-30T02:59:36.516Z',
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/user").loginWithGoogleTOTP.mockImplementation(() => {
			return Promise.resolve(ACCOUNT);
		});

		request(app)
			.post("/api/v1/login?via=google-totp")
			.send({
				username,
				totp,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("POST /api/v1/login?via=google-totp 422 invalid body", (done) => {
		const username = "q";
		const totp = "a";
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.010.422",
			"fields": [
				"username",
				"totp"
			]
		};

		request(app)
			.post("/api/v1/login?via=google-totp")
			.send({
				username,
				totp,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
	it("POST /api/v1/login?via=google-totp 401 user is blocked", (done) => {
		const username = USERNAME;
		const totp = TOTP;
		const expected = {
			"type": "AuthenticationError",
			"message": "帐户被冻结",
			"code": "888.012.402"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			userProfile.statuses.isBlocked = true;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post("/api/v1/login?via=google-totp")
			.send({
				username,
				totp,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("POST /api/v1/login?via=google-totp 401 invalid username credentials", (done) => {
		const username = USERNAME;
		const totp = TOTP;
		const expected = {
			"type": "AuthenticationError",
			"message": "帐号或Google认证码错误",
			"code": "888.012.404"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.resolve(null);
		});

		request(app)
			.post("/api/v1/login?via=google-totp")
			.send({
				username,
				totp,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("POST /api/v1/login?via=google-totp 401 auth invalid password credentials", (done) => {
		const username = USERNAME;
		const totp = TOTP;
		const expected = {
			"type": "AuthenticationError",
			"message": "帐号或Google认证码错误",
			"code": "002.001.404"
		};

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/user").loginWithGoogleTOTP.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(AUTH_GOOGLE_LOGIN_INVALID_TOTP_CREDENTIALS.MESSAGE, AUTH_GOOGLE_LOGIN_INVALID_TOTP_CREDENTIALS.CODE));
		});

		request(app)
			.post("/api/v1/login?via=google-totp")
			.send({
				username,
				totp,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("POST /api/v1/login?via=google-totp 500 internal server error", (done) => {
		const username = USERNAME;
		const totp = TOTP;

		require("../../../../server/services/user").getUserByUsername.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post("/api/v1/login?via=google-totp")
			.send({
				username,
				totp,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});
