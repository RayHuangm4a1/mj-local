const {
	RequestValidationError,
} = require("ljit-error");
const { USER_INVALID_REQUEST } = require("../../../../lib/error/code");
const { ENUM_USER_TYPE } = require("../../../../lib/enum");

module.exports = function validateRequestPayload(req, res, next) {
	req.sanitizeQuery('type').toInt();
	req.sanitizeQuery("isNormal").toBoolean();

	req.checkQuery("username").optional().isUsername();
	req.checkQuery("type").optional().isUserType([
		ENUM_USER_TYPE.ZHAOSHANG,
		ENUM_USER_TYPE.AGENT,
		ENUM_USER_TYPE.MEMBER,
	]);
	req.checkQuery("isNormal").optional().isBoolean();
	req.checkQuery("payer").optional().isPayer();
	req.checkQuery("bankCardNumber").optional().isBankCardNumber();
	req.checkQuery("page").optional().isPage();
	req.checkQuery("sort").optional().isIn([
		"balance",
		"deltaBonus",
	]);
	req.checkQuery("order").optional().isOrder();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(USER_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	next();
};
