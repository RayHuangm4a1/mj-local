exports.beforeGetBettingsRequest = require('./get-bettings-request').before;
exports.beforeGetTraceBettingsBelongToUserRequest = require("./get-trace-bettings-belong-to-user-request").before;

exports.beforeCancelBettingBelongToUserRequest = require('./cancel-betting-belong-to-user-request').before;
exports.afterCancelBettingBelongToUserRequest = require('./cancel-betting-belong-to-user-request').after;
