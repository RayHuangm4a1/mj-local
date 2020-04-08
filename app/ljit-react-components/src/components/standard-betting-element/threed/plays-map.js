import {
	DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
	generateThreedFilterData,
} from './utils';
import {
	QuickTypeEnum,
	BallSizeEnum,
} from '../utils';

const PlaysMap = {
	'三星': {
		'直选复式': {
			id: 301,
			labels: ['百位', '十位', '个位', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
		'直选单式': {
			id: 302,
			configs: {
				placeholder: DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
				filterData: generateThreedFilterData,
			},
		},
		'直选和值': {
			id: 303,
			labels: ['和值', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', ],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},
		'组三复式': {
			id: 304,
			labels: ['组三', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
		'组三单式': {
			id: 305,
			configs: {
				placeholder: DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
				filterData: generateThreedFilterData,
			},
		},
		'组六复式': {
			id: 306,
			labels: ['组六', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
		'组六单式': {
			id: 307,
			configs: {
				placeholder: DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
				filterData: generateThreedFilterData,
			},
		},
		'混合组选': {
			id: 308,
			configs: {
				placeholder: DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
				filterData: generateThreedFilterData,
			},
		},
		'组选和值': {
			id: 309,
			labels: ['和值', ],
			codes: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', ],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},
	},
	'前二': {
		'直选复式': {
			id: 310,
			labels: ['百位', '十位', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
		'直选单式': {
			id: 311,
			configs: {
				placeholder: DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
				filterData: generateThreedFilterData,
			},
		},
		'组选复式': {
			id: 314,
			labels: ['组选', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
		'组选单式': {
			id: 315,
			configs: {
				placeholder: DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
				filterData: generateThreedFilterData,
			},
		},
	},
	'后二': {
		'直选复式': {
			id: 312,
			labels: ['十位', '个位', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
		'直选单式': {
			id: 313,
			configs: {
				placeholder: DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
				filterData: generateThreedFilterData,
			},
		},
		'组选复式': {
			id: 316,
			labels: ['组选', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
		'组选单式': {
			id: 317,
			configs: {
				placeholder: DEFAULT_THREED_TEXT_INPUT_PLACEHOLDER,
				filterData: generateThreedFilterData,
			},
		},
	},
	'大小单双': {
		'前二': {
			id: 321,
			labels: ['百位', '十位', ],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [],
			},
		},
		'后二': {
			id: 322,
			labels: ['十位', '个位', ],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [],
			},
		},
	},
	'定位胆': {
		'定位胆': {
			id: 318,
			labels: ['百位', '十位', '个位', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
	},
	'不定位': {
		'一码不定位': {
			id: 319,
			labels: ['一码', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
		'二码不定位': {
			id: 320,
			labels: ['二码', ],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
			configs: {},
		},
	},
};

export default PlaysMap;
