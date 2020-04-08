const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: req.params.lotteryId,
			associateName: req.params.issue,
			type: ENUM_MANAGEMENT_TYPE.DRAWING,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: `期號${req.params.issue}撤单`,
		};
	} catch (error) {
		return next(error);
	}

	next();
};
