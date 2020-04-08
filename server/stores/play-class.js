const { InternalServerError } = require("ljit-error");
const Cache = require("../lib/cache");
const PlayClassCacheStore = require("../cache-stores/play-class");

async function getPrimaryPlayClasses({ requestId, force = false }) {
	const CacheStoreGetter = function () {
		return PlayClassCacheStore.getPlayClasses();
	};

	const DefaultStoreGetter = async function () {
		const playClasses = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getPlayClasses();

		await PlayClassCacheStore.setPlayClasses(playClasses);

		return playClasses;
	};

	try {
		return Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });
	} catch (error) {
		throw new InternalServerError(error);
	}
}

module.exports = {
	// primary store for client
	getPrimaryPlayClasses,
};
