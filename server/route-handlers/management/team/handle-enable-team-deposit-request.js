const {
	enableTeamDepositByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleEnableTeamDepositRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await enableTeamDepositByLeaderId(leaderId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
