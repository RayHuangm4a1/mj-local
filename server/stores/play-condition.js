const LotteryManagement = require("mj-service-sdks/lottery/management");
const { InternalServerError } = require("ljit-error");
const Cache = require("../lib/cache");
const PlayConditionCacheStore = require("../cache-stores/play-condition");

async function getPrimaryPlayConditionsByLotteryId(lotteryId, { requestId, force = false }) {
	const CacheStoreGetter = function () {
		return PlayConditionCacheStore.getPlayConditions(lotteryId);
	};

	const DefaultStoreGetter = async function () {
		const playConditions = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getPlayConditionsByLotteryId(lotteryId);

		await PlayConditionCacheStore.setPlayConditions(lotteryId, playConditions);

		return playConditions;
	};

	try {
		return Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });
	} catch (error) {
		throw new InternalServerError(error);
	}
}

function _getPrimaryPlayConditionsByLotteryIdAndPlayClassId(lotteryId, playClassId, { requestId, jwt }) {
	try {
		return new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.getPlayConditionsByLotteryIdAndPlayClassId(lotteryId, playClassId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

module.exports = {
	// primary store for client
	getPrimaryPlayConditionsByLotteryId,

	// primary store for management
	_getPrimaryPlayConditionsByLotteryIdAndPlayClassId,
};
