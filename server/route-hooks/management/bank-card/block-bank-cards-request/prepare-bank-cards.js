const {
	ENUM_BANK_CARD_STATUS,
} = require("../../../../lib/enum");

module.exports = function prepareBankCards(req, res, next) {
	try {
		const { id: userId, username } = req.user;
		const now = new Date();

		res.locals.preparedBankCards = req.body.map(({ blockedPayer, number, description }) => {
			return {
				blockedPayer,
				number,
				description,
				// TODO: 實作 用卡號取得銀行資訊
				bankId: 3080000,
				bankName: '招商银行',
				status: ENUM_BANK_CARD_STATUS.BLOCKED,
				operatorId: userId,
				operatorUsername: username,
				blockedAt: now,
			};
		});
	} catch (error) {
		return next(error);
	}

	next();
};
