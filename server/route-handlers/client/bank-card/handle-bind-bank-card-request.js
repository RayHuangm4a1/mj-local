const {
	simplifyBankCardNumber,
} = require('../../../lib/bank-card');
const {
	simplifyPayer,
} = require('../../../lib/user');
const {
	bindBankCard,
} = require('../../../services/bank-card');

module.exports = async function handleBindBankCardRequest(req, res, next) {
	const { id: userId } = req.user;
	const { number } = req.body;
	const { id: bankId, name: bankName } = res.locals.bank;
	const { payer } = res.locals;

	try {
		const result = await bindBankCard({
			userId,
			payer,
			number,
			bankId,
			bankName,
		});

		result.number = simplifyBankCardNumber(result.number);
		result.payer = simplifyPayer(result.payer);

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};