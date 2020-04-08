const {
	disableTeamChildrenCreationByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleDisableTeamCreationRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await disableTeamChildrenCreationByLeaderId(leaderId);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
