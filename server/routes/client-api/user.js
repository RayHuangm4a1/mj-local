const express = require("express");
const router = express.Router();

const {
	beforeGetUserRequest,
	beforeGetUserDailyStatsRequest,
	beforeUpdateNicknameRequest,
	beforeUpdateGreetingRequest,
	beforeSetSecurityQuestionsRequest,
	beforeUpdateLoginPasswordViaPasswordRequest,
	beforeUpdateBetPasswordViaPasswordRequest,
	beforeUpdateFundsPasswordViaPasswordRequest,
	beforeUpdateTemplateDividendSettingsRequest,
	beforeEnableLoginGeoValidationRequest,
	beforeDisableLoginGeoValidationRequest,
	beforeEnableGoogleTOTPRequest,
	beforeDisableGoogleTOTPRequest,
	beforeUpdateFundsPasswordViaGoogleTOTPRequest,
	beforeUpdateBetPasswordViaGoogleTOTPRequest,
	beforeUpdateLoginPasswordViaGoogleTOTPRequest,
	beforeUpdateFundsPasswordViaSecurityQuestionRequest,
	beforeUpdateBetPasswordViaSecurityQuestionRequest,
	beforeUpdateLoginPasswordViaSecurityQuestionRequest,
	beforeSetFavoriteLotteriesRequest,

	afterGetUserRequest,
} = require('../../route-hooks/client/user');
const {
	handleGetUserRequest,
	handleUpdateNicknameRequest,
	handleUpdateGreetingRequest,
	handleGetAccountRequest,
	handleUpdateFundsPasswordViaPasswordRequest,
	handleUpdateLoginPasswordViaPasswordRequest,
	handleUpdateBetPasswordViaPasswordRequest,
	handleSetSecurityQuestionsRequest,
	handleGetUserDailyStatsRequest,
	handleGetSelfDividendSettingsRequest,
	handleGetTemplateDividendSettingsRequest,
	handleUpdateTemplateDividendSettingsRequest,
	handleEnableLoginGeoValidationRequest,
	handleDisableLoginGeoValidationRequest,
	handleEnableGoogleTOTPRequest,
	handleDisableGoogleTOTPRequest,
	handleUpdateFundsPasswordViaGoogleTOTPRequest,
	handleUpdateBetPasswordViaGoogleTOTPRequest,
	handleUpdateLoginPasswordViaGoogleTOTPRequest,
	handleUpdateFundsPasswordViaSecurityQuestionRequest,
	handleUpdateBetPasswordViaSecurityQuestionRequest,
	handleUpdateLoginPasswordViaSecurityQuestionRequest,
	handleGetFavoriteLotteriesRequest,
	handleSetFavoriteLotteriesRequest,
} = require("../../route-handlers/client/user");

router.get("/id=me",
	beforeGetUserRequest,
	handleGetUserRequest,
	afterGetUserRequest
);

router.get("/id=me/daily-stats",
	beforeGetUserDailyStatsRequest,
	handleGetUserDailyStatsRequest
);

router.put("/id=me/nickname",
	beforeUpdateNicknameRequest,
	handleUpdateNicknameRequest
);

router.put("/id=me/greeting",
	beforeUpdateGreetingRequest,
	handleUpdateGreetingRequest
);

router.get(
	"/id=me/dividend-settings/type=self",
	handleGetSelfDividendSettingsRequest
);
router.get(
	"/id=me/dividend-settings/type=template",
	handleGetTemplateDividendSettingsRequest
);

router.get("/id=me/account", handleGetAccountRequest);

router.put("/id=me/credentials/type=login",
	beforeUpdateLoginPasswordViaPasswordRequest,
	handleUpdateLoginPasswordViaPasswordRequest
);

router.put("/id=me/credentials/type=login",
	beforeUpdateLoginPasswordViaSecurityQuestionRequest,
	handleUpdateLoginPasswordViaSecurityQuestionRequest
);

router.put("/id=me/credentials/type=login",
	beforeUpdateLoginPasswordViaGoogleTOTPRequest,
	handleUpdateLoginPasswordViaGoogleTOTPRequest
);

router.put("/id=me/credentials/type=bet",
	beforeUpdateBetPasswordViaPasswordRequest,
	handleUpdateBetPasswordViaPasswordRequest
);

router.put("/id=me/credentials/type=bet",
	beforeUpdateBetPasswordViaSecurityQuestionRequest,
	handleUpdateBetPasswordViaSecurityQuestionRequest
);

router.put("/id=me/credentials/type=bet",
	beforeUpdateBetPasswordViaGoogleTOTPRequest,
	handleUpdateBetPasswordViaGoogleTOTPRequest
);

router.put("/id=me/credentials/type=funds",
	beforeUpdateFundsPasswordViaPasswordRequest,
	handleUpdateFundsPasswordViaPasswordRequest
);

router.put("/id=me/credentials/type=funds",
	beforeUpdateFundsPasswordViaSecurityQuestionRequest,
	handleUpdateFundsPasswordViaSecurityQuestionRequest
);

router.put("/id=me/credentials/type=funds",
	beforeUpdateFundsPasswordViaGoogleTOTPRequest,
	handleUpdateFundsPasswordViaGoogleTOTPRequest
);

router.put(
	`/id=me/dividend-settings/type=template`,
	beforeUpdateTemplateDividendSettingsRequest,
	handleUpdateTemplateDividendSettingsRequest
);

router.post("/id=me/security-questions",
	beforeSetSecurityQuestionsRequest,
	handleSetSecurityQuestionsRequest
);

router.post(
	'/id=me/login-geo-validation',
	beforeEnableLoginGeoValidationRequest,
	handleEnableLoginGeoValidationRequest
);

router.delete(
	'/id=me/login-geo-validation',
	beforeDisableLoginGeoValidationRequest,
	handleDisableLoginGeoValidationRequest
);

router.post("/id=me/google-totp",
	beforeEnableGoogleTOTPRequest,
	handleEnableGoogleTOTPRequest
);

router.delete(
	'/id=me/google-totp',
	beforeDisableGoogleTOTPRequest,
	handleDisableGoogleTOTPRequest
);

router.get(
	'/id=me/lotteries',
	handleGetFavoriteLotteriesRequest
);

router.put(
	'/id=me/lotteries',
	beforeSetFavoriteLotteriesRequest,
	handleSetFavoriteLotteriesRequest
);

module.exports = router;
