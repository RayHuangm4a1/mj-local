const {
	mergeNewToInconsistentDepositApplicationForm,
} = require("../../../services/deposit-application-form.admin");

module.exports = async function handleConfirmInconsistentDepositApplicationFormRequest(req, res, next) {
	const operator = {
		id: req.user.id,
		username: req.user.username,
	};
	const {
		mergeRequiredInconsistentDepositApplicationForm, newDepositApplicationForm
	} = res.locals;

	try {
		const result = await mergeNewToInconsistentDepositApplicationForm(
			newDepositApplicationForm,
			mergeRequiredInconsistentDepositApplicationForm,
			{ operator }
		);

		res.status(200).json(result);
	} catch (error) {
		return next(error);
	}

	next();
};
