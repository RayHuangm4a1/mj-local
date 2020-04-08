import { ActivateStatusEnums, } from '../../../../../components/table/constants';

const {
	ARCHIVED,
	ACTIVE,
} = ActivateStatusEnums;

export const statusOptions = [
	{ label: '启用', value: ARCHIVED, },
	{ label: '禁用', value: ACTIVE, },
];
