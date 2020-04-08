const {
	simplifyBankCardNumber,
} = require('../../../../server/lib/bank-card');

describe(`simplifyBankCardNumber`, () => {
	it(`bankCardNumber=6225760008219524 | expected=9524`, () => {
		const bankCardNumber = '6225760008219524';
		const expected = '9524';

		const result = simplifyBankCardNumber(bankCardNumber);

		expect(result).toEqual(expected);
	});
});