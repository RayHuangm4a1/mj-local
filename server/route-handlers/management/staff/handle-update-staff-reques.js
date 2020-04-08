const {
	updateStaffById,
} = require("../../../services/staff.admin");

module.exports = async function handleUpdateStaffRequest(req, res, next) {
	const { staffId } = req.params;
	const {
		status, roleId, description,
	} = req.body;

	try {
		await updateStaffById(staffId, {
			status,
			roleId,
			description,
		});

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
