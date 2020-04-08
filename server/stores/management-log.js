const {
	create,
} = require("../models/management-log");

function createManagementLog(row, {
	transaction,
} = {}) {
	return create(row, { transaction });
}

module.exports = {
	createManagementLog,
};
