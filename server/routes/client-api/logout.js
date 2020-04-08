const router = require("express").Router();
const {
	handleLogoutRequest,
} = require("../../route-handlers/client/logout");

router.post("/", handleLogoutRequest);

module.exports = router;