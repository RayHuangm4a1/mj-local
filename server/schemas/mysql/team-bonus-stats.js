const Sequelize = require("sequelize");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	deltaBonus: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	numOfUsers: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
};

const indexes = {
	indexes:[
	],
};

module.exports = {
	schema,
	indexes,
};
