const express = require("express");
const router = express.Router();

const {
	beforeGetBettingsRequest,
} = require("../../route-hooks/management/betting");
const {
	handleGetBettingsRequest,
} = require("../../route-handlers/management/betting");

router.get("/",
	beforeGetBettingsRequest,
	handleGetBettingsRequest
);

module.exports = router;
