const {
	disableUserBettingById,
} = require("../../../services/user.admin");

module.exports = async function handleDisableBettingBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await disableUserBettingById(userId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
