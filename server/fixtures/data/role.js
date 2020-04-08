const {
	ENUM_ROLE_TYPE,
	ENUM_ROLE_STATUS,
} = require("../../lib/enum");

module.exports = [
	{
		id: 1,
		name: '系统管理员',
		type: ENUM_ROLE_TYPE.ADMIN,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 2,
		name: '会计',
		type: ENUM_ROLE_TYPE.ACCOUNTANT,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 3,
		name: '客服主管',
		type: ENUM_ROLE_TYPE.CS,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 4,
		name: '客服主任',
		type: ENUM_ROLE_TYPE.CS,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 5,
		name: '客服人员',
		type: ENUM_ROLE_TYPE.CS,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 6,
		name: '财务主管',
		type: ENUM_ROLE_TYPE.FIN,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 7,
		name: '财务组长',
		type: ENUM_ROLE_TYPE.FIN,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 8,
		name: '财务代理',
		type: ENUM_ROLE_TYPE.FIN,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 9,
		name: '财务人员',
		type: ENUM_ROLE_TYPE.FIN,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
	{
		id: 10,
		name: '财务代理人员',
		type: ENUM_ROLE_TYPE.FIN,
		status: ENUM_ROLE_STATUS.ACTIVE,
	},
];
