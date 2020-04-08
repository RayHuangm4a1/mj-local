const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: null,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.PLATFORM,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "更新招商固定工资",
		};
	} catch (error) {
		return next(error);
	}

	next();
};
