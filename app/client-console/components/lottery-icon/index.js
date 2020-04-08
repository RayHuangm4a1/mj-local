import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from 'ljit-react-components';
import getLotteryImage from '../../images/lotteries';
import './style.styl';

const {
	X_LARGE,
	LARGE,
	MIDDLE,
	SMALL,
	X_SMALL,
} = Icon.SizeEnums;

const propTypes = {
	lotteryCode: PropTypes.string,
	className: PropTypes.string,
	size: PropTypes.oneOf(Object.values(Icon.SizeEnums)),
	style: PropTypes.object,
};
const defaultProps = {
	style: {},
	size: Icon.SizeEnums.MIDDLE,
	className: ''
};
const PREFIX_CLASS = 'ljit-lottery-icon';

function LotteryIcon({
	lotteryCode,
	className,
	size,
	style,
}) {
	return (
		<i
			className={cx('ljit-lottery-icon', className, {
				[`${PREFIX_CLASS}--x-small`]: size === X_SMALL,
				[`${PREFIX_CLASS}--small`]: size === SMALL,
				[`${PREFIX_CLASS}--middle`]: size === MIDDLE,
				[`${PREFIX_CLASS}--large`]: size === LARGE,
				[`${PREFIX_CLASS}--x-large`]: size === X_LARGE,
			})}
			style={style}
		>
			<img src={getLotteryImage(lotteryCode)} alt="lottery-icon"/>
		</i>
	);
}

LotteryIcon.propTypes = propTypes;
LotteryIcon.defaultProps = defaultProps;

export default LotteryIcon;
