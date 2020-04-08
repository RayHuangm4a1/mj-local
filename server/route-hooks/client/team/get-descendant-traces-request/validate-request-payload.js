const Joi = require("joi");
const {
	RequestValidationError,
} = require("ljit-error");
const {
	TEAM_INVALID_REQUEST,
} = require("../../../../lib/error/code");
const {
	ENUM_TRACE_STATUS,
	ENUM_RELATIONSHIP_DISTANCE,
} = require("../../../../lib/enum");
const {
	getDateBeforeNDays,
} = require("../../../../lib/date");

const SEARCH_CHILDREN_TRACES_VALIDATION_SCHEMA = Joi.object({
	username: Joi
		.when("distance", {
			is: -1,
			then: Joi.required(),
		}),
});

module.exports = function validateRequestPayload(req, res, next) {
	const earliestQueriedDate = getDateBeforeNDays(45);

	req.checkQuery("id").optional().isSQLId();
	req.checkQuery("status").optional().isIn(Object.values(ENUM_TRACE_STATUS));
	req.checkQuery("distance").optional().isIn([ENUM_RELATIONSHIP_DISTANCE.CHILDREN, -1]);
	req.checkQuery("limit").optional().isLimit();
	req.checkQuery("username").optional().isUsername();
	req.checkQuery("sort").optional().isIn(["createdAt", "amount", "count"]);
	req.checkQuery("order").optional().isOrder();
	req.checkQuery("lotteryId").optional().isSQLId();
	req.checkQuery("from").optional().after(earliestQueriedDate);
	req.checkQuery("to").optional().isTimestamp();
	req.checkQuery("page").optional().isPage();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(TEAM_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	let { error } = Joi.validate(
		req.query,
		SEARCH_CHILDREN_TRACES_VALIDATION_SCHEMA,
		{
			allowUnknown: true,
		}
	);

	if (error !== null) {
		error = new RequestValidationError(TEAM_INVALID_REQUEST.CODE, error);

		return next(error);
	}

	req.sanitizeQuery('status').toInt();
	req.sanitizeQuery('distance').toInt();

	next();
};
