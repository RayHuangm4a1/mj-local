const {
	ENUM_FINANCIAL_LEVEL_ID,
} = require('../../../../server/lib/enum');

const INTERNAL_SERVER_ERROR_MSG = "syntax error";

const USERNAME = "test01";
const PASSWORD = "123qwe";
const TOTP = "123456";

const USER_ME_PROFILE = {
	"id": 1,
	"username": 'admin',
	"type": 'admin',
	"parent": null,
	"numOfDescendants": 1,
	"deltaBonus": 0,
	"nickname": 'admin',
	"greeting": null,
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
	"ip": null,
	"geo": null,
	"loginAt": null,
};
const ACCOUNT = {
	_id: '5d4aea86e48b697af60c1201',
	lastLoginAudit: {
		_id: '5d689118d199d6001b506756',
		ip: '211.23.162.10',
		geo: '台湾省中华电信(HiNet)数据中心',
		createdAt: '2019-08-30T02:59:36.516Z'
	},
	username: 'admin'
};
const USER_TEST01_PROFILE = {
	id: 12,
	username: 'test01',
	type: 2,
	numOfDescendants: 2,
	deltaBonus: -2,
	nickname: 'test01',
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
	ip: null,
	geo: null,
	loginAt: null,
	levelId: ENUM_FINANCIAL_LEVEL_ID.NORMAL_ONE,
};

module.exports = {
	ACCOUNT,
	USERNAME,
	PASSWORD,
	TOTP,
	USER_ME_PROFILE,
	USER_TEST01_PROFILE,
	INTERNAL_SERVER_ERROR_MSG,
};
