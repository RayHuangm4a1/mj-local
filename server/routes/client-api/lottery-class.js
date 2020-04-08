const express = require("express");
const router = express.Router();
const { handleGetLotteryClassesRequest } = require("../../route-handlers/client/lottery-class");

router.get("/", handleGetLotteryClassesRequest);

module.exports = router;
