import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import {
	TextButton,
	BettingRecordCard,
	XinYongSelectedBettingCard,
	Panel,
} from 'ljit-react-components';
import CardTabs from '../../components/card-tabs';
import ClientMessageModal from '../../components/client-message-modal';
import BettingRecordDetailModalFeature from '../../features/betting-record-detail-modal';
import XinYongBettingCheckoutFeature from '../xin-yong-betting-checkout';
import { calculateReward, bettingRecordPropType, } from '../../lib/betting-utils';
import {
	bettingActions,
	bettingRecordActions,
} from '../../controller';
import { connectObservable } from 'ljit-observable/react-observable';
import { EventEnum, } from '../../lib/enums';
import { RouteKeyEnums } from '../../route-modals/member-center/routes';
import './style.styl';

const {
	clearBettingAction,
} = bettingActions;
const {
	discardBettingRecordAction,
} = bettingRecordActions;
const cardTabKeyEnums = {
	BETTINGS: 'bettings',
	BETTINGRECORDS: 'bettingRecords',
};

const propTypes = {
	lotteryId: PropTypes.string,
	bettingsData: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			bonus: PropTypes.number,
			odds: PropTypes.number,
		}),
		name: PropTypes.string,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		multiple: PropTypes.number,
		amountPerBet: PropTypes.number,
		rebate: PropTypes.number,
		amount: PropTypes.number,
	})).isRequired,
	latestBettingRecordsData: PropTypes.arrayOf(bettingRecordPropType),
	clearBettingAction: PropTypes.func.isRequired,
	discardBettingRecordAction: PropTypes.func.isRequired,
	onClickBettingRecordCard: PropTypes.func,
	notifyShowMemberCenter: PropTypes.func.isRequired,
};

const defaultProps = {
	bettingsData: [],
	latestBettingRecordsData: [],
};

const prefixClass = 'betting-record-tab';

class XinYongBettingRecordsTab extends Component {
	constructor() {
		super();
		this.state = {
			cardTabKey: cardTabKeyEnums.BETTINGS,
			isMessageVisible: false,
			bettingRecord: {},
			isBettingRecordDetailModalVisible: false,
		};

		this._handleDiscardMessageShow = this._handleDiscardMessageShow.bind(this);
		this._handleDiscardMessageHide = this._handleDiscardMessageHide.bind(this);
		this._handleDiscardBetting = this._handleDiscardBetting.bind(this);
		this._handleClickBettingRecordCard = this._handleClickBettingRecordCard.bind(this);
		this._renderBettingRecordCards = this._renderBettingRecordCards.bind(this);
		this._renderSelectedBettingCards = this._renderSelectedBettingCards.bind(this);
		this._handleViewAllRecords = this._handleViewAllRecords.bind(this);
	}
	_handleViewAllRecords() {
		const { notifyShowMemberCenter } = this.props;

		notifyShowMemberCenter(RouteKeyEnums.MEMBER_BETTING_RECORDS);
	}
	_handleDiscardMessageShow(bettingRecord) {
		this.setState({
			isMessageVisible: true,
			bettingRecord,
		});
	}
	_handleDiscardMessageHide() {
		this.setState({ isMessageVisible: false, });
	}
	_handleDiscardBetting() {
		const { bettingRecord, } = this.state;
		const { discardBettingRecordAction, } = this.props;

		discardBettingRecordAction(bettingRecord.id);
		this.setState({
			isMessageVisible: false,
			bettingRecord: {},
		});
	}
	_handleClickBettingRecordCard(bettingRecord) {
		this.setState({
			bettingRecord,
			isBettingRecordDetailModalVisible: true,
		});
	}

	_renderSelectedBettingCards() {
		const {
			bettingsData = [],
			clearBettingAction,
		} = this.props;

		if (bettingsData.length > 0) {
			const cards = bettingsData.map((betting = {}, index) => {
				const {
					play = {},
					betcontent,
					multiple,
					amount,
					amountPerBet,
				} = betting;
				const { id, bonus, odds } = play;
				// TODO handle IEEE 754 problem
				const reward = parseFloat(calculateReward(amountPerBet, bonus, multiple));

				return (
					<XinYongSelectedBettingCard
						key={`betting-record-card${id}`}
						data={{
							betcontent,
							amount,
							odds,
							reward,
						}}
						onClose={() => clearBettingAction(index)}
					/>
				);
			});

			return cards;
		} else {
			return (
				<XinYongSelectedBettingCard
					isShowingCloseButton={false}
				/>
			);
		}
	}

	_renderBettingRecordCards() {
		const { latestBettingRecordsData, } = this.props;
		const { _handleDiscardMessageShow, _handleClickBettingRecordCard, } = this;
		const cards = latestBettingRecordsData.map(bettingRecord => {
			return (
				<BettingRecordCard
					key={`betting-record-card${bettingRecord.id}`}
					bettingRecord={bettingRecord}
					onClick={() => _handleClickBettingRecordCard(bettingRecord)}
					onClickCancel={() => _handleDiscardMessageShow(bettingRecord)}
				/>
			);
		});

		return cards;
	}

	render() {
		const {
			_handleDiscardBetting,
			_handleDiscardMessageHide,
			_renderBettingRecordCards,
			_renderSelectedBettingCards,
			_handleViewAllRecords
		} = this;
		const {
			cardTabKey,
			isMessageVisible,
			bettingRecord,
			isBettingRecordDetailModalVisible,
		} = this.state;

		return (
			<React.Fragment>
				<CardTabs
					activeKey={cardTabKey}
					onChange={tabKey => this.setState({ cardTabKey: tabKey, })}
					className={prefixClass}
				>
					<CardTabs.TabPane
						tab="已选注单"
						key={cardTabKeyEnums.BETTINGS}
					>
						<Panel
							headerTitle={null}
							className={`${prefixClass}__selected-betting-tab-panel`}
							content={_renderSelectedBettingCards()}
							footer={<XinYongBettingCheckoutFeature isSquare/>}
						/>
					</CardTabs.TabPane>
					<CardTabs.TabPane
						tab={<span>投注记录</span>}
						key={cardTabKeyEnums.BETTINGRECORDS}
					>
						<Panel
							headerTitle="投注记录"
							content={_renderBettingRecordCards()}
							footer={
								<TextButton
									className={`${prefixClass}__check-record-button`}
									onClick={_handleViewAllRecords}
									fontSize={TextButton.SizeEnums.SMALL}
									text="看所有投注记录"
								/>
							}
						/>
					</CardTabs.TabPane>
				</CardTabs>
				<ClientMessageModal
					isVisible={isMessageVisible}
					message="是否确定撤单？"
					okText="撤单"
					onClickCancel={_handleDiscardMessageHide}
					onClickOk={_handleDiscardBetting}
				/>
				<BettingRecordDetailModalFeature
					isModalVisible={isBettingRecordDetailModalVisible}
					bettingRecordId={bettingRecord.id}
					onClose={() => this.setState({ isBettingRecordDetailModalVisible: false, })}
				/>
			</React.Fragment>
		);
	}
}

XinYongBettingRecordsTab.propTypes = propTypes;
XinYongBettingRecordsTab.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		bettingsData: state.bettings.get('data').toArray(),
		latestBettingRecordsData: state.bettingRecords.get('latestBettingRecordsData').toArray(),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		clearBettingAction: (...args) => dispatch(clearBettingAction(...args)),
		discardBettingRecordAction: (...args) => dispatch(discardBettingRecordAction(...args)),
	};
}

function mapNotifyToProps(notify) {
	return {
		notifyShowMemberCenter: (data) => notify(EventEnum.SHOW_MEMBER_CENTER, data),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(connectObservable(mapNotifyToProps)(XinYongBettingRecordsTab));
