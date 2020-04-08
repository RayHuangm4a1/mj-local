import React from 'react';
import PropTypes from 'prop-types';
import { TextButton, } from 'ljit-react-components';

const propTypes = {
	isDisabled: PropTypes.bool,
	onClick: PropTypes.func,
};
const defaultProps = {
	isDisabled: false,
	onClick: () => {},
};

const DisableTextButton = ({ isDisabled, onClick, }) => {
	if (isDisabled) {
		return (
			<TextButton text="启用" onClick={onClick}/>
		);
	}
	return (
		<TextButton text="停用" color="danger" onClick={onClick}/>
	);
};

DisableTextButton.propTypes = propTypes;
DisableTextButton.defaultProps = defaultProps;

export default DisableTextButton;
