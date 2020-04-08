const {
	getUserWithWalletsAndUserStatsByUsernameAndWalletCode,
	USER_PROJECTIONS,
	USER_STATS_PROJECTIONS,
} = require("../../../services/user.admin");
const {
	ENUM_WALLET_CODE,
} = require("../../../lib/enum");
const {
	NotFoundError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
} = require("../../../lib/error/code");

module.exports = async function handleGetUserStatsBelongToUsernameRequest(req, res, next) {
	const { username } = req.params;

	try {
		const stats = await getUserWithWalletsAndUserStatsByUsernameAndWalletCode(username, ENUM_WALLET_CODE.PRIMARY, {
			userProjections: USER_PROJECTIONS.USERNAME_NICKNAME_AND_LEVEL,
			userStatsProjections: USER_STATS_PROJECTIONS.STATS_ONLY,
		});

		if (stats === null) {
			throw new NotFoundError(
				USER_NOT_FOUND.MESSAGE,
				USER_NOT_FOUND.CODE
			);
		}

		res.status(200).json(stats);
	} catch (error) {
		next(error);
	}
};
