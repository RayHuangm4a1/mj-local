const request = require("supertest");
const {
	cloneDeep,
} = require("lodash");
const {
	ENUM_USER_TYPE,
	ENUM_DIVIDEND_STATUS,
	ENUM_FINANCIAL_LEVEL_ID,
} = require("../../../../server/lib/enum");
const {
	attachUserMethods,
} = require("../utils");
const {
	AuthenticationError,
	ForbiddenError,
	NotFoundError,
} = require("ljit-error");
const {
	ACCOUNT_INVALID_PASSWORD_CREDENTIALS,
	ACCOUNT_UNBIND_PASSWORD_CREDENTIALS,
} = require("mj-service-sdks/error/code");
const {
	USER_TEST01_PROFILE,
} = require("../__mocks__/user");
const {
	TEAM_DURATION_STATS_TEST0301,
} = require("../__mocks__/team-duration-stats");
const {
	getProfitInDecimal,
} = require("../../../../server/lib/stats-helpers/grant-children-dividends-helper");
const {
	DIVIDEND_INSUFFICIENT_BALANCE,
	WALLET_NOT_FOUND,
	TRACE_NOT_FOUND,
	BETTING_NOT_FOUND,
} = require("../../../../server/lib/error/code");

jest.mock("ljit-db/model");
jest.mock("../../../../server/services/platform");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/services/platform");
jest.mock("../../../../server/services/stats");
jest.mock("../../../../server/services/dividend");
jest.mock("../../../../server/services/betting");
jest.mock("../../../../server/models/user", () => { return {}; });
jest.mock("../../../../server/models/relationship", () => { return {}; });
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

const CHILDREN_ID = 13;
const VALID_FIXED_WAGE = 1.4;
const INVALID_FIXED_WAGE = 101;
const INVALID_FIXED_WAGE_IN_WHITELIST = 1.5;
const PLATFORM = {
	"id": 1,
	"fixedWages": [2.00, 1.80, 1.60, 1.40, 1.20],
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
};
const CHILDREN = {
	"accountId": "5d4aea86e48b697af60c1211",
	"statuses": {
		"isBlocked": false,
		"isBetabled": true,
		"isTeamBlocked": false,
		"isTeamBetabled": true,
	},
	"username": "test01",
	"createdAt": "2019-08-08T02:14:59.657Z",
	"updatedAt": "2019-08-08T02:14:59.657Z"
};
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
const PARENT_PROFILE = attachUserMethods({
	"nickname": null,
	"greeting": null,
	"qq": null,
	"wechat": null,
	"phone": null,
	"statuses": {
		"isBetable": true,
		"isBlocked": false,
		"isFundsable": true,
		"isDepositable": true,
		"isTeamBetable": true,
		"isTeamBlocked": false,
		"isDividendable": true,
		"isWithdrawable": true,
		"isTeamFundsable": true,
		"isTeamDepositable": true,
		"isTeamWithdrawable": true
	},
	"id": 12,
	"username": "test01",
	"type": ENUM_USER_TYPE.AGENT,
	"parent": "test01",
	"deltaBonus": 0,
	"fixedWage": 1.8,
	"createdBy": "admin",
	"updatedAt": "2019-08-09T11:43:17.578Z",
	"createdAt": "2019-08-09T11:43:17.578Z"
});
const CHILDREN_PROFILE = {
	"numOfDescendants": 1,
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
	"id": 4,
	"username": "test0301",
	"type": ENUM_USER_TYPE.AGENT,
	"parent": "test01",
	"deltaBonus": 0,
	"createdBy": "test01",
	"levelId": ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
	"updatedAt": "2019-08-09T11:43:17.578Z",
	"createdAt": "2019-08-09T11:43:17.578Z"
};
const CHILD_USERNAME = "test0301";
const CHILD_PASSWORD = "123qwe";
const CHILDREN_FIXED_WAGE_PROFILE = attachUserMethods({
	"id": 4,
	"fixedWage": 1.2,
});
const PARENT_WITH_CHILD_PROFILE = attachUserMethods({
	"nickname": null,
	"greeting": null,
	"qq": null,
	"wechat": null,
	"phone": null,
	"statuses": {
		"isBetable": true,
		"isBlocked": false,
		"isFundsable": true,
		"isDepositable": true,
		"isTeamBetable": true,
		"isTeamBlocked": false,
		"isDividendable": true,
		"isWithdrawable": true,
		"isTeamFundsable": true,
		"isTeamDepositable": true,
		"isTeamWithdrawable": true
	},
	"id": 12,
	"username": "test01",
	"type": ENUM_USER_TYPE.AGENT,
	"parent": "test01",
	"deltaBonus": 0,
	"fixedWage": 1.8,
	"createdBy": "admin",
	"updatedAt": "2019-08-09T11:43:17.578Z",
	"createdAt": "2019-08-09T11:43:17.578Z",
	"descendants": [
		{
			"id": 13,
			"fixedWage": 1.2,
		}
	],
});
const SESSION = {
	USER: {
		accountId: "5d4aea86e48b697af60c1201",
		id: 12,
		username: "test01",
		isBetCredentialsAuthenticated: true,
	},
};
const BETTING = {
	"id": 5,
	"userId": 3,
	"username": "test01",
	"walletCode": 100,
	"type": 1,
	"traceId": 0,
	"lotteryClassId": 0,
	"lotteryId": 12,
	"lotteryName": "东京1.5分彩",
	"playId": 79,
	"unit": 2,
	"awards": {
		"中奖": {
			"pk": {
				"count": 0,
				"isEnabled": false
			},
			"numerator": 1,
			"deltaBonus": 0,
			"denominator": 10
		}
	},
};
const UNPROCESSABLE_ENTITY_INVALID_FIXED_WAGE = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.015.422",
	"fields": [
		"fixedWage",
	]
};
const TEAM_CHILDREN_NOT_FOUND_ERROR = {
	"type":"NotFoundError",
	"message":"此用户不属于直属下级",
	"code":"888.015.404"
};
const FIXED_WAGE_INPUT_NOT_IN_WHITELIST_ERROR = {
	"type": "ForbiddenError",
	"message": "非法固定工资",
	"code": "888.015.423"
};
const FIXED_WAGE_INPUT_LESS_THAN_EQUAL_CURRENT_ERROR = {
	"type": "ForbiddenError",
	"message": "设置低于目前固定工资",
	"code": "888.015.424"
};
const FIXED_WAGE_INPUT_GREATER_THAN_PARENT_ERROR = {
	"type": "ForbiddenError",
	"message": "下级固定工资不可高于上级",
	"code": "888.015.425"
};
const INTERNAL_SERVER_ERROR_MSG = "syntax error";
const VALID_WALLET_CODE = 100;
const VALID_AMOUNT = 50000000;
const VALID_PASSWORD = "123qwe";
const INVALID_WALLET_CODE = 99;
const INVALID_AMOUNT_MIN = 0.00009;
const INVALID_AMOUNT_MAX = 100000001;
const INVALID_PASSWORD_MIN = "123qw";
const INVALID_PASSWORD_MAX = "1234567890abcdefghijk";
const ACCOUNT_INVALID_PASSWORD_CREDENTIALS_ERROR = {
	"type": "AuthenticationError",
	"message": "帐密错误",
	"code": "002.002.402"
};
const ACCOUNT_UNBIND_PASSWORD_CREDENTIALS_ERROR = {
	"type": "ForbiddenError",
	"message": "密码未绑定",
	"code": "002.002.403"
};
const UNPROCESSABLE_ENTITY_INVALID_WALLET_CODE = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.015.422",
	"fields": [
		"walletCode"
	]
};
const UNPROCESSABLE_ENTITY_INVALID_AMOUNT = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.015.422",
	"fields": [
		"amount"
	]
};
const UNPROCESSABLE_ENTITY_INVALID_PASSWORD = {
	"type": "RequestValidationError",
	"message": "输入格式错误",
	"code": "888.015.422",
	"fields": [
		"password"
	]
};
const USER_PROFILE_NOT_FOUND_ERROR = {
	"type": "NotFoundError",
	"message": "用户不存在",
	"code": "888.012.404"
};
const USER_IS_BLOCKED_ERROR = {
	"type": "ForbiddenError",
	"message": "帐户被冻结",
	"code": "888.012.402"
};
const USER_IS_FORBIDDEN_ERROR = {
	"type": "ForbiddenError",
	"message": "用户无此权限",
	"code": "888.012.405"
};
const PREVIOUS_DIVIDEND_DURATION_NOT_FOUND_ERROR = {
	"type": "ForbiddenError",
	"message": "上一分红周期不存在",
	"code": "888.015.426"
};
const TEAM_DURATION_STATS_NOT_FOUND_ERROR = {
	"type": "ForbiddenError",
	"message": "分红统计资料不存在",
	"code": "888.015.427"
};
const DIVIDEND_STATUS_IS_INVALID_ERROR = {
	"type": "ForbiddenError",
	"message": "分红状态不符合发放资格",
	"code": "888.015.428"
};
const DIVIDEND_EXCEEDED_PROFIT_ERROR = {
	"type": "ForbiddenError",
	"message": "发放分红超过团队亏损金额",
	"code": "888.015.429"
};
const DIVIDEND_INSUFFICIENT_BALANCE_ERROR = {
	"type": "ForbiddenError",
	"message": "钱包余额不足, 无法发放分红",
	"code": "888.015.430"
};
const WALLET_NOT_FOUND_ERROR = {
	"type":"NotFoundError",
	"message":"钱包不存在",
	"code":"888.008.404"
};
const FORBIDDEN_ERROR = {
	"type":"ForbiddenError",
	"message":"非法奖金号",
	"code":"888.012.403"
};

describe("/api/v1/teams/leaderId=me/children/id=:childrenId/fixed-wage", () => {
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

	it("PUT /api/v1/teams/leaderId=me/children/id=:childrenId/fixed-wage, 204 No Content", (done) => {
		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(PARENT_WITH_CHILD_PROFILE);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/fixed-wage`)
			.send({
				fixedWage: VALID_FIXED_WAGE,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});

	it(`PUT /api/v1/teams/leaderId=me/children/id=:childrenId/fixed-wage, 422 invalid body, Fixed wage = ${INVALID_FIXED_WAGE}`, (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_FIXED_WAGE;

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/fixed-wage`)
			.send({
				fixedWage: INVALID_FIXED_WAGE,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("PUT /api/v1/teams/leaderId=me/children/id=:childrenId/fixed-wage, 404 NotFoundError, Team children not found", (done) => {
		const expected = TEAM_CHILDREN_NOT_FOUND_ERROR;

		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(null);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/fixed-wage`)
			.send({
				fixedWage: VALID_FIXED_WAGE,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it(`PUT /api/v1/teams/leaderId=me/children/id=:childrenId/fixed-wage, 403 ForbiddenError, Fixed wage input ${INVALID_FIXED_WAGE_IN_WHITELIST} not in whitelist [${PLATFORM.fixedWages}]`, (done) => {
		const expected = FIXED_WAGE_INPUT_NOT_IN_WHITELIST_ERROR;

		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(PARENT_WITH_CHILD_PROFILE);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/fixed-wage`)
			.send({
				fixedWage: INVALID_FIXED_WAGE_IN_WHITELIST,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it(`PUT /api/v1/teams/leaderId=me/children/id=:childrenId/fixed-wage, 403 ForbiddenError, Fixed wage input ${VALID_FIXED_WAGE} less than equal current 1.6`, (done) => {
		const expected = FIXED_WAGE_INPUT_LESS_THAN_EQUAL_CURRENT_ERROR;
		const parent = cloneDeep(PARENT_WITH_CHILD_PROFILE);

		parent.descendants[0].fixedWage = 1.6;

		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(parent);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/fixed-wage`)
			.send({
				fixedWage: VALID_FIXED_WAGE,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it(`PUT /api/v1/teams/leaderId=me/children/id=:childrenId/fixed-wage, 403 ForbiddenError, Fixed wage input ${VALID_FIXED_WAGE} greater than parent 1.0`, (done) => {
		const expected = FIXED_WAGE_INPUT_GREATER_THAN_PARENT_ERROR;
		const parent = cloneDeep(PARENT_WITH_CHILD_PROFILE);

		parent.fixedWage = 1.0;

		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(parent);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/fixed-wage`)
			.send({
				fixedWage: VALID_FIXED_WAGE,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("PUT /api/v1/teams/leaderId=me/children/id=:childrenId/fixed-wage, 500 INTERNAL_SERVER_ERROR", (done) => {
		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(PARENT_WITH_CHILD_PROFILE);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});
		require("../../../../server/services/user").updateFixedWageByIdAndFixedWage.mockImplementationOnce(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/fixed-wage`)
			.send({
				fixedWage: VALID_FIXED_WAGE,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("/api/v1/teams/leaderId=me/children/id=:childrenId/dividends, validateRequestPayload", () => {
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

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 422, empty walletCode", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_WALLET_CODE;

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode:"",
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 422, empty amount", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_AMOUNT;

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: "",
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 422, empty password", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: ""
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 422, inivalid wallet code", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_WALLET_CODE;

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: INVALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 422, inivalid amount(min limit)", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_AMOUNT;

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: INVALID_AMOUNT_MIN,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 422, inivalid amount(max limit)", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_AMOUNT;

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: INVALID_AMOUNT_MAX,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 422, inivalid password(min limit)", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: INVALID_PASSWORD_MIN
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 422, inivalid password(max limit)", (done) => {
		const expected = UNPROCESSABLE_ENTITY_INVALID_PASSWORD;

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: INVALID_PASSWORD_MAX
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
});

describe("/api/v1/teams/leaderId=me/children/id=:childrenId/dividends, authenticateFundsPassword", () => {
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
	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 401, Account invalid password", (done) => {
		const expected = ACCOUNT_INVALID_PASSWORD_CREDENTIALS_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new AuthenticationError(
				ACCOUNT_INVALID_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(401, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 403, Funds password unbind", (done) => {
		const expected = ACCOUNT_UNBIND_PASSWORD_CREDENTIALS_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.MESSAGE,
				ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.CODE
			));
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends 500, Internal server error", (done) => {
		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends, validateIsTeamChildren", () => {
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

	it("404, team children not found", (done) => {
		const expected = TEAM_CHILDREN_NOT_FOUND_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(false);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});
	it("500, Internal server error", (done) => {
		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends, prepareActiveUserProfile", () => {
	jest.mock("../../../../server/session");
	let app;

	let userProfile;

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(USER_TEST01_PROFILE));

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

	it("404, user profile not found", (done) => {
		const expected = USER_PROFILE_NOT_FOUND_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(null);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});
	it("403, user is blocked", (done) => {
		const expected = USER_IS_BLOCKED_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			userProfile.statuses.isBlocked = true;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("500, Internal server error", (done) => {
		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends, validateUserProfileType", () => {
	jest.mock("../../../../server/session");
	let app;

	let userProfile;

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(USER_TEST01_PROFILE));

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

	it("403, user type is MEMBER", (done) => {
		const expected = USER_IS_FORBIDDEN_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			userProfile.type = ENUM_USER_TYPE.MEMBER;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("403, user type is DIRECT_CUSTOMER", (done) => {
		const expected = USER_IS_FORBIDDEN_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			userProfile.type = ENUM_USER_TYPE.DIRECT_CUSTOMER;

			return Promise.resolve(userProfile);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
});

describe("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends, preparePlatform", () => {
	jest.mock("../../../../server/session");
	let app;

	let userProfile;

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(USER_TEST01_PROFILE));

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

	it("500, Internal server error", (done) => {
		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends, preparePreviousDividendDuration", () => {
	jest.mock("../../../../server/session");
	let app;

	let userProfile;
	const platform = {
		id: 1,
		dividendDuration: "half_month",
	};

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(USER_TEST01_PROFILE));

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

	it("403, previous dividend duration not found", (done) => {
		const expected = PREVIOUS_DIVIDEND_DURATION_NOT_FOUND_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(null);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("500, Internal server error", (done) => {
		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends, prepareGrantableTeamDurationStatsId", () => {
	jest.mock("../../../../server/session");
	let app;

	let userProfile;

	let teamDurationStats;
	const platform = {
		id: 1,
		dividendDuration: "half_month",
	};
	const dividendDuration = { id: 1 };

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(USER_TEST01_PROFILE));
		teamDurationStats = cloneDeep(TEAM_DURATION_STATS_TEST0301);

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

	it("403, team duration stats not found", (done) => {
		const expected = TEAM_DURATION_STATS_NOT_FOUND_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			return Promise.resolve(null);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("403, dividend status is NOT_SET", (done) => {
		const expected = DIVIDEND_STATUS_IS_INVALID_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.NOT_SET;

			return Promise.resolve(teamDurationStats);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("403, dividend status is NOT_QUALIFIED", (done) => {
		const expected = DIVIDEND_STATUS_IS_INVALID_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.NOT_QUALIFIED;

			return Promise.resolve(teamDurationStats);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("403, dividend status is FULL_GRANTED", (done) => {
		const expected = DIVIDEND_STATUS_IS_INVALID_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.FULL_GRANTED;

			return Promise.resolve(teamDurationStats);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("403, dividend status is TEAM_WIN", (done) => {
		const expected = DIVIDEND_STATUS_IS_INVALID_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.TEAM_WIN;

			return Promise.resolve(teamDurationStats);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("403, dividend exceeded profit", (done) => {
		const expected = DIVIDEND_EXCEEDED_PROFIT_ERROR;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.NOT_GRANTED;

			return Promise.resolve(teamDurationStats);
		});

		let amount = getProfitInDecimal(teamDurationStats)
			.abs()
			.add(0.0001);

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("500, Internal server error", (done) => {
		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount: VALID_AMOUNT,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("POST /api/v1/teams/leaderId=me/children/id=:childrenId/dividends, handleGrantDividendsBelongToChildrenRequest", () => {
	jest.mock("../../../../server/session");
	let app;

	let userProfile;

	let teamDurationStats;
	const platform = {
		id: 1,
		dividendDuration: "half_month",
	};
	const dividendDuration = { id: 1 };

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(USER_TEST01_PROFILE));
		teamDurationStats = cloneDeep(TEAM_DURATION_STATS_TEST0301);

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

	it("403, the balance of the ancestor's wallet is insufficient", (done) => {
		const expected = DIVIDEND_INSUFFICIENT_BALANCE_ERROR;

		let amount = 100;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.NOT_GRANTED;

			return Promise.resolve(teamDurationStats);
		});
		require("../../../../server/services/dividend").grantDividendsByAncestorIdWalletCodeDurationIdAndChildrenId.mockImplementation(() => {
			return Promise.reject(new ForbiddenError(
				DIVIDEND_INSUFFICIENT_BALANCE.MESSAGE,
				DIVIDEND_INSUFFICIENT_BALANCE.CODE
			));
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("404, not found the children's wallet", (done) => {
		const expected = WALLET_NOT_FOUND_ERROR;

		let amount = 100;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.NOT_GRANTED;

			return Promise.resolve(teamDurationStats);
		});
		require("../../../../server/services/dividend").grantDividendsByAncestorIdWalletCodeDurationIdAndChildrenId.mockImplementation(() => {
			return Promise.reject(new NotFoundError(
				WALLET_NOT_FOUND.MESSAGE,
				WALLET_NOT_FOUND.CODE
			));
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});
	it("500, Internal server error", (done) => {
		let amount = 100;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.NOT_GRANTED;

			return Promise.resolve(teamDurationStats);
		});
		require("../../../../server/services/dividend").grantDividendsByAncestorIdWalletCodeDurationIdAndChildrenId.mockImplementation(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
	it("201, successfully grant children dividends", (done) => {
		const expected = {
			"wallet": {
				"id": 23,
				"userId": 3,
				"name": "監管钱包",
				"type": 1,
				"code": 101,
				"balance": 9999.69,
				"isUsed": 0
			},
		};

		let amount = 100;

		require("../../../../server/services/user").validateFundsPasswordByAccountId.mockImplementation(() => {
			return Promise.resolve();
		});
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(userProfile);
		});
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/platform").getDividendableDuration.mockImplementation(() => {
			return Promise.resolve(dividendDuration);
		});
		require("../../../../server/services/stats").getTeamDurationStatsByUserIdWalletCodeAndDurationId.mockImplementation(() => {
			teamDurationStats.status = ENUM_DIVIDEND_STATUS.NOT_GRANTED;

			return Promise.resolve(teamDurationStats);
		});
		require("../../../../server/services/dividend").grantDividendsByAncestorIdWalletCodeDurationIdAndChildrenId.mockImplementation(() => {
			return Promise.resolve({
				ancestorWallet: {
					"id": 23,
					"userId": 3,
					"name": "監管钱包",
					"type": 1,
					"code": 101,
					"balance": 9999.69,
					"isUsed": 0
				},
				childrenTeamDurationSatas: {
					"id": 1,
					"userId": 4,
					"username": 'test0301',
					"walletCode": 100,
					"durationId": 1,
					"bettingAmount": 10000,
					"bettingReward": 500,
					"depositAmount": 0,
					"withdrawalAmount": 0,
					"rebateAmount": 100,
					"activityAmount": 0,
					"fixedWageAmount": 100,
					"dividendAmount": 0,
					"incentiveAmount": 0,
					"maxGrantAmount": 200,
					"grantedAmount": 200,
					"status": 5,
					"latestStatsAt": '2019-11-30',
					"pid": 0,
					"createdAt": "2019-11-04T05:51:05.000Z",
					"updatedAt": "2019-12-01T05:51:25.000Z"
				},
			});
		});

		request(app)
			.post(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends`)
			.send({
				walletCode: VALID_WALLET_CODE,
				amount,
				password: VALID_PASSWORD
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
});

describe("PUT /api/v1/teams/leaderId=me/children/id=:childrenId/dividends/type=self/settings, validateRequestPayload", () => {
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
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
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
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
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
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
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
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
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
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
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
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
			.send([])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: out of range: 16 items", (done) => {
		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
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
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
			.send({})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("422, invalid body: not sorted amount", (done) => {
		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
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

describe("PUT /api/v1/teams/leaderId=me/children/id=:childrenId/dividends/type=self/settings, validateIsTeamChildren", () => {
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

	it("404, invalid childrenId", (done) => {
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(false);
		});
		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			return Promise.resolve(PARENT_PROFILE);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 3, "ratio": 21 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, done);
	});
});

describe("PUT /api/v1/teams/leaderId=me/children/id=:childrenId/dividends/type=self/settings, validateUserProfileType", () => {
	jest.mock("../../../../server/session");
	let app;

	let userProfile;

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(PARENT_PROFILE));

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

	it("403, invalid user type", (done) => {
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			userProfile.type = ENUM_USER_TYPE.DIRECT_CUSTOMER;

			return Promise.resolve(userProfile);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
			.send([
				{ "amount": 1, "ratio": 19 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 3, "ratio": 21 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, done);
	});
});


describe("PUT /api/v1/teams/leaderId=me/children/id=:childrenId/dividends/type=self/settings, handleUpdateChildrenSelfDividendSettingsRequest", () => {
	jest.mock("../../../../server/session");
	let app;

	let userProfile;

	beforeEach(() => {
		userProfile = attachUserMethods(cloneDeep(PARENT_PROFILE));

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

	it("201, successfully update child self dividend settings", (done) => {
		const expected = [
			{
				"amount": 1,
				"ratio": 0,
			},
			{
				"amount": 2,
				"ratio": 20,
			},
			{
				"amount": 1000000,
				"ratio": 99.99,
			}
		];

		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			userProfile.type = ENUM_USER_TYPE.AGENT;

			return Promise.resolve(userProfile);
		});

		require("../../../../server/services/dividend").setSelfDividendSettingsByUserId.mockImplementation(() => {
			return Promise.resolve(expected);
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
			.send([
				{ "amount": 1, "ratio": 0 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 1000000, "ratio": 99.99 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("500, stores fail", (done) => {
		require("../../../../server/services/user").isChildrenByAncestorIdAndUserId.mockImplementation(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/user").getUserById.mockImplementationOnce(() => {
			userProfile.type = ENUM_USER_TYPE.AGENT;

			return Promise.resolve(userProfile);
		});

		require("../../../../server/services/dividend").setSelfDividendSettingsByUserId.mockImplementation(() => {
			throw new Error();
		});

		request(app)
			.put(`/api/v1/teams/leaderId=me/children/id=${CHILDREN_ID}/dividends/type=self/settings`)
			.send([
				{ "amount": 1, "ratio": 0 },
				{ "amount": 2, "ratio": 20 },
				{ "amount": 1000000, "ratio": 99.99 }
			])
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("/api/v1/teams/leaderId=me/children", () => {
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

	it("POST /api/v1/teams/leaderId=me/children 201 CREATED, 最大獎金可設平級, 上級招商1956, 下級代理1956", (done) => {
		const expected = cloneDeep(CHILDREN_PROFILE);
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = true;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.AGENT;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.AGENT,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 201 CREATED, 最大獎金可設平級, 上級招商1956, 下級代理1954", (done) => {
		const expected = cloneDeep(CHILDREN_PROFILE);
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		expected.deltaBonus = -2;
		platform.couldEqualToPlatformMaxBonus = true;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.AGENT;
		childrenProfile.deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.AGENT,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 201 CREATED, 最大獎金可設平級, 上級招商1956, 下級會員1956", (done) => {
		const expected = cloneDeep(CHILDREN_PROFILE);
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		expected.type = ENUM_USER_TYPE.MEMBER;
		platform.couldEqualToPlatformMaxBonus = true;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.MEMBER,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 201 CREATED, 最大獎金可設平級, 上級招商1956, 下級會員1954", (done) => {
		const expected = cloneDeep(CHILDREN_PROFILE);
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		expected.type = ENUM_USER_TYPE.MEMBER;
		expected.deltaBonus = -2;
		platform.couldEqualToPlatformMaxBonus = true;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.MEMBER,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 201 CREATED, 最大獎金不可設平級, 上級招商1956, 下級代理1954", (done) => {
		const expected = cloneDeep(CHILDREN_PROFILE);
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		expected.type = ENUM_USER_TYPE.AGENT;
		expected.deltaBonus = -2;
		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.AGENT;
		childrenProfile.deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.AGENT,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 201 CREATED, 最大獎金不可設平級, 上級招商1956, 下級會員1954", (done) => {
		const expected = cloneDeep(CHILDREN_PROFILE);
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		expected.type = ENUM_USER_TYPE.MEMBER;
		expected.deltaBonus = -2;
		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.MEMBER,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 403 FORBIDDEN, 最大獎金不可設平級, 上級招商1956, 下級代理1956", (done) => {
		const expected = FORBIDDEN_ERROR;
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.AGENT;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.AGENT,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 403 FORBIDDEN, 最大獎金不可設平級, 上級招商1956, 下級會員1956", (done) => {
		const expected = FORBIDDEN_ERROR;
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.MEMBER,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 403 FORBIDDEN, 最大獎金不可設平級, 上級招商1956, 下級會員1000", (done) => {
		const expected = FORBIDDEN_ERROR;
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.ZHAOSHANG;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = -956;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.AGENT,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 403 FORBIDDEN, 禁止開下級", (done) => {
		const expected = {
			"type": "ForbiddenError",
			"message": "禁止开下级",
			"code": "888.012.414"
		};
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.MEMBER;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => false;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.MEMBER,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 403 FORBIDDEN, 最大獎金不可設平級, 上級會員", (done) => {
		const expected = USER_IS_FORBIDDEN_ERROR;
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.MEMBER;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.MEMBER,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 422, empty username", (done) => {
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.MEMBER;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: "",
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.AGENT,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 422, empty password", (done) => {
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.MEMBER;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: "",
				type: ENUM_USER_TYPE.AGENT,
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 422, invalid user type", (done) => {
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.MEMBER;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: "manager",
				bonus: platform.bonus.max + childrenProfile.deltaBonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("POST /api/v1/teams/leaderId=me/children 422, invalid bonus", (done) => {
		const platform = cloneDeep(PLATFORM);
		const parentProfile = cloneDeep(USER_PROFILE);
		const childrenProfile = cloneDeep(CHILDREN_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parentProfile.type = ENUM_USER_TYPE.MEMBER;
		parentProfile.deltaBonus = 0;
		parentProfile.isChildrenCreatable = () => true;
		childrenProfile.type = ENUM_USER_TYPE.MEMBER;
		childrenProfile.deltaBonus = 0;

		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserById.mockImplementation(() => {
			return Promise.resolve(parentProfile);
		});
		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(childrenProfile);
		});

		request(app)
			.post("/api/v1/teams/leaderId=me/children")
			.send({
				username: CHILD_USERNAME,
				password: CHILD_PASSWORD,
				type: ENUM_USER_TYPE.MEMBER,
				bonus: 12.8
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
});

describe("PATCH /api/v1/teams/leaderId=me/children/id=:childrenId", () => {
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

	it("204, 最大獎金可設平級, 上級代理1956, 下級會員1954, 下級獎金號不變, 會員轉代理", (done) => {
		const childrenId = 12;
		const body = {
			bonus: 1954,
			agent: true,
		};
		const platform = cloneDeep(PLATFORM);
		const parent = cloneDeep(PARENT_WITH_CHILD_PROFILE);

		platform.couldEqualToPlatformMaxBonus = true;
		parent.type = ENUM_USER_TYPE.AGENT;
		parent.deltaBonus = 0;
		parent.descendants[0].type = ENUM_USER_TYPE.MEMBER;
		parent.descendants[0].deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementationOnce(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(parent);
		});

		request(app)
			.patch(`/api/v1/teams/leaderId=me/children/id=${childrenId}`)
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});

	it("204, 最大獎金可設平級, 上級代理1956, 下級會員1954, 下級獎金號改1956, 會員轉代理", (done) => {
		const childrenId = 12;
		const body = {
			bonus: 1956,
			agent: true,
		};
		const platform = cloneDeep(PLATFORM);
		const parent = cloneDeep(PARENT_WITH_CHILD_PROFILE);

		platform.couldEqualToPlatformMaxBonus = true;
		parent.type = ENUM_USER_TYPE.AGENT;
		parent.deltaBonus = 0;
		parent.descendants[0].type = ENUM_USER_TYPE.MEMBER;
		parent.descendants[0].deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementationOnce(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(parent);
		});


		request(app)
			.patch(`/api/v1/teams/leaderId=me/children/id=${childrenId}`)
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});

	it("204, 最大獎金可設平級, 上級代理1956, 下級會員1954, 下級獎金號改1956, 類型不變", (done) => {
		const childrenId = 12;
		const body = {
			bonus: 1956,
			agent: false,
		};
		const platform = cloneDeep(PLATFORM);
		const parent = cloneDeep(PARENT_WITH_CHILD_PROFILE);

		platform.couldEqualToPlatformMaxBonus = true;
		parent.type = ENUM_USER_TYPE.AGENT;
		parent.deltaBonus = 0;
		parent.descendants[0].type = ENUM_USER_TYPE.MEMBER;
		parent.descendants[0].deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementationOnce(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(parent);
		});

		request(app)
			.patch(`/api/v1/teams/leaderId=me/children/id=${childrenId}`)
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(204, done);
	});

	it("403 非法獎金號, 最大獎金可設平級, 上級代理1956, 下級會員1954, 下級獎金號改1952", (done) => {
		const childrenId = 12;
		const body = {
			bonus: 1952,
			agent: false,
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "非法奖金号",
			"code": "888.012.403"
		};
		const platform = cloneDeep(PLATFORM);
		const parent = cloneDeep(PARENT_WITH_CHILD_PROFILE);

		platform.couldEqualToPlatformMaxBonus = true;
		parent.type = ENUM_USER_TYPE.AGENT;
		parent.deltaBonus = 0;
		parent.descendants[0].type = ENUM_USER_TYPE.MEMBER;
		parent.descendants[0].deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementationOnce(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(parent);
		});

		request(app)
			.patch(`/api/v1/teams/leaderId=me/children/id=${childrenId}`)
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("403 非法獎金號, 最大獎金可設平級, 上級代理1954, 下級會員1952, 下級獎金號改1956", (done) => {
		const childrenId = 12;
		const body = {
			bonus: 1956,
			agent: false,
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "非法奖金号",
			"code": "888.012.403"
		};
		const platform = cloneDeep(PLATFORM);
		const parent = cloneDeep(PARENT_WITH_CHILD_PROFILE);

		platform.couldEqualToPlatformMaxBonus = true;
		parent.type = ENUM_USER_TYPE.AGENT;
		parent.deltaBonus = -2;
		parent.descendants[0].type = ENUM_USER_TYPE.MEMBER;
		parent.descendants[0].deltaBonus = -4;

		require("../../../../server/services/platform").getPlatform.mockImplementationOnce(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(parent);
		});

		request(app)
			.patch(`/api/v1/teams/leaderId=me/children/id=${childrenId}`)
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("403 user invalid bonus, 最大獎金不可設平級, 上級代理1956, 下級會員1954, 下級獎金號改1956", (done) => {
		const childrenId = 12;
		const body = {
			bonus: 1956,
			agent: false,
		};
		const expected = {
			"type": "ForbiddenError",
			"message": "非法奖金号",
			"code": "888.012.403"
		};
		const platform = cloneDeep(PLATFORM);
		const parent = cloneDeep(PARENT_WITH_CHILD_PROFILE);

		platform.couldEqualToPlatformMaxBonus = false;
		parent.type = ENUM_USER_TYPE.AGENT;
		parent.deltaBonus = 0;
		parent.descendants[0].type = ENUM_USER_TYPE.MEMBER;
		parent.descendants[0].deltaBonus = -2;

		require("../../../../server/services/platform").getPlatform.mockImplementationOnce(() => {
			return Promise.resolve(platform);
		});
		require("../../../../server/services/user").getUserWithChildByIdAndChildId.mockImplementation(() => {
			return Promise.resolve(parent);
		});

		request(app)
			.patch(`/api/v1/teams/leaderId=me/children/id=${childrenId}`)
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(403, expected, done);
	});

	it("422 invalid bonus", (done) => {
		const childrenId = 12;
		const body = {
			bonus: "",
			agent: false,
		};
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.015.422",
			"fields": [
				"bonus"
			]
		};

		request(app)
			.patch(`/api/v1/teams/leaderId=me/children/id=${childrenId}`)
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("422 invalid agent", (done) => {
		const childrenId = 12;
		const body = {
			bonus: 1956,
			agent: "",
		};
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.015.422",
			"fields": [
				"agent"
			]
		};

		request(app)
			.patch(`/api/v1/teams/leaderId=me/children/id=${childrenId}`)
			.send(body)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});
});

describe("/api/v1/teams/leaderId=me/members/id=:memberId/bettings/id=:bettingId", () => {
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

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/bettings/id=:bettingId, 200 OK", (done) => {
		const memberId = 13;
		const bettingId = 1;

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getBettingByIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(BETTING);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/bettings/id=${bettingId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/bettings/id=:bettingId, 404 Descendant Not Found", (done) => {
		const memberId = 13;
		const bettingId = 1;
		const expected = {
			"type": "NotFoundError",
			"message": "此用户不属于直属下级",
			"code": "888.015.404"
		};

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(false);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/bettings/id=${bettingId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/bettings/id=:bettingId, 404 Betting Not Found", (done) => {
		const memberId = 13;
		const bettingId = 1;
		const expected = {
			"type": "NotFoundError",
			"message": "注单不存在",
			"code": "888.007.409"
		};

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getBettingByIdAndUserId.mockImplementationOnce(() => {
			return Promise.reject(new NotFoundError(
				BETTING_NOT_FOUND.MESSAGE,
				BETTING_NOT_FOUND.CODE
			));
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/bettings/id=${bettingId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/bettings/id=:bettingId, 422 Invalid memberId", (done) => {
		const memberId = "abc";
		const bettingId = 1;
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.015.422",
			"fields": [
				"memberId"
			]
		};

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/bettings/id=${bettingId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/bettings/id=:bettingId, 422 Invalid bettingId", (done) => {
		const memberId = 13;
		const bettingId = "abc";
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.015.422",
			"fields": [
				"bettingId"
			]
		};

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/bettings/id=${bettingId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/bettings/id=:bettingId, 500 Internal server error", (done) => {
		const memberId = 13;
		const bettingId = "abc";

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getBettingByIdAndUserId.mockImplementationOnce(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/bettings/id=${bettingId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
});

describe("/api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings", () => {
	jest.mock("../../../../server/session");
	let app;
	const TRACE_BETTINGS = {
		"data": [
			{
				"id": 13,
				"issue": "20191022-477",
				"opencode": null,
				"reward": 0,
				"multiple": 1,
				"amount": 5,
				"status": 1,
				"details": []
			},
			{
				"id": 14,
				"issue": "20191022-478",
				"opencode": null,
				"reward": 0,
				"multiple": 2,
				"amount": 10,
				"status": 1,
				"details": []
			},
			{
				"id": 15,
				"issue": "20191022-479",
				"opencode": null,
				"reward": 0,
				"multiple": 4,
				"amount": 20,
				"status": 1,
				"details": []
			}
		],
		"numOfItems": 3,
		"numOfPages": 1
	};

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

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings, 200 OK", (done) => {
		const memberId = 13;
		const traceId = 1;

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getBettingsByUserIdTraceIdAndPagination.mockImplementationOnce(() => {
			return Promise.resolve(TRACE_BETTINGS);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}/bettings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings, 404 Descendant Not Found", (done) => {
		const memberId = 13;
		const traceId = 1;
		const expected = {
			"type": "NotFoundError",
			"message": "此用户不属于直属下级",
			"code": "888.015.404"
		};

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(false);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}/bettings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings, 404 Descendant Not Found", (done) => {
		const memberId = 13;
		const traceId = 1;
		const expected = {
			"type": "NotFoundError",
			"message": "此用户不属于直属下级",
			"code": "888.015.404"
		};

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(false);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}/bettings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings, 404 Trace Not Found", (done) => {
		const memberId = 13;
		const traceId = 1;
		const expected = {
			"type": "NotFoundError",
			"message": "追号单不存在",
			"code": "888.007.404"
		};

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getBettingsByUserIdTraceIdAndPagination.mockImplementationOnce(() => {
			return Promise.reject(new NotFoundError(
				TRACE_NOT_FOUND.MESSAGE,
				TRACE_NOT_FOUND.CODE
			));
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}/bettings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings, 422 Invalid memberId", (done) => {
		const memberId = "abc";
		const traceId = 1;
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.015.422",
			"fields": [
				"memberId"
			]
		};

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}/bettings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings, 422 Invalid traceId", (done) => {
		const memberId = 13;
		const traceId = "abc";
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.015.422",
			"fields": [
				"traceId"
			]
		};

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}/bettings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId/bettings, 500 internal server error", (done) => {
		const memberId = 13;
		const traceId = 1;

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getBettingsByUserIdTraceIdAndPagination.mockImplementationOnce(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}/bettings`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});

describe("/api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId", () => {
	jest.mock("../../../../server/session");
	let app;
	const TRACE = {
		"id": 4,
		"username": "test0301",
		"lotteryName": "腾讯分分彩",
		"name": "五星 直选复式",
		"isTerminatedIfWin": 1,
		"numOfIssues": 3,
		"numOfFinishedIssues": 0,
		"rebate": 0,
		"amountPerBet": 2,
		"amount": 14,
		"betcontent": "1,2,3,4,5",
		"weizhi": "",
		"status": 1,
		"device": "unknown",
		"createdAt": "2020-02-19T10:15:29.000Z"
	};

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

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId, 200 OK", (done) => {
		const memberId = 13;
		const traceId = 1;

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getTraceByIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(TRACE);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(200, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId, 404 Descendant Not Found", (done) => {
		const memberId = 13;
		const traceId = 1;
		const expected = {
			"type": "NotFoundError",
			"message": "此用户不属于直属下级",
			"code": "888.015.404"
		};

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(false);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId, 404 Trace Not Found", (done) => {
		const memberId = 13;
		const traceId = 1;
		const expected = {
			"type": "NotFoundError",
			"message": "追号单不存在",
			"code": "888.007.404"
		};

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getTraceByIdAndUserId.mockImplementationOnce(() => {
			return Promise.reject(new NotFoundError(
				TRACE_NOT_FOUND.MESSAGE,
				TRACE_NOT_FOUND.CODE
			));
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(404, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId, 422 Invalid memberId", (done) => {
		const memberId = "abc";
		const traceId = 1;
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.015.422",
			"fields": [
				"memberId"
			]
		};

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId, 422 Invalid traceId", (done) => {
		const memberId = 13;
		const traceId = "abc";
		const expected = {
			"type": "RequestValidationError",
			"message": "输入格式错误",
			"code": "888.015.422",
			"fields": [
				"traceId"
			]
		};

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, expected, done);
	});

	it("GET /api/v1/teams/leaderId=me/members/id=:memberId/traces/id=:traceId, 500 Internal server error", (done) => {
		const memberId = 13;
		const traceId = 1;

		require("../../../../server/services/user").isDescentdantByAncestorIdAndUserId.mockImplementationOnce(() => {
			return Promise.resolve(true);
		});
		require("../../../../server/services/betting").getTraceByIdAndUserId.mockImplementationOnce(() => {
			return Promise.reject(INTERNAL_SERVER_ERROR_MSG);
		});

		request(app)
			.get(`/api/v1/teams/leaderId=me/members/id=${memberId}/traces/id=${traceId}`)
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(500, done);
	});
});
