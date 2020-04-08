const Sequelize = require("sequelize");
const {
	ENUM_ROLE_TYPE,
	ENUM_COMMENT_STATUS,
} = require("../../lib/enum");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	creatorId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	creatorUsername: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	type: {
		type: Sequelize.TINYINT,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_ROLE_TYPE),
			],
		},
	},
	status: {
		type: Sequelize.TINYINT,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_COMMENT_STATUS),
			],
		},
	},
	description: {
		type: Sequelize.STRING,
		allowNull: false,
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["userId", "status", "createdAt"],
		},
	],
};

module.exports = {
	schema,
	indexes,
};
