const UserFavoriteModel = require("../models/user-favorite");

function drop() {
	return UserFavoriteModel.getInstance().sync({ force: true });
}

exports.drop = drop;
