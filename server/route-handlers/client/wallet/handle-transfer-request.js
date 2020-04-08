const {
	transferByUserIdReceiverIdAndWalletCode,
} = require("../../../services/wallet");
const {
	ENUM_WALLET_CODE,
} = require("../../../lib/enum");

module.exports = async function handleTransferRequest(req, res, next) {
	try {
		const wallet = await transferByUserIdReceiverIdAndWalletCode(res.locals.user.id, res.locals.receiver.id, ENUM_WALLET_CODE.PRIMARY, {
			amount: req.body.amount,
		});

		res.status(201).json(wallet);
	} catch (error) {
		next(error);
	}
};
