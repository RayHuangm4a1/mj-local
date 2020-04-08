const { enableTeamMemberBettingById } = require("../../../services/user.admin");

module.exports = async function handleEnableTeamMemberBettingRequest(req, res, next) {
	const { memberId } = req.params;

	try {
		await enableTeamMemberBettingById(memberId);

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
