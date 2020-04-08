const INTERNAL_SERVER_ERROR_MSG = "syntax error";

const USERNAME = "admin";
const PASSWORD = "123qwe";
const TOTP = "123456";

const STAFF_ADMIN_PROFILE = {
	"id": 1,
	"username": 'admin',
	"status": 1,
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

module.exports = {
	ACCOUNT,
	USERNAME,
	PASSWORD,
	TOTP,
	STAFF_ADMIN_PROFILE,
	INTERNAL_SERVER_ERROR_MSG,
};
