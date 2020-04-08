const {
	ENUM_MANAGEMENT_STATUS,
} = require("../../lib/enum");
const {
	createManagementLog,
} = require("../../services/management-log.admin");

async function createSuccessManagementLog(req, res, next) {
	if (req.managementLog === undefined) {
		return;
	}

	try {
		req.managementLog.status = ENUM_MANAGEMENT_STATUS.SUCCESS;

		await createManagementLog(req.managementLog);
	} catch (error) {
		global.LOGGER.error(error.formatStack());
	}

	next();
}

module.exports = {
	createSuccessManagementLog,
};
