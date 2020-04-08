import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import logo from '../../images/logo';
import './style.styl';

const SizeEnums = {
	LARGE: 'large',
	MIDDLE: 'middle',
};
const {
	LARGE,
	MIDDLE,
} = SizeEnums;

const propTypes = {
	className: PropTypes.string,
	size: PropTypes.oneOf([LARGE, MIDDLE]),
};
const defaultProps = {
	size: MIDDLE,
	className: ''
};
const PREFIX_CLASS = 'ljit-logo-icon';

function LogoIcon({
	className,
	size,
}) {
	return (
		<i
			className={cx('ljit-logo-icon', className, {
				[`${PREFIX_CLASS}--middle`]: size === MIDDLE,
				[`${PREFIX_CLASS}--large`]: size === LARGE,
			})}
		>
			<img src={logo} alt="logo-icon"/>
		</i>
	);
}

LogoIcon.propTypes = propTypes;
LogoIcon.defaultProps = defaultProps;
LogoIcon.SizeEnums = SizeEnums;

export default LogoIcon;
