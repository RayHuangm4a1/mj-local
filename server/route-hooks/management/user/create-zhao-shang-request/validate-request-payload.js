const {
	RequestValidationError,
} = require("ljit-error");
const { USER_INVALID_REQUEST } = require("../../../../lib/error/code");
const {
	ENUM_USER_TYPE,
} = require("../../../../lib/enum");

module.exports = function validateRequestPayload(req, res, next) {
	req.checkBody("username").isUsername();
	req.checkBody("password").isPassword();
	req.checkBody("type").isUserType([
		ENUM_USER_TYPE.ZHAOSHANG,
	]);
	req.checkBody("nickname").optional().isNickname();
	req.checkBody("bonus").isIn(res.locals.platform.bonus.list);

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};
