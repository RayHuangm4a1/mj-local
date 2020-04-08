const {
	RequestValidationError,
} = require("ljit-error");
const { STAFF_INVALID_REQUEST } = require("../../../../lib/error/code");
const {
	ENUM_STAFF_STATUS,
} = require("../../../../lib/enum");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkParams("staffId").isSQLId();
	req.checkBody("status").isIn(Object.values(ENUM_STAFF_STATUS));
	req.checkBody("roleId").isSQLId();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(STAFF_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	res.locals.selectedRoleId = req.body.roleId;

	req.sanitizeParams("staffId").toInt();

	next();
};
