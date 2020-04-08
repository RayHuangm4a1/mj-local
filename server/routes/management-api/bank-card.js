const express = require("express");
const router = express.Router();

const {
	beforeGetBlockedBankCardsRequest,

	beforeBlockBankCardsRequest,
	afterBlockBankCardsRequest,

	beforeUnblockBankCardRequest,
	afterUnblockBankCardRequest,
} = require("../../route-hooks/management/bank-card");
const {
	handleGetBlockedBankCardsRequest,
	handleBlockBankCardsRequest,
	handleUnblockBankCardRequest,
} = require("../../route-handlers/management/bank-card");

router.get("/",
	beforeGetBlockedBankCardsRequest,
	handleGetBlockedBankCardsRequest
);

router.post("/",
	beforeBlockBankCardsRequest,
	handleBlockBankCardsRequest,
	afterBlockBankCardsRequest
);

router.delete("/id=:bankCardId/blocked",
	beforeUnblockBankCardRequest,
	handleUnblockBankCardRequest,
	afterUnblockBankCardRequest
);

module.exports = router;
