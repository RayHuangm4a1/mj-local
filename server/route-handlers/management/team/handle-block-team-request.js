const {
	blockTeamByLeaderId,
} = require("../../../services/user.admin");

module.exports = async function handleBlockTeamRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		await blockTeamByLeaderId(leaderId);

		// TODO: implement clean user session & kick user offline

		res.status(201).end();

		next();
	} catch (error) {
		next(error);
	}
};
