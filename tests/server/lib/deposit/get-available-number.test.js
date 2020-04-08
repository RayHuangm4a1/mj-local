const {
	getAvailableNumber,
} = require('../../../../server/lib/deposit');

describe('getAvailableNumber', () => {
	it('usedNumbers=[], min=1, max=99, expected=1', () => {
		const usedNumbers = [];
		const min = 1;
		const max = 99;
		const expected = 1;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[1], min=1, max=99, expected=2', () => {
		const usedNumbers = [1];
		const min = 1;
		const max = 99;
		const expected = 2;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[1,2,3], min=1, max=99, expected=4', () => {
		const usedNumbers = [1, 2, 3];
		const min = 1;
		const max = 99;
		const expected = 4;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[2,4,5,6], min=1, max=99, expected=1', () => {
		const usedNumbers = [2, 4, 5, 6];
		const min = 1;
		const max = 99;
		const expected = 1;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[1,2,4,6], min=1, max=99, expected=3', () => {
		const usedNumbers = [1, 2, 4, 6];
		const min = 1;
		const max = 99;
		const expected = 3;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[1,2,3,4,5,6,7,8,9,11,12], min=1, max=99, expected=10', () => {
		const usedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12];
		const min = 1;
		const max = 99;
		const expected = 10;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[1~98], min=1, max=99, expected=99', () => {
		const usedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98];
		const min = 1;
		const max = 99;
		const expected = 99;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[1~99], min=1, max=99, expected=null', () => {
		const usedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99];
		const min = 1;
		const max = 99;
		const expected = null;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[], min=10, max=20, expected=10', () => {
		const usedNumbers = [];
		const min = 10;
		const max = 20;
		const expected = 10;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[10,11,12,14], min=10, max=20, expected=13', () => {
		const usedNumbers = [10, 11, 12, 14];
		const min = 10;
		const max = 20;
		const expected = 13;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[11,13], min=10, max=20, expected=10', () => {
		const usedNumbers = [11, 13];
		const min = 10;
		const max = 20;
		const expected = 10;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[10,11,12,13,14,15,16,17,18,19], min=10, max=20, expected=20', () => {
		const usedNumbers = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		const min = 10;
		const max = 20;
		const expected = 20;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});

	it('usedNumbers=[10,11,12,13,14,15,16,17,18,19,20], min=10, max=20, expected=null', () => {
		const usedNumbers = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
		const min = 10;
		const max = 20;
		const expected = null;

		const result = getAvailableNumber({ usedNumbers, min, max });

		expect(result).toEqual(expected);
	});
});