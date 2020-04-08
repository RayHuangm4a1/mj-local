import { registerPage, } from 'ljit-react-mobile-navigation';
import { loadComponent, } from '../../lib/react-utils';

const Home = loadComponent({ loader: () => import('../pages/home') });
const Lotteries = loadComponent({ loader: () => import('../pages/lotteries') });
const Atm = loadComponent({ loader: () => import('../pages/atm') });
const MemberCenter = loadComponent({ loader: () => import('../pages/member-center') });
const Login = loadComponent({ loader: () => import('../pages/login') });
const ShoppingCart = loadComponent({ loader: () => import('../pages/shopping-cart') });
const XinYongBet = loadComponent({ loader: () => import('../pages/xin-yong-bet') });
const StandardBet = loadComponent({ loader: () => import('../pages/standard-bet') });
const BettingRecordDetail = loadComponent({ loader: () => import('../pages/member-center/member/betting-record-detail') });
const MemberBettingRecords = loadComponent({ loader: () => import('../pages/member-center/member/betting-records') });
const Banks = loadComponent({ loader: () => import('../pages/member-center/banks') });

export const NavigationKeyEnums = {
	HOME: 'home',
	LOTTERIES: 'lotteries',
	ATM: 'atm',
	MEMBER_CENTER: 'member-center',
	MEMBER_BETTING_RECORDS: 'member-center/member/betting-records',
	BETTING_RECORD_DETAIL: 'member-center/member/betting-record-detail',
	BANKS: 'member-center/member/banks',

	STANDARD_BET: 'standard-bet',
	XINYONG_BET: 'xin-yong-bet',

	LOGIN: 'login',

	SHOPPING_CART: 'shopping-cart',
};

const {
	HOME,
	LOTTERIES,
	ATM,
	MEMBER_CENTER,
	MEMBER_BETTING_RECORDS,
	BANKS,

	STANDARD_BET,
	XINYONG_BET,

	LOGIN,

	BETTING_RECORD_DETAIL,
	SHOPPING_CART,
} = NavigationKeyEnums;

registerPage(HOME, {
	component: Home,
	title: 'MJPlatform',
	toolbarButtons: {
		rightButtons: [
			{
				id: 'wallet',
				icon: 'fa-wallet',
			}
		],
	},
});

registerPage(LOTTERIES, {
	component: Lotteries,
	title: '彩票',
});

registerPage(ATM, {
	component: Atm,
	title: '充提款',
});

registerPage(MEMBER_CENTER, {
	component: MemberCenter,
	title: '會員中心',
	isToolbarHidden: true,
});

registerPage(BANKS, {
	component: Banks,
	title: '银行资料',
});

registerPage(STANDARD_BET, {
	component: StandardBet,
	title: '投注',
});

registerPage(MEMBER_BETTING_RECORDS, {
	component: MemberBettingRecords,
	title: '投注记录'
});
registerPage(BETTING_RECORD_DETAIL, {
	component: BettingRecordDetail,
	title: '投注详情',
});
registerPage(XINYONG_BET, {
	component: XinYongBet,
	title: '信用玩法'
});

registerPage(LOGIN, {
	component: Login,
	title: '登入',
});

registerPage(SHOPPING_CART, {
	component: ShoppingCart,
	title: '购物车',
});
