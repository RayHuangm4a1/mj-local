const StatusEnum = {
	ACTIVE: 'active',
	DISABLE: 'disable',
	DELETE: 'delete',
};
const { ACTIVE, DISABLE, DELETE, } = StatusEnum;
const StatusTextMap = {
	[ACTIVE]: '启用',
	[DISABLE]: '停用',
	[DELETE]: '刪除',
};

export {
	StatusEnum,
	StatusTextMap,
};
