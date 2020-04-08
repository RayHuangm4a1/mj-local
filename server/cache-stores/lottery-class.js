const {
	set,
	get,
	del,
} = require("ljit-redis/model");
const LOTTERY_CLASSES_KEY_PREFIX = "lotteryClasses";
const { LOTTERY_CLASSES_TTL } = require("./index");

async function getLotteryClasses() {
	const lotteryClasses = await get(`${LOTTERY_CLASSES_KEY_PREFIX}`);

	if (lotteryClasses === null) {
		return null;
	}

	return JSON.parse(lotteryClasses);
}

function setLotteryClasses(lotteryClasses) {
	return set(`${LOTTERY_CLASSES_KEY_PREFIX}`, JSON.stringify(lotteryClasses), "EX", LOTTERY_CLASSES_TTL);
}

function removeLotteryClasses() {
	return del(`${LOTTERY_CLASSES_KEY_PREFIX}`);
}

module.exports = {
	getLotteryClasses,
	setLotteryClasses,
	removeLotteryClasses,
};
