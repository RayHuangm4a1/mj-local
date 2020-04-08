import XinYongBettingCard from '../../../xin-yong-betting-card';
const {
	RECTANGLE,
} = XinYongBettingCard.TypeEnums;

// TODO add 连码, 直选

const PlayConditionIdMap = {
	'两面': 151,
	'单号': 152,
};
const PlaySubconditionIdMap = {
	'两面': {
		'总和': 151001,
		'第一球': 151002,
		'第二球': 151003,
		'第三球': 151004,
		'第四球': 151005,
		'第五球': 151006,
	},
	'单号': {
		'一中一': 152001,
		'第一球': 152002,
		'第二球': 152003,
		'第三球': 152004,
		'第四球': 152005,
		'第五球': 152006,
	},
};
const PlaysMap = {
	'两面': {
		'总和': [
			{
				name: '总和大',
				id: 63028,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和小',
				id: 63029,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和单',
				id: 63030,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和双',
				id: 63031,
				playSlotType: RECTANGLE,
			},
			{
				name: '总尾大',
				id: 63032,
				playSlotType: RECTANGLE,
			},
			{
				name: '总尾小',
				id: 63033,
				playSlotType: RECTANGLE,
			},
		],
		'第一球': [
			{
				name: '大',
				id: 63008,
			},
			{
				name: '小',
				id: 63009,
			},
			{
				name: '单',
				id: 63010,
			},
			{
				name: '双',
				id: 63011,
			},
		],
		'第二球': [
			{
				name: '大',
				id: 63012,
			},
			{
				name: '小',
				id: 63013,
			},
			{
				name: '单',
				id: 63014,
			},
			{
				name: '双',
				id: 63015,
			},
		],
		'第三球': [
			{
				name: '大',
				id: 63016,
			},
			{
				name: '小',
				id: 63017,
			},
			{
				name: '单',
				id: 63018,
			},
			{
				name: '双',
				id: 63019,
			},
		],
		'第四球': [
			{
				name: '大',
				id: 63020,
			},
			{
				name: '小',
				id: 63021,
			},
			{
				name: '单',
				id: 63022,
			},
			{
				name: '双',
				id: 63023,
			},
		],
		'第五球': [
			{
				name: '大',
				id: 63004,
			},
			{
				name: '小',
				id: 63005,
			},
			{
				name: '单',
				id: 63006,
			},
			{
				name: '双',
				id: 63007,
			},
		],
	},
	'单号': {
		'一中一': [
			{
				name: '01',
				id: 63223,
			},
			{
				name: '02',
				id: 63224,
			},
			{
				name: '03',
				id: 63225,
			},
			{
				name: '04',
				id: 63226,
			},
			{
				name: '05',
				id: 63227,
			},
			{
				name: '06',
				id: 63228,
			},
			{
				name: '07',
				id: 63229,
			},
			{
				name: '08',
				id: 63230,
			},
			{
				name: '09',
				id: 63231,
			},
			{
				name: '10',
				id: 63232,
			},
			{
				name: '11',
				id: 63233,
			},
		],
		'第一球': [
			{
				name: '01',
				id: 63071,
			},
			{
				name: '02',
				id: 63072,
			},
			{
				name: '03',
				id: 63073,
			},
			{
				name: '04',
				id: 63074,
			},
			{
				name: '05',
				id: 63075,
			},
			{
				name: '06',
				id: 63076,
			},
			{
				name: '07',
				id: 63077,
			},
			{
				name: '08',
				id: 63078,
			},
			{
				name: '09',
				id: 63079,
			},
			{
				name: '10',
				id: 63080,
			},
			{
				name: '11',
				id: 63081,
			},
		],
		'第二球': [
			{
				name: '01',
				id: 63104,
			},
			{
				name: '02',
				id: 63105,
			},
			{
				name: '03',
				id: 63106,
			},
			{
				name: '04',
				id: 63107,
			},
			{
				name: '05',
				id: 63108,
			},
			{
				name: '06',
				id: 63109,
			},
			{
				name: '07',
				id: 63110,
			},
			{
				name: '08',
				id: 63111,
			},
			{
				name: '09',
				id: 63112,
			},
			{
				name: '10',
				id: 63113,
			},
			{
				name: '11',
				id: 63114,
			},
		],
		'第三球': [
			{
				name: '01',
				id: 63137,
			},
			{
				name: '02',
				id: 63138,
			},
			{
				name: '03',
				id: 63139,
			},
			{
				name: '04',
				id: 63140,
			},
			{
				name: '05',
				id: 63141,
			},
			{
				name: '06',
				id: 63142,
			},
			{
				name: '07',
				id: 63143,
			},
			{
				name: '08',
				id: 63144,
			},
			{
				name: '09',
				id: 63145,
			},
			{
				name: '10',
				id: 63146,
			},
			{
				name: '11',
				id: 63147,
			},
		],
		'第四球': [
			{
				name: '01',
				id: 63170,
			},
			{
				name: '02',
				id: 63171,
			},
			{
				name: '03',
				id: 63172,
			},
			{
				name: '04',
				id: 63173,
			},
			{
				name: '05',
				id: 63174,
			},
			{
				name: '06',
				id: 63175,
			},
			{
				name: '07',
				id: 63176,
			},
			{
				name: '08',
				id: 63177,
			},
			{
				name: '09',
				id: 63178,
			},
			{
				name: '10',
				id: 63179,
			},
			{
				name: '11',
				id: 63180,
			},
		],
		'第五球': [
			{
				name: '01',
				id: 63034,
			},
			{
				name: '02',
				id: 63035,
			},
			{
				name: '03',
				id: 63036,
			},
			{
				name: '04',
				id: 63037,
			},
			{
				name: '05',
				id: 63038,
			},
			{
				name: '06',
				id: 63039,
			},
			{
				name: '07',
				id: 63040,
			},
			{
				name: '08',
				id: 63041,
			},
			{
				name: '09',
				id: 63042,
			},
			{
				name: '10',
				id: 63043,
			},
			{
				name: '11',
				id: 63044,
			},
		],
	},
};

export default {
	PlayConditionIdMap,
	PlaySubconditionIdMap,
	PlaysMap,
};
