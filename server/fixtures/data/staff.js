const {
	ENUM_STAFF_STATUS,
} = require("../../lib/enum");
const [
	admin,
] = require("./role");

module.exports = [
	{
		"id": 1,
		"username": "admin",
		"accountId": "5d4aea86e48b697af60c1201",
		"roleId": admin.id,
		"description": null,
		"status": ENUM_STAFF_STATUS.ACTIVE
	}
];
