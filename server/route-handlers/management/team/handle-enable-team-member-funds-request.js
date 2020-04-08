const { enableTeamMemberFundsById } = require("../../../services/user.admin");

module.exports = async function handleEnableTeamMemberFundsRequest(req, res, next) {
	const { memberId } = req.params;

	try {
		await enableTeamMemberFundsById(memberId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
