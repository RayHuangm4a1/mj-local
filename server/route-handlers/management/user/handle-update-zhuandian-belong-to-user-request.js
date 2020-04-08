const {
	updateUserZhuandianById,
} = require("../../../services/user.admin");

module.exports = async function handleUpdateZhuandianBelongToUserRequest(req, res, next) {
	const { userId } = req.params;
	const { isEnableIncentiveZhuandian, isEnableDepositZhuandian } = req.body;

	try {
		await updateUserZhuandianById(
			userId,
			{
				isEnableIncentiveZhuandian,
				isEnableDepositZhuandian
			}
		);

		res.status(204).end();

		next();
	} catch (error) {
		next(error);
	}
};
