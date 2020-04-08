import React from 'react';
import PropTypes from 'prop-types';
import { TextButton, } from 'ljit-react-components';

const propTypes = {
	onClick: PropTypes.func,
};
const defaultProps = {
	onClick: () => {},
};

const ModifyTextButton = ({ onClick, }) => (
	<TextButton text="修改" color="default" onClick={onClick}/>
);

ModifyTextButton.propTypes = propTypes;
ModifyTextButton.defaultProps = defaultProps;

export default ModifyTextButton;
