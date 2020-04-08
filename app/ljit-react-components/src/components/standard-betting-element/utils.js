import { combinations, } from 'ljit-betcontent-helper/utils';

export const QuickTypeEnum = {
	BIG: '大',
	SMALL: '小',
	ODD: '单',
	EVEN: '双',
	ALL: '全',
	NONE: '清',
};

export const BallSizeEnum = {
	LARGE: 'large',
	MIDDLE: 'middle',
	SMALL: 'small',
};

export function generateData(labels, codes) {
	return labels.map(label => {
		return {
			name: label,
			codes: codes.map(code => {
				return {
					name: code,
					isSelected: false,
				};
			}),
		};
	});
}

export function generateDataForLabelsWithCodes(labelsWithCodes) {
	return labelsWithCodes.map(labelsWithCode => {
		return {
			name: labelsWithCode.label,
			codes: labelsWithCode.codes.map(code => {
				return {
					name: code,
					isSelected: false,
				};
			}),
		};
	});
}

export function generateNextData(index1, index2, data) {
	data[index1].codes[index2].isSelected = !data[index1].codes[index2].isSelected;

	return data;
}

export function generateFilterData(data) {
	let dataArray = data.split(/[,\n;]/);

	dataArray = dataArray.reduce(function (reduced, item, index) {
		const shouldSplit = /\s[0-9,]{1,}/.test(item);

		if (shouldSplit) {
			const lastDataArray = item.split(/[,\s]/).filter((item) => !!item);

			return [...reduced, ...lastDataArray,];
		} else {
			return [...reduced, item,];
		}
	}, []);
	const dataSet = new Set(dataArray);

	return [...dataSet,].join(',');
}

export function generatePositionDescription(positions, minPositionCount) {
	if (positions.length <= 0) {
		return '';
	}

	const selectedCount = positions.filter(item => item.isSelected).length;
	const results = selectedCount < minPositionCount ?
		0 : combinations(selectedCount, minPositionCount);

	return `您选择了 ${selectedCount} 个位置，系统自动根据位置组合成 ${results} 个方案。`;
}

export function convertDataToCombination(data, codeSplitter = '') {
	if (data.length === 1) {
		return data[0].codes
			.filter((code) => code.isSelected)
			.map((code) => code.name)
			.join(',');

	} else {
		return data.map(function (element) {
			return element.codes
				.filter((code) => code.isSelected)
				.map((code) => code.name)
				.join(codeSplitter);
		}).join(',');
	}
}

export function convertDataToCombinationWithoutGrouping(data = []) {
	return data
		.reduce((array, element) => array.concat(element.codes), [])
		.filter((code) => code.isSelected)
		.map((code) => code.name)
		.join(',');
}

export function convertPosition(positions) {
	if (positions.length === 0) {
		return '';
	}

	return positions
		.filter((position) => position.isSelected)
		.map((position) => position.name)
		.join(',');
}

export function generateQuickSelectData({
	quickSelectActionType,
	quickSelectPositionName,
	data,
}) {
	const generateQuickSelectCodes = getQuickSelectCodesGenerater(quickSelectActionType);

	return data.map(function (item) {
		if (quickSelectPositionName === item.name) {
			item.codes = generateQuickSelectCodes(item.codes);
		}

		return item;
	});
}

function getQuickSelectCodesGenerater(quickSelectActionType) {
	let generateQuickSelectCodes;

	switch (quickSelectActionType) {
		case QuickTypeEnum.BIG:
			generateQuickSelectCodes = selectBigCodes;
			break;

		case QuickTypeEnum.SMALL:
			generateQuickSelectCodes = selectSmallCodes;
			break;

		case QuickTypeEnum.ODD:
			generateQuickSelectCodes = selectOddCodes;
			break;

		case QuickTypeEnum.EVEN:
			generateQuickSelectCodes = selectEvenCodes;
			break;

		case QuickTypeEnum.ALL:
			generateQuickSelectCodes = selectAllCodes;
			break;

		case QuickTypeEnum.NONE:
			generateQuickSelectCodes = selectNoneCodes;
			break;

		default:
			console.warn(`do not support quick selection action type ${quickSelectActionType}`);
			generateQuickSelectCodes = function (codes) { return codes; };
			break;
	}

	return generateQuickSelectCodes;
}

function selectBigCodes(codes) {
	const maxNumber = codes[codes.length - 1].name;

	if (!maxNumber) {
		return codes;
	}

	const half = maxNumber / 2;

	return codes.map(code => {
		code.isSelected = parseInt(code.name) > half;

		return code;
	});
}

function selectSmallCodes(codes) {
	const maxNumber = codes[codes.length - 1].name;

	if (!maxNumber) {
		return codes;
	}

	const half = maxNumber / 2;

	return codes.map(code => {
		code.isSelected = parseInt(code.name) <= half;

		return code;
	});
}

function selectOddCodes(codes) {
	return codes.map(code => {
		const codeNum = parseInt(code.name);

		if (codeNum % 2 === 1) {
			code.isSelected = true;

		} else if (codeNum % 2 === 0) {
			code.isSelected = false;
		}

		return code;
	});
}

function selectEvenCodes(codes) {
	return codes.map(code => {
		const codeNum = parseInt(code.name);

		if (codeNum % 2 === 0) {
			code.isSelected = true;

		} else if (codeNum % 2 === 1) {
			code.isSelected = false;
		}

		return code;
	});
}

function selectAllCodes(codes) {
	return codes.map(code => {
		code.isSelected = true;

		return code;
	});
}

function selectNoneCodes(codes) {
	return codes.map(code => {
		code.isSelected = false;

		return code;
	});
}

export function generateCodeBallBadges(codeBallAwards = {}) {
	const result = {};

	Object.keys(codeBallAwards).map(key => {
		const award = codeBallAwards[key] || {};
		const {
			pk = {
				isEnabled: false,
			},
		} = award;

		if (pk.isEnabled) {
			result[key] = '单挑';
		}
	});

	return result;
}
