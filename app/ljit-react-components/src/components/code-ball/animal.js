import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

export const SizeEnums = {
	DEFAULT_12: 12,
	SMALL_14: 14,
	SMALL_18: 18,
	SMALL_20: 20,
	MEDIUM_22: 22,
	MEDIUM_24: 24,
	MEDIUM_25: 25,
	BIG_32: 32,
};

// TODO: should be as ljit svg components
const AnimalTypeEnums = {
	'0': '🐭',
	'1': '🐂',
	'2': '🐯',
	'3': '🐰',
	'4': '🐲',
	'5': '🐍',
	'6': '🐎',
	'7': '🐑',
	'8': '🐒',
	'9': '🐔',
};

const propTypes = {
	size: PropTypes.oneOf(Object.values(SizeEnums).concat('')),
	text: PropTypes.oneOf(Object.keys(AnimalTypeEnums).concat('')),
	className: PropTypes.string,
	style: PropTypes.object,
};
const defaultProps = {
	size: SizeEnums.MEDIUM_25,
};

const Animal = ({
	size,
	text,
	style,
	className,
} = {}) => {
	return (
		<div className={cx('ljit-code-ball ljit-code-ball--animal', className)} >
			{/* TODO: 等 animal svg component MER 了後改用 component */}
			<div style={{
				width: `${size}px`,
				height: `${size}px`,
				fontSize: '20px',
				...style,
			}}
			>
				{AnimalTypeEnums[text]}
			</div>
		</div>
	);
};

Animal.propTypes = propTypes;
Animal.defaultProps = defaultProps;
Animal.SizeEnums = SizeEnums;

export default Animal;