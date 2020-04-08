const {
	getStaffsWithRoleAndAccountByAncestorRoleIdAndPagination,
} = require("../../../services/staff.admin");

module.exports = async function handleGetStaffsRequest(req, res, next) {
	const { roleId } = req.user;
	const { username, page, limit } = req.query;

	try {
		const result = await getStaffsWithRoleAndAccountByAncestorRoleIdAndPagination(roleId, page, {
			username,
			limit,
			requestId: req.header("X-Request-Id"),
		});

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
