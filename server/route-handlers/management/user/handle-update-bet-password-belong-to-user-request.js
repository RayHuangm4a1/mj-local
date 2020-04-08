const {
	updateBetPasswordByAccountId,
	updateBetPasswordUpdatedAtById,
} = require("../../../services/user.admin");

/**
 * @param {object} res.locals.managedUser
 */
module.exports = async function handleUpdateBetPasswordBelongToUserRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { password } = req.body;
	const { jwt } = req.user;
	const { id: userId, accountId } = res.locals.managedUser;

	try {
		await updateBetPasswordByAccountId(accountId, password, {
			ip,
			jwt,
			requestId,
		});

		await updateBetPasswordUpdatedAtById(userId, new Date());

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
