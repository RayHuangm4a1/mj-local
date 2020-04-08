const {
	updateLevelByUserId,
} = require("../../../services/user.admin");

module.exports = async function handleUpdateToSpecialLevelBelongToUserRequest(req, res, next) {
	const { userId, levelId } = req.params;
	const { managedUser } = res.locals;

	try {
		await updateLevelByUserId(userId, {
			levelId,
			levelExpiredAt: new Date('9999-12-31'),
			previousLevelId: managedUser.levelId,
			username: managedUser.username,
		});

		res.status(204).end();
	} catch (error) {
		return next(error);
	}

	next();
};
