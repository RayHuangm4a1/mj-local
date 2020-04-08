const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const MS_OF_A_DAY = 86400000;
const DIVIDEND_SETTING_AMOUNT_RANGE = { min: 1, max: 100000000 };
const {
	AuthenticationError,
	RequestValidationError,
} = require("ljit-error");
const {
	WITHOUT_LOGGED_IN,
	COMMON_INVALID_QUERIED_DATE_RANGE,
} = require("../lib/error/code");
const { getTodayRange } = require("../lib/date");
const {
	ENUM_RELATIONSHIP_DISTANCE,
} = require("../lib/enum");

function setDefaultLimit(limit = DEFAULT_LIMIT) {
	return function (req, res, next) {
		req.query.limit = req.query.limit !== undefined ?
			parseInt(req.query.limit) :
			limit;

		next();
	};
}

function setDefaultPage(req, res, next) {
	req.query.page = req.query.page !== undefined ?
		parseInt(req.query.page) :
		DEFAULT_PAGE;

	next();
}

function setDefaultSort(field, order) {
	return function (req, res, next) {
		req.query.sort = req.query.sort !== undefined ?
			req.query.sort :
			field;
		req.query.order = req.query.order !== undefined ?
			req.query.order :
			order;

		next();
	};
}

function setDefaultQueriedDates({ fromField = 'from', toField = 'to' } = {}) {
	return function (req, res, next) {
		let { from, to } = getTodayRange();

		if (req.query[fromField] !== undefined) {
			from = new Date(parseInt(req.query[fromField]));
		}

		if (req.query[toField] !== undefined) {
			to = new Date(parseInt(req.query[toField]));
		}

		req.query[fromField] = from;
		req.query[toField] = to;

		next();
	};
}

function isLoggedIn(req, res, next) {
	if (!req.user) {
		return next(new AuthenticationError(WITHOUT_LOGGED_IN.MESSAGE, WITHOUT_LOGGED_IN.CODE));
	}

	next();
}

function validateQueriedDateRange(days) {
	const maxQueriesDateRangeInMS = days * MS_OF_A_DAY;

	return function (req, res, next) {
		const { from, to } = req.query;

		if (to - from > maxQueriesDateRangeInMS || to < from) {
			return next(new RequestValidationError(COMMON_INVALID_QUERIED_DATE_RANGE.CODE, [], COMMON_INVALID_QUERIED_DATE_RANGE.MESSAGE));
		}

		next();
	};
}

function setDefaultDistance(req, res, next) {
	req.query.distance = req.query.distance !== undefined ?
		req.query.distance :
		ENUM_RELATIONSHIP_DISTANCE.CHILDREN;

	next();
}

module.exports = {
	DIVIDEND_SETTING_AMOUNT_RANGE,

	setDefaultLimit,
	setDefaultPage,
	setDefaultSort,
	setDefaultQueriedDates,
	setDefaultDistance,
	isLoggedIn,
	validateQueriedDateRange,
};
