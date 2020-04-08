const RiskLevelIPPolicyModel = require("../models/risk-level-ip-policy");

function drop() {
	return RiskLevelIPPolicyModel.getInstance().sync({ force: true });
}

exports.drop = drop;
