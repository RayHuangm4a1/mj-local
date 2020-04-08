const {
	updateFundsPasswordViaSecurityQuestionByAccountId,
} = require("../../../services/user");

module.exports = async function handleUpdateFundsPasswordViaSecurityQuestionRequest(req, res, next) {
	const { accountId } = req.user;
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { newPassword, securityQuestionAnswers } = req.body;

	try {
		await updateFundsPasswordViaSecurityQuestionByAccountId(
			accountId,
			{
				newPassword,
				securityQuestionAnswers,
			},
			{ requestId , ip }
		);

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
