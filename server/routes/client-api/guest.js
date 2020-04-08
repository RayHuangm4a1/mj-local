const express = require("express");
const router = express.Router();

const {
	beforeUpdateLoginPasswordViaSecurityQuestionRequest,
	beforeUpdateLoginPasswordViaGoogleTOTPRequest,
	beforeGetPasswordResettingMethodsRequest,
	beforeIsPayerExistedRequest,
	beforeLoginGeoValidationRequest,
	beforeUpdateLoginPasswordViaDefaultPasswordRequest,
} = require('../../route-hooks/client/guest');
const {
	handleUpdateLoginPasswordViaSecurityQuestionRequest,
	handleUpdateLoginPasswordViaGoogleTOTPRequest,
	handleGetPasswordResettingMethodsRequest,
	handleIsPayerExistedRequest,
	handleLoginGeoValidationRequest,
	handleUpdateLoginPasswordViaDefaultPasswordRequest,
} = require('../../route-handlers/client/guest');

router.get("/username=:username/password-resetting-methods",
	beforeGetPasswordResettingMethodsRequest,
	handleGetPasswordResettingMethodsRequest
);

router.get(
	'/username=:username',
	beforeLoginGeoValidationRequest,
	handleLoginGeoValidationRequest
);

router.get("/id=me/payers/name=:payer",
	beforeIsPayerExistedRequest,
	handleIsPayerExistedRequest
);

router.put("/id=me/credentials/type=login",
	beforeUpdateLoginPasswordViaSecurityQuestionRequest,
	handleUpdateLoginPasswordViaSecurityQuestionRequest
);

router.put("/id=me/credentials/type=login",
	beforeUpdateLoginPasswordViaGoogleTOTPRequest,
	handleUpdateLoginPasswordViaGoogleTOTPRequest
);

router.put(
	'/id=me/credentials/type=login',
	beforeUpdateLoginPasswordViaDefaultPasswordRequest,
	handleUpdateLoginPasswordViaDefaultPasswordRequest
);

module.exports = router;
