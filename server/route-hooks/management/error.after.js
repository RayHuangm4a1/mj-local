const {
	ENUM_MANAGEMENT_STATUS,
} = require("../../lib/enum");
const {
	createManagementLog,
} = require("../../services/management-log.admin");

async function createFailedManagementLog(error, req, res, next) {
	if (req.managementLog === undefined) {
		return next(error);
	}

	try {
		req.managementLog.status = ENUM_MANAGEMENT_STATUS.FAILED;
		req.managementLog.error = error.message;

		await createManagementLog(req.managementLog);
	} catch (error) {
		global.LOGGER.error(error.formatStack());
	}

	next(error);
}

module.exports = {
	createFailedManagementLog,
};
