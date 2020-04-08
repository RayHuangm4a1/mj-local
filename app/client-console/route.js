import { loadComponent, } from './lib/react-utils';

const Dashboard = loadComponent({ loader: () => import('./pages/dashboard') });
const LotteryHome = loadComponent({ loader: () => import('./pages/lottery') });
const LotteryStandardDefaultPage = loadComponent({ loader: () => import('./pages/lottery/standard/standard-default-page') });
const LotteryStandardPage = loadComponent({ loader: () => import('./pages/lottery/standard') });
const LotteryXinYongPage = loadComponent({ loader: () => import('./pages/lottery/xin-yong') });
const LotteryPlanningPage = loadComponent({ loader: () => import('./pages/lottery/planning') });
const LotteryKillNumberPage = loadComponent({ loader: () => import('./pages/lottery/kill-number') });
const ThirdPartyPage = loadComponent({ loader: () => import('./pages/third-party') });
const ThirdPartyMainPage = loadComponent({ loader: () => import('./pages/third-party/main') });
const ThirdPartySubPage = loadComponent({ loader: () => import('./pages/third-party/sub') });
const LoginPage = loadComponent({ loader: () => import('./pages/login') });
const LoginCheckPage = loadComponent({ loader: () => import('./pages/login/check') });
const LoginConfirmedPage = loadComponent({ loader: () => import('./pages/login/confirmed') });
const LoginAccountFreezPage = loadComponent({ loader: () => import('./pages/login/account-freezed') });
const LogoutPage = loadComponent({ loader: () => import('./pages/logout') });
const DemoPage = loadComponent({ loader: () => import('./pages/demo') });
const MobileDemoPage = loadComponent({ loader: () => import('./pages/mobile-demo') });

export const RouteKeyEnums = {
	HOME: '/',
	LOTTERY_HOME: '/lottery',
	THIRDPARTY: '/third-party',
	THIRDPARTY_SUB: '/third-party/:thirdPartyType/:thirdPartyPlatform',
	LOGIN: '/login',
	LOGIN_CONFIRMED: '/login/confirmed',
	LOGIN_ACCOUNT_FREEZED: '/login/account-freezed',
	LOGOUT: '/logout',
	DEMO: '/demo',
	MOBILE_DEMO: '/mobile_demo'
};
const {
	HOME,
	LOTTERY_HOME,
	THIRDPARTY,
	THIRDPARTY_SUB,
	LOGIN,
	LOGIN_CONFIRMED,
	LOGIN_ACCOUNT_FREEZED,
	LOGOUT,
	DEMO,
	MOBILE_DEMO,
} = RouteKeyEnums;

const routes = [
	{
		exact: true,
		path: HOME,
		component: Dashboard,
	},
	{
		path: `${LOTTERY_HOME}/:lotteryClassId/:lotteryId/:playClassCode?/:playConditionId?`,
		component: LotteryHome,
		routes: [
			{
				exact: true,
				path: `${LOTTERY_HOME}/:lotteryClassId/:lotteryId/standard`,
				component: LotteryStandardDefaultPage,
				paramProps: {
					lotteryId: ':lotteryId',
				},
			},
			{
				path: `${LOTTERY_HOME}/:lotteryClassId/:lotteryId/standard/:playConditionId`,
				component: LotteryStandardPage,
				paramProps: {
					lotteryId: ':lotteryId',
					playConditionId: ':playConditionId',
					playClass: 'standard',
				},
			},
			{
				path: `${LOTTERY_HOME}/:lotteryClassId/:lotteryId/xinyong`,
				component: LotteryXinYongPage,
				paramProps: {
					lotteryId: ':lotteryId',
					playClass: 'xinyong',
				},
			},
			{
				exact: true,
				path: `${LOTTERY_HOME}/:lotteryClassId/:lotteryId/planning`,
				component: LotteryPlanningPage,
			},
			{
				exact: true,
				path: `${LOTTERY_HOME}/:lotteryClassId/:lotteryId/kill-number`,
				component: LotteryKillNumberPage,
			},
		],
		paramProps: {
			lotteryId: ':lotteryId',
			playClassCode: ':playClassCode',
			playConditionId: ':playConditionId',
			lotteryClassId: ':lotteryClassId',
		},
	},
	{
		path: THIRDPARTY,
		component: ThirdPartyPage,
		routes: [
			{
				exact: true,
				path: THIRDPARTY,
				component: ThirdPartyMainPage,
				paramProps: {
					thirdPartyType: 'all',
					thirdPartyPlatform: 'all',
				},
			},
			{
				path: THIRDPARTY_SUB,
				component: ThirdPartySubPage,
				paramProps: {
					thirdPartyType: ':thirdPartyType',
					thirdPartyPlatform: ':thirdPartyPlatform',
				},
			},
		],
	},
	{
		path: LOGIN,
		component: LoginPage,
		routes: [
			{
				path: LOGIN,
				exact: true,
				component: LoginCheckPage,
			},
			{
				path: LOGIN_CONFIRMED,
				component: LoginConfirmedPage,
			},
			{
				path: LOGIN_ACCOUNT_FREEZED,
				component: LoginAccountFreezPage,
			}
		],
	},
	{
		exact: true,
		path: LOGOUT,
		component: LogoutPage,
	},
	//TODO: delete when production/pre-production
	{
		path: DEMO,
		component: DemoPage,
	},
	{
		path: MOBILE_DEMO,
		component: MobileDemoPage,
	},
];

export default routes;
