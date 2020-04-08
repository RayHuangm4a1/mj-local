const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: res.locals.member.id,
			associateName: res.locals.member.username,
			type: ENUM_MANAGEMENT_TYPE.USER,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "解除个人的团队充值冻结",
		};
	} catch (error) {
		return next(error);
	}

	next();
};
