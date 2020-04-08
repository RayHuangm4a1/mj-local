import React, { Children, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const propTypes = {
	prefixClass: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
};
const defaultProps = {
	children: [],
};

const HeaderButtonBarPool = ({ prefixClass, children, }) => {
	const poolClass = `${prefixClass}__pool`;
	const itemClass = `${prefixClass}__item`;
	const list = Children.toArray(children);

	return (
		<div
			className={cx(poolClass, {
				[`${poolClass}--empty`]: list.length === 0,
			})}
		>
			{list.map((child, index) => (
				<div key={index} className={itemClass}>
					{child}
				</div>
			))}
		</div>
	);
};

HeaderButtonBarPool.propTypes = propTypes;
HeaderButtonBarPool.defaultProps = defaultProps;

export default HeaderButtonBarPool;
