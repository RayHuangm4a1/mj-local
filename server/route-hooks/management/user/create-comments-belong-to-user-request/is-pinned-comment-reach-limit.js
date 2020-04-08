const {
	ENUM_COMMENT_STATUS,
} = require("../../../../lib/enum");
const {
	USER_PINNED_COMMENT_IS_EXCEEDED,
} = require("../../../../lib/error/code");
const {
	ForbiddenError,
} = require("ljit-error");
const {
	isPinnedCommentReachLimitByUserId,
} = require("../../../../services/comment.admin");

module.exports = async function isPinnedCommentReachLimit(req, res, next) {
	const isExceedLimit = await isPinnedCommentReachLimitByUserId(req.params.userId);

	if (req.body.status === ENUM_COMMENT_STATUS.PINNED && isExceedLimit) {
		return next(
			new ForbiddenError(
				USER_PINNED_COMMENT_IS_EXCEEDED.MESSAGE,
				USER_PINNED_COMMENT_IS_EXCEEDED.CODE
			)
		);
	}

	next();
};
