import { LabelContent, } from 'ljit-react-components';

export function validateInputNumber(value) {
	const valid = value >= 0 && typeof value === 'number';

	if (valid) {
		return LabelContent.ValidateStatusEnums.SUCCESS;
	}
	return LabelContent.ValidateStatusEnums.ERROR;
}

export function validatePositiveNumber(value) {
	const valid = value > 0 && typeof value === 'number';

	if (valid) {
		return LabelContent.ValidateStatusEnums.SUCCESS;
	}
	return LabelContent.ValidateStatusEnums.ERROR;
}
