const { enableTeamMemberWithdrawalById } = require("../../../services/user.admin");

module.exports = async function handleEnableTeamMemberWithdrawalRequest(req, res, next) {
	const { memberId } = req.params;

	try {
		await enableTeamMemberWithdrawalById(memberId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
