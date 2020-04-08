const express = require("express");
const router = express.Router();
const {
	beforeGetDepositApplicationFormsBelongToDepartmentRequest,
} = require("../../route-hooks/management/deposit-application-form");
const {
	handleGetDepositApplicationFormsBelongToDepartmentRequest,
} = require("../../route-handlers/management/deposit-application-form");

router.get("/id=:departmentId/deposit-classes/id=:depositClassId/deposit-application-forms",
	beforeGetDepositApplicationFormsBelongToDepartmentRequest,
	handleGetDepositApplicationFormsBelongToDepartmentRequest
);

module.exports = router;
