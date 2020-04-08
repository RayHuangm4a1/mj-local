const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: res.locals.managedStaff.id,
			associateName: res.locals.managedStaff.username,
			type: ENUM_MANAGEMENT_TYPE.STAFF,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "解绑谷歌认证码",
		};
	} catch (error) {
		return next(error);
	}

	next();
};
