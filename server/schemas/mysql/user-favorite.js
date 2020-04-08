const Sequelize = require("sequelize");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
	},
	lotteryIds: {
		type: Sequelize.JSON,
		allowNull: true,
		defaultValue: [],
	},
};

const indexes = {
	indexes:[],
};

module.exports = {
	schema,
	indexes,
};
