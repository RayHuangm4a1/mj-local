const {
	createDepositApplicationForm,
	generateExpiredAtOfDepositApplicationForm,
} = require("../../../services/deposit-application-form");
const {
	ENUM_DEPOSIT_APPLICATION_FORM_STATUS,
} = require("../../../lib/enum");

module.exports = async function handleCreateDepositApplicationFormBelongToDepositClassRequest(req, res, next) {
	const { bankAccountWithLevels } = res.locals;
	const { levels, ...bankAccount } = bankAccountWithLevels;
	const { depositClassId } = req.params;
	const { amount, walletCode } = req.body;

	try {
		const expiredAt = generateExpiredAtOfDepositApplicationForm();

		const form = await createDepositApplicationForm({
			userId: res.locals.user.id,
			username: res.locals.user.username,
			userLevelId: res.locals.user.levelId,
			departmentId: bankAccount.departmentId,
			depositClassId,
			walletCode,
			bankId: bankAccountWithLevels.bankId,
			bankName: bankAccountWithLevels.bankName,
			bankAccountId: bankAccountWithLevels.id,
			bankAccountNumber: bankAccountWithLevels.number,
			amount,
			percentageOfFee: bankAccountWithLevels.percentageOfFee,
			payer: res.locals.user.payer,
			status: ENUM_DEPOSIT_APPLICATION_FORM_STATUS.NEW,
			expiredAt,
		});

		form.bankAccount = bankAccount;

		res.status(201).json(form);
	} catch (error) {
		next(error);
	}
};
