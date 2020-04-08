const { db } = global.CONFIG;
const {
	schema,
	indexes,
} = require("../schemas/mysql/staff");
const model = require("ljit-db/model")(db, "staffs", schema, indexes);
const RoleModel = require("./role");
const RoleRelationshipModel = require("./role-relationship");
const {
	ENUM_STAFF_STATUS,
} = require("../lib/enum");

model.prototype.isBlocked = function () {
	return this.status === ENUM_STAFF_STATUS.BLOCKED;
};

model.belongsTo(RoleModel.getInstance(), {
	constraints: false,
	as: "role",
	foreignKey: "roleId",
	targetKey: "id",
});

model.hasMany(RoleRelationshipModel.getInstance(), {
	constraints: false,
	as: "roleRelationships",
	sourceKey: "roleId",
	foreignKey: "roleId",
});

module.exports = require("ljit-db/model/interface")(db, model);
