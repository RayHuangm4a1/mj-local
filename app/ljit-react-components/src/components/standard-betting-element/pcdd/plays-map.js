import {
	QuickTypeEnum,
	BallSizeEnum,
	convertDataToCombinationWithoutGrouping,
} from '../utils';

const PlaysMap = {
	'不回本玩法': {
		'定位': {
			id: 801,
			configs: {
				quickOptions: [
					QuickTypeEnum.NONE,
				],
				convertDataToCombination: convertDataToCombinationWithoutGrouping,
				labelsWithCodes: [
					{
						label: '上',
						codes: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',],
					},
					{
						label: '中',
						codes: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19',],
					},
					{
						label: '下',
						codes: ['20', '21', '22', '23', '24', '25', '26', '27',],
					},
				],
			},
		},
		'极值': {
			id: 802,
			labels: ['极值', ],
			codes: ['极大', '极小',],
			configs: {
				codeBallSize: BallSizeEnum.LARGE,
			},
		},
		'大小单双': {
			id: 803,
			labels: ['大小单双', ],
			codes: ['大', '小','单', '双',],
			configs: {
				quickOptions: [],
			},
		},
		'组合': {
			id: 804,
			labels: ['选号', ],
			codes: ['大双', '小双','大单', '小单',],
			configs: {
				codeBallSize: BallSizeEnum.LARGE,
			},
		},
	},
	'回本玩法': {
		'大小单双': {
			id: 805,
			labels: ['大小单双', ],
			codes: ['大', '小','单', '双',],
			configs: {
				quickOptions: [],
			},
		},
		'组合':{
			id: 806,
			labels: ['选号', ],
			codes: ['大双', '小双','大单', '小单',],
			configs: {
				codeBallSize: BallSizeEnum.LARGE,
			},
		},
	},
};

export default PlaysMap;
