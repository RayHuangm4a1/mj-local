const {
	hmget,
	del,
	hvals,
	expirenx,
} = require('ljit-redis/model');
const {
	PLAYS_TTL,
} = require("./index");
const PLAYS_KEY_PREFIX = 'plays';

async function getPlaysByLotteryIdAndIds(lotteryId, playIds) {
	const plays = await hmget(
		`${PLAYS_KEY_PREFIX}:${lotteryId}`,
		playIds
	);

	return plays.filter(play => play).map(JSON.parse);
}

function setPlaysByLotteryId(lotteryId, plays) {
	const values = plays.reduce((accumulator, play) => {
		accumulator[play.id] = JSON.stringify(play);

		return accumulator;
	}, {});
	const key = `${PLAYS_KEY_PREFIX}:${lotteryId}`;

	return expirenx(
		key,
		PLAYS_TTL,
		function (batch) {
			return batch.hmset(
				key,
				values
			);
		}
	);
}

async function getPlaysByLotteryId(lotteryId) {
	const plays = await hvals(`${PLAYS_KEY_PREFIX}:${lotteryId}`);

	return plays.map(JSON.parse);
}

function removePlaysByLotteryId(lotteryId) {
	return del(`${PLAYS_KEY_PREFIX}:${lotteryId}`);
}

function removePlaysWithinLotteryIds(lotteryIds) {
	const keys = lotteryIds.map(lotteryId => `${PLAYS_KEY_PREFIX}:${lotteryId}`);

	return del(keys);
}

module.exports = {
	setPlaysByLotteryId,
	getPlaysByLotteryId,
	getPlaysByLotteryIdAndIds,
	removePlaysByLotteryId,
	removePlaysWithinLotteryIds,
};
