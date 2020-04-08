const express = require("express");
const router = express.Router();
const {
	handleGetBettingsRequest,
	handleCancelBettingRequest,
	handleGetBettingRequest,
} = require("../../route-handlers/client/betting");
const {
	beforeGetBettingsRequest,
	beforeCancelBettingRequest,
	beforeGetBettingRequest,
} = require("../../route-hooks/client/betting");

router.get("/",
	beforeGetBettingsRequest,
	handleGetBettingsRequest
);

router.delete("/id=:bettingId",
	beforeCancelBettingRequest,
	handleCancelBettingRequest
);

router.get("/id=:bettingId",
	beforeGetBettingRequest,
	handleGetBettingRequest
);

module.exports = router;
