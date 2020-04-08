import { divided10000, } from '../../../../../lib/dividend-utils';

export function amountDivided10000(dataArray) {
	return dataArray.map(data => {
		return {
			...data,
			amount: parseInt(divided10000(data.amount), 10)
		};
	});
}
