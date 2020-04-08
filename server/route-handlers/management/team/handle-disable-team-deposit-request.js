const {
	disableTeamDepositByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleDisableTeamDepositRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await disableTeamDepositByLeaderId(leaderId);

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
