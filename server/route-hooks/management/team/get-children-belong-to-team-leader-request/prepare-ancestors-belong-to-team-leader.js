const {
	getAncestorRelationshipsByUserId,

	RELATIONSHIP_PROJECTIONS,
} = require("../../../../services/user.admin");

module.exports = async function prepareAncestorsBelongToLeader(req, res, next) {
	const { leaderId } = req.params;

	try {
		const ancestorsOfTeamLeader = await getAncestorRelationshipsByUserId(leaderId, {
			order: "desc",
			projections: RELATIONSHIP_PROJECTIONS.ANCESTOR,
		});

		res.locals.ancestorsOfTeamLeader = ancestorsOfTeamLeader;

		next();
	} catch (error) {
		return next(error);
	}
};
