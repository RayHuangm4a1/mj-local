import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const PREFIX_CLASS = 'icon-tag';

const SelectedStyleEnums = {
	BOLD: 'bold',
	OUTLINE: 'outline',
};

const { BOLD, OUTLINE } = SelectedStyleEnums;

const propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func,
	isSelected: PropTypes.bool,
	selectedStyle: PropTypes.oneOf([BOLD, OUTLINE]),
};

const defaultProps = {
	onClick: () => {},
	isSelected: false,
	selectedStyle: OUTLINE,
};

function IconTag({ text, onClick, isSelected, selectedStyle }) {
	return (
		<div
			className={cx(PREFIX_CLASS, { [`${PREFIX_CLASS}--${selectedStyle}-selected`]: isSelected })}
			onClick={onClick}
		>
			<div className={`${PREFIX_CLASS}__icon`}></div>
			<div className={`${PREFIX_CLASS}__text`}> {text} </div>
		</div>
	);
}

IconTag.propTypes = propTypes;
IconTag.defaultProps = defaultProps;
IconTag.SelectedStyleEnums = SelectedStyleEnums;

export default IconTag;
