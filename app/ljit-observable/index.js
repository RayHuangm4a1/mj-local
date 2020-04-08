const LjitObservable = function () {
	/*
	eventMap = {
		[eventname1]: [cb1, cb2, ..],
		...
	}
	*/
	let eventMap = {};

	return {
		subscribe: function (event, cb) {
			if (eventMap[event] === undefined) {
				eventMap[event] = [];
			}

			eventMap[event].push(cb);

			return function unsubscribe() {
				const cbIndex = eventMap[event].indexOf(cb);

				eventMap[event].splice(cbIndex, 1);
			};
		},
		notify: function (event, obj) {
			if (Array.isArray(eventMap[event])) {
				const cbs = eventMap[event];

				cbs.forEach(cb => cb(obj));
			}
		},
	};
};

export function createObservable() {
	return LjitObservable();
}
