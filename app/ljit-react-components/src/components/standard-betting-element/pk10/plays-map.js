import {
	QuickTypeEnum,
} from '../utils';
import {
	PK10_TEXT_INPUT_PLACEHOLDER,
	generatePk10FilterData,
} from './utils';

const PlaysMap = {
	'定位胆': {
		'定位胆': {
			id: 601,
			labels: ['冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', ],
			configs: {
				codeSplitter: ' ',
			},
		},
	},
	'前一': {
		'直选复式': {
			id: 74000,
			labels: ['冠', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', ],
			configs: {
				codeSplitter: ' ',
			},
		},
	},
	'前二': {
		'直选复式': {
			id: 603,
			labels: ['冠', '亚', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'直选单式': {
			id: 604,
			configs: {
				placeholder: PK10_TEXT_INPUT_PLACEHOLDER,
				filterData: generatePk10FilterData,
			},
		},
	},
	'前三': {
		'直选复式': {
			id: 605,
			labels: ['冠', '亚', '季', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'直选单式': {
			id: 606,
			configs: {
				placeholder: PK10_TEXT_INPUT_PLACEHOLDER,
				filterData: generatePk10FilterData,
			},
		},
	},
	'前四': {
		'直选复式': {
			id: 607,
			labels: ['冠', '亚', '季', '四', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'直选单式': {
			id: 608,
			configs: {
				placeholder: PK10_TEXT_INPUT_PLACEHOLDER,
				filterData: generatePk10FilterData,
			},
		},
	},
	'前五': {
		'直选复式': {
			id: 609,
			labels: ['冠', '亚', '季', '四', '五', ],
			codes: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', ],
			configs: {
				codeSplitter: ' ',
			},
		},
		'直选单式': {
			id: 610,
			configs: {
				placeholder: PK10_TEXT_INPUT_PLACEHOLDER,
				filterData: generatePk10FilterData,
			},
		},
	},
	'和值': {
		'冠亚和值': {
			id: 74001,
			labels: ['和值', ],
			codes: [
				'3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.ALL,
					QuickTypeEnum.ODD,
					QuickTypeEnum.EVEN,
					QuickTypeEnum.NONE,
				],
				codeSplitter: ' ',
			},
		},
		'首尾和值': {
			id: 74002,
			labels: ['和值', ],
			codes: [
				'3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.ALL,
					QuickTypeEnum.ODD,
					QuickTypeEnum.EVEN,
					QuickTypeEnum.NONE,
				],
				codeSplitter: ' ',
			},
		},
		'前三和值': {
			id: 74003,
			labels: ['和值', ],
			codes: [
				'6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26', '27', 
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.ALL,
					QuickTypeEnum.ODD,
					QuickTypeEnum.EVEN,
					QuickTypeEnum.NONE,
				],
				codeSplitter: ' ',
			},
		},
		'后三和值': {
			id: 74004,
			labels: ['和值', ],
			codes: [
				'6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26', '27', 
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.ALL,
					QuickTypeEnum.ODD,
					QuickTypeEnum.EVEN,
					QuickTypeEnum.NONE,
				],
				codeSplitter: ' ',
			},
		},
		'首尾和值大小单双': {
			id: 616,
			labels: ['首尾和值', ],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [],
				codeSplitter: ' ',
			},
		},
		'冠亚和值大小单双': {
			id: 617,
			labels: ['冠亚和值', ],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [],
				codeSplitter: ' ',
			},
		},
		'前三和值大小单双': {
			id: 618,
			labels: ['前三和值', ],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [],
				codeSplitter: ' ',
			},
		},
		'后三和值大小单双': {
			id: 619,
			labels: ['后三和值', ],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [],
				codeSplitter: ' ',
			},
		},
	},
	'特殊': {
		'任选龙虎': {
			id: 615,
			labels: ['特殊', ],
			configs: {
				codes: ['龙', '虎', ],
				positions: [
					{
						name: '一',
						isSelected: false,
					},
					{
						name: '二',
						isSelected: false,
					},
					{
						name: '三',
						isSelected: false,
					},
					{
						name: '四',
						isSelected: false,
					},
					{
						name: '五',
						isSelected: false,
					},
					{
						name: '六',
						isSelected: false,
					},
					{
						name: '七',
						isSelected: false,
					},
					{
						name: '八',
						isSelected: false,
					},
					{
						name: '九',
						isSelected: true,
					},
					{
						name: '十',
						isSelected: true,
					},
				],
				minPositionCount: 2,
				codeSplitter: ' ',
			},
		},
	},
};

export default PlaysMap;
