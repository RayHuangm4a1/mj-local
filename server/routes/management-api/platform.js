const express = require("express");
const router = express.Router();
const {
	handleGetPlatformRequest,
	handleUpdatePlatformDividendSettingsRequest,
	handleUpdatePlatformFixedWageRequest,
} = require("../../route-handlers/management/platform");
const {
	beforeGetPlatformRequest,
	beforeUpdatePlatformDividendSettingsRequest,
	afterUpdatePlatformDividendSettingsRequest,
	beforeUpdatePlatformFixedWageRequest,
	afterUpdatePlatformFixedWageRequest,
} = require("../../route-hooks/management/platform");

router.get("/",
	beforeGetPlatformRequest,
	handleGetPlatformRequest
);

router.put("/dividend-settings",
	beforeUpdatePlatformDividendSettingsRequest,
	handleUpdatePlatformDividendSettingsRequest,
	afterUpdatePlatformDividendSettingsRequest
);

router.put("/fixed-wage",
	beforeUpdatePlatformFixedWageRequest,
	handleUpdatePlatformFixedWageRequest,
	afterUpdatePlatformFixedWageRequest
);

module.exports = router;
