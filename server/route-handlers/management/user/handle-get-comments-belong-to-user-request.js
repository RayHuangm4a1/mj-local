const {
	getCommentsByUserIdAndPagination,
} = require("../../../services/comment.admin");

module.exports = async function handleGetCommentsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { page } = req.query;

	try {
		const comments = await getCommentsByUserIdAndPagination(userId, page);

		res.status(200).json(comments);
	} catch (error) {
		next(error);
	}
};
