const {
	updateLevelByUserId,
} = require("../../../services/user.admin");

module.exports = async function handleUpdateToNormalLevelBelongToUserRequest(req, res, next) {
	const { userId, levelId } = req.params;
	const { levelExpiredAt } = req.body;
	const { managedUser } = res.locals;

	try {
		await updateLevelByUserId(userId, {
			levelId,
			levelExpiredAt,
			previousLevelId: managedUser.levelId,
			username: managedUser.username,
		});

		res.status(204).end();
	} catch (error) {
		return next(error);
	}

	next();
};
