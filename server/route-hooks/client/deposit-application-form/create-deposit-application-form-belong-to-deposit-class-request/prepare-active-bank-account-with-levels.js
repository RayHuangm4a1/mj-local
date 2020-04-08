const {
	NotFoundError,
} = require("ljit-error");
const {
	BANK_ACCOUNT_NOT_FOUND,
} = require("../../../../lib/error/code");
const {
	getBankAccountWithLevelsByIdAndDepositClassId,
	BANK_ACCOUNT_PROJECTIONS,
} = require("../../../../services/bank-account");
const {
	LEVEL_PROJECTIONS,
} = require("../../../../services/level");

module.exports = async function prepareActiveBankAccountWithLevels(req, res, next) {
	const { depositClassId } = req.params;
	const { bankAccountId } = req.body;

	try {
		const bankAccountWithLevels = await getBankAccountWithLevelsByIdAndDepositClassId(bankAccountId, depositClassId, {
			bankAccountProjections: BANK_ACCOUNT_PROJECTIONS.DEPOSIT,
			levelProjections: LEVEL_PROJECTIONS.ID,
		});

		if (bankAccountWithLevels === null) {
			throw new NotFoundError(BANK_ACCOUNT_NOT_FOUND.MESSAGE, BANK_ACCOUNT_NOT_FOUND.CODE);
		}

		res.locals.bankAccountWithLevels = bankAccountWithLevels;
	} catch (error) {
		return next(error);
	}

	next();
};
