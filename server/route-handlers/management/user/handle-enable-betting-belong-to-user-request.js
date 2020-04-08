const {
	enableUserBettingById,
} = require("../../../services/user.admin");

module.exports = async function handleEnableBettingBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await enableUserBettingById(userId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
