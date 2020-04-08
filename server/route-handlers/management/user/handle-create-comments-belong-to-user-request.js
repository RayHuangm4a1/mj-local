const {
	createComment,
} = require("../../../services/comment.admin");

module.exports = async function handleCreateCommentsBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { status, description } = req.body;
	const {
		role: {
			type,
		},
		id: creatorId,
		username: creatorUsername,
	} = res.locals.staff;

	try {
		const result = await createComment({
			userId,
			status,
			description,
			creatorId,
			creatorUsername,
			type,
		});

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};
