import { DrawingStatusEnums, } from '../../../../lib/enums';

const {
	REWARD_GRANTING,
	REWARD_GRANTED,
	OPENING,
	NOT_OPENING,
	MODIFYING,
	CANCELING,
} = DrawingStatusEnums;

export function getOpencodeColumns(positions = []) {
	return positions.map(({ id, name, }, index) => ({
		title: name,
		dataIndex: `position[${id}]`,
		render: (value, { opencodes, }) => {
			const isNotEmptyOpencodes = opencodes && opencodes.length > 0;

			return isNotEmptyOpencodes ? opencodes[index] : '-';
		},
	}));
}

export function isDrawingProgressing(status) {
	return status === OPENING || status === NOT_OPENING || status === REWARD_GRANTING;
}

export function shouldWaitDrawingUpdate(status) {
	return status === MODIFYING
	|| status === CANCELING
	|| status === REWARD_GRANTING
	|| status === REWARD_GRANTED;
}
