import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckSelector } from 'ljit-react-components';
import { PREFIX_CLASS } from '../';
import { get, convertToOptions, } from './utils';

const propTypes = {
	// TODO 確認資料結構
	lotteryClasses: PropTypes.array,
	lotteries: PropTypes.object,
	selectedLotteryGroup: PropTypes.object,
	onChangeLottery: PropTypes.func,
};

const defaultProps = {
	lotteryClasses: [],
	lotteries: {},
	selectedLotteryGroup: {},
	onChangeLottery: () => {},
};

function LotterySelector({
	lotteryClasses,
	lotteries,
	selectedLotteryGroup,
	onChangeLottery,
}) {
	const [lotteryClassId, setLotteryClassId] = useState();
	const [lotteryId, setLotteryId] = useState();

	useEffect(() => {
		const { lotteryClassId, lotteryId } = selectedLotteryGroup;

		setLotteryClassId(lotteryClassId);
		setLotteryId(lotteryId);
	},[selectedLotteryGroup.lotteryId]);

	const lotteryClassOptions = convertToOptions(lotteryClasses);
	const lotteryOptions = convertToOptions(lotteries[lotteryClassId] || []);

	function _handleChangeLottery(lotteryId) {
		const lottery = get(lotteryOptions, lotteryId);

		onChangeLottery({ lotteryClassId, lotteryId }, lottery.name);
	}

	return (
		<div className={`${PREFIX_CLASS}__lottery-selector`}>
			<CheckSelector
				source={lotteryClassOptions}
				activeIds={[lotteryClassId]}
				onChange={setLotteryClassId}
			/>
			<CheckSelector
				source={lotteryOptions}
				backgroundColor={CheckSelector.BackgroundColorEnums.WHITE}
				checkedIds={[lotteryId]}
				onChange={_handleChangeLottery}
			/>
		</div>
	);
}

LotterySelector.propTypes = propTypes;
LotterySelector.defaultProps = defaultProps;

export default LotterySelector;
