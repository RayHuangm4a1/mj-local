/* eslint-disable newline-after-var */
const request = require("supertest");
const {
	cloneDeep,
} = require("lodash");
const {
	ENUM_USER_TYPE,
	ENUM_FINANCIAL_LEVEL_ID,
} = require("../../../../server/lib/enum");

jest.mock("ljit-db/model");
jest.mock("../../../../server/session");
jest.mock("../../../../server/services/platform");
jest.mock("../../../../server/services/user");
jest.mock("../../../../server/models/user", () => { return {}; });
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
	"accountId": "5cd151312dfa1d244dd54517",
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
const CHILDREN = {
	"accountId": "5d4aea86e48b697af60c1211",
	"status": "active",
	"username": "test03s01",
	"createdAt": "2019-08-08T02:14:59.657Z",
	"updatedAt": "2019-08-08T02:14:59.657Z"
};
const CHILDREN_PROFILE = {
	"numOfDescendants": 1,
	"greeting": null,
	"qq": null,
	"wechat": null,
	"phone": null,
	"status": "active",
	"id": 4,
	"username": "test0301",
	"type": ENUM_USER_TYPE.ZHAOSHANG,
	"parent": "test01",
	"nickname": "t12345",
	"deltaBonus": 0,
	"createdBy": "test01",
	"levelId": ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
	"updatedAt": "2019-08-09T11:43:17.578Z",
	"createdAt": "2019-08-09T11:43:17.578Z"
};

describe("/api/v1/users 新增招商會員", () => {
	const CHILD = {
		TYPE: ENUM_USER_TYPE.ZHAOSHANG,
		USERNAME: CHILDREN_PROFILE.username,
		NICKNAME: CHILDREN_PROFILE.nickname,
		PASSWORD: "123qwe",
	};
	let app;

	beforeEach(() => {
		require("../../../../server/services/platform").getPlatform.mockImplementation(() => {
			return Promise.resolve(PLATFORM);
		});

		require("../../../../server/session").mockImplementation(() => {
			return (req, res, next) => {
				req.user = {
					id: 2,
					jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJfaWQiOiI1Y2QxNTEzMTJkZmExZDI0NGRkNTQ1MTcifSwidXNlciI6eyJfaWQiOiI1ZDRhNjNjYTk1Y2JhYTNjYjNkYmJkM2QiLCJ1c2VybmFtZSI6ImFkbWluIiwidHlwZSI6ImFkbWluIn0sImlzcyI6ImxqaXQuaW8iLCJpYXQiOjE1NjgyNzEyMzYsImV4cCI6MTU2ODM1NzYzNn0.crX3AiwjZrhQd3X1uQwgE3X3oP8PCvaNsoeugwCjzqw",
					username: "admin",
					type: 6,
				};

				next();
			};
		});

		app = require("../../../../server/management");

	});

	afterEach(() => {
		jest.resetModules();
	});

	it("POST /api/v1/users 201 created", (done) => {
		const bonus = 1956;
		const expect = CHILDREN_PROFILE;

		require("../../../../server/services/user").createAccount.mockImplementation(() => {
			return Promise.resolve(CHILDREN);
		});
		require("../../../../server/services/user").createUser.mockImplementation(() => {
			return Promise.resolve(CHILDREN_PROFILE);
		});

		request(app)
			.post("/api/v1/users")
			.send({
				type: CHILD.TYPE,
				username: CHILD.USERNAME,
				password: CHILD.PASSWORD,
				nickname: CHILD.NICKNAME,
				bonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(201, expect, done);
	});
	it("POST /api/v1/users 422, empty username", (done) => {
		const bonus = 1956;

		request(app)
			.post("/api/v1/users")
			.send({
				type: CHILD.TYPE,
				username: "",
				password: CHILD.PASSWORD,
				nickname: CHILD.NICKNAME,
				bonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("POST /api/v1/users 422, empty password", (done) => {
		const bonus = 1956;

		request(app)
			.post("/api/v1/users")
			.send({
				type: CHILD.TYPE,
				username: CHILD.USERNAME,
				password: "",
				nickname: CHILD.NICKNAME,
				bonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("POST /api/v1/users 422, invalid nickname", (done) => {
		const bonus = 1956;

		request(app)
			.post("/api/v1/users")
			.send({
				type: CHILD.TYPE,
				username: CHILD.USERNAME,
				password: CHILD.PASSWORD,
				nickname: "1234567890abcdefg",
				bonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
	it("POST /api/v1/users 422, invalid bonus", (done) => {
		const bonus = 1000;

		request(app)
			.post("/api/v1/users")
			.send({
				type: CHILD.TYPE,
				username: CHILD.USERNAME,
				password: CHILD.PASSWORD,
				nickname: CHILD.NICKNAME,
				bonus,
			})
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/json')
			.expect(422, done);
	});
});
