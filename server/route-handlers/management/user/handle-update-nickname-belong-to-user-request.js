const {
	updateNicknameById,
} = require("../../../services/user.admin");

module.exports = async function handleUpdateNicknameBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { nickname } = req.body;

	try {
		await updateNicknameById(userId, nickname);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
