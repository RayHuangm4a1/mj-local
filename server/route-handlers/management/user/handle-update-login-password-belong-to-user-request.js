const {
	updateLoginPasswordByAccountId,
	updateLoginPasswordUpdatedAtById,
} = require("../../../services/user.admin");

/**
 * @param {object} res.locals.managedUser
 */
module.exports = async function handleUpdateLoginPasswordBelongToUserRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { password } = req.body;
	const { jwt } = req.user;
	const { id: userId, accountId } = res.locals.managedUser;

	try {
		await updateLoginPasswordByAccountId(accountId, password, {
			ip,
			jwt,
			requestId,
		});

		await updateLoginPasswordUpdatedAtById(userId, new Date());

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
