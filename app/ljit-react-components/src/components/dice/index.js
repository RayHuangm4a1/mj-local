import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-dice';

const {
	IconTypeEnums,
} = Icon;

const propTypes = {
	className: PropTypes.string,
	points: PropTypes.arrayOf(PropTypes.oneOf([1, 2, 3, 4, 5, 6, ])),
};

const defaultProps = {
	points: [],
};

const MAX_DICE_NUMBER = 6;

function Dice({ className, points, }) {
	return (
		<div className={cx(PREFIX_CLASS, className)}>
			{points.map((item, index) => {
				const diceNumber = item > MAX_DICE_NUMBER ? MAX_DICE_NUMBER : item;

				return (
					<Icon
						key={index}
						type={IconTypeEnums[`DICE${diceNumber}`]}
						size={Icon.SizeEnums.X_LARGE}
					/>
				);
			})}
		</div>
	);
}

Dice.propTypes = propTypes;
Dice.defaultProps = defaultProps;

export default Dice;
