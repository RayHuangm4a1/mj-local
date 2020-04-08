import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Icon as AntdIcon, } from 'antd';
import AntdIsolateIcon from '@ant-design/icons-react';
import 'antd/lib/icon/style/index.css';
import './style.styl';
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
	MenuOutline,
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
	StarOutline,
	StarFill,
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
} from './icons';
import EyeSvg from './svgs/eye.svg';
import MoreSvg from './svgs/more.svg';
import RechargeSvg from './svgs/recharge.svg';
import SettingSvg from './svgs/setting.svg';
import TicketStarSvg from './svgs/ticket-star.svg';
import TransferSvg from './svgs/transfer.svg';
import WalletSvg from './svgs/wallet.svg';
import WithdrawSvg from './svgs/withdraw.svg';
import CrownSvg from './svgs/prize.svg';
import CrownColorSvg from './svgs/prize-c.svg';
import Crown2Svg from './svgs/prize-2.svg';
import WhiteCrown2Svg from './svgs/white-prize-2.svg';
import WalletMulticolorSvg from './svgs/wallet_multicolor.svg';
import WalletLineSvg from './svgs/wallet_line.svg';
import AnnouncementSvg from './svgs/announcement.svg';
import MemberSvg from './svgs/member.svg';
import CustomerServiceSvg from './svgs/customer_service.svg';
import ProxySvg from './svgs/proxy.svg';
import RechargeCircleSvg from './svgs/recharge_circle.svg';
import TransferCircleSvg from './svgs/transfer_circle.svg';
import WithdrawCircleSvg from './svgs/withdraw_circle.svg';
import ChartSvg from './svgs/chart.svg';
import EditSvg from './svgs/edit.svg';
import DividendSvg from './svgs/dividend.svg';
import MoneyChangeSvg from './svgs/money_change.svg';
import HelpSvg from './svgs/help.svg';
import WechatSvg from './svgs/wechat.svg';
import OrangeAnnouncementSvg from './svgs/orange_announcement.svg';
import OrangeCustomerServiceSvg from './svgs/orange_customer_service.svg';
import OrangeProxySvg from './svgs/orange_proxy.svg';
import OrangeMemberSvg from './svgs/orange_member.svg';
import OrangeRechargeCircleSvg from './svgs/orange_recharge.svg';
import OrangeTransferCircleSvg from './svgs/orange_transfer.svg';
import OrangeWithdrawCircleSvg from './svgs/orange_withdraw.svg';
import OrangeHelpSvg from './svgs/orange_help.svg';
import CopySvg from './svgs/copy.svg';
import QRCodeSvg from './svgs/qr-code.svg';
import TrashSvg from './svgs/trash.svg';
import OrangeWechatSvg from './svgs/orange_wechat.svg';
import HeBallSvg from './svgs/he_ball.svg';
import DragonBallSvg from './svgs/dragon_ball.svg';
import TigerBallSvg from './svgs/tiger_ball.svg';
import SelectedHeBallSvg from './svgs/selected_he_ball.svg';
import SelectedDragonBallSvg from './svgs/selected_dragon_ball.svg';
import SelectedTigerBallSvg from './svgs/selected_tiger_ball.svg';
import BankCardSvg from './svgs/bank_card.svg';
import TimerSvg from './svgs/timer.svg';
import FinishSvg from './svgs/finish.svg';
import ChessSvg from './svgs/chess.svg';
import ElectronicSvg from './svgs/electronic.svg';
import ElectronicYellowSvg from './svgs/electronic-yellow.svg';
import RealPersonSvg from './svgs/real-person.svg';
import SportSvg from './svgs/sport.svg';
import MoneySvg from './svgs/money.svg';
import RocketSvg from './svgs/rocket.svg';
import Notification2Svg from './svgs/notification-2.svg';
import Dice1Svg from './svgs/dice1.svg';
import Dice2Svg from './svgs/dice2.svg';
import Dice3Svg from './svgs/dice3.svg';
import Dice4Svg from './svgs/dice4.svg';
import Dice5Svg from './svgs/dice5.svg';
import Dice6Svg from './svgs/dice6.svg';
import Trash2 from './svgs/trash2.svg';
import Refresh from './svgs/refresh.svg';
import ShoppingCartSvg from './svgs/shopping-cart.svg';
import TrendSvg from './svgs/trend.svg';
import PhoneSvg from './svgs/phone.svg';
import TraceTextSvg from './svgs/trace_text.svg';
import SettingBetRecordSvg from './svgs/settings-bet-record.svg';
import SettingPersonalStatisticSvg from './svgs/settings-personal-statistic.svg';
import SettingAccountDetailsSvg from './svgs/settings-account-details.svg';
import SettingPersonalInfoSvg from './svgs/settings-personal-info.svg';
import SettingContactCustomerServiceSvg from './svgs/settings-contact-customer-service.svg';
import SettingSecuritySvg from './svgs/settings-security.svg';
import SettingBankSvg from './svgs/settings-bank.svg';
import SettingBonusSvg from './svgs/settings-bonus.svg';
import SettingAtmRecordSvg from './svgs/settings-atm-record.svg';
import SettingTransferRecordSvg from './svgs/settings-transfer-record.svg';
import SettingRewardSvg from './svgs/settings-reward.svg';
import SettingGJSvg from './svgs/settings-gj.svg';
import SettingMemberManagementSvg from './svgs/settings-member-management.svg';
import SettingWageManagementSvg from './svgs/settings-wage-management.svg';
import SettingWechatPromotionSvg from './svgs/settings-wechat-promotion.svg';
import SettingSalaryRankingSvg from './svgs/settings-salary-ranking.svg';
import SettingTeamReportSvg from './svgs/settings-team-report.svg';
import ThirdPartyWageSvg from './svgs/third-party-wage.svg';
import SettingBonusMangementSvg from './svgs/settings-bonus-management.svg';
import SettingTeamBetSvg from './svgs/settings-team-bet.svg';
import SettingTeamStatisticSvg from './svgs/settings-team-statistic.svg';
import ThirdPartyReportSvg from './svgs/third-party-report.svg';
import SettingChildrenStatusSvg from './svgs/settings-children-status.svg';
import BellSvg from './svgs/bell.svg';

AntdIsolateIcon.add(
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
	StarOutline,
	StarFill,
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
);

const IconTypeEnums = {
	CLOSE_CIRCLE_FILL: 'close-circle',
	CARET_UP: 'caret-up',
	CARET_DOWN: 'caret-down',
	CHECK_CIRCEL: 'check-circle',
	SEARCH: 'search',
	FILTERFILL:'filter',
	PLUS: 'plus',
	PLUS_CIRCLE: 'plus-circle',
	CLOSE:'close',
	UP:'up',
	DOWN:'down',
	LEFT:'left',
	RIGHT:'right',
	MENU:'menu',
	MENU_FOLD:'menu-fold',
	MENU_UNFOLD:'menu-unfold',
	BELL:'bell',
	DASHBOARD:'dashboard',
	FORM:'form',
	TABLE:'table',
	PROFILE:'profile',
	WARNING:'warning',
	EXCLAMATION_CIRCLE:'exclamation-circle',
	NOTIFICATION_FILL:'notification',
	PAYCIRCLE_FILL:'pay-circle',
	FUND_FILL:'fund',
	GIFT_FILL:'gift',
	CALENDAR:'calendar',
	APPSTORE_FILL: 'appstore',
	UPLOAD: 'upload',
	FLAG: 'flag',
	PROJECT: 'project',
	INFO_FILL: 'info',
	CUSTOMER_SERVICE: 'customer-service',
	DOLLAR: 'dollar',
	DELETE: 'delete',
	SETTING_FILL: 'setting',
	CARET_RIGHT: 'caret-right',
	CARET_LEFT: 'caret-left',
	STAR_OUTLINE: 'star-outline',
	STAR_FILL: 'star-fill',
	EYE: 'eye',
	RECHARGE: 'recharge',
	SETTING: 'setting',
	TICKET_STAR: 'ticket-star',
	TRANSFER: 'transfer',
	WALLET: 'wallet',
	WITHDRAW: 'withdraw',
	MORE: 'more',
	CROWN:'crown',
	CROWN_COLOR: 'crown-color',
	CROWN_2: 'crown-2',
	WHITE_CROWN_2: 'white-crown-2',
	WALLET_MULTICOLOR: 'wallet-multicolor',
	WALLET_LINE: 'wallet-line',
	ANNOUNCEMENT: 'announcement',
	MEMBER: 'member',
	CUSTOMER_SERVICE_2: 'customer-service-2',
	PROXY: 'proxy',
	RECHARGE_CIRCLE: 'recharge-circle',
	TRANSFER_CIRCLE: 'transfer-circle',
	WITHDRAW_CIRCLE: 'withdraw-circle',
	CHART: 'chart',
	EDIT: 'edit',
	DIVIDEND: 'dividend',
	MONEY_CHANGE: 'money-change',
	HELP: 'help',
	WECHAT: 'wechat',
	GOOGLE_OUTLINE: 'google-outline',
	USER_OUTLINE: 'user-outline',
	SAFETY_OUTLINE: 'safety-outline',
	LOCK_OUTLINE: 'lock-outline',
	QUESTION_CIRCLE_OUTLINE: 'question-circle-outline',
	QUESTION_CIRCLE_FILL: 'question-circle-fill',
	HEART_OUTLINE: 'heart-outline',
	HEART_FILL: 'heart-fill',
	RELOAD_OUTLINED: 'reload-outlined',
	ORANGE_ANNOUNCEMENT: 'orange-announcement',
	ORANGE_CUSTOMER_SERVICE_2: 'orange-customer-service-2',
	ORANGE_PROXY: 'orange-proxy',
	ORANGE_MEMBER: 'orange-member',
	ORANGE_RECHARGE_CIRCLE: 'orange-recharge-circle',
	ORANGE_TRANSFER_CIRCLE: 'orange-transfer-circle',
	ORANGE_WITHDRAW_CIRCLE: 'orange-withdraw-circle',
	ORANGE_HELP: 'orange-help',
	COPY: 'copy',
	QR_CODE: 'qr-code',
	TRASH: 'trash',
	FORK: 'fork',
	ORANGE_WECHAT: 'orange-wechat',
	HE_BALL: 'he-ball',
	SELECTED_HE_BALL: 'selected-he-ball',
	TIGER_BALL: 'tiger-ball',
	SELECTED_TIGER_BALL: 'selected-tiger-ball',
	DRAGON_BALL: 'dragon-ball',
	SELECTED_DRAGON_BALL: 'selected-dragon-ball',
	BANK_CARD: 'bank-card',
	TIMER: 'timer',
	FINISH: 'finish',
	CHESS: 'chess',
	ELECTRONIC: 'electronic',
	ELECTRONIC_YELLOW: 'electronic-yellow',
	REAL_PERSON: 'real-person',
	SPORT: 'sport',
	MONEY: 'money',
	ROCKET: 'rocket',
	NOTIFICATION_2:'notification-2',
	DICE1: 'dice1',
	DICE2: 'dice2',
	DICE3: 'dice3',
	DICE4: 'dice4',
	DICE5: 'dice5',
	DICE6: 'dice6',
	TRASH2: 'trash2',
	REFRESH: 'refresh',
	SHOPPING_CART: 'shopping-cart',
	TREND: 'trend',
	PHONE: 'phone',
	TRACE_TEXT: 'trace-text',
	SETTING_BET_RECORD: 'setting-bet-record',
	SETTING_PERSONAL_STATISTIC: 'setting-personal-statistic',
	SETTING_ACCOUNT_DETAILS: 'setting-account-details',
	SETTING_PERSONAL_INFO:'setting-personal-info',
	SETTING_CONTACT_CUSTOMER_SERVICE:'setting-contact-customer-service',
	SETTING_SECURITY:'setting-security',
	SETTING_BANK:'setting-bank',
	SETTING_BONUS:'setting-bonus',
	SETTING_ATM_RECORD:'setting-atm-record',
	SETTING_TRANSFER_RECORD:'setting-transfer-record',
	SETTING_REWARD:'setting-reward',
	SETTING_GJ:'setting-gj',
	SETTING_MEMBER_MANAGEMENT: 'setting-member-management',
	SETTING_WAGE_MANAGEMENT: 'setting-wage-management',
	SETTING_WECHAT_PROMOTION: 'setting-wechat-promotion',
	SETTING_SALARY_RANKING: 'setting-salary-ranking',
	SETTING_TEAM_REPORT: 'setting-team-report',
	THIRD_PARTY_WAGE: 'third-party-wage',
	SETTING_BONUS_MANAGEMENT: 'setting-bonus-management',
	SETTING_TEAM_BAT: 'setting-team-bet',
	SETTING_TEAM_STATISTIC: 'setting-team-statistic',
	THIRD_PARTY_REPORT: 'third-party-report',
	SETTING_CHILDREN_STATUS: 'setting-children-status',
	BELL2: 'bell2',
};

const {
	CLOSE_CIRCLE_FILL,
	CARET_UP,
	CARET_DOWN,
	CHECK_CIRCEL,
	SEARCH,
	FILTERFILL,
	PLUS,
	PLUS_CIRCLE,
	CLOSE,
	UP,
	DOWN,
	LEFT,
	RIGHT,
	MENU,
	MENU_FOLD,
	MENU_UNFOLD,
	BELL,
	DASHBOARD,
	FORM,
	TABLE,
	PROFILE,
	WARNING,
	EXCLAMATION_CIRCLE,
	NOTIFICATION_FILL,
	PAYCIRCLE_FILL,
	FUND_FILL,
	GIFT_FILL,
	CALENDAR,
	APPSTORE_FILL,
	UPLOAD,
	FLAG,
	PROJECT,
	INFO_FILL,
	CUSTOMER_SERVICE,
	DOLLAR,
	DELETE,
	SETTING_FILL,
	CARET_RIGHT,
	CARET_LEFT,
	STAR_OUTLINE,
	STAR_FILL,
	EYE,
	RECHARGE,
	SETTING,
	TICKET_STAR,
	TRANSFER,
	WALLET,
	WITHDRAW,
	MORE,
	CROWN,
	CROWN_COLOR,
	CROWN_2,
	WHITE_CROWN_2,
	WALLET_MULTICOLOR,
	WALLET_LINE,
	ANNOUNCEMENT,
	MEMBER,
	CUSTOMER_SERVICE_2,
	PROXY,
	RECHARGE_CIRCLE,
	TRANSFER_CIRCLE,
	WITHDRAW_CIRCLE,
	CHART,
	EDIT,
	DIVIDEND,
	MONEY_CHANGE,
	HELP,
	WECHAT,
	GOOGLE_OUTLINE,
	USER_OUTLINE,
	SAFETY_OUTLINE,
	LOCK_OUTLINE,
	QUESTION_CIRCLE_OUTLINE,
	QUESTION_CIRCLE_FILL,
	HEART_OUTLINE,
	HEART_FILL,
	RELOAD_OUTLINED,
	ORANGE_ANNOUNCEMENT,
	ORANGE_CUSTOMER_SERVICE_2,
	ORANGE_PROXY,
	ORANGE_MEMBER,
	ORANGE_RECHARGE_CIRCLE,
	ORANGE_TRANSFER_CIRCLE,
	ORANGE_WITHDRAW_CIRCLE,
	ORANGE_HELP,
	COPY,
	QR_CODE,
	TRASH,
	FORK,
	ORANGE_WECHAT,
	HE_BALL,
	SELECTED_HE_BALL,
	TIGER_BALL,
	SELECTED_TIGER_BALL,
	DRAGON_BALL,
	SELECTED_DRAGON_BALL,
	BANK_CARD,
	TIMER,
	FINISH,
	CHESS,
	ELECTRONIC,
	ELECTRONIC_YELLOW,
	REAL_PERSON,
	SPORT,
	MONEY,
	ROCKET,
	NOTIFICATION_2,
	DICE1,
	DICE2,
	DICE3,
	DICE4,
	DICE5,
	DICE6,
	TRASH2,
	REFRESH,
	SHOPPING_CART,
	TREND,
	PHONE,
	TRACE_TEXT,
	SETTING_BET_RECORD,
	SETTING_PERSONAL_STATISTIC,
	SETTING_ACCOUNT_DETAILS,
	SETTING_PERSONAL_INFO,
	SETTING_CONTACT_CUSTOMER_SERVICE,
	SETTING_SECURITY,
	SETTING_BANK,
	SETTING_BONUS,
	SETTING_ATM_RECORD,
	SETTING_TRANSFER_RECORD,
	SETTING_REWARD,
	SETTING_GJ,
	SETTING_MEMBER_MANAGEMENT,
	SETTING_WAGE_MANAGEMENT,
	SETTING_WECHAT_PROMOTION,
	SETTING_SALARY_RANKING,
	SETTING_TEAM_REPORT,
	THIRD_PARTY_WAGE,
	SETTING_BONUS_MANAGEMENT,
	SETTING_TEAM_BAT,
	SETTING_TEAM_STATISTIC,
	THIRD_PARTY_REPORT,
	SETTING_CHILDREN_STATUS,
	BELL2,
} = IconTypeEnums;
const iconTypeKeys = Object.keys(IconTypeEnums).map(key => IconTypeEnums[key]);

const IconEnums = {
	[CLOSE_CIRCLE_FILL]: CloseCircleFill,
	[CARET_UP]: CaretUp,
	[CARET_DOWN]: CaretDown,
	[CHECK_CIRCEL]: CheckCircleOutline,
	[SEARCH]: SearchOutline,
	[FILTERFILL]: FilterFill,
	[PLUS]: PlusOutline,
	[PLUS_CIRCLE]: PlusCircleOutline,
	[CLOSE]: CloseOutline,
	[UP]: UpOutline,
	[DOWN]: DownOutline,
	[LEFT]: LeftOutline,
	[RIGHT]: RightOutline,
	[MENU]: MenuOutline,
	[MENU_FOLD]: MenuFoldOutline,
	[MENU_UNFOLD]: MenuUnfoldOutline,
	[BELL]: BellOutline,
	[DASHBOARD]: DashboardOutline,
	[FORM]: FormOutline,
	[TABLE]: TableOutline,
	[PROFILE]: ProfileOutline,
	[WARNING]: WarningOutline,
	[EXCLAMATION_CIRCLE]: ExclamationCircleOutline,
	[NOTIFICATION_FILL]: NotificationFill,
	[PAYCIRCLE_FILL]: PayCircleFill,
	[FUND_FILL]: FundFill,
	[GIFT_FILL]: GiftFill,
	[CALENDAR]: CalendarOutline,
	[APPSTORE_FILL]: AppstoreFill,
	[UPLOAD]: UploadOutline,
	[FLAG]: FlagOutline,
	[PROJECT]: ProjectOutline,
	[INFO_FILL]: InfoCircleFill,
	[CUSTOMER_SERVICE]: CustomerServiceOutline,
	[DOLLAR]: DollarOutline,
	[DELETE]: DeleteOutline,
	[SETTING_FILL]: SettingFill,
	[CARET_RIGHT]: CaretRight,
	[CARET_LEFT]: CaretLeft,
	[STAR_OUTLINE]: StarOutline,
	[STAR_FILL]: StarFill,
	[FORK]: ForkOutline,
	[GOOGLE_OUTLINE]: GoogleOutline,
	[USER_OUTLINE]: UserOutline,
	[SAFETY_OUTLINE]: SafetyOutline,
	[LOCK_OUTLINE]: LockOutline,
	[QUESTION_CIRCLE_OUTLINE]: QuestionCircleOutline,
	[QUESTION_CIRCLE_FILL]: QuestionCircleFill,
	[HEART_OUTLINE]:HeartOutline,
	[HEART_FILL]:HeartFill,
	[RELOAD_OUTLINED]: ReloadOutlined,
};

export const SvgIconMap = {
	[EYE]: EyeSvg,
	[RECHARGE]: RechargeSvg,
	[SETTING]: SettingSvg,
	[TICKET_STAR]: TicketStarSvg,
	[TRANSFER]: TransferSvg,
	[WALLET]: WalletSvg,
	[WITHDRAW]: WithdrawSvg,
	[MORE]: MoreSvg,
	[CROWN]: CrownSvg,
	[CROWN_COLOR]: CrownColorSvg,
	[CROWN_2]: Crown2Svg,
	[WHITE_CROWN_2]: WhiteCrown2Svg,
	[WALLET_MULTICOLOR]: WalletMulticolorSvg,
	[WALLET_LINE]: WalletLineSvg,
	[ANNOUNCEMENT]: AnnouncementSvg,
	[MEMBER]: MemberSvg,
	[CUSTOMER_SERVICE_2]: CustomerServiceSvg,
	[PROXY]: ProxySvg,
	[RECHARGE_CIRCLE]: RechargeCircleSvg,
	[TRANSFER_CIRCLE]: TransferCircleSvg,
	[WITHDRAW_CIRCLE]: WithdrawCircleSvg,
	[CHART]: ChartSvg,
	[EDIT]: EditSvg,
	[DIVIDEND]: DividendSvg,
	[MONEY_CHANGE]: MoneyChangeSvg,
	[HELP]: HelpSvg,
	[WECHAT]: WechatSvg,
	[ORANGE_ANNOUNCEMENT]: OrangeAnnouncementSvg,
	[ORANGE_CUSTOMER_SERVICE_2]: OrangeCustomerServiceSvg,
	[ORANGE_PROXY]: OrangeProxySvg,
	[ORANGE_MEMBER]: OrangeMemberSvg,
	[ORANGE_RECHARGE_CIRCLE]: OrangeRechargeCircleSvg,
	[ORANGE_TRANSFER_CIRCLE]: OrangeTransferCircleSvg,
	[ORANGE_WITHDRAW_CIRCLE]: OrangeWithdrawCircleSvg,
	[ORANGE_HELP]: OrangeHelpSvg,
	[COPY]: CopySvg,
	[QR_CODE]: QRCodeSvg,
	[TRASH]: TrashSvg,
	[ORANGE_WECHAT]: OrangeWechatSvg,
	[HE_BALL]: HeBallSvg,
	[SELECTED_HE_BALL]: SelectedHeBallSvg,
	[TIGER_BALL]: TigerBallSvg,
	[SELECTED_TIGER_BALL]: SelectedTigerBallSvg,
	[DRAGON_BALL]: DragonBallSvg,
	[SELECTED_DRAGON_BALL]: SelectedDragonBallSvg,
	[BANK_CARD]: BankCardSvg,
	[TIMER]: TimerSvg,
	[FINISH]: FinishSvg,
	[CHESS]: ChessSvg,
	[ELECTRONIC]: ElectronicSvg,
	[ELECTRONIC_YELLOW]: ElectronicYellowSvg,
	[REAL_PERSON]: RealPersonSvg,
	[SPORT]: SportSvg,
	[MONEY]: MoneySvg,
	[ROCKET]: RocketSvg,
	[NOTIFICATION_2]: Notification2Svg,
	[DICE1]: Dice1Svg,
	[DICE2]: Dice2Svg,
	[DICE3]: Dice3Svg,
	[DICE4]: Dice4Svg,
	[DICE5]: Dice5Svg,
	[DICE6]: Dice6Svg,
	[TRASH2]: Trash2,
	[REFRESH]: Refresh,
	[SHOPPING_CART]: ShoppingCartSvg,
	[TREND]: TrendSvg,
	[PHONE]: PhoneSvg,
	[TRACE_TEXT]: TraceTextSvg,
	[SETTING_BET_RECORD]: SettingBetRecordSvg,
	[SETTING_PERSONAL_STATISTIC]: SettingPersonalStatisticSvg,
	[SETTING_ACCOUNT_DETAILS]: SettingAccountDetailsSvg,
	[SETTING_PERSONAL_INFO]: SettingPersonalInfoSvg,
	[SETTING_CONTACT_CUSTOMER_SERVICE]: SettingContactCustomerServiceSvg,
	[SETTING_SECURITY]: SettingSecuritySvg,
	[SETTING_BANK]: SettingBankSvg,
	[SETTING_BONUS]: SettingBonusSvg,
	[SETTING_ATM_RECORD]: SettingAtmRecordSvg,
	[SETTING_TRANSFER_RECORD]: SettingTransferRecordSvg,
	[SETTING_REWARD]: SettingRewardSvg,
	[SETTING_GJ]: SettingGJSvg,
	[SETTING_MEMBER_MANAGEMENT]: SettingMemberManagementSvg, 
	[SETTING_WAGE_MANAGEMENT]: SettingWageManagementSvg,
	[SETTING_WECHAT_PROMOTION]: SettingWechatPromotionSvg,
	[SETTING_SALARY_RANKING]: SettingSalaryRankingSvg,
	[SETTING_TEAM_REPORT]: SettingTeamReportSvg,
	[THIRD_PARTY_WAGE]: ThirdPartyWageSvg,
	[SETTING_BONUS_MANAGEMENT]: SettingBonusMangementSvg,
	[SETTING_TEAM_BAT]: SettingTeamBetSvg,
	[SETTING_TEAM_STATISTIC]: SettingTeamStatisticSvg,
	[THIRD_PARTY_REPORT]: ThirdPartyReportSvg,
	[SETTING_CHILDREN_STATUS]: SettingChildrenStatusSvg,
	[BELL2]: BellSvg,
};

const PREFIX_CLASS = 'ljit-icon';

const ColorEnums = {
	WHITE: 'white',
	GREY: 'grey',
	ORANGE: 'orange',
	DANGER: 'danger',
	PRIMARY: 'primary',
	SUCCESS: 'success',
	DEFAULT: 'default',
};

const SizeEnums = {
	XX_LARGE: 'xx-large',
	X_LARGE: 'x-large',
	LARGE: 'large',
	MIDDLE: 'middle',
	SMALL: 'small',
	X_SMALL: 'x-small',
};

const {
	WHITE,
	GREY,
	ORANGE,
	DANGER,
	PRIMARY,
	SUCCESS,
	DEFAULT,
} = ColorEnums;

const {
	XX_LARGE,
	X_LARGE,
	LARGE,
	MIDDLE,
	SMALL,
	X_SMALL,
} = SizeEnums;

const propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(iconTypeKeys),
	style: PropTypes.object,
	color: PropTypes.oneOf([DANGER, PRIMARY, SUCCESS, DEFAULT, WHITE, GREY, ORANGE,]),
	size: PropTypes.oneOf([XX_LARGE, X_LARGE, LARGE, MIDDLE, SMALL, X_SMALL,]),
	spin: PropTypes.bool,
	rotate: PropTypes.number,
	isTranslucent: PropTypes.bool,
};
const defaultProps = {
	style: {},
	color: DEFAULT,
	size: MIDDLE,
	spin: false,
	isTranslucent: false,
};

const Icon = ({
	className,
	type,
	color,
	size,
	style,
	spin,
	rotate,
	isTranslucent,
} = {}) => {
	const transform = `rotate(${rotate}deg)`;
	const postStyle = rotate ? (Object.assign({}, style, { transform, })) : style;
	const originalIcon = IconEnums[type];
	const SvgIcon = SvgIconMap[type];
	const iconClass = cx({
		[`${PREFIX_CLASS}--default`]: color === DEFAULT,
		[`${PREFIX_CLASS}--danger`]: color === DANGER,
		[`${PREFIX_CLASS}--primary`]: color === PRIMARY,
		[`${PREFIX_CLASS}--success`]: color === SUCCESS,
		[`${PREFIX_CLASS}--white`]: color === WHITE,
		[`${PREFIX_CLASS}--grey`]: color === GREY,
		[`${PREFIX_CLASS}--orange`]: color === ORANGE,
		[`${PREFIX_CLASS}--x-small`]: size === X_SMALL,
		[`${PREFIX_CLASS}--small`]: size === SMALL,
		[`${PREFIX_CLASS}--middle`]: size === MIDDLE,
		[`${PREFIX_CLASS}--large`]: size === LARGE,
		[`${PREFIX_CLASS}--x-large`]: size === X_LARGE,
		[`${PREFIX_CLASS}--xx-large`]: size === XX_LARGE,
		[`${PREFIX_CLASS}--translucent`]: isTranslucent,
		'anticon-spin': spin,
	});

	if (originalIcon) {
		return (
			<i className={cx('anticon', PREFIX_CLASS,`anticon-${type}`, className, iconClass)}>
				<AntdIsolateIcon
					type={originalIcon}
					style={postStyle}
				/>
			</i>
		);
	}
	if (SvgIcon) {
		return (
			<AntdIcon
				style={postStyle}
				className={cx(PREFIX_CLASS, `anticon-${type}`, className, iconClass)}
				component={SvgIcon}
			/>
		);
	}

	return (
		<AntdIcon
			type={type}
			style={postStyle}
			className={cx(className, iconClass)}
		/>
	);
};

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

Icon.IconTypeEnums = IconTypeEnums;
Icon.IconEnums = IconEnums;
Icon.ColorEnums = ColorEnums;
Icon.SizeEnums = SizeEnums;

export default Icon;
