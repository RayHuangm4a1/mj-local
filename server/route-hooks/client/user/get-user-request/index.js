const compose = require('compose-middleware').compose;
const {
	prepareActiveUser,
} = require('../../../user.common');
const {
	USER_PROJECTIONS,
} = require("../../../../services/user");
const {
	setUserOnline,
} = require('../common');
const prepareRecentlyWonBettings = require("./prepare-recently-won-bettings");
const isLoginPasswordUpdated = require("./is-login-password-updated");
const isBetPasswordUpdated = require("./is-bet-password-updated");

exports.before = compose([
	prepareActiveUser(USER_PROJECTIONS.ME),
	isLoginPasswordUpdated,
	isBetPasswordUpdated,
	prepareRecentlyWonBettings,
]);

exports.after = compose([
	setUserOnline,
]);
