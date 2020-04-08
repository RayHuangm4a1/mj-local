const {
	updateBetPasswordViaSecurityQuestionByAccountId,
	updateBetPasswordUpdatedAtById,
} = require("../../../services/user");

module.exports = async function handleUpdateBetPasswordViaSecurityQuestionRequest(req, res, next) {
	const { id: userId, accountId } = req.user;
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { newPassword, securityQuestionAnswers } = req.body;

	try {
		await updateBetPasswordViaSecurityQuestionByAccountId(
			accountId,
			{
				newPassword,
				securityQuestionAnswers,
			},
			{ requestId, ip }
		);

		await updateBetPasswordUpdatedAtById(userId, new Date());

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
