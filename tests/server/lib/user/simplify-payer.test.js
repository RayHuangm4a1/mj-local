const {
	simplifyPayer,
} = require('../../../../server/lib/user');

describe('simplifyPayer', () => {
	it('payer="測試者", expected="**者"', () => {
		const payer = '測試者';
		const expected = '**者';

		const result = simplifyPayer(payer);

		expect(result).toEqual(expected);
	});

	it('payer="班奈狄克康柏拜區", expected="*******區"', () => {
		const payer = '班奈狄克康柏拜區';
		const expected = '*******區';

		const result = simplifyPayer(payer);

		expect(result).toEqual(expected);
	});

	it('payer=null, expected=null', () => {
		const payer = null;
		const expected = null;

		const result = simplifyPayer(payer);

		expect(result).toEqual(expected);
	});
});