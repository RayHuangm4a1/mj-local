import React, { useState } from 'react';
import MobileBottomDrawer from '../../../components/mobile-bottom-drawer';
import { Button, DecimalNumber, Select, } from 'ljit-react-components';
import { amountPerBetOptions, } from '../../../lib/betting-utils';
import './style.styl';

const MobileConfirmBettingDrawer = MobileBottomDrawer.ConfirmBetting;

function MobileConfirmBettingDrawerSample() {
	const [isVisible, setIsVisible] = useState(false);
	const [isVisible2, setIsVisible2] = useState(false);
	const [amountPerBet, setAmountPerBet] = useState(2);
	const _handleClickBet = (password) => {
		console.log(`check password:"${password}"`);
		setIsVisible(false);
		setIsVisible2(false);
	};

	return (
		<section>
			<h5>MobileConfirmBettingDrawerSample</h5>
			<Button
				onClick={() => setIsVisible(true)}
			>
				确认投注
			</Button>
			<Button
				onClick={() => setIsVisible2(true)}
			>
				长龙投注
			</Button>
			<MobileConfirmBettingDrawer
				className="mobile-confirm-betting-drawer-sample"
				isVisible={isVisible}
				onClose={() => setIsVisible(false)}
				onClickBet={_handleClickBet}
			>
				<div>
					投注注数<span> {12} </span>注
				</div>
				<div>
					下注总额 <DecimalNumber data={50} decimalPlaces={2} hasSeparator/> 元
				</div>
				<div>
					若中獎，單注最高中 <DecimalNumber data={18.21} decimalPlaces={2} hasSeparator/> 元
				</div>
			</MobileConfirmBettingDrawer>
			<MobileConfirmBettingDrawer
				className="mobile-confirm-betting-drawer-sample"
				isVisible={isVisible2}
				onClose={() => setIsVisible2(false)}
				onClickBet={_handleClickBet}
			>
				<div>
					单注金额
					<Select
						options={amountPerBetOptions}
						value={amountPerBet}
						onChange={setAmountPerBet}
					/>
				</div>
				<div>
					投注注数<span> {12} </span>注
				</div>
				<div>
					下注总额 <DecimalNumber data={50} decimalPlaces={2} hasSeparator/> 元
				</div>
			</MobileConfirmBettingDrawer>
		</section>
	);
}

export default MobileConfirmBettingDrawerSample;
