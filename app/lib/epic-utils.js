export function getMessageFromResponse(payload, defaultMessage = "请稍后再试") {
	try {
		return payload.response.message;
	} catch (e) {
		console.log(e);
	}
	return defaultMessage;
}

export function getMessageFromResponses(payload, defaultMessage) {
	try {
		return payload.response
			.filter(response => response.message !== undefined)
			.map(response => response.message)
			.join("\n");
	} catch (e) {
		console.log(e);
	}
	return defaultMessage;
}

export function catchErrorMessageForEpics(error, ...callbacks) {
	let errorMessage = getMessageFromResponse(error, "请稍后再试。");

	return callbacks.map(callback => callback(error, errorMessage));
}

export function getQueryDelimiter(url) {
	return url.includes("?") ? "&" : "?";
}
