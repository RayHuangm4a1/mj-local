import React, { useState } from 'react';
import XinYongBetDropdownMenu from './dropdown-menu';
import XinYongBetLotteryPlay from './lottery-play';
import MobileBettingCheckout from '../../../components/mobile-betting-checkout';
import MobileDrawingCountDownBlock from '../../../components/mobile-drawing-count-down-block';
import MobileDrawingCodeBallBlock from '../../../components/mobile-drawing-code-ball-block';

import './style.styl';

const PREFIX_CLASS = 'xin-yong-bet-page';

// TODO replace with real data from store
const fakelotteryDrawingRecords = [
	{ issue: '123', opencode: '1,2,3,4,5,6', },
	{ issue: '122', opencode: '1,2,3,4,5,6', },
	{ issue: '124', opencode: '1,2,3,4,5,6', },
	{ issue: '125', opencode: '1,2,3,4,5,6', },
	{ issue: '126', opencode: '1,2,3,4,5,6', },
];
const fakeXinYongPlayConditions = [
	{ id: 15, name: '整合', subconditions: [
		{ id: 15001, name: '总和-龙虎和', },
		{ id: 15002, name: '总和-第一球', },
		{ id: 15003, name: '总和-第二球', },
		{ id: 15004, name: '总和-第三球', },
		{ id: 15005, name: '总和-第四球', },
		{ id: 15006, name: '总和-第五球', },
	] },
	{ id: 16, name: '第一球', subconditions: [
		{ id: 15008, name: '第一球', },
		{ id: 15009, name: '前三', },
		{ id: 15010, name: '中三', },
		{ id: 15011, name: '后三', },
	] },
	{ id: 17, name: '第二球', subconditions: [
		{ id: 15012, name: '第二球', },
		{ id: 15013, name: '前三', },
		{ id: 15014, name: '中三', },
		{ id: 15015, name: '后三', },
	] },
	{ id: 18, name: '第三球', subconditions: [
		{ id: 15016, name: '第三球', },
		{ id: 15017, name: '前三', },
		{ id: 15018, name: '中三', },
		{ id: 15019, name: '后三', },
	] },
	{ id: 19, name: '第四球', subconditions: [
		{ id: 15020, name: '第四球', },
		{ id: 15021, name: '前三', },
		{ id: 15022, name: '中三', },
		{ id: 15023, name: '后三', },
	] },
	{ id: 20, name: '第五球', subconditions: [
		{ id: 15024, name: '第五球', },
		{ id: 15025, name: '前三', },
		{ id: 15026, name: '中三', },
		{ id: 15027, name: '后三', },
	] },
	{ id: 21, name: '单码',  subconditions: [
		{ id: 15028, name: '单码', },
	] },
	{ id: 22, name: '连码',  subconditions: [
		{ id: 15029, name: '连码', },
	] },
	{ id: 23, name: '斗牛',  subconditions: [
		{ id: 15030, name: '牛一', },
		{ id: 15031, name: '牛二', },
		{ id: 15032, name: '牛三', },
	] },
];
const fakePlaysMap = fakeXinYongPlayConditions.reduce((acc, playCondition) => {
	const { subconditions } = playCondition;

	subconditions.forEach(subcondition => {
		const { id } = subcondition;

		acc[id] = [
			{ name: '1', id: id + 41000, odds: 1.9052, },
			{ name: '2', id: id + 32100, odds: 1.9052, },
			{ name: '3', id: id + 13002, odds: 1.9052, },
		];
	});

	return acc;
}, {});

function XinYongBetPage({ onNavigate, onBack, }) {
	const [ selectedSlots, setSelectedSlots, ] = useState([]);

	const bettingCount = selectedSlots.length;
	// TODO replace with real data from store
	const balance = 23456.1234;

	const _handleClickBetSlot = (id) => {
		if (selectedSlots.includes(id)) {
			const updatedSelectedSlots = selectedSlots.filter(slotId => slotId !== id);

			setSelectedSlots(updatedSelectedSlots);
		} else {
			setSelectedSlots([...selectedSlots, id]);
		}
	};
	const _handleTimeOut = () => {
		// TODO handle time out
	};
	const _handleClickTrend = () => {
		// TODO navigate to Trend Page
	};
	const _handleClickBet = () => {
		// TODO dispatch bet action
	};
	const _handleChangeAmountPerBet = () => {
		// TODO dispatch change AmountPerBet action
	};

	return (
		<div className={PREFIX_CLASS}>
			<XinYongBetDropdownMenu
				lotteryDrawingRecords={fakelotteryDrawingRecords}
				// TODO use data from redux store
				selectedLottery={{ id: 10, name: '重庆时时彩', }}
				selectedLotteryClass={{ id: 0, name: '时时彩', }}
			/>
			<MobileDrawingCountDownBlock
				onTimeout={_handleTimeOut}
				onClickTrend={_handleClickTrend}
				onClickToggleStandard={onBack}
				// TODO use data from redux store
				endDate={new Date(new Date().getTime() + 10000)}
				isStandard={false}
			/>
			<MobileDrawingCodeBallBlock
				// TODO use data from redux store
				issue={'1123'}
				opencode={'1,2,3,4,5,6'}
				lotteryClassId={0}
			/>
			<XinYongBetLotteryPlay
				selectedLottery={{ id: 10, name: '重庆时时彩', }}
				// TODO change playConditions when lottery change
				playConditions={fakeXinYongPlayConditions}
				playsMap={fakePlaysMap}
				selectedSlots={selectedSlots}
				onClickBetSlot={_handleClickBetSlot}
			/>
			<MobileBettingCheckout.XinYong
				bettingCount={bettingCount}
				balance={balance}
				onClickBet={_handleClickBet}
				onChangeValue={_handleChangeAmountPerBet}
			/>
		</div>
	);
}

export default XinYongBetPage;
