const {
	disableTeamWithdrawalByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleDisableTeamWithdrawalRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await disableTeamWithdrawalByLeaderId(leaderId);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
