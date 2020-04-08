const {
	createAccount,
	createUser,
} = require("../../../services/user");
const { ENUM_USER_TYPE } = require("../../../lib/enum");
const {
	ROOT_USER_ID,
} = require("../../../lib/user");

module.exports = async function handleCreateZhaoShangRequest(req, res, next) {
	const requestId = req.header("x-request-id");
	const { ip } = req.device;
	const {
		username, password, bonus,
		nickname,
	} = req.body;

	let account = null;

	try {
		account = await createAccount({ username, password }, { requestId, ip });
	} catch (error) {
		return next(error);
	}

	try {
		const user = await createUser({
			username,
			nickname,
			accountId: account._id,
			type: ENUM_USER_TYPE.ZHAOSHANG,
			parentId: ROOT_USER_ID,
			deltaBonus: bonus - res.locals.platform.bonus.max,
			fixedWage: res.locals.platform.fixedWage,
			createdBy: "管理者创建",
		});

		res.status(201).json(user);

		next();
	} catch (error) {
		req.event.accountId = account._id;

		global.ACCOUNT_ARCHIVE_PRODUCER.produce(req.event);

		next(error);
	}
};
