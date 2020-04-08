import Big from 'big.js';

export const isNumber = value => !isNaN(parseFloat(value));

export const toNumber = (value) => {
	if (typeof value === 'number') {
		return value;
	}

	return parseFloat(value);
};

export const isPositiveNumber = (value) => {
	if (!isNumber(value)) {
		return false;
	}

	return value > 0;
};

export const isNegativeNumber = (value) => {
	if (!isNumber(value)) {
		return false;
	}

	return value < 0;
};

export const formatNumberToStringWithSeparator = (value) => {
	const result = toNumber(value);

	let parts = result.toString().split('.');

	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return parts.join('.');
};

export const FORMAT_RULE = /,/g;

export const formatStringToNumber = (value = '') => {
	let result = value;

	if (FORMAT_RULE.test(result)) {
		result = result.replace(FORMAT_RULE, '');
	}

	return toNumber(result);
};

export const addDollarSymbol = value => value ? `$ ${value}` : '';

export const removeDollarSymbol = (value = '') => {
	return typeof value === 'string' ? value.replace(/\$\s?|(,*)/g, '') : '';
};

export const addPercentageSymbol = value => value ? `${value}%` : '';

export const removePercentageSymbol = (value = '') => {
	return typeof value === 'string' ? value.replace('%', '') : '';
};

export const RoundModeEnum = {
	ROUND_DOWN: 0,
	ROUND_HALF_UP: 1,
	ROUND_HALF_EVEN: 2,
	ROUND_UP: 3,
};

// The default setting of round mode in big.js is ROUND_HALF_UP
export function getNPlaceDecimal(
	value = 0,
	decimalPlaces = 0,
	RoundMode = RoundModeEnum.ROUND_HALF_UP
) {
	const isNum = isNumber(value);

	let output = value;

	if (isNum) {
		output = toNumber(value);
		output = Big(output).round(decimalPlaces, RoundMode).toPrecision();
		output = Number(output);
	}
	return output;
}

export function getRoundDownNPlaceDecimal(value, decimalPlaces) {
	return getNPlaceDecimal(value, decimalPlaces, RoundModeEnum.ROUND_DOWN);
}
