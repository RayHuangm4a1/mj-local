import HomeIcon from '../../images/mobile-tabs/home.png';
import HomeIconSelected from '../../images/mobile-tabs/home-selected.png';

import KaiJiangIcon from '../../images/mobile-tabs/kai-jiang.png';
import KaiJiangIconSelected from '../../images/mobile-tabs/kai-jiang-selected.png';

import AtmIcon from '../../images/mobile-tabs/atm.png';
import AtmIconSelected from '../../images/mobile-tabs/atm-selected.png';

import SettingsIcon from '../../images/mobile-tabs/settings.png';
import SettingsIconSelected from '../../images/mobile-tabs/settings-selected.png';

import {
	NavigationKeyEnums
} from './';

export default [
	{
		label: '首页',
		page: NavigationKeyEnums.HOME,
		icon: 'md-home',
		imageIcons: {
			normalIcon: HomeIcon,
			selectedIcon: HomeIconSelected,
		},
	},
	{
		label: '开奖',
		page: NavigationKeyEnums.LOTTERIES,
		icon: 'fa-file',
		imageIcons: {
			normalIcon: KaiJiangIcon,
			selectedIcon: KaiJiangIconSelected,
		},
	},
	{
		label: '充提款',
		page: NavigationKeyEnums.ATM,
		icon: 'fa-file',
		imageIcons: {
			normalIcon: AtmIcon,
			selectedIcon: AtmIconSelected,
		},
	},
	{
		label: '我的',
		page: NavigationKeyEnums.MEMBER_CENTER,
		icon: 'fa-file',
		imageIcons: {
			normalIcon: SettingsIcon,
			selectedIcon: SettingsIconSelected,
		},
	},
];
