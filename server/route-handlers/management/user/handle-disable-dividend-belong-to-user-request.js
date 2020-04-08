const {
	disableUserDividendById,
} = require("../../../services/user.admin");

module.exports = async function handleDisableDividendBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await disableUserDividendById(userId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
