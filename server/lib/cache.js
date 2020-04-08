function Cache(cb, defaultCb) {
	let startedAt = null;

	function isExisted(result) {
		if (result === null) {
			return false;
		}

		if (Array.isArray(result) && !result.length) {
			return false;
		}

		return true;
	}

	function getResponseTime() {
		return (new Date().getTime() - startedAt);
	}

	async function softGet() {
		let result = await cb();

		if (isExisted(result)) {
			global.LOGGER.debug(`[store][redis] response time: ${getResponseTime()}ms`);

			return result;
		}

		result = await defaultCb();

		global.LOGGER.debug(`[store][primary] response time: ${getResponseTime()}ms`);

		return result;
	}

	async function forceGet() {
		let result = null;

		try {
			result = await cb();

			if (isExisted(result)) {
				global.LOGGER.debug(`[store][redis] response time: ${getResponseTime()}ms`);

				return result;
			}
		} catch (error) {
			global.LOGGER.warn(error.formatStack());
		}

		result = await defaultCb();

		global.LOGGER.debug(`[store][primary] response time: ${getResponseTime()}ms`);

		return result;
	}

	function get({ force = false } = {}) {
		startedAt = new Date().getTime();

		return force ? forceGet() : softGet();
	}

	return {
		get,
	};
}

module.exports = Cache;
