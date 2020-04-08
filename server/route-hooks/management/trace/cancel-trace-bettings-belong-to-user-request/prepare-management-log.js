const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: req.params.traceId,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.TRACE,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "撤单",
			details: req.body,
		};
	} catch (error) {
		return next(error);
	}

	next();
};
