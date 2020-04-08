import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Pool from './pool';
import './style.styl';

export const prefixClass = 'header-button-bar';

const propTypes = {
	left: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
	right: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
	className: PropTypes.string,
};

const HeaderButtonBar = ({
	left,
	right,
	className,
}) => (
	<div className={cx(prefixClass, className)}>
		<Pool prefixClass={prefixClass}>
			{left}
		</Pool>
		<Pool prefixClass={prefixClass}>
			{right}
		</Pool>
	</div>
);

HeaderButtonBar.propTypes = propTypes;

export default HeaderButtonBar;
