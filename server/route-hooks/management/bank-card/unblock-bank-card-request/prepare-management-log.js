const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	const { bankCardId } = req.params;

	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: null,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.BANK_CARD,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "银行卡移出黑名单",
			details: {
				bankCardId,
			},
		};
	} catch (error) {
		return next(error);
	}

	next();
};
