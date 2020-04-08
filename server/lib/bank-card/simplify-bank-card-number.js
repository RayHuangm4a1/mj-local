module.exports = function simplifyBankCardNumber(bankCardNumber, lastNDigits = 4) {
	return bankCardNumber.slice(-lastNDigits);
};
