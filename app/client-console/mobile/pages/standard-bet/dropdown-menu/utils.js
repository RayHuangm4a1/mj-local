export function get(array = [], id, defaultValue = {}) {
	return array.filter(arr => arr.id === id)[0] || defaultValue;
}

export function convertToOptions(array = []) {
	return array.map(arr => {
		return {
			id: arr.id,
			name: arr.name,
		};
	});
}
