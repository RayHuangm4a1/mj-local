import React, { useState, } from 'react';
import {
	BettingWeizhiBlock,
	StandardBettingElement,
} from 'ljit-react-components';
import { LotteryClassIdEnum, } from '../../../../lib/lotteries/index';
import './style.styl';

const { SOLID, HOLLOW, } = BettingWeizhiBlock.CheckboxStyleEnum;

const weizhiOptions = [
	{
		name: '萬',
		isSelected: true,
	},
	{
		name: '千',
		isSelected: false,
	},
	{
		name: '百',
		isSelected: false,
	},
	{
		name: '十',
		isSelected: false,
	},
	{
		name: '個',
		isSelected: false,
	},
];

const weizhiOptions2 = [
	{
		name: '一',
		isSelected: true,
	},
	{
		name: '二',
		isSelected: false,
	},
	{
		name: '三',
		isSelected: false,
	},
	{
		name: '四',
		isSelected: false,
	},
	{
		name: '五',
		isSelected: false,
	},
	{
		name: '六',
		isSelected: true,
	},
	{
		name: '七',
		isSelected: false,
	},
	{
		name: '八',
		isSelected: false,
	},
	{
		name: '九',
		isSelected: false,
	},
	{
		name: '十',
		isSelected: false,
	},
];

const StandardBettingElement94Mobile =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 94);

function BettingWeizhiBlockMobileSample() {
	const [bettingWeizhiCheckedOptions, setBettingWeizhiCheckedOptions] = useState(weizhiOptions);

	const [bettingWeizhiCheckedOptions2, setBettingWeizhiCheckedOptions2] = useState(weizhiOptions2);
	
	const _handleBettingWeizhiChange = (index) => {
		const updatedData = bettingWeizhiCheckedOptions.map((option, optionIndex) => {
			if (index === optionIndex) {
				return Object.assign({}, option, {
					isSelected: !option.isSelected,
				});
			} else {
				return Object.assign({}, option);
			}
		});

		setBettingWeizhiCheckedOptions(updatedData);
	};

	const _handleBettingWeizhiChange2 = (index) => {
		const updatedData = bettingWeizhiCheckedOptions2.map((option, optionIndex) => {
			if (index === optionIndex) {
				return Object.assign({}, option, {
					isSelected: !option.isSelected,
				});
			} else {
				return Object.assign({}, option);
			}
		});

		setBettingWeizhiCheckedOptions2(updatedData);
	};

	const _handleUpdateCombination = (combination) => {
		console.log('StandardBettingElementSample combination', combination);
	};

	const _handleUpdatePosition = (position )=> {
		console.log('StandardBettingElementSample position', position);
	};

	return (
		<React.Fragment>
			<div>demo inline with default layout</div>
			<BettingWeizhiBlock
				checkboxStyle={HOLLOW}
				options={bettingWeizhiCheckedOptions}
				onPressCheckbox={(index) => { _handleBettingWeizhiChange(index); }}
			/>
			<div>demo multiple line with mobile layout</div>
			<BettingWeizhiBlock
				className="mobile-demo-betting-weizhi-block"
				checkboxStyle={HOLLOW}
				options={bettingWeizhiCheckedOptions2}
				onPressCheckbox={(index) => { _handleBettingWeizhiChange2(index); }}
			/>
			<div>StandardBettingElement94Mobile</div>
			<StandardBettingElement94Mobile
				isMobile={true}
				onUpdateCombination={_handleUpdateCombination}
				onUpdatePosition={_handleUpdatePosition}
			/>
		</React.Fragment>
		
	);
}

export default BettingWeizhiBlockMobileSample;
