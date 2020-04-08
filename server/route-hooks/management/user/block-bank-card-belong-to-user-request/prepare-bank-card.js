const {
	getActiveBankCardByIdAndUserId,
} = require('../../../../services/bank-card.admin');

module.exports = async function prepareBankCard(req, res, next) {
	const { userId, bankCardId } = req.params;

	try {
		res.locals.bankCard = await getActiveBankCardByIdAndUserId(bankCardId, userId);
	} catch (error) {
		return next(error);
	}

	next();
};
