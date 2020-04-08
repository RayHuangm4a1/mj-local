const { unblockTeamMemberById } = require("../../../services/user.admin");

module.exports = async function handleUnblockTeamMemberRequest(req, res, next) {
	const { memberId } = req.params;

	try {
		await unblockTeamMemberById(memberId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
