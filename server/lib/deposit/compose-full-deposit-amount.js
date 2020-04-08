function composeFullDepositAmount({ integer, fraction }) {
	return (integer - 1) + (fraction / 100);
}

module.exports = composeFullDepositAmount;