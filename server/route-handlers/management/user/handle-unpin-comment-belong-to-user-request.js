const {
	updateCommentStatusByIdAndUserId,
} = require("../../../services/comment.admin");
const {
	NotFoundError,
} = require("ljit-error");
const {
	USER_COMMENT_NOT_FOUND,
} = require("../../../lib/error/code");
const {
	ENUM_COMMENT_STATUS,
} = require("../../../lib/enum");

module.exports = async function handleUnpinCommentBelongToUserRequest(req, res, next) {
	const { userId, commentId } = req.params;
	const status = ENUM_COMMENT_STATUS.DEFAULT;

	try {
		const result = await updateCommentStatusByIdAndUserId(commentId, userId, status);

		if (result === null) {
			throw new NotFoundError(USER_COMMENT_NOT_FOUND.MESSAGE, USER_COMMENT_NOT_FOUND.CODE);
		}

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
