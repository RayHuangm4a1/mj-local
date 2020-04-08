import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../../components/page-block';
import PageModal from '../../../../components/page-modal';
import { HeaderButtonBar, Button } from 'ljit-react-components';
import XinYongPlayStatusSlot from './slot';
import { find, } from 'lodash';
import { connect, } from 'ljit-store-connecter';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import {
	lotteryPlayConditionsActions,
	lotteryPlaysActions,
} from '../../../../controller';
import { LoadingStatusEnum, PlayStatusEnums, PlayClassIdEnums, } from '../../../../lib/enums';
import { convertToNumber, } from '../../../../lib/general-utils';
import groupBy from 'lodash/groupBy';

const { successNotifications, } = notifications;
const { Success, } = successNotifications;
const {
	fetchLotteryPlaysAction,
	updateLotteryPlaysStatusAction,
} = lotteryPlaysActions;
const { fetchLotteryPlayConditionsAction, } = lotteryPlayConditionsActions;
const PREFIX_CLASS = 'general-xinyong-setting';
const { Message, } = PageModal;

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const {
	ONLINE,
	OFFLINE,
} = PlayStatusEnums;

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired,
	lotteryClassId: PropTypes.string,
	lotteryId: PropTypes.string,
	playConditionId: PropTypes.string,
	lotteries: PropTypes.array,
	lotteryPlayConditionsData: PropTypes.array,
	lotteryPlaysData: PropTypes.array,
	updateLotteryPlaysStatusAction: PropTypes.func.isRequired,
	fetchLotteryPlayConditionsAction: PropTypes.func.isRequired,
	fetchLotteryPlaysAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	lotteriesLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	lotteriesLoadingStatusMessage: PropTypes.string.isRequired,
	updateLotteryPlaysStatusLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	updateLotteryPlaysStatusLoadingStatusMessage: PropTypes.string.isRequired,
	lotteryPlayConditionsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	lotteryPlayConditionsLoadingStatusMessage: PropTypes.string.isRequired,
	lotteryPlaysLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	lotteryPlaysLoadingStatusMessage: PropTypes.string.isRequired,
};
const defaultProps = {
	lotteryClassId: '',
	lotteryId: '',
	playConditionId: '',
	lotteries: [],
	lotteryPlayConditionsData: [],
	lotteryPlaysData: [],
};

class LotteryGeneralXinyongSettingEditPage extends Component {
	constructor() {
		super();
		this.state = {
			isConfirmMessageVisible: false,
			changedPlays: {},
		};

		this._handleChangePlayStatus = this._handleChangePlayStatus.bind(this);
		this._handleConfirm = this._handleConfirm.bind(this);
		this._renderSlots = this._renderSlots.bind(this);
		this._renderSlotBlocks = this._renderSlotBlocks.bind(this);
		this._handleOnUpdate = this._handleOnUpdate.bind(this);
	}
	_handleChangePlayStatus(playId, isOnline) {
		const { changedPlays, } = this.state;
		const updatedPlays = Object.assign(changedPlays, {
			[playId]: isOnline
		});

		this.setState({
			changedPlays: updatedPlays,
		});
	}

	_handleConfirm() {
		const {
			lotteryId,
			updateLotteryPlaysStatusAction,
		} = this.props;
		const { changedPlays, } = this.state;
		const plays = Object.keys(changedPlays).map(key => {
			return {
				id: convertToNumber(key),
				status: changedPlays[key] ? ONLINE : OFFLINE,
			};
		});

		updateLotteryPlaysStatusAction({
			lotteryId,
			plays,
		});

		this.setState({ isConfirmMessageVisible: false, });
	}

	_renderSlots(plays = []) {
		const { _handleChangePlayStatus, } = this;

		return plays
			.sort((a,b) => a.id - b.id)
			.map(play => (
				<XinYongPlayStatusSlot
					key={play.id}
					play={play}
					isEditing
					onChangeStatus={(isOnline) => _handleChangePlayStatus(play.id, isOnline)}
				/>
			));
	}
	_renderSlotBlocks() {
		const {
			playConditionId,
			lotteryPlayConditionsData,
			lotteryPlaysData,
		} = this.props;
		const { _renderSlots } = this;
		const subconditionIdMap = groupBy(lotteryPlaysData, plays => plays.playSubcondition.id) || {};
		const playCondition = find(lotteryPlayConditionsData, { id: parseInt(playConditionId), }) || {};
		const { subconditions = [] } = playCondition;

		return subconditions
			.sort((a,b) => a.id - b.id)
			.map(subcondition => {
				const { name, id, } = subcondition;
				const plays = subconditionIdMap[id] || [];

				return (
					<div key={id} className={`${PREFIX_CLASS}__slot-block`}>
						<div>{name}</div>
						{_renderSlots(plays)}
					</div>
				);
			});
	}
	_handleOnUpdate() {
		const { lotteries, lotteryId, onUpdate } = this.props;

		const lottery = lotteries.filter(lottery => lottery.id === Number(lotteryId))[0];
		const lotteryName = lottery ? lottery.name : '';

		onUpdate({
			lotteryName
		});
	}
	render() {
		const { _handleConfirm, _renderSlotBlocks, } = this;
		const { isConfirmMessageVisible, } = this.state;
		const {
			onNavigate,
			lotteryClassId,
			lotteryId,
			playConditionId,
		} = this.props;

		return (
			<div className={`${PREFIX_CLASS}__edit`}>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={() => {
						onNavigate('/lottery/general/xinyong-setting', {
							passProps: {
								lotteryClassId,
								lotteryId,
								playConditionId,
							}
						});
					}}
				>
					回到上一页
				</Button>
				<PageBlock>
					<HeaderButtonBar
						right={(
							<Button
								color={Button.ColorEnums.BRIGHTBLUE500}
								onClick={() => this.setState({ isConfirmMessageVisible: true, })}
							>
								儲存
							</Button>
						)}
					/>
					{_renderSlotBlocks()}
				</PageBlock>
				<Message
					visible={isConfirmMessageVisible}
					className={`${PREFIX_CLASS}__message`}
					title="提示"
					message="确定變更項目？"
					onClickOk={_handleConfirm}
					onClickCancel={() => this.setState({ isConfirmMessageVisible: false, })}
				/>
			</div>
		);
	}
	componentDidMount() {
		const {
			lotteryId,
			fetchLotteryPlayConditionsAction,
			fetchLotteryPlaysAction,
		} = this.props;
		const { _handleOnUpdate, } = this;

		_handleOnUpdate();
		fetchLotteryPlayConditionsAction(lotteryId);
		fetchLotteryPlaysAction(lotteryId);
	}
	componentDidUpdate(prevProps) {
		const {
			lotteriesLoadingStatus,
			updateLotteryPlaysStatusLoadingStatus,
			notifyHandlingAction,
		} = this.props;
		const {
			_handleOnUpdate,
		} = this;

		if (prevProps.lotteriesLoadingStatus === LOADING && lotteriesLoadingStatus === SUCCESS) {
			_handleOnUpdate();
		}
		if (prevProps.updateLotteryPlaysStatusLoadingStatus === LOADING && updateLotteryPlaysStatusLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('成功修改玩法状态'));
		}
	}
}

LotteryGeneralXinyongSettingEditPage.propTypes = propTypes;
LotteryGeneralXinyongSettingEditPage.defaultProps = defaultProps;

function mapStateToProp(state) {
	return {
		lotteries: state.lotteryClassesAndLotteries.get('lotteries').toArray(),
		lotteryPlayConditionsData: state.lotteryPlayConditions.get('data').toArray(),
		lotteryPlaysData: state.lotteryPlays.get('plays').toArray(),
		lotteriesLoadingStatus: state.lotteryClassesAndLotteries.get('loadingStatus'),
		lotteriesLoadingStatusMessage: state.lotteryClassesAndLotteries.get('loadingStatusMessage'),
		updateLotteryPlaysStatusLoadingStatus: state.lotteryPlays.get('updateLotteryPlaysStatusLoadingStatus'),
		updateLotteryPlaysStatusLoadingStatusMessage: state.lotteryPlays.get('updateLotteryPlaysStatusLoadingStatusMessage'),
		lotteryPlayConditionsLoadingStatus: state.lotteryPlayConditions.get('loadingStatus'),
		lotteryPlayConditionsLoadingStatusMessage: state.lotteryPlayConditions.get('loadingStatusMessage'),
		lotteryPlaysLoadingStatus: state.lotteryPlays.get('loadingStatus'),
		lotteryPlaysLoadingStatusMessage: state.lotteryPlays.get('loadingStatusMessage'),
	};
}

function mapDispatchToProp(dispatch) {
	return {
		fetchLotteryPlayConditionsAction: (lotteryId) => dispatch(fetchLotteryPlayConditionsAction(lotteryId, PlayClassIdEnums.XING_YONG)),
		fetchLotteryPlaysAction: (lotteryId) => dispatch(fetchLotteryPlaysAction(lotteryId, PlayClassIdEnums.XING_YONG)),
		updateLotteryPlaysStatusAction: ({ lotteryId, plays }) => dispatch(updateLotteryPlaysStatusAction({ lotteryId, plays })),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(
	withLoadingStatusNotification(
		[{
			loadingStatus: 'lotteriesLoadingStatus',
			loadingStatusMessage: 'lotteriesLoadingStatusMessage',
		},{
			loadingStatus: 'updateLotteryPlaysStatusLoadingStatus',
			loadingStatusMessage: 'updateLotteryPlaysStatusLoadingStatusMessage',
		},{
			loadingStatus: 'lotteryPlayConditionsLoadingStatus',
			loadingStatusMessage: 'lotteryPlayConditionsLoadingStatusMessage',
		},{
			loadingStatus: 'lotteryPlaysLoadingStatus',
			loadingStatusMessage: 'lotteryPlaysLoadingStatusMessage',
		}],
		LotteryGeneralXinyongSettingEditPage)
);
