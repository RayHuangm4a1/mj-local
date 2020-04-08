import {
	QuickTypeEnum,
	BallSizeEnum,
} from '../utils';
import {
	DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
	getDanTouNextData,
	generate11x5FilterData,
} from './utils';

const PlaysMap = {
	'前三': {
		'直选复式': {
			id: 201,
			labels: ['第一位', '第二位', '第三位', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'直选单式': {
			id: 202,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'组选复式': {
			id: 203,
			labels: ['组选', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'组选单式': {
			id: 204,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'组选胆拖': {
			id: 205,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(3, index1, index2, data),
			},
		},
	},
	'前二': {
		'直选复式': {
			id: 206,
			labels: ['第一位', '第二位', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'直选单式': {
			id: 207,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'组选复式': {
			id: 208,
			labels: ['组选', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'组选单式': {
			id: 209,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'组选胆拖': {
			id: 210,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(2, index1, index2, data),
			},
		},
	},
	'不定位': {
		'前三不定位': {
			id: 211,
			labels: ['前三位', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
	},
	'定位胆': {
		'前三定位胆': {
			id: 212,
			labels: ['第一位', '第二位', '第三位', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
	},
	'趣味型': {
		'定单双': {
			id: 213,
			labels: ['定单双', ],
			codes: ['5单0双', '4单1双', '3单2双', '2单3双', '1单4双', '0单5双', ],
			configs: {
				codeBallSize: BallSizeEnum.LARGE,
				codeSplitter: ' ',
			},
		},
		'猜中位': {
			id: 60000,
			labels: ['猜中位', ],
			codes: ['3', '4', '5', '6', '7', '8', '9',],
			configs: {
				codeSplitter: ' ',
			},
		},
	},
	'任选复式': {
		'一中一': {
			id: 215,
			labels: ['一中一', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'二中二': {
			id: 216,
			labels: ['二中二', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'三中三': {
			id: 217,
			labels: ['三中三', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'四中四': {
			id: 218,
			labels: ['四中四', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'五中五': {
			id: 219,
			labels: ['五中五', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'六中五': {
			id: 220,
			labels: ['六中五', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'七中五': {
			id: 221,
			labels: ['七中五', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'八中五': {
			id: 222,
			labels: ['八中五', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
			},
		},
	},
	'任选单式': {
		'一中一': {
			id: 223,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'二中二': {
			id: 224,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'三中三': {
			id: 225,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'四中四': {
			id: 226,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'五中五': {
			id: 227,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'六中五': {
			id: 228,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'七中五': {
			id: 229,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
		'八中五': {
			id: 230,
			configs: {
				placeholder: DEFAULT_11X5_TEXT_INPUT_PLACEHOLDER,
				filterData: generate11x5FilterData,
			},
		},
	},
	'任选胆拖': {
		'二中二': {
			id: 231,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(2, index1, index2, data),
			},
		},
		'三中三': {
			id: 232,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(3, index1, index2, data),
			},
		},
		'四中四': {
			id: 233,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(4, index1, index2, data),
			},
		},
		'五中五': {
			id: 234,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(5, index1, index2, data),
			},
		},
		'六中五': {
			id: 235,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(6, index1, index2, data),
			},
		},
		'七中五': {
			id: 236,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(7, index1, index2, data),
			},
		},
		'八中五': {
			id: 237,
			labels: ['胆码', '拖码', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', ],
			configs: {
				codeSplitter: ' ',
				getNextData: (index1, index2, data) => getDanTouNextData(8, index1, index2, data),
			},
		},
	},
};

export default PlaysMap;
