import React from 'react';
import { shallow, mount, } from 'enzyme';
import {
	SvgIconMap,
} from '../components/icon';
import {
	CloseCircleFill,
	CaretUp,
	CaretDown,
	CheckCircleOutline,
	SearchOutline,
	FilterFill,
	PlusOutline,
	PlusCircleOutline,
	CloseOutline,
	UpOutline,
	DownOutline,
	LeftOutline,
	RightOutline,
	MenuFoldOutline,
	MenuUnfoldOutline,
	BellOutline,
	DashboardOutline,
	FormOutline,
	TableOutline,
	ProfileOutline,
	WarningOutline,
	ExclamationCircleOutline,
	NotificationFill,
	PayCircleFill,
	FundFill,
	GiftFill,
	CalendarOutline,
	AppstoreFill,
	UploadOutline,
	FlagOutline,
	ProjectOutline,
	InfoCircleFill,
	CustomerServiceOutline,
	DollarOutline,
	DeleteOutline,
	SettingFill,
	CaretRight,
	CaretLeft,
	StarFill,
	StarOutline,
	ForkOutline,
	GoogleOutline,
	UserOutline,
	SafetyOutline,
	LockOutline,
	QuestionCircleOutline,
	QuestionCircleFill,
	HeartOutline,
	HeartFill,
	ReloadOutlined,
} from '../components/icon/icons';
import EyeSvg from '../components/svgs/eye.svg';
import MoreSvg from '../components/svgs/more.svg';
import RechargeSvg from '../components/svgs/recharge.svg';
import SettingSvg from '../components/svgs/setting.svg';
import TicketStarSvg from '../components/svgs/ticket-star.svg';
import TransferSvg from '../components/svgs/transfer.svg';
import WalletSvg from '../components/svgs/wallet.svg';
import WithdrawSvg from '../components/svgs/withdraw.svg';
import CrownSvg from '../components/svgs/prize.svg';
import CrownColorSvg from '../components/svgs/prize-c.svg';
import Crown2Svg from '../components/svgs/prize-2.svg';
import WhiteCrown2Svg from '../components/svgs/white-prize-2.svg';
import WalletMulticolorSvg from '../components/svgs/wallet_multicolor.svg';
import WalletLineSvg from '../components/svgs/wallet_line.svg';
import AnnouncementSvg from '../components/svgs/announcement.svg';
import MemberSvg from '../components/svgs/member.svg';
import CustomerServiceSvg from '../components/svgs/customer_service.svg';
import ProxySvg from '../components/svgs/proxy.svg';
import RechargeCircleSvg from '../components/svgs/recharge_circle.svg';
import TransferCircleSvg from '../components/svgs/transfer_circle.svg';
import WithdrawCircleSvg from '../components/svgs/withdraw_circle.svg';
import ChartSvg from '../components/svgs/chart.svg';
import EditSvg from '../components/svgs/edit.svg';
import MoneyChangeSvg from '../components/svgs/money_change.svg';
import HelpSvg from '../components/svgs/help.svg';
import WechatSvg from './svgs/wechat.svg';
import OrangeAnnouncementSvg from '../components/svgs/orange_announcement.svg';
import OrangeCustomerServiceSvg from '../components/svgs/orange_customer_service.svg';
import OrangeProxySvg from '../components/svgs/orange_proxy.svg';
import OrangeMemberSvg from '../components/svgs/orange_member.svg';
import OrangeRechargeCircleSvg from '../components/svgs/orange_recharge.svg';
import OrangeTransferCircleSvg from '../components/svgs/orange_transfer.svg';
import OrangeWithdrawCircleSvg from '../components/svgs/orange_withdraw.svg';
import OrangeHelpSvg from '../components/svgs/orange_help.svg';
import DividendSvg from '../components/svgs/dividend.svg';
import CopySvg from '../components/svgs/copy.svg';
import QRCodeSvg from '../components/svgs/qr-code.svg';
import TrashSvg from '../components/svgs/trash.svg';
import OrangeWechatSvg from './svgs/orange_wechat.svg';
import HeBallSvg from './svgs/he_ball.svg';
import DragonBallSvg from './svgs/dragon_ball.svg';
import TigerBallSvg from './svgs/tiger_ball.svg';
import SelectedHeBallSvg from './svgs/selected_he_ball.svg';
import SelectedDragonBallSvg from './svgs/selected_dragon_ball.svg';
import SelectedTigerBallSvg from './svgs/selected_tiger_ball.svg';
import BankCardSvg from '../components/svgs/bank-card.svg';
import TimerSvg from '../components/svgs/timer.svg';
import FinishSvg from '../components/svgs/finish.svg';
import ChessSvg from '../components/svgs/chess.svg';
import ElectronicSvg from '../components/svgs/electronic.svg';
import ElectronicYellowSvg from '../components/svgs/electronic-yellow.svg';
import RealPersonSvg from '../components/svgs/real-person.svg';
import SportSvg from '../components/svgs/sport.svg';
import MoneySvg from '../components/svgs/money.svg';
import RocketSvg from '../components/svgs/rocket.svg';
import Notification2Svg from './svgs/notification-2.svg';
import Dice1Svg from '../components/svgs/dice1.svg';
import Dice2Svg from '../components/svgs/dice2.svg';
import Dice3Svg from '../components/svgs/dice3.svg';
import Dice4Svg from '../components/svgs/dice4.svg';
import Dice5Svg from '../components/svgs/dice5.svg';
import Dice6Svg from '../components/svgs/dice5.svg';
import Trash2 from '../components/svgs/trash2.svg';
import Refresh from '../components/svgs/refresh.svg';
import ShoppingCartSvg from '../components/svgs/shopping-cart.svg';
import TrendSvg from '../components/svgs/trend.svg';
import PhoneSvg from '../components/svgs/phone.svg';
import TraceTextSvg from '../components/svgs/trace_text.svg';
import SettingBetRecordSvg from '../components/svgs/settings-bet-record.svg';
import SettingPersonalStatisticSvg from '../components/svgs/settings-personal-statistic.svg';
import SettingAccountDetailsSvg from '../components/svgs/settings-account-details.svg';
import SettingPersonalInfoSvg from '../components/svgs/settings-personal-info.svg';
import SettingContactCustomerServiceSvg from '../components/svgs/settings-contact-customer-service.svg';
import SettingSecuritySvg from '../components/svgs/settings-security.svg';
import SettingBankSvg from '../components/svgs/settings-bank.svg';
import SettingBonusSvg from '../components/svgs/settings-bonus.svg';
import SettingAtmRecordSvg from '../components/svgs/settings-atm-record.svg';
import SettingTransferRecordSvg from '../components/svgs/settings-transfer-record.svg';
import SettingRewardSvg from '../components/svgs/settings-reward.svg';
import SettingGJSvg from '../components/svgs/settings-gj.svg';
import SettingMemberManagementSvg from '../components/svgs/settings-member-management.svg';
import SettingWageManagementSvg from '../components/svgs/settings-wage-management.svg';
import SettingWechatPromotionSvg from '../components/svgs/settings-wechat-promotion.svg';
import SettingSalaryRankingSvg from '../components/svgs/settings-salary-ranking.svg';
import SettingTeamReportSvg from '../components/svgs/settings-team-report.svg';
import ThirdPartyWageSvg from '../components/svgs/third-party-wage.svg';
import SettingBonusMangementSvg from '../components/svgs/settings-bonus-management.svg';
import SettingTeamBetSvg from '../components/svgs/settings-team-bet.svg';
import SettingTeamStatisticSvg from '../components/svgs/settings-team-statistic.svg';
import ThirdPartyReportSvg from '../components/svgs/third-party-report.svg';
import SettingChildrenStatusSvg from '../components/svgs/settings-children-status.svg';
import BellSvg from '../components/svgs/bell.svg';

describe('Icon', () => {
	let Icon;

	let IconReact;

	let iconType;

	let svgIconType;

	beforeEach(() => {
		jest.mock('antd/lib/icon');
		jest.mock('@ant-design/icons-react');
		Icon = require('../components/icon').default;
		IconReact = require('@ant-design/icons-react');
		iconType = 'close-circle';
		svgIconType = 'bell2';
	});

	afterEach(() => {
		iconType = undefined;

		jest.resetModules();
	});

	it('handle default props', () => {
		const {
			style,
			color,
			size,
			spin,
			isTranslucent,
		} = Icon.defaultProps;

		expect(style).toMatchObject({});
		expect(color).toBe('default');
		expect(size).toBe('middle');
		expect(spin).toEqual(false);
		expect(isTranslucent).toEqual(false);
	});

	it('should render correctly', () => {
		const wrapper = shallow(
			<Icon
				type={iconType}
			/>
		);

		expect(wrapper).toMatchSnapshot();
	});

	it('sould be selectable by ljit-icon', () => {
		const wrapper1 = shallow(
			<Icon
				type={iconType}
			/>
		);
		const wrapper2 = shallow(
			<Icon
				type={iconType}
			/>
		);
		const wrapper3 = shallow(
			<Icon
				type={svgIconType}
			/>
		);

		expect(wrapper1.hasClass('ljit-icon')).toEqual(true);
		expect(wrapper2.hasClass('ljit-icon')).toEqual(true);
		expect(wrapper3.hasClass('ljit-icon')).toEqual(true);
	});

	it('should be selectable by custom class', () => {
		const className = 'mock-class';
		const wrapper1 = shallow(
			<Icon
				className={className}
			/>
		);
		const wrapper2 = shallow(
			<Icon
				type={iconType}
				className={className}
			/>
		);
		const wrapper3 = shallow(
			<Icon
				type={svgIconType}
				className={className}
			/>
		);

		expect(wrapper1.hasClass(className)).toEqual(true);
		expect(wrapper2.hasClass(className)).toEqual(true);
		expect(wrapper3.hasClass(className)).toEqual(true);
	});

	it('should have IconReact Component', () => {
		const wrapper = shallow(
			<Icon
				type={iconType}
			/>
		);

		expect(wrapper.children().type()).toEqual(IconReact);
	});

	it('should add classname anticon-spin on children IconReact', () => {
		const wrapper1 = shallow(
			<Icon
				spin={true}
			/>
		);
		const wrapper2 = shallow(
			<Icon
				spin={true}
				type={iconType}
			/>
		);
		const wrapper3 = shallow(
			<Icon
				spin={true}
				type={svgIconType}
			/>
		);

		expect(wrapper1.hasClass('anticon-spin')).toEqual(true);
		expect(wrapper2.hasClass('anticon-spin')).toEqual(true);
		expect(wrapper3.hasClass('anticon-spin')).toEqual(true);
	});

	it('should add classname default', () => {
		const wrapper1 = shallow(
			<Icon
				color="default"
			/>
		);
		const wrapper2 = shallow(
			<Icon
				color="default"
				type={iconType}
			/>
		);
		const wrapper3 = shallow(
			<Icon
				color="default"
				type={svgIconType}
			/>
		);

		expect(wrapper1.hasClass('ljit-icon--default')).toEqual(true);
		expect(wrapper2.hasClass('ljit-icon--default')).toEqual(true);
		expect(wrapper3.hasClass('ljit-icon--default')).toEqual(true);
	});

	it('should add classname ljit-icon--small', () => {
		const wrapper1 = shallow(
			<Icon
				size="small"
			/>
		);
		const wrapper2 = shallow(
			<Icon
				size="small"
				type={iconType}
			/>
		);
		const wrapper3 = shallow(
			<Icon
				size="small"
				type={svgIconType}
			/>
		);

		expect(wrapper1.hasClass('ljit-icon--small')).toEqual(true);
		expect(wrapper2.hasClass('ljit-icon--small')).toEqual(true);
		expect(wrapper3.hasClass('ljit-icon--small')).toEqual(true);
	});

	it('should add classname ljit-icon--danger', () => {
		const wrapper1 = shallow(
			<Icon
				color="danger"
			/>
		);
		const wrapper2 = shallow(
			<Icon
				color="danger"
				type={iconType}
			/>
		);
		const wrapper3 = shallow(
			<Icon
				color="danger"
				type={svgIconType}
			/>
		);

		expect(wrapper1.hasClass('ljit-icon--danger')).toEqual(true);
		expect(wrapper2.hasClass('ljit-icon--danger')).toEqual(true);
		expect(wrapper3.hasClass('ljit-icon--danger')).toEqual(true);
	});

	it('should mount in a full DOM', () => {
		const style = {};
		const spin = true;
		const rotate = 100;

		const wrapper = mount(
			<Icon
				type={iconType}
				style={style}
				spin={spin}
				rotate={rotate}
			/>
		);

		expect(wrapper.props().type).toEqual(iconType);
		expect(wrapper.props().style).toMatchObject(style);
		expect(wrapper.props().spin).toBe(spin);
		expect(wrapper.props().rotate).toBe(rotate);
	});

	describe('Icon Type Enums', () => {
		it('should contain CLOSE_CIRCLE_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CLOSE_CIRCLE_FILL', 'close-circle');
		});
		it('should contain CARET_UP property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CARET_UP', 'caret-up');
		});
		it('should contain CARET_DOWN property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CARET_DOWN', 'caret-down');
		});
		it('should contain CHECK_CIRCEL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CHECK_CIRCEL', 'check-circle');
		});
		it('should contain SEARCH property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SEARCH', 'search');
		});
		it('should contain FILTERFILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('FILTERFILL', 'filter');
		});
		it('should contain PLUS property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('PLUS', 'plus');
		});
		it('should contain PLUS_CIRCLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('PLUS_CIRCLE', 'plus-circle');
		});
		it('should contain CLOSE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CLOSE', 'close');
		});
		it('should contain UP property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('UP', 'up');
		});
		it('should contain DOWN property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DOWN', 'down');
		});
		it('should contain LEFT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('LEFT', 'left');
		});
		it('should contain RIGHT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('RIGHT', 'right');
		});
		it('should contain MENU property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('MENU', 'menu');
		});
		it('should contain MENU_FOLD property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('MENU_FOLD', 'menu-fold');
		});
		it('should contain MENU_UNFOLD property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('MENU_UNFOLD', 'menu-unfold');
		});
		it('should contain BELL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('BELL', 'bell');
		});
		it('should contain DASHBOARD property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DASHBOARD', 'dashboard');
		});
		it('should contain FORM property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('FORM', 'form');
		});
		it('should contain TABLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TABLE', 'table');
		});
		it('should contain PROFILE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('PROFILE', 'profile');
		});
		it('should contain WARNING property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('WARNING', 'warning');
		});
		it('should contain EXCLAMATION_CIRCLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('EXCLAMATION_CIRCLE', 'exclamation-circle');
		});
		it('should contain NOTIFICATION_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('NOTIFICATION_FILL', 'notification');
		});
		it('should contain PAYCIRCLE_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('PAYCIRCLE_FILL', 'pay-circle');
		});
		it('should contain FUND_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('FUND_FILL', 'fund');
		});
		it('should contain GIFT_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('GIFT_FILL', 'gift');
		});
		it('should contain CALENDAR property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CALENDAR', 'calendar');
		});
		it('should contain APPSTORE_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('APPSTORE_FILL', 'appstore');
		});
		it('should contain UPLOAD property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('UPLOAD', 'upload');
		});
		it('should contain FLAG property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('FLAG', 'flag');
		});
		it('should contain PROJECT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('PROJECT', 'project');
		});
		it('should contain INFO_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('INFO_FILL', 'info');
		});
		it('should contain CUSTOMER_SERVICE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CUSTOMER_SERVICE', 'customer-service');
		});
		it('should contain DOLLAR property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DOLLAR', 'dollar');
		});
		it('should contain DELETE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DELETE', 'delete');
		});
		it('should contain SETTING_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_FILL', 'setting');
		});
		it('should contain CARET_RIGHT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CARET_RIGHT', 'caret-right');
		});
		it('should contain CARET_LEFT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CARET_LEFT', 'caret-left');
		});
		it('should contain STAR_OUTLINE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('STAR_OUTLINE', 'star-outline');
		});
		it('should contain STAR_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('STAR_FILL', 'star-fill');
		});
		it('should contain EYE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('EYE', 'eye');
		});
		it('should contain RECHARGE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('RECHARGE', 'recharge');
		});
		it('should contain SETTING property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING', 'setting');
		});
		it('should contain TICKET_STAR property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TICKET_STAR', 'ticket-star');
		});
		it('should contain TRANSFER property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TRANSFER', 'transfer');
		});
		it('should contain WALLET property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('WALLET', 'wallet');
		});
		it('should contain WITHDRAW property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('WITHDRAW', 'withdraw');
		});
		it('should contain MORE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('MORE', 'more');
		});
		it('should contain CROWN property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CROWN', 'crown');
		});
		it('should contain CROWN_COLOR property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CROWN_COLOR', 'crown-color');
		});
		it('should contain CROWN_2 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CROWN_2', 'crown-2');
		});
		it('should contain WHITE_CROWN_2 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('WHITE_CROWN_2', 'white-crown-2');
		});
		it('should contain WALLET_MULTICOLOR property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('WALLET_MULTICOLOR', 'wallet-multicolor');
		});
		it('should contain WALLET_LINE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('WALLET_LINE', 'wallet-line');
		});
		it('should contain ANNOUNCEMENT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ANNOUNCEMENT', 'announcement');
		});
		it('should contain MEMBER property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('MEMBER', 'member');
		});
		it('should contain CUSTOMER_SERVICE_2 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CUSTOMER_SERVICE_2', 'customer-service-2');
		});
		it('should contain PROXY property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('PROXY', 'proxy');
		});
		it('should contain RECHARGE_CIRCLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('RECHARGE_CIRCLE', 'recharge-circle');
		});
		it('should contain TRANSFER_CIRCLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TRANSFER_CIRCLE', 'transfer-circle');
		});
		it('should contain WITHDRAW_CIRCLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('WITHDRAW_CIRCLE', 'withdraw-circle');
		});
		it('should contain CHART property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('CHART', 'chart');
		});
		it('should contain EDIT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('EDIT', 'edit');
		});
		it('should contain MONEY_CHANGE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('MONEY_CHANGE', 'money-change');
		});
		it('should contain HELP property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('HELP', 'help');
		});
		it('should contain WECHAT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('WECHAT', 'wechat');
		});
		it('should contain GOOGLE_OUTLINE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('GOOGLE_OUTLINE', 'google-outline');
		});
		it('should contain USER_OUTLINE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('USER_OUTLINE', 'user-outline');
		});
		it('should contain SAFETY_OUTLINE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SAFETY_OUTLINE', 'safety-outline');
		});
		it('should contain LOCK_OUTLINE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('LOCK_OUTLINE', 'lock-outline');
		});
		it('should contain QUESTION_CIRCLE_OUTLINE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('QUESTION_CIRCLE_OUTLINE', 'question-circle-outline');
		});
		it('should contain QUESTION_CIRCLE_FILL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('QUESTION_CIRCLE_FILL', 'question-circle-fill');
		});
		it('should contain ORANGE_ANNOUNCEMENT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_ANNOUNCEMENT', 'orange-announcement');
		});
		it('should contain ORANGE_CUSTOMER_SERVICE_2 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_CUSTOMER_SERVICE_2', 'orange-customer-service-2');
		});
		it('should contain ORANGE_PROXY property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_PROXY', 'orange-proxy');
		});
		it('should contain ORANGE_MEMBER property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_MEMBER', 'orange-member');
		});
		it('should contain ORANGE_RECHARGE_CIRCLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_RECHARGE_CIRCLE', 'orange-recharge-circle');
		});
		it('should contain ORANGE_TRANSFER_CIRCLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_TRANSFER_CIRCLE', 'orange-transfer-circle');
		});
		it('should contain ORANGE_WITHDRAW_CIRCLE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_WITHDRAW_CIRCLE', 'orange-withdraw-circle');
		});
		it('should contain ORANGE_HELP property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_HELP', 'orange-help');
		});
		it('should contain COPY property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('COPY', 'copy');
		});
		it('should contain QR_CODE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('QR_CODE', 'qr-code');
		});
		it('should contain TRASH property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TRASH', 'trash');
		});
		it('should contain FORK property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('FORK', 'fork');
		});
		it('should contain ORANGE_WECHAT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('ORANGE_WECHAT', 'orange-wechat');
		});
		it('should contain HE_BALL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('HE_BALL', 'he-ball');
		});
		it('should contain SELECTED_HE_BALL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SELECTED_HE_BALL', 'selected-he-ball');
		});
		it('should contain TIGER_BALL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TIGER_BALL', 'tiger-ball');
		});
		it('should contain SELECTED_TIGER_BALL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SELECTED_TIGER_BALL', 'selected-tiger-ball');
		});
		it('should contain DRAGON_BALL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DRAGON_BALL', 'dragon-ball');
		});
		it('should contain SELECTED_DRAGON_BALL property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SELECTED_DRAGON_BALL', 'selected-dragon-ball');
		});
		it('should contain TIMER property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TIMER', 'timer');
		});
		it('should contain NOTIFICATION_2 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('NOTIFICATION_2', 'notification-2');
		});
		it('should contain DICE1 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DICE1', 'dice1');
		});
		it('should contain DICE2 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DICE2', 'dice2');
		});
		it('should contain DICE3 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DICE3', 'dice3');
		});
		it('should contain DICE4 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DICE4', 'dice4');
		});
		it('should contain DICE5 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DICE5', 'dice5');
		});
		it('should contain DICE6 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('DICE6', 'dice6');
		});
		it('should contain TRASH2 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TRASH2', 'trash2');
		});
		it('should contain REFRESH property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('REFRESH', 'refresh');
		});
		it('should contain SHOPPING_CART property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SHOPPING_CART', 'shopping-cart');
		});
		it('should contain TREND property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TREND', 'trend');
		});
		it('should contain PHONE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('PHONE', 'phone');
		});
		it('should contain TRACE_TEXT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('TRACE_TEXT', 'trace-text');
		});
		it('should contain RELOAD_OUTLINED property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('RELOAD_OUTLINED', 'reload-outlined');
		});
		it('should contain SETTING_BET_RECORD property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_BET_RECORD', 'setting-bet-record');
		});
		it('should contain SETTING_PERSONAL_STATISTIC property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_PERSONAL_STATISTIC', 'setting-personal-statistic');
		});
		it('should contain SETTING_ACCOUNT_DETAILS property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_ACCOUNT_DETAILS', 'setting-account-details');
		});
		it('should contain SETTING_PERSONAL_INFO property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_PERSONAL_INFO', 'setting-personal-info');
		});
		it('should contain SETTING_CONTACT_CUSTOMER_SERVICE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_CONTACT_CUSTOMER_SERVICE', 'setting-contact-customer-service');
		});
		it('should contain SETTING_SECURITY property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_SECURITY', 'setting-security');
		});
		it('should contain SETTING_BANK property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_BANK', 'setting-bank');
		});
		it('should contain SETTING_BONUS property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_BONUS', 'setting-bonus');
		});
		it('should contain SETTING_ATM_RECORD property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_ATM_RECORD', 'setting-atm-record');
		});
		it('should contain SETTING_TRANSFER_RECORD property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_TRANSFER_RECORD', 'setting-transfer-record');
		});
		it('should contain SETTING_REWARD property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_REWARD', 'setting-reward');
		});
		it('should contain SETTING_GJ property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_GJ', 'setting-gj');
		});
		it('should contain SETTING_MEMBER_MANAGEMENT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_MEMBER_MANAGEMENT', 'setting-member-management');
		});
		it('should contain SETTING_WAGE_MANAGEMENT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_WAGE_MANAGEMENT', 'setting-wage-management');
		});
		it('should contain SETTING_WECHAT_PROMOTION property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_WECHAT_PROMOTION', 'setting-wechat-promotion');
		});
		it('should contain SETTING_SALARY_RANKING property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_SALARY_RANKING', 'setting-salary-ranking');
		});
		it('should contain SETTING_TEAM_REPORT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_TEAM_REPORT', 'setting-team-report');
		});
		it('should contain THIRD_PARTY_WAGE property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('THIRD_PARTY_WAGE', 'third-party-wage');
		});
		it('should contain SETTING_BONUS_MANAGEMENT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_BONUS_MANAGEMENT', 'setting-bonus-management');
		});
		it('should contain SETTING_TEAM_BAT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_TEAM_BAT', 'setting-team-bet');
		});
		it('should contain SETTING_TEAM_STATISTIC property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_TEAM_STATISTIC', 'setting-team-statistic');
		});
		it('should contain THIRD_PARTY_REPORT property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('THIRD_PARTY_REPORT', 'third-party-report');
		});
		it('should contain SETTING_CHILDREN_STATUS property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('SETTING_CHILDREN_STATUS', 'setting-children-status');
		});
		it('should contain BELL2 property', () => {
			expect(Icon.IconTypeEnums).toHaveProperty('BELL2', 'bell2');
		});
	});

	describe('Icon Enums', () => {
		it('should contain close-circle property', () => {
			expect(Icon.IconEnums).toHaveProperty('close-circle', CloseCircleFill,);
		});
		it('should contain caret-up property', () => {
			expect(Icon.IconEnums).toHaveProperty('caret-up', CaretUp,);
		});
		it('should contain caret-down property', () => {
			expect(Icon.IconEnums).toHaveProperty('caret-down', CaretDown,);
		});
		it('should contain check-circle property', () => {
			expect(Icon.IconEnums).toHaveProperty('check-circle', CheckCircleOutline,);
		});
		it('should contain search property', () => {
			expect(Icon.IconEnums).toHaveProperty('search', SearchOutline,);
		});
		it('should contain filter property', () => {
			expect(Icon.IconEnums).toHaveProperty('filter', FilterFill,);
		});
		it('should contain plus property', () => {
			expect(Icon.IconEnums).toHaveProperty('plus', PlusOutline,);
		});
		it('should contain plus-circle property', () => {
			expect(Icon.IconEnums).toHaveProperty('plus-circle', PlusCircleOutline,);
		});
		it('should contain close property', () => {
			expect(Icon.IconEnums).toHaveProperty('close', CloseOutline,);
		});
		it('should contain up property', () => {
			expect(Icon.IconEnums).toHaveProperty('up', UpOutline,);
		});
		it('should contain down property', () => {
			expect(Icon.IconEnums).toHaveProperty('down', DownOutline,);
		});
		it('should contain left property', () => {
			expect(Icon.IconEnums).toHaveProperty('left', LeftOutline,);
		});
		it('should contain right property', () => {
			expect(Icon.IconEnums).toHaveProperty('right', RightOutline,);
		});
		it('should contain menu-fold property', () => {
			expect(Icon.IconEnums).toHaveProperty('menu-fold', MenuFoldOutline,);
		});
		it('should contain menu-unfold property', () => {
			expect(Icon.IconEnums).toHaveProperty('menu-unfold', MenuUnfoldOutline,);
		});
		it('should contain bell property', () => {
			expect(Icon.IconEnums).toHaveProperty('bell', BellOutline,);
		});
		it('should contain dashboard property', () => {
			expect(Icon.IconEnums).toHaveProperty('dashboard', DashboardOutline,);
		});
		it('should contain form property', () => {
			expect(Icon.IconEnums).toHaveProperty('form', FormOutline,);
		});
		it('should contain table property', () => {
			expect(Icon.IconEnums).toHaveProperty('table', TableOutline,);
		});
		it('should contain profile property', () => {
			expect(Icon.IconEnums).toHaveProperty('profile', ProfileOutline,);
		});
		it('should contain warning property', () => {
			expect(Icon.IconEnums).toHaveProperty('warning', WarningOutline,);
		});
		it('should contain exclamation-circle property', () => {
			expect(Icon.IconEnums).toHaveProperty('exclamation-circle', ExclamationCircleOutline,);
		});
		it('should contain notification property', () => {
			expect(Icon.IconEnums).toHaveProperty('notification', NotificationFill,);
		});
		it('should contain pay-circle property', () => {
			expect(Icon.IconEnums).toHaveProperty('pay-circle', PayCircleFill,);
		});
		it('should contain fund property', () => {
			expect(Icon.IconEnums).toHaveProperty('fund', FundFill,);
		});
		it('should contain gift property', () => {
			expect(Icon.IconEnums).toHaveProperty('gift', GiftFill,);
		});
		it('should contain calendar property', () => {
			expect(Icon.IconEnums).toHaveProperty('calendar', CalendarOutline,);
		});
		it('should contain appstore property', () => {
			expect(Icon.IconEnums).toHaveProperty('appstore', AppstoreFill,);
		});
		it('should contain upload property', () => {
			expect(Icon.IconEnums).toHaveProperty('upload', UploadOutline);
		});
		it('should contain flag property', () => {
			expect(Icon.IconEnums).toHaveProperty('flag', FlagOutline);
		});
		it('should contain project property', () => {
			expect(Icon.IconEnums).toHaveProperty('project', ProjectOutline);
		});
		it('should contain info property', () => {
			expect(Icon.IconEnums).toHaveProperty('info', InfoCircleFill);
		});
		it('should contain customer-service property', () => {
			expect(Icon.IconEnums).toHaveProperty('customer-service', CustomerServiceOutline);
		});
		it('should contain dollar property', () => {
			expect(Icon.IconEnums).toHaveProperty('dollar', DollarOutline);
		});
		it('should contain delete property', () => {
			expect(Icon.IconEnums).toHaveProperty('delete', DeleteOutline);
		});
		it('should contain setting property', () => {
			expect(Icon.IconEnums).toHaveProperty('setting', SettingFill);
		});
		it('should contain setting property', () => {
			expect(Icon.IconEnums).toHaveProperty('caret-right', CaretRight);
		});
		it('should contain setting property', () => {
			expect(Icon.IconEnums).toHaveProperty('caret-left', CaretLeft);
		});
		it('should contain star-outline property', () => {
			expect(Icon.IconEnums).toHaveProperty('star-outline', StarOutline);
		});
		it('should contain star-fill property', () => {
			expect(Icon.IconEnums).toHaveProperty('star-fill', StarFill);
		});
		it('should contain fork property', () => {
			expect(Icon.IconEnums).toHaveProperty('fork', ForkOutline);
		});
		it('should contain google-outline property', () => {
			expect(Icon.IconEnums).toHaveProperty('google-outline', GoogleOutline);
		});
		it('should contain user-outline property', () => {
			expect(Icon.IconEnums).toHaveProperty('user-outline', UserOutline);
		});
		it('should contain safety-outline property', () => {
			expect(Icon.IconEnums).toHaveProperty('safety-outline', SafetyOutline);
		});
		it('should contain lock-outline property', () => {
			expect(Icon.IconEnums).toHaveProperty('lock-outline', LockOutline);
		});
		it('should contain question-circle-outline property', () => {
			expect(Icon.IconEnums).toHaveProperty('question-circle-outline', QuestionCircleOutline);
		});
		it('should contain question-circle-fill property', () => {
			expect(Icon.IconEnums).toHaveProperty('question-circle-fill', QuestionCircleFill);
		});
		it('should contain heart-outline property', () => {
			expect(Icon.IconEnums).toHaveProperty('heart-outline', HeartOutline);
		});
		it('should contain heart-fill property', () => {
			expect(Icon.IconEnums).toHaveProperty('heart-fill', HeartFill);
		});
		it('should contain reload-outlined property', () => {
			expect(Icon.IconEnums).toHaveProperty('reload-outlined', ReloadOutlined);
		});
	});

	describe('SvgIconMap', () => {
		it('should contain eye property', () => {
			expect(SvgIconMap).toHaveProperty('eye', EyeSvg);
		});
		it('should contain recharge property', () => {
			expect(SvgIconMap).toHaveProperty('recharge', RechargeSvg);
		});
		it('should contain setting property', () => {
			expect(SvgIconMap).toHaveProperty('setting', SettingSvg);
		});
		it('should contain ticket-star property', () => {
			expect(SvgIconMap).toHaveProperty('ticket-star', TicketStarSvg);
		});
		it('should contain transfer property', () => {
			expect(SvgIconMap).toHaveProperty('transfer', TransferSvg);
		});
		it('should contain wallet property', () => {
			expect(SvgIconMap).toHaveProperty('wallet', WalletSvg);
		});
		it('should contain withdraw property', () => {
			expect(SvgIconMap).toHaveProperty('withdraw', WithdrawSvg);
		});
		it('should contain more property', () => {
			expect(SvgIconMap).toHaveProperty('more', MoreSvg);
		});
		it('should contain crown property', () => {
			expect(SvgIconMap).toHaveProperty('crown', CrownSvg);
		});
		it('should contain crown-color property', () => {
			expect(SvgIconMap).toHaveProperty('crown-color', CrownColorSvg);
		});
		it('should contain crown-2 property', () => {
			expect(SvgIconMap).toHaveProperty('crown-2', Crown2Svg);
		});
		it('should contain white-crown-2 property', () => {
			expect(SvgIconMap).toHaveProperty('white-crown-2', WhiteCrown2Svg);
		});
		it('should contain wallet-multicolor property', () => {
			expect(SvgIconMap).toHaveProperty('wallet-multicolor', WalletMulticolorSvg);
		});
		it('should contain wallet-line property', () => {
			expect(SvgIconMap).toHaveProperty('wallet-line', WalletLineSvg);
		});
		it('should contain announcement property', () => {
			expect(SvgIconMap).toHaveProperty('announcement', AnnouncementSvg);
		});
		it('should contain member property', () => {
			expect(SvgIconMap).toHaveProperty('member', MemberSvg);
		});
		it('should contain customer-service-svg property', () => {
			expect(SvgIconMap).toHaveProperty('customer-service-2', CustomerServiceSvg);
		});
		it('should contain proxy property', () => {
			expect(SvgIconMap).toHaveProperty('proxy', ProxySvg);
		});
		it('should contain recharge-circle property', () => {
			expect(SvgIconMap).toHaveProperty('recharge-circle', RechargeCircleSvg);
		});
		it('should contain transfer-circle property', () => {
			expect(SvgIconMap).toHaveProperty('transfer-circle', TransferCircleSvg);
		});
		it('should contain withdraw-circle property', () => {
			expect(SvgIconMap).toHaveProperty('withdraw-circle', WithdrawCircleSvg);
		});
		it('should contain chart property', () => {
			expect(SvgIconMap).toHaveProperty('chart', ChartSvg);
		});
		it('should contain edit property', () => {
			expect(SvgIconMap).toHaveProperty('edit', EditSvg);
		});
		it('should contain money-change property', () => {
			expect(SvgIconMap).toHaveProperty('money-change', MoneyChangeSvg);
		});
		it('should contain help property', () => {
			expect(SvgIconMap).toHaveProperty('help', HelpSvg);
		});
		it('should contain wechat property', () => {
			expect(SvgIconMap).toHaveProperty('wechat', WechatSvg);
		});
		it('should contain orange-announcemen property', () => {
			expect(SvgIconMap).toHaveProperty('orange-announcement', OrangeAnnouncementSvg);
		});
		it('should contain orange-customer-service-2 property', () => {
			expect(SvgIconMap).toHaveProperty('orange-customer-service-2', OrangeCustomerServiceSvg);
		});
		it('should contain orange-proxy property', () => {
			expect(SvgIconMap).toHaveProperty('orange-proxy', OrangeProxySvg);
		});
		it('should contain orange-member property', () => {
			expect(SvgIconMap).toHaveProperty('orange-member', OrangeMemberSvg);
		});
		it('should contain orange-recharge-circle property', () => {
			expect(SvgIconMap).toHaveProperty('orange-recharge-circle', OrangeRechargeCircleSvg);
		});
		it('should orange-transfer-circle property', () => {
			expect(SvgIconMap).toHaveProperty('orange-transfer-circle', OrangeTransferCircleSvg);
		});
		it('should contain orange-withdraw-circle property', () => {
			expect(SvgIconMap).toHaveProperty('orange-withdraw-circle', OrangeWithdrawCircleSvg);
		});
		it('should contain orange-help property', () => {
			expect(SvgIconMap).toHaveProperty('orange-help', OrangeHelpSvg);
		});
		it('should contain dividend property', () => {
			expect(SvgIconMap).toHaveProperty('dividend', DividendSvg);
		});
		it('should contain copy property', () => {
			expect(SvgIconMap).toHaveProperty('copy', CopySvg);
		});
		it('should contain qr-code property', () => {
			expect(SvgIconMap).toHaveProperty('qr-code', QRCodeSvg);
		});
		it('should contain trash property', () => {
			expect(SvgIconMap).toHaveProperty('trash', TrashSvg);
		});
		it('should contain orange-wechat property', () => {
			expect(SvgIconMap).toHaveProperty('orange-wechat', OrangeWechatSvg);
		});
		it('should contain he-ball property', () => {
			expect(SvgIconMap).toHaveProperty('he-ball', HeBallSvg);
		});
		it('should contain selected-he-ball property', () => {
			expect(SvgIconMap).toHaveProperty('selected-he-ball', SelectedHeBallSvg);
		});
		it('should contain tiger-ball property', () => {
			expect(SvgIconMap).toHaveProperty('tiger-ball', TigerBallSvg);
		});
		it('should contain selected-tiger-ball property', () => {
			expect(SvgIconMap).toHaveProperty('selected-tiger-ball', SelectedTigerBallSvg);
		});
		it('should contain dragon-ball property', () => {
			expect(SvgIconMap).toHaveProperty('dragon-ball', DragonBallSvg);
		});
		it('should contain selected-dragon-ball property', () => {
			expect(SvgIconMap).toHaveProperty('selected-dragon-ball', SelectedDragonBallSvg);
		});
		it('should contain bank-card property', () => {
			expect(SvgIconMap).toHaveProperty('bank-card', BankCardSvg);
		});
		it('should contain timer property', () => {
			expect(SvgIconMap).toHaveProperty('timer', TimerSvg);
		});
		it('should contain finish property', () => {
			expect(SvgIconMap).toHaveProperty('finish', FinishSvg);
		});
		it('should contain chess property', () => {
			expect(SvgIconMap).toHaveProperty('chess', ChessSvg);
		});
		it('should contain electronic property', () => {
			expect(SvgIconMap).toHaveProperty('electronic', ElectronicSvg);
		});
		it('should contain electronic-yellow property', () => {
			expect(SvgIconMap).toHaveProperty('electronic-yellow', ElectronicYellowSvg);
		});
		it('should contain real-person property', () => {
			expect(SvgIconMap).toHaveProperty('real-person', RealPersonSvg);
		});
		it('should contain sport property', () => {
			expect(SvgIconMap).toHaveProperty('sport', SportSvg);
		});
		it('should contain money property', () => {
			expect(SvgIconMap).toHaveProperty('money', MoneySvg);
		});
		it('should contain rocket property', () => {
			expect(SvgIconMap).toHaveProperty('rocket', RocketSvg);
		});
		it('should contain notification-2 property', () => {
			expect(SvgIconMap).toHaveProperty('notification-2', Notification2Svg);
		});
		it('should contain dice1 property', () => {
			expect(SvgIconMap).toHaveProperty('dice1', Dice1Svg);
		});
		it('should contain dice2 property', () => {
			expect(SvgIconMap).toHaveProperty('dice2', Dice2Svg);
		});
		it('should contain dice3 property', () => {
			expect(SvgIconMap).toHaveProperty('dice3', Dice3Svg);
		});
		it('should contain dice4 property', () => {
			expect(SvgIconMap).toHaveProperty('dice4', Dice4Svg);
		});
		it('should contain dice5 property', () => {
			expect(SvgIconMap).toHaveProperty('dice5', Dice5Svg);
		});
		it('should contain dice6 property', () => {
			expect(SvgIconMap).toHaveProperty('dice6', Dice6Svg);
		});
		it('should contain trash2 property', () => {
			expect(SvgIconMap).toHaveProperty('trash2', Trash2);
		});
		it('should contain refresh property', () => {
			expect(SvgIconMap).toHaveProperty('refresh', Refresh);
		});
		it('should contain shopping-cart property', () => {
			expect(SvgIconMap).toHaveProperty('shopping-cart', ShoppingCartSvg);
		});
		it('should contain trend property', () => {
			expect(SvgIconMap).toHaveProperty('trend', TrendSvg);
		});
		it('should contain phone property', () => {
			expect(SvgIconMap).toHaveProperty('phone', PhoneSvg);
		});
		it('should contain trace-text property', () => {
			expect(SvgIconMap).toHaveProperty('trace-text', TraceTextSvg);
		});
		it('should contain setting-bet-record property', () => {
			expect(SvgIconMap).toHaveProperty('setting-bet-record', SettingBetRecordSvg);
		});
		it('should contain setting-personal-statistic property', () => {
			expect(SvgIconMap).toHaveProperty('setting-personal-statistic', SettingPersonalStatisticSvg);
		});
		it('should contain setting-account-details property', () => {
			expect(SvgIconMap).toHaveProperty('setting-account-details', SettingAccountDetailsSvg);
		});
		it('should contain setting-personal-info property', () => {
			expect(SvgIconMap).toHaveProperty('setting-personal-info', SettingPersonalInfoSvg);
		});
		it('should contain setting-contact-customer-service property', () => {
			expect(SvgIconMap).toHaveProperty('setting-contact-customer-service', SettingContactCustomerServiceSvg);
		});
		it('should contain setting-security property', () => {
			expect(SvgIconMap).toHaveProperty('setting-security', SettingSecuritySvg);
		});
		it('should contain setting-bank property', () => {
			expect(SvgIconMap).toHaveProperty('setting-bank', SettingBankSvg);
		});
		it('should contain setting-bonus property', () => {
			expect(SvgIconMap).toHaveProperty('setting-bonus', SettingBonusSvg);
		});
		it('should contain setting-atm-record property', () => {
			expect(SvgIconMap).toHaveProperty('setting-atm-record', SettingAtmRecordSvg);
		});
		it('should contain setting-transfer-record property', () => {
			expect(SvgIconMap).toHaveProperty('setting-transfer-record', SettingTransferRecordSvg);
		});
		it('should contain setting-reward property', () => {
			expect(SvgIconMap).toHaveProperty('setting-reward', SettingRewardSvg);
		});
		it('should contain setting-gj property', () => {
			expect(SvgIconMap).toHaveProperty('setting-gj', SettingGJSvg);
		});
		it('should contain setting-member-management property', () => {
			expect(SvgIconMap).toHaveProperty('setting-member-management', SettingMemberManagementSvg);
		});
		it('should contain setting-wage-management property', () => {
			expect(SvgIconMap).toHaveProperty('setting-wage-management', SettingWageManagementSvg);
		});
		it('should contain setting-wechat-promotion property', () => {
			expect(SvgIconMap).toHaveProperty('setting-wechat-promotion', SettingWechatPromotionSvg);
		});
		it('should contain setting-salary-ranking property', () => {
			expect(SvgIconMap).toHaveProperty('setting-salary-ranking', SettingSalaryRankingSvg);
		});
		it('should contain setting-team-report property', () => {
			expect(SvgIconMap).toHaveProperty('setting-team-report', SettingTeamReportSvg);
		});
		it('should contain third-party-wage property', () => {
			expect(SvgIconMap).toHaveProperty('third-party-wage', ThirdPartyWageSvg);
		});
		it('should contain setting-bonus-management property', () => {
			expect(SvgIconMap).toHaveProperty('setting-bonus-management', SettingBonusMangementSvg);
		});
		it('should contain setting-team-bet property', () => {
			expect(SvgIconMap).toHaveProperty('setting-team-bet', SettingTeamBetSvg);
		});
		it('should contain setting-team-statistic property', () => {
			expect(SvgIconMap).toHaveProperty('setting-team-statistic', SettingTeamStatisticSvg);
		});
		it('should contain third-party-report property', () => {
			expect(SvgIconMap).toHaveProperty('third-party-report', ThirdPartyReportSvg);
		});
		it('should contain setting-children-status property', () => {
			expect(SvgIconMap).toHaveProperty('setting-children-status', SettingChildrenStatusSvg);
		});
		it('should contain bell2 property', () => {
			expect(SvgIconMap).toHaveProperty('bell2', BellSvg);
		});
	});

	describe('Color Enums', () => {
		it('should contain WHITE property', () => {
			expect(Icon.ColorEnums).toHaveProperty('WHITE', 'white',);
		});
		it('should contain GREY property', () => {
			expect(Icon.ColorEnums).toHaveProperty('GREY', 'grey',);
		});
		it('should contain DANGER property', () => {
			expect(Icon.ColorEnums).toHaveProperty('DANGER', 'danger',);
		});
		it('should contain PRIMARY property', () => {
			expect(Icon.ColorEnums).toHaveProperty('PRIMARY', 'primary',);
		});
		it('should contain SUCCESS property', () => {
			expect(Icon.ColorEnums).toHaveProperty('SUCCESS', 'success');
		});
		it('should contain DEFAULT property', () => {
			expect(Icon.ColorEnums).toHaveProperty('DEFAULT', 'default');
		});
	});

	describe('Size Enums', () => {
		it('should contain XX_LARGE property', () => {
			expect(Icon.SizeEnums).toHaveProperty('XX_LARGE', 'xx-large');
		});
		it('should contain X_LARGE property', () => {
			expect(Icon.SizeEnums).toHaveProperty('X_LARGE', 'x-large');
		});
		it('should contain LARGE property', () => {
			expect(Icon.SizeEnums).toHaveProperty('LARGE', 'large');
		});
		it('should contain MIDDLE property', () => {
			expect(Icon.SizeEnums).toHaveProperty('MIDDLE', 'middle');
		});
		it('should contain SMALL property', () => {
			expect(Icon.SizeEnums).toHaveProperty('SMALL', 'small');
		});
		it('should contain X_SMALL property', () => {
			expect(Icon.SizeEnums).toHaveProperty('X_SMALL', 'x-small');
		});
	});
});
