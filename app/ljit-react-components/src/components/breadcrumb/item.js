import React from 'react';
import PropTypes from 'prop-types';
import { BreadcrumbsItem, } from 'react-breadcrumbs-dynamic';
import cx from 'classnames';
import omit from 'lodash/omit';
import { prefixClass, } from './';

const propTypes = {
	to: PropTypes.string.isRequired,
	isActive: PropTypes.bool,
	isVisible: PropTypes.bool,
};
const defaultProps = {
	isActive: true,
	isVisible: true,
};

const Item = (props) => {
	const itemClass = `${prefixClass}__item`;
	const itemProps = omit(props, [ 'isActive', 'isVisible', ]);
	const { isActive, isVisible, } = props;

	if (!isVisible) {
		return null;
	}
	return (
		<BreadcrumbsItem
			{...itemProps}
			to={itemProps.to}
			data-isactive={isActive}
			className={cx(itemClass, {
				[`${itemClass}--active`]: isActive === true,
				[`${itemClass}--inactive`]: isActive === false,
			})}
		/>
	);
};

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;

export default Item;
