const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/role");
const model = require("ljit-db/model")(db, "roles", schema, indexes);
const through = require("./role-relationship").getInstance();

model.belongsToMany(model, {
	through: {
		model: through,
		unique: false,
	},
	constraints: false,
	foreignKey: 'roleId',
	otherKey: 'ancestorRoleId',
	as: 'ancestorRoles',
});

model.belongsToMany(model, {
	through: {
		model: through,
		unique: false,
		as: "roleRelationships"
	},
	constraints: false,
	foreignKey: "ancestorRoleId",
	otherKey: "roleId",
	as: "descendantRoles",
});

module.exports = require("ljit-db/model/interface")(db, model);
