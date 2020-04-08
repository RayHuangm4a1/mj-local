const express = require("express");
const router = express.Router();
const {
	handleGetSecurityQuestionsRequest,
} = require("../../route-handlers/client/security-question");

router.get("/", handleGetSecurityQuestionsRequest);

module.exports = router;