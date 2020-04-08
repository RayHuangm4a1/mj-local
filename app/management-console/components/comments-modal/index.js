import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	InputTextarea,
	Button,
	Divider,
	Table,
	ScrollContainer,
	Timeline,
	TextButton,
	Form,
	FormItem,
} from 'ljit-react-components';
import PageModal from '../page-modal';
import {
	UserTypeEnum,
	CommentStatusEnum,
} from '../../lib/enums';
import { UserCommentDataPropTypes, } from '../../lib/prop-types-utils';
import { formatDate, } from '../../lib/moment-utils';
import './style.styl';

const PREFIX_CLASS = 'ljit-comment-modal';
const TimelineItem = Timeline.Item;
const { CS, FIN, ADMIN, } = UserTypeEnum;
const TypeTextMap = {
	[CS]: '客服',
	[FIN]: '财务',
	[ADMIN]: 'ADMIN',
};
const {
	GRASSGREEN,
	BRIGHTBLUE,
} = TimelineItem.ColorEnums;
const propTypes = {
	isVisible: PropTypes.bool,
	onCreateComment: PropTypes.func,
	onCreatePinnedComment: PropTypes.func,
	onCancelPinnedComment: PropTypes.func,
	onCancelCreatingComment: PropTypes.func,
	comments: PropTypes.arrayOf(UserCommentDataPropTypes),
	pinnedComments: PropTypes.arrayOf(UserCommentDataPropTypes),
	onGetMoreComments: PropTypes.func.isRequired,
};
const defaultProps = {
	isVisible: false,
	comments: [],
	pinnedComments: [],
	onCreateComment: () => {},
	onCreatePinnedComment: () => {},
	onCancelPinnedComment: () => {},
	onCancelCreatingComment: () => {},
};

class CommentsModal extends Component {
	constructor() {
		super();

		this._handleCreateComment = this._handleCreateComment.bind(this);
		this._handleCreatePinnedComment = this._handleCreatePinnedComment.bind(this);
		this._renderTimelineItems = this._renderTimelineItems.bind(this);
	}

	_handleCreateComment() {
		const form = this.formInstance.getForm();

		form.validateFields((err, { editingComment, }) => {
			if (!err) {
				this.props.onCreateComment(editingComment);
				form.resetFields();
			}
		});
	}
	_handleCreatePinnedComment() {
		// TODO add error notification if pinned comment > 3
		const form = this.formInstance.getForm();

		form.validateFields((err, { editingComment, }) => {
			if (!err) {
				this.props.onCreatePinnedComment(editingComment);
				form.resetFields();
			}
		});
	}
	_renderTimelineItems() {
		const { comments, } = this.props;
		const timeLineItems = comments.map((data, i) => {
			const { createdAt, description, creatorUsername, status, type, } = data;

			return (
				<TimelineItem
					key={i}
					nodeColor={status === CommentStatusEnum.PIN ? GRASSGREEN : BRIGHTBLUE}
				>
					<div>
						{`${formatDate(createdAt)} [${TypeTextMap[type]}备注] ${description}`}
					</div>
					<div>
						{`留言者：${creatorUsername}`}
					</div>
				</TimelineItem>
			);
		});

		return timeLineItems;
	}

	render() {
		const {
			isVisible,
			onCancelCreatingComment,
			onCancelPinnedComment,
			onGetMoreComments,
			pinnedComments,
		} = this.props;
		const {
			_handleCreateComment,
			_handleCreatePinnedComment,
			_renderTimelineItems,
		} = this;
		const timelineItems = _renderTimelineItems();

		return (
			<PageModal
				visible={isVisible}
				title="备注"
				onClickCancel={onCancelCreatingComment}
				className={PREFIX_CLASS}
				footer={(
					<Button
						onClick={onCancelCreatingComment}
						color={Button.ColorEnums.BRIGHTBLUE500}
					>
						关闭
					</Button>
				)}
			>
				<div>
					<Form
						ref={(refForm) => this.formInstance = refForm}
						cancelButtonDisabled
						submitButtonDisabled
					>
						<FormItem
							label="新增备注"
							itemName="editingComment"
							itemConfig={{
								rules: [
									{
										required: true,
										message: '新增备注不能空白',
									},
									{
										max: 100,
										message: '新增备注不能过 100 个字'
									},
								]
							}}
						>
							<InputTextarea
								minRows={4}
							/>
						</FormItem>
					</Form>
				</div>
				<HeaderButtonBar
					right={(
						<React.Fragment>
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								onClick={_handleCreatePinnedComment}
								color={Button.ColorEnums.BRIGHTBLUE500}
							>
								新增为置頂备注
							</Button>
							<Button
								color={Button.ColorEnums.BRIGHTBLUE500}
								onClick={_handleCreateComment}
							>
								新增
							</Button>
						</React.Fragment>
					)}
				/>
				<Divider/>
				<Table
					rowKey="id"
					columns={[
						{
							title: '时间',
							dataIndex: 'createdAt',
							render: (value) => {
								const dateString = formatDate(value).split(' ').map((string, index) => <div key={index}><span>{string}</span></div>);

								return dateString;
							},
						},{
							title: '类别',
							dataIndex: 'type',
							render: (value) => TypeTextMap[value]
						},{
							title: '内容',
							dataIndex: 'description',
						},{
							title: '操作',
							dataIndex: 'operation',
							render: (value, record) => {
								return (
									<TextButton
										className={`${PREFIX_CLASS}__cancel-pin-button`}
										text="取消置頂"
										onClick={() => onCancelPinnedComment(record.id)}
									/>
								);
							}
						}
					]}
					dataSource={pinnedComments}
				/>
				<ScrollContainer
					className={`${PREFIX_CLASS}__scroll-container`}
					onClick={onGetMoreComments}
				>
					<Timeline 
						mode={Timeline.ModeEnums.LEFT}
						className={`${PREFIX_CLASS}__timeline`}
					>
						{timelineItems}
					</Timeline>
				</ScrollContainer>
			</PageModal>
		);
	}
}

CommentsModal.propTypes = propTypes;
CommentsModal.defaultProps = defaultProps;

export default CommentsModal;
