const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
} = require("../../../../lib/enum");

module.exports = function prepareManagementLog(req, res, next) {
	const { lotteryId } = req.params;

	try {
		const details = req.body.map(({ id, status }) => `${id} ${status}`).join(", ");

		req.managementLog = {
			operatorId: req.user.id,
			operatorUsername: req.user.username,
			associateId: lotteryId,
			associateName: null,
			type: ENUM_MANAGEMENT_TYPE.PLAY,
			action: ENUM_MANAGEMENT_ACTION.MODIFICATION,
			description: `更新玩法状态: ${details}`,
		};
	} catch (error) {
		return next(error);
	}

	next();
};