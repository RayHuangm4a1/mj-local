const express = require("express");
const router = express.Router();
const {
	beforeGetStaffsRequest,
	beforeCreateStaffRequest,
	beforeUpdateStaffRequest,
	beforeUpdateLoginPasswordBelongToStaffRequest,
	beforeDisableGoogleTOTPBelongToStaffRequest,
	beforeGetRolesBelongToStaffWithMeRequest,
	beforeGetRolesBelongToStaffWithoutMeRequest,
	afterCreateStaffRequest,
	afterUpdateStaffRequest,
	afterUpdateLoginPasswordBelongToStaffRequest,
	afterDisableGoogleTOTPBelongToStaffRequest,
} = require("../../route-hooks/management/staff");
const {
	handleGetMeRequest,
	handleGetStaffsRequest,
	handleCreateStaffRequest,
	handleGetRolesBelongToStaffWithMeRequest,
	handleGetRolesBelongToStaffWithoutMeRequest,
	handleUpdateStaffRequest,
	handleUpdateLoginPasswordBelongToStaffRequest,
	handleDisableGoogleTOTPBelongToStaffRequest,
} = require("../../route-handlers/management/staff");

router.get("/id=me", handleGetMeRequest);

router.get("/",
	beforeGetStaffsRequest,
	handleGetStaffsRequest
);

router.post("/",
	beforeCreateStaffRequest,
	handleCreateStaffRequest,
	afterCreateStaffRequest
);

router.get("/id=me/roles",
	beforeGetRolesBelongToStaffWithMeRequest,
	handleGetRolesBelongToStaffWithMeRequest
);

router.get("/id=me/roles",
	beforeGetRolesBelongToStaffWithoutMeRequest,
	handleGetRolesBelongToStaffWithoutMeRequest
);

router.patch("/id=:staffId",
	beforeUpdateStaffRequest,
	handleUpdateStaffRequest,
	afterUpdateStaffRequest
);

router.put("/id=:staffId/credentials/type=login",
	beforeUpdateLoginPasswordBelongToStaffRequest,
	handleUpdateLoginPasswordBelongToStaffRequest,
	afterUpdateLoginPasswordBelongToStaffRequest
);

router.delete("/id=:staffId/google-totp",
	beforeDisableGoogleTOTPBelongToStaffRequest,
	handleDisableGoogleTOTPBelongToStaffRequest,
	afterDisableGoogleTOTPBelongToStaffRequest,
);

module.exports = router;
