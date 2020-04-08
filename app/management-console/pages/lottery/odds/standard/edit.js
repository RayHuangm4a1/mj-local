import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Button,
	HeaderButtonBar,
	Table,
	InputNumber,
	CheckBox,
	Icon,
} from 'ljit-react-components';
import { PREFIX_CLASS } from './';
import PageModal from '../../../../components/page-modal';
import PageBlock from '../../../../components/page-block';
import { connect } from '../../../../../ljit-store-connecter';
import {
	lotteryPlaysActions,
	lotteryPlayBonusStandardManagementPageActions,
	notifyHandlingActions,
} from '../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { PlayClassIdEnums } from '../../../../lib/enums';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import { RouteKeyEnums } from '../../../../routes';
import EditModal from './edit-modal';
import { getFilteredPlaysData, } from './utils';

const { LOTTERY_ODDS_STANDARD, } = RouteKeyEnums;
const { STANDARD, } = PlayClassIdEnums;
const { Message } = PageModal;
const {
	updateLotteryPlaysBonusAction,
} = lotteryPlaysActions;
const {
	initLotteryPlayBonusStandardManagementPageAction,
	fetchLotteryPlayBonusStandardManagementPagePlaysAction,
} = lotteryPlayBonusStandardManagementPageActions;
const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const {
	notifyHandlingAction,
} = notifyHandlingActions;
const {
	successNotifications,
	errorNotifications,
} = notifications;
const {
	Success,
} = successNotifications;
const {
	GeneralError
} = errorNotifications;

const propTypes = {
	playsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		status: PropTypes.string,
		updatedAt: PropTypes.string,
		bonus: PropTypes.number,
		lottery: PropTypes.object
	})),
	platformData: PropTypes.shape({
		bonus: PropTypes.object.isRequired,
	}).isRequired,
	lotteryTabsData: PropTypes.array,
	loadingStatus: PropTypes.oneOf([ NONE, SUCCESS, FAILED, LOADING,]),
	playsLoadingStatus: PropTypes.oneOf([ NONE, SUCCESS, FAILED, LOADING,]),
	initLotteryPlayBonusStandardManagementPageAction: PropTypes.func,
	fetchLotteryPlayBonusStandardManagementPagePlaysAction: PropTypes.func,
	lotteryId: PropTypes.string,
	lotteryClassId: PropTypes.string,
	onUpdate: PropTypes.func.isRequired,
	updateLotteryPlaysBonusAction: PropTypes.func.isRequired,
	updateLotteryPlaysBonusLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	updateLotteryPlaysBonusLoadingStatusMessage: PropTypes.string.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
	filterQuery: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
};

class LotteryOddsStandardEditPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			plays: [],
			updatedPlays: [],
			selectedTableRows: [],
			isBatchEditBonusModalVisible: false,
			isConfirmMessageVisible: false,
			batchEditBonus: null,
		};

		this.platformBonus = props.platformData.bonus.max;

		this._handleChangeInputNumber = this._handleChangeInputNumber.bind(this);
		this._renderEditingBonus = this._renderEditingBonus.bind(this);
		this._renderPercentItem = this._renderPercentItem.bind(this);
		this._renderTitleCheckBox = this._renderTitleCheckBox.bind(this);
		this._handleClickTitleCheckBox = this._handleClickTitleCheckBox.bind(this);
		this._handleClickContentCheckBox = this._handleClickContentCheckBox.bind(this);
		this._renderRowSelectedHint = this._renderRowSelectedHint.bind(this);
		this._handleOpenBatchEditBonusModal = this._handleOpenBatchEditBonusModal.bind(this);
		this._handleCloseBatchEditBonusModal = this._handleCloseBatchEditBonusModal.bind(this);
		this._handleSubmitBatchEdit = this._handleSubmitBatchEdit.bind(this);
		this._handleSubmitSave = this._handleSubmitSave.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._renderBatchEditBonusButton = this._renderBatchEditBonusButton.bind(this);
		this._handleNavigate = this._handleNavigate.bind(this);
	}

	_handleChangeInputNumber(number, record, dataIndex) {
		const { plays: prevPlays, } = this.state;
		const plays = prevPlays.map((item, index) => {
			if (index === dataIndex) {
				return Object.assign({}, item, {
					bonus: number,
					isDirty: true,
				});
			}
			return Object.assign({}, item);
		});

		this.setState({
			plays,
		});
	}

	_renderEditingBonus(bonus = null, record = {}, index,) {
		const {
			_renderPercentItem,
			_handleChangeInputNumber,
			platformBonus,
		} = this;

		let percentItem;
		
		if (bonus) {
			percentItem = _renderPercentItem(platformBonus, bonus);
		} else {
			percentItem = <span className='prize-number-percent'></span>;
		}

		return (
			<div className={`${PREFIX_CLASS}__edit-page__bonus`} >
				<InputNumber
					value={isNaN(bonus) ? '' : bonus}
					onChange={(number) => _handleChangeInputNumber(number, record, index)}
				/>
				{percentItem}
			</div>
		);
	}

	_renderPercentItem(platformBonus, bonus) {
		const bonusPercent = (bonus - platformBonus) / 20;
		const symbol = bonusPercent > 0 ? '+' : '';

		return (
			<span
				className={cx(
					'prize-number-percent',
					{
						[`prize-number-percent--nagetive`]: bonusPercent < 0,
						[`prize-number-percent--positive`]: bonusPercent > 0,
					}
				)}
			>
				({symbol}{Math.round(bonusPercent)}%)
			</span>
		);
	}

	_renderTitleCheckBox() {
		const { plays, selectedTableRows } = this.state;
		const { _handleClickTitleCheckBox } = this;
		const numberOfData = plays.length;
		const numberOfSelected = selectedTableRows.length;
		const isSelectedAll = (numberOfSelected === numberOfData);

		return (
			<React.Fragment>
				<CheckBox
					value={isSelectedAll}
					onChange={_handleClickTitleCheckBox}
				/>
			</React.Fragment>
		);
	}

	_renderBatchEditBonusButton() {
		const { selectedTableRows } = this.state;
		const isDisabledButton = selectedTableRows.length <= 0;

		return (
			<Button
				disabled={isDisabledButton}
				outline={Button.OutlineEnums.HOLLOW}
				onClick={this._handleOpenBatchEditBonusModal}
			>
			批量修改
			</Button>
		);
	}
	_handleClickTitleCheckBox() {
		const { plays, selectedTableRows, } = this.state;
		const numberOfData = plays.length;
		const isSelectedAll = (selectedTableRows.length === numberOfData);
		const updatedSelectedTableRows = isSelectedAll ? [] : plays.map((item, index) => index);

		this.setState({ selectedTableRows: updatedSelectedTableRows, });
	}

	_handleClickContentCheckBox(index) {
		const { selectedTableRows } = this.state;
		const isSelected = (selectedTableRows.indexOf(index) !== -1);

		let updatedSelectedTableRows;

		if (isSelected) {
			updatedSelectedTableRows = selectedTableRows.filter(key => key !== index);
		} else {
			updatedSelectedTableRows = [...selectedTableRows, index];
		}
		this.setState({ selectedTableRows: updatedSelectedTableRows, });
	}

	_renderRowSelectedHint() {
		const { selectedTableRows } = this.state;
		const numberOfnumberOfSelected = (
			<span className="selected-hint__number">
				{selectedTableRows.length}
			</span>
		);

		return (
			<div className="selected-hint">
				<Icon
					type={ Icon.IconTypeEnums.INFO_FILL}
					color={Icon.ColorEnums.PRIMARY}
					size={Icon.SizeEnums.SMALL}
				/>
				已选择{numberOfnumberOfSelected}项
			</div>
		);
	}

	_handleOpenBatchEditBonusModal() {
		this.setState({ isBatchEditBonusModalVisible: true, });
	}

	_handleCloseBatchEditBonusModal() {
		this.setState({ isBatchEditBonusModalVisible: false, });
	}

	_handleSubmitBatchEdit(bonus) {
		const {
			lotteryId,
			updateLotteryPlaysBonusAction,
		} = this.props;
		const {
			plays: prevPlays,
			selectedTableRows,
		} = this.state;

		const plays = prevPlays.map((item, index) => {
			if (selectedTableRows.indexOf(index) !== -1) {
				return Object.assign({}, item, {
					bonus,
					isDirty: true,
				});
			} else {
				return Object.assign({}, item);
			}
		});

		const updatedPlays = getPlaysByFilterIsDirty(plays);

		updateLotteryPlaysBonusAction(lotteryId, updatedPlays);
		this.setState({
			plays,
			selectedTableRows: []
		});
	}
	_handleSubmitSave() {
		const {
			lotteryId,
			updateLotteryPlaysBonusAction,
			notifyHandlingAction,
		} = this.props;
		const {
			plays,
		} = this.state;

		const updatedPlays = getPlaysByFilterIsDirty(plays);
		const hasUpdatedPlays = !!updatedPlays.length;

		if (hasUpdatedPlays) {
			updateLotteryPlaysBonusAction(lotteryId, updatedPlays);
		} else {
			notifyHandlingAction(new GeneralError('无修改资料'));
		}

		this.setState({ isConfirmMessageVisible: false });
	}

	_handleClickCancel() {
		this.setState({ isConfirmMessageVisible: false });
	}

	_handleNavigate() {
		const {
			onNavigate,
			filterQuery,
			lotteryClassId,
			lotteryId,
		} = this.props;

		onNavigate(LOTTERY_ODDS_STANDARD, {
			passProps: {
				filterQuery,
				passedLotteryClassId: parseInt(lotteryClassId),
				passedLotteryId: parseInt(lotteryId),
			}
		});
	}

	render() {
		const {
			loadingStatus,
			playsLoadingStatus,
		} = this.props;
		const {
			platformBonus,
			_renderTitleCheckBox,
			_renderEditingBonus,
			_handleClickContentCheckBox,
			_renderRowSelectedHint,
			_handleCloseBatchEditBonusModal,
			_handleSubmitBatchEdit,
			_handleSubmitSave,
			_handleClickCancel,
			_renderBatchEditBonusButton,
			_handleNavigate,
		} = this;

		const {
			selectedTableRows,
			isBatchEditBonusModalVisible,
			isConfirmMessageVisible,
			batchEditBonus,
			plays,
		} = this.state;
		const isLoading = (
			loadingStatus === LOADING ||
			playsLoadingStatus === LOADING);

		return (
			<div className={`${PREFIX_CLASS}__edit-page`}>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={_handleNavigate}
				>
					回到上一页
				</Button>
				<PageBlock>
					<HeaderButtonBar
						left={(
							<span>
							*计算方式依照平台最高奖金号: {platformBonus}
							</span>
						)}
						right={(
							<React.Fragment>
								{_renderBatchEditBonusButton()}
								<Button
									color={Button.ColorEnums.BRIGHTBLUE500}
									onClick={() =>
										this.setState({
											isConfirmMessageVisible: true,
										})
									}
								>
									储存
								</Button>
							</React.Fragment>
						)}
					/>
					{selectedTableRows.length ? _renderRowSelectedHint(): null}
					<Table
						isLoading={isLoading}
						rowKey={(record,index) => index}
						columns={[{
							title: '玩法',
							dataIndex: '',
							key: 'play',
							width: 160,
							render: (play) => {
								const playCondition = play.playCondition || {};
								const playConditionName = playCondition.name || '';
								const playName = play.name || '';

								return <div>{playConditionName + playName}</div>;
							},
						},{
							title: '分类',
							dataIndex: 'playCondition.name',
						},{
							title: '奖项',
							dataIndex: 'award.name',
						},{
							title: '奖金号',
							dataIndex: 'bonus',
							render: (value, record, index) => _renderEditingBonus(value, record, index),
						},{
							title: _renderTitleCheckBox,
							dataIndex: 'isRowSelected',
							render: (value, record, index) => {
								const isSelected = selectedTableRows.indexOf(index) !== -1;

								return (
									<CheckBox
										value={isSelected}
										onChange={() => _handleClickContentCheckBox(index)}
									/>
								);
							}
						},]}
						dataSource={plays}
					/>
				</PageBlock>
				<EditModal
					isVisible={isBatchEditBonusModalVisible}
					onCloseModal={_handleCloseBatchEditBonusModal}
					onClickOk={_handleSubmitBatchEdit}
					title={"批量修改"}
					label={"奖金号"}
					placeholder={"请输入奖金号"}
					input={batchEditBonus}
					onChange={batchEditBonus => this.setState({ batchEditBonus, })}
				/>
				<Message
					title="提示"
					message="确定變更項目？"
					visible={isConfirmMessageVisible}
					modalSize="small"
					onClickOk={_handleSubmitSave}
					onClickCancel={_handleClickCancel}
				/>
			</div>
		);
	}
	componentDidMount() {
		this.props.initLotteryPlayBonusStandardManagementPageAction();
	}
	componentDidUpdate(prevProps) {
		const {
			playsLoadingStatus,
			loadingStatus,
			playsData,
			lotteryId,
			fetchLotteryPlayBonusStandardManagementPagePlaysAction,
			onUpdate,
			updateLotteryPlaysBonusLoadingStatus,
			notifyHandlingAction,
			filterQuery,
		} = this.props;

		if (prevProps.loadingStatus === LOADING && loadingStatus === SUCCESS) {
			fetchLotteryPlayBonusStandardManagementPagePlaysAction(lotteryId, STANDARD);
		}
		if (prevProps.playsLoadingStatus === LOADING && playsLoadingStatus === SUCCESS) {
			this.setState({
				plays: playsData,
				updatedPlays: getFilteredPlaysData(filterQuery, playsData),
			});
			const lottery = playsData[0] ? playsData[0].lottery : {};
			const lotteryName = lottery.name || '';

			onUpdate({
				lotteryName
			});
		}

		if (prevProps.updateLotteryPlaysBonusLoadingStatus === LOADING
		&& updateLotteryPlaysBonusLoadingStatus === SUCCESS) {
			notifyHandlingAction(new Success('更新奖金号成功'));
			fetchLotteryPlayBonusStandardManagementPagePlaysAction(lotteryId, STANDARD);
		}
	}
}

LotteryOddsStandardEditPage.propTypes = propTypes;

function mapStateToProp(state) {
	return {
		lotteryTabsData: state.lotteryPlayBonusStandardManagementPage.get('lotteryTabsData').toArray(),
		loadingStatus: state.lotteryPlayBonusStandardManagementPage.get('loadingStatus'),
		playsLoadingStatus: state.lotteryPlayBonusStandardManagementPage.get('playsLoadingStatus'),
		playsData: state.lotteryPlayBonusStandardManagementPage.get('plays').toArray(),
		updateLotteryPlaysBonusLoadingStatus: state.lotteryPlays.get('updateLotteryPlaysBonusLoadingStatus'),
		updateLotteryPlaysBonusLoadingStatusMessage: state.lotteryPlays.get('updateLotteryPlaysBonusLoadingStatusMessage'),
		platformData: state.platform.get('data').toObject(),
	};
}
function mapDispatchToProp(dispatch) {
	return {
		initLotteryPlayBonusStandardManagementPageAction: () => dispatch(initLotteryPlayBonusStandardManagementPageAction()),
		fetchLotteryPlayBonusStandardManagementPagePlaysAction: (lotteryId, playClassId) => dispatch(fetchLotteryPlayBonusStandardManagementPagePlaysAction(lotteryId, playClassId)),
		updateLotteryPlaysBonusAction: (lotteryId, plays) => dispatch(updateLotteryPlaysBonusAction(lotteryId, plays)),
		notifyHandlingAction: (...args) => dispatch(notifyHandlingAction(...args)),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'updateLotteryPlaysBonusLoadingStatus',
			loadingStatusMessage: 'updateLotteryPlaysBonusLoadingStatusMessage',
		},
	],
	LotteryOddsStandardEditPage
));

function getPlaysByFilterIsDirty(plays = []) {
	const playsFilterByIsDirty = plays.filter(play => play.isDirty) || [];

	const nextPlays = playsFilterByIsDirty.map(play => {
		return Object.assign({}, {
			id: play.id,
			award: play.award.name,
			bonus: play.bonus,
		});
	});

	return nextPlays;
}
