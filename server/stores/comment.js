const {
	getOffsetByPageAndLimit,
} = require("./index");
const {
	find,
	update,
	create,
	count,
} = require("../models/comment");
const {
	ENUM_COMMENT_STATUS,
} = require("../lib/enum");
const MAX_PIN_COMMENTS_COUNT = 3;

function createComment(row) {
	return create(row);
}

function getCommentsByUserIdAndPagination(userId, page, {
	limit = 10,
	projections,
} = {}) {
	const offset = getOffsetByPageAndLimit(page, limit);

	return find({
		where: {
			userId,
		},
		order: [
			["status", "DESC"],
			["createdAt", "DESC"],
		],
		offset,
		limit,
		attributes: projections,
	});
}

function updateCommentStatusByIdAndUserId(id, userId, status) {
	return update({
		status
	}, {
		where: {
			id,
			userId,
		},
	});
}

function countPinnedCommentsByUserId(userId) {
	return count({
		where: {
			userId,
			status: ENUM_COMMENT_STATUS.PINNED,
		},
	});
}

async function isPinnedCommentReachLimitByUserId(userId) {
	const count = await countPinnedCommentsByUserId(userId);

	return count >= MAX_PIN_COMMENTS_COUNT;
}

module.exports = {
	createComment,
	getCommentsByUserIdAndPagination,
	updateCommentStatusByIdAndUserId,
	countPinnedCommentsByUserId,
	isPinnedCommentReachLimitByUserId,
};
