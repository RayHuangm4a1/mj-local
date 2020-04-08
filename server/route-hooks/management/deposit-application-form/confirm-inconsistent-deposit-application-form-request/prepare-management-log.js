const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: req.params.inconsistentDepositApplicationFormId,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.DEPOSIT,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "充值入款确认, 待确认充值单合并至残留充值单",
			details: {
				inconsistentDepositApplicationFormId: req.params.inconsistentDepositApplicationFormId,
				newDepositApplicationFormId: req.body.depositApplicationFormId
			},
		};
	} catch (error) {
		return next(error);
	}

	next();
};
