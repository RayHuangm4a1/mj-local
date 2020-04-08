const {
	EXPIRED_CAPTCHA,
	INVALID_CAPTCHA
} = require("../lib/error/code");
const {
	ForbiddenError,
} = require("ljit-error");

function validateCaptcha(req, res, next) {
	if (process.env.NODE_ENV === "TEST") {
		return next();
	}

	const { captcha, captchaExpiredAt } = req.session;

	if (captcha === undefined || captchaExpiredAt === undefined) {
		return next(new ForbiddenError(
			INVALID_CAPTCHA.MESSAGE,
			INVALID_CAPTCHA.CODE,
		));
	}

	if (Date.now() > new Date(captchaExpiredAt).getTime()) {
		return next(new ForbiddenError(
			EXPIRED_CAPTCHA.MESSAGE,
			EXPIRED_CAPTCHA.CODE,
		));
	}

	if (req.query.captcha !== captcha) {
		return next(new ForbiddenError(
			INVALID_CAPTCHA.MESSAGE,
			INVALID_CAPTCHA.CODE,
		));
	}

	next();
}

module.exports = {
	validateCaptcha,
};
