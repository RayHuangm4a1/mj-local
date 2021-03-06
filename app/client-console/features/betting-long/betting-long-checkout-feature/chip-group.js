import React from 'react';
import PropTypes from 'prop-types';
import { ChipButton, } from 'ljit-react-components';
import cx from 'classnames';
export const PREFIX_CLASS = 'betting-long-checkout__chip';

const propTypes = {
	onClick: PropTypes.func,
	className: PropTypes.string,
};

const defaultProps = {
	onClick: () => {},
	className: '',
};

const ChipTypes = [
	ChipButton.TypeEnums.VALUE_1,
	ChipButton.TypeEnums.VALUE_2,
	ChipButton.TypeEnums.VALUE_5,
	ChipButton.TypeEnums.VALUE_10,
	ChipButton.TypeEnums.VALUE_20,
	ChipButton.TypeEnums.VALUE_1K,
];

function ChipGroup({ onClick, className, }) {
	return (
		<div className={cx(PREFIX_CLASS, className)}>
			{
				ChipTypes.map(item =>
					<ChipButton key={`ljit-chip-button-${item}`} type={item} onClick={() => { onClick(item); }}
					/>
				)}
		</div>
	);
}

ChipGroup.propTypes = propTypes;
ChipGroup.defaultProps = defaultProps;

export default ChipGroup;
