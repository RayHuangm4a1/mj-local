import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'ljit-store-connecter';
import CardTabs from '../../components/card-tabs';
import BettingBasket from './betting-basket';
import BettingRecord from './betting-record';
import ClientMessageModal from '../../components/client-message-modal';
import BettingRecordDetailModalFeature from '../../features/betting-record-detail-modal';
import TraceRecordDetailModalFeature from '../../features/trace-record-detail-modal';
import {
	bettingActions,
	bettingRecordActions,
	traceRecordActions,
} from '../../controller';
import { connectObservable } from 'ljit-observable/react-observable';
import { EventEnum, } from '../../lib/enums';
import { RouteKeyEnums } from '../../route-modals/member-center/routes';
import { bettingRecordPropType, traceRecordDataPropType, } from '../../lib/betting-utils';
import './style.styl';

const {
	clearBettingAction,
	clearBettingsAction,
} = bettingActions;
const {
	discardBettingRecordAction,
} = bettingRecordActions;
const {
	setSelectedTraceRecordAction,
} = traceRecordActions;

const tabKeyEnums = {
	BETTING_BASKET: 'betting-basket',
	BETTING_RECORD: 'betting-record',
	TRACE_RECORD: 'trace-record',
};
const { BETTING_BASKET, } = tabKeyEnums;

const propTypes = {
	className: PropTypes.string,
	bettingsData: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.shape({
			_id: PropTypes.string,
			id:  PropTypes.number,
			lottery: PropTypes.string,
			name: PropTypes.string,
			bonus:  PropTypes.number,
		}),
		name: PropTypes.string,
		lotteryName: PropTypes.string,
		betcontent: PropTypes.string,
		multiple: PropTypes.number,
		amountPerBet: PropTypes.number,
		count: PropTypes.number,
		amount: PropTypes.number,
		rebate: PropTypes.number,
	})),
	latestBettingRecordsData: PropTypes.arrayOf(bettingRecordPropType),
	latestTraceRecordsData: PropTypes.arrayOf(traceRecordDataPropType),
	clearBettingAction: PropTypes.func.isRequired,
	clearBettingsAction: PropTypes.func.isRequired,
	discardBettingRecordAction: PropTypes.func.isRequired,
	setSelectedTraceRecordAction: PropTypes.func.isRequired,
	notifyShowMemberCenter: PropTypes.func.isRequired,
};

const PREFIX_CLASS = 'betting-basket-record-tab';

const defaultProps = {
	bettingsData: [],
	latestBettingRecordsData: [],
};

class StandardBettingRecordsTab extends Component {
	constructor() {
		super();
		this.state = {
			tabKey: BETTING_BASKET,
			isDiscardMessageVisible: false,
			bettingRecord: {},
			isBettingRecordDetailModalVisible: false,
			isTraceRecordDetailModalVisible: false,
		};

		this._handleDiscardMessageShow = this._handleDiscardMessageShow.bind(this);
		this._handleClearBettings = this._handleClearBettings.bind(this);
		this._handleDeleteBetting = this._handleDeleteBetting.bind(this);
		this._handleClickBettingRecord = this._handleClickBettingRecord.bind(this);
		this._handleDiscardBetting = this._handleDiscardBetting.bind(this);
		this._handleClickTraceRecord = this._handleClickTraceRecord.bind(this);
		this._handleViewAllRecords = this._handleViewAllRecords.bind(this);
	}
	_handleViewAllRecords() {
		const { notifyShowMemberCenter } = this.props;

		notifyShowMemberCenter(RouteKeyEnums.MEMBER_BETTING_RECORDS);
	}
	_handleDiscardMessageShow(bettingRecord) {
		this.setState({
			isDiscardMessageVisible: true,
			bettingRecord,
		});
	}
	_handleClearBettings() {
		this.props.clearBettingsAction();
	}
	_handleDeleteBetting(index) {
		this.props.clearBettingAction(index);
	}
	_handleClickBettingRecord(bettingRecord) {
		this.setState({
			bettingRecord,
			isBettingRecordDetailModalVisible: true,
		});
	}
	_handleDiscardBetting() {
		const { bettingRecord, } = this.state;
		const { discardBettingRecordAction, } = this.props;

		discardBettingRecordAction(bettingRecord.id);
		this.setState({
			isDiscardMessageVisible: false,
			bettingRecord: {},
		});
	}
	_handleClickTraceRecord(traceRecord) {
		const { setSelectedTraceRecordAction, } = this.props;

		setSelectedTraceRecordAction(traceRecord);
		this.setState({
			isTraceRecordDetailModalVisible: true,
		});
	}

	render() {
		const {
			className,
			bettingsData,
			latestBettingRecordsData,
			latestTraceRecordsData,
		} = this.props;
		const {
			tabKey,
			isDiscardMessageVisible,
			isBettingRecordDetailModalVisible,
			isTraceRecordDetailModalVisible,
			bettingRecord,
		} = this.state;
		const {
			_handleDiscardMessageShow,
			_handleClearBettings,
			_handleDeleteBetting,
			_handleClickBettingRecord,
			_handleDiscardBetting,
			_handleClickTraceRecord,
			_handleViewAllRecords,
		} = this;

		return (
			<Fragment>
				{/* {TODO update latestBettingRecordsData and latestTraceRecordsData while change tab} */}
				<CardTabs
					className={cx(`${PREFIX_CLASS}`, className)}
					activeKey={tabKey}
					onChange={tabKey => this.setState({ tabKey, })}
				>
					<CardTabs.TabPane
						key="betting-basket"
						tab="号码篮"
					>
						<BettingBasket
							bettings={bettingsData}
							onClearBettings={_handleClearBettings}
							onDeleteBetting={_handleDeleteBetting}
						/>
					</CardTabs.TabPane>
					<CardTabs.TabPane
						key="betting-record"
						tab={<span>投注记录</span>}
					>
						<BettingRecord.Betting
							bettingRecords={latestBettingRecordsData}
							onClickBettingRecord={_handleClickBettingRecord}
							onDiscardBettingRecord={_handleDiscardMessageShow}
							onCheckAllBettingRecords={_handleViewAllRecords}
						/>
					</CardTabs.TabPane>
					<CardTabs.TabPane
						key="trace-record"
						tab={<span>追号记录</span>}
					>
						<BettingRecord.Trace
							traceRecords={latestTraceRecordsData}
							onClickTraceRecord={_handleClickTraceRecord}
							// TODO go member center agent betting record and should select 彩票追号
							onCheckAllTraceRecords={_handleViewAllRecords}
						/>
					</CardTabs.TabPane>
				</CardTabs>
				<ClientMessageModal
					isVisible={isDiscardMessageVisible}
					message="是否确定撤单？"
					okText="撤单"
					onClickCancel={() => this.setState({ isDiscardMessageVisible: false, })}
					onClickOk={_handleDiscardBetting}
				/>
				<BettingRecordDetailModalFeature
					isModalVisible={isBettingRecordDetailModalVisible}
					bettingRecordId={bettingRecord.id}
					onClose={() => this.setState({ isBettingRecordDetailModalVisible: false, })}
				/>
				<TraceRecordDetailModalFeature
					isModalVisible={isTraceRecordDetailModalVisible}
					onClose={() => this.setState({ isTraceRecordDetailModalVisible: false, })}
				/>
			</Fragment>
		);
	}
}

StandardBettingRecordsTab.propTypes = propTypes;
StandardBettingRecordsTab.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		bettingsData: state.bettings.get('data').toArray(),
		latestBettingRecordsData: state.bettingRecords.get('latestBettingRecordsData').toArray(),
		latestTraceRecordsData: state.traceRecords.get('latestTraceRecordsData').toArray(),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		clearBettingAction: (...args) => dispatch(clearBettingAction(...args)),
		clearBettingsAction: (...args) => dispatch(clearBettingsAction(...args)),
		discardBettingRecordAction: (...args) => dispatch(discardBettingRecordAction(...args)),
		setSelectedTraceRecordAction: (...args) => dispatch(setSelectedTraceRecordAction(...args)),
	};
}

function mapNotifyToProps(notify) {
	return {
		notifyShowMemberCenter: (data) => notify(EventEnum.SHOW_MEMBER_CENTER, data),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(connectObservable(mapNotifyToProps)(StandardBettingRecordsTab));
