const {
	ConflictError,
} = require("ljit-error");
const {
	countPreviousWithdrawalApplicationFormsByUserId,
} = require("../../../../services/withdrawal");
const {
	HAS_PREVIOUS_WITHDRAWAL_APPLICATION_FORMS,
} = require("../../../../lib/error/code");

module.exports = async function hasPreviousWithdrawalApplicationFormsByUserId(req, res, next) {
	const { id: userId } = req.user;

	try {
		const count = await countPreviousWithdrawalApplicationFormsByUserId(userId);

		if (count > 0) {
			throw new ConflictError(
				HAS_PREVIOUS_WITHDRAWAL_APPLICATION_FORMS.MESSAGE,
				HAS_PREVIOUS_WITHDRAWAL_APPLICATION_FORMS.CODE
			);
		}
	} catch (error) {
		return next(error);
	}

	next();
};
