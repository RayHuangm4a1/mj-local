const express = require("express");
const router = express.Router();
const {
	beforeGetDepositClassesRequest,
} = require("../../route-hooks/client/deposit-class");
const {
	beforeCreateDepositApplicationFormBelongToDepositClassRequest,
} = require("../../route-hooks/client/deposit-application-form");
const {
	handleGetDepositClassesRequest,
} = require("../../route-handlers/client/deposit-class");
const {
	handleCreateDepositApplicationFormBelongToDepositClassRequest,
} = require("../../route-handlers/client/deposit-application-form");

router.get("/",
	beforeGetDepositClassesRequest,
	handleGetDepositClassesRequest
);

router.post("/id=:depositClassId/deposit-application-forms",
	beforeCreateDepositApplicationFormBelongToDepositClassRequest,
	handleCreateDepositApplicationFormBelongToDepositClassRequest
);

module.exports = router;
