const express = require("express");
const router = express.Router();
const {
	handleGetPlayClassesRequest,
} = require("../../route-handlers/client/play-class");

router.get("/", handleGetPlayClassesRequest);

module.exports = router;