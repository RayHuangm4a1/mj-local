const Sequelize = require("sequelize");
const {
	ENUM_TRANSACTION_STATUS,
} = require("../../lib/enum");

const schema = {
	id: {
		type: Sequelize.BIGINT,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
	},
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	associateId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	lotteryId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: -1,
	},
	issue: {
		type: Sequelize.BIGINT,
		allowNull: false,
		defaultValue: -1,
	},
	type: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	walletCode: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	amount: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: false
	},
	balance: {
		type: Sequelize.DECIMAL(13, 4),
		allowNull: true,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: ENUM_TRANSACTION_STATUS.DONE,
		validate: {
			isIn: [
				Object.values(ENUM_TRANSACTION_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["userId", "status", "createdAt"],
		},
		{
			unique: false,
			fields: ["userId", "type", "status", "createdAt"],
		},
		{
			unique: false,
			fields: ["lotteryId", "issue", "status", "createdAt"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};
