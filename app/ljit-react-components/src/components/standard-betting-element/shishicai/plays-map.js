import {
	QuickTypeEnum,
	BallSizeEnum,
} from '../utils';

const PlaysMap = {
	'五星': {
		'直选复式': {
			id: 1,
			labels: ['万位', '千位', '百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 2,
			configs: {},
		},

		'直选组合': {
			id: 3,
			labels: ['万位', '千位', '百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选120': {
			id: 4,
			labels: ['组选120',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选60': {
			id: 5,
			labels: ['二重号', '单号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选30': {
			id: 6,
			labels: ['二重号', '单号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选20': {
			id: 7,
			labels: ['三重号', '单号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选10': {
			id: 8,
			labels: ['三重号', '二重号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选5': {
			id: 9,
			labels: ['四重号', '单号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'一帆风顺': {
			id: 10,
			labels: ['一帆风顺',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'好事成双': {
			id: 11,
			labels: ['好事成双',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'三星报喜': {
			id: 12,
			labels: ['三星报喜',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'四季发财': {
			id: 13,
			labels: ['四季发财',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'龙虎和': {
			id: 113,
			labels: ['特殊号',],
			configs: {},
		},

		'总和': {
			id: 50001,
			labels: ['特殊号',],
			codes: ['总和大', '总和小', '总和单', '总和双', ],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
				codeBallSize: BallSizeEnum.LARGE,
			},
		},

		'斗牛': {
			id: 115,
			labels: ['特殊号',],
			codes: [
				'牛牛', '牛一', '牛二', '牛三', '牛四', '牛五', '牛六', '牛七',
				'牛八', '牛九', '无牛', '牛大', '牛小', '牛单', '牛双',
				// '牛质', '牛合',
			],
			configs: {},
		},

		'梭哈': {
			id: 116,
			labels: ['特殊号',],
			codes: ['五条', '四条', '三条', '两对', '一对', '葫芦', '顺子', '散号',],
			configs: {
				description: '单挑说明',
			},
		},
	},

	'四星': {
		'直选复式': {
			id: 14,
			labels: ['千位', '百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 15,
			configs: {},
		},

		'直选组合': {
			id: 16,
			labels: ['千位', '百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选24': {
			id: 17,
			labels: ['组24',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选12': {
			id: 18,
			labels: ['二重号', '单号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选6': {
			id: 19,
			labels: ['二重号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选4': {
			id: 20,
			labels: ['三重号', '单号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},
	},

	'后三': {
		'直选复式': {
			id: 21,
			labels: ['百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 22,
			configs: {},
		},

		'直选组合': {
			id: 23,
			labels: ['百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选和值': {
			id: 24,
			labels: ['和值',],
			codes: [
				'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26', '27',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'直选跨度': {
			id: 25,
			labels: ['跨度',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组三复式': {
			id: 26,
			labels: ['组三',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组三单式': {
			id: 27,
			configs: {},
		},

		'组六复式': {
			id: 28,
			labels: ['组六',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组六单式': {
			id: 29,
			configs: {},
		},

		'混合组选': {
			id: 30,
			configs: {},
		},

		'组选和值': {
			id: 31,
			labels: ['组六',],
			codes: [
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'组选包胆': {
			id: 32,
			labels: ['包胆',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'和值尾数': {
			id: 33,
			labels: ['和值位数',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'特殊号': {
			id: 34,
			labels: ['特殊号',],
			codes: ['豹子', '顺子', '对子', '半顺', '杂六',],
			configs: {},
		},
	},

	'中三': {
		'直选复式': {
			id: 35,
			labels: ['千位', '百位', '十位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 36,
			configs: {},
		},

		'直选组合': {
			id: 37,
			labels: ['千位', '百位', '十位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选和值': {
			id: 38,
			labels: ['和值',],
			codes: [
				'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26', '27',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'直选跨度': {
			id: 39,
			labels: ['跨度',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组三复式': {
			id: 40,
			labels: ['组三',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组三单式': {
			id: 41,
			configs: {},
		},

		'组六复式': {
			id: 42,
			labels: ['组六',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组六单式': {
			id: 43,
			configs: {},
		},

		'混合组选': {
			id: 44,
			configs: {},
		},

		'组选和值': {
			id: 45,
			labels: ['和值',],
			codes: [
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'组选包胆': {
			id: 46,
			labels: ['包胆',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'和值尾数': {
			id: 47,
			labels: ['和值位数',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'特殊号': {
			id: 48,
			labels: ['特殊号',],
			codes: ['豹子', '顺子', '对子', '半顺', '杂六',],
			configs: {},
		},
	},

	'前三': {
		'直选复式': {
			id: 49,
			labels: ['万位', '千位', '百位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 50,
			configs: {},
		},

		'直选组合': {
			id: 51,
			labels: ['万位', '千位', '百位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选和值': {
			id: 52,
			labels: ['和值',],
			codes: [
				'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26', '27',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'直选跨度': {
			id: 53,
			labels: ['跨度',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组三复式': {
			id: 54,
			labels: ['组三',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组三单式': {
			id: 55,
			configs: {},
		},

		'组六复式': {
			id: 56,
			labels: ['组六',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组六单式': {
			id: 57,
			configs: {},
		},

		'混合组选': {
			id: 58,
			configs: {},
		},

		'组选和值': {
			id: 59,
			labels: ['和值',],
			codes: [
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'组选包胆': {
			id: 60,
			labels: ['包胆',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'和值尾数': {
			id: 61,
			labels: ['和值位数',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'特殊号': {
			id: 62,
			labels: ['特殊号',],
			codes: ['豹子', '顺子', '对子', '半顺', '杂六',],
			configs: {},
		},
	},

	'后二': {
		'直选复式': {
			id: 63,
			labels: ['十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 64,
			configs: {},
		},

		'直选和值': {
			id: 65,
			labels: ['和值',],
			codes: [
				'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'直选跨度': {
			id: 66,
			labels: ['跨度',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选复式': {
			id: 67,
			labels: ['组选',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选单式': {
			id: 68,
			configs: {},
		},

		'组选和值': {
			id: 69,
			labels: ['和值',],
			codes: [
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'组选包胆': {
			id: 70,
			labels: ['包胆',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},
	},

	'前二': {
		'直选复式': {
			id: 71,
			labels: ['万位', '千位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 72,
			configs: {},
		},

		'直选和值': {
			id: 73,
			labels: ['和值',],
			codes: [
				'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'直选跨度': {
			id: 74,
			labels: ['跨度',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选复式': {
			id: 75,
			labels: ['组选',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'组选单式': {
			id: 76,
			configs: {},
		},

		'组选和值': {
			id: 77,
			labels: ['和值',],
			codes: [
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17',
			],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'组选包胆': {
			id: 78,
			labels: ['包胆',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},
	},

	'定位胆': {
		'定位胆': {
			id: 79,
			labels: ['万位', '千位', '百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},
	},

	'不定位': {
		'后三一码': {
			id: 80,
			labels: ['不定位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'前三一码': {
			id: 81,
			labels: ['不定位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'后三二码': {
			id: 82,
			labels: ['不定位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'前三二码': {
			id: 83,
			labels: ['不定位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'四星一码': {
			id: 84,
			labels: ['不定位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'四星二码': {
			id: 85,
			labels: ['不定位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'五星二码': {
			id: 86,
			labels: ['不定位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'五星三码': {
			id: 87,
			labels: ['不定位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},
	},

	'大小单双': {
		'前二': {
			id: 88,
			labels: ['万位', '千位',],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'后二': {
			id: 89,
			labels: ['十位', '个位',],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'前三': {
			id: 90,
			labels: ['万位', '千位', '百位',],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'后三': {
			id: 91,
			labels: ['百位', '十位', '个位',],
			codes: ['大', '小', '单', '双',],
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},
	},

	'任二': {
		'直选复式': {
			id: 92,
			labels: ['万位', '千位', '百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 93,
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: false,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 2,
			},
		},

		'直选和值': {
			id: 94,
			labels: ['和值',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: false,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 2,
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'组选复式': {
			id: 95,
			labels: ['组选',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: false,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 2,
			},
		},

		'组选单式': {
			id: 96,
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: false,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
			},
		},

		'组选和值': {
			id: 97,
			labels: ['和值',],
			codes: [
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17',
			],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: false,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 2,
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'龙虎和': {
			id: 117,
			labels: ['特殊号',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: false,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 2,
			},
		},
	},

	'任三': {
		'直选复式': {
			id: 98,
			labels: ['万位', '千位', '百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 99,
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 3,
			},
		},

		'直选和值': {
			id: 100,
			labels: ['和值',],
			codes: [
				'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26', '27',
			],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 3,
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},

		'组三复式': {
			id: 101,
			labels: ['组三',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 3,
			},
		},

		'组三单式': {
			id: 102,
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 3,
			},
		},

		'组六复式': {
			id: 103,
			labels: ['组六',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 3,
			},
		},

		'组六单式': {
			id: 104,
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 3,
			},
		},

		'混合组选': {
			id: 105,
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 3,
			},
		},

		'组选和值': {
			id: 106,
			labels: ['和值',],
			codes: [
				'1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
				'11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
				'21', '22', '23', '24', '25', '26',
			],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: false,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 3,
				quickOptions: [
					QuickTypeEnum.NONE,
				],
			},
		},
	},

	'任四': {
		'直选复式': {
			id: 107,
			labels: ['万位', '千位', '百位', '十位', '个位',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {},
		},

		'直选单式': {
			id: 108,
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: true,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 4,
			},
		},

		'组选24': {
			id: 109,
			labels: ['组24',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: true,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 4,
			},
		},

		'组选12': {
			id: 110,
			labels: ['二重号', '单号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: true,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 4,
			},
		},

		'组选6': {
			id: 111,
			labels: ['二重号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: true,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 4,
			},
		},

		'组选4': {
			id: 112,
			labels: ['三重号', '单号',],
			codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
			configs: {
				positions: [
					{
						name: '万位',
						isSelected: false,
					},
					{
						name: '千位',
						isSelected: true,
					},
					{
						name: '百位',
						isSelected: true,
					},
					{
						name: '十位',
						isSelected: true,
					},
					{
						name: '个位',
						isSelected: true,
					},
				],
				minPositionCount: 4,
			},
		},
	},
};

export default PlaysMap;
