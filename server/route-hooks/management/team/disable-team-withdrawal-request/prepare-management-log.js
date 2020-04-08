const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: req.leader.id,
			associateName: req.leader.username,
			type: ENUM_MANAGEMENT_TYPE.USER,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "禁止团队提现",
		};
	} catch (error) {
		return next(error);
	}

	next();
};
