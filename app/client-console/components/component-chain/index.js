import React from 'react';
import PropTypes from 'prop-types';
import DataInlineList from '../data-inline-list';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	components: PropTypes.arrayOf(PropTypes.node).isRequired,
};


function ComponentChain({
	className,
	components,
}) {
	return (
		<DataInlineList
			className={cx('component-chain', className)}
			data={components}
			renderItem={(component) => component}
		/>
	);
}

ComponentChain.propTypes = propTypes;

export default ComponentChain;
