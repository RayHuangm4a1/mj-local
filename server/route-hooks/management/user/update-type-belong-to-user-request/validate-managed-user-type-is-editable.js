const {
	ForbiddenError,
} = require("ljit-error");
const {
	getTeamStatsByUserIdAndWalletCode,
} = require("../../../../services/stats.admin");
const {
	USER_IS_NOT_AGENT_OR_MEMBER,
	USER_HAS_DESCENDANTS,
	USER_TYPE_IS_IDENTICAL,
} = require("../../../../lib/error/code");
const {
	ENUM_WALLET_CODE,
} = require("../../../../lib/enum");

module.exports = async function validateManagedUserTypeIsEditable(req, res, next) {
	try {
		if (res.locals.managedUser.type === req.body.type) {
			throw new ForbiddenError(
				USER_TYPE_IS_IDENTICAL.MESSAGE,
				USER_TYPE_IS_IDENTICAL.CODE
			);
		}

		if (!res.locals.managedUser.isAgentOrMember()) {
			throw new ForbiddenError(
				USER_IS_NOT_AGENT_OR_MEMBER.MESSAGE,
				USER_IS_NOT_AGENT_OR_MEMBER.CODE
			);
		}

		if (res.locals.managedUser.isAgent()) {
			const teamStats = await getTeamStatsByUserIdAndWalletCode(res.locals.managedUser.id, ENUM_WALLET_CODE.PRIMARY);

			if (teamStats.numOfUsers > 1) {
				throw new ForbiddenError(
					USER_HAS_DESCENDANTS.MESSAGE,
					USER_HAS_DESCENDANTS.CODE
				);
			}
		}
	} catch (error) {
		return next(error);
	}

	next();
};
