import { StatusTag, } from 'ljit-react-components';
import { DepositStatusEnum, } from '../../../lib/enums';

const {
	SUCCESS,
	ERROR,
	WARNING,
	LOSE,
	PENDING,
} = StatusTag.StatusEnums;

export {
	StatusEnums,
	GameTypeEnums,
	ColumnEnums,
	BettingRecordPropTypes,
	StatusMap,
} from './betting-record';

const {
	CONFIRMED,
	NEW,
	CANCELED,
	EXPIRED,
	INCONSISTENT,
} = DepositStatusEnum;

export const ActivateStatusEnums = {
	ARCHIVED: 'archived',
	ACTIVE: 'active',
};

const {
	ARCHIVED,
	ACTIVE,
} = ActivateStatusEnums;

export const ActivateButtonTextMap = {
	[ARCHIVED]: '启用',
	[ACTIVE]: '禁用'
};

export const ActivateButtonColorMap = {
	[ARCHIVED]: 'default',
	[ACTIVE]: 'danger',
};

export const SystemStatuses = [
	{
		status: SUCCESS,
		text: '上线',
		value: 'online',
	},
	{
		status: WARNING,
		text: '系统维护中',
		value: 'maintenance',
	},
	{
		status: ERROR,
		text: '下线',
		value: 'offline',
	},
];

export const EnableStatuses = [
	{
		status: SUCCESS,
		text: '开启',
		value: 'enabled',
	},
	{
		status: ERROR,
		text: '关闭',
		value: 'disabled',
	},
];

export const ConfirmStatuses = [
	{
		status: SUCCESS,
		text: '已确认',
		value: CONFIRMED,
	},
	{
		status: PENDING,
		text: '待确认',
		value: NEW,
	},
	{
		status: ERROR,
		text: '已取消',
		value: CANCELED,
	},
	{
		status: LOSE,
		text: '已过期',
		value: EXPIRED,
	},
	{
		status: WARNING,
		text: '残留',
		value: INCONSISTENT,
	},
];

export const ActivateStatuses = [
	{
		status: SUCCESS,
		text: '启用',
		value: ACTIVE,
	},
	{
		status: ERROR,
		text: '禁用',
		value: ARCHIVED,
	}
];
