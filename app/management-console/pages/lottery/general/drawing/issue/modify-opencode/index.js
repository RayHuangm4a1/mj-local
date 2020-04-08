import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Row,
	Col,
	Form,
	FormItem,
	Select,
	Modal,
} from 'ljit-react-components';
import { connect, } from '../../../../../../../ljit-store-connecter';
import PageBlock from '../../../../../../components/page-block';
import {
	getLotteryClassPositions,
	getLotteryClassOpencodeRangeValues,
} from '../../../../../../../lib/lotteries';
import { convertToNumber, } from '../../../../../../lib/general-utils';
import { DrawingStatusEnums, LoadingStatusEnum, } from '../../../../../../lib/enums';
import { lotteryDrawingDetailActions, } from '../../../../../../controller';
import {
	notifications,
	withLoadingStatusNotification,
} from '../../../../../../../lib/notify-handler';
import { isDrawingProgressing, } from '../../utils';

const { MODIFYING, CANCELING, } = DrawingStatusEnums;
const { successNotifications, } = notifications;
const { Success, } = successNotifications;

const {
	updateLotteryDrawingOpencodeAction,
	stopUpdateLotteryDrawingIntervalAction,
	startUpdateLotteryDrawingIntervalAction,
} = lotteryDrawingDetailActions;

const {
	NONE,
	FAILED,
	LOADING,
	SUCCESS,
} = LoadingStatusEnum;

const propTypes = {
	onBack: PropTypes.func.isRequired,
	selectedLotteryClassId: PropTypes.string.isRequired,
	lotteryId: PropTypes.string.isRequired,
	issue: PropTypes.string.isRequired,
	drawingData: PropTypes.shape({
		lotteryId: PropTypes.number,
		issue: PropTypes.number,
		index: PropTypes.string,
		opencode: PropTypes.string,
		status: PropTypes.oneOf(Object.values(DrawingStatusEnums)),
	}).isRequired,
	updateLotteryDrawingOpencodeLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)).isRequired,
	fetchLotteryDrawingLoadingStatus: PropTypes.PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	updateLotteryDrawingOpencodeAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	stopUpdateLotteryDrawingIntervalAction: PropTypes.func.isRequired,
	startUpdateLotteryDrawingIntervalAction: PropTypes.func.isRequired,
};

const PREFIX_CLASS = 'lottery-drawing-modify-opencode';
const FailedStatuses = [
	{
		loadingStatus: 'updateLotteryDrawingOpencodeLoadingStatus',
		loadingStatusMessage: 'updateLotteryDrawingOpencodeLoadingStatusMessage',
	},
];

class LotteryGeneralDrawingIssueModifyOpencodePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowConfirmModal: false,
		};

		this._handleClickModify = this._handleClickModify.bind(this);
		this._handleCloseConfirmModal = this._handleCloseConfirmModal.bind(this);
		this._handleClickOk = this._handleClickOk.bind(this);
		this._renderCurrentCodeBall = this._renderCurrentCodeBall.bind(this);
		this._renderModifyCodeBall = this._renderModifyCodeBall.bind(this);
	}
	_handleClickModify() {
		this.setState({ isShowConfirmModal: true, });
	}
	_handleCloseConfirmModal() {
		this.setState({ isShowConfirmModal: false, });
	}
	_handleClickOk() {
		const form = this.formInstance.getForm();
		const {
			lotteryId,
			issue,
			updateLotteryDrawingOpencodeAction,
		} = this.props;

		form.validateFields((err, values) => {
			if (!err) {
				const opencode = Object.values(values).toString();

				updateLotteryDrawingOpencodeAction(lotteryId, issue, opencode);
			}
		});
		this._handleCloseConfirmModal();
	}
	_getOpencodesList() {
		const {
			selectedLotteryClassId,
			drawingData,
		} = this.props;

		const opencodes = drawingData.opencode ? drawingData.opencode.split(',') : [];
		const convertedLotteryClassId = convertToNumber(selectedLotteryClassId);
		const positions = getLotteryClassPositions(convertedLotteryClassId);
		const opencodesList = positions.map((position, index) => ({
			name: position.name,
			code: opencodes[index] || '-',
		}));

		return opencodesList;
	}
	_getRangeValues() {
		const { selectedLotteryClassId } = this.props;
		const values = getLotteryClassOpencodeRangeValues(selectedLotteryClassId);

		if (!values) {
			return [];
		}

		return values.map(_range => {
			return {
				label: _range,
				value: _range,
			};
		});
	}
	_renderCurrentCodeBall() {
		const opencodes = this._getOpencodesList();

		return (
			<Fragment>
				<div className={`${PREFIX_CLASS}__body__title`}>
					<div>
						修改球号
					</div>
				</div>
				<div className={`${PREFIX_CLASS}__body__opencode-info`}>
					<div>
						目前球号：
					</div>
					<div className={`${PREFIX_CLASS}__body__opencode-info-block`}>
						{opencodes.map((opencode, index) => {
							return (
								<div key={`${opencode}-${index}`}>
									<div>{opencode.code}</div>
									<div>{opencode.name}</div>
								</div>
							);
						})}
					</div>
				</div>
			</Fragment>
		);
	}
	_renderModifyCodeBall() {
		const opencodes = this._getOpencodesList();
		const options = this._getRangeValues();

		return (
			<div className={`${PREFIX_CLASS}__body__form`}>
				<Form
					cancelButtonDisabled
					submitButtonDisabled
					ref={(refForm) => this.formInstance = refForm}
				>
					<div>
						欲修改球号：
					</div>
					<div className={`${PREFIX_CLASS}__body__opencode-info-block`}>
						{opencodes.map((opencode, index) => (
							<FormItem
								key={`${opencode}-${index}`}
								label={opencode.name}
								itemName={opencode.name}
								labelColon={false}
								itemConfig={{
									initialValue: opencode.code === '-' ? null : opencode.code,
								}}
							>
								<Select
									options={options}
								/>
							</FormItem>
						))}
					</div>
				</Form>
			</div>
		);
	}
	render() {
		const {
			isShowConfirmModal,
		} = this.state;
		const {
			drawingData,
			onBack,
		} = this.props;
		const {
			_handleClickModify,
			_handleCloseConfirmModal,
			_handleClickOk,
			_renderCurrentCodeBall,
			_renderModifyCodeBall,
		} = this;
		const {
			status,
			opencode,
		} = drawingData;

		const isDisabled = !opencode || status === CANCELING || status === MODIFYING || isDrawingProgressing(status);

		return (
			<div className={PREFIX_CLASS}>
				<Button
					className={`${PREFIX_CLASS}__onback-button`}
					outline={Button.OutlineEnums.HOLLOW}
					onClick={onBack}
				>
					返回上一层
				</Button>
				<PageBlock className={`${PREFIX_CLASS}__body`}>
					<Row>
						<Col className={`${PREFIX_CLASS}__body-block`}>
							{_renderCurrentCodeBall()}
							{_renderModifyCodeBall()}
						</Col>
					</Row>
				</PageBlock>
				<PageBlock className={`${PREFIX_CLASS}__footer`}>
					<Button
						onClick={_handleClickModify}
						disabled={isDisabled}
					>
						确认修改
					</Button>
				</PageBlock>
				<Modal.Message
					message="修改开奖号將影響平台盈虧且無法回溯，確定要修改？"
					visible={isShowConfirmModal}
					onClickCancel={_handleCloseConfirmModal}
					onClickOk={_handleClickOk}
				/>
			</div>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			lotteryId,
			issue,
			drawingData,
			updateLotteryDrawingOpencodeLoadingStatus,
			fetchLotteryDrawingLoadingStatus,
			notifyHandlingAction,
			stopUpdateLotteryDrawingIntervalAction,
			startUpdateLotteryDrawingIntervalAction,
		} = this.props;

		if (prevProps.updateLotteryDrawingOpencodeLoadingStatus === LOADING) {
			if (updateLotteryDrawingOpencodeLoadingStatus === SUCCESS) {
				stopUpdateLotteryDrawingIntervalAction();
				startUpdateLotteryDrawingIntervalAction(lotteryId, issue);
			}
		}

		if (prevProps.fetchLotteryDrawingLoadingStatus === LOADING
			&& fetchLotteryDrawingLoadingStatus === SUCCESS
		) {
			if (drawingData.status !== MODIFYING) {
				stopUpdateLotteryDrawingIntervalAction();
				notifyHandlingAction(new Success('修改球号成功'));
			}
		}
	}

	componentWillUnmount() {
		const { stopUpdateLotteryDrawingIntervalAction, } = this.props;

		stopUpdateLotteryDrawingIntervalAction();
	}
}

LotteryGeneralDrawingIssueModifyOpencodePage.propTypes = propTypes;

function mapStateToProp(state) {
	const { lotteryDrawingDetail: lotteryDrawingDetailReducer, } = state;

	return {
		drawingData: lotteryDrawingDetailReducer.get('drawing').toObject(),
		updateLotteryDrawingOpencodeLoadingStatus: lotteryDrawingDetailReducer.get('updateLotteryDrawingOpencodeLoadingStatus'),
		updateLotteryDrawingOpencodeLoadingStatusMessage: lotteryDrawingDetailReducer.get('updateLotteryDrawingOpencodeLoadingStatusMessage'),
		fetchLotteryDrawingLoadingStatus: lotteryDrawingDetailReducer.get('loadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateLotteryDrawingOpencodeAction: (lotteryId, issue, opencode) => dispatch(updateLotteryDrawingOpencodeAction(lotteryId, issue, opencode)),
		stopUpdateLotteryDrawingIntervalAction: () => dispatch(stopUpdateLotteryDrawingIntervalAction()),
		startUpdateLotteryDrawingIntervalAction: (lotteryId, issue) => dispatch(startUpdateLotteryDrawingIntervalAction(lotteryId, issue)),
	};
}

export default connect(mapStateToProp, mapDispatchToProps)(
	withLoadingStatusNotification(
		FailedStatuses,
		LotteryGeneralDrawingIssueModifyOpencodePage
	)
);
