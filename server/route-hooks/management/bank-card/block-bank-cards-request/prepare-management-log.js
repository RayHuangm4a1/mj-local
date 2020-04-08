const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	try {
		const bankCardNumbers = req.body.map(({ number }) => number);

		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: null,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.BANK_CARD,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "银行卡移入黑名单",
			details: {
				bankCardNumbers,
			},
		};
	} catch (error) {
		return next(error);
	}

	next();
};
