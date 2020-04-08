const {
	ENUM_USER_TYPE,
	ENUM_STAFF_STATUS,
} = require("../../../server/lib/enum");

function attachUserMethods(user) {
	user.isBlocked = function () {
		const { isBlocked, isTeamBlocked } = this.statuses;

		return isBlocked || isTeamBlocked;
	};
	user.isBetable = function () {
		const { isBetable, isTeamBetable } = this.statuses;

		return isBetable && isTeamBetable;
	};
	user.isZhaoShang = function () {
		return this.type === ENUM_USER_TYPE.ZHAOSHANG;
	};

	return user;
}

function attachStaffMethods(staff) {
	staff.isBlocked = function () {
		return this.status === ENUM_STAFF_STATUS.BLOCKED;
	};

	return staff;
}

module.exports = {
	attachUserMethods,
	attachStaffMethods,
};
