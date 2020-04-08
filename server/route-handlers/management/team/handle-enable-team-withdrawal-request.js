const {
	enableTeamWithdrawalByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleEnableTeamWithdrawalRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await enableTeamWithdrawalByLeaderId(leaderId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
