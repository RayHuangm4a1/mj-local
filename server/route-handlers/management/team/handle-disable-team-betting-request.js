const {
	disableTeamBettingByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleDisableTeamBettingRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await disableTeamBettingByLeaderId(leaderId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
