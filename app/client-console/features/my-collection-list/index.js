import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import {
	withLoadingStatusNotification,
} from '../../../lib/notify-handler';
import { RouteKeyEnums, } from '../../route';
import { MyLotteryCollectionsDataPropTypes, } from '../../lib/prop-types-utils';
import { myLotteryCollectionsActions, } from '../../controller';
import LotteryList from '../../components/lottery-list';

const {
	LOTTERY_HOME,
} = RouteKeyEnums;
const {
	fetchMyLotteryCollectionsAction,
} = myLotteryCollectionsActions;

const failedLoadingStatuses = [
	{
		loadingStatus: 'myLotteryCollectionsLoadingStatus',
		loadingStatusMessage: 'myLotteryCollectionsLoadingStatusMessage',
	},
];

const propTypes = {
	myLotteryCollectionsData: MyLotteryCollectionsDataPropTypes,
	myLotteryCollectionsLoadingStatus: PropTypes.number,
	myLotteryCollectionsLoadingStatusMessage: PropTypes.string,
	onNavigate: PropTypes.func.isRequired,
	fetchMyLotteryCollectionsAction: PropTypes.func.isRequired,
};

class MyCollectionsList extends Component {
	constructor() {
		super();

		this._handleClickLottery = this._handleClickLottery.bind(this);
	}

	_handleClickLottery(lottery) {
		const { onNavigate, } = this.props;
		const { id: lotteryId, lotteryClass = {}, } = lottery;
		const { id: lotteryClassId, } = lotteryClass;

		onNavigate(`${LOTTERY_HOME}/${lotteryClassId}/${lotteryId}/standard`);
	}

	render() {
		const {
			myLotteryCollectionsData,
		} = this.props;
		const { _handleClickLottery } = this;

		return (
			<LotteryList
				lotteries={myLotteryCollectionsData}
				lotteryDrawings={fakelotteryDrawingsData}
				onClickLottery={_handleClickLottery}
			/>
		);
	}

	componentDidMount() {
		const { fetchMyLotteryCollectionsAction, } = this.props;

		fetchMyLotteryCollectionsAction();
	}
}

function mapStateToProps(state) {
	const {
		myLotteryCollections: myLotteryCollectionsReducer,
	} = state;

	return {
		myLotteryCollectionsData: myLotteryCollectionsReducer.get('collectionsData').toArray(),
		myLotteryCollectionsLoadingStatus: myLotteryCollectionsReducer.get('loadingStatus'),
		myLotteryCollectionsLoadingStatusMessage: myLotteryCollectionsReducer.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchMyLotteryCollectionsAction: () => dispatch(fetchMyLotteryCollectionsAction()),
	};
}

MyCollectionsList.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		failedLoadingStatuses,
		MyCollectionsList
	)
);

// TODO 等待 取得所有彩票的當期開盤列表 API
const fakelotteryDrawingsData = {
	12: { current: { closedAt: new Date(1600001114409) } },
	16: { current: { closedAt: new Date(1605001114409) } },
	3: { current: { closedAt: new Date(1600001114409) } },
};
