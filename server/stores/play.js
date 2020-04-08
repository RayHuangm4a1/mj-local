const { keyBy, pick } = require("ljit-collection");
const {
	InternalServerError,
} = require("ljit-error");
const PlayCacheStore = require("../cache-stores/play");
const Cache = require("../lib/cache");
const LotteryManagement = require("mj-service-sdks/lottery/management");

const MIN_PROJECTIONS = [
	'_id', 'status', 'id',
	'name', 'unit', 'awards',
	'positions', 'policy.pk', 'description',
];

async function getPrimaryPlaysByLotteryId(lotteryId, {
	requestId,
	force = false,
	projections = null,
}) {
	const CacheStoreGetter = function () {
		return PlayCacheStore.getPlaysByLotteryId(lotteryId);
	};

	const DefaultStoreGetter = async function () {
		const plays = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getPlaysByLotteryId(lotteryId);

		await PlayCacheStore.setPlaysByLotteryId(lotteryId, plays);

		return plays;
	};

	try {
		let plays = await Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });

		if (projections !== null) {
			plays = plays.map(play => pick(play, projections));
		}

		return plays;
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function getPrimaryPlaysByLotteryIdAndIds(lotteryId, playIds, {
	requestId,
	mapped = false,
	force = false,
}, projections = null) {
	const CacheStoreGetter = function () {
		return PlayCacheStore.getPlaysByLotteryIdAndIds(lotteryId, playIds);
	};

	const DefaultStoreGetter = async function () {
		const plays = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getPlaysByLotteryId(lotteryId);

		await PlayCacheStore.setPlaysByLotteryId(lotteryId, plays);

		const playsMap = keyBy(plays, "id");

		return playIds
			.filter(playId => playsMap[playId] !== undefined)
			.map(playId => playsMap[playId]);
	};

	try {
		let plays = await Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });

		if (projections !== null) {
			plays = plays.map(play => pick(play, projections));
		}

		if (mapped) {
			plays = keyBy(plays, 'id');
		}

		return plays;
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _getPrimaryPlaysByLotteryIdAndPlayClassId(lotteryId, playClassId, { jwt, requestId }) {
	try {
		return await new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.getPlaysByLotteryIdAndPlayClassId(lotteryId, playClassId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _updatePrimaryManyPlayStatusByLotteryId(lotteryId, plays, { jwt, requestId }) {
	try {
		await new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.updateManyPlayStatusByLotteryId(lotteryId, plays);

		await PlayCacheStore.removePlaysByLotteryId(lotteryId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _updatePrimaryManyPlayDeltaBonusAndPKByLotteryId(lotteryId, plays, { jwt, requestId }) {
	try {
		await new LotteryManagement(global.LOTTERY_MANAGEMENT_ENDPOINT)
			.setVersion(global.LOTTERY_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setJWT(jwt)
			.updateManyPlayDeltaBonusAndPKByLotteryId(lotteryId, plays);

		await PlayCacheStore.removePlaysByLotteryId(lotteryId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

module.exports = {
	MIN_PROJECTIONS,

	// primary store for client
	getPrimaryPlaysByLotteryId,
	getPrimaryPlaysByLotteryIdAndIds,

	// primary store for management
	_getPrimaryPlaysByLotteryIdAndPlayClassId,
	_updatePrimaryManyPlayStatusByLotteryId,
	_updatePrimaryManyPlayDeltaBonusAndPKByLotteryId,
};
