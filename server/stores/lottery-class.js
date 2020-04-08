const LotteryManagement = require("mj-service-sdks/lottery/management");
const {
	LOTTERY_CLASS_NOT_FOUND,
} = require("mj-service-sdks/error/code");
const {
	InternalServerError,
	NotFoundError,
} = require("ljit-error");
const Cache = require("../lib/cache");
const LotteryClassCacheStore = require("../cache-stores/lottery-class");
const LotteryCacheStore = require("../cache-stores/lottery");
const PlayCacheStore = require("../cache-stores/play");

async function getPrimaryOnlineLotteryClasses({ requestId, force = false }) {
	const CacheStoreGetter = function () {
		return LotteryClassCacheStore.getLotteryClasses();
	};

	const DefaultStoreGetter = async function () {
		const lotteryClasses = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getLotteryClasses();

		await LotteryClassCacheStore.setLotteryClasses(lotteryClasses);

		return lotteryClasses;
	};

	try {
		return Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _getPrimaryLotteryClasses({ jwt, requestId }) {
	try {
		return await new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.getLotteryClasses();
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _updatePrimaryLotteryClassStatusById(lotteryClassId, status, { jwt, requestId }) {
	let lotteryClass;

	try {
		lotteryClass = await new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.updateLotteryClassStatusById(lotteryClassId, status);
	} catch (error) {
		if (error.code === LOTTERY_CLASS_NOT_FOUND.CODE) {
			throw new NotFoundError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}

	await LotteryClassCacheStore.removeLotteryClasses();
	await LotteryCacheStore.removeLotteries();

	if (!lotteryClass.lotteries.length) {
		return;
	}

	const lotteryIds = lotteryClass.lotteries.map(({ id }) => id);

	await PlayCacheStore.removePlaysWithinLotteryIds(lotteryIds);
}

module.exports = {
	// primary store for client
	getPrimaryOnlineLotteryClasses,

	// primary store for management
	_getPrimaryLotteryClasses,
	_updatePrimaryLotteryClassStatusById,
};
