const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	const { lotteryClassId } = req.params;

	try {
		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: lotteryClassId,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.LOTTERY_CLASS,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: "更新彩种状态",
		};
	} catch (error) {
		return next(error);
	}

	next();
};
