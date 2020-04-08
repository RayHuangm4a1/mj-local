const Sequelize = require("sequelize");
const {
	ENUM_DEPOSIT_CLASS_STATUS,
} = require("../../lib/enum");

const schema = {
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	ordering: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	status: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			isIn: [
				Object.values(ENUM_DEPOSIT_CLASS_STATUS),
			],
		},
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["name"],
		},
		{
			unique: true,
			fields: ["ordering"],
		},
		{
			unique: false,
			fields: ["status", "ordering"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};
