const {
	seperateDepositAmountToIntegerAndFraction,
} = require('../../../../server/lib/deposit');

describe('seperateDepositAmountToIntegerAndFraction', () => {
	it('depositAmount=0.01 expected={ integer=1, fraction=1 }', () => {
		const depositAmount = 0.01;
		const expected = {
			integer: 1,
			fraction: 1,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});

	it('depositAmount=0.5 expected={ integer=1, fraction=50 }', () => {
		const depositAmount = 0.5;
		const expected = {
			integer: 1,
			fraction: 50,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});

	it('depositAmount=0.99 expected={ integer=1, fraction=99 }', () => {
		const depositAmount = 0.99;
		const expected = {
			integer: 1,
			fraction: 99,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});

	it('depositAmount=19.1 expected={ integer=20, fraction=10 }', () => {
		const depositAmount = 19.1;
		const expected = {
			integer: 20,
			fraction: 10,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});

	it('depositAmount=19.11 expected={ integer=20, fraction=11 }', () => {
		const depositAmount = 19.11;
		const expected = {
			integer: 20,
			fraction: 11,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});

	it('depositAmount=19.87 expected={ integer=20, fraction=87 }', () => {
		const depositAmount = 19.87;
		const expected = {
			integer: 20,
			fraction: 87,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});

	it('depositAmount=999.2 expected={ integer=1000, fraction=20 }', () => {
		const depositAmount = 999.2;
		const expected = {
			integer: 1000,
			fraction: 20,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});

	it('depositAmount=999.3 expected={ integer=1000, fraction=30 }', () => {
		const depositAmount = 999.3;
		const expected = {
			integer: 1000,
			fraction: 30,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});

	it('depositAmount=999.4 expected={ integer=1000, fraction=40 }', () => {
		const depositAmount = 999.4;
		const expected = {
			integer: 1000,
			fraction: 40,
		};

		const result = seperateDepositAmountToIntegerAndFraction(depositAmount);

		expect(result).toEqual(expected);
	});
});
