import {
	isDecimal,
} from '../utils';

describe('isDecimal', () => {
	it('should be failed with string', () => {
		const result = false;

		expect(isDecimal('1')).toBe(result);
		expect(isDecimal('10')).toBe(result);
		expect(isDecimal('10.1')).toBe(result);
		expect(isDecimal('10.01')).toBe(result);
		expect(isDecimal('str')).toBe(result);
	});

	it('should be failed with integer', () => {
		const result = false;

		expect(isDecimal(1)).toBe(result);
		expect(isDecimal(10)).toBe(result);
		expect(isDecimal(1000)).toBe(result);
	});

	it('should be passed with decimal', () => {
		const result = true;

		expect(isDecimal(1.1)).toBe(result);
		expect(isDecimal(1.01)).toBe(result);
		expect(isDecimal(1.001)).toBe(result);
		expect(isDecimal(1.0001)).toBe(result);
		expect(isDecimal(1.000000001)).toBe(result);
	});
});
