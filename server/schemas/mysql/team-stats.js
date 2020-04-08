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
	walletCode: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		allowNull: false,
	},
	numOfUsers: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 1,
	},
	numOfZeroBalanceUsers: {
		type: Sequelize.INTEGER,
		allowNull: false,
		// TODO: alpha
		defaultValue: 0,
		// TODO: production
		// defaultValue: 1,
	},
	numOfNonZeroBalanceUsers: {
		type: Sequelize.INTEGER,
		allowNull: false,
		// TODO: alpha
		defaultValue: 1,
		// TODO: production
		// defaultValue: 0,
	},
	balance: {
		type: Sequelize.DECIMAL(14, 4),
		allowNull: false,
		// TODO: alpha
		defaultValue: 1000000,
		// TODO: production
		// defaultValue: 0,
	},
	depositAmount: {
		type: Sequelize.DECIMAL(20, 4),
		allowNull: false,
		defaultValue: 0,
	},
	withdrawalAmount: {
		type: Sequelize.DECIMAL(20, 4),
		allowNull: false,
		defaultValue: 0,
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
