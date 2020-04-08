export const PlayClassEnums = {
	STANDARD: 'standard',
	XINYONG: 'xinyong',
	PLANNING: 'planning',
	NUMBER: 'number',
};

const {
	STANDARD,
	XINYONG,
	PLANNING,
	NUMBER,
} = PlayClassEnums;

export const PlayClassMaps = {
	[STANDARD]: {
		name: '官方',
		code: 'standard'
	},
	[XINYONG]: {
		name: '信用',
		code: 'xinyong'
	},
	[PLANNING]: {
		name: '計畫',
		code: 'planning'
	},
	[NUMBER]: {
		name: '做號',
		code: 'number'
	},
};
