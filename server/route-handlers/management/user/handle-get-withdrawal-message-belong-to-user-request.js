const { NotFoundError } = require("ljit-error");
const { getWithdrawalMessageByUserId } = require("../../../services/user.admin");
const { USER_WITHDRAWAL_MESSAGE_NOT_FOUND } = require("../../../lib/error/code");

module.exports = async function handleGetWithdrawalMessageBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		const withdrawalMessage = await getWithdrawalMessageByUserId(userId);

		if (withdrawalMessage === null) {
			throw new NotFoundError(
				USER_WITHDRAWAL_MESSAGE_NOT_FOUND.MESSAGE,
				USER_WITHDRAWAL_MESSAGE_NOT_FOUND.CODE
			);
		}

		res.status(200).json(withdrawalMessage);
	} catch (error) {
		next(error);
	}
};
