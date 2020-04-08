import React from 'react';
import Dice from '../../../dice';
import { drawingInfoCardElementSharingPropTypes, } from '../../utils';

const propTypes = {
	...drawingInfoCardElementSharingPropTypes,
};

const PREFIX_CLASS = 'drawing-info-card-code-ball-dice';

function DrawingInfoCardCodeBallDice({
	splitOpencodes,
}) {
	if (splitOpencodes) {
		const points = splitOpencodes.map(str => Number(str));

		return (
			<Dice
				points={points}
				className={PREFIX_CLASS}
			/>
		);
	} else {
		return null;
	}
}

DrawingInfoCardCodeBallDice.propTypes = propTypes;

export default DrawingInfoCardCodeBallDice;
