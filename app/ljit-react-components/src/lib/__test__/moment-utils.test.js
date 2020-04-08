import {
	DATE,
	TIME,
	TIME_SECONDS,
	DATE_TIME_SECONDS,
	isDateValid,
	convertDateStringToTimestamp,
	formatDate,
	convertMsToSeconds,
} from '../moment-utils';

describe('Constants', () => {
	it('should DATE to be \'YYYY/MM/DD\'', () => {
		const expected = 'YYYY/MM/DD';

		expect(DATE).toEqual(expected);
	});

	it('should TIME to be \'HH:mm\'', () => {
		const expected = 'HH:mm';

		expect(TIME).toEqual(expected);
	});

	it('should TIME_SECONDS to be \'HH:mm:ss\'', () => {
		const expected = 'HH:mm:ss';

		expect(TIME_SECONDS).toEqual(expected);
	});

	it('should DATE_TIME_SECONDS to be \'YYYY/MM/DD HH:mm:ss\'', () => {
		const expected = 'YYYY/MM/DD HH:mm:ss';

		expect(DATE_TIME_SECONDS).toEqual(expected);
	});
});

describe('isDateValid', () => {
	it('should \'foo\' to be false', () => {
		const received = 'foo';
		const expected = false;

		expect(isDateValid(received)).toEqual(expected);
	});

	it('should \'25/6/2019\' to be false', () => {
		const received = '25/6/2019';
		const expected = false;

		expect(isDateValid(received)).toEqual(expected);
	});

	it('should \'123456789\' to be false', () => {
		const received = '123456789';
		const expected = false;

		expect(isDateValid(received)).toEqual(expected);
	});

	it('should \'6:10:00\' to be false', () => {
		const received = '6:10:00';
		const expected = false;

		expect(isDateValid(received)).toEqual(expected);
	});

	it('should \'2019/6/25\' to be true', () => {
		const received = '2019/6/25';
		const expected = true;

		expect(isDateValid(received)).toEqual(expected);
	});

	it('should \'2019/6/25 6:10:00\' to be true', () => {
		const received = '2019/6/25 6:10:00';
		const expected = true;

		expect(isDateValid(received)).toEqual(expected);
	});

	it('should \'2019-06-25T06:10:00+00:00\' to be true', () => {
		const received = '2019-06-25T06:10:00+00:00';
		const expected = true;

		expect(isDateValid(received)).toEqual(expected);
	});

	it('should \'2019-06-25T06:10:00Z\' to be true', () => {
		const received = '2019-06-25T06:10:00Z';
		const expected = true;

		expect(isDateValid(received)).toEqual(expected);
	});
});

describe('convertDateStringToTimestamp', () => {
	it('should \'2019-06-25T06:10:00+00:00\' to be 1561414200000', () => {
		const received = '2019-06-25T06:10:00+00:00';
		const expected = 1561414200000;

		expect(convertDateStringToTimestamp(received)).toEqual(expected);
	});
});

describe('formatDate', () => {
	describe('When format is default', () => {
		it('should \'2019-06-25T06:10:00+00:00\' to be \'2019/06/25 14:10:00\'', () => {
			const received = '2019-06-25T06:10:00+00:00';
			const expected = '2019/06/25 14:10:00';

			expect(formatDate(received)).toEqual(expected);
		});

		it('should \'2019-06-20\' to be \'2019/06/20 00:00:00\'', () => {
			const received = '2019-06-20';
			const expected = '2019/06/20 00:00:00';

			expect(formatDate(received)).toEqual(expected);
		});
	});

	describe('When format is YYYY/MM/DD', () => {
		it('should \'2019-06-25T06:10:00+00:00\' to be \'2019/06/25\'', () => {
			const received = '2019-06-25T06:10:00+00:00';
			const format = 'YYYY/MM/DD';
			const expected = '2019/06/25';

			expect(formatDate(received, format)).toEqual(expected);
		});
	});
});

describe('convertMsToSeconds', () => {
	it('should \'3000\' to be \'3\'', () => {
		const received = 3000;
		const expected = 3;

		expect(convertMsToSeconds(received)).toEqual(expected);
	});
});
