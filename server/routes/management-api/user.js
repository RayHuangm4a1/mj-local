const express = require("express");
const router = express.Router();

const {
	beforeUpdateFundsPasswordBelongToUserRequest,
	afterUpdateFundsPasswordBelongToUserRequest,

	beforeUpdateBetPasswordBelongToUserRequest,
	afterUpdateBetPasswordBelongToUserRequest,

	beforeUpdateLoginPasswordBelongToUserRequest,
	afterUpdateLoginPasswordBelongToUserRequest,

	beforeUpdateFixedWageBelongToUserRequest,
	afterUpdateFixedWageBelongToUserRequest,

	beforeCreateZhaoShangRequest,
	afterCreateZhaoShangRequest,

	beforeUpdateNicknameBelongToUserRequest,
	afterUpdateNicknameBelongToUserRequest,

	beforeUpdateBonusBelongToUserRequest,
	afterUpdateBonusBelongToUserRequest,

	beforeUpdateTypeBelongToUserRequest,
	afterUpdateTypeBelongToUserRequest,

	beforeBlockBelongToUserRequest,
	afterBlockBelongToUserRequest,

	beforeUnblockBelongToUserRequest,
	afterUnblockBelongToUserRequest,

	beforeEnableBettingBelongToUserRequest,
	afterEnableBettingBelongToUserRequest,

	beforeDisableBettingBelongToUserRequest,
	afterDisableBettingBelongToUserRequest,

	beforeEnableDepositBelongToUserRequest,
	afterEnableDepositBelongToUserRequest,

	beforeDisableDepositBelongToUserRequest,
	afterDisableDepositBelongToUserRequest,

	beforeEnableDividendBelongToUserRequest,
	afterEnableDividendBelongToUserRequest,

	beforeDisableDividendBelongToUserRequest,
	afterDisableDividendBelongToUserRequest,

	beforeEnableFundsBelongToUserRequest,
	afterEnableFundsBelongToUserRequest,

	beforeDisableFundsBelongToUserRequest,
	afterDisableFundsBelongToUserRequest,

	beforeDeleteSecurityQuestionsBelongToUserRequest,
	afterDeleteSecurityQuestionsBelongToUserRequest,

	beforeUpdateZhuandianBelongToUserRequest,
	afterUpdateZhuandianBelongToUserRequest,

	beforeDisableTransferBelongToUserRequest,
	afterDisableTransferBelongToUserRequest,

	beforeEnableTransferBelongToUserRequest,
	afterEnableTransferBelongToUserRequest,

	beforeDisableWithdrawalBelongToUserRequest,
	afterDisableWithdrawalBelongToUserRequest,

	beforeEnableWithdrawalBelongToUserRequest,
	afterEnableWithdrawalBelongToUserRequest,

	beforeEnableLoginGeoValidationBelongToUserRequest,
	afterEnableLoginGeoValidationBelongToUserRequest,

	beforeDisableLoginGeoValidationBelongToUserRequest,
	afterDisableLoginGeoValidationBelongToUserRequest,

	beforeDisableGoogleTOTPBelongToUserRequest,
	afterDisableGoogleTOTPBelongToUserRequest,

	beforeUpdateGreetingBelongToUserRequest,
	afterUpdateGreetingBelongToUserRequest,

	beforeUpdatePayerBelongToUserRequest,
	afterUpdatePayerBelongToUserRequest,

	beforeCreateCommentsBelongToUserRequest,
	beforeUnpinCommentBelongToUserRequest,
	beforeGetCommentsBelongToUserRequest,
	beforeGetAccountBelongToUserRequest,
	beforeGetUserStatsBelongToUserRequest,
	beforeGetWalletsBelongToUserRequest,
	beforeGetUserBelongToUserRequest,
	beforeGetUsersRequest,
	beforeGetWithdrawalMessageBelongToUserRequest,
	beforeGetDividendSettingsBelongToUserRequest,
	beforeGetUserStatsBelongToUsernameRequest,

	beforeEnableBankCardWithdrawalBelongToUserRequest,
	afterEnableBankCardWithdrawalBelongToUserRequest,

	beforeUpdateWithdrawalMessageBelongToUserRequest,
	afterUpdateWithdrawalMessageBelongToUserRequest,

	beforeBindBankCardBelongToUserRequest,
	afterBindBankCardBelongToUserRequest,

	beforeUnbindBankCardBelongToUserRequest,
	afterUnbindBankCardBelongToUserRequest,

	beforeDeleteWithdrawalMessageBelongToUserRequest,
	afterDeleteWithdrawalMessageBelongToUserRequest,

	beforeGetBankCardsBelongToUserRequest,

	beforeBlockBankCardBelongToUserRequest,
	afterBlockBankCardBelongToUserRequest,

	beforeUnblockBankCardBelongToUserRequest,
	afterUnblockBankCardBelongToUserRequest,

	beforeUpdateDividendSettingsBelongToUserRequest,
	afterUpdateDividendSettingsBelongToUserRequest,

	beforeUpdateBankCardNumberBelongToUserRequest,
	afterUpdateBankCardNumberBelongToUserRequest,

	beforeUpdateToNormalLevelBelongToUserRequest,
	afterUpdateToNormalLevelBelongToUserRequest,

	beforeUpdateToSpecialLevelBelongToUserRequest,
	afterUpdateToSpecialLevelBelongToUserRequest,
} = require("../../route-hooks/management/user");
const {
	beforeGetTraceBettingsBelongToUserRequest,

	beforeCancelBettingBelongToUserRequest,
	afterCancelBettingBelongToUserRequest,
} = require("../../route-hooks/management/betting");
const {
	beforeCancelTraceBettingsBelongToUserRequest,
	afterCancelTraceBettingsBelongToUserRequest,
} = require("../../route-hooks/management/trace");
const {
	handleUpdateFundsPasswordBelongToUserRequest,
	handleUpdateBetPasswordBelongToUserRequest,
	handleUpdateLoginPasswordBelongToUserRequest,
	handleUpdateFixedWageBelongToUserRequest,
	handleCreateZhaoShangRequest,
	handleUpdateNicknameBelongToUserRequest,
	handleUpdateBonusBelongToUserRequest,
	handleUpdateTypeBelongToUserRequest,
	handleBlockBelongToUserRequest,
	handleUnblocBelongToUserRequest,
	handleEnableBettingBelongToUserRequest,
	handleDisableBettingBelongToUserRequest,
	handleEnableUserDepositBelongToUserRequest,
	handleDisableDepositBelongToUserRequest,
	handleEnableDividendBelongToUserRequest,
	handleDisableDividendBelongToUserRequest,
	handleEnableFundsBelongToUserRequest,
	handleDisableFundsBelongToUserRequest,
	handleCreateCommentsBelongToUserRequest,
	handleUnpinCommentBelongToUserRequest,
	handleGetCommentsBelongToUserRequest,
	handleGetUserBelongToUserRequest,
	handleGetUsersRequest,
	handleDeleteSecurityQuestionsBelongToUserRequest,
	handleUpdateZhuandianBelongToUserRequest,
	handleDisableTransferBelongToUserRequest,
	handleEnableTransferBelongToUserRequest,
	handleDisableWithdrawalBelongToUserRequest,
	handleEnableWithdrawalBelongToUserRequest,
	handleUpdatePayerBelongToUserRequest,
	handleUpdateGreetingBelongToUserRequest,
	handleDisableGoogleTOTPBelongToUserRequest,
	handleDisableLoginGeoValidationBelongToUserRequest,
	handleEnableLoginGeoValidationBelongToUserRequest,
	handleEnableBankCardWithdrawalBelongToUserRequest,
	handleGetAccountBelongToUserRequest,
	handleGetUserStatsBelongToUserRequest,
	handleGetWalletsBelongToUserRequest,
	handleUpdateWithdrawalMessageBelongToUserRequest,
	handleGetWithdrawalMessageBelongToUserRequest,
	handleBindBankCardBelongToUserRequest,
	handleUnbindBankCardBelongToUserRequest,
	handleDeleteWithdrawalMessageBelongToUserRequest,
	handleGetBankCardsBelongToUserRequest,
	handleBlockBankCardBelongToUserRequest,
	handleUnblockBankCardBelongToUserRequest,
	handleGetDividendSettingsBelongToUserRequest,
	handleUpdateDividendSettingsBelongToUserRequest,
	handleUpdateBankCardNumberBelongToUserRequest,
	handleGetUserStatsBelongToUsernameRequest,
	handleUpdateToNormalLevelBelongToUserRequest,
	handleUpdateToSpecialLevelBelongToUserRequest,
} = require("../../route-handlers/management/user");
const {
	handleGetTraceBettingsBelongToUserRequest,
	handleCancelBettingBelongToUserRequest,
} = require("../../route-handlers/management/betting");
const {
	handleCancelTraceBettingsBelongToUserRequest,
} = require("../../route-handlers/management/trace");

router.get("/",
	beforeGetUsersRequest,
	handleGetUsersRequest
);

router.post("/",
	beforeCreateZhaoShangRequest,
	handleCreateZhaoShangRequest,
	afterCreateZhaoShangRequest
);

router.get("/id=:userId",
	beforeGetUserBelongToUserRequest,
	handleGetUserBelongToUserRequest
);

router.get("/id=:userId/account",
	beforeGetAccountBelongToUserRequest,
	handleGetAccountBelongToUserRequest
);

router.get("/id=:userId/wallets",
	beforeGetWalletsBelongToUserRequest,
	handleGetWalletsBelongToUserRequest
);

router.get("/id=:userId/stats",
	beforeGetUserStatsBelongToUserRequest,
	handleGetUserStatsBelongToUserRequest
);

router.get("/name=:username/stats",
	beforeGetUserStatsBelongToUsernameRequest,
	handleGetUserStatsBelongToUsernameRequest
);

router.get("/id=:userId/withdrawal-message",
	beforeGetWithdrawalMessageBelongToUserRequest,
	handleGetWithdrawalMessageBelongToUserRequest
);

router.get("/id=:userId/dividend-settings",
	beforeGetDividendSettingsBelongToUserRequest,
	handleGetDividendSettingsBelongToUserRequest
);

router.put("/id=:userId/nickname",
	beforeUpdateNicknameBelongToUserRequest,
	handleUpdateNicknameBelongToUserRequest,
	afterUpdateNicknameBelongToUserRequest
);

router.put("/id=:userId/bonus",
	beforeUpdateBonusBelongToUserRequest,
	handleUpdateBonusBelongToUserRequest,
	afterUpdateBonusBelongToUserRequest
);

router.get(
	"/id=:userId/comments",
	beforeGetCommentsBelongToUserRequest,
	handleGetCommentsBelongToUserRequest
);

router.post(
	"/id=:userId/comments",
	beforeCreateCommentsBelongToUserRequest,
	handleCreateCommentsBelongToUserRequest
);

router.delete(
	"/id=:userId/comments/id=:commentId/pinned",
	beforeUnpinCommentBelongToUserRequest,
	handleUnpinCommentBelongToUserRequest
);

router.put("/id=:userId/type",
	beforeUpdateTypeBelongToUserRequest,
	handleUpdateTypeBelongToUserRequest,
	afterUpdateTypeBelongToUserRequest
);

router.post("/id=:userId/blocked",
	beforeBlockBelongToUserRequest,
	handleBlockBelongToUserRequest,
	afterBlockBelongToUserRequest
);

router.delete("/id=:userId/blocked",
	beforeUnblockBelongToUserRequest,
	handleUnblocBelongToUserRequest,
	afterUnblockBelongToUserRequest
);

router.post("/id=:userId/betable",
	beforeEnableBettingBelongToUserRequest,
	handleEnableBettingBelongToUserRequest,
	afterEnableBettingBelongToUserRequest
);

router.delete("/id=:userId/betable",
	beforeDisableBettingBelongToUserRequest,
	handleDisableBettingBelongToUserRequest,
	afterDisableBettingBelongToUserRequest
);

router.post("/id=:userId/depositable",
	beforeEnableDepositBelongToUserRequest,
	handleEnableUserDepositBelongToUserRequest,
	afterEnableDepositBelongToUserRequest
);

router.delete("/id=:userId/depositable",
	beforeDisableDepositBelongToUserRequest,
	handleDisableDepositBelongToUserRequest,
	afterDisableDepositBelongToUserRequest
);

router.post("/id=:userId/dividendable",
	beforeEnableDividendBelongToUserRequest,
	handleEnableDividendBelongToUserRequest,
	afterEnableDividendBelongToUserRequest
);

router.delete("/id=:userId/dividendable",
	beforeDisableDividendBelongToUserRequest,
	handleDisableDividendBelongToUserRequest,
	afterDisableDividendBelongToUserRequest
);

router.post("/id=:userId/fundsable",
	beforeEnableFundsBelongToUserRequest,
	handleEnableFundsBelongToUserRequest,
	afterEnableFundsBelongToUserRequest
);

router.delete("/id=:userId/fundsable",
	beforeDisableFundsBelongToUserRequest,
	handleDisableFundsBelongToUserRequest,
	afterDisableFundsBelongToUserRequest
);

router.put(
	"/id=:userId/credentials/type=bet",
	beforeUpdateBetPasswordBelongToUserRequest,
	handleUpdateBetPasswordBelongToUserRequest,
	afterUpdateBetPasswordBelongToUserRequest
);

router.put(
	"/id=:userId/credentials/type=login",
	beforeUpdateLoginPasswordBelongToUserRequest,
	handleUpdateLoginPasswordBelongToUserRequest,
	afterUpdateLoginPasswordBelongToUserRequest
);

router.put(
	"/id=:userId/credentials/type=funds",
	beforeUpdateFundsPasswordBelongToUserRequest,
	handleUpdateFundsPasswordBelongToUserRequest,
	afterUpdateFundsPasswordBelongToUserRequest
);

router.put(
	"/id=:userId/fixed-wage",
	beforeUpdateFixedWageBelongToUserRequest,
	handleUpdateFixedWageBelongToUserRequest,
	afterUpdateFixedWageBelongToUserRequest
);

router.post(
	"/id=:userId/login-geo-validation",
	beforeEnableLoginGeoValidationBelongToUserRequest,
	handleEnableLoginGeoValidationBelongToUserRequest,
	afterEnableLoginGeoValidationBelongToUserRequest,
);

router.delete(
	"/id=:userId/login-geo-validation",
	beforeDisableLoginGeoValidationBelongToUserRequest,
	handleDisableLoginGeoValidationBelongToUserRequest,
	afterDisableLoginGeoValidationBelongToUserRequest
);

router.delete(
	"/id=:userId/google-totp",
	beforeDisableGoogleTOTPBelongToUserRequest,
	handleDisableGoogleTOTPBelongToUserRequest,
	afterDisableGoogleTOTPBelongToUserRequest
);

router.put(
	"/id=:userId/greeting",
	beforeUpdateGreetingBelongToUserRequest,
	handleUpdateGreetingBelongToUserRequest,
	afterUpdateGreetingBelongToUserRequest
);

router.put(
	"/id=:userId/payer",
	beforeUpdatePayerBelongToUserRequest,
	handleUpdatePayerBelongToUserRequest,
	afterUpdatePayerBelongToUserRequest
);

router.post(
	"/id=:userId/withdrawable",
	beforeEnableWithdrawalBelongToUserRequest,
	handleEnableWithdrawalBelongToUserRequest,
	afterEnableWithdrawalBelongToUserRequest
);

router.delete(
	"/id=:userId/withdrawable",
	beforeDisableWithdrawalBelongToUserRequest,
	handleDisableWithdrawalBelongToUserRequest,
	afterDisableWithdrawalBelongToUserRequest
);

router.post(
	"/id=:userId/transferable",
	beforeEnableTransferBelongToUserRequest,
	handleEnableTransferBelongToUserRequest,
	afterEnableTransferBelongToUserRequest
);

router.post(
	"/id=:userId/bank-cards/id=:bankCardId/withdrawable",
	beforeEnableBankCardWithdrawalBelongToUserRequest,
	handleEnableBankCardWithdrawalBelongToUserRequest,
	afterEnableBankCardWithdrawalBelongToUserRequest
);

router.delete(
	"/id=:userId/transferable",
	beforeDisableTransferBelongToUserRequest,
	handleDisableTransferBelongToUserRequest,
	afterDisableTransferBelongToUserRequest
);

router.put(
	"/id=:userId/zhuandian",
	beforeUpdateZhuandianBelongToUserRequest,
	handleUpdateZhuandianBelongToUserRequest,
	afterUpdateZhuandianBelongToUserRequest,
);

router.delete(
	"/id=:userId/security-questions",
	beforeDeleteSecurityQuestionsBelongToUserRequest,
	handleDeleteSecurityQuestionsBelongToUserRequest,
	afterDeleteSecurityQuestionsBelongToUserRequest
);

router.put(
	"/id=:userId/withdrawal-message",
	beforeUpdateWithdrawalMessageBelongToUserRequest,
	handleUpdateWithdrawalMessageBelongToUserRequest,
	afterUpdateWithdrawalMessageBelongToUserRequest
);

router.post(
	"/id=:userId/bank-cards",
	beforeBindBankCardBelongToUserRequest,
	handleBindBankCardBelongToUserRequest,
	afterBindBankCardBelongToUserRequest
);

router.delete(
	"/id=:userId/bank-cards/id=:bankCardId",
	beforeUnbindBankCardBelongToUserRequest,
	handleUnbindBankCardBelongToUserRequest,
	afterUnbindBankCardBelongToUserRequest
);

router.delete(
	"/id=:userId/withdrawal-message",
	beforeDeleteWithdrawalMessageBelongToUserRequest,
	handleDeleteWithdrawalMessageBelongToUserRequest,
	afterDeleteWithdrawalMessageBelongToUserRequest
);

router.get(
	"/id=:userId/bank-cards",
	beforeGetBankCardsBelongToUserRequest,
	handleGetBankCardsBelongToUserRequest
);

router.post(
	"/id=:userId/bank-cards/id=:bankCardId/blocked",
	beforeBlockBankCardBelongToUserRequest,
	handleBlockBankCardBelongToUserRequest,
	afterBlockBankCardBelongToUserRequest
);

router.delete(
	"/id=:userId/bank-cards/id=:bankCardId/blocked",
	beforeUnblockBankCardBelongToUserRequest,
	handleUnblockBankCardBelongToUserRequest,
	afterUnblockBankCardBelongToUserRequest
);

router.put(
	"/id=:userId/dividend-settings",
	beforeUpdateDividendSettingsBelongToUserRequest,
	handleUpdateDividendSettingsBelongToUserRequest,
	afterUpdateDividendSettingsBelongToUserRequest
);

router.put(
	"/id=:userId/bank-cards/id=:bankCardId/number",
	beforeUpdateBankCardNumberBelongToUserRequest,
	handleUpdateBankCardNumberBelongToUserRequest,
	afterUpdateBankCardNumberBelongToUserRequest
);

router.delete("/id=:userId/bettings/id=:bettingId",
	beforeCancelBettingBelongToUserRequest,
	handleCancelBettingBelongToUserRequest,
	afterCancelBettingBelongToUserRequest
);

router.delete("/id=:userId/traces/id=:traceId/bettings",
	beforeCancelTraceBettingsBelongToUserRequest,
	handleCancelTraceBettingsBelongToUserRequest,
	afterCancelTraceBettingsBelongToUserRequest
);

router.put("/id=:userId/levels/id=:levelId",
	beforeUpdateToNormalLevelBelongToUserRequest,
	handleUpdateToNormalLevelBelongToUserRequest,
	afterUpdateToNormalLevelBelongToUserRequest
);

router.put("/id=:userId/levels/id=:levelId",
	beforeUpdateToSpecialLevelBelongToUserRequest,
	handleUpdateToSpecialLevelBelongToUserRequest,
	afterUpdateToSpecialLevelBelongToUserRequest
);

router.get("/id=:userId/traces/id=:traceId/bettings",
	beforeGetTraceBettingsBelongToUserRequest,
	handleGetTraceBettingsBelongToUserRequest
);

module.exports = router;
