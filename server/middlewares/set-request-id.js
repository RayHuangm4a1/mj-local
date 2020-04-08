const uuidv4 = require("uuid/v4");

function setRequestId(req, res, next) {
	if (!req.header("X-Request-Id")) {
		req.headers["x-request-id"] = uuidv4();
	}

	next();
}

module.exports = setRequestId;
