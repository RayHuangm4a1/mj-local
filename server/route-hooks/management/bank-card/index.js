exports.beforeGetBlockedBankCardsRequest = require('./get-blocked-bank-cards-request').before;

exports.beforeBlockBankCardsRequest = require('./block-bank-cards-request').before;
exports.afterBlockBankCardsRequest = require('./block-bank-cards-request').after;

exports.beforeUnblockBankCardRequest = require('./unblock-bank-card-request').before;
exports.afterUnblockBankCardRequest = require('./unblock-bank-card-request').after;
