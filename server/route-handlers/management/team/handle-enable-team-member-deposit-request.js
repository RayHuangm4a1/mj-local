const { enableTeamMemberDepositById } = require("../../../services/user.admin");

module.exports = async function handleEnableTeamMemberDepositRequest(req, res, next) {
	const { memberId } = req.params;

	try {
		await enableTeamMemberDepositById(memberId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
