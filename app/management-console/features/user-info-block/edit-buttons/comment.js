import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextButton, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import {
	notifyHandlingActions,
	userCommentsActions,
} from '../../../controller';
import CommentsModal from '../../../components/comments-modal';
import { CommentStatusEnum, } from '../../../lib/enums';
import { UserCommentDataPropTypes, } from '../../../lib/prop-types-utils';
import {
	notifications,
} from '../../../../lib/notify-handler';
import { LoadingStatusEnum } from '../../../../lib/enums';

const {
	LOADING,
	SUCCESS,
} = LoadingStatusEnum;
const {
	notifyHandlingAction,
} = notifyHandlingActions;
const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;

const {
	fetchUserCommentsAction,
	addUserCommentAction,
	cancelPinnedUserCommentAction,
} = userCommentsActions;

const { DEFAULT, PIN, } = CommentStatusEnum;

const propTypes = {
	userId: PropTypes.number,
	comments: PropTypes.arrayOf(UserCommentDataPropTypes),
	page: PropTypes.number,
	pinnedComments: PropTypes.arrayOf(UserCommentDataPropTypes),
	buttonText: PropTypes.string,
	loadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	addLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	cancelLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	notifyHandlingAction: PropTypes.func.isRequired,
	fetchUserCommentsAction: PropTypes.func.isRequired,
	addUserCommentAction: PropTypes.func.isRequired,
	cancelPinnedUserCommentAction: PropTypes.func.isRequired,
};
const defaultProps = {
	comments: [],
	page: 1,
	buttonText: "详细",
};

class CommentEditButton extends Component {
	constructor() {
		super();
		this.state = {
			isCommentsModalVisible: false,
			isAddDefaultComment: false,
			isAddPinnedComment: false,
		};

		this._handleSubmitAddComment = this._handleSubmitAddComment.bind(this);
		this._handleSubmitAddPinnedComment = this._handleSubmitAddPinnedComment.bind(this);
		this._handleCancelPinnedComment = this._handleCancelPinnedComment.bind(this);
		this._handleCloseModal = this._handleCloseModal.bind(this);
		this._handleGetMoreComments = this._handleGetMoreComments.bind(this);
	}

	_handleSubmitAddComment(comment) {
		const {
			userId,
			addUserCommentAction,
		} = this.props;

		addUserCommentAction(userId, DEFAULT, comment);
		this.setState({ isAddDefaultComment: true, });
	}

	_handleSubmitAddPinnedComment(comment) {
		const {
			userId,
			addUserCommentAction,
		} = this.props;

		addUserCommentAction(userId, PIN, comment);
		this.setState({ isAddPinnedComment: true, });
	}

	_handleCancelPinnedComment(commentId) {
		const {
			userId,
			cancelPinnedUserCommentAction,
		} = this.props;

		cancelPinnedUserCommentAction(userId, commentId);
	}

	_handleCloseModal() {
		this.setState({
			isCommentsModalVisible: false,
		});
	}

	_handleGetMoreComments() {
		const {
			userId,
			page: prevPage,
			fetchUserCommentsAction,
		} = this.props;
		const page = prevPage + 1;

		fetchUserCommentsAction(userId, { page, });
	}

	render() {
		const {
			comments,
			pinnedComments,
			buttonText,
		} = this.props;
		const {
			isCommentsModalVisible,
		} = this.state;
		const {
			_handleSubmitAddComment,
			_handleSubmitAddPinnedComment,
			_handleCancelPinnedComment,
			_handleCloseModal,
			_handleGetMoreComments,
		} = this;

		return (
			<React.Fragment>
				<TextButton
					text={buttonText}
					onClick={() => this.setState({ isCommentsModalVisible: true, })}
				/>
				<CommentsModal
					comments={comments}
					pinnedComments={pinnedComments}
					isVisible={isCommentsModalVisible}
					onCreateComment={_handleSubmitAddComment}
					onCreatePinnedComment={_handleSubmitAddPinnedComment}
					onCancelPinnedComment={_handleCancelPinnedComment}
					onCancelCreatingComment={_handleCloseModal}
					onGetMoreComments={_handleGetMoreComments}
				/>
			</React.Fragment>
		);
	}
	componentDidUpdate(prevProps, prevState) {
		const {
			userId,
			addLoadingStatus,
			cancelLoadingStatus,
			notifyHandlingAction,
			fetchUserCommentsAction,
		} = this.props;
		const {
			isCommentsModalVisible,
			isAddDefaultComment,
			isAddPinnedComment,
		} = this.state;

		if (isCommentsModalVisible && !prevState.isCommentsModalVisible) {
			fetchUserCommentsAction(userId, 1);
		}
		if (isCommentsModalVisible && prevProps.addLoadingStatus === LOADING && addLoadingStatus === SUCCESS) {
			if (isAddDefaultComment) {
				notifyHandlingAction(new Success('备注新增成功'));
			} else if (isAddPinnedComment) {
				notifyHandlingAction(new Success('置顶备注新增成功'));
			}
			this.setState({
				isAddDefaultComment: false,
				isAddPinnedComment: false,
			});
		}
		if (isCommentsModalVisible && prevProps.cancelLoadingStatus === LOADING && cancelLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('置顶备注取消成功'));
		}
	}
}

CommentEditButton.propTypes = propTypes;
CommentEditButton.defaultProps = defaultProps;

function mapStateToProps(state) {
	const { userData: { comments: commentsState, profile, }, } = state;

	return {
		userId: profile.get('data').toObject().id,
		comments: commentsState.get('data').toArray(),
		page: commentsState.get('page'),
		pinnedComments: commentsState.get('pinnedComments').toArray(),
		loadingStatus: commentsState.get('loadingStatus'),
		addLoadingStatus: commentsState.get('addLoadingStatus'),
		cancelLoadingStatus: commentsState.get('cancelLoadingStatus'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
		fetchUserCommentsAction: (userId, queries) => dispatch(fetchUserCommentsAction(userId, queries)),
		addUserCommentAction: (userId, status, description) => dispatch(addUserCommentAction(userId, status, description)),
		cancelPinnedUserCommentAction: (userId, commentId) => dispatch(cancelPinnedUserCommentAction(userId, commentId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditButton);
