const express = require("express");
const router = express.Router();

const {
	beforeGetUserLevelLogsRequest,
} = require("../../../server/route-hooks/management/user-level-log");

const {
	handleGetUserLevelLogsRequest,
} = require("../../../server/route-handlers/management/user-level-log");

router.get("/",
	beforeGetUserLevelLogsRequest,
	handleGetUserLevelLogsRequest
);

module.exports = router;
