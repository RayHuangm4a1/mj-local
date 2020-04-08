const {
	ForbiddenError,
} = require('ljit-error');

jest.mock("ljit-db/model");
jest.mock("../../../../../server/models/user", () => { return {}; });
jest.mock("../../../../../server/models/bank-account-level", () => { return {}; });
jest.mock("../../../../../server/models/user-bank-card", () => { return {}; });
jest.mock("../../../../../server/models/user-daily-stats", () => { return {}; });
jest.mock("../../../../../server/models/team-stats", () => { return {}; });

global.PRODUCT = require("../../../../../env").product;
global.CONFIG = require("../../../../../config").getServer(global.PRODUCT);

const { isUserPayerExisted } = require('../../../../../server/route-hooks/client/user/common');

describe('middleware isUserPayerExisted test', () => {
	let req, res;
	const mockRequest = () => {
		return {
			profile:{
				payer:'',
			},
		};
	};

	const mockResponse = () => {
		return {};
	};

	beforeEach(() => {
		req = mockRequest();
		res = mockResponse();
	});

	it('user payer is existed', () => {
		let result;

		res.locals = {
			user: {
				payer: '11111111111',
			},
		};
		const next = err => {
			result = err;
		};
		const expected = undefined;

		isUserPayerExisted(req, res, next);

		expect(result).toBe(expected);
	});

	it('user payer is not existed', () => {
		let result;

		res.locals = {
			user: {
				payer: null,
			},
		};
		const next = err => {
			result = err;
		};
		const expected = {
			type: "ForbiddenError",
			code: "888.012.435",
			message: "请先绑定银行卡",
		};

		isUserPayerExisted(req, res, next);

		expect(result).toBeInstanceOf(ForbiddenError);
		expect(result).toMatchObject(expected);
	});
});
