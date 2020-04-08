const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	const { lotteryClassId } = req.params;

	try {
		const detail = req.body.map(({ id, tags, ordering }) => `${id} ${tags.join()} ${ordering}`).join(", ");

		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: lotteryClassId,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.LOTTERY_CLASS,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: `更新彩票顺序/标签(id, tags, ordering): ${detail}`,
		};
	} catch (error) {
		return next(error);
	}

	next();
};
