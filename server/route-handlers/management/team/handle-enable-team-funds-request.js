const {
	enableTeamFundsByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleEnableTeamFundsRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await enableTeamFundsByLeaderId(leaderId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
