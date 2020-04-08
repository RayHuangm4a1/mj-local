const {
	getActiveBankCardsByUserId,
} = require('../../../services/bank-card');
const {
	simplifyBankCardNumber,
} = require('../../../lib/bank-card');
const {
	simplifyPayer,
} = require('../../../lib/user');

module.exports = async function handleGetBankCardsRequest(req, res, next) {
	const { id: userId } = req.user;

	try {
		const bankCards = await getActiveBankCardsByUserId(userId);

		bankCards.forEach(bankCard => {
			bankCard.number = simplifyBankCardNumber(bankCard.number);
			bankCard.payer = simplifyPayer(bankCard.payer);
		});

		res.status(200).json(bankCards);
	} catch (error) {
		next(error);
	}
};