const {
	hvals,
	hget,
	del,
	expirenx,
} = require("ljit-redis/model");
const LOTTERIES_KEY_PREFIX = "lotteries";
const { LOTTERIES_TTL } = require("./index");

async function getLotteries() {
	const lotteries = await hvals(LOTTERIES_KEY_PREFIX);

	return lotteries.map(JSON.parse);
}

async function getLotteryById(lotteryId) {
	const lottery = await hget(
		LOTTERIES_KEY_PREFIX,
		lotteryId
	);

	if (lottery === null) {
		return null;
	}

	return JSON.parse(lottery);
}

function setLotteries(lotteries) {
	const values = lotteries.reduce((accumulator, lottery) => {
		accumulator[lottery.id] = JSON.stringify(lottery);

		return accumulator;
	}, {});
	const key = LOTTERIES_KEY_PREFIX;

	return expirenx(
		key,
		LOTTERIES_TTL,
		function (batch) {
			return batch.hmset(
				key,
				values
			);
		}
	);
}

function removeLotteries() {
	return del(LOTTERIES_KEY_PREFIX);
}

module.exports = {
	getLotteries,
	getLotteryById,
	setLotteries,
	removeLotteries,
};
