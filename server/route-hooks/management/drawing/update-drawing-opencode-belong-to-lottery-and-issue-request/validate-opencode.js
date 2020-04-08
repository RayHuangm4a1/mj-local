const {
	getPrimaryLotteryById
} = require("../../../../services/lottery");
const { RequestValidationError } = require("ljit-error");
const {
	DRAWING_INVALID_REQUEST,
	LOTTERY_NOT_FOUND
} = require("../../../../lib/error/code");
const {
	NotFoundError,
} = require("ljit-error");

module.exports = async function validateOpencode(req, res, next) {
	const requestId = req.header("X-Request-Id");

	try {
		const lottery = await getPrimaryLotteryById(req.params.lotteryId, { requestId });

		if (lottery === null) {
			throw new NotFoundError(
				LOTTERY_NOT_FOUND.MESSAGE,
				LOTTERY_NOT_FOUND.CODE
			);
		}

		req.checkBody("opencode").isOpencode(lottery.lotteryClass.id);

		const errors = req.validationErrors();

		if (errors) {
			const error = new RequestValidationError(DRAWING_INVALID_REQUEST.CODE, errors);

			return next(error);
		}

		next();
	} catch (error) {
		next(error);
	}
};
