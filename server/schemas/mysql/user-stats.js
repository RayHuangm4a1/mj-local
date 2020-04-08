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
	numOfDeposits: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	depositAmount: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
	maxAmountPerDeposit: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
	bettingAmount: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
	bettingReward: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
	numOfWithdraws: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: 0,
	},
	withdrawalAmount: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false,
		defaultValue: 0,
	},
	damaAmount: {
		type: Sequelize.DECIMAL(13, 4).UNSIGNED,
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
