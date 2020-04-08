import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, RemindText, } from 'ljit-react-components';
import { connect, } from '../../../../../../../ljit-store-connecter';
import { getLotteryClassPositions, } from '../../../../../../../lib/lotteries';
import {
	lotteryDrawingManagementPageActions,
	lotteryDrawingDetailActions,
} from '../../../../../../controller';
import { convertToNumber, } from '../../../../../../lib/general-utils';
import {
	LoadingStatusEnum,
	DrawingStatusEnums,
} from '../../../../../../lib/enums';
import OpencodeBlock from './opencode-block';
import DiscardBettingBlock from './discard-betting-block';
import CorrectionBlock from './correction-block';
import {
	notifications,
	withLoadingStatusNotification,
} from '../../../../../../../lib/notify-handler';
import PageBlock from '../../../../../../components/page-block';
import {
	isDrawingProgressing,
	shouldWaitDrawingUpdate,
} from '../../utils';
import { AUTO_UPDATE_SECONDS, } from '../../../../../../lib/utils';

const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;
const {
	CANCELED,
	MODIFYING,
	CANCELING,
	TEAM_COMMISSION_GRANTED,
} = DrawingStatusEnums;
const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const { removeSelectedLotteryDrawingAction, } = lotteryDrawingManagementPageActions;
const {
	cancelLotteryDrawingAction,
	fetchLotteryDrawingBettingsCountAction,
	stopUpdateLotteryDrawingIntervalAction,
	startUpdateLotteryDrawingIntervalAction,
} = lotteryDrawingDetailActions;

const propTypes = {
	onBack: PropTypes.func.isRequired,
	removeSelectedLotteryDrawingAction: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired,
	pathName: PropTypes.string,
	selectedLotteryClassId: PropTypes.string,
	cancelLotteryDrawingAction: PropTypes.func.isRequired,
	cancelLotteryDrawingLoadingStatus: PropTypes.PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	fetchLotteryDrawingLoadingStatus: PropTypes.PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	cancelLotteryDrawingLoadingStatusMessage: PropTypes.string.isRequired,
	drawingData: PropTypes.shape({
		lotteryId: PropTypes.number,
		issue: PropTypes.number,
		index: PropTypes.string,
		opencode: PropTypes.string,
		startedAt: PropTypes.string,
		closedAt: PropTypes.string,
		openedAt: PropTypes.string,
		isFetched: PropTypes.number,
		income: PropTypes.number,
		expense: PropTypes.number,
		status: PropTypes.oneOf(Object.values(DrawingStatusEnums)),
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
	}).isRequired,
	bettingsCount: PropTypes.number.isRequired,
	fetchLotteryDrawingBettingsCountAction: PropTypes.func.isRequired,
	lotteryId: PropTypes.string.isRequired,
	issue: PropTypes.string.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	stopUpdateLotteryDrawingIntervalAction: PropTypes.func.isRequired,
	startUpdateLotteryDrawingIntervalAction: PropTypes.func.isRequired,
};

const PREFIX_CLASS = 'lottery-drawing-modify';
const FailedStatuses = [
	{
		loadingStatus: 'cancelLotteryDrawingLoadingStatus',
		loadingStatusMessage: 'cancelLotteryDrawingLoadingStatusMessage',
	},
];

class LotteryGeneralDrawingIssueModifyPage extends Component {
	constructor(props) {
		super(props);

		this._handleClickBack = this._handleClickBack.bind(this);
		this._handleNavigate = this._handleNavigate.bind(this);
		this._handleCancelDrawing = this._handleCancelDrawing.bind(this);
		this._renderAutoUpdateRemindText = this._renderAutoUpdateRemindText.bind(this);
	}

	_handleClickBack() {
		const {
			removeSelectedLotteryDrawingAction,
			onBack,
		} = this.props;

		removeSelectedLotteryDrawingAction();
		onBack();
	}
	_handleNavigate(path) {
		this.props.onNavigate(path);
	}
	_handleCancelDrawing() {
		const {
			cancelLotteryDrawingAction,
			lotteryId,
			issue,
		} = this.props;

		cancelLotteryDrawingAction(lotteryId, issue);
	}

	_renderAutoUpdateRemindText() {
		const { status, } = this.props.drawingData;
		const isShow = shouldWaitDrawingUpdate(status);

		if (!isShow) {
			return null;
		}

		return (
			<RemindText
				text={`資料將於 [${AUTO_UPDATE_SECONDS}秒] 後更新`}
				className={`${PREFIX_CLASS}__remind-text`}
			/>
		);
	}

	render() {
		const {
			drawingData,
			bettingsCount,
			selectedLotteryClassId,
			fetchLotteryDrawingLoadingStatus,
		} = this.props;
		const {
			_handleClickBack,
			_handleNavigate,
			_handleCancelDrawing,
			_renderAutoUpdateRemindText,
		} = this;
		const { status, } = drawingData;
		const convertedLotteryClassId = convertToNumber(selectedLotteryClassId);
		const drawings = convertDrawingToDataSource(drawingData, bettingsCount);
		const positions = getLotteryClassPositions(convertedLotteryClassId);
		const isDisabled = fetchLotteryDrawingLoadingStatus === FAILED
			|| status === MODIFYING || status === CANCELING
			|| isDrawingProgressing(status);

		return (
			<div className={PREFIX_CLASS}>
				<Button
					className={`${PREFIX_CLASS}__onback-button`}
					outline={Button.OutlineEnums.HOLLOW}
					onClick={_handleClickBack}
				>
					返回上一层
				</Button>
				<PageBlock>
					{_renderAutoUpdateRemindText()}
					<OpencodeBlock
						drawings={drawings}
						onClickModifyButton={_handleNavigate.bind(this, 'modify-opencode')}
						positions={positions}
						isButtonDisabled={isDisabled}
					/>
					<Divider/>
					<DiscardBettingBlock
						drawings={drawings}
						onCancelDrawing={_handleCancelDrawing}
						isButtonDisabled={isDisabled}
					/>
				</PageBlock>
				<CorrectionBlock
					drawings={drawings}
					onClickDetailButton={_handleNavigate.bind(this, 'negative-balance-correction')}
				/>
			</div>
		);
	}

	componentDidMount() {
		const {
			lotteryId,
			issue,
			drawingData,
			fetchLotteryDrawingBettingsCountAction,
			stopUpdateLotteryDrawingIntervalAction,
			startUpdateLotteryDrawingIntervalAction,
		} = this.props;
		const { status, } = drawingData;

		fetchLotteryDrawingBettingsCountAction(lotteryId, issue);

		if (shouldWaitDrawingUpdate(status)) {
			stopUpdateLotteryDrawingIntervalAction();
			startUpdateLotteryDrawingIntervalAction(lotteryId, issue);
		}
	}

	componentDidUpdate(prevProps) {
		const {
			lotteryId,
			issue,
			cancelLotteryDrawingLoadingStatus,
			fetchLotteryDrawingLoadingStatus,
			notifyHandlingAction,
		} = this.props;

		if (prevProps.cancelLotteryDrawingLoadingStatus === LOADING) {
			if (cancelLotteryDrawingLoadingStatus === SUCCESS) {
				stopUpdateLotteryDrawingIntervalAction();
				startUpdateLotteryDrawingIntervalAction(lotteryId, issue);
			}
		}

		if (prevProps.fetchLotteryDrawingLoadingStatus === LOADING) {
			if (fetchLotteryDrawingLoadingStatus === SUCCESS) {
				if (status === CANCELED) {
					stopUpdateLotteryDrawingIntervalAction();
					notifyHandlingAction(new Success('撤单成功'));
				}

				if (status === TEAM_COMMISSION_GRANTED) {
					stopUpdateLotteryDrawingIntervalAction();
				}
			}
		}
	}
 
	componentWillUnmount() {
		const { stopUpdateLotteryDrawingIntervalAction, } = this.props;

		stopUpdateLotteryDrawingIntervalAction();
	}
}

LotteryGeneralDrawingIssueModifyPage.propTypes = propTypes;

function convertDrawingToDataSource(drawing, bettingsCount) {
	const {
		expense,
		income,
		opencode,
	} = drawing;
	const opencodes = opencode ? opencode.split(',') : [];

	return [{
		...drawing,
		key: drawing.id,
		bettingsCount,
		profitAfterCancel: expense - income,
		opencodes,
		// TODO: 負數補正，等資料結構確定再修改，目前先塞假資料
		numberOfbalanceIsNegative: 2356,
	}];
}

function mapStateToProp(state) {
	const { lotteryDrawingDetail: lotteryDrawingDetailReducer, } = state;

	return {
		drawingData: lotteryDrawingDetailReducer.get('drawing').toObject(),
		bettingsCount: lotteryDrawingDetailReducer.get('bettingsCount'),
		cancelLotteryDrawingLoadingStatus: lotteryDrawingDetailReducer.get('cancelLotteryDrawingLoadingStatus'),
		cancelLotteryDrawingLoadingStatusMessage: lotteryDrawingDetailReducer.get('cancelLotteryDrawingLoadingStatusMessage'),
		updateDrawingOpencodeLoadingStatus: lotteryDrawingDetailReducer.get('updateDrawingOpencodeLoadingStatus'),
		fetchLotteryDrawingLoadingStatus: lotteryDrawingDetailReducer.get('loadingStatus'),
	};
}

function mapDispatchToProp(dispatch) {
	return {
		removeSelectedLotteryDrawingAction: () => dispatch(removeSelectedLotteryDrawingAction()),
		cancelLotteryDrawingAction: (lotteryId, issue) => dispatch(cancelLotteryDrawingAction(lotteryId, issue)),
		fetchLotteryDrawingBettingsCountAction: (lotteryId, issue) => dispatch(fetchLotteryDrawingBettingsCountAction(lotteryId, issue)),
		stopUpdateLotteryDrawingIntervalAction: () => dispatch(stopUpdateLotteryDrawingIntervalAction()),
		startUpdateLotteryDrawingIntervalAction: (lotteryId, issue) => dispatch(startUpdateLotteryDrawingIntervalAction(lotteryId, issue)),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(
	withLoadingStatusNotification(
		FailedStatuses,
		LotteryGeneralDrawingIssueModifyPage
	)
);
