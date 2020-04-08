const {
	deleteSecurityQuestionsByAccountId,
} = require("../../../services/user.admin");

module.exports = async function handleDeleteSecurityQuestionsRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { jwt } = req.user;
	const { accountId } = res.locals.managedUser;

	try {
		await deleteSecurityQuestionsByAccountId(accountId, {
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
