import XinYongBettingCard from '../../../xin-yong-betting-card';
const {
	RECTANGLE,
} = XinYongBettingCard.TypeEnums;

const PlayConditionIdMap = {
	'整合': 451,
};
const PlaySubconditionIdMap = {
	'整合': {
		'特码': 451001,
		'特码包三': 451002,
		'混合': 451003,
		'波色': 451004,
	},
};

const PlaysMap = {
	'整合': {
		'特码': [
			{
				name: '0',
				id: 83000,
			},
			{
				name: '1',
				id: 83001,
			},
			{
				name: '2',
				id: 83002,
			},
			{
				name: '3',
				id: 83003,
			},
			{
				name: '4',
				id: 83004,
			},
			{
				name: '5',
				id: 83005,
			},
			{
				name: '6',
				id: 83006,
			},
			{
				name: '7',
				id: 83007,
			},
			{
				name: '8',
				id: 83008,
			},
			{
				name: '9',
				id: 83009,
			},
			{
				name: '10',
				id: 83010,
			},
			{
				name: '11',
				id: 83011,
			},
			{
				name: '12',
				id: 83012,
			},
			{
				name: '13',
				id: 83013,
			},
			{
				name: '14',
				id: 83014,
			},
			{
				name: '15',
				id: 83015,
			},
			{
				name: '16',
				id: 83016,
			},
			{
				name: '17',
				id: 83017,
			},
			{
				name: '18',
				id: 83018,
			},
			{
				name: '19',
				id: 83019,
			},
			{
				name: '20',
				id: 83020,
			},
			{
				name: '21',
				id: 83021,
			},
			{
				name: '22',
				id: 83022,
			},
			{
				name: '23',
				id: 83023,
			},
			{
				name: '24',
				id: 83024,
			},
			{
				name: '25',
				id: 83025,
			},
			{
				name: '26',
				id: 83026,
			},
			{
				name: '27',
				id: 83027,
			},
		],
		'特码包三': [
			{
				name: '特码包三',
				id: 83028,
			},
		],
		'混合': [
			{
				name: '大',
				id: 83029,
			},
			{
				name: '小',
				id: 83030,
			},
			{
				name: '单',
				id: 83031,
			},
			{
				name: '双',
				id: 83032,
			},
			{
				name: '大单',
				id: 83033,
				playSlotType: RECTANGLE,
			},
			{
				name: '小单',
				id: 83034,
				playSlotType: RECTANGLE,
			},
			{
				name: '大双',
				id: 83035,
				playSlotType: RECTANGLE,
			},
			{
				name: '小双',
				id: 83036,
				playSlotType: RECTANGLE,
			},
			{
				name: '极大',
				id: 83037,
				playSlotType: RECTANGLE,
			},
			{
				name: '极小',
				id: 83038,
				playSlotType: RECTANGLE,
			},
			{
				name: '豹子',
				id: 83042,
				playSlotType: RECTANGLE,
			},
		],
		'波色': [
			{
				name: '红波',
				id: 83039,
				playSlotType: RECTANGLE,
			},
			{
				name: '绿波',
				id: 83040,
				playSlotType: RECTANGLE,
			},
			{
				name: '蓝波',
				id: 83041,
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
