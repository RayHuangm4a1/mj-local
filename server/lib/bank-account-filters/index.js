const ServiceLocator = require('ljit-lib/service-locator');
const locator = new ServiceLocator();

// 網銀轉帳
locator.register(1, require('./online-bank-bank-account-filter'));

module.exports = locator;