import keyBy from 'lodash/fp/keyBy';
import path from 'lodash/fp/path';
import {
	PositionIdEnum,
	positions,
} from './data';

const getId = path('id');

const keyById = keyBy(getId);

const positionsKeyMap = keyById(positions);

const getPosition = (positionId) => {
	const position = positionsKeyMap[positionId];

	if (!position) {
		console.error(`Position doesn't exist with positionId ${positionId}`);
		return;
	}

	return position;
};

export {
	PositionIdEnum,
	getPosition,
};
