const {
	expirenx,
	lrange,
} = require("ljit-redis/model");
const LAST_OPENED_AND_FUTURE_DRAWINGS_KEY_PREFIX = "lastOpenedAndFutureDrawings";
const {
	LAST_OPENED_AND_FUTURE_DRAWINGS_TTL,
} = require("./index");

function setBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, drawings) {
	const key = `${LAST_OPENED_AND_FUTURE_DRAWINGS_KEY_PREFIX}:${lotteryId}`;

	return expirenx(key, LAST_OPENED_AND_FUTURE_DRAWINGS_TTL, (batch) => {
		return batch
			.del(key)
			.rpush(key, drawings.map(JSON.stringify));
	});
}

async function getPreviousAndCurrentDrawingsByLotteryId(lotteryId) {
	let drawings = await lrange(
		`${LAST_OPENED_AND_FUTURE_DRAWINGS_KEY_PREFIX}:${lotteryId}`,
		0,
		1
	);

	if (drawings.length !== 2) {
		return [];
	}

	drawings = drawings.map(JSON.parse);
	const { closedAt } = drawings[1];

	if (new Date(closedAt) <= new Date()) {
		return [];
	}

	return drawings;
}

async function getCurrentDrawingByLotteryId(lotteryId) {
	const drawings = await lrange(
		`${LAST_OPENED_AND_FUTURE_DRAWINGS_KEY_PREFIX}:${lotteryId}`,
		1,
		1
	);

	if (drawings.length !== 1) {
		return null;
	}

	const openingDrawing = JSON.parse(drawings[0]);
	const { closedAt } = openingDrawing;

	if (new Date(closedAt) <= new Date()) {
		return null;
	}

	return openingDrawing;
}

async function getPreviousDrawingByLotteryId(lotteryId) {
	const drawings = await lrange(
		`${LAST_OPENED_AND_FUTURE_DRAWINGS_KEY_PREFIX}:${lotteryId}`,
		0,
		1
	);

	if (drawings.length !== 2) {
		return null;
	}

	const [lastOpenedDrawing, openingDrawing] = drawings.map(JSON.parse);
	const { closedAt } = openingDrawing;

	if (new Date(closedAt) <= new Date()) {
		return null;
	}

	return lastOpenedDrawing;
}

async function getCurrentAndAfterDrawingsByLotteryId(lotteryId, { limit }) {
	const drawings = await lrange(
		`${LAST_OPENED_AND_FUTURE_DRAWINGS_KEY_PREFIX}:${lotteryId}`,
		1,
		limit
	);

	if (drawings.length !== limit) {
		return [];
	}

	const openingDrawing = JSON.parse(drawings[0]);
	const { closedAt } = openingDrawing;

	if (new Date(closedAt) <= new Date()) {
		return [];
	}

	return drawings.map(JSON.parse);
}

module.exports = {
	setBeforeCurrentAndAfterDrawingsByLotteryId,
	getPreviousAndCurrentDrawingsByLotteryId,
	getCurrentDrawingByLotteryId,
	getPreviousDrawingByLotteryId,
	getCurrentAndAfterDrawingsByLotteryId,
};
