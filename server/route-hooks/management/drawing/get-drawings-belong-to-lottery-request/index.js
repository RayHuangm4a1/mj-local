const compose = require('compose-middleware').compose;
const validateRequestPayload = require("./validate-request-payload");
const {
	setDefaultLimit,
} = require('../../../common');
const isIssueLessThanEqualCurrentIssue = require("./is-issue-less-than-equal-current-issue");

exports.before = compose([
	validateRequestPayload,
	isIssueLessThanEqualCurrentIssue,
	setDefaultLimit(10),
]);
