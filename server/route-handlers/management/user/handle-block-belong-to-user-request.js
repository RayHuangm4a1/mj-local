const {
	blockUserById,
} = require("../../../services/user.admin");

module.exports = async function handleBlockBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		await blockUserById(userId);

		// TODO: implement clean user session & kick user offline

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
