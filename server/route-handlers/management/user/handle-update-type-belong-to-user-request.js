const {
	updateAgentOrMemberTypeById,
} = require("../../../services/user.admin");

module.exports = async function handleUpdateTypeBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { type } = req.body;

	try {
		await updateAgentOrMemberTypeById(userId, type);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
