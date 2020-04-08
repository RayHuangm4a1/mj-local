const express = require("express");
const router = express.Router();

const {
	handleBlockTeamRequest,
	handleUnblockTeamRequest,
	handleEnableTeamBettingRequest,
	handleDisableTeamBettingRequest,
	handleEnableTeamDepositRequest,
	handleDisableTeamDepositRequest,
	handleEnableTeamFundsRequest,
	handleDisableTeamFundsRequest,
	handleUnblockTeamMemberRequest,
	handleEnableTeamMemberBettingRequest,
	handleEnableTeamMemberDepositRequest,
	handleEnableTeamMemberFundsRequest,
	handleEnableTeamMemberWithdrawalRequest,
	handleDisableTeamWithdrawalRequest,
	handleEnableTeamWithdrawalRequest,
	handleEnableTeamCreationRequest,
	handleDisableTeamCreationRequest,
	handleGetChildrenBelongToTeamLeaderRequest,
	handleGetTeamStatsBelongToTeamLeaderRequest,
} = require("../../route-handlers/management/team");
const {
	beforeBlockTeamRequest,
	afterBlockTeamRequest,

	beforeUnblockTeamRequest,
	afterUnblockTeamRequest,

	beforeEnableTeamBettingRequest,
	afterEnableTeamBettingRequest,

	beforeDisableTeamBettingRequest,
	afterDisableTeamBettingRequest,

	beforeEnableTeamDepositRequest,
	afterEnableTeamDepositRequest,

	beforeDisableTeamDepositRequest,
	afterDisableTeamDepositRequest,

	beforeEnableTeamFundsRequest,
	afterEnableTeamFundsRequest,

	beforeDisableTeamFundsRequest,
	afterDisableTeamFundsRequest,

	beforeUnblockTeamMemberRequest,
	afterUnblockTeamMemberRequest,

	beforeEnableTeamMemberBettingRequest,
	afterEnableTeamMemberBettingRequest,

	beforeEnableTeamMemberDepositRequest,
	afterEnableTeamMemberDepositRequest,

	beforeEnableTeamMemberFundsRequest,
	afterEnableTeamMemberFundsRequest,

	beforeEnableTeamMemberWithdrawalRequest,
	afterEnableTeamMemberWithdrawalRequest,

	beforeDisableTeamWithdrawalRequest,
	afterDisableTeamWithdrawalRequest,

	beforeEnableTeamWithdrawalRequest,
	afterEnableTeamWithdrawalRequest,

	beforeEnableTeamCreationRequest,
	afterEnableTeamCreationRequest,

	beforeDisableTeamCreationRequest,
	afterDisableTeamCreationRequest,

	beforeGetChildrenBelongToTeamLeaderRequest,
	beforeGetTeamStatsBelongToTeamLeaderRequest,
} = require("../../route-hooks/management/team");

router.post(
	"/leaderId=:leaderId/blocked",
	beforeBlockTeamRequest,
	handleBlockTeamRequest,
	afterBlockTeamRequest
);

router.delete(
	"/leaderId=:leaderId/blocked",
	beforeUnblockTeamRequest,
	handleUnblockTeamRequest,
	afterUnblockTeamRequest
);

router.delete(
	"/memberId=:memberId/blocked",
	beforeUnblockTeamMemberRequest,
	handleUnblockTeamMemberRequest,
	afterUnblockTeamMemberRequest
);

router.post(
	"/leaderId=:leaderId/betable",
	beforeEnableTeamBettingRequest,
	handleEnableTeamBettingRequest,
	afterEnableTeamBettingRequest
);

router.delete(
	"/leaderId=:leaderId/betable",
	beforeDisableTeamBettingRequest,
	handleDisableTeamBettingRequest,
	afterDisableTeamBettingRequest
);

router.post(
	"/memberId=:memberId/betable",
	beforeEnableTeamMemberBettingRequest,
	handleEnableTeamMemberBettingRequest,
	afterEnableTeamMemberBettingRequest
);

router.post("/leaderId=:leaderId/depositable",
	beforeEnableTeamDepositRequest,
	handleEnableTeamDepositRequest,
	afterEnableTeamDepositRequest
);

router.delete("/leaderId=:leaderId/depositable",
	beforeDisableTeamDepositRequest,
	handleDisableTeamDepositRequest,
	afterDisableTeamDepositRequest
);

router.post(
	"/memberId=:memberId/depositable",
	beforeEnableTeamMemberDepositRequest,
	handleEnableTeamMemberDepositRequest,
	afterEnableTeamMemberDepositRequest
);

router.post("/leaderId=:leaderId/fundsable",
	beforeEnableTeamFundsRequest,
	handleEnableTeamFundsRequest,
	afterEnableTeamFundsRequest
);

router.delete("/leaderId=:leaderId/fundsable",
	beforeDisableTeamFundsRequest,
	handleDisableTeamFundsRequest,
	afterDisableTeamFundsRequest
);

router.post(
	"/memberId=:memberId/fundsable",
	beforeEnableTeamMemberFundsRequest,
	handleEnableTeamMemberFundsRequest,
	afterEnableTeamMemberFundsRequest
);

router.post(
	"/memberId=:memberId/withdrawable",
	beforeEnableTeamMemberWithdrawalRequest,
	handleEnableTeamMemberWithdrawalRequest,
	afterEnableTeamMemberWithdrawalRequest
);

router.post(
	"/leaderId=:leaderId/withdrawable",
	beforeEnableTeamWithdrawalRequest,
	handleEnableTeamWithdrawalRequest,
	afterEnableTeamWithdrawalRequest
);

router.delete(
	"/leaderId=:leaderId/withdrawable",
	beforeDisableTeamWithdrawalRequest,
	handleDisableTeamWithdrawalRequest,
	afterDisableTeamWithdrawalRequest
);

router.post(
	"/leaderId=:leaderId/creatable",
	beforeEnableTeamCreationRequest,
	handleEnableTeamCreationRequest,
	afterEnableTeamCreationRequest
);

router.delete(
	"/leaderId=:leaderId/creatable",
	beforeDisableTeamCreationRequest,
	handleDisableTeamCreationRequest,
	afterDisableTeamCreationRequest
);

router.get(
	"/leaderId=:leaderId/children",
	beforeGetChildrenBelongToTeamLeaderRequest,
	handleGetChildrenBelongToTeamLeaderRequest
);

router.get(
	"/leaderId=:leaderId/stats",
	beforeGetTeamStatsBelongToTeamLeaderRequest,
	handleGetTeamStatsBelongToTeamLeaderRequest
);

module.exports = router;
