const { EventEmitter } = require("events");
const emitter = new EventEmitter();
const topics = Object.values(require("./event-topics"));

exports.emit = function(topic, args) {
	if (!topics.includes(topic)) {
		throw new Error("[cronjob] topic is not registerable for cronjob: \"" + topic + "\"");
	}

	emitter.emit(topic, args);
};
exports.on = function (topic, cb) {
	if (!topics.includes(topic)) {
		throw new Error("[cronjob] topic is not registerable for cronjob: \"" + topic + "\"");
	}

	emitter.on(topic, cb);
};