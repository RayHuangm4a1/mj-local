const express = require("express");
const router = express.Router();

const {
	beforeUpdateNormalLevelRequest,
	afterUpdateNormalLevelRequest,
	beforeUpdateSpecialLevelRequest,
	afterUpdateSpecialLevelRequest,
	beforeGetUsersBelongToLevelRequest,
} = require("../../route-hooks/management/level");

const {
	handleGetLevelsRequest,
	handleUpdateNormalLevelRequest,
	handleUpdateSpecialLevelRequest,
	handleGetUsersBelongToLevelRequest,
} = require("../../route-handlers/management/level");

router.get("/",
	handleGetLevelsRequest
);

router.get("/id=:levelId/users",
	beforeGetUsersBelongToLevelRequest,
	handleGetUsersBelongToLevelRequest
);

router.patch("/id=:levelId",
	beforeUpdateNormalLevelRequest,
	handleUpdateNormalLevelRequest,
	afterUpdateNormalLevelRequest
);

router.patch("/id=:levelId",
	beforeUpdateSpecialLevelRequest,
	handleUpdateSpecialLevelRequest,
	afterUpdateSpecialLevelRequest
);

module.exports = router;
