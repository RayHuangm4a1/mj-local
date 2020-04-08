const {
	padStart,
} = require('ljit-collection');

module.exports = function simplifyPayer(payer) {
	if (typeof payer !== 'string') {
		return payer;
	}

	return padStart(payer.slice(-1), payer.length, "*");
};