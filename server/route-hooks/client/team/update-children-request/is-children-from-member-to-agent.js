const {
	ENUM_USER_TYPE,
} = require("../../../../lib/enum");

module.exports = function isChildrenFromMemberToAgent(req, res, next) {
	const { agent } = req.body;
	const { type } = res.locals.user.descendants[0];

	if (type === ENUM_USER_TYPE.MEMBER && agent) {
		res.locals.toAgent = true;
	} else {
		res.locals.toAgent = false;
	}

	next();
};
