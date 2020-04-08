const {
	getDepositApplicationFormsByDepartmentIdDepositClassIdAndPagination,
} = require('../../../services/deposit');

module.exports = async function handleGetDepositApplicationFormsBelongToDepartmentRequest(req, res, next) {
	const { departmentId, depositClassId } = req.params;
	const {
		createdAtFrom, createdAtTo,
		confirmedAtFrom, confirmedAtTo,
		page, limit, sort, order,
		username, levelId, id,
		bankId, payer, amount,
		status,
	} = req.query;

	try {
		const result = await getDepositApplicationFormsByDepartmentIdDepositClassIdAndPagination(departmentId, depositClassId, page, {
			createdAtFrom,
			createdAtTo,
			confirmedAtFrom,
			confirmedAtTo,
			limit,
			sort,
			order,
			username,
			levelId,
			id,
			bankId,
			payer,
			amount,
			status,
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};