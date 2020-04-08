const Sequelize = require("sequelize");
const {
	ENUM_STAFF_STATUS,
} = require("../../lib/enum");

const schema = {
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	accountId: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	roleId: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	description: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	ip: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	geo: {
		type: Sequelize.STRING,
		allowNull: true,
		defaultValue: null,
	},
	loginAt: {
		type: Sequelize.DATE,
		allowNull: true,
		defaultValue: null,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		defaultValue: ENUM_STAFF_STATUS.ACTIVE,
		validate: {
			isIn: [
				Object.values(ENUM_STAFF_STATUS),
			],
		},
	},
	loginPasswordUpdatedAt: {
		type: Sequelize.DATE,
		allowNull: false,
		defaultValue: new Date(),
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["username"],
		},
		{
			unique: false,
			fields: ["roleId"],
		}
	],
};

module.exports = {
	schema,
	indexes,
};
