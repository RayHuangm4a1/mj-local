const Sequelize = require("sequelize");
const {
	ENUM_USER_LEVEL_LOG_STATUS,
} = require("../../lib/enum");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	previousLevelId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	afterLevelId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_USER_LEVEL_LOG_STATUS),
			],
		},
	},
};

const indexes = {
	indexes: [
		{
			unique: false,
			fields: ["userId", "createdAt"],
		},
		{
			unique: false,
			fields: ["previousLevelId", "createdAt"],
		},
		{
			unique: false,
			fields: ["afterLevelId", "createdAt"],
		},
		{
			unique: false,
			fields: ["previousLevelId", "afterLevelId", "createdAt"],
		},
	],
};

module.exports = {
	schema,
	indexes,
};
