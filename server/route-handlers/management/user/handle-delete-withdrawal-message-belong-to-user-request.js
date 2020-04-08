const { NotFoundError } = require("ljit-error");
const { USER_WITHDRAWAL_MESSAGE_NOT_FOUND } = require("../../../lib/error/code");
const { deleteWithdrawalMessageByUserId } = require("../../../services/user.admin");

module.exports = async function handleDeleteWithdrawalMessageBelongToUserRequest(req, res, next) {
	const { userId } = req.params;

	try {
		const result = await deleteWithdrawalMessageByUserId(userId);

		if (result === null || result.affectedRows !== 1) {
			throw new NotFoundError(USER_WITHDRAWAL_MESSAGE_NOT_FOUND.MESSAGE, USER_WITHDRAWAL_MESSAGE_NOT_FOUND.CODE);
		}

		res.status(200).end();

		next();
	} catch (error) {
		next(error);
	}
};
