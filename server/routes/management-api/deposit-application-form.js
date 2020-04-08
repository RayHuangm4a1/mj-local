const express = require("express");
const router = express.Router();

const {
	beforeConfirmInconsistentDepositApplicationFormRequest,
	afterConfirmInconsistentDepositApplicationFormRequest,
} = require("../../route-hooks/management/deposit-application-form");
const {
	handleConfirmInconsistentDepositApplicationFormRequest,
} = require("../../route-handlers/management/deposit-application-form");

router.post("/id=:inconsistentDepositApplicationFormId/confirmed",
	beforeConfirmInconsistentDepositApplicationFormRequest,
	handleConfirmInconsistentDepositApplicationFormRequest,
	afterConfirmInconsistentDepositApplicationFormRequest
);

module.exports = router;
