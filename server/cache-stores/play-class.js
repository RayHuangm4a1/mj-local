const {
	set,
	get,
} = require("ljit-redis/model");
const PLAY_CLASSES_KEY_PREFIX = "playClasses";
const { PLAY_CLASSES_TTL } = require("./index");

async function getPlayClasses() {
	const playClasses = await get(`${PLAY_CLASSES_KEY_PREFIX}`);

	if (playClasses === null) {
		return null;
	}

	return JSON.parse(playClasses);
}

function setPlayClasses(playClasses) {
	return set(`${PLAY_CLASSES_KEY_PREFIX}`, JSON.stringify(playClasses), "EX", PLAY_CLASSES_TTL);
}

module.exports = {
	getPlayClasses,
	setPlayClasses,
};
