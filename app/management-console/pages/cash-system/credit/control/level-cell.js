import React from 'react';
import PropTypes from 'prop-types';
import { getLevelsElementList, } from './utils';

const propTypes = {
	levels: PropTypes.array,
};
const defaultProps = {
	levels: [],
};

const LevelCell = ({ levels, }) => {
	const levelsElementList = getLevelsElementList(levels);

	return (
		<div style={{ minWidth: '42px' }}>
			{levelsElementList}
		</div>
	);
};

LevelCell.propTypes = propTypes;
LevelCell.defaultProps = defaultProps;

export default LevelCell;
