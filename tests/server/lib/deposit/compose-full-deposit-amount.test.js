const {
	composeFullDepositAmount,
} = require('../../../../server/lib/deposit');

describe('composeFullDepositAmount', () => {
	it('integer=1 fraction=1 expected=0.01', () => {
		const integer = 1;
		const fraction = 1;
		const expected = 0.01;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});

	it('integer=1 fraction=50 expected=0.5', () => {
		const integer = 1;
		const fraction = 50;
		const expected = 0.5;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});

	it('integer=1 fraction=99 expected=0.99', () => {
		const integer = 1;
		const fraction = 99;
		const expected = 0.99;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});

	it('integer=20 fraction=10 expected=19.1', () => {
		const integer = 20;
		const fraction = 10;
		const expected = 19.1;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});

	it('integer=20 fraction=11 expected=19.11', () => {
		const integer = 20;
		const fraction = 11;
		const expected = 19.11;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});

	it('integer=20 fraction=87 expected=19.87', () => {
		const integer = 20;
		const fraction = 87;
		const expected = 19.87;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});

	it('integer=1000 fraction=20 expected=999.2', () => {
		const integer = 1000;
		const fraction = 20;
		const expected = 999.2;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});

	it('integer=1000 fraction=30 expected=999.3', () => {
		const integer = 1000;
		const fraction = 30;
		const expected = 999.3;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});

	it('integer=1000 fraction=40 expected=999.4', () => {
		const integer = 1000;
		const fraction = 40;
		const expected = 999.4;

		const result = composeFullDepositAmount({ integer, fraction });

		expect(result).toEqual(expected);
	});
});