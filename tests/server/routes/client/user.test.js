const request = require("supertest");
const {
	cloneDeep,
} = require("lodash");
const {
	ENUM_USER_TYPE,
} = require("../../../../server/lib/enum");
const {
	AuthenticationError,
	ForbiddenError,
	ConflictError,
} = require("ljit-error");
const {
	ACCOUNT_INVALID_PASSWORD_CREDENTIALS,
	ACCOUNT_UNBIND_PASSWORD_CREDENTIALS,
	ACCOUNT_SECURITY_QUESTIONS_ALREADY_SET,
	ACCOUNT_UNBIND_TOTP_CREDENTIALS,
	ACCOUNT_INVALID_FUNDS_PASSWORD_CREDENTIALS,
	ACCOUNT_UNBIND_FUNDS_PASSWORD_CREDENTIALS,
	ACCOUNT_INVALID_TOTP_CREDENTIALS,
	ACCOUNT_GOOGLE_TOTP_CREDENTIALS_ALREADY_BOUND,
	ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED,
} = require("mj-service-sdks/error/code");
const {
	attachUserMethods,
} = require("../utils");

jest.mock("ljit-db/model");
jest.mock("../../../../server/services/platform");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/services/dividend");
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

const USER_PROFILE = attachUserMethods({
	"numOfDescendants": 2,
	"nickname": null,
	"greeting": null,
	"qq": null,
	"wechat": null,
	"phone": null,
	"statuses": {
		"isBlocked": false,
		"isBetabled": true,
		"isTeamBlocked": false,
		"isTeamBetabled": true,
	},
	"id": 13,
	"username": "test01",
	"type": ENUM_USER_TYPE.AGENT,
	"parent": "test01",
	"deltaBonus": 0,
	"createdBy": "admin",
	"updatedAt": "2019-08-09T11:43:17.578Z",
	"createdAt": "2019-08-09T11:43:17.578Z",
	"payer": "測試01",
});
const SESSION = {
	USER: {
		accountId: "5d4aea86e48b697af60c1201",
		id: 1,
		username: "admin",
		isBetCredentialsAuthenticated: true,
	},
};
const INTERNAL_SERVER_ERROR_MSG = "syntax error";
const PASSWORD = "p@123qwe";
const NICKNAME = "nickname";
const GREETING = "greeting";
const PASSWORD_MIN_MINUS_1 = "12345";
const PASSWORD_MAX_PLUS_1 = "1234567890abcdefghijk";
const NICKNAME_MIN_MINUS_1 = "";
const NICKNAME_MAX_PLUS_1 = "1234567890abcdefg";
const GREETING_MIN_MINUS_1 = "";
const GREETING_MAX_PLUS_1 = "1234567890abcdefg";
const ACCOUNT_INVALID_PASSWORD_CREDENTIALS_ERROR = {
	"type": "AuthenticationError",
	"message": "帐密错误",
	"code": "002.002.402"
};
const ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED_ERROR = {
	"type": "ForbiddenError",
	"message": "登入预设密码尚未更改",
	"code": "002.002.417",
};
const ACCOUNT_UNBIND_PASSWORD_CREDENTIALS_ERROR = {
	"type": "ForbiddenError",
	"message": "密码未绑定",
	"code": "002.002.403"
};
const UNPROCESSABLE_ENTITY_INVALID_PASSWORD = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.012.422",
	"fields": [
		"password",
	]
};
const UNPROCESSABLE_ENTITY_INVALID_NICKNAME = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.012.422",
	"fields": [
		"nickname",
	]
};
const UNPROCESSABLE_ENTITY_INVALID_GREETING = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.012.422",
	"fields": [
		"greeting",
	]
};

describe("/api/v1/users/id=me/nickname", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("PUT /api/v1/users/id=me/nickname 204 No Content", (done) => {
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(USER_PROFILE);
		});
		require("../../../../server/services/user").validateLoginPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").updateNicknameById.mockImplementation(() => {
			return Promise.resolve();
		});

		request(app)
			.put("/api/v1/users/id=me/nickname")
			.send({
				password: PASSWORD,
				nickname: NICKNAME,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});
	it("PUT /api/v1/users/id=me/nickname 401 Unauthorized, ACCOUNT_INVALID_PASSWORD_CREDENTIALS", (done) => {
		const expected = ACCOUNT_INVALID_PASSWORD_CREDENTIALS_ERROR;

		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(USER_PROFILE);
		});
		require("../../../../server/services/user").validateLoginPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(ACCOUNT_INVALID_PASSWORD_CREDENTIALS.MESSAGE, ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE));
		});

		request(app)
			.put("/api/v1/users/id=me/nickname")
			.send({
				password: PASSWORD,
				nickname: NICKNAME,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("PUT /api/v1/users/id=me/nickname 500 INTERNAL_SERVER_ERROR", (done) => {
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(USER_PROFILE);
		});
		require("../../../../server/services/user").validateLoginPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.put("/api/v1/users/id=me/nickname")
			.send({
				password: PASSWORD,
				nickname: NICKNAME,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
	it("PUT /api/v1/users/id=me/nickname 422 Unprocessable Entity, invalid password", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		request(app)
			.put("/api/v1/users/id=me/nickname")
			.send({
				password: PASSWORD_MIN_MINUS_1,
				nickname: NICKNAME,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
	it("PUT /api/v1/users/id=me/nickname 422 Unprocessable Entity, invalid password", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		request(app)
			.put("/api/v1/users/id=me/nickname")
			.send({
				password: PASSWORD_MAX_PLUS_1,
				nickname: NICKNAME,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
	it("PUT /api/v1/users/id=me/nickname 422 Unprocessable Entity, invalid nickname", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_NICKNAME;

		request(app)
			.put("/api/v1/users/id=me/nickname")
			.send({
				password: PASSWORD,
				nickname: NICKNAME_MIN_MINUS_1,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
	it("PUT /api/v1/users/id=me/nickname 422 Unprocessable Entity, invalid nickname", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_NICKNAME;

		request(app)
			.put("/api/v1/users/id=me/nickname")
			.send({
				password: PASSWORD,
				nickname: NICKNAME_MAX_PLUS_1,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
});

describe("/api/v1/users/id=me/greeting", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("PUT /api/v1/users/id=me/greeting 204 No Content", (done) => {
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(USER_PROFILE);
		});
		require("../../../../server/services/user").validateLoginPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").updateGreetingById.mockImplementation(() => {
			return Promise.resolve();
		});

		request(app)
			.put("/api/v1/users/id=me/greeting")
			.send({
				password: PASSWORD,
				greeting: GREETING,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});
	it("PUT /api/v1/users/id=me/greeting 401 Unauthorized, ACCOUNT_INVALID_PASSWORD_CREDENTIALS", (done) => {
		const expected = ACCOUNT_INVALID_PASSWORD_CREDENTIALS_ERROR;

		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(USER_PROFILE);
		});
		require("../../../../server/services/user").validateLoginPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(ACCOUNT_INVALID_PASSWORD_CREDENTIALS.MESSAGE, ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE));
		});

		request(app)
			.put("/api/v1/users/id=me/greeting")
			.send({
				password: PASSWORD,
				greeting: GREETING,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});
	it("PUT /api/v1/users/id=me/greeting 403 forbidden, ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED", (done) => {
		const expected = ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED_ERROR;

		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(USER_PROFILE);
		});
		require("../../../../server/services/user").validateLoginPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED.MESSAGE, ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED.CODE));
		});

		request(app)
			.put("/api/v1/users/id=me/greeting")
			.send({
				password: PASSWORD,
				greeting: GREETING,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("PUT /api/v1/users/id=me/greeting 500 INTERNAL_SERVER_ERROR", (done) => {
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(USER_PROFILE);
		});
		require("../../../../server/services/user").validateLoginPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.put("/api/v1/users/id=me/greeting")
			.send({
				password: PASSWORD,
				greeting: GREETING,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
	it("PUT /api/v1/users/id=me/greeting 422 Unprocessable Entity, invalid password", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		request(app)
			.put("/api/v1/users/id=me/greeting")
			.send({
				password: PASSWORD_MIN_MINUS_1,
				greeting: GREETING,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
	it("PUT /api/v1/users/id=me/greeting 422 Unprocessable Entity, invalid password", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		request(app)
			.put("/api/v1/users/id=me/greeting")
			.send({
				password: PASSWORD_MAX_PLUS_1,
				greeting: GREETING,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
	it("PUT /api/v1/users/id=me/greeting 422 Unprocessable Entity, invalid greeting", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_GREETING;

		request(app)
			.put("/api/v1/users/id=me/greeting")
			.send({
				password: PASSWORD,
				greeting: GREETING_MIN_MINUS_1,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
	it("PUT /api/v1/users/id=me/greeting 422 Unprocessable Entity, invalid greeting", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_GREETING;

		request(app)
			.put("/api/v1/users/id=me/greeting")
			.send({
				password: PASSWORD,
				greeting: GREETING_MAX_PLUS_1,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
});

describe("POST /api/v1/users/id=me/security-questions", () => {
	const SECURITY_QUESTIONS = [
		{
			id: 1,
			name: "題目",
		},
		{
			id: 2,
			name: "題目",
		},
		{
			id: 3,
			name: "題目",
		}
	];
	const SECURITY_QUESTIONS_WITH_ANSWER = [
		{
			id: 1,
			answer: "答案",
		},
		{
			id: 2,
			answer: "答案",
		},
		{
			id: 3,
			answer: "答案",
		}
	];

	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /api/v1/users/id=me/security-questions 201", (done) => {
		const password = PASSWORD;
		const data = SECURITY_QUESTIONS_WITH_ANSWER;
		const expected = SECURITY_QUESTIONS;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").setSecurityQuestionsByAccountId.mockImplementation(() => {
			return Promise.resolve(SECURITY_QUESTIONS);
		});

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});

	it("POST /api/v1/users/id=me/security-questions 401 Invalid password", (done) => {
		const password = PASSWORD;
		const data = SECURITY_QUESTIONS_WITH_ANSWER;
		const expected = ACCOUNT_INVALID_PASSWORD_CREDENTIALS_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(
				ACCOUNT_INVALID_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});

	it("POST /api/v1/users/id=me/security-questions 403 Funds password unbind", (done) => {
		const password = PASSWORD;
		const data = SECURITY_QUESTIONS_WITH_ANSWER;
		const expected = ACCOUNT_UNBIND_PASSWORD_CREDENTIALS_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("POST /api/v1/users/id=me/security-questions 409 Security questions already set", (done) => {
		const password = PASSWORD;
		const data = SECURITY_QUESTIONS_WITH_ANSWER;
		const expected = {
			type: "ConflictError",
			message: "安全问题已设定",
			code: "002.002.412",
		};

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").setSecurityQuestionsByAccountId.mockImplementation(() => {
			return Promise.reject(new ConflictError(
				ACCOUNT_SECURITY_QUESTIONS_ALREADY_SET.MESSAGE,
				ACCOUNT_SECURITY_QUESTIONS_ALREADY_SET.CODE
			));
		});

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(409, expected, done);
	});

	it("POST /api/v1/users/id=me/security-questions 422 Invalid password format", (done) => {
		const password = "0000";
		const data = SECURITY_QUESTIONS_WITH_ANSWER;
		const expected = {
			type: "RequestValidationError",
			message: "输入格式错误",
			code: "888.012.422",
			fields: ["password"],
		};

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/users/id=me/security-questions 422 Invalid data format (array length)", (done) => {
		const password = PASSWORD;
		const data = [
			{
				id: 1,
				answer: "答案",
			},
			{
				id: 2,
				answer: "答案",
			}
		];
		const expected = {
			type: "RequestValidationError",
			message: "输入格式错误",
			code: "888.012.422",
			fields: ["data"],
		};

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/users/id=me/security-questions 422 Invalid data format (duplicate id)", (done) => {
		const password = PASSWORD;
		const data = [
			{
				id: 1,
				answer: "答案",
			},
			{
				id: 1,
				answer: "答案",
			},
			{
				id: 3,
				answer: "答案",
			}
		];
		const expected = {
			type: "RequestValidationError",
			message: "输入格式错误",
			code: "888.012.422",
			fields: ["data"],
		};

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/users/id=me/security-questions 422 Invalid data format (id & answer)", (done) => {
		const password = PASSWORD;
		const data = [
			{
				id: "a",
				answer: "123456789012345678901234567890123",
			},
			{
				id: 2,
				answer: "答案",
			},
			{
				id: 3,
				answer: "答案",
			}
		];
		const expected = {
			type: "RequestValidationError",
			message: "输入格式错误",
			code: "888.012.422",
			fields: ["data[0].id", "data[0].answer"],
		};

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/users/id=me/security-questions 500 Invalid server error", (done) => {
		const password = PASSWORD;
		const data = SECURITY_QUESTIONS_WITH_ANSWER;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post("/api/v1/users/id=me/security-questions")
			.send({
				password,
				data,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("PUT /api/v1/users/id=me/dividend-settings/type=template, validateRequestPayload", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("422, invalid body: amount out of range: 0", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 0, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 3, "ratio": 21 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: amount out of range: 100000001", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 100000001, "ratio": 21 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: ratio out of range: -1", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 1, "ratio": -1 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 3, "ratio": 21 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: ratio out of range: 100", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 3, "ratio": 100 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: ratio out of range: precision", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 3, "ratio": 21.333 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: out of range: 0 items", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: out of range: 16 items", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 3, "ratio": 21.3 },
				{ "amount": 4, "ratio": 19 },
				{ "amount": 5, "ratio": 20 },
				{ "amount": 6, "ratio": 21.3 },
				{ "amount": 7, "ratio": 19 },
				{ "amount": 8, "ratio": 20 },
				{ "amount": 9, "ratio": 21.3 },
				{ "amount": 10, "ratio": 19 },
				{ "amount": 11, "ratio": 20 },
				{ "amount": 12, "ratio": 21.3 },
				{ "amount": 13, "ratio": 19 },
				{ "amount": 14, "ratio": 20 },
				{ "amount": 15, "ratio": 21.3 },
				{ "amount": 16, "ratio": 20 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: not array", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send({})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: not sorted amount", (done) => {
		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 3, "ratio": 20 },
				{ "amount": 2, "ratio": 21.3 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
});

describe("PUT /api/v1/users/id=me/dividend-settings/type=template, handleUpdateTemplateDividendSettingsRequest", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});


	it("201, successfully update template dividend settings", (done) => {
		const expected = [
			{
				"amount": 1,
				"ratio": 19,
			},
			{
				"amount": 2,
				"ratio": 20,
			},
			{
				"amount": 100000000,
				"ratio": 21,
			}
		];

		require("../../../../server/services/dividend").upsertTemplateDividendSettingsByUserIdAndDividendSettings.mockImplementationOnce(() => {
			return Promise.resolve(expected);
		});

		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 100000000, "ratio": 21 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});

	it("500, stores fail", (done) => {
		require("../../../../server/services/dividend").upsertTemplateDividendSettingsByUserIdAndDividendSettings.mockImplementationOnce(() => {
			throw new Error();
		});

		request(app)
			.put("/api/v1/users/id=me/dividend-settings/type=template")
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 3, "ratio": 21 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe('DELETE /api/v1/users/id=me/login-geo-validation', () => {
	jest.mock('../../../../server/session');
	let app;

	beforeEach(() => {
		require('../../../../server/session').mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require('../../../../server/client');
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('200, Disable login geo validation successfully', (done) => {
		const payer = 'jojo';
		const profile = {
			payer: "jojo",
			isBlocked: () => false
		};
		const expected = {};

		require('../../../../server/services/user').getUserById.mockImplementationOnce(() => {
			return Promise.resolve(profile);
		});
		require('../../../../server/services/user').disableLoginGeoValidationByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.delete('/api/v1/users/id=me/login-geo-validation')
			.send({ payer })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});

	it('422, Invalid request body payer', (done) => {
		const payer = '123';
		const expected = {
			type: 'RequestValidationError',
			message: '输入格式错误',
			code: '888.012.422',
			fields: [
				'payer',
			],
		};

		request(app)
			.delete('/api/v1/users/id=me/login-geo-validation')
			.send({ payer })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it('500, Invalid server error', (done) => {
		const payer = 'jojo';
		const profile = {
			payer: "jojo",
			isBlocked: () => false
		};

		require('../../../../server/services/user').getUserById.mockImplementationOnce(() => {
			return Promise.resolve(profile);
		});
		require('../../../../server/services/user').disableLoginGeoValidationByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.delete('/api/v1/users/id=me/login-geo-validation')
			.send({ payer })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe('DELETE /api/v1/users/id=me/google-totp', () => {
	jest.mock('../../../../server/session');
	let app;

	beforeEach(() => {
		require('../../../../server/session').mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require('../../../../server/client');
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('200, Disable google totp successfully with invalid totp', (done) => {
		const totp = '123456';
		const expected = {};

		require('../../../../server/services/user').disableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.delete('/api/v1/users/id=me/google-totp')
			.send({ totp })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});

	it('401, Invalid totp', (done) => {
		const totp = '123456';
		const expected = {
			type: 'AuthenticationError',
			message: '谷歌验证码错误',
			code: '002.002.406',
		};

		require('../../../../server/services/user').disableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new AuthenticationError(
				ACCOUNT_INVALID_TOTP_CREDENTIALS.MESSAGE,
				ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE
			));
		});

		request(app)
			.delete('/api/v1/users/id=me/google-totp')
			.send({ totp })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});

	it('403, User Unbind totp', (done) => {
		const totp = '123456';
		const expected = {
			type: 'ForbiddenError',
			message: '谷歌验证码未绑定',
			code: '002.002.405',
		};

		require('../../../../server/services/user').disableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_UNBIND_TOTP_CREDENTIALS.MESSAGE,
				ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE
			));
		});

		request(app)
			.delete('/api/v1/users/id=me/google-totp')
			.send({ totp })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it('422, Invalid request body totp', (done) => {
		const totp = 'abc123';
		const expected = {
			type: 'RequestValidationError',
			message: '输入格式错误',
			code: '888.012.422',
			fields: [
				'totp',
			],
		};

		request(app)
			.delete('/api/v1/users/id=me/google-totp')
			.send({ totp })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it('500, Internal server error', (done) => {
		const totp = '123456';

		require('../../../../server/services/user').disableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.delete('/api/v1/users/id=me/google-totp')
			.send({ totp })
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});


describe('POST /api/v1/users/id=me/login-geo-validation', () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('201, enable login geo validation successfully', (done) => {
		const userProfile = cloneDeep(USER_PROFILE);
		const expected = {};

		require('../../../../server/services/user').getUserById.mockImplementationOnce(() => {
			return Promise.resolve(userProfile);
		});
		require('../../../../server/services/user').enableLoginGeoValidationByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.post('/api/v1/users/id=me/login-geo-validation')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});

	it('403, user unbind payer', (done) => {
		const userProfile = cloneDeep(USER_PROFILE);

		userProfile.payer = null;

		const expected = {
			type: 'ForbiddenError',
			message: '请先绑定银行卡',
			code: '888.012.435'
		};

		require('../../../../server/services/user').getUserById.mockImplementationOnce(() => {
			return Promise.resolve(userProfile);
		});
		require('../../../../server/services/user').enableLoginGeoValidationByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.post('/api/v1/users/id=me/login-geo-validation')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it('500, Invalid server error', (done) => {
		const userProfile = cloneDeep(USER_PROFILE);

		require('../../../../server/services/user').getUserById.mockImplementationOnce(() => {
			return Promise.resolve(userProfile);
		});
		require('../../../../server/services/user').enableLoginGeoValidationByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post('/api/v1/users/id=me/login-geo-validation')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("POST /api/v1/users/id=me/google-totp", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /api/v1/users/id=me/google-totp 201 created", (done) => {
		const body = {
			"password": PASSWORD,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": "123456"
		};

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, done);
	});

	it("POST /api/v1/users/id=me/google-totp 401 invalid funds password credentials", (done) => {
		const body = {
			"password": PASSWORD,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": "123456"
		};
		const expected = {
			"type": "AuthenticationError",
			"message": "资金密码错误",
			"code": "002.002.413"
		};

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new AuthenticationError(
				ACCOUNT_INVALID_FUNDS_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_INVALID_FUNDS_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});

	it("POST /api/v1/users/id=me/google-totp 403 unbind funds password credentials", (done) => {
		const body = {
			"password": PASSWORD,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": "123456"
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "资金密码未绑定",
			"code": "002.002.414"
		};

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_UNBIND_FUNDS_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_UNBIND_FUNDS_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("POST /api/v1/users/id=me/google-totp 403 invalid google totp credentials", (done) => {
		const body = {
			"password": PASSWORD,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": "123456"
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "谷歌验证码错误",
			"code": "002.002.406"
		};

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_INVALID_TOTP_CREDENTIALS.MESSAGE,
				ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE
			));
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("POST /api/v1/users/id=me/google-totp 409 google totp credentials already bound", (done) => {
		const body = {
			"password": PASSWORD,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": "123456"
		};
		const expected = {
			"type": "ConflictError",
			"message": "谷歌验证码已绑定",
			"code": "002.002.407"
		};

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new ConflictError(
				ACCOUNT_GOOGLE_TOTP_CREDENTIALS_ALREADY_BOUND.MESSAGE,
				ACCOUNT_GOOGLE_TOTP_CREDENTIALS_ALREADY_BOUND.CODE
			));
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(409, expected, done);
	});

	it("POST /api/v1/users/id=me/google-totp 422 invalid password (min)", (done) => {
		const body = {
			"password": PASSWORD_MIN_MINUS_1,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": "123456"
		};
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/users/id=me/google-totp 422 invalid password (max)", (done) => {
		const body = {
			"password": PASSWORD_MAX_PLUS_1,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": "123456"
		};
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/users/id=me/google-totp 422 invalid google totp secrect", (done) => {
		const invalidSecrect = "GZYHM5BSMM5FIV3LONLWI43JLJ5HCVT";
		const body = {
			"password": PASSWORD,
			"secret": invalidSecrect,
			"totp": "123456"
		};
		const expected = {
			type: 'RequestValidationError',
			message: '输入格式错误',
			code: '888.012.422',
			fields: [
				'secret'
			]
		};

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/users/id=me/google-totp 422 invalid google totp", (done) => {
		const invalidTOTP = "123qwe";
		const body = {
			"password": PASSWORD,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": invalidTOTP
		};
		const expected = {
			type: 'RequestValidationError',
			message: '输入格式错误',
			code: '888.012.422',
			fields: [
				'totp'
			]
		};

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.resolve();
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/users/id=me/google-totp 500 internal server error", (done) => {
		const body = {
			"password": PASSWORD,
			"secret": "GZYHM5BSMM5FIV3L",
			"totp": "123456"
		};

		require("../../../../server/services/user").enableGoogleTOTPByAccountId.mockImplementationOnce(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.post("/api/v1/users/id=me/google-totp")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("GET /api/v1/users/id=me/lotteries", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('GET /api/v1/users/id=me/lotteries 200 Success', (done) => {
		const lotteryIds = [1, 2, 3];
		const expected = lotteryIds;

		require('../../../../server/services/user').getFavoriteLotteryIdsByUserId.mockImplementation(() => {
			return Promise.resolve(lotteryIds);
		});

		request(app)
			.get("/api/v1/users/id=me/lotteries")
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, expected, done);
	});

	it('GET /api/v1/users/id=me/lotteries 500 Internal server error', (done) => {
		require('../../../../server/services/user').getFavoriteLotteryIdsByUserId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.get("/api/v1/users/id=me/lotteries")
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("PUT /api/v1/users/id=me/lotteries", () => {
	jest.mock("../../../../server/session");
	let app;

	beforeEach(() => {
		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = SESSION.USER;

				next();
			};
		});

		app = require("../../../../server/client");
	});

	afterEach(() => {
		jest.resetModules();
	});

	it('PUT /api/v1/users/id=me/lotteries 204 Success', (done) => {
		const body = [1, 2, 3];

		require('../../../../server/services/user').setFavoriteLotteryIdsByUserId.mockImplementation(() => {
			return Promise.resolve();
		});

		request(app)
			.put("/api/v1/users/id=me/lotteries")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});

	it('PUT /api/v1/users/id=me/lotteries 422 Invalid payload (too many lotteryId)', (done) => {
		const body = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101];

		request(app)
			.put("/api/v1/users/id=me/lotteries")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});

	it('PUT /api/v1/users/id=me/lotteries 422 Invalid payload (duplicate lotteryId)', (done) => {
		const body = [1, 2, 1];

		request(app)
			.put("/api/v1/users/id=me/lotteries")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});

	it('PUT /api/v1/users/id=me/lotteries 422 Invalid payload (invalid lotteryId)', (done) => {
		const body = [1, 2, "a"];

		request(app)
			.put("/api/v1/users/id=me/lotteries")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});

	it('PUT /api/v1/users/id=me/lotteries 500 Internal server error', (done) => {
		const body = [1, 2, 3];

		require('../../../../server/services/user').setFavoriteLotteryIdsByUserId.mockImplementation(() => {
			return Promise.reject(new Error(INTERNAL_SERVER_ERROR_MSG));
		});

		request(app)
			.put("/api/v1/users/id=me/lotteries")
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});
