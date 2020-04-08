const {
	updateFixedWageByIdAndFixedWage,
} = require("../../../services/user");

module.exports = async function handleUpdateChildrenFixedWageRequest(req, res, next) {
	const { childrenId } = req.params;
	const { fixedWage: updatedFixedWage } = req.body;
	const { fixedWage } = res.locals.user.descendants[0];

	try {
		await updateFixedWageByIdAndFixedWage(childrenId, fixedWage, {
			updatedFixedWage
		});

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
