const {
	ForbiddenError,
} = require("ljit-error");
const {
	TRANSFER_OVERFLOW,
} = require("../lib/error/code");
const {
	ENUM_WALLET_CODE,
} = require("../lib/enum");
const {
	isExceedMaxTransferAmountPerDayByUserIdWalletCodeAndAmount,
} = require("./../services/wallet");

async function isExceedMaxTransferAmountPerDay(req, res, next) {
	try {
		const isExceed = await isExceedMaxTransferAmountPerDayByUserIdWalletCodeAndAmount(res.locals.user.id, ENUM_WALLET_CODE.PRIMARY, req.body.amount);

		if (isExceed) {
			throw new ForbiddenError(TRANSFER_OVERFLOW.MESSAGE, TRANSFER_OVERFLOW.CODE);
		}
	} catch (error) {
		return next(error);
	}

	next();
}

module.exports = {
	isExceedMaxTransferAmountPerDay,
};
