const {
	unblockTeamByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleUnblockTeamRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await unblockTeamByLeaderId(leaderId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
