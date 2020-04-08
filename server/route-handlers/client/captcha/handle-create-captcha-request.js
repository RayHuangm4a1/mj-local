const {
	getDateAfterNSeconds,
} = require("../../../lib/date");
const {
	createCaptcha,
} = require("../../../lib/captcha");
const FIVE_MINUTES_IN_SECONDS = 300;

module.exports = function handleCreateCaptchaRequest(req, res, next) {
	try {
		const { text, image } = createCaptcha();

		req.session.captcha = text;
		req.session.captchaExpiredAt = getDateAfterNSeconds(FIVE_MINUTES_IN_SECONDS);

		res.status(201).json({
			captcha: image
		});
	} catch (error) {
		next(error);
	}
};
