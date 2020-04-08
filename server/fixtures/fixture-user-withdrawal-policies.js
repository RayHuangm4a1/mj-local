const UserWithdrawalPolicyModel = require("../models/user-withdrawal-policy");
const fixturedUserWithdrawalPolicies = require("./data/user-withdrawal-policy");
const logger = require("ljit-logger")("debug");

async function bulkCreateUserWithdrawalPoliciesDocument () {
	await UserWithdrawalPolicyModel.insertMany(fixturedUserWithdrawalPolicies);
}

async function init() {
	try {
		await bulkCreateUserWithdrawalPoliciesDocument();
		logger.info("[mysql][user-withdrawal-policies] fixture done");
	} catch (error) {
		logger.info("[mysql][user-withdrawal-policies] fixture failed", error.stack);
	}
}

function drop() {
	return UserWithdrawalPolicyModel.getInstance().sync({ force: true });
}

exports.init = init;
exports.drop = drop;
