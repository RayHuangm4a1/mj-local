import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
	InputSearch,
	Switch,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import {
	lotteryClassesAndLotteriesActions,
	lotteryClassManagementPageActions,
} from '../../../../controller';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import { LoadingStatusEnum, TagsCodeStatusEnums } from '../../../../lib/enums';
import PageBlock from '../../../../components/page-block';
import LotteriesPageModal from './lotteries-page-modal';
import './style.styl';

const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;

const {
	HOT,
} = TagsCodeStatusEnums;

const OnlineStatusEnums = {
	ONLINE: 'online',
	OFFLINE: 'offline',
};

const {
	ONLINE,
	OFFLINE,
} = OnlineStatusEnums;

const {
	LOADING,
	SUCCESS,
} = LoadingStatusEnum;
const valuesOfLoadingStatusEnum = Object.values(LoadingStatusEnum);

const {
	updateLotteryClassStatusAction,
	updateLotteriesOrderingAndHotTagAction,
} = lotteryClassesAndLotteriesActions;

const {
	initLotteryClassManagementPageAction,
} = lotteryClassManagementPageActions;

const propTypes = {
	notifyHandlingAction: PropTypes.func.isRequired,
	initLotteryClassManagementPageAction: PropTypes.func.isRequired,
	updateLotteryClassStatusAction: PropTypes.func.isRequired,
	updateLotteriesOrderingAndHotTagAction: PropTypes.func.isRequired,
	loadingStatus: PropTypes.oneOf(valuesOfLoadingStatusEnum),
	updateLotteryClassStatusLoadingStatus: PropTypes.oneOf(valuesOfLoadingStatusEnum),
	updateLotteriesOrderingAndHotTagLoadingStatus: PropTypes.oneOf(valuesOfLoadingStatusEnum),
	lotteryClassesData: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
		createdAt: PropTypes.string,
		updateAt: PropTypes.string,
		status: PropTypes.oneOf(Object.values(OnlineStatusEnums)),
		lotteries: PropTypes.arrayOf(PropTypes.shape({ _id: PropTypes.string, })),
		platform: PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
			code: PropTypes.string,
		}),
	})),
	lotteriesData: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		id: PropTypes.number,
		name: PropTypes.string,
		code: PropTypes.string,
		ordering: PropTypes.number,
		status: PropTypes.string,
		createdAt: PropTypes.string,
		updatedAt: PropTypes.string,
		numOfIssues: PropTypes.number,
		platform: PropTypes.shape({
			code: PropTypes.string,
			name: PropTypes.string,
			_id: PropTypes.string,
		}),
		lotteryClass: PropTypes.shape({
			code: PropTypes.string,
			name: PropTypes.string,
			_id: PropTypes.string,
			id: PropTypes.number,
			status: PropTypes.oneOf(Object.values(OnlineStatusEnums)),
		}),
		playClasses:PropTypes.arrayOf(PropTypes.shape({
			code: PropTypes.string,
			name: PropTypes.string,
			id: PropTypes.number,
		})),
		tags: PropTypes.arrayOf(PropTypes.shape({
			code: PropTypes.string,
			name: PropTypes.string,
			_id: PropTypes.string,
		})),
	})),
};

const defaultProps = {};

const prefixClass = 'lottery-general-class-category';

class LotteryGeneralClassPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLotteriesPageModalVisible: false,
			lotteryClassSearchInputValue: '',
			lotteryClassId: null,
		};
		this._handleShowModal = this._handleShowModal.bind(this);
		this._handleHideModal = this._handleHideModal.bind(this);
		this._handleClickOk = this._handleClickOk.bind(this);
		this._handleChangeInputSearch = this._handleChangeInputSearch.bind(this);
		this._handleChangeOnlineSwitch = this._handleChangeOnlineSwitch.bind(this);
		this._renderLotteryClassTable = this._renderLotteryClassTable.bind(this);
	}
	_handleShowModal(lotteryClassId) {
		this.setState({
			isLotteriesPageModalVisible: true,
			lotteryClassId,
		});
	}
	_handleHideModal() {
		this.setState({
			isLotteriesPageModalVisible: false,
			lotteryClassId: null,
		});
	}
	_handleClickOk(value) {
		const {
			props,
			state,
			_handleHideModal,
		} = this;
		const lotteriesOrderingAndHotTagData = getUpdateLotteriesOrderingAndHotTagData(value);

		props.updateLotteriesOrderingAndHotTagAction({
			lotteryClassId: state.lotteryClassId,
			lotteriesOrderingAndHotTagData,
		});

		_handleHideModal();
	}
	_handleChangeInputSearch(event) {
		this.setState({ lotteryClassSearchInputValue: event.target.value });
	}
	_handleChangeOnlineSwitch(lotteryClassId, value) {
		const status = value ? ONLINE : OFFLINE;

		this.props.updateLotteryClassStatusAction({
			lotteryClassId,
			status,
		});
	}
	_renderLotteryClassTable() {
		const {
			props,
			state,
			_handleChangeOnlineSwitch,
			_handleShowModal,
		} = this;
		const { lotteryClassSearchInputValue, } = state;
		const {
			lotteryClassesData,
			loadingStatus,
			updateLotteryClassStatusLoadingStatus,
			updateLotteriesOrderingAndHotTagLoadingStatus,
		} = props;
		const lotteryClasses = lotteryClassesData
			.filter(lotteryClass => lotteryClass.name.indexOf(lotteryClassSearchInputValue) !== -1)
			.map((lotteryClass) => ({
				...lotteryClass,
				key: lotteryClass.id,
				amount: lotteryClass.lotteries.length,
			}));
		const isLoading = loadingStatus === LOADING ||
			updateLotteryClassStatusLoadingStatus === LOADING ||
			updateLotteriesOrderingAndHotTagLoadingStatus === LOADING;

		const lotteryClassTableColumns = [{
			title: '分类',
			dataIndex: 'name',
		},{
			title: '彩种数',
			dataIndex: 'amount',
		},{
			title: '上线状态',
			dataIndex: 'status',
			render: (data, record) => {
				const checked = record.status === ONLINE;

				return (
					<Switch
						checked={checked}
						id={record.id}
						onChange={(value) => {
							_handleChangeOnlineSwitch(record.id, value);
						}}
					/>
				);
			},
		},{
			title: '操作',
			dataIndex: '',
			render: (data, record) => (
				<TextButton
					onClick={() => _handleShowModal(record.id)}
					text={<span>修改</span>}
				/>
			)
		},];

		return (
			<div className={`${prefixClass}__table`}>
				<Table
					isLoading={isLoading}
					columns={lotteryClassTableColumns}
					dataSource={lotteryClasses}
				/>
			</div>
		);
	}

	render() {
		const {
			props,
			state,
			_handleChangeInputSearch,
			_renderLotteryClassTable,
			_handleHideModal,
			_handleClickOk,
		} = this;
		const {
			isLotteriesPageModalVisible,
			lotteryClassSearchInputValue,
			lotteryClassId,
		} = state;
		const { lotteriesData, } = props;
		const lotteries = lotteriesData.filter((item) => item.lotteryClass.id === lotteryClassId);

		return (
			<PageBlock>
				<div className={prefixClass}>
					<div className={`${prefixClass}__input-search`}>
						<InputSearch
							placeholder="请输入"
							onChange={_handleChangeInputSearch}
							value={lotteryClassSearchInputValue}
						/>
					</div>
					{_renderLotteryClassTable()}
					<LotteriesPageModal
						isVisible={isLotteriesPageModalVisible}
						lotteries={lotteries}
						lotteryClassId={lotteryClassId}
						onClickCancel={_handleHideModal}
						onClickOk={_handleClickOk}
					/>
				</div>
			</PageBlock>
		);
	}
	componentDidMount() {
		this.props.initLotteryClassManagementPageAction();
	}
	componentDidUpdate(prevProps) {
		const {
			notifyHandlingAction,
			updateLotteriesOrderingAndHotTagLoadingStatus,
			updateLotteryClassStatusLoadingStatus,
			initLotteryClassManagementPageAction,
		} = this.props;
		const isLotteryClassUpdatedSuccess = prevProps.updateLotteryClassStatusLoadingStatus === LOADING &&
			updateLotteryClassStatusLoadingStatus === SUCCESS;
		const isLotteriesUpdatedSuccess = prevProps.updateLotteriesOrderingAndHotTagLoadingStatus === LOADING &&
			updateLotteriesOrderingAndHotTagLoadingStatus === SUCCESS;
		const shouldRefetchLotteryClassAndLotteries = isLotteryClassUpdatedSuccess || isLotteriesUpdatedSuccess;

		if (isLotteryClassUpdatedSuccess) {
			notifyHandlingAction(new Success('成功修改彩种状态'));
		} else if (isLotteriesUpdatedSuccess) {
			notifyHandlingAction(new Success('成功修改彩票状态'));
		}
		if (shouldRefetchLotteryClassAndLotteries) {
			initLotteryClassManagementPageAction();
		}
	}
}

LotteryGeneralClassPage.propTypes = propTypes;
LotteryGeneralClassPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		lotteryClassesData: state.lotteryClassesAndLotteries.get('lotteryClasses').toArray(),
		lotteriesData: state.lotteryClassesAndLotteries.get('lotteries').toArray(),
		loadingStatus: state.lotteryClassManagementPage.get('loadingStatus'),
		loadingStatusMessage: state.lotteryClassManagementPage.get('loadingStatusMessage'),
		updateLotteryClassStatusLoadingStatus: state.lotteryClassesAndLotteries.get('updateLotteryClassStatusLoadingStatus'),
		updateLotteryClassStatusLoadingStatusMessage: state.lotteryClassesAndLotteries.get('updateLotteryClassStatusLoadingStatusMessage'),
		updateLotteriesOrderingAndHotTagLoadingStatus: state.lotteryClassesAndLotteries.get('updateLotteriesOrderingAndHotTagLoadingStatus'),
		updateLotteriesOrderingAndHotTagLoadingStatusMessage: state.lotteryClassesAndLotteries.get('updateLotteriesOrderingAndHotTagLoadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		initLotteryClassManagementPageAction: () => dispatch(initLotteryClassManagementPageAction()),
		updateLotteryClassStatusAction: (attributes) => dispatch(updateLotteryClassStatusAction(attributes)),
		updateLotteriesOrderingAndHotTagAction: (attributes) => dispatch(updateLotteriesOrderingAndHotTagAction(attributes)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
		{
			loadingStatus: 'updateLotteryClassStatusLoadingStatus',
			loadingStatusMessage: 'updateLotteryClassStatusLoadingStatusMessage',
		},
		{
			loadingStatus: 'updateLotteriesOrderingAndHotTagLoadingStatus',
			loadingStatusMessage: 'updateLotteriesOrderingAndHotTagLoadingStatusMessage',
		},
	],
	LotteryGeneralClassPage
));

function getUpdateLotteriesOrderingAndHotTagData(lotteries) {
	return lotteries.map((lottery) => {
		const hotTag = lottery.tags.filter(tag => tag.code === HOT);

		return {
			id: lottery.id,
			ordering: lottery.ordering,
			tags: hotTag.length > 0 ? [HOT] : [],
		};
	});
}
