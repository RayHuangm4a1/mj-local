module.exports = function composeUserBankCard ({
	bankCard,
	payer,
	userBankCard,
}) {
	return {
		id: bankCard.id,
		bankName: bankCard.bankName,
		number: bankCard.number,
		payer,
		activatedAt: userBankCard.activatedAt,
		withdrawableAt: userBankCard.withdrawableAt,
		status: userBankCard.status,
	};
};