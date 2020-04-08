const DepositClassStore = require('../stores/deposit-class');
const BankAccountStore = require('../stores/bank-account');
const DepositApplicationFormStore = require('../stores/deposit-application-form');
const BankAccountFilters = require('../lib/bank-account-filters');
const {
	get,
	groupBy,
} = require('ljit-collection');

async function getDepositClassesWithinBankAccountsByLevelId(levelId) {
	const depositClasses = await DepositClassStore.getActiveDepositClasses({
		projections: DepositClassStore.MIN_PROJECTIONS,
	});

	if (!depositClasses.length) {
		return [];
	}

	const depositClassIds = depositClasses.map(({ id }) => id);
	const bankAccounts = await BankAccountStore.getActiveBankAccountsWithinDepositClassIdsAndLevelId(
		depositClassIds,
		levelId,
		{
			projections: BankAccountStore.MIN_PROJECTIONS,
		}
	);

	const bankAccountsMap = groupBy(bankAccounts, 'depositClassId');
	const results = depositClasses.map(depositClass => {
		const bankAccounts = get(bankAccountsMap, depositClass.id, []);

		depositClass.bankAccounts = BankAccountFilters.get(depositClass.id)
			.getDepositableBankAccounts(bankAccounts);

		return depositClass;
	});

	return results;
}

module.exports = {
	getDepositClassesWithinBankAccountsByLevelId,
	getDepositApplicationFormsByDepartmentIdDepositClassIdAndPagination: DepositApplicationFormStore.getDepositApplicationFormsByDepartmentIdDepositClassIdAndPagination,
};