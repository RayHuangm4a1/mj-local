const Sequelize = require("sequelize");

const schema = {
	roleId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
	},
	ancestorRoleId: {
		type: Sequelize.INTEGER,
		allowNull: false,
		primaryKey: true,
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
			fields: ["ancestorRoleId", "distance"],
		},
	],
	timestamps: false,
};

module.exports = {
	schema,
	indexes,
};
