function getDepositableBankAccounts(bankAccounts) {
	return bankAccounts.slice(0, 1);
}

module.exports = {
	getDepositableBankAccounts,
};