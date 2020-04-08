import React, { useState, } from 'react';
import PropTypes from 'prop-types';
import { DropdownMenuBar, } from 'ljit-react-components';
import BettingRecordCard from './betting-record-card';
import { bettingRecordPropType, } from '../../../../../lib/betting-utils';
import { NavigationKeyEnums, } from '../../../../navigation';

import './style.styl';

const fakeRecords = [{
	status: 8,
	id: 2,
	lotteryClassId: 0,
	lotteryId: 16,
	lotteryName: "腾讯分分彩",
	name: "整合 大",
	issue: 20200108032,
	reward: 0,
	count: 1,
	amount: 1,
	createdAt: "2020-01-08T06:34:33.000Z",
}];
const fakeLotteriesMap = {
	16: { code: 'txffc', },
};

const propTypes = {
	bettingRecordsData: PropTypes.arrayOf(bettingRecordPropType),
	lotteriesMapData: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
};
// TODO get data from redux store
const defaultProps = {
	bettingRecordsData: fakeRecords,
	lotteriesMapData: fakeLotteriesMap,
};

function BettingRecordsPage({
	bettingRecordsData,
	lotteriesMapData,
	onNavigate
}) {
	const [selectedMenuId, setSelectedMenuId] = useState();

	const _handleClickMenu = (id) => {
		if (selectedMenuId === id) {
			setSelectedMenuId();
		} else {
			setSelectedMenuId(id);
		}
	};
	const _handleClickMask = () => {
		setSelectedMenuId();
	};
	const _handleClickMoreInfo = (bettingRecord) => {
		// TODO pass params to betting-record-detail-page
		onNavigate({
			page: NavigationKeyEnums.BETTING_RECORD_DETAIL,
			navigationType: 'push',
		});

	};
	const _handleClickDiscard = (bettingRecord) => {
		// TODO dispatch discard betting action
		console.log("Discard", bettingRecord);
	};
	const _renderBettingRecordCards = () => {
		return bettingRecordsData.map(bettingRecord => {
			const { lotteryId, id } = bettingRecord;
			const lotteryCode = lotteriesMapData[lotteryId] ? lotteriesMapData[lotteryId].code : null;

			return (
				<BettingRecordCard
					key={id}
					lotteryCode={lotteryCode}
					bettingRecord={bettingRecord}
					onClickMoreInfo={() => { _handleClickMoreInfo(bettingRecord); }}
					onClickDiscard={() => { _handleClickDiscard(bettingRecord); }}
				/>
			);
		});
	};

	// TODO add dropdownContent
	const menuItems = [
		{ title: '彩票投注', id: 1, dropdownContent: <div>彩票投注</div>, },
		{ title: '2020-01-02', id: 2, dropdownContent: <div>2020-01-02</div>, },
		{ title: '全部状态', id: 3, dropdownContent: <div>全部状态</div>, },
	];

	return (
		<div className="betting-records-page">
			<DropdownMenuBar
				menuItems={menuItems}
				selectedId={selectedMenuId}
				onClickMenu={_handleClickMenu}
				onClickMask={_handleClickMask}
			/>
			<div className="betting-records-page__content">
				{_renderBettingRecordCards()}
			</div>
		</div>
	);
}

BettingRecordsPage.propTypes = propTypes;
BettingRecordsPage.defaultProps = defaultProps;

export default BettingRecordsPage;
