class AjaxError extends Error {
	constructor(message) {
		super();
		Error.captureStackTrace(this, this.constructor);
		this.name = "AjaxError";
		this.message = message;
	}
}

class GeneralError {
	constructor(message) {
		this.name = "GeneralError";
		this.message = message;
	}
}

module.exports = {
	AjaxError,
	GeneralError,
};
