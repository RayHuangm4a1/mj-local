import { Map, List, } from 'immutable';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum, CommentStatusEnum, } from '../../../../../lib/enums';
import { convertDateStringToTimestamp, } from '../../../../../lib/moment-utils';

const {
	START_FETCH_USER_COMMENTS,
	FETCH_USER_COMMENTS_SUCCESS,
	FETCH_USER_COMMENTS_FAILED,
	START_ADD_USER_COMMENT,
	ADD_USER_COMMENT_SUCCESS,
	ADD_USER_COMMENT_FAILED,
	START_CANCEL_PINNED_USER_COMMENT,
	CANCEL_PINNED_USER_COMMENT_SUCCESS,
	CANCEL_PINNED_USER_COMMENT_FAILED,
} = actionTypes;

const { DEFAULT, PIN, } = CommentStatusEnum;

/*
data, pinnedComments:
[
	{
		"id": 1,
		"userId": 13,
		"creatorId": 2,
		"creatorUsername": "admin",
		"type": 6,
		"status": 2,
		"description": "test pin",
		"createdAt": "2019-10-25T06:01:58.000Z",
		"updatedAt": "2019-10-25T06:01:58.000Z",
	},
	...
]
*/

const initialState = Map({
	data: List(),
	page: 0,
	pinnedComments: List(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	addLoadingStatus: LoadingStatusEnum.NONE,
	addLoadingStatusMessage: '',
	cancelLoadingStatus: LoadingStatusEnum.NONE,
	cancelLoadingStatusMessage: '',
});

export default function comments(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_COMMENTS:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);

		case FETCH_USER_COMMENTS_SUCCESS: {
			const { comments, page, } = action;

			let commentsData;

			if (page === 1) {
				commentsData = List(comments);
			} else {
				commentsData = state.get('data').concat(comments);
			}
			const sortedComments = getSortedComments(commentsData);

			return state
				.set('data', sortedComments)
				.set('page', page)
				.set('pinnedComments', getPinnedComments(sortedComments))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case FETCH_USER_COMMENTS_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_ADD_USER_COMMENT:
			return state.set('addLoadingStatus', LoadingStatusEnum.LOADING);

		case ADD_USER_COMMENT_SUCCESS: {
			const { comment, } = action;
			const prevComments = state.get('data');
			const commentsData = prevComments.push(comment);
			const sortedComments = getSortedComments(commentsData);

			return state
				.set('data', sortedComments)
				.set('pinnedComments', getPinnedComments(sortedComments))
				.set('addLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case ADD_USER_COMMENT_FAILED:
			return state
				.set('addLoadingStatus', LoadingStatusEnum.FAILED)
				.set('addLoadingStatusMessage', action.errorMessage);

		case START_CANCEL_PINNED_USER_COMMENT:
			return state.set('cancelLoadingStatus', LoadingStatusEnum.LOADING);

		case CANCEL_PINNED_USER_COMMENT_SUCCESS: {
			const { commentId, } = action;
			const prevComments = state.get('data');
			const commentsData = prevComments.map(comment => {
				if (comment.id === commentId) {
					return { ...comment, status: DEFAULT, };
				} else {
					return comment;
				}
			});
			const sortedComments = getSortedComments(commentsData);

			return state
				.set('data', sortedComments)
				.set('pinnedComments', getPinnedComments(sortedComments))
				.set('cancelLoadingStatus', LoadingStatusEnum.SUCCESS);
		}
		case CANCEL_PINNED_USER_COMMENT_FAILED:
			return state
				.set('cancelLoadingStatus', LoadingStatusEnum.FAILED)
				.set('cancelLoadingStatusMessage', action.errorMessage);

		default:
			return state;
	}
}

function getSortedComments(comments) {
	return comments.sort((commentA, commentB) =>
		convertDateStringToTimestamp(commentB.createdAt) - convertDateStringToTimestamp(commentA.createdAt)
	);
}

function getPinnedComments(comments) {
	return comments.filter(comment => comment.status === PIN);
}
