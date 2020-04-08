const {
	updateNicknameById,
} = require("../../../services/user");

module.exports = async function handleUpdateNicknameRequest(req, res, next) {
	const { id } = req.user;
	const { nickname } = req.body;

	try {
		await updateNicknameById(id, nickname);

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
