const BankAccountFilters = require('../../../../server/lib/bank-account-filters');

describe('BankAccountFilters getDepositableBankAccounts', () => {
	it('网银转帐 bankAccounts=[{ balance: 0 }, { balance: 1 }]', () => {
		const DEPOSIT_CLASS_ID = 1;
		const bankAccounts = [
			{
				"id": 1,
				"name": "网银一号",
				"depositClassId": 1,
				"receivedAmountType": 1,
				"minReceivedAmount": 20,
				"maxReceivedAmount": 2000,
				"fixedReceivedAmounts": [],
				"balance": 0,
			},
			{
				"id": 2,
				"name": "网银二号",
				"depositClassId": 1,
				"receivedAmountType": 1,
				"minReceivedAmount": 20,
				"maxReceivedAmount": 2000,
				"fixedReceivedAmounts": [],
				"balance": 1,
			},
		];

		const expected = [bankAccounts[0]];
		const result = BankAccountFilters.get(DEPOSIT_CLASS_ID).getDepositableBankAccounts(bankAccounts);

		expect(result).toEqual(expected);
	});
});