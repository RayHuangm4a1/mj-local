module.exports = function handleGetPasswordResettingMethodsRequest(req, res) {
	const { account } = res.locals;
	const securityQuestions = account.securityQuestions.map(({ id, name }) => ({ id, question: name }));
	const methods = {
		"security-questions": securityQuestions,
		"google-totp": account.totp.isEnabled
	};

	res.status(200).json(methods);
};
