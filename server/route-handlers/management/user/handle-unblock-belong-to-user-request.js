const {
	unblockUserById,
} = require("../../../services/user.admin");

module.exports = async function handleUnblocBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await unblockUserById(userId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
