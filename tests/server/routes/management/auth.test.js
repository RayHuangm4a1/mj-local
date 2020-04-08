const request = require("supertest");
const {
	cloneDeep,
} = require("lodash");

jest.mock("ljit-db/model");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/services/platform");
jest.mock("../../../../server/services/staff.admin")
jest.mock("../../../../server/models/user", () => { return {}; });
jest.mock("../../../../server/models/user-bank-card", () => { return {}; });
jest.mock("../../../../server/models/bank-account-level", () => { return {}; });
jest.mock("../../../../server/models/user-bank-card", () => { return {}; });
jest.mock("../../../../server/models/deposit-application-form", () => { return {}; });
jest.mock("../../../../server/models/transaction-log", () => { return {}; });
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
	ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED,
} = require("mj-service-sdks/error/code");
const {
	ACCOUNT,
	USERNAME,
	PASSWORD,
	STAFF_ADMIN_PROFILE,
	INTERNAL_SERVER_ERROR_MSG,
} = require("../__mocks__/staff");
const {
	attachStaffMethods,
} = require("../utils");
const {
	ENUM_STAFF_STATUS,
} = require("../../../../server/lib/enum");

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

describe("/api/v1/login", () => {
	const RESPONSES = {
		SUCCESS: {
			id: 1,
			username: 'admin',
			status: 1,
			ip: '211.23.162.10',
			geo: '台湾省中华电信(HiNet)数据中心',
			loginAt: '2019-08-30T02:59:36.516Z'
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
		STAFF_IS_BLOCKED: {
			"type": "AuthenticationError",
			"message": "帐户被停用",
			"code": "888.009.403"
		},
		INVALID_USERNAME_CREDENTIALS: {
			"type": "AuthenticationError",
			"message": "帐密错误",
			"code": "888.009.404"
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
		DEFAULT_LOGIN_PASSWORD_NOT_CHANGED: {
			"type": "ForbiddenError",
			"message": "登入预设密码尚未更改",
			"code": "002.002.417",
		},
	};

	let app;

	let staffProfile;

	beforeEach(() => {
		require("../../../../server/passport").setManagementLoginStrategies();
		staffProfile = attachStaffMethods(cloneDeep(STAFF_ADMIN_PROFILE));

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});

		app = require("../../../../server/management");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it.skip("POST /api/v1/login 201 created", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.SUCCESS;

		require("../../../../server/services/staff.admin").getStaffByUsername.mockImplementation(() => {
			return Promise.resolve(staffProfile);
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
		const expected = RESPONSES.STAFF_IS_BLOCKED;

		require("../../../../server/services/staff.admin").getStaffByUsername.mockImplementation(() => {
			staffProfile.status = ENUM_STAFF_STATUS.BLOCKED;

			return Promise.resolve(staffProfile);
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

		require("../../../../server/services/staff.admin").getStaffByUsername.mockImplementation(() => {
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
	it.skip("POST /api/v1/login 401 auth invalid username credentials", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.AUTH_INVALID_USERNAME_CREDENTIALS;

		require("../../../../server/services/staff.admin").getStaffByUsername.mockImplementation(() => {
			return Promise.resolve(staffProfile);
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
	it.skip("POST /api/v1/login 401 auth invalid password credentials", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.AUTH_INVALID_PASSWORD_CREDENTIALS;

		require("../../../../server/services/staff.admin").getStaffByUsername.mockImplementation(() => {
			return Promise.resolve(staffProfile);
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
	it.skip("POST /api/v1/login 403 default password not changed", (done) => {
		const username = USERNAME;
		const password = PASSWORD;
		const expected = RESPONSES.DEFAULT_LOGIN_PASSWORD_NOT_CHANGED;

		require("../../../../server/services/staff.admin").getStaffByUsername.mockImplementation(() => {
			return Promise.resolve(staffProfile);
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

		require("../../../../server/services/staff.admin").getStaffByUsername.mockImplementation(() => {
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
