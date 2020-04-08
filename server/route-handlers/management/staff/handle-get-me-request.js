const { getStaffById } = require("../../../services/staff.admin");

module.exports = async function handleGetMeRequest(req, res, next) {
	try {
		const result = await getStaffById(req.user.id);

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
