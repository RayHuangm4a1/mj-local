const Sequelize = require("sequelize");

const schema = {
	startedAt: {
		type: Sequelize.DATEONLY,
		allowNull: false,
	},
	closedAt: {
		type: Sequelize.DATEONLY,
		allowNull: false,
	},
};

const indexes = {
	indexes:[
		{
			unique: true,
			fields: ["startedAt"],
		},
		{
			unique: true,
			fields: ["closedAt"],
		},
		{
			unique: true,
			fields: ["startedAt", "closedAt"],
		},
	]
};

module.exports = {
	schema,
	indexes,
};
