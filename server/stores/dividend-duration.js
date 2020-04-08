const { pick } = require("ljit-collection");
const {
	find,
	findCreateFind,
} = require("../models/dividend-duration");
const MIN_PROJECTIONS = [
	"id",
	"startedAt",
	"closedAt",
];
const ID_ONLY_PROJECTIONS = [
	"id",
];
const { generateDividendDuration } = require("../lib/stats-helpers");

async function getDividendDurationByDate(date, {
	duration = "half_month",
	transaction,
	projections,
} = {}) {
	const { startedAt, closedAt } = generateDividendDuration(date, duration);
	const [dividendDuration] = await findCreateFind({
		where: {
			startedAt,
			closedAt,
		},
		transaction,
	});

	if (projections !== undefined) {
		return pick(dividendDuration, projections);
	}

	return dividendDuration;
}

function getLatestDividendDuration({
	duration = "half_month",
	transaction,
	projections,
} = {}) {
	const currentDate = new Date();

	return getDividendDurationByDate(currentDate, {
		duration, transaction, projections
	});
}

async function getLastDividendDurations({
	duration = "half_month",
	limit = 4,
	transaction,
	projections,
} = {}) {
	const latestDividendDuration = await getLatestDividendDuration({
		duration, transaction, projections
	});
	const dividendDurations = await find({
		offset: 1,
		limit: limit - 1,
		order: [
			["id", "DESC"],
		],
		attributes: projections,
	});

	return [latestDividendDuration, ...dividendDurations];
}

async function getDividendableDuration({
	duration = "half_month",
	transaction,
	projections,
} = {}) {
	const [_, previousDividendDuration = null] = await getLastDividendDurations({
		duration,
		limit: 2,
		transaction,
		projections
	});

	return previousDividendDuration;
}

module.exports = {
	getDividendDurationByDate,
	getLastDividendDurations,
	getLatestDividendDuration,
	getDividendableDuration,

	MIN_PROJECTIONS,
	ID_ONLY_PROJECTIONS,
};
