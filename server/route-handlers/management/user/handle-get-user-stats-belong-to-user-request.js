const {
	getUserStatsByUserIdAndWalletCode,
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

module.exports = async function handleGetUserStatsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		const stats = await getUserStatsByUserIdAndWalletCode(userId, ENUM_WALLET_CODE.PRIMARY);

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
