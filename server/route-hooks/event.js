function prepareAccountArchievedEvent(req, res, next) {
	req.event = {
		platformId: res.locals.platform._id,
	};

	next();
}

module.exports = {
	prepareAccountArchievedEvent,
};
