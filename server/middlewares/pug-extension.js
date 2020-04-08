const { convertFromGMTToAsiaShanghai } = require("ljit-lib/moment-utils");

module.exports = function pugExtension(req, res, next) {
	res.locals.PRODUCT_NAME = global.PRODUCT_NAME;
	res.locals.__pug_ext = {
		getFormattedDate: function (date) {
			return convertFromGMTToAsiaShanghai(date);
		},
	};
	next();
};
