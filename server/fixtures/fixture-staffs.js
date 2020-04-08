const StaffModel = require("../models/staff");
const fixturedStaffs = require("./data/staff");
const logger = require("ljit-logger")("debug");

async function bulkCreateStaffsDocument () {
	await StaffModel.insertMany(fixturedStaffs);
}

async function init() {
	try {
		await bulkCreateStaffsDocument();
		logger.info("[mysql][staff] fixture done");
	} catch (error) {
		logger.info("[mysql][staff] fixture failed", error.stack);
	}
}

function drop() {
	return StaffModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;
