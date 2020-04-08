const express = require("express");
const router = express.Router();

const {
	beforeGetTracesRequest,
} = require("../../route-hooks/management/trace");
const {
	handleGetTracesRequest,
} = require("../../route-handlers/management/trace");

router.get("/",
	beforeGetTracesRequest,
	handleGetTracesRequest
);

module.exports = router;
