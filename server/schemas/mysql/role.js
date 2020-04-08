const Sequelize = require("sequelize");
const {
	ENUM_ROLE_STATUS,
	ENUM_ROLE_TYPE,
} = require("../../lib/enum");

const schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	type: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_ROLE_TYPE),
			],
		},
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: ENUM_ROLE_STATUS.ACTIVE,
		validate: {
			isIn: [
				Object.values(ENUM_ROLE_STATUS),
			],
		},
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
