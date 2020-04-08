const express = require("express");
const router = express.Router();
const {
	beforeCreateWithdrawalApplicationFormRequest,
} = require("../../route-hooks/client/withdrawal-application-form");
const {
	handleCreateWithdrawalApplicationFormRequest,
} = require("../../route-handlers/client/withdrawal-application-form");

router.post("/",
	beforeCreateWithdrawalApplicationFormRequest,
	handleCreateWithdrawalApplicationFormRequest
);

module.exports = router;
