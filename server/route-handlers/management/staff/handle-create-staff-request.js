const {
	createAccount,
	createStaff,
} = require("../../../services/staff.admin");

module.exports = async function handleCreateStaffRequest(req, res, next) {
	const requestId = req.header("x-request-id");
	const { ip } = req.device;
	const {
		username, password, roleId,
		description,
	} = req.body;

	let account = null;

	try {
		account = await createAccount({ username, password }, { requestId, ip });
	} catch (error) {
		return next(error);
	}

	try {
		const staff = await createStaff({
			username,
			roleId,
			accountId: account._id,
			description,
		});

		res.status(201).json(staff);

		next();
	} catch (error) {
		req.event.accountId = account._id;

		global.ACCOUNT_ARCHIVE_PRODUCER.produce(req.event);

		next(error);
	}
};
