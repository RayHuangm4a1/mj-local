import XinYongBettingCard from '../../../xin-yong-betting-card';
const {
	RECTANGLE,
} = XinYongBettingCard.TypeEnums;

const PlayConditionIdMap = {
	'整合': 15,
	'第一球': 16,
	'第二球': 17,
	'第三球': 18,
	'第四球': 19,
	'第五球': 20,
	'单码': 21,
	'连码': 22,
	'斗牛': 23,
};
const PlaySubconditionIdMap = {
	'整合': {
		'总和-龙虎和': 15001,
		'第一球': 15002,
		'第二球': 15003,
		'第三球': 15004,
		'第四球': 15005,
		'第五球': 15006,
		'前三': 15007,
		'中三': 15008,
		'后三': 15009,
	},
	'第一球': {
		'第一球': 16001,
		'总和-龙虎和': 16002,
		'前三': 16003,
		'中三': 16004,
		'后三': 16005,
	},
	'第二球': {
		'第二球': 17001,
		'总和-龙虎和': 17002,
		'前三': 17003,
		'中三': 17004,
		'后三': 17005,
	},
	'第三球': {
		'第三球': 18001,
		'总和-龙虎和': 18002,
		'前三': 18003,
		'中三': 18004,
		'后三': 18005,
	},
	'第四球': {
		'第四球': 19001,
		'总和-龙虎和': 19002,
		'前三': 19003,
		'中三': 19004,
		'后三': 19005,
	},
	'第五球': {
		'第五球': 20001,
		'总和-龙虎和': 20002,
		'前三': 20003,
		'中三': 20004,
		'后三': 20005,
	},
	'单码': {
		'单码': 21001,
	},
	'连码': {
		'连码': 22001,
	},
	'斗牛': {
		'斗牛': 23001,
	},
};
const PlaysMap = {
	'整合': {
		'总和-龙虎和': [
			{
				name: '总和大',
				id: 53112,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和小',
				id: 53113,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和单',
				id: 53114,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和双',
				id: 53115,
				playSlotType: RECTANGLE,
			},
			{
				name: '龙',
				id: 53156,
			},
			{
				name: '虎',
				id: 53157,
			},
			{
				name: '和',
				id: 53158,
			},
		],
		'第一球': [
			{
				name: '大',
				id: 53000,
			},
			{
				name: '小',
				id: 53001,
			},
			{
				name: '单',
				id: 53002,
			},
			{
				name: '双',
				id: 53003,
			},
			{
				name: '0',
				id: 53004,
			},
			{
				name: '1',
				id: 53005,
			},
			{
				name: '2',
				id: 53006,
			},
			{
				name: '3',
				id: 53007,
			},
			{
				name: '4',
				id: 53008,
			},
			{
				name: '5',
				id: 53009,
			},
			{
				name: '6',
				id: 53010,
			},
			{
				name: '7',
				id: 53011,
			},
			{
				name: '8',
				id: 53012,
			},
			{
				name: '9',
				id: 53013,
			},
		],
		'第二球': [
			{
				name: '大',
				id: 53014,
			},
			{
				name: '小',
				id: 53015,
			},
			{
				name: '单',
				id: 53016,
			},
			{
				name: '双',
				id: 53017,
			},
			{
				name: '0',
				id: 53018,
			},
			{
				name: '1',
				id: 53019,
			},
			{
				name: '2',
				id: 53020,
			},
			{
				name: '3',
				id: 53021,
			},
			{
				name: '4',
				id: 53022,
			},
			{
				name: '5',
				id: 53023,
			},
			{
				name: '6',
				id: 53024,
			},
			{
				name: '7',
				id: 53025,
			},
			{
				name: '8',
				id: 53026,
			},
			{
				name: '9',
				id: 53027,
			},
		],
		'第三球': [
			{
				name: '大',
				id: 53028,
			},
			{
				name: '小',
				id: 53029,
			},
			{
				name: '单',
				id: 53030,
			},
			{
				name: '双',
				id: 53031,
			},
			{
				name: '0',
				id: 53032,
			},
			{
				name: '1',
				id: 53033,
			},
			{
				name: '2',
				id: 53034,
			},
			{
				name: '3',
				id: 53035,
			},
			{
				name: '4',
				id: 53036,
			},
			{
				name: '5',
				id: 53037,
			},
			{
				name: '6',
				id: 53038,
			},
			{
				name: '7',
				id: 53039,
			},
			{
				name: '8',
				id: 53040,
			},
			{
				name: '9',
				id: 53041,
			},
		],
		'第四球': [
			{
				name: '大',
				id: 53042,
			},
			{
				name: '小',
				id: 53043,
			},
			{
				name: '单',
				id: 53044,
			},
			{
				name: '双',
				id: 53045,
			},
			{
				name: '0',
				id: 53046,
			},
			{
				name: '1',
				id: 53047,
			},
			{
				name: '2',
				id: 53048,
			},
			{
				name: '3',
				id: 53049,
			},
			{
				name: '4',
				id: 53050,
			},
			{
				name: '5',
				id: 53051,
			},
			{
				name: '6',
				id: 53052,
			},
			{
				name: '7',
				id: 53053,
			},
			{
				name: '8',
				id: 53054,
			},
			{
				name: '9',
				id: 53055,
			},
		],
		'第五球': [
			{
				name: '大',
				id: 53056,
			},
			{
				name: '小',
				id: 53057,
			},
			{
				name: '单',
				id: 53058,
			},
			{
				name: '双',
				id: 53059,
			},
			{
				name: '0',
				id: 53060,
			},
			{
				name: '1',
				id: 53061,
			},
			{
				name: '2',
				id: 53062,
			},
			{
				name: '3',
				id: 53063,
			},
			{
				name: '4',
				id: 53064,
			},
			{
				name: '5',
				id: 53065,
			},
			{
				name: '6',
				id: 53066,
			},
			{
				name: '7',
				id: 53067,
			},
			{
				name: '8',
				id: 53068,
			},
			{
				name: '9',
				id: 53069,
			},
		],
		'前三': [
			{
				name: '豹子',
				id: 53085,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53086,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53087,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53088,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53089,
				playSlotType: RECTANGLE,
			},
		],
		'中三': [
			{
				name: '豹子',
				id: 53090,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53091,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53092,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53093,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53094,
				playSlotType: RECTANGLE,
			},
		],
		'后三': [
			{
				name: '豹子',
				id: 53095,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53096,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53097,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53098,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53099,
				playSlotType: RECTANGLE,
			},
		],
	},
	'第一球': {
		'第一球': [
			{
				name: '0',
				id: 53163,
			},
			{
				name: '1',
				id: 53164,
			},
			{
				name: '2',
				id: 53165,
			},
			{
				name: '3',
				id: 53166,
			},
			{
				name: '4',
				id: 53167,
			},
			{
				name: '5',
				id: 53168,
			},
			{
				name: '6',
				id: 53169,
			},
			{
				name: '7',
				id: 53170,
			},
			{
				name: '8',
				id: 53171,
			},
			{
				name: '9',
				id: 53172,
			},
			{
				name: '大',
				id: 53159,
			},
			{
				name: '小',
				id: 53160,
			},
			{
				name: '单',
				id: 53161,
			},
			{
				name: '双',
				id: 53162,
			},
		],
		'总和-龙虎和': [
			{
				name: '总和大',
				id: 53173,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和小',
				id: 53174,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和单',
				id: 53175,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和双',
				id: 53176,
				playSlotType: RECTANGLE,
			},
			{
				name: '龙',
				id: 53177,
			},
			{
				name: '虎',
				id: 53178,
			},
			{
				name: '和',
				id: 53179,
			},
		],
		'前三': [
			{
				name: '豹子',
				id: 53180,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53181,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53182,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53183,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53184,
				playSlotType: RECTANGLE,
			},
		],
		'中三': [
			{
				name: '豹子',
				id: 53185,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53186,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53187,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53188,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53189,
				playSlotType: RECTANGLE,
			},
		],
		'后三': [
			{
				name: '豹子',
				id: 53190,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53191,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53192,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53193,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53194,
				playSlotType: RECTANGLE,
			},
		],
	},
	'第二球': {
		'第二球': [
			{
				name: '0',
				id: 53199,
			},
			{
				name: '1',
				id: 53200,
			},
			{
				name: '2',
				id: 53201,
			},
			{
				name: '3',
				id: 53202,
			},
			{
				name: '4',
				id: 53203,
			},
			{
				name: '5',
				id: 53204,
			},
			{
				name: '6',
				id: 53205,
			},
			{
				name: '7',
				id: 53206,
			},
			{
				name: '8',
				id: 53207,
			},
			{
				name: '9',
				id: 53208,
			},
			{
				name: '大',
				id: 53195,
			},
			{
				name: '小',
				id: 53196,
			},
			{
				name: '单',
				id: 53197,
			},
			{
				name: '双',
				id: 53198,
			},
		],
		'总和-龙虎和': [
			{
				name: '总和大',
				id: 53209,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和小',
				id: 53210,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和单',
				id: 53211,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和双',
				id: 53212,
				playSlotType: RECTANGLE,
			},
			{
				name: '龙',
				id: 53213,
			},
			{
				name: '虎',
				id: 53214,
			},
			{
				name: '和',
				id: 53215,
			},
		],
		'前三': [
			{
				name: '豹子',
				id: 53216,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53217,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53218,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53219,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53220,
				playSlotType: RECTANGLE,
			},
		],
		'中三': [
			{
				name: '豹子',
				id: 53221,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53222,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53223,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53224,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53225,
				playSlotType: RECTANGLE,
			},
		],
		'后三': [
			{
				name: '豹子',
				id: 53226,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53227,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53228,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53229,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53230,
				playSlotType: RECTANGLE,
			},
		],
	},
	'第三球': {
		'第三球': [
			{
				name: '0',
				id: 53235,
			},
			{
				name: '1',
				id: 53236,
			},
			{
				name: '2',
				id: 53237,
			},
			{
				name: '3',
				id: 53238,
			},
			{
				name: '4',
				id: 53239,
			},
			{
				name: '5',
				id: 53240,
			},
			{
				name: '6',
				id: 53241,
			},
			{
				name: '7',
				id: 53242,
			},
			{
				name: '8',
				id: 53243,
			},
			{
				name: '9',
				id: 53244,
			},
			{
				name: '大',
				id: 53231,
			},
			{
				name: '小',
				id: 53232,
			},
			{
				name: '单',
				id: 53233,
			},
			{
				name: '双',
				id: 53234,
			},
		],
		'总和-龙虎和': [
			{
				name: '总和大',
				id: 53245,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和小',
				id: 53246,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和单',
				id: 53247,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和双',
				id: 53248,
				playSlotType: RECTANGLE,
			},
			{
				name: '龙',
				id: 53249,
			},
			{
				name: '虎',
				id: 53250,
			},
			{
				name: '和',
				id: 53251,
			},
		],
		'前三': [
			{
				name: '豹子',
				id: 53252,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53253,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53254,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53255,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53256,
				playSlotType: RECTANGLE,
			},
		],
		'中三': [
			{
				name: '豹子',
				id: 53257,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53258,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53259,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53260,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53261,
				playSlotType: RECTANGLE,
			},
		],
		'后三': [
			{
				name: '豹子',
				id: 53262,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53263,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53264,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53265,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53266,
				playSlotType: RECTANGLE,
			},
		],
	},
	'第四球': {
		'第四球': [
			{
				name: '0',
				id: 53271,
			},
			{
				name: '1',
				id: 53272,
			},
			{
				name: '2',
				id: 53273,
			},
			{
				name: '3',
				id: 53274,
			},
			{
				name: '4',
				id: 53275,
			},
			{
				name: '5',
				id: 53276,
			},
			{
				name: '6',
				id: 53277,
			},
			{
				name: '7',
				id: 53278,
			},
			{
				name: '8',
				id: 53279,
			},
			{
				name: '9',
				id: 53280,
			},
			{
				name: '大',
				id: 53267,
			},
			{
				name: '小',
				id: 53268,
			},
			{
				name: '单',
				id: 53269,
			},
			{
				name: '双',
				id: 53270,
			},
		],
		'总和-龙虎和': [
			{
				name: '总和大',
				id: 53281,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和小',
				id: 53282,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和单',
				id: 53283,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和双',
				id: 53284,
				playSlotType: RECTANGLE,
			},
			{
				name: '龙',
				id: 53285,
			},
			{
				name: '虎',
				id: 53286,
			},
			{
				name: '和',
				id: 53287,
			},
		],
		'前三': [
			{
				name: '豹子',
				id: 53288,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53289,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53290,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53291,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53292,
				playSlotType: RECTANGLE,
			},
		],
		'中三': [
			{
				name: '豹子',
				id: 53293,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53294,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53295,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53296,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53297,
				playSlotType: RECTANGLE,
			},
		],
		'后三': [
			{
				name: '豹子',
				id: 53298,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53299,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53300,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53301,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53302,
				playSlotType: RECTANGLE,
			},
		],
	},
	'第五球': {
		'第五球': [
			{
				name: '0',
				id: 53307,
			},
			{
				name: '1',
				id: 53308,
			},
			{
				name: '2',
				id: 53309,
			},
			{
				name: '3',
				id: 53310,
			},
			{
				name: '4',
				id: 53311,
			},
			{
				name: '5',
				id: 53312,
			},
			{
				name: '6',
				id: 53313,
			},
			{
				name: '7',
				id: 53314,
			},
			{
				name: '8',
				id: 53315,
			},
			{
				name: '9',
				id: 53316,
			},
			{
				name: '大',
				id: 53303,
			},
			{
				name: '小',
				id: 53304,
			},
			{
				name: '单',
				id: 53305,
			},
			{
				name: '双',
				id: 53306,
			},
		],
		'总和-龙虎和': [
			{
				name: '总和大',
				id: 53317,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和小',
				id: 53318,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和单',
				id: 53319,
				playSlotType: RECTANGLE,
			},
			{
				name: '总和双',
				id: 53320,
				playSlotType: RECTANGLE,
			},
			{
				name: '龙',
				id: 53321,
			},
			{
				name: '虎',
				id: 53322,
			},
			{
				name: '和',
				id: 53323,
			},
		],
		'前三': [
			{
				name: '豹子',
				id: 53324,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53325,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53326,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53327,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53328,
				playSlotType: RECTANGLE,
			},
		],
		'中三': [
			{
				name: '豹子',
				id: 53329,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53330,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53331,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53332,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53333,
				playSlotType: RECTANGLE,
			},
		],
		'后三': [
			{
				name: '豹子',
				id: 53334,
				playSlotType: RECTANGLE,
			},
			{
				name: '顺子',
				id: 53335,
				playSlotType: RECTANGLE,
			},
			{
				name: '对子',
				id: 53336,
				playSlotType: RECTANGLE,
			},
			{
				name: '半顺',
				id: 53337,
				playSlotType: RECTANGLE,
			},
			{
				name: '杂六',
				id: 53338,
				playSlotType: RECTANGLE,
			},
		],
	},
	'单码': {
		'单码': [
			{ id: 53339, name: '一中一', playSlotType: RECTANGLE, },
			{ id: 53340, name: '一中二', playSlotType: RECTANGLE, },
			{ id: 53341, name: '一中三', playSlotType: RECTANGLE, },
			{ id: 53342, name: '一中四', playSlotType: RECTANGLE, },
			{ id: 53343, name: '一中五', playSlotType: RECTANGLE, },
			{ id: 53344, name: '0', },
			{ id: 53345, name: '1', },
			{ id: 53346, name: '2', },
			{ id: 53347, name: '3', },
			{ id: 53348, name: '4', },
			{ id: 53349, name: '5', },
			{ id: 53350, name: '6', },
			{ id: 53351, name: '7', },
			{ id: 53352, name: '8', },
			{ id: 53353, name: '9', },
		],
	},
	'连码': {
		'连码': [
			{ id: 53354, name: '二中二', playSlotType: RECTANGLE, },
			{ id: 53355, name: '三中三', playSlotType: RECTANGLE, },
			{ id: 53356, name: '0', },
			{ id: 53357, name: '1', },
			{ id: 53358, name: '2', },
			{ id: 53359, name: '3', },
			{ id: 53360, name: '4', },
			{ id: 53361, name: '5', },
			{ id: 53362, name: '6', },
			{ id: 53363, name: '7', },
			{ id: 53364, name: '8', },
			{ id: 53365, name: '9', },
		],
	},
	'斗牛': {
		'斗牛': [
			{
				name: '牛牛',
				id: 53366,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛九',
				id: 53367,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛八',
				id: 53368,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛七',
				id: 53369,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛六',
				id: 53370,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛五',
				id: 53371,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛四',
				id: 53372,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛三',
				id: 53373,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛二',
				id: 53374,
				playSlotType: RECTANGLE,
			},
			{
				name: '牛一',
				id: 53375,
				playSlotType: RECTANGLE,
			},
			{
				name: '无牛',
				id: 53376,
				playSlotType: RECTANGLE,
			},
		],
	},
};

export default {
	PlayConditionIdMap,
	PlaySubconditionIdMap,
	PlaysMap,
};
