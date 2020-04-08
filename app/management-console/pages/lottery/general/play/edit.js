import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Button,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PageModal from 'management-console/components/page-modal';
import { connect } from '../../../../../ljit-store-connecter';
import {
	lotteryPlaysActions,
	lotteryPlayManagementPageActions,
} from '../../../../controller';
import LotteryPlayTable from './lottery-play-table';
import { LoadingStatusEnum } from '../../../../../lib/enums';
import { PlayClassIdEnums } from '../../../../lib/enums';
import { PREFIX_CLASS } from './index';
import { playsPropType, filtersPropType, searchPlays, } from './utils';
import { RouteKeyEnums } from '../../../../routes';

const {
	LOTTERY_GENERAL_PLAY,
} = RouteKeyEnums;
const { STANDARD, } = PlayClassIdEnums;
const { Message } = PageModal;
const {
	updateLotteryPlaysStatusAction,
} = lotteryPlaysActions;
const {
	fetchLotteryPlayManagementPagePlaysAction,
} = lotteryPlayManagementPageActions;
const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;

const propTypes = {
	playsData: playsPropType,
	filters: filtersPropType,
	lotteryClassId: PropTypes.string,
	lotteryId: PropTypes.string,
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	updateLotteryPlaysStatusLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	updateLotteryPlaysStatusAction: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired,
	fetchLotteryPlayManagementPagePlaysAction: PropTypes.func.isRequired,
};

class LotteryGeneralPlayEditPage extends Component {
	constructor(props) {
		super();
		const { playsData, filters, } = props;

		this.state = {
			tableData: searchPlays(playsData, filters),
			isEditing: false,
			selectedTableRows: [],
			isConfirmMessageVisible: false,
		};
		this._handleSubmitSave = this._handleSubmitSave.bind(this);
		this._handleClickCancel = this._handleClickCancel.bind(this);
		this._handleClickTitleCheckBox = this._handleClickTitleCheckBox.bind(this);
		this._handleClickContentCheckBox = this._handleClickContentCheckBox.bind(this);
		this._renderCheckBoxStatus = this._renderCheckBoxStatus.bind(this);
	}
	_handleSubmitSave() {
		const { updateLotteryPlaysStatusAction, lotteryId, } = this.props;
		const { tableData, selectedTableRows, } = this.state;

		let mutatedRows = [];

		tableData.forEach((item) => {
			const isSelected = selectedTableRows.indexOf(item.id) !== -1;

			if (item.status === 'online') {
				if (!isSelected) {
					mutatedRows.push({
						id: item.id,
						status: 'offline',
					});
				}
			}
			if (item.status === 'offline') {
				if (isSelected) {
					mutatedRows.push({
						id: item.id,
						status: 'online',
					});
				}
			}
		});

		updateLotteryPlaysStatusAction({
			lotteryId,
			plays: mutatedRows,
		});
		this.setState({
			isConfirmMessageVisible: false,
		});
	}
	_handleClickCancel() {
		const { tableData, } = this.state;

		this.setState({
			isConfirmMessageVisible: false,
		});
		this._renderCheckBoxStatus(tableData);
	}
	_handleClickTitleCheckBox() {
		const { tableData, selectedTableRows, } = this.state;
		const numberOfData = tableData.length;
		const isSelectedAll = (selectedTableRows.length === numberOfData);
		const updatedSelectedTableRows = isSelectedAll ? [] : tableData.map((item) => item.id);

		this.setState({ selectedTableRows: updatedSelectedTableRows, });
	}

	_handleClickContentCheckBox(selectedTableRows) {
		this.setState({ selectedTableRows, });
	}

	_renderCheckBoxStatus(tableData) {
		let onlineRows = [];

		tableData.forEach((item) => {
			if (item.status === 'online') {
				onlineRows.push(item.id);
			}
		});
		this.setState({
			selectedTableRows: onlineRows,
		});
	}
	render() {
		const {
			loadingStatus,
			updateLotteryPlaysStatusLoadingStatus,
		} = this.props;
		const {
			isConfirmMessageVisible,
			tableData,
			selectedTableRows,
		} = this.state;
		const {
			_handleClickTitleCheckBox,
			_handleClickContentCheckBox,
			_handleSubmitSave,
			_handleClickCancel,
		} = this;
		const {
			lotteryClassId,
			lotteryId,
			filters,
			onNavigate,
		} = this.props;

		return (
			<div className={`${PREFIX_CLASS}__edit`}>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={() => {
						onNavigate(LOTTERY_GENERAL_PLAY, {
							passProps: {
								lotteryClassId,
								lotteryId,
								filters,
							}
						});
					}}
				>
					回到上一页
				</Button>
				<PageBlock>
					<HeaderButtonBar
						right={(
							<React.Fragment>
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
					<LotteryPlayTable
						isLoading={loadingStatus === LOADING || updateLotteryPlaysStatusLoadingStatus === LOADING}
						data={tableData}
						onClickTitleCheckBox={_handleClickTitleCheckBox}
						onClickContentCheckBox={_handleClickContentCheckBox}
						isEditing
						selectedTableRows={selectedTableRows}
					/>
					<Message
						title="提示"
						message="确定變更項目？"
						visible={isConfirmMessageVisible}
						modalSize="small"
						onClickOk={_handleSubmitSave}
						onClickCancel={_handleClickCancel}
					/>
				</PageBlock>
			</div>
		);
	}
	componentDidMount() {
		const {
			lotteryId,
			fetchLotteryPlayManagementPagePlaysAction,
		} = this.props;

		fetchLotteryPlayManagementPagePlaysAction(lotteryId, STANDARD);
	}

	componentDidUpdate(prevProps) {
		const {
			_renderCheckBoxStatus,
		} = this;
		const {
			loadingStatus,
			updateLotteryPlaysStatusLoadingStatus,
			fetchLotteryPlayManagementPagePlaysAction,
			playsData = [],
			filters,
			onUpdate,
			lotteryId,
		} = this.props;

		if (prevProps.loadingStatus === LOADING && loadingStatus === SUCCESS) {
			const tableData = searchPlays(playsData, filters);
			const play = tableData[0] || {};
			const lottery = play.lottery || {};
			const lotteryName = lottery.name || '';

			onUpdate({
				lotteryName,
			});
			this.setState({ tableData, });
			_renderCheckBoxStatus(tableData);
		}
		if (prevProps.updateLotteryPlaysStatusLoadingStatus === LOADING && updateLotteryPlaysStatusLoadingStatus === SUCCESS) {
			fetchLotteryPlayManagementPagePlaysAction(lotteryId, STANDARD);
		}
	}
}

LotteryGeneralPlayEditPage.propTypes = propTypes;

function mapStateToProp(state) {
	return {
		playsData: state.lotteryPlays.get('plays').toArray(),
		loadingStatus: state.lotteryPlayManagementPage.get('playsLoadingStatus'),
		updateLotteryPlaysStatusLoadingStatus: state.lotteryPlays.get('updateLotteryPlaysStatusLoadingStatus'),
	};
}
function mapDispatchToProp(dispatch) {
	return {
		updateLotteryPlaysStatusAction: (lotteryId, plays) => dispatch(updateLotteryPlaysStatusAction(lotteryId, plays)),
		fetchLotteryPlayManagementPagePlaysAction: (lotteryId, playClassId) => dispatch(fetchLotteryPlayManagementPagePlaysAction(lotteryId, playClassId)),
	};
}

export default connect(mapStateToProp, mapDispatchToProp)(LotteryGeneralPlayEditPage);
