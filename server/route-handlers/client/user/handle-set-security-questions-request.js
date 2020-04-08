const {
	setSecurityQuestionsByAccountId,
} = require('../../../services/user');

module.exports = async function handleSetSecurityQuestionsRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { accountId } = req.user;
	const { data } = req.body;

	try {
		const securityQuestions = await setSecurityQuestionsByAccountId(accountId, data, { requestId, ip });

		res.status(201).json(securityQuestions);
	} catch (error) {
		next(error);
	}
};
