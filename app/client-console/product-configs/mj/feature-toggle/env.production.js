import { FeatureCodeEnum, } from '../../../lib/enums';

const featureToggleConfig = [
	{
		feature: FeatureCodeEnum.DASHBOARD,
		isActive: true,
		toggles: {
			is_ANNOUNCE_Active: true,
			is_WIN_Active: false,
			is_BANNER_Active: true,
		},
	},
	{
		feature: FeatureCodeEnum.STANDARD_BETTING_BLOCK,
		isActive: true,
		toggles: {
			is_AMOUNT_Active: false,
			is_ALL_IN_Active: false,
		},
	},
	{
		feature: FeatureCodeEnum.LOTTERY_INFO_HEADER,
		isActive: true,
		toggles: {
			is_TREND_TOGGLE_Active: false,
		},
	},
	{
		feature: FeatureCodeEnum.LOTTERY,
		isActive: true,
		toggles: {
			is_KILL_NUMBER_Active: false,
			is_PLANNING_Active: false,
			is_BETTING_LONG_Active: false,
			is_ESTIMATED_PRIZE_Active: false,
		},
	},
	{
		feature: FeatureCodeEnum.MEMBER_CENTER,
		isActive: true,
		toggles: {
			is_AGENT_WECHAT_PROMOTION_Active: false,
		}
	}
];

export default featureToggleConfig;
