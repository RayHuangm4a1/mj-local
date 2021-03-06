const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	const { lotteryId } = req.params;

	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: lotteryId,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.LOTTERY,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "更新彩票状态",
		};
	} catch (error) {
		return next(error);
	}

	next();
};
