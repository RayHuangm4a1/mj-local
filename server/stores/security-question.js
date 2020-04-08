const { InternalServerError } = require("ljit-error");
const Cache = require("../lib/cache");
const SecurityQuestionCacheStore = require("../cache-stores/security-question");

async function getSecurityQuestions({ requestId, force = false }) {
	const CacheStoreGetter = function () {
		return SecurityQuestionCacheStore.getSecurityQuestions();
	};

	const DefaultStoreGetter = async function () {
		const securityQuestions = await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.getSecurityQuestions();

		await SecurityQuestionCacheStore.setSecurityQuestions(securityQuestions);

		return securityQuestions;
	};

	try {
		return Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });
	} catch (error) {
		throw new InternalServerError(error);
	}
}

module.exports = {
	getSecurityQuestions,
};
