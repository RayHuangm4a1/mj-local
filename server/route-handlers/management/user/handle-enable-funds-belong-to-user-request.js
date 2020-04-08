const {
	enableUserFundsById,
} = require("../../../services/user.admin");

module.exports = async function handleEnableFundsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await enableUserFundsById(userId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
