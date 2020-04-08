const {
	updateLoginPasswordViaSecurityQuestionByAccountId,
	updateLoginPasswordUpdatedAtById,
} = require("../../../services/user");

module.exports = async function handleUpdateLoginPasswordViaSecurityQuestionRequest(req, res, next) {
	const { userId, accountId } = req.session.guest;
	const { ip } = req.device;
	const requestId = req.header("X-Request-Id");
	const { newPassword, securityQuestionAnswers } = req.body;

	try {
		await updateLoginPasswordViaSecurityQuestionByAccountId(
			accountId,
			{
				newPassword,
				securityQuestionAnswers,
			},
			{ requestId, ip }
		);

		await updateLoginPasswordUpdatedAtById(userId, new Date());

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
