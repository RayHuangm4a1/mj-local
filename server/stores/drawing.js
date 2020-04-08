const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const {
	NotFoundError,
	InternalServerError,
} = require("ljit-error");
const {
	keyBy,
} = require("ljit-collection");
const {
	DRAWING_NOT_FOUND,
} = require("mj-service-sdks/error/code");
const {
	find,
	findOne,
	update,
	count,
	create,
	upsert,
	increment,
} = require("../models/drawing");
const DrawingCacheStore = require("../cache-stores/drawing");
const Cache = require("../lib/cache");
const {
	ENUM_DRAWING_STATUS,
} = require("../lib/enum");
const {
	CANCELABLE_STATUSES,
	RENEWABLE_STATUSES,
	convertDrawingScheduleTimeTableRowToDrawingByLotteryId,
} = require("../lib/drawing");
const {
	DEFAULT_MANAGEMENT_LIMIT,

	getOffsetByPageAndLimit,
} = require('./index');
const MIN_PROJECTIONS = [
	"lotteryId",
	"issue",
	"index",
	"opencode",
	"startedAt",
	"closedAt",
	"openedAt",
	"status",
];
const PLATFORM_INCOME_EXPENSE_PROJECTIONS = [
	"lotteryId",
	"issue",
	"index",
	"opencode",
	"startedAt",
	"closedAt",
	"openedAt",
	"income",
	"expense",
	"status",
];
const EARLY_OPENED_DRAWING_REQUIRED_PROJECTIONS = [
	"lotteryId",
	"issue",
];
const OPENCODE_ONLY_PROJECTIONS = [
	"opencode",
];

async function getPrimaryCurrentDrawingByLotteryId(lotteryId, { requestId, force = false }) {
	const CacheStoreGetter = function () {
		return  DrawingCacheStore.getCurrentDrawingByLotteryId(lotteryId);
	};

	const DefaultStoreGetter = async function () {
		const drawings = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, {
				before: 1,
				after: 120,
			});

		await DrawingCacheStore.setBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, drawings);

		return drawings[1];
	};

	try {
		return Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });
	} catch (error) {
		if (error.code === DRAWING_NOT_FOUND.CODE) {
			throw new NotFoundError(
				DRAWING_NOT_FOUND.MESSAGE,
				DRAWING_NOT_FOUND.CODE
			);
		}

		throw new InternalServerError(error);
	}
}

async function getPrimaryPreviousAndCurrentDrawingsByLotteryId(lotteryId, { requestId, force = false }) {
	const CacheStoreGetter = function () {
		return DrawingCacheStore.getPreviousAndCurrentDrawingsByLotteryId(lotteryId);
	};

	const DefaultStoreGetter = async function () {
		const drawings = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, {
				before: 1,
				after: 120,
			});

		await DrawingCacheStore.setBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, drawings);

		return drawings.slice(0,2);
	};

	try {
		let [previousDrawing, currentDrawing] = await Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });

		const openedDrawing = await getDrawingByLotteryIdAndIssue(
			lotteryId,
			previousDrawing.issue,
			{ projections: MIN_PROJECTIONS }
		);

		if (openedDrawing !== null) {
			previousDrawing = openedDrawing;
		} else {
			previousDrawing = convertDrawingScheduleTimeTableRowToDrawingByLotteryId(lotteryId, previousDrawing, MIN_PROJECTIONS);
		}

		currentDrawing = convertDrawingScheduleTimeTableRowToDrawingByLotteryId(lotteryId, currentDrawing, MIN_PROJECTIONS);
		currentDrawing.status = ENUM_DRAWING_STATUS.OPENING;

		return [currentDrawing, previousDrawing];
	} catch (error) {
		if (error.code === DRAWING_NOT_FOUND.CODE) {
			throw new NotFoundError(
				DRAWING_NOT_FOUND.MESSAGE,
				DRAWING_NOT_FOUND.CODE
			);
		}

		throw new InternalServerError(error);
	}
}

async function getPrimaryOpenedDrawingsByLotteryId(lotteryId, { issue, limit, requestId }) {
	try {
		return await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getOpenedDrawingsByLotteryId(lotteryId, { issue, limit });
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function isPrimaryNextDrawingOpeningByLotteryIdAndIssue(lotteryId, issue, { requestId, force = false }) {
	const CacheStoreGetter = async function () {
		return DrawingCacheStore.getPreviousDrawingByLotteryId(lotteryId);
	};

	const DefaultStoreGetter = async function () {
		const drawings = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, {
				before: 1,
				after: 120,
			});

		await DrawingCacheStore.setBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, drawings);

		return drawings[0];
	};

	try {
		const previousDrawing = await Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });

		return previousDrawing.issue === issue;
	} catch (error) {
		if (error.code === DRAWING_NOT_FOUND.CODE) {
			throw new NotFoundError(DRAWING_NOT_FOUND.MESSAGE, DRAWING_NOT_FOUND.CODE);
		}

		throw new InternalServerError(error);
	}
}

async function getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId(lotteryId, { limit, requestId, force = false }) {
	const CacheStoreGetter = function () {
		return DrawingCacheStore.getCurrentAndAfterDrawingsByLotteryId(lotteryId, { limit });
	};

	const DefaultStoreGetter = async function () {
		const drawings = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, {
				before: 1,
				after: 120,
			});

		await DrawingCacheStore.setBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, drawings);

		return drawings.slice(1, limit + 1);
	};

	try {
		return Cache(CacheStoreGetter, DefaultStoreGetter).get({ force });
	} catch (error) {
		if (error.code === DRAWING_NOT_FOUND.CODE) {
			throw new NotFoundError(
				DRAWING_NOT_FOUND.MESSAGE,
				DRAWING_NOT_FOUND.CODE
			);
		}

		throw new InternalServerError(error);
	}
}

async function _getPrimaryLessThanEqualCurrentDrawingsByLotteryId(lotteryId, { limit, requestId }) {
	try {
		let drawings = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, {
				before: limit - 1,
				after: 0,
			});

		const issues = drawings.map(({ issue }) => issue);

		const openedDrawings = await getDrawingsByLotteryIdAndIssues(lotteryId, issues, { projections: PLATFORM_INCOME_EXPENSE_PROJECTIONS });
		const openedDrawingsMap = keyBy(openedDrawings, "issue");

		drawings = drawings.map(drawing => {
			if (openedDrawingsMap[drawing.issue] !== undefined) {
				return openedDrawingsMap[drawing.issue];
			} else {
				return convertDrawingScheduleTimeTableRowToDrawingByLotteryId(lotteryId, drawing, PLATFORM_INCOME_EXPENSE_PROJECTIONS);
			}
		}).reverse();

		// current drawing status is opening
		if (openedDrawingsMap[drawings[0].issue] === undefined) {
			drawings[0].status = ENUM_DRAWING_STATUS.OPENING;
		}

		return drawings;
	} catch (error) {
		if (error.code === DRAWING_NOT_FOUND.CODE) {
			throw new NotFoundError(
				DRAWING_NOT_FOUND.MESSAGE,
				DRAWING_NOT_FOUND.CODE
			);
		}

		throw new InternalServerError(error);
	}
}

async function _getPrimaryLessThanIssueDrawingsByLotteryIdAndIssue(lotteryId, issue, { limit, requestId }) {
	try {
		let drawings = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, {
				issue,
				before: limit,
				after: 0,
			});

		// required to less than assigned issue.
		drawings.pop();

		const issues = drawings.map(({ issue }) => issue);

		const openedDrawings = await getDrawingsByLotteryIdAndIssues(lotteryId, issues, { projections: PLATFORM_INCOME_EXPENSE_PROJECTIONS });
		const openedDrawingsMap = keyBy(openedDrawings, "issue");

		return drawings.map(drawing => {
			if (openedDrawingsMap[drawing.issue] !== undefined) {
				return openedDrawingsMap[drawing.issue];
			} else {
				return convertDrawingScheduleTimeTableRowToDrawingByLotteryId(lotteryId, drawing, PLATFORM_INCOME_EXPENSE_PROJECTIONS);
			}
		}).reverse();
	} catch (error) {
		if (error.code === DRAWING_NOT_FOUND.CODE) {
			throw new NotFoundError(
				DRAWING_NOT_FOUND.MESSAGE,
				DRAWING_NOT_FOUND.CODE
			);
		}

		throw new InternalServerError(error);
	}
}

async function _getPrimaryDrawingByLotteryIdAndIssue(lotteryId, issue, { requestId }) {
	try {
		const drawings = await global.LOTTERY_CLIENT
			.setRequestId(requestId)
			.getBeforeCurrentAndAfterDrawingsByLotteryId(lotteryId, {
				issue,
				before: 0,
				after: 0,
			});

		return drawings.length ? drawings[0] : null;
	} catch (error) {
		if (error.code === DRAWING_NOT_FOUND.CODE) {
			throw new NotFoundError(
				DRAWING_NOT_FOUND.MESSAGE,
				DRAWING_NOT_FOUND.CODE
			);
		}

		throw new InternalServerError(error);
	}
}

async function getLatestFetchedDrawingByLotteryId(lotteryId, {
	projections,
} = {}) {
	return await findOne({
		where: {
			lotteryId,
			isFetched: true,
		},
		order: [[
			"issue", "DESC"
		]],
		attributes: projections,
	});
}

async function isDrawingExistedByLotteryIdAndIssue(lotteryId, issue) {
	const numOfDrawings = await count({
		where: {
			lotteryId,
			issue,
			opencode: {
				[Op.ne]: null,
			},
		},
	});

	return numOfDrawings === 1;
}

async function isDrawingStoppedByLotteryIdAndIssue(lotteryId, issue) {
	const numOfDrawings = await count({
		where: {
			lotteryId,
			issue,
			status: ENUM_DRAWING_STATUS.STOPPED,
		},
	});

	return numOfDrawings === 1;
}

function getDrawingByLotteryIdAndIssue(lotteryId, issue, {
	projections,
} = {}) {
	return findOne({
		where: {
			lotteryId,
			issue
		},
		attributes: projections,
	});
}

function getDrawingsByLotteryIdAndIssues(lotteryId, issues, {
	projections,
} = {}) {
	return find({
		where: {
			lotteryId,
			issue: {
				[Op.in]: issues,
			},
		},
		attributes: projections,
	});
}

function getDrawingsByLotteryId(lotteryId, {
	limit,
	projections,
} = {}) {
	return find({
		where: {
			lotteryId,
		},
		order: [[
			"issue", "DESC"
		]],
		limit,
		attributes: projections,
	});
}

function getDrawingsByLotteryIdAndPagination(lotteryId, page, {
	projections,
} = {}) {
	const limit = DEFAULT_MANAGEMENT_LIMIT;
	const offset = getOffsetByPageAndLimit(page, limit);

	return find({
		where: {
			lotteryId,
		},
		order: [[
			"issue", "DESC"
		]],
		offset,
		limit,
		attributes: projections,
	});
}

function getEarliestRewardGrantingDrawing({
	projections,
} = {}) {
	return findOne({
		where: {
			status: ENUM_DRAWING_STATUS.REWARD_GRANTING,
		},
		order: [[ "updatedAt" ]],
		attributes: projections,
	});
}

function getEarliestRewardGrantedDrawing({
	projections,
} = {}) {
	return findOne({
		where: {
			status: ENUM_DRAWING_STATUS.REWARD_GRANTED,
		},
		order: [[ "updatedAt" ]],
		attributes: projections,
	});
}

function getEarlyOpenedDrawing({
	projections,
} = {}) {
	return findOne({
		where: {
			status: ENUM_DRAWING_STATUS.EARLY_OPENED,
		},
		order: [[ "updatedAt" ]],
		attributes: projections,
	});
}

function getEarliestCancelingDrawing({
	projections,
} = {}) {
	return findOne({
		where: {
			status: ENUM_DRAWING_STATUS.CANCELING,
		},
		order: [[ "updatedAt" ]],
		attributes: projections,
	});
}

function getEarliestModifyingDrawing({
	projections,
} = {}) {
	return findOne({
		where: {
			status: ENUM_DRAWING_STATUS.MODIFYING,
		},
		order: [[ "updatedAt" ]],
		attributes: projections,
	});
}

function createDrawing(row) {
	return create(row);
}

function upsertDrawing(row) {
	return upsert(row, {
		fields: [ "isFetched", "updatedAt" ],
	});
}

function setDrawingFromRewardGrantingToRewardGrantedByLotteryIdAndIssue(lotteryId, issue) {
	return update({
		status: ENUM_DRAWING_STATUS.REWARD_GRANTED,
	}, {
		where: {
			lotteryId,
			issue,
			status: ENUM_DRAWING_STATUS.REWARD_GRANTING,
		},
	});
}

function setDrawingFromRewardGrantedToTeamCommissionGrantedByLotteryIdAndIssue(lotteryId, issue) {
	return update({
		status: ENUM_DRAWING_STATUS.TEAM_COMMISSION_GRANTED,
	}, {
		where: {
			lotteryId,
			issue,
			status: ENUM_DRAWING_STATUS.REWARD_GRANTED,
		},
	});
}

function setDrawingFromEarlyOpenedToClosedByLotteryIdAndIssue(lotteryId, issue) {
	return update({
		status: ENUM_DRAWING_STATUS.CLOSED,
	}, {
		where: {
			lotteryId,
			issue,
			status: ENUM_DRAWING_STATUS.EARLY_OPENED,
		},
	});
}

function setDrawingFromCancelingToCanceledByLotteryIdAndIssue(lotteryId, issue) {
	return update({
		status: ENUM_DRAWING_STATUS.CANCELED,
	}, {
		where: {
			lotteryId,
			issue,
			status: ENUM_DRAWING_STATUS.CANCELING,
		},
	});
}

function setCancelableDrawingToCancelingByLotteryIdAndIssue(lotteryId, issue) {
	return update({
		status: ENUM_DRAWING_STATUS.CANCELING,
	}, {
		where: {
			lotteryId,
			issue,
			status: {
				[Op.in]: CANCELABLE_STATUSES,
			},
		},
	});
}

function setRenewableDrawingToModifyingByLotteryIdAndIssue(lotteryId, issue, opencode) {
	return update({
		opencode,
		status: ENUM_DRAWING_STATUS.MODIFYING,
	}, {
		where: {
			lotteryId,
			issue,
			status: {
				[Op.in]: RENEWABLE_STATUSES,
			},
		},
	});
}

function setDrawingFromModifyingToRewardGrantingByLotteryIdAndIssue(lotteryId, issue) {
	return update({
		status: ENUM_DRAWING_STATUS.REWARD_GRANTING,
	}, {
		where: {
			lotteryId,
			issue,
			status: ENUM_DRAWING_STATUS.MODIFYING,
		},
	});
}

function increaseIncomeAndExpenseByLotteryIdAndIssue(lotteryId, issue, { income, expense }, {
	transaction,
} = {}) {
	return increment({
		income,
		expense,
	}, {
		where: {
			lotteryId,
			issue,
		},
		transaction,
	});
}

function increaseIncomeByLotteryIdAndIssue(lotteryId, issue, amount, {
	transaction,
} = {}) {
	return increment({
		income: amount,
	}, {
		where: {
			lotteryId,
			issue,
		},
		transaction,
	});
}

function increaseExpenseByLotteryIdAndIssue(lotteryId, issue, amount, {
	transaction,
} = {}) {
	return increment({
		expense: amount,
	}, {
		where: {
			lotteryId,
			issue,
		},
		transaction,
	});
}

module.exports = {
	//projection
	MIN_PROJECTIONS,
	EARLY_OPENED_DRAWING_REQUIRED_PROJECTIONS,
	OPENCODE_ONLY_PROJECTIONS,

	// primary store for management
	_getPrimaryLessThanEqualCurrentDrawingsByLotteryId,
	_getPrimaryLessThanIssueDrawingsByLotteryIdAndIssue,
	_getPrimaryDrawingByLotteryIdAndIssue,

	// primary store for client
	getPrimaryOpenedDrawingsByLotteryId,
	getPrimaryPreviousAndCurrentDrawingsByLotteryId,
	getPrimaryCurrentDrawingByLotteryId,
	getPrimaryGreaterThanEqualCurrentDrawingsByLotteryId,
	isPrimaryNextDrawingOpeningByLotteryIdAndIssue,

	// local store
	createDrawing,
	upsertDrawing,
	getLatestFetchedDrawingByLotteryId,
	getDrawingByLotteryIdAndIssue,
	getDrawingsByLotteryId,
	getDrawingsByLotteryIdAndPagination,
	getEarliestRewardGrantingDrawing,
	getEarliestRewardGrantedDrawing,
	getEarlyOpenedDrawing,
	getEarliestCancelingDrawing,
	getEarliestModifyingDrawing,
	isDrawingExistedByLotteryIdAndIssue,
	isDrawingStoppedByLotteryIdAndIssue,

	setDrawingFromRewardGrantingToRewardGrantedByLotteryIdAndIssue,
	setDrawingFromRewardGrantedToTeamCommissionGrantedByLotteryIdAndIssue,
	setDrawingFromEarlyOpenedToClosedByLotteryIdAndIssue,
	setDrawingFromCancelingToCanceledByLotteryIdAndIssue,
	setCancelableDrawingToCancelingByLotteryIdAndIssue,
	setRenewableDrawingToModifyingByLotteryIdAndIssue,
	setDrawingFromModifyingToRewardGrantingByLotteryIdAndIssue,
	increaseIncomeAndExpenseByLotteryIdAndIssue,
	increaseIncomeByLotteryIdAndIssue,
	increaseExpenseByLotteryIdAndIssue,
};
