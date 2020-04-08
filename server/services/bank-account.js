const BankAccountStore = require('../stores/bank-account');

module.exports = {
	getBankAccountWithLevelsByIdAndDepositClassId: BankAccountStore.getBankAccountWithLevelsByIdAndDepositClassId,

	BANK_ACCOUNT_PROJECTIONS: {
		MIN: BankAccountStore.MIN_PROJECTIONS,
		DEPOSIT: BankAccountStore.DEPOSIT_REQUIRED_PROJECTIONS,
	},
};
