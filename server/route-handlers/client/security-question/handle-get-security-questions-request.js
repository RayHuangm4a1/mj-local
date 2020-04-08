const {
	getSecurityQuestions,
} = require("../../../services/platform");

module.exports = async function handleGetSecurityQuestionsRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");

	try {
		const securityQuestions = await getSecurityQuestions({ requestId });

		res.status(200).json(securityQuestions);
	} catch (error) {
		next(error);
	}
};
