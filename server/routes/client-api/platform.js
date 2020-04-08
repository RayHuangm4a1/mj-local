const express = require("express");
const router = express.Router();
const { handleGetPlatformRequest } = require("../../route-handlers/client/platform");

router.get("/", handleGetPlatformRequest);

module.exports = router;