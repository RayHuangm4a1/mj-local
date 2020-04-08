import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import CardTabs from '../../components/card-tabs';
import DrawingRecordList from './drawing-record-list';
import BettingLongList from './betting-long-list';
import { connect } from 'ljit-store-connecter';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../lib/feature-toggle-provider';
import { lotteryDrawingRecordActions, } from '../../controller';
import { lotteryDrawingRecordsPropTypes, } from './utils';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum } from '../../lib/enums';
import './style.styl';

const { fetchLotteryDrawingRecordsAction, } = lotteryDrawingRecordActions;

const propTypes = {
	className: PropTypes.string,
	lotteryDrawingRecordsData: lotteryDrawingRecordsPropTypes,
	fetchLotteryDrawingRecordsAction: PropTypes.func,
	selectedLottery: PropTypes.shape({
		id: PropTypes.number,
	}),
	layoutConfigs: layoutConfigsPropTypes,
};

const defaultProps = {
	lotteryDrawingRecordsData: [],
	fetchLotteryDrawingRecordsAction: () => {},
	selectedLottery: {},
};

const tabKeyEnums = {
	DRAWING: 'drawing',
	BETTING_LONG: 'bettingLong',
};

const {
	DRAWING,
	BETTING_LONG,
} = tabKeyEnums;

class DrawingBettingLongTabs extends Component {
	constructor() {
		super();
		this.state = {
			cardTabKey: DRAWING,
		};
		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._renderBettingLongTab = this._renderBettingLongTab.bind(this);
	}

	_handleChangeTab(tabKey) {
		this.setState({ cardTabKey: tabKey, });
	}
	_renderBettingLongTab() {
		const { layoutConfigs, lotteryDrawingRecordsData, } = this.props;
		const {
			toggles: {
				is_BETTING_LONG_Active
			},
		} = layoutConfigs;

		if (is_BETTING_LONG_Active) {
			return (
				<CardTabs.TabPane
					key={BETTING_LONG}
					tab="长龙排行榜"
				>
					<BettingLongList lotteryDrawingRecords={lotteryDrawingRecordsData}/>
				</CardTabs.TabPane>
			);
		}
	}

	render() {
		const { className, lotteryDrawingRecordsData, } = this.props;
		const { cardTabKey, } = this.state;
		const { _handleChangeTab, _renderBettingLongTab } = this;

		return (
			<CardTabs
				className={cx('drawing-betting-long-tab', className)}
				activeKey={cardTabKey}
				onChange={_handleChangeTab}
			>
				<CardTabs.TabPane
					key={DRAWING}
					tab="开奖记录"
				>
					<DrawingRecordList lotteryDrawingRecords={lotteryDrawingRecordsData}/>
				</CardTabs.TabPane>
				{_renderBettingLongTab()}
			</CardTabs>
		);
	}
	componentDidMount() {
		const {
			selectedLottery: { id: lotteryId, },
			fetchLotteryDrawingRecordsAction,
		} = this.props;

		if (Number.isInteger(lotteryId)) {
			fetchLotteryDrawingRecordsAction(lotteryId);
		}
	}
	componentDidUpdate(prevProps) {
		const {
			selectedLottery: { id: lotteryId, },
			fetchLotteryDrawingRecordsAction,
		} = this.props;
		const { selectedLottery: { id: prevLotteryId, }, } = prevProps;

		if (lotteryId !== prevLotteryId && Number.isInteger(lotteryId)) {
			fetchLotteryDrawingRecordsAction(lotteryId);
		}
	}
}

DrawingBettingLongTabs.propTypes = propTypes;
DrawingBettingLongTabs.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		selectedLottery: state.selectedLottery.toObject(),
		lotteryDrawingRecordsData: state.lotteryDrawingRecords.get('data').toArray(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchLotteryDrawingRecordsAction: (lotteryId) => dispatch(fetchLotteryDrawingRecordsAction(lotteryId)),
	};
}

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	withFeatureToggle(FeatureCodeEnum.LOTTERY)
)(DrawingBettingLongTabs);
