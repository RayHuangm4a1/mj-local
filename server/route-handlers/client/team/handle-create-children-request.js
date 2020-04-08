const {
	createAccount,
	createUser,
} = require("../../../services/user");

module.exports = async function handleCreateChildrenRequest(req, res, next) {
	const {
		id: parentId,
	} = req.user;
	const {
		username, password, type,
		bonus,
	} = req.body;

	let account = null;

	try {
		account = await createAccount({ username, password }, {
			requestId: req.header("x-request-id"),
			ip: req.device.ip,
		});
	} catch (error) {
		return next(error);
	}

	try {
		const user = await createUser({
			parentId,
			username,
			type,
			accountId: account._id,
			deltaBonus: bonus - res.locals.platform.bonus.max,
			createdBy: "上级创建",
		});

		res.status(201).json(user);
	} catch (error) {
		req.event.accountId = account._id;

		global.ACCOUNT_ARCHIVE_PRODUCER.produce(req.event);

		next(error);
	}
};
