import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import PageBlock from '../../../../components/page-block';
import {
	Tabs,
	HeaderButtonBar,
	Select,
	Button,
	LabelContent,
} from 'ljit-react-components';
import XinYongPlayStatusSlot from './slot';
import { connect } from 'ljit-store-connecter';
import {
	lotteryPlayBonusXinyongManagementPageActions,
	lotteryPlayConditionsActions,
	lotteryPlaysActions,
} from '../../../../controller';
import { notifications, } from '../../../../../lib/notify-handler';
import { PlayClassIdEnums, LoadingStatusEnum } from '../../../../lib/enums';
import { withLoadingStatusNotification, } from '../../../../../lib/notify-handler';
import groupBy from 'lodash/groupBy';

const { NONE, LOADING, SUCCESS, FAILED, } = LoadingStatusEnum;
const {
	setLotteryPlayBonusXinyongManagementPageLotteryOptionsAction: setLotteryOptionsAction,
} = lotteryPlayBonusXinyongManagementPageActions;
const { fetchLotteryPlayConditionsAction, } = lotteryPlayConditionsActions;
const { fetchLotteryPlaysAction, } = lotteryPlaysActions;
const { errorNotifications, } = notifications;
const { GeneralError, } = errorNotifications;

const { TabPane } = Tabs;
const PREFIX_CLASS = 'general-xinyong-setting';

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
	pathName: PropTypes.string.isRequired,
	lotteryClassId: PropTypes.string,
	lotteryId: PropTypes.string,
	playConditionId: PropTypes.string,
	lotteriesMap: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.shape({
			lotteryClass: PropTypes.shape({
				id: PropTypes.number,
			}),
			name: PropTypes.string,
			id: PropTypes.number,
		})),
	),
	lotteryClassOptions: PropTypes.array,
	lotteryOptions: PropTypes.array,
	lotteryPlayConditionsData: PropTypes.array,
	lotteryPlaysData: PropTypes.array,
	notifyHandlingAction: PropTypes.func.isRequired,
	setLotteryOptionsAction: PropTypes.func.isRequired,
	fetchLotteryPlayConditionsAction: PropTypes.func.isRequired,
	fetchLotteryPlaysAction: PropTypes.func.isRequired,
	lotteryPlayConditionsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	lotteryPlayConditionsLoadingStatusMessage: PropTypes.string.isRequired,
	lotteryPlaysLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
	lotteryPlaysLoadingStatusMessage: PropTypes.string.isRequired,
	lotteryPlayBonusXinyongManagementPageLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING,]).isRequired,
};

const defaultProps = {
	lotteryClassId: null,
	lotteryId: null,
	playConditionId: null,
	lotteryClassOptions: [],
	lotteryOptions: [],
	lotteryPlayConditionsData: [],
	lotteryPlaysData: [],
};

class LotteryGeneralXinyongSettingInfoPage extends Component {
	constructor() {
		super();
		this.state = {
			selectedLotteryClassId: null,
			selectedLotteryId: null,
			selectedPlayConditionId: null,
		};

		this._handleChangeLotteryClassAndLottery = this._handleChangeLotteryClassAndLottery.bind(this);
		this._handleChangeLottery = this._handleChangeLottery.bind(this);
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._renderSlots = this._renderSlots.bind(this);
		this._renderSlotBlocks = this._renderSlotBlocks.bind(this);
		this._renderTabs = this._renderTabs.bind(this);
		this._handleCheckPlaysData = this._handleCheckPlaysData.bind(this);
	}

	_handleChangeLotteryClassAndLottery(selectedLotteryClassId, selectedLotteryId = null) {
		const {
			lotteriesMap,
			lotteryClassOptions,
			notifyHandlingAction,
			setLotteryOptionsAction,
		} = this.props;
		const lotteries = lotteriesMap[selectedLotteryClassId];
		const hasLottery = lotteries && lotteries.length > 0;

		if (!hasLottery) {
			const [lotteryClass = { label: '', }] = lotteryClassOptions.filter(
				lotteryClass => lotteryClass.value === selectedLotteryClassId
			);

			notifyHandlingAction(new GeneralError(`${lotteryClass.label}没有彩种`));
		}

		setLotteryOptionsAction(selectedLotteryClassId, lotteries);
		this.setState({ selectedLotteryClassId, });
		this._handleChangeLottery(selectedLotteryId ? selectedLotteryId : lotteries[0].id);
	}

	_handleChangeLottery(selectedLotteryId) {
		const {
			fetchLotteryPlayConditionsAction,
			fetchLotteryPlaysAction
		} = this.props;

		fetchLotteryPlayConditionsAction(selectedLotteryId);
		fetchLotteryPlaysAction(selectedLotteryId);
		this.setState({ selectedLotteryId, });
	}

	_handleChangeTab(selectedPlayConditionId) {
		this.setState({ selectedPlayConditionId, });
		this._handleCheckPlaysData();
	}

	_renderSlots(plays) {
		return plays
			.sort((a, b) => a.id - b.id)
			.map((play = {}, index) => (
				<XinYongPlayStatusSlot
					key={play.id || index}
					play={play}
				/>
			));
	}

	_renderSlotBlocks(subconditions) {
		const { _renderSlots } = this;
		const { lotteryPlaysData, } = this.props;
		const subconditionIdMap = groupBy(lotteryPlaysData, plays => plays.playSubcondition.id) || {};

		return subconditions
			.sort((a, b) => a.id - b.id)
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

	_renderTabs() {
		const { _renderSlotBlocks } = this;
		const { lotteryPlayConditionsData, } = this.props;

		return lotteryPlayConditionsData
			.sort((a, b) => a.id - b.id)
			.map(playCondition => {
				const { name, id, subconditions, } = playCondition;

				return (
					<TabPane
						tab={name}
						key={id}
					>
						{_renderSlotBlocks(subconditions)}
					</TabPane>
				);
			});
	}
	_handleCheckPlaysData() {
		const { notifyHandlingAction, lotteryPlaysData, } = this.props;

		if (lotteryPlaysData.length === 0) {
			notifyHandlingAction(new GeneralError('没有玩法'));
		}
	}

	render() {
		const {
			onNavigate,
			pathName,
			lotteryClassOptions,
			lotteryOptions,
		} = this.props;
		const {
			selectedLotteryClassId,
			selectedLotteryId,
			selectedPlayConditionId,
		} = this.state;
		const {
			_handleChangeLottery,
			_handleChangeLotteryClassAndLottery,
			_handleChangeTab,
			_renderTabs,
		} = this;

		return (
			<PageBlock className={`${PREFIX_CLASS}__info`}>
				<HeaderButtonBar
					left={(
						<React.Fragment>
							<LabelContent
								label="彩类"
							>
								<Select
									options={lotteryClassOptions}
									value={selectedLotteryClassId}
									onChange={(selectedLotteryClassId) => _handleChangeLotteryClassAndLottery(selectedLotteryClassId)}
								/>
							</LabelContent>
							<LabelContent
								label="彩种"
							>
								<Select
									options={lotteryOptions}
									value={selectedLotteryId}
									onChange={_handleChangeLottery}
								/>
							</LabelContent>
						</React.Fragment>
					)}
					right={(
						<Button
							color={Button.ColorEnums.BRIGHTBLUE500}
							onClick={() => (
								onNavigate(`${pathName}/${selectedLotteryClassId}/${selectedLotteryId}/edit/${selectedPlayConditionId}`)
							)}
						>
							编 辑
						</Button>
					)}
				/>
				<Tabs
					tabType="line"
					tabPosition="left"
					activeKey={selectedPlayConditionId + ''}
					onChange={_handleChangeTab}
				>
					{_renderTabs()}
				</Tabs>
			</PageBlock>
		);
	}

	componentDidUpdate(prevProps) {
		const {
			lotteryClassId,
			lotteryId,
			playConditionId,
			lotteryPlayConditionsData,
			lotteryClassOptions,
			lotteryPlayConditionsLoadingStatus,
			lotteryPlaysLoadingStatus,
			lotteryPlayBonusXinyongManagementPageLoadingStatus,
		} = this.props;
		const { selectedPlayConditionId, } = this.state;

		if (
			lotteryPlayBonusXinyongManagementPageLoadingStatus === SUCCESS
			&& prevProps.lotteryPlayBonusXinyongManagementPageLoadingStatus === LOADING
		) {
			if (lotteryClassId !== null && lotteryId !== null) {
				this._handleChangeLotteryClassAndLottery(parseInt(lotteryClassId), parseInt(lotteryId));
			} else {
				const defaultLotteryClassId = lotteryClassOptions[0] ? lotteryClassOptions[0].value : null;

				this._handleChangeLotteryClassAndLottery(defaultLotteryClassId);
			}
		}

		if (
			lotteryPlayConditionsLoadingStatus === SUCCESS
			&& prevProps.lotteryPlayConditionsLoadingStatus === LOADING
			&& lotteryPlayConditionsData.length > 0
		) {
			if (selectedPlayConditionId === null && playConditionId !== null) {
				this.setState({ selectedPlayConditionId: parseInt(playConditionId), });
			} else {
				this.setState({	selectedPlayConditionId: lotteryPlayConditionsData[0].id, });
			}
		}

		if (
			lotteryPlaysLoadingStatus === SUCCESS
			&& prevProps.lotteryPlaysLoadingStatus === LOADING
		) {
			this._handleCheckPlaysData();
		}
	}
}

LotteryGeneralXinyongSettingInfoPage.propTypes = propTypes;
LotteryGeneralXinyongSettingInfoPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		lotteriesMap: state.lotteryClassesAndLotteries.get('lotteriesMap').toObject(),
		lotteryClassOptions: state.lotteryPlayBonusXinyongManagementPage.get('lotteryClassOptions').toArray(),
		lotteryOptions: state.lotteryPlayBonusXinyongManagementPage.get('lotteryOptions').toArray(),
		lotteryPlayConditionsData: state.lotteryPlayConditions.get('data').toArray(),
		lotteryPlaysData: state.lotteryPlays.get('plays').toArray(),
		lotteryPlayConditionsLoadingStatus: state.lotteryPlayConditions.get('loadingStatus'),
		lotteryPlayConditionsLoadingStatusMessage: state.lotteryPlayConditions.get('loadingStatusMessage'),
		lotteryPlaysLoadingStatus: state.lotteryPlays.get('loadingStatus'),
		lotteryPlaysLoadingStatusMessage: state.lotteryPlays.get('loadingStatusMessage'),
		lotteryPlayBonusXinyongManagementPageLoadingStatus: state.lotteryPlayBonusXinyongManagementPage.get('loadingStatus')
	};
}

function mapDispatchToProps(dispatch) {
	return {
		setLotteryOptionsAction: (selectedLotteryClassId, lotteries) => dispatch(setLotteryOptionsAction(selectedLotteryClassId, lotteries)),
		fetchLotteryPlayConditionsAction: (lotteryId) => dispatch(fetchLotteryPlayConditionsAction(lotteryId, PlayClassIdEnums.XING_YONG)),
		fetchLotteryPlaysAction: (lotteryId) => dispatch(fetchLotteryPlaysAction(lotteryId, PlayClassIdEnums.XING_YONG)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[{
		loadingStatus: 'lotteryPlayConditionsLoadingStatus',
		loadingStatusMessage: 'lotteryPlayConditionsLoadingStatusMessage',
	},{
		loadingStatus: 'lotteryPlaysLoadingStatus',
		loadingStatusMessage: 'lotteryPlaysLoadingStatusMessage',
	}],
	LotteryGeneralXinyongSettingInfoPage
));
