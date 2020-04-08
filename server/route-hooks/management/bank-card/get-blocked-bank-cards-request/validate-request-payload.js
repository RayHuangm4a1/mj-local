const {
	RequestValidationError,
} = require("ljit-error");
const {
	ENUM_BANK_CARD_STATUS,
} = require('../../../../lib/enum');
const {
	BANK_CARD_INVALID_REQUEST,
} = require('../../../../lib/error/code');

module.exports = function validateRequestPayload(req, res, next) {
	req.sanitizeQuery('status').toInt();

	if (req.query.status !== ENUM_BANK_CARD_STATUS.BLOCKED) {
		return next('route');
	}

	req.checkQuery('blockedPayer').optional().isPayer();
	req.checkQuery('number').optional().isBankCardNumber();
	req.checkQuery('bankId').optional().isSQLId();
	req.checkQuery('blockedAtFrom').optional().isTimestamp();
	req.checkQuery('blockedAtTo').optional().isTimestamp();
	req.checkQuery('description').optional();
	req.checkQuery('page').optional().isPage();
	req.checkQuery('limit').optional().isLimit();
	req.checkQuery('sort').optional().isIn(['number', 'blockedAt']);
	req.checkQuery('order').optional().isOrder();

	const errors = req.validationErrors();

	if (errors) {
		const error = new RequestValidationError(BANK_CARD_INVALID_REQUEST.CODE, errors);

		return next(error);
	}

	req.sanitizeQuery('blockedAtFrom').toInt();
	req.sanitizeQuery('blockedAtTo').toInt();

	next();
};
