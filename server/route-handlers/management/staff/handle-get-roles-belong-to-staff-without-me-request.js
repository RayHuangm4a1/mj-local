const {
	getDescendantRolesWithParentById,
} = require("../../../services/staff.admin");

module.exports = async function handleGetRolesBelongToStaffWithoutMeRequest(req, res, next) {
	const { roleId } = req.user;

	try {
		const roles = await getDescendantRolesWithParentById(roleId);

		res.status(200).json(roles);
	} catch (error) {
		next(error);
	}
};
