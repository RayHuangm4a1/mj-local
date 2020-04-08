const Sequelize = require("sequelize");
const {
	ENUM_MANAGEMENT_TYPE,
	ENUM_MANAGEMENT_ACTION,
	ENUM_MANAGEMENT_STATUS,
} = require("../../lib/enum");

const schema = {
	operatorId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	operatorUsername: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	associateId: {
		type: Sequelize.INTEGER,
		allowNull: true,
	},
	associateName: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	type: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_MANAGEMENT_TYPE),
			],
		},
	},
	action: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_MANAGEMENT_ACTION),
			],
		},
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_MANAGEMENT_STATUS),
			],
		},
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	details: {
		type: Sequelize.JSON,
		allowNull: true,
		/*
			USER_LEVEL_MODIFICATION
			{
				beforeLevelId: 1,
				afterLevelId: 2
			}
		*/
	},
	error: {
		type: Sequelize.STRING,
		allowNull: true,
	},
};

const indexes = {
	indexes: [
	],
};

module.exports = {
	schema,
	indexes,
};
