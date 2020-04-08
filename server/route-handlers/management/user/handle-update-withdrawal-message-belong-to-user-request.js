const { upsertWithdrawalMessage } = require("../../../services/user.admin");

module.exports = async function handleUpdateWithdrawalMessageBelongToUserRequest(req, res, next) {
	const { id: userId, username } = res.locals.managedUser;
	const { message } = req.body;

	try {
		await upsertWithdrawalMessage({
			userId,
			username,
			message,
		});

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
