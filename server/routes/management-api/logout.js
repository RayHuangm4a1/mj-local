const router = require('express').Router();
const {
	handleLogoutRequest,
} = require("../../route-handlers/management/logout");

router.post("/", handleLogoutRequest);

module.exports = router;
