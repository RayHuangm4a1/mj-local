const {
	enableUserDividendById,
} = require("../../../services/user.admin");

module.exports = async function handleEnableDividendBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await enableUserDividendById(userId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
