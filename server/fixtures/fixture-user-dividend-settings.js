const UserDividendSettingModel = require("../models/user-dividend-setting");

function drop() {
	return UserDividendSettingModel.getInstance().sync({ force: true });
}

exports.drop = drop;
