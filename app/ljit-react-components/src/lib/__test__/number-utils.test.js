import {
	isNumber,
	toNumber,
	isPositiveNumber,
	isNegativeNumber,
	formatNumberToStringWithSeparator,
	FORMAT_RULE,
	formatStringToNumber,
	addDollarSymbol,
	removeDollarSymbol,
	addPercentageSymbol,
	removePercentageSymbol,
	getNPlaceDecimal,
	RoundModeEnum,
	getRoundDownNPlaceDecimal,
} from '../number-utils';

describe('isNumber', () => {
	it('should be failed with {}', () => {
		const received = {};
		const expected = false;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be failed with undefined', () => {
		const received = undefined;
		const expected = false;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be failed with null', () => {
		const received = null;
		const expected = false;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be failed with \'foo\'', () => {
		const received = 'foo';
		const expected = false;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be failed with \'foo123\'', () => {
		const received = 'foo123';
		const expected = false;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be failed with \'foo123.645\'', () => {
		const received = 'foo123.645';
		const expected = false;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be passed with \'123\'', () => {
		const received = '123';
		const expected = true;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be passed with \'123.142\'', () => {
		const received = '123.142';
		const expected = true;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be passed with 1681', () => {
		const received = 1681;
		const expected = true;

		expect(isNumber(received)).toEqual(expected);
	});

	it('should be passed with 1896146.4654', () => {
		const received = 1896146.4654;
		const expected = true;

		expect(isNumber(received)).toEqual(expected);
	});
});

describe('toNumber', () => {
	it('should 50 to be 50', () => {
		const received = 50;
		const expected = 50;

		expect(toNumber(received)).toEqual(expected);
	});

	it('should 50.64 to be 50.64', () => {
		const received = 50.64;
		const expected = 50.64;

		expect(toNumber(received)).toEqual(expected);
	});

	it('should \'50\' to be 50', () => {
		const received = '50';
		const expected = 50;

		expect(toNumber(received)).toEqual(expected);
	});

	it('should \'46465.46854\' to be 46465.46854', () => {
		const received = '46465.46854';
		const expected = 46465.46854;

		expect(toNumber(received)).toEqual(expected);
	});
});

describe('isPositiveNumber', () => {
	it('should be passed with 50', () => {
		const received = 50;
		const expected = true;

		expect(isPositiveNumber(received)).toEqual(expected);
	});

	it('should be passed with 469.41648', () => {
		const received = 469.41648;
		const expected = true;

		expect(isPositiveNumber(received)).toEqual(expected);
	});

	it('should be failed with -20', () => {
		const received = -20;
		const expected = false;

		expect(isPositiveNumber(received)).toEqual(expected);
	});

	it('should be failed with -84896.314646', () => {
		const received = -84896.314646;
		const expected = false;

		expect(isPositiveNumber(received)).toEqual(expected);
	});

	it('should be failed with 0', () => {
		const received = 0;
		const expected = false;

		expect(isPositiveNumber(received)).toEqual(expected);
	});
});

describe('isNegativeNumber', () => {
	it('should be passed with -165', () => {
		const received = -165;
		const expected = true;

		expect(isNegativeNumber(received)).toEqual(expected);
	});

	it('should be passed with -16914.654646', () => {
		const received = -16914.654646;
		const expected = true;

		expect(isNegativeNumber(received)).toEqual(expected);
	});

	it('should be failed with 4196', () => {
		const received = 4196;
		const expected = false;

		expect(isNegativeNumber(received)).toEqual(expected);
	});

	it('should be failed with 7546.4646', () => {
		const received = 7546.4646;
		const expected = false;

		expect(isNegativeNumber(received)).toEqual(expected);
	});

	it('should be failed with 0', () => {
		const received = 0;
		const expected = false;

		expect(isNegativeNumber(received)).toEqual(expected);
	});
});

describe('formatNumberToStringWithSeparator', () => {
	it('should 5000 to be \'5,000\'', () => {
		const received = 5000;
		const expected = '5,000';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should 1000000 to be \'1,000,000\'', () => {
		const received = 1000000;
		const expected = '1,000,000';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should 1000000000 to be \'1,000,000,000\'', () => {
		const received = 1000000000;
		const expected = '1,000,000,000';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should 0.0056 to be \'0.0056\'', () => {
		const received = 0.0056;
		const expected = '0.0056';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should 0.005600 to be \'0.0056\'', () => {
		const received = 0.005600;
		const expected = '0.0056';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should 1000.56987 to be \'1000.56987\', when decimalPlaces is 0', () => {
		const received = 1000.56987;
		const expected = '1,000.56987';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});
	it('should -5000 to be \'-5,000\'', () => {
		const received = -5000;
		const expected = '-5,000';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should -1000000 to be \'-1,000,000\'', () => {
		const received = -1000000;
		const expected = '-1,000,000';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should -1000000000 to be \'-1,000,000,000\'', () => {
		const received = -1000000000;
		const expected = '-1,000,000,000';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should -0.0056 to be \'-0.0056\'', () => {
		const received = -0.0056;
		const expected = '-0.0056';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should -0.005600 to be \'-0.0056\'', () => {
		const received = -0.005600;
		const expected = '-0.0056';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});

	it('should -1000.56987 to be \'-1000.56987\', when decimalPlaces is 0', () => {
		const received = -1000.56987;
		const expected = '-1,000.56987';

		expect(formatNumberToStringWithSeparator(received)).toEqual(expected);
	});
});

describe('formatStringToNumber', () => {
	it('should FORMAT_RULE to be \/,\/g', () => {
		const received = FORMAT_RULE;
		const expected = /,/g;

		expect(received).toEqual(expected);
	});

	it('should \'foo\' to be NaN', () => {
		const received = 'foo';
		const expected =  NaN;

		expect(formatStringToNumber(received)).toEqual(expected);
	});

	it('should \'164983\' to be 164983', () => {
		const received = '164983';
		const expected =  164983;

		expect(formatStringToNumber(received)).toEqual(expected);
	});

	it('should \'1,698,413,120\' to be 1698413120', () => {
		const received = '1,698,413,120';
		const expected =  1698413120;

		expect(formatStringToNumber(received)).toEqual(expected);
	});

	it('should \'1000.23454\' to be 1000.23454', () => {
		const received = '1000.23454';
		const expected =  1000.23454;

		expect(formatStringToNumber(received)).toEqual(expected);
	});

	it('should \'1,000.23454\' to be 1000.23454', () => {
		const received = '1,000.23454';
		const expected =  1000.23454;

		expect(formatStringToNumber(received)).toEqual(expected);
	});
});

describe('addDollarSymbol', () => {
	it('should undefined to be \'\'', () => {
		const received = undefined;
		const expected = '';

		expect(addDollarSymbol(received)).toEqual(expected);
	});

	it('should null to be \'\'', () => {
		const received = null;
		const expected = '';

		expect(addDollarSymbol(received)).toEqual(expected);
	});

	it('should \'foo\' to be \'$ foo\'', () => {
		const received = 'foo';
		const expected = '$ foo';

		expect(addDollarSymbol(received)).toEqual(expected);
	});

	it('should 41685 to be \'$ 41685\'', () => {
		const received = 41685;
		const expected = '$ 41685';

		expect(addDollarSymbol(received)).toEqual(expected);
	});

	it('should 4986.46876 to be \'$ 4986.46876\'', () => {
		const received = 4986.46876;
		const expected = '$ 4986.46876';

		expect(addDollarSymbol(received)).toEqual(expected);
	});
});

describe('removeDollarSymbol', () => {
	it('should undefined to be \'\'', () => {
		const received = undefined;
		const expected = '';

		expect(removeDollarSymbol(received)).toEqual(expected);
	});

	it('should null to be \'\'', () => {
		const received = null;
		const expected = '';

		expect(removeDollarSymbol(received)).toEqual(expected);
	});

	it('should \'$ foo\' to be \'foo\'', () => {
		const received = '$ foo';
		const expected = 'foo';

		expect(removeDollarSymbol(received)).toEqual(expected);
	});

	it('should \'$ 41685\' to be \'41685\'', () => {
		const received = '$ 41685';
		const expected = '41685';

		expect(removeDollarSymbol(received)).toEqual(expected);
	});

	it('should \'$ 4986.46876\' to be \'4986.46876\'', () => {
		const received = '$ 4986.46876';
		const expected = '4986.46876';

		expect(removeDollarSymbol(received)).toEqual(expected);
	});
});

describe('addPercentageSymbol', () => {
	it('should undefined to be \'\'', () => {
		const received = undefined;
		const expected = '';

		expect(addPercentageSymbol(received)).toEqual(expected);
	});

	it('should null to be \'\'', () => {
		const received = null;
		const expected = '';

		expect(addPercentageSymbol(received)).toEqual(expected);
	});

	it('should \'foo\' to be \'foo%\'', () => {
		const received = 'foo';
		const expected = 'foo%';

		expect(addPercentageSymbol(received)).toEqual(expected);
	});

	it('should 41685 to be \'41685%\'', () => {
		const received = 41685;
		const expected = '41685%';

		expect(addPercentageSymbol(received)).toEqual(expected);
	});

	it('should 4986.46876 to be \'4986.46876%\'', () => {
		const received = 4986.46876;
		const expected = '4986.46876%';

		expect(addPercentageSymbol(received)).toEqual(expected);
	});
});

describe('removePercentageSymbol', () => {
	it('should undefined to be \'\'', () => {
		const received = undefined;
		const expected = '';

		expect(removePercentageSymbol(received)).toEqual(expected);
	});

	it('should null to be \'\'', () => {
		const received = null;
		const expected = '';

		expect(removePercentageSymbol(received)).toEqual(expected);
	});

	it('should \'foo%\' to be \'foo\'', () => {
		const received = 'foo%';
		const expected = 'foo';

		expect(removePercentageSymbol(received)).toEqual(expected);
	});

	it('should \'41685%\' to be \'41685\'', () => {
		const received = '41685%';
		const expected = '41685';

		expect(removePercentageSymbol(received)).toEqual(expected);
	});

	it('should \'4986.46876%\' to be \'4986.46876\'', () => {
		const received = '4986.46876%';
		const expected = '4986.46876';

		expect(removePercentageSymbol(received)).toEqual(expected);
	});
});

describe('getNPlaceDecimal', () => {
	it('function default setting (default Round Mode is ROUND_HALF_UP), should 1 to be 1', () => {
		const received = 1;
		const expected = 1;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
	it('function default setting (default Round Mode is ROUND_HALF_UP), should 1.4 to be 1', () => {
		const received = 1.4;
		const expected = 1;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
	it('function default setting (default Round Mode is ROUND_HALF_UP), should 1.5 to be 2', () => {
		const received = 1.5;
		const expected = 2;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
	it('function default setting (default Round Mode is ROUND_HALF_UP), should -1.4 to be -1', () => {
		const received = -1.4;
		const expected = -1;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
	it('function default setting (default Round Mode is ROUND_HALF_UP), should -1.5 to be -2', () => {
		const received = -1.5;
		const expected = -2;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
	it('set function decimalPlaces to 4, should 1.00014 to be 1.0001', () => {
		const received = 1.00014;
		const expected = 1.0001;
		const decimalPlaces = 4;

		expect(getNPlaceDecimal(received, decimalPlaces)).toEqual(expected);
	});
	it('set function decimalPlaces to 4, should 1.00015 to be 1.0002', () => {
		const received = 1.00015;
		const expected = 1.0002;
		const decimalPlaces = 4;

		expect(getNPlaceDecimal(received, decimalPlaces)).toEqual(expected);
	});
	it('set function rm to ROUND_DOWN and decimalPlaces to 4, should 1.00014 to be 1.0001', () => {
		const received = 1.00014;
		const expected = 1.0001;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_DOWN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_DOWN and decimalPlaces to 4, should 1.00015 to be 1.0001', () => {
		const received = 1.00015;
		const expected = 1.0001;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_DOWN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_DOWN and decimalPlaces to 4, should -1.00014 to be -1.0001', () => {
		const received = -1.00014;
		const expected = -1.0001;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_DOWN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_DOWN and decimalPlaces to 4, should -1.00015 to be -1.0001', () => {
		const received = -1.00015;
		const expected = -1.0001;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_DOWN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_HALF_EVEN and decimalPlaces to 4, should 1.00014 to be 1.0001', () => {
		const received = 1.00014;
		const expected = 1.0001;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_HALF_EVEN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_HALF_EVEN and decimalPlaces to 4, should 1.00015 to be 1.0002', () => {
		const received = 1.00015;
		const expected = 1.0002;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_HALF_EVEN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_HALF_EVEN and decimalPlaces to 4, should -1.00014 to be -1.0001', () => {
		const received = -1.00014;
		const expected = -1.0001;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_HALF_EVEN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_HALF_EVEN and decimalPlaces to 4, should -1.00015 to be -1.0002', () => {
		const received = -1.00015;
		const expected = -1.0002;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_HALF_EVEN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_HALF_EVEN and decimalPlaces to 4, should -1.00024 to be -1.0002', () => {
		const received = -1.00024;
		const expected = -1.0002;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_HALF_EVEN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_HALF_EVEN and decimalPlaces to 4, should -1.00025 to be -1.0002', () => {
		const received = -1.00025;
		const expected = -1.0002;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_HALF_EVEN;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_UP and decimalPlaces to 4, should 1.00014 to be 1.0002', () => {
		const received = 1.00014;
		const expected = 1.0002;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_UP;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_UP and decimalPlaces to 4, should 1.00015 to be 1.0002', () => {
		const received = 1.00015;
		const expected = 1.0002;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_UP;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_UP and decimalPlaces to 4, should -1.00014 to be -1.0002', () => {
		const received = -1.00014;
		const expected = -1.0002;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_UP;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('set function rm to ROUND_UP and decimalPlaces to 4, should -1.00015 to be -1.0002', () => {
		const received = -1.00015;
		const expected = -1.0002;
		const decimalPlaces = 4;
		const RoundMode = RoundModeEnum.ROUND_UP;

		expect(getNPlaceDecimal(received, decimalPlaces, RoundMode)).toEqual(expected);
	});
	it('function default setting, should 123abc to be 123', () => {
		const received = '123abc';
		const expected = 123;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
	it('function default setting, should true to be true', () => {
		const received = true;
		const expected = true;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
	it('function default setting, should null to be null', () => {
		const received = null;
		const expected = null;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
	it('function default setting, should NaN to be NaN', () => {
		const received = NaN;
		const expected = NaN;

		expect(getNPlaceDecimal(received)).toEqual(expected);
	});
});

describe('getRoundDownNPlaceDecimal', () => {
	it('function default setting, should 1.5 to be 1', () => {
		const received = 1.5;
		const expected = 1;

		expect(getRoundDownNPlaceDecimal(received)).toEqual(expected);
	});

	it('function default setting, should -1.5 to be -1', () => {
		const received = -1.5;
		const expected = -1;

		expect(getRoundDownNPlaceDecimal(received)).toEqual(expected);
	});

	it('function default setting, should 1.00015 to be 1.0001', () => {
		const received = 1.00015;
		const expected = 1.0001;
		const decimalPlaces = 4;

		expect(getRoundDownNPlaceDecimal(received, decimalPlaces)).toEqual(expected);
	});

	it('function default setting, should -1.00015 to be -1.0001', () => {
		const received = -1.00015;
		const expected = -1.0001;
		const decimalPlaces = 4;

		expect(getRoundDownNPlaceDecimal(received, decimalPlaces)).toEqual(expected);
	});

	it('function default setting, should -123.456abc to be -123', () => {
		const received = '-123.456abc';
		const expected = -123;

		expect(getRoundDownNPlaceDecimal(received)).toEqual(expected);
	});

	it('function default setting, should NaN to be NaN', () => {
		const received = NaN;
		const expected = NaN;

		expect(getRoundDownNPlaceDecimal(received)).toEqual(expected);
	});
});
