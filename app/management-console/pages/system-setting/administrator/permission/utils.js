export const getAllTreeKeys = (data = []) => data.reduce(
	(accumulator, currentValue) => {
		const {
			children,
			key,
			isDisabled,
		} = currentValue;

		if (!isDisabled) {
			accumulator.push(key);
		}

		if (children) {
			accumulator.push(...getAllTreeKeys(children));
		}

		return accumulator;
	},
	[]
);
