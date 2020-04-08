const {
	updateLoginPasswordByAccountId,
	updateLoginPasswordUpdatedAtById,
} = require("../../../services/staff.admin");

/**
 * @param {object} res.locals.managedStaff
 */
module.exports = async function handleUpdateLoginPasswordBelongToStaffRequest(req, res, next) {
	const requestId = req.header("X-Request-Id");
	const { ip } = req.device;
	const { password } = req.body;
	const { jwt } = req.user;
	const { id: staffId, accountId } = res.locals.managedStaff;

	try {
		await updateLoginPasswordByAccountId(accountId, password, {
			ip,
			jwt,
			requestId,
		});

		await updateLoginPasswordUpdatedAtById(staffId, new Date());

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
