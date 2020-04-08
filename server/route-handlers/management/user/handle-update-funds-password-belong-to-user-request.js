const { updateFundsPasswordByAccountId } = require("../../../services/user.admin");

/**
 * @param {object} res.locals.managedUser
 */
module.exports = async function handleUpdateFundsPasswordBelongToUserRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { password } = req.body;
	const { jwt } = req.user;
	const { accountId } = res.locals.managedUser;

	try {
		await updateFundsPasswordByAccountId(accountId, password, {
			ip,
			jwt,
			requestId,
		});

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
