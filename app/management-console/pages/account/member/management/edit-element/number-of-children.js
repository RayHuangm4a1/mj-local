import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, } from 'ljit-react-components';

const propTypes = {
	numOfUsers: PropTypes.number,
};
const defaultProps = {
	numOfUsers: 0,
};

function NumberOfChildrenEditElemant({ numOfUsers }) {
	return (
		<ListItem
			title="团队人数"
			content={numOfUsers}
		/>
	);
}

NumberOfChildrenEditElemant.propTypes = propTypes;
NumberOfChildrenEditElemant.defaultProps = defaultProps;

export default NumberOfChildrenEditElemant;
