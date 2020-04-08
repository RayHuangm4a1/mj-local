const Sequelize = require("sequelize");

const schema = {
	userId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	ancestorId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	ancestorUsername: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	distance: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
};

const indexes = {
	indexes:[
		{
			unique: false,
			fields: ["userId", "distance"],
		},
		{
			unique: false,
			fields: ["ancestorId", "distance"],
		},
	],
	timestamps: false,
};

module.exports = {
	schema,
	indexes,
};
