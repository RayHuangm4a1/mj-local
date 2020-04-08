const {
	set,
	get,
} = require("ljit-redis/model");
const SECURITY_QUESTIONS_KEY = "securityQuestions";
const { SECURITY_QUESTIONS_TTL } = require("./index");

async function getSecurityQuestions() {
	const securityQuestions = await get(SECURITY_QUESTIONS_KEY);

	if (securityQuestions === null) {
		return null;
	}

	return JSON.parse(securityQuestions);
}

function setSecurityQuestions(securityQuestions) {
	return set(SECURITY_QUESTIONS_KEY, JSON.stringify(securityQuestions), "EX", SECURITY_QUESTIONS_TTL);
}

module.exports = {
	getSecurityQuestions,
	setSecurityQuestions,
};
