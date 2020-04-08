import React, { useState, } from 'react';
import MobileBettingAmountSelectBlock from '../../../components/mobile-betting-amout-select-block';

const MobileBettingAmountSelectBlockSample = () => {
	const [amountPerBet, setAmountPerBet] = useState(2);
	const [multiple, setMultiple] = useState(1);

	return (
		<MobileBettingAmountSelectBlock
			onClickClearAll={() => console.log('click clear')}
			onClickRefreshBalance={() => console.log('click refresh balance')}
			amountPerBet={amountPerBet}
			onChangeAmountPerBet={(amountPerBet) => setAmountPerBet(amountPerBet)}
			multiple={multiple}
			onChangeMultiple={setMultiple}
		/>
	);
};

export default MobileBettingAmountSelectBlockSample;
