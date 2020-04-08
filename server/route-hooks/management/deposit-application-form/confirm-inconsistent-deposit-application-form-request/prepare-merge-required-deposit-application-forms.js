const {
	NotFoundError,
} = require('ljit-error');
const {
	DEPOSIT_APPLICATION_FORM_NOT_FOUND,
} = require('../../../../lib/error/code');
const {
	getMergeRequiredInconsistentDepositApplicationFormById,
	getNewDepositApplicationFormByIdDepartmentIdAndDepositClassId,
	BANK_ACCOUNT_PROJECTIONS,
	DEPOSIT_CLASS_PROJECTIONS,
} = require('../../../../services/deposit-application-form.admin');

module.exports = async function prepareMergeRequiredDepositApplicationForms(req, res, next) {
	const { inconsistentDepositApplicationFormId } = req.params;
	const { depositApplicationFormId } = req.body;

	try {
		const mergeRequiredInconsistentDepositApplicationForm = await getMergeRequiredInconsistentDepositApplicationFormById(inconsistentDepositApplicationFormId, {
			bankAccountProjections: BANK_ACCOUNT_PROJECTIONS.PERCENTAGE_OF_DAMA_AND_FEE,
			depositClassProjections: DEPOSIT_CLASS_PROJECTIONS.MIN,
		});

		if (mergeRequiredInconsistentDepositApplicationForm === null) {
			throw new NotFoundError(DEPOSIT_APPLICATION_FORM_NOT_FOUND.MESSAGE, DEPOSIT_APPLICATION_FORM_NOT_FOUND.CODE);
		}

		const { departmentId, depositClassId } = mergeRequiredInconsistentDepositApplicationForm;

		const newDepositApplicationForm = await getNewDepositApplicationFormByIdDepartmentIdAndDepositClassId(depositApplicationFormId, departmentId, depositClassId);

		if (newDepositApplicationForm === null) {
			throw new NotFoundError(DEPOSIT_APPLICATION_FORM_NOT_FOUND.MESSAGE, DEPOSIT_APPLICATION_FORM_NOT_FOUND.CODE);
		}

		res.locals.mergeRequiredInconsistentDepositApplicationForm = mergeRequiredInconsistentDepositApplicationForm;
		res.locals.newDepositApplicationForm = newDepositApplicationForm;
	} catch (error) {
		return next(error);
	}

	next();
};
