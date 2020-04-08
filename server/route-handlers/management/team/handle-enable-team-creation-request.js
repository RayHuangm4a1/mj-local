const {
	enableTeamChildrenCreationByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleEnableTeamCreationRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await enableTeamChildrenCreationByLeaderId(leaderId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
