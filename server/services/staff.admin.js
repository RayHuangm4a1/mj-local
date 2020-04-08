const Sequelize = require("sequelize");
const StaffStore = require("../stores/staff");
const RoleStore = require("../stores/role");
const RoleRelationShipStore = require("../stores/role-relationship");
const AccountStore = require("../stores/account");
const {
	ConflictError,
} = require("ljit-error");
const {
	STAFF_DUPLICATED,
} = require("../lib/error/code");
const {
	keyBy,
} = require('ljit-collection');

async function createStaff(row) {
	try {
		return StaffStore.createStaff(row);
	} catch (error) {
		if (error instanceof Sequelize.UniqueConstraintError) {
			throw new ConflictError(STAFF_DUPLICATED.MESSAGE, STAFF_DUPLICATED.CODE);
		}

		throw error;
	}
}

async function getActiveDescendantRolesByRoleId(roleId, {
	projections,
} = {}) {
	try {
		const role = await RoleStore.getRoleWithActiveDescendantsById(roleId, { projections });

		return (role !== null) ? role.descendantRoles : [];
	} catch (error) {
		throw error;
	}
}

async function getStaffsWithRoleAndAccountByAncestorRoleIdAndPagination(roleId, page, {
	username,
	limit,
	requestId,
}) {
	const result = await StaffStore.getStaffsWithRoleByAncestorRoleIdAndPagination(roleId, page, {
		username,
		limit,
	});

	const { data: staffs } = result;
	const accounts = await Promise.map(staffs, staff => {
		return AccountStore.getAccountById(staff.accountId, { requestId });
	});

	const accountMap = keyBy(accounts, '_id');

	staffs.forEach(staff => {
		staff.account = accountMap[staff.accountId];
	});

	return result;
}

module.exports = {
	createStaff,
	createAccount: AccountStore.createAccount,
	getStaffByUsername: StaffStore.getStaffByUsername,
	getStaffById: StaffStore.getStaffById,
	getStaffWithRoleById: StaffStore.getStaffWithRoleById,
	updateLoginAuditById: StaffStore.updateLoginAuditById,
	updateStaffById: StaffStore.updateStaffById,
	updateLoginPasswordByAccountId: AccountStore._updateLoginPasswordByAccountId,
	updateLoginPasswordUpdatedAtById: StaffStore.updateLoginPasswordUpdatedAtById,
	disableGoogleTOTPByAccountId: AccountStore._disableGoogleTOTPByAccountId,

	getActiveDescendantRolesByRoleId,
	getStaffsWithRoleAndAccountByAncestorRoleIdAndPagination,
	getDescendantRolesWithParentById: RoleStore.getDescendantRolesWithParentById,

	isDescendantRoleByAncestorRoleIdAndDescendantRoleId: RoleRelationShipStore.isDescendantRoleByAncestorRoleIdAndDescendantRoleId,

	STAFF_PROJECTIONS: {
		USERNAME: StaffStore.USERNAME_ONLY_PROJECTIONS,
	},

	ROLE_PROJECTIONS: {
		NAME: RoleStore.NAME_ONLY_PROJECTIONS,
	},
};
