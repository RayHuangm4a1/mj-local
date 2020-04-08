const {
	ForbiddenError,
	NotFoundError,
} = require("ljit-error");
const {
	isDescendantRoleByAncestorRoleIdAndDescendantRoleId,
	getStaffById,
	getStaffWithRoleById,
} = require("../../services/staff.admin");
const {
	STAFF_COULD_NOT_BE_UPDATED,
	ROLE_COULD_NOT_BE_CHOSEN,
	STAFF_NOT_FOUND,
	STAFF_COULD_NOT_UPDATE_SELF,
} = require("../../lib/error/code");


/*
	驗證新增或更新管理員時，所選擇的角色是否為平級或下級
	res.locals.selectedRoleId 紀錄下拉式選單所選的 role 的 Id
*/
async function isValidSelectedRole(req, res, next) {
	const { roleId: ancestorRoleId } = req.user;
	const { selectedRoleId } = res.locals;

	if (ancestorRoleId === selectedRoleId) {
		return next();
	}

	try {
		const isDescendantRole = await isDescendantRoleByAncestorRoleIdAndDescendantRoleId(ancestorRoleId, selectedRoleId);

		if (!isDescendantRole) {
			throw new ForbiddenError(ROLE_COULD_NOT_BE_CHOSEN.MESSAGE, ROLE_COULD_NOT_BE_CHOSEN.CODE);
		}

		next();
	} catch (error) {
		next(error);
	}
}

async function prepareManagedStaff(req, res, next) {
	const { staffId } = req.params;

	try {
		res.locals.managedStaff = await getStaffById(staffId);

		if (res.locals.managedStaff === null) {
			throw new NotFoundError(STAFF_NOT_FOUND.MESSAGE, STAFF_NOT_FOUND.CODE);
		}

		if (req.user.roleId === res.locals.managedStaff.roleId) {
			return next();
		}

		const isDescendantRole = await isDescendantRoleByAncestorRoleIdAndDescendantRoleId(req.user.roleId, res.locals.managedStaff.roleId);

		if (!isDescendantRole) {
			throw new ForbiddenError(STAFF_COULD_NOT_BE_UPDATED.MESSAGE, STAFF_COULD_NOT_BE_UPDATED.CODE);
		}

		next();
	} catch (error) {
		next(error);
	}
}

function couldNotUpdateSelf(req, res, next) {
	try {
		if (req.user.id === req.params.staffId) {
			throw new ForbiddenError(STAFF_COULD_NOT_UPDATE_SELF.MESSAGE, STAFF_COULD_NOT_UPDATE_SELF.CODE);
		}

		next();
	} catch (error) {
		next(error);
	}
}

async function prepareStaffWithRole(req, res, next) {
	const { id } = req.user;

	try {
		const staff = await getStaffWithRoleById(id);

		if (staff === null) {
			throw new NotFoundError(
				STAFF_NOT_FOUND.MESSAGE,
				STAFF_NOT_FOUND.CODE
			);
		}

		res.locals.staff = staff;
	} catch (error) {
		return next(error);
	}

	next();
}

module.exports = {
	isValidSelectedRole,
	prepareManagedStaff,
	prepareStaffWithRole,
	couldNotUpdateSelf,
};
