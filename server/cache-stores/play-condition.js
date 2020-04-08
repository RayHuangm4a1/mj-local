const {
	set,
	get,
} = require("ljit-redis/model");
const PLAY_CONDITIONS_KEY_PREFIX = "playConditions";
const { PLAY_CONDITIONS_TTL } = require("./index");

async function getPlayConditions(lotteryId) {
	const playConditions = await get(`${PLAY_CONDITIONS_KEY_PREFIX}:${lotteryId}`);

	if (playConditions === null) {
		return null;
	}

	return JSON.parse(playConditions);
}

function setPlayConditions(lotteryId, playConditions) {
	return set(`${PLAY_CONDITIONS_KEY_PREFIX}:${lotteryId}`, JSON.stringify(playConditions), "EX", PLAY_CONDITIONS_TTL);
}

module.exports = {
	getPlayConditions,
	setPlayConditions,
};
