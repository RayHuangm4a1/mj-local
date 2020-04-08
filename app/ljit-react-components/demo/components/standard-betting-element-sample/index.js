import React, { Component, } from 'react';
import {
	StandardBettingElement,
} from 'ljit-react-components';
import ComponentBlock from '../ComponentBlock';

import { LotteryClassIdEnum, } from '../../../src/lib/game-id-enums';

class StandardBettingElementSample extends Component {
	constructor(props) {
		super(props);

		this._handleUpdateCombination = this._handleUpdateCombination.bind(this);
		this._handleUpdatePosition = this._handleUpdatePosition.bind(this);
	}

	_handleUpdateCombination(combination) {
		console.log('StandardBettingElementSample combination', combination);
	}

	_handleUpdatePosition(position) {
		console.log('StandardBettingElementSample position', position);
	}

	render() {
		const {
			_handleUpdateCombination,
			_handleUpdatePosition,
		} = this;

		const StandardBettingElement1 =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 1);

		const StandardBettingElement1Mobile =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 1);

		const StandardBettingElement2 =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 2);

		const StandardBettingElement93 =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 93);

		const StandardBettingElement94 =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 94);
		
		const StandardBettingElement94Mobile =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 94);

		const StandardBettingElement113 =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 113);

		const StandardBettingElement117 =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 117);

		const StandardBettingElement50001 =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 50001);

		const StandardBettingElement115 =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 115);

		const StandardBettingElement206 =
			StandardBettingElement.get(LotteryClassIdEnum.IIX5, 1, 206);

		const StandardBettingElement202 =
			StandardBettingElement.get(LotteryClassIdEnum.IIX5, 1, 202);

		const StandardBettingElement212 =
			StandardBettingElement.get(LotteryClassIdEnum.IIX5, 1, 212);

		const StandardBettingElement213 =
			StandardBettingElement.get(LotteryClassIdEnum.IIX5, 1, 213);

		const StandardBettingElement231 =
			StandardBettingElement.get(LotteryClassIdEnum.IIX5, 1, 231);

		const StandardBettingElement606 =
			StandardBettingElement.get(LotteryClassIdEnum.PK10, 1, 606);

		const StandardBettingElement801 =
			StandardBettingElement.get(LotteryClassIdEnum.PCDD, 1, 801);

		const StandardBettingElement301 =
			StandardBettingElement.get(LotteryClassIdEnum.THREED, 1, 301);

		const StandardBettingElement302 =
			StandardBettingElement.get(LotteryClassIdEnum.THREED, 1, 302);
		
		const StandardBettingElement303 =
			StandardBettingElement.get(LotteryClassIdEnum.THREED, 1, 303);

		const StandardBettingElement321 =
			StandardBettingElement.get(LotteryClassIdEnum.THREED, 1, 321);

		const codeBallAwards = {
			'无牛': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛一': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛二': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛三': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛四': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛五': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛六': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛七': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: true
				}
			},
			'牛八': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛九': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛大': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: true
				}
			},
			'牛小': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
			'牛单': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: true
				}
			},
			'牛双': {
				deltaBonus: 0,
				denominator: 100000,
				numerator: 6520,
				pk: {
					count: 0,
					isEnabled: false
				}
			},
		};

		return (
			<div>
				<ComponentBlock title="五星直选复式">
					<StandardBettingElement1
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>

				<ComponentBlock title="五星直选单式">
					<StandardBettingElement2
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="五星直选单式 mobile">
					<StandardBettingElement2
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
						isMobile={true}
					/>
				</ComponentBlock>

				<ComponentBlock title="任二直选单式">
					<StandardBettingElement93
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>

				<ComponentBlock title="任二直选和值">
					<StandardBettingElement94
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>

				<ComponentBlock title="五星龙虎和">
					<StandardBettingElement113
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>

				<ComponentBlock title="任二龙虎和">
					<StandardBettingElement117
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>

				<ComponentBlock title="五星特殊总和">
					<StandardBettingElement50001
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>

				<ComponentBlock title="五星斗牛">
					<StandardBettingElement115
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
						codeBallAwards={codeBallAwards}
					/>
				</ComponentBlock>

				<ComponentBlock title="11选5直选复式(前二)">
					<StandardBettingElement206
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="11选5直选單式(前三)">
					<StandardBettingElement202
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="11选5定位胆(前三定位胆)">
					<StandardBettingElement212
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="11选5定单双">
					<StandardBettingElement213
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="11选5胆拖(二中二)">
					<StandardBettingElement231 />
				</ComponentBlock>

				<ComponentBlock title="和值冠亞和值">
					<StandardBettingElement606
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="不回本玩法 定位">
					<StandardBettingElement801
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="3D 三星 直选复式">
					<StandardBettingElement301
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="3D 三星 直选单式">
					<StandardBettingElement302
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="3D 三星 直选和值">
					<StandardBettingElement303
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="3D 大小单双(前二)">
					<StandardBettingElement321
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
				<ComponentBlock title="手機版 五星直选复式">
					<StandardBettingElement1Mobile
						isMobile={true}
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>

				<ComponentBlock title="任二直选和值">
					<StandardBettingElement94Mobile
						isMobile={true}
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
				</ComponentBlock>
			</div>
		);
	}
}

export default StandardBettingElementSample;
