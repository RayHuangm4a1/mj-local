const {
	getAccountById,
} = require("../../../services/user");

module.exports = async function handleGetAccountRequest(req, res, next) {
	const { accountId } = req.user;
	const requestId = req.header("X-Request-Id");

	try {
		const account = await getAccountById(accountId, { requestId });

		res.status(200).json(account);
	} catch (error) {
		next(error);
	}
};
