import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'ljit-scroll-selector';

const propTypes = {
	className: PropTypes.string,
	options: PropTypes.arrayOf(PropTypes.string),
	selectedIndex: PropTypes.number,
	onClick: PropTypes.func,
};

const defaultProps = {
	options: [],
	onClick: () => {},
};

function ScrollSelector({
	className,
	options,
	selectedIndex,
	onClick,
}) {

	function _renderSelectedOption(option, index) {
		return (
			<div
				onClick={() => {onClick(index);}}
				key={index}
				className={cx(
					`${PREFIX_CLASS}__option`,
					{ [`${PREFIX_CLASS}__option--active`]: selectedIndex === index, }
				)}
			> {option} </div>
		);
	}

	return (
		<div className={cx(PREFIX_CLASS, className)}>
			{
				options.map((option, index) => _renderSelectedOption(option, index))
			}
		</div>
	);
}

ScrollSelector.propTypes = propTypes;
ScrollSelector.defaultProps = defaultProps;

export default ScrollSelector;
