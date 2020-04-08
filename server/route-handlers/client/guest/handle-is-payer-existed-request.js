const {
	isPayerExistedByIdAndPayer,
} = require("../../../services/user");
const {
	NotFoundError,
} = require("ljit-error");
const {
	INVALID_USER_PAYER,
} = require("../../../lib/error/code");

module.exports = async function handleIsPayerExistedRequest(req, res, next) {
	const { payer } = req.params;
	const { userId } = req.session.guest;

	try {
		const isPayerExisted = await isPayerExistedByIdAndPayer(userId, payer);

		if (!isPayerExisted) {
			throw new NotFoundError(
				INVALID_USER_PAYER.MESSAGE,
				INVALID_USER_PAYER.CODE
			);
		}

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
