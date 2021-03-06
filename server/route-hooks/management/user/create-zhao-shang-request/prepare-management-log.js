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
			associateName: req.body.username,
			type: ENUM_MANAGEMENT_TYPE.USER,
			action: ENUM_MANAGEMENT_ACTION.CREATION,
			description: "新增招商帐号",
		};
	} catch (error) {
		return next(error);
	}

	next();
};
