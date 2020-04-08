const {
	createWithdrawalApplicationForm,
} = require('../../../services/withdrawal');
const {
	ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS,
} = require("../../../../server/lib/enum");

module.exports = async function handleCreateWithdrawalApplicationFormRequest(req, res, next) {
	const [bankCard] = res.locals.user.bankCards;
	const { feeByPlatform } = res.locals;

	try {
		const result = await createWithdrawalApplicationForm({
			userId: res.locals.user.id,
			username: res.locals.user.username,
			userLevelId: res.locals.user.levelId,
			walletCode: req.body.walletCode,
			bankId: bankCard.bankId,
			bankName: bankCard.bankName,
			bankCardId: bankCard.id,
			amount: req.body.amount,
			feeByPlatform,
			status: ENUM_WITHDRAWAL_APPLICATION_FORM_STATUS.NEW,
		});

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};
