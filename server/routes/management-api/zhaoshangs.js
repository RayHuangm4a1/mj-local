const express = require("express");
const router = express.Router();

const {
	beforeGetZhaoshangsRequest,
} = require("../../../server/route-hooks/management/user");

const {
	handleGetZhaoshangsRequest,
} = require("../../../server/route-handlers/management/user");

router.get("/",
	beforeGetZhaoshangsRequest,
	handleGetZhaoshangsRequest
);

module.exports = router;
