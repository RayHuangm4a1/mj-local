import React, { Component, } from 'react';
import XinYongBettingCard from '../../../src/components/xin-yong-betting-card';
import './style.styl';

const playsMap = {};
const playTemplates1 = [
	{
		name: '总和大',
		id: 53112,
		playSlotType: 'rectangle',
	},
	{
		name: '总和小',
		id: 53113,
		playSlotType: 'rectangle',
	},
	{
		name: '总和单',
		id: 53114,
		playSlotType: 'rectangle',
	},
	{
		name: '总和双',
		id: 53115,
		playSlotType: 'rectangle',
	},
	{
		name: '龙',
		id: 53115,
		playSlotType: 'rectangle',
	},
	{
		name: '虎',
		id: 53115,
		playSlotType: 'rectangle',
	},
	{
		name: '和',
		id: 53115,
		playSlotType: 'rectangle',
	},
];
const playTemplates2 = [
	{
		name: '大',
		id: 53000,
	},
	{
		name: '小',
		id: 53001,
	},
	{
		name: '单',
		id: 53002,
	},
	{
		name: '双',
		id: 53003,
	},
	{
		name: '0',
		id: 53004,
		playSlotType: 'animal',
	},
	{
		name: '1',
		id: 53005,
		playSlotType: 'animal',
	},
	{
		name: '2',
		id: 53006,
		playSlotType: 'animal',
	},
	{
		name: '3',
		id: 53007,
		playSlotType: 'animal',
	},
	{
		name: '4',
		id: 53008,
		playSlotType: 'animal',
	},
	{
		name: '5',
		id: 53009,
		playSlotType: 'animal',
	},
	{
		name: '6',
		id: 53010,
		playSlotType: 'animal',
	},
	{
		name: '7',
		id: 53011,
		playSlotType: 'animal',
	},
	{
		name: '8',
		id: 53012,
		playSlotType: 'animal',
	},
	{
		name: '9',
		id: 53013,
		playSlotType: 'animal',
	},
];

class XinYongBettingCardSample extends Component {
	constructor(props) {
		super(props);

		this.state = {
			bettingsMap: {},
			squareBettingsMap: {},
		};

		this._handleChangeAmount = this._handleChangeAmount.bind(this);
		this._handleChangeSquareAmount = this._handleChangeSquareAmount.bind(this);
	}

	_handleChangeAmount(playSubcondition, play, amount) {
		// TODO: data
		console.log(playSubcondition, play, amount);
	}
	_handleChangeSquareAmount(playSubcondition, play, amount) {
		const { squareBettingsMap, } = this.state;
		const playCopy = Object.assign({}, play);
		const updatedBettingsMap = Object.assign({}, squareBettingsMap, {
			[play.id]: {
				play: playCopy,
				amount,
			},
		});

		this.setState({
			squareBettingsMap: updatedBettingsMap,
		});
		console.log(playSubcondition, play, amount);
	}

	render() {
		const { bettingsMap, squareBettingsMap, } = this.state;
		const { _handleChangeAmount, _handleChangeSquareAmount, } = this;

		return (
			<div>
				<div style={{ overflow: 'hidden', }}>
					<h4>Vertical</h4>
					<XinYongBettingCard
						style={{ float: 'left', marginRight: '15px', marginBottom: '15px', width: '174px',}}
						onChange={_handleChangeAmount}
						playSubcondition={{ name: '第一球', }}
						bettingsMap={bettingsMap}
						playsMap={playsMap}
						playTemplates={playTemplates2}
					/>

					<XinYongBettingCard
						style={{ float: 'left', marginRight: '15px', marginBottom: '15px', width: '174px', }}
						isDisabled={true}
						disabledText={'維修中'}
						playSubcondition={{ name: '第一球', }}
						bettingsMap={bettingsMap}
						playsMap={playsMap}
						playTemplates={playTemplates2}
					/>
					<XinYongBettingCard
						style={{ float: 'left', marginRight: '15px', marginBottom: '15px', width: '174px', }}
						isDisabled={true}
						disabledText={'封盘'}
						playSubcondition={{ name: '第一球', }}
						bettingsMap={bettingsMap}
						playsMap={playsMap}
						playTemplates={playTemplates2}
					/>
				</div>
				<div style={{ overflow: 'hidden', }}>
					<h4>Horizontal</h4>
					<XinYongBettingCard
						onChange={_handleChangeAmount}
						orientation={XinYongBettingCard.OrientationEnums.HORIZONTAL}
						columnCount={4}
						playSubcondition={{ name: '总和-龙虎和', }}
						bettingsMap={bettingsMap}
						playsMap={playsMap}
						playTemplates={playTemplates1}
					/>
					<h4>Horizontal square</h4>
					<XinYongBettingCard
						className="xin-yong-betting-card-square-sample"
						onChange={_handleChangeSquareAmount}
						orientation={XinYongBettingCard.OrientationEnums.HORIZONTAL}
						columnCount={4}
						playSubcondition={{ name: '第一球', }}
						bettingsMap={squareBettingsMap}
						playsMap={playsMap}
						playTemplates={playTemplates2}
						xinYongPlaySlotType={XinYongBettingCard.XinYongPlaySlotTypeEnums.SQUARE}
						defaultAmount={5}
					/>
				</div>
			</div>
		);
	}
}

export default XinYongBettingCardSample;
