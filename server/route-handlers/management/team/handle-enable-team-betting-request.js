const {
	enableTeamBettingByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleEnableTeamBettingRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await enableTeamBettingByLeaderId(leaderId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
