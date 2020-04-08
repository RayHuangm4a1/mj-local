const express = require("express");
const router = express.Router();
const {
	beforeBindBankCardRequest,
	beforeUnbindBankCardRequest,
} = require("../../route-hooks/client/bank-card");
const {
	handleGetBankCardsRequest,
	handleBindBankCardRequest,
	handleUnbindBankCardRequest,
} = require('../../route-handlers/client/bank-card');

router.get("/", handleGetBankCardsRequest);

router.post("/",
	beforeBindBankCardRequest,
	handleBindBankCardRequest
);

router.delete("/id=:bankCardId",
	beforeUnbindBankCardRequest,
	handleUnbindBankCardRequest
);

module.exports = router;
