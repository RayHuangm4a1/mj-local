const {
	getDepositClassesWithinBankAccountsByLevelId,
} = require('../../../services/deposit');

module.exports = async function handleGetDepositClassesRequest(req, res, next) {
	const { levelId } = res.locals.user;

	try {
		const depositClasses = await getDepositClassesWithinBankAccountsByLevelId(levelId);

		res.status(200).json(depositClasses);
	} catch (error) {
		next(error);
	}
};
