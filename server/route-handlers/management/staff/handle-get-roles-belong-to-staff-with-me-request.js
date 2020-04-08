const {
	getActiveDescendantRolesByRoleId,

	ROLE_PROJECTIONS,
} = require("../../../services/staff.admin");

module.exports = async function handleGetRolesBelongToStaffWithMeRequest(req, res, next) {
	try {
		const result = await getActiveDescendantRolesByRoleId(req.user.roleId, {
			projections: ROLE_PROJECTIONS.NAME,
		});

		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
