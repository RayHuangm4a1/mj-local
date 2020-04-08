const [
	admin,
	accountant,
	csManager,
	csDirector,
	csStaff,
	finManager,
	finDirector,
	finAgent,
	finStaff,
	finAgentStaff,
] = require("./role");

module.exports = [
	{
		role: admin,
		ancestors: [],
	},
	{
		role: accountant,
		ancestors: [
			admin,
		],
	},
	{
		role: csManager,
		ancestors: [
			admin,
		],
	},
	{
		role: csDirector,
		ancestors: [
			csManager,
			admin,
		],
	},
	{
		role: csStaff,
		ancestors: [
			csDirector,
			csManager,
			admin,
		],
	},
	{
		role: finManager,
		ancestors: [
			admin,
		],
	},
	{
		role: finDirector,
		ancestors: [
			finManager,
			admin,
		],
	},
	{
		role: finAgent,
		ancestors: [
			finDirector,
			finManager,
			admin,
		],
	},
	{
		role: finStaff,
		ancestors: [
			finAgent,
			finDirector,
			finManager,
			admin,
		],
	},
	{
		role: finAgentStaff,
		ancestors: [
			finStaff,
			finAgent,
			finDirector,
			finManager,
			admin,
		],
	},
];
