const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: res.locals.managedUser.id,
			associateName: res.locals.managedUser.username,
			type: ENUM_MANAGEMENT_TYPE.USER,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "银行卡移出黑名单",
			details: {
				bankCardId: req.params.bankCardId,
			},
		};
	} catch (error) {
		return next(error);
	}

	next();
};
