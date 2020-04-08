const { ENUM_USER_TYPE } = require("../../../../lib/enum");

module.exports = function setDefaultUserType(req, res, next) {
	req.query.type = req.query.type !== undefined ?
		[req.query.type] :
		[
			ENUM_USER_TYPE.ZHAOSHANG,
			ENUM_USER_TYPE.AGENT,
			ENUM_USER_TYPE.MEMBER,
		];

	next();
};
