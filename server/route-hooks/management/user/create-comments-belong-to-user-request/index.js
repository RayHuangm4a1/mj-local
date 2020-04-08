const compose = require("compose-middleware").compose;
const validateRequestPayload = require("./validate-request-payload");
const isUserExisted = require("./is-user-existed");
const isPinnedCommentReachLimit = require("./is-pinned-comment-reach-limit");
const {
	prepareStaffWithRole,
} = require("../../staff.common");

exports.before = compose([
	validateRequestPayload,
	isUserExisted,
	isPinnedCommentReachLimit,
	prepareStaffWithRole,
]);
