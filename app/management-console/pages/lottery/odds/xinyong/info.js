import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { 
	HeaderButtonBar,
	Button,
	LabelContent,
	Select,
	SidebarTabs
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import XinyongOddsTable from './xinyong-odds-table';
import { connect } from 'ljit-store-connecter';
import {
	lotteryPlayBonusXinyongManagementPageActions,
	lotteryPlayConditionsActions,
	lotteryPlaysActions,
} from '../../../../controller';
import { withLoadingStatusNotification, notifications, } from '../../../../../lib/notify-handler';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { PlayClassIdEnums } from '../../../../lib/enums';

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const { XING_YONG, } = PlayClassIdEnums;
const {
	setLotteryPlayBonusXinyongManagementPageLotteryOptionsAction: setLotteryOptionsAction,
} = lotteryPlayBonusXinyongManagementPageActions;
const { fetchLotteryPlayConditionsAction, } = lotteryPlayConditionsActions;
const { fetchLotteryPlaysAction } = lotteryPlaysActions;
const {
	errorNotifications,
} = notifications;
const {
	GeneralError,
} = errorNotifications;

const propTypes = {
	lotteryClassId: PropTypes.string,
	lotteryId: PropTypes.string,
	playConditionId: PropTypes.string,
	onNavigate: PropTypes.func,
	pathName: PropTypes.string,
	lotteriesMap: PropTypes.objectOf(
		PropTypes.arrayOf(PropTypes.shape({
			lotteryClass: PropTypes.shape({
				id: PropTypes.number,
			}),
			name: PropTypes.string,
			id: PropTypes.number,
		})),
	),
	lotteryClassOptions: PropTypes.array.isRequired,
	lotteryOptions: PropTypes.array.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	setLotteryOptionsAction: PropTypes.func.isRequired,
	fetchLotteryPlayConditionsAction: PropTypes.func.isRequired,
	fetchLotteryPlaysAction: PropTypes.func.isRequired,
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	playConditionsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	playsLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	playConditionsData: PropTypes.array,
	playsData: PropTypes.array,
};

class LotteryOddsXinyongInfoPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			playsTabData: [],
			selectedLotteryClassId: props.lotteryClassId ? Number(props.lotteryClassId) : null,
			selectedLotteryId: props.lotteryId ? Number(props.lotteryId) : null,
			selectedPlayConditionId: null,
		};
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._renderTabs = this._renderTabs.bind(this);
		this._handleChangeLotteryClass = this._handleChangeLotteryClass.bind(this);
		this._handleChangeLottery = this._handleChangeLottery.bind(this);
		this._handleClickEdit = this._handleClickEdit.bind(this);
		this._handleFetchPlayAndPlayConditions = this._handleFetchPlayAndPlayConditions.bind(this);
		this._renderHeader = this._renderHeader.bind(this);
	}

	_handleChangeTab(tabKey) {
		this.setState({
			selectedPlayConditionId: tabKey
		});
	}

	_handleChangeLotteryClass(selectedLotteryClassId) {
		const {
			lotteriesMap,
			lotteryClassOptions,
			notifyHandlingAction,
			setLotteryOptionsAction,
		} = this.props;
		const {
			_handleFetchPlayAndPlayConditions
		} = this;
		const lotteries = lotteriesMap[selectedLotteryClassId];
		const hasLottery = lotteries && lotteries.length > 0;

		if (!hasLottery) {
			const [lotteryClass = { label: '', }] = lotteryClassOptions.filter(
				lotteryClass => lotteryClass.value === Number(selectedLotteryClassId)
			);

			notifyHandlingAction(new GeneralError(`${lotteryClass.label}没有彩种`));
		} else {
			setLotteryOptionsAction(lotteries);
			const selectedLotteryId = getDataInArrayObject(lotteries, 'id');

			this.setState({
				selectedLotteryClassId,
				selectedLotteryId,
			});
			_handleFetchPlayAndPlayConditions(selectedLotteryId);
		}
	}

	_handleChangeLottery(selectedLotteryId) {
		this.setState({
			selectedLotteryId,
		});
		this._handleFetchPlayAndPlayConditions(selectedLotteryId);
	}

	_handleFetchPlayAndPlayConditions(selectedLotteryId) {
		const {
			fetchLotteryPlayConditionsAction,
			fetchLotteryPlaysAction,
		} = this.props;

		fetchLotteryPlayConditionsAction(selectedLotteryId, XING_YONG);
		fetchLotteryPlaysAction(selectedLotteryId, XING_YONG);
	}

	_handleClickEdit() {
		const {
			pathName,
			onNavigate,
		} = this.props;
		const {
			selectedLotteryClassId,
			selectedLotteryId,
			selectedPlayConditionId,
		} = this.state;

		onNavigate(`${pathName}/${selectedLotteryClassId}/${selectedLotteryId}/edit/${selectedPlayConditionId}`);
	}
	_renderHeader() {
		const { 
			lotteryClassOptions,
			lotteryOptions,
		} = this.props;
		const {
			_handleChangeLotteryClass,
			_handleChangeLottery,
			_handleClickEdit
		} = this;
		const {
			selectedLotteryClassId,
			selectedLotteryId,
		} = this.state;
	
		return (
			<HeaderButtonBar
				className="xin-yong-odds-header"
				left={(
					<React.Fragment>
						<LabelContent
							label="彩类："
							className="lottery-class-select"
						>
							<Select
								options={lotteryClassOptions}
								value={(selectedLotteryClassId)}
								onChange={_handleChangeLotteryClass}
							/>
						</LabelContent>
						<LabelContent
							label="彩种："
							className="lottery-select"
						>
							<Select
								options={lotteryOptions}
								value={(selectedLotteryId)}
								onChange={_handleChangeLottery}
							/>
						</LabelContent>
					</React.Fragment>
				)}
				right={
					<Button
						color={Button.ColorEnums.BRIGHTBLUE500}
						onClick={_handleClickEdit}
					>
						编辑
					</Button>
				}
			/>
		);
	}
	_renderTabs() {
		const {
			playsTabData
		} = this.state;

		return playsTabData.map(item => {
			return (
				<XinyongOddsTable
					key={item.id}
					subconditions={item.subconditions}
				/>
			);
		});
	}

	render() {
		const { playsTabData, } = this.state;
		const {
			_handleChangeTab,
			_renderHeader,
			_renderTabs
		} = this;
		const {
			selectedPlayConditionId,
		} = this.state;

		return (
			<PageBlock className="xin-yong-odds">
				{ _renderHeader() }
				<SidebarTabs
					tabData={playsTabData}
					activeKey={selectedPlayConditionId}
					onChange={_handleChangeTab}
				>
					{_renderTabs()}
				</SidebarTabs>
			</PageBlock>
		);
	}
	componentDidUpdate(prevProps) {
		const {
			loadingStatus,
			playConditionsLoadingStatus,
			playsLoadingStatus,
			playConditionsData,
			notifyHandlingAction,
			setLotteryOptionsAction,
			lotteryClassOptions,
			lotteriesMap,
			playsData,
			playConditionId,
		} = this.props;
		const {
			selectedLotteryId,
			selectedLotteryClassId,
			selectedPlayConditionId,
		} = this.state;
		const {
			_handleFetchPlayAndPlayConditions
		} = this;

		if (prevProps.loadingStatus === LOADING && loadingStatus === SUCCESS) {
			if (selectedLotteryId !== null && selectedLotteryId!== undefined) {
				const lotteries = lotteriesMap[selectedLotteryClassId];

				_handleFetchPlayAndPlayConditions(selectedLotteryId);
				setLotteryOptionsAction(lotteries);
			} else {
				const selectedLotteryClassId = getDataInArrayObject(lotteryClassOptions, 'value');

				this._handleChangeLotteryClass(selectedLotteryClassId);
			}
		}

		if (prevProps.playConditionsLoadingStatus === LOADING && playConditionsLoadingStatus === SUCCESS) {
			const playsTabData = playConditionsData
				.sort((a,b) => a.id - b.id)
				.map(playCondition => ({
					...playCondition,
					tab: playCondition.name,
					key: playCondition.id,
				}));

			if (selectedPlayConditionId === null && playConditionId) {
				this.setState({
					selectedPlayConditionId: playConditionId,
					playsTabData,
				});
			} else {
				const defaultPlayConditionId = getDataInArrayObject(playsTabData, 'id');

				this.setState({
					selectedPlayConditionId: String(defaultPlayConditionId),
					playsTabData,
				});
			}
		}

		if (prevProps.playsLoadingStatus === LOADING && playsLoadingStatus === SUCCESS) {
			if (playsData.length === 0) {
				notifyHandlingAction(new GeneralError("此彩种沒有玩法"));
			}
		}
	}
}

LotteryOddsXinyongInfoPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		lotteriesMap: state.lotteryClassesAndLotteries.get('lotteriesMap').toObject(),
		lotteryClassOptions: state.lotteryPlayBonusXinyongManagementPage.get('lotteryClassOptions').toArray(),
		lotteryOptions: state.lotteryPlayBonusXinyongManagementPage.get('lotteryOptions').toArray(),
		loadingStatus: state.lotteryPlayBonusXinyongManagementPage.get('loadingStatus'),
		loadingStatusMessage: state.lotteryPlayBonusXinyongManagementPage.get('loadingStatusMessage'),
		playConditionsData: state.lotteryPlayConditions.get('data').toArray(),
		playConditionsLoadingStatus: state.lotteryPlayConditions.get('loadingStatus'),
		playConditionsLoadingStatusMessage: state.lotteryPlayConditions.get('loadingStatusMessage'),
		playsData: state.lotteryPlays.get('plays').toArray(),
		playsLoadingStatus: state.lotteryPlays.get('loadingStatus'),
		playsLoadingStatusMessage: state.lotteryPlays.get('loadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		setLotteryOptionsAction: (lotteries) => dispatch(setLotteryOptionsAction(lotteries)),
		fetchLotteryPlaysAction: (lotteryId, playClassId) => dispatch(fetchLotteryPlaysAction(lotteryId, playClassId)),
		fetchLotteryPlayConditionsAction: (lotteryId, playClassId) => dispatch(fetchLotteryPlayConditionsAction(lotteryId, playClassId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
		{
			loadingStatus: 'playConditionsLoadingStatus',
			loadingStatusMessage: 'playConditionsLoadingStatusMessage',
		},
		{
			loadingStatus: 'playsLoadingStatus',
			loadingStatusMessage: 'playsLoadingStatusMessage',
		},
	],
	LotteryOddsXinyongInfoPage)
);

function getDataInArrayObject(array = [], columnKey) {
	return array[0] ? array[0][columnKey] : null;
}
