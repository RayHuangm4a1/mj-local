const CommentStore = require("../stores/comment");

module.exports = {
	createComment: CommentStore.createComment,

	isPinnedCommentReachLimitByUserId: CommentStore.isPinnedCommentReachLimitByUserId,

	getCommentsByUserIdAndPagination: CommentStore.getCommentsByUserIdAndPagination,

	updateCommentStatusByIdAndUserId: CommentStore.updateCommentStatusByIdAndUserId,
};
