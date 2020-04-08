const express = require("express");
const router = express.Router();
const UserRouteHandler = require("../../route-handlers/user");

router.get("/login", UserRouteHandler.userLogin);
router.get("/me", UserRouteHandler.getPersonalData);

module.exports = router;
