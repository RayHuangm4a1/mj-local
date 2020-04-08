const {
	disableTeamFundsByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleDisableTeamFundsRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await disableTeamFundsByLeaderId(leaderId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
