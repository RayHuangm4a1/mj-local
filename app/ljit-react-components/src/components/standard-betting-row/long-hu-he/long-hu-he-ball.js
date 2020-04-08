import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icon';

const {
	HE_BALL,
	SELECTED_HE_BALL,
	TIGER_BALL,
	SELECTED_TIGER_BALL,
	DRAGON_BALL,
	SELECTED_DRAGON_BALL,
} = Icon.IconTypeEnums;

const LongHuHeBallEnums = {
	'龙': { normal: DRAGON_BALL, selected: SELECTED_DRAGON_BALL, },
	'虎': { normal: TIGER_BALL, selected: SELECTED_TIGER_BALL, },
	'和': { normal: HE_BALL, selected: SELECTED_HE_BALL, },
};

const propTypes = {
	ballType: PropTypes.string,
	isSelected: PropTypes.bool,
	onClick: PropTypes.func,
};

const defaultProps = {
	isSelected: false,
	onClick: () => {},
};

function LongHuHeBall({ ballType, isSelected, onClick, }) {
	const iconType = isSelected ? LongHuHeBallEnums[ballType].selected :
		LongHuHeBallEnums[ballType].normal;

	return (
		<div
			className={'ljit-long-hu-he__ball-style'}
			onClick={onClick}
		>
			<Icon type={iconType} />
		</div>
	);
}

LongHuHeBall.propTypes = propTypes;
LongHuHeBall.defaultProps = defaultProps;

export default LongHuHeBall;
