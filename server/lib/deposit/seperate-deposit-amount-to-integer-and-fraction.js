function seperateDepositAmountToIntegerAndFraction(depositAmount) {
	return {
		integer: Math.floor(depositAmount) + 1,
		fraction: Math.floor(depositAmount * 100) % 100,
	};
}

module.exports = seperateDepositAmountToIntegerAndFraction;