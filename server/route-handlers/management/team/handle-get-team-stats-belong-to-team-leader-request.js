const {
	getTeamStatsByUserIdAndWalletCode,
} = require("../../../services/stats.admin");
const {
	ENUM_WALLET_CODE,
} = require("../../../lib/enum");
const {
	NotFoundError,
} = require("ljit-error");
const {
	USER_NOT_FOUND,
} = require("../../../lib/error/code");

module.exports = async function handleGetTeamStatsBelongToTeamLeaderRequest(req, res, next) {
	const { leaderId } = req.params;

	try {
		const result = await getTeamStatsByUserIdAndWalletCode(leaderId, ENUM_WALLET_CODE.PRIMARY);

		if (result === null) {
			throw new NotFoundError(
				USER_NOT_FOUND.MESSAGE,
				USER_NOT_FOUND.CODE
			);
		}

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
