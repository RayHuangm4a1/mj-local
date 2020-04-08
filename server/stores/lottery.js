const LotteryManagement = require("mj-service-sdks/lottery/management");
const {
	LOTTERY_NOT_FOUND,
} = require('mj-service-sdks/error/code');
const {
	InternalServerError,
	NotFoundError,
} = require("ljit-error");
const Cache = require("../lib/cache");
const LotteryCacheStore = require("../cache-stores/lottery");
const PlayCacheStore = require("../cache-stores/play");

async function getPrimaryLotteries({ requestId, force = false }) {
	const CacheStoreGetter = function () {
		return LotteryCacheStore.getLotteries();
	};

	const DefaultStoreGetter = async function () {
		const lotteries = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getLotteries();

		await LotteryCacheStore.setLotteries(lotteries);

		return lotteries;
	};

	try {
		return Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function getPrimaryLotteryById(lotteryId, { requestId, force = false }) {
	const CacheStoreGetter = function () {
		return LotteryCacheStore.getLotteryById(lotteryId);
	};

	const DefaultStoreGetter = async function () {
		const lotteries = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getLotteries();

		await LotteryCacheStore.setLotteries(lotteries);

		const lottery = lotteries.find(({ id }) => id === lotteryId);

		return lottery !== undefined ? lottery : null;
	};

	try {
		return Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });
	} catch (error) {
		throw new InternalServerError(error);
	}
}

function _getPrimaryLotteries({ page = 1, requestId, jwt }) {
	try {
		return new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.getLotteries({ page });
	} catch (error) {
		throw new InternalServerError(error);
	}
}

function _getPrimaryLotteriesByLotteryClassId(lotteryClassId, { requestId, jwt }) {
	try {
		return new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.getLotteriesByLotteryClassId(lotteryClassId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _updatePrimaryLotteryStatusById(lotteryId, status, { requestId, jwt }) {
	try {
		await new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.updateLotteryStatusById(lotteryId, status);

		await LotteryCacheStore.removeLotteries();
		await PlayCacheStore.removePlaysByLotteryId(lotteryId);
	} catch (error) {
		if (error.code === LOTTERY_NOT_FOUND.CODE) {
			throw new NotFoundError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function _setPrimaryLotteryMaintenanceById(lotteryId, { requestId, jwt }) {
	return _updatePrimaryLotteryStatusById(lotteryId, "maintenance", { requestId, jwt });
}

async function _updateTagsAndOrderingsOfPrimaryLotteriesByLotteryClassId(lotteryClassId, documents, { requestId, jwt }) {
	try {
		await new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.updateTagsAndOrderingsOfLotteriesByLotteryClassId(lotteryClassId, documents);

		await LotteryCacheStore.removeLotteries();
	} catch (error) {
		throw new InternalServerError(error);
	}
}

module.exports = {
	// primary store for client
	getPrimaryLotteries,
	getPrimaryLotteryById,

	// primary store for management
	_getPrimaryLotteries,
	_getPrimaryLotteriesByLotteryClassId,
	_updatePrimaryLotteryStatusById,
	_setPrimaryLotteryMaintenanceById,
	_updateTagsAndOrderingsOfPrimaryLotteriesByLotteryClassId,
};
