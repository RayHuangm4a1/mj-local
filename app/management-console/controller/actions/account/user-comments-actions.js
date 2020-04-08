import {
	START_FETCH_USER_COMMENTS,
	FETCH_USER_COMMENTS_SUCCESS,
	FETCH_USER_COMMENTS_FAILED,
	START_ADD_USER_COMMENT,
	ADD_USER_COMMENT_SUCCESS,
	ADD_USER_COMMENT_FAILED,
	START_CANCEL_PINNED_USER_COMMENT,
	CANCEL_PINNED_USER_COMMENT_SUCCESS,
	CANCEL_PINNED_USER_COMMENT_FAILED,
} from '../action-types';

export function fetchUserCommentsAction(userId, queries = {}) {
	return {
		type: START_FETCH_USER_COMMENTS,
		userId,
		queries,
	};
}
export function fetchUserCommentsSuccessAction(comments, page) {
	return {
		type: FETCH_USER_COMMENTS_SUCCESS,
		comments,
		page,
	};
}
export function fetchUserCommentsFailedAction(error, errorMessage) {
	return {
		type: FETCH_USER_COMMENTS_FAILED,
		error,
		errorMessage,
	};
}

export function addUserCommentAction(userId, status, description) {
	return {
		type: START_ADD_USER_COMMENT,
		userId,
		status,
		description,
	};
}
export function addUserCommentSuccessAction(comment) {
	return {
		type: ADD_USER_COMMENT_SUCCESS,
		comment,
	};
}
export function addUserCommentFailedAction(error, errorMessage) {
	return {
		type: ADD_USER_COMMENT_FAILED,
		error,
		errorMessage,
	};
}

export function cancelPinnedUserCommentAction(userId, commentId) {
	return {
		type: START_CANCEL_PINNED_USER_COMMENT,
		userId,
		commentId,
	};
}
export function cancelPinnedUserCommentSuccessAction(commentId) {
	return {
		type: CANCEL_PINNED_USER_COMMENT_SUCCESS,
		commentId,
	};
}
export function cancelPinnedUserCommentFailedAction(error, errorMessage) {
	return {
		type: CANCEL_PINNED_USER_COMMENT_FAILED,
		error,
		errorMessage,
	};
}
