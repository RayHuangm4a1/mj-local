import React, { memo, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	prefixClass: PropTypes.string.isRequired,
	children: PropTypes.any.isRequired,
	onClick: PropTypes.func,
};

const DataInlineListItem = memo(({
	prefixClass,
	children,
	onClick = () => {},
}) => (
	<li
		className={`${prefixClass}__list-item`}
		onClick={onClick}
	>
		{children}
	</li>
));

DataInlineListItem.propTypes = propTypes;

export default DataInlineListItem;
