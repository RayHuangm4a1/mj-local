import React, { Component, } from 'react';
import {
	Dropdown,
	Layout,
	Select,
	Modal,
	Icon,
	Form,
} from 'ljit-react-components';
import { withTheme, } from '../../lib/theme-provider';
import LotteryDrawingInfoCard from '../../features/lottery-drawing-info-card';
import PlainTabs from '../../components/plain-tabs';
import CardInkbarTabs from '../../components/card-inkbar-tabs';
import CardTabs from '../../components/card-tabs';
import TraceBettingModal from '../../components/trace-betting-modal';
import XinYongBettingElementSample from './xin-yong-betting-element-sample';
import DrawingBettingLongTabs from '../../features/drawing-betting-long-tabs';
import MyCollectionPanel from '../../features/my-collection-panel';
import StandardBettingRecordsTab from '../../features/standard-betting-records-tab';
import StandardBettingConfirmModal from '../../components/standard-betting-confirm-modal';
import PlaySelectionGroup from '../../components/play-selection-group';
import DrawingCountDownCard from '../../components/drawing-counting-down-card';
import Wallets from '../../features/wallets';
import LotteryMegaMenu from '../../features/lottery-mega-menu';
import XinYongBettingRecordsTab from '../../features/xin-yong-betting-records-tab';
import LotterySelector from '../../components/lottery-selector';
import XinYongBettingDetailsModal from '../../components/xin-yong-betting-details-modal';
import StandardBettingBlock from '../../components/standard-betting-block';
import RightSidebar from '../../features/right-sidebar';
import MemberCenterSelector from '../../components/member-center-selector';
import PagerTable from '../../components/pager-table';
import CloseButtonModal from '../../components/close-button-modal';
import SelectDropdown from '../../components/select-dropdown';
import TraceRecordDetailModalFeature from '../../features/trace-record-detail-modal';
import BettingLongItem from '../../features/betting-long-item';
import DashboardBlock from '../../components/dashboard-block';
import ClientCascaderSelect from '../../components/client-cascader-select';
import CountdownListItem from '../../components/countdown-list-item';
import LotteryList from '../../components/lottery-list';
import ThirdPartyCard from '../../components/third-party-card';
import DataInlineList from '../../components/data-inline-list';
import LotteryIcon from '../../components/lottery-icon';
import ClientTabLabelSelector from '../../components/client-tab-label-selecter';
import ErrorHandlingSample from './error-handling-sample';
import SelectDropdownInputFormItem from '../../components/select-dropdown-input-form-item';
import {
	generateFakeTraceRecordsData,
	generateFakeBettingRecordsData,
} from '../../lib/betting-utils';
import ClientDateRangePicker from '../../features/client-date-range-picker';
import ClientNotification from '../../components/client-notification';

const { Content, Header, } = Layout;

const classId = 0;
const lotteryId = 12;
const playId = 1;
const fakeStandardBettigns = {
	play: {
		_id: '5678567856785678',
		id: 1,
		name: '直选复式',
		bonus: 19.87,
	},
	name: '直选复式 12,12,12,12,12',
	betcontent: '12,12,12,12,12',
	weizhi: '万,千,百,十,个',
	multiple: 1,
	amountPerBet: 2,
	rebate: 0,
	amount: 64,
};

class Demo extends Component {
	constructor() {
		super();
		this.state = {
			isFavoriteActive: false,
			plainTabKey: '1',
			cardInkbarTabKey1: '1-1',
			cardInkbarTabKey2: '2-1',
			cardTabKey: '1',
			isTraceModalVisible: false,
			isStandardBettingConfirmModal: false,
			isBettingDetailModalVisible: false,
			isModalVisible: false,
			sidebarSelectedId: '',
			isCloseButtonModalVisible: false,
			isTraceDetailModalVisible: false,
			clientDateRangePickerValue1: undefined,
			primaryWallets: [
				{ name: '彩票钱包A', balance: 678.00 ,isUsed: true, },
			],
			thirdPartyWallets: [
				{ name: 'AG钱包', balance: 30.00 },
				{ name: 'UG钱包', balance: 30.00 },
				{ name: 'KY钱包', balance: 30.00 },
				{ name: 'SA钱包', balance: 30.00 },
				{ name: 'VR钱包', balance: 30.00 },
				{ name: '其他钱包', balance: 30.00 },
			],
			supervisionWallets: [
				{ name: '监管钱包', balance: 6780.00, },
			],
			bettings: [
				{
					play: {
						_id: '1234123412341234',
						lottery: '重庆时时彩',
						id: 15,
						name: '五星直選複式',
						bonus: 1.987,
					},
					weizhi: '',
					name: '五星直選複式',
					betcontent: '1,1,1,1,1',
					multiple: 1,
					amountPerBet: 1,
					count: 2,
					amount: 2,
					rebate: 0,
				},
				{
					play: {
						_id: '1234123412341234',
						lottery: '重庆时时彩',
						id: 16,
						name: '五星直選複式',
						bonus: 1.987,
					},
					name: '五星直選複式',
					betcontent: '2,2,2,2,2',
					multiple: 1,
					amountPerBet: 1,
					count: 2,
					amount: 2,
					rebate: 0,
				},
				{
					play: {
						_id: '1234123412341234',
						lottery: '重庆时时彩',
						id: 16,
						name: '五星直選複式',
						bonus: 1.987,
					},
					name: '五星直選複式',
					betcontent: '3,3,3,3,3',
					multiple: 1,
					amountPerBet: 1,
					count: 2,
					amount: 2,
					rebate: 0,
				},
				{
					play: {
						_id: '1234123412341234',
						lottery: '重庆时时彩',
						id: 16,
						name: '五星直選複式',
						bonus: 1.987,
					},
					name: '五星直選複式',
					betcontent: '4,4,4,4,4',
					multiple: 1,
					amountPerBet: 1,
					count: 2,
					amount: 2,
					rebate: 0,
				},
				{
					play: {
						_id: '1234123412341234',
						lottery: '重庆时时彩',
						id: 16,
						name: '五星直選複式',
						bonus: 1.987,
					},
					name: '五星直選複式',
					betcontent: '5,5,5,5,5',
					multiple: 1,
					amountPerBet: 1,
					count: 2,
					amount: 2,
					rebate: 0,
				},
				{
					play: {
						_id: '1234123412341234',
						lottery: '重庆时时彩',
						id: 16,
						name: '五星直選複式',
						bonus: 1.987,
					},
					name: '五星直選複式',
					betcontent: '6,6,6,6,6',
					multiple: 1,
					amountPerBet: 1,
					count: 2,
					amount: 2,
					rebate: 0,
				},
				{
					play: {
						_id: '1234123412341234',
						lottery: '重庆时时彩',
						id: 16,
						name: '五星直選複式',
						bonus: 1.987,
					},
					name: '五星直選複式',
					betcontent: '7,7,7,7,7',
					multiple: 1,
					amountPerBet: 1,
					count: 2,
					amount: 2,
					rebate: 0,
				},
				{
					play: {
						_id: '1234123412341234',
						lottery: '重庆时时彩',
						id: 16,
						name: '五星直選複式',
						bonus: 1.987,
					},
					name: '五星直選複式',
					betcontent: '9,9,9,9,9',
					multiple: 1,
					amountPerBet: 1,
					count: 2,
					amount: 2,
					rebate: 0,
				},
			],
			selectedPlayId: 1110,
			pagination: {},
			selectDropdownValue: null,
			theme: '',
			dashboardActiveKey: 'ChangLong',
		};

		this._handleChangeTheme = this._handleChangeTheme.bind(this);
		this._handleShowSidebarModal = this._handleShowSidebarModal.bind(this);
		this._handleCloseSidebarModal = this._handleCloseSidebarModal.bind(this);
		this._handleShowCloseButtonModal = this._handleShowCloseButtonModal.bind(this);
		this._handleHiddenCloseButtonModal = this._handleHiddenCloseButtonModal.bind(this);
		this._handleShowModal = this._handleShowModal.bind(this);
		this._handleBettingBet = this._handleBettingBet.bind(this);
		this._handleDepositPrimaryWallet = this._handleDepositPrimaryWallet.bind(this);
		this._handleDepositThirdPartyWallet = this._handleDepositThirdPartyWallet.bind(this);
		this._handleWithdrawThirdPartyWallet = this._handleWithdrawThirdPartyWallet.bind(this);
		this._handleWithdrawAllThirdPartyWallet = this._handleWithdrawAllThirdPartyWallet.bind(this);
		this._handleDepositSupervidionWallet = this._handleDepositSupervidionWallet.bind(this);
	}
	_handleChangeTheme(value) {
		this.setState({ themeStyle: value, });
		const { theme, } = this.props;
		const { onSwitchTheme, } = theme;

		onSwitchTheme(value);
	}
	_handleDepositPrimaryWallet() {
		console.log('Deposit Primary Wallet');
	}
	_handleDepositThirdPartyWallet(index) {
		console.log(index, 'payment');
	}
	_handleWithdrawThirdPartyWallet(index) {
		console.log(index, 'Withdraw');
	}
	_handleWithdrawAllThirdPartyWallet() {
		console.log('Withdraw All Third Party Wallet');
	}
	_handleDepositSupervidionWallet() {
		console.log("Deposit Supervidion Wallet");
	}
	_handleShowSidebarModal(selectedId) {
		this.setState({
			isModalVisible: true,
			sidebarSelectedId: selectedId,
		});
	}
	_handleCloseSidebarModal() {
		this.setState({
			isModalVisible: false,
			sidebarSelectedId: '',
		});
	}
	_handleShowCloseButtonModal() {
		this.setState({
			isCloseButtonModalVisible: true,
		});
	}
	_handleHiddenCloseButtonModal() {
		this.setState({
			isCloseButtonModalVisible: false,
		});
	}
	_handleShowModal() {
		this.setState({ isStandardBettingConfirmModal: !this.state.isStandardBettingConfirmModal, });
	}
	_handleBettingBet(bettings) {
		console.log(bettings);
		this.setState({
			bettings
		});
		this._handleShowModal();
	}
	render() {
		const {
			theme
		} = this.props;
		const { style, } = theme;

		return (
			<Layout style={{ minHeight: '100vh', }}>
				<Header>DEMO PAGE</Header>
				<Content style={{ padding: '20px', }}>
					<section style={{ textAlign: 'center' }}>
						<Dropdown
							dropdownContent={
								<Wallets
									primaryWallets={this.state.primaryWallets}
									thirdPartyWallets={this.state.thirdPartyWallets}
									supervisionWallets={this.state.supervisionWallets}
									onClickPrimaryWallet={this._handleDepositPrimaryWallet}
									onDepositThirdPartyWallet={this._handleDepositThirdPartyWallet}
									onWithdrawThirdPartyWallet={this._handleWithdrawThirdPartyWallet}
									onWithdrawAllThirdPartyWallet={this._handleWithdrawAllThirdPartyWallet}
									onClickSupervisionWallet={this._handleDepositSupervidionWallet}
								/>
							}
							placement={Dropdown.PlacementEnums.BOTTOM_CENTER}
							isShowingArrow
							isKeepMenuOpen
						>
							<a>
							open menu link
							</a>
						</Dropdown>
					</section>
					<section>
						<h2>change theme</h2>
						<Select
							style={{ width: 150, }}
							value={this.state.themeStyle}
							options={[
								{ label: 'orange', value: 'orange', },
								{ label: 'blue', value: 'blue', },
							]}
							onChange={(value) => this._handleChangeTheme(value)}
						/>
					</section>
					<section className={`${style.themeXinYong}`}>
						<XinYongBettingElementSample/>
						<h2>LotteryCard</h2>
						<LotteryDrawingInfoCard lotteryId="1"/>
					</section>
					<section>
						<h2>PlainTabs</h2>
						<PlainTabs
							className={`${style.themePlainTabs}`}
							activeKey={this.state.plainTabKey}
							onChange={tabKey => this.setState({ plainTabKey: tabKey, })}
						>
							<PlainTabs.TabPane
								key="1"
								tab="Plain Tab Title 1"
							>
								Plain Tab 1
							</PlainTabs.TabPane>
							<PlainTabs.TabPane
								key="2"
								tab="Plain Tab Title 2"
							>
								Plain Tab 2
							</PlainTabs.TabPane>
						</PlainTabs>
					</section>
					<section>
						<h2>CardTabs and CardInkbarTabs</h2>
						<div style={{ width: 300 }}>
							<CardTabs
								activeKey={this.state.cardTabKey}
								onChange={tabKey => this.setState({ cardTabKey: tabKey, })}
							>
								<CardTabs.TabPane
									key="1"
									tab="Card Tab Title 1"
								>
									<CardInkbarTabs
										activeKey={this.state.cardInkbarTabKey1}
										onChange={tabKey => this.setState({ cardInkbarTabKey1: tabKey, })}
									>
										<CardInkbarTabs.TabPane
											key="1-1"
											tab="号码"
										>
											Card Inkbar Tab 1-1
										</CardInkbarTabs.TabPane>
										<CardInkbarTabs.TabPane
											key="1-2"
											tab="单双"
										>
											Card Inkbar Tab 1-2
										</CardInkbarTabs.TabPane>
									</CardInkbarTabs>
								</CardTabs.TabPane>
								<CardTabs.TabPane
									key="2"
									tab="Card Tab Title 2"
								>
									<CardInkbarTabs
										activeKey={this.state.cardInkbarTabKey2}
										onChange={tabKey => this.setState({ cardInkbarTabKey2: tabKey, })}
									>
										<CardInkbarTabs.TabPane
											key="2-1"
											tab="大小"
										>
											Card Inkbar Tab 2-1
										</CardInkbarTabs.TabPane>
										<CardInkbarTabs.TabPane
											key="2-2"
											tab="龙虎"
										>
											Card Inkbar Tab 2-2
										</CardInkbarTabs.TabPane>
									</CardInkbarTabs>
								</CardTabs.TabPane>
							</CardTabs>
						</div>
					</section>
					<section>
						<h2>Draw and BettingLong Tab</h2>
						<DrawingBettingLongTabs
							className="demo"
						/>
					</section>
					<section>
						<h2>LotteryMegaMenu</h2>
						<LotteryMegaMenu
							lotteryClasses={[
								{ id: '1', name: '時時彩', },
								{ id: '2', name: '11选5', },
								{ id: '3', name: '快三', },
								{ id: '4', name: '快乐十分', },
								{ id: '5', name: '快乐八', },
								{ id: '6', name: 'PK10', },
								{ id: '7', name: 'PC蛋蛋', },
								{ id: '8', name: '聯銷彩', },
							]}
							lotteries={{
								'1': [
									{ id: '1', name: '新疆时时彩', },
									{ id: '2', name: '天津時時彩', },
									{ id: '3', name: '騰訊分分彩', },
									{ id: '4', name: '分分時時彩', },
									{ id: '5', name: '三分時時彩', },
									{ id: '6', name: '五分時時彩', },
								],
								'2': [
									{ id: '1', name: '广东11选5', },
									{ id: '2', name: '广西11选5', },
								],
								'3': [
									{ id: '1', name: '江苏快三', },
									{ id: '2', name: '湖北快三', },
								],
								'4': [
									{ id: '1', name: '广东快樂十分', },
									{ id: '2', name: '广西快樂十分', },
								],
								'5': [
									{ id: '1', name: '北京快乐八', },
									{ id: '2', name: '马尔他快乐八', },
								],
								'6': [
									{ id: '1', name: '北京PK10', },
									{ id: '2', name: '幸运飞艇', },
								],
								'7': [
									{ id: '1', name: 'PC蛋蛋', },
									{ id: '2', name: '三分PC蛋蛋', },
								],
								'8': [
									{ id: '070', name: '香港六合彩', },
									{ id: '071', name: '排列三、五', },
								]
							}}
						>
							<span style={{ fontSize: '30px', width: '200px' }}>彩票大廳</span>
						</LotteryMegaMenu>
					</section>
					<section>
						<h2>我的收藏</h2>
						<MyCollectionPanel onClickLottery={(item) => console.log('got '+ item.name)}/>
					</section>
					<section>
						<h2>確認下注詳情</h2>
						<button onClick={this._handleShowModal}>open Confirm Bet Form</button>
						<StandardBettingConfirmModal
							isModalVisible={this.state.isStandardBettingConfirmModal}
							onCancel={this._handleShowModal}
							onBetting={this._handleBettingBet}
							bettings={this.state.bettings}
						/>
					</section>
					<section>
						<h2>XinYongBettingRecordsTab</h2>
						<XinYongBettingRecordsTab
							onClickBettingRecordCard={() => console.log('click BettingRecordCard')}
							onClickViewAllRecords={() => console.log('view all records')}
						/>
					</section>
					<section>
						<DrawingCountDownCard title="距離下期"/>
						<DrawingCountDownCard title="距離下期" type={DrawingCountDownCard.TypeEnums.LOADING}/>
						<DrawingCountDownCard title="距離下期" type={DrawingCountDownCard.TypeEnums.DEFAULT}/>
					</section>
					<section style={{ display: 'flex', justifyContent: 'space-around' }}>
						<DrawingCountDownCard
							title="第 111111111111 距離封盤"
							type={DrawingCountDownCard.TypeEnums.UNDER_MAINTENANCE}
						/>
						<DrawingCountDownCard
							title="第 222222222222 距離封盤" type={DrawingCountDownCard.TypeEnums.LOADING}/>
						<DrawingCountDownCard
							title="第 333333333333 距離封盤"
							type={DrawingCountDownCard.TypeEnums.DEFAULT}
							color={DrawingCountDownCard.ColorEnums.ORANGE}
						/>
						<DrawingCountDownCard
							title="第 444444444444 距離封盤"
							type={DrawingCountDownCard.TypeEnums.DEFAULT}
							timeOutText="00:00:00"
						/>
						<DrawingCountDownCard
							title="第 555555555555 距離封盤"
							type={DrawingCountDownCard.TypeEnums.DEFAULT}
							color={DrawingCountDownCard.ColorEnums.ORANGE}
							offset={10 * 1000}
							onFinish={ () => { console.log('DONE'); }}
						/>
						<DrawingCountDownCard
							title="第 666666666666 距離封盤"
							type={DrawingCountDownCard.TypeEnums.DEFAULT}
							closedAt={new Date(2019,7,20,0,0,0)}
							onFinish={ () => { console.log('DONE'); }}
						/>
					</section>
					<section style={{ display: 'flex', justifyContent: 'space-around' }}>
						<DrawingCountDownCard
							title="距離下期"
							orientation={DrawingCountDownCard.OrientationEnums.HORIZONTAL}
							type={DrawingCountDownCard.TypeEnums.LOADING}
							color={DrawingCountDownCard.ColorEnums.ORANGE}
						/>
						<DrawingCountDownCard
							title="距離下期"
							orientation={DrawingCountDownCard.OrientationEnums.HORIZONTAL}
							type={DrawingCountDownCard.TypeEnums.UNDER_MAINTENANCE}
							color={DrawingCountDownCard.ColorEnums.ORANGE}
						/>
						<DrawingCountDownCard
							title="第 777777777777 距離封盤"
							orientation={DrawingCountDownCard.OrientationEnums.HORIZONTAL}
							type={DrawingCountDownCard.TypeEnums.DEFAULT}
							color={DrawingCountDownCard.ColorEnums.ORANGE}
							offset={10 * 1000}
							onFinish={ () => { console.log('DONE'); }}
						/>
						<DrawingCountDownCard
							title="第 888888888888 距離封盤"
							orientation={DrawingCountDownCard.OrientationEnums.HORIZONTAL}
							type={DrawingCountDownCard.TypeEnums.DEFAULT}
							color={DrawingCountDownCard.ColorEnums.ORANGE}
							closedAt={new Date('2019-08-06T11:24:00.000Z')}
							onFinish={ () => { console.log('DONE'); }}
						/>
					</section>
					<section>
						<h2>追号计划</h2>
						<button onClick={() => this.setState({ isTraceModalVisible: true, })}>show modal</button>
						<TraceBettingModal
							bettingsData={this.state.bettings}
							isModalVisible={this.state.isTraceModalVisible}
							onClickSubmit={() => this.setState({ isTraceModalVisible: false, })}
							onClickCancel={() => this.setState({ isTraceModalVisible: false, })}
						/>
					</section>
					<section>
						<h2>号码篮投注记录Tab</h2>
						<StandardBettingRecordsTab/>
					</section>
					<section>
						<h2>XinYongBettingDetailsModal</h2>
						<button onClick={() => this.setState({ isBettingDetailModalVisible: true, })}>click</button>
						<XinYongBettingDetailsModal
							isModalVisible={this.state.isBettingDetailModalVisible}
							onCancel={() => this.setState({ isBettingDetailModalVisible: false, })}
							onBetting={() => this.setState({ isBettingDetailModalVisible: false, })}
							balance={2000}
							defaultBatchAmount={100}
							bettings={[
								{
									play: {
										_id: '1234123412341234',
										id: 15,
										name: '1',
										odds: 1.987,
									},
									name: '第一球 1',
									betcontent: '1',
									weizhi: '',
									multiple: 1,
									amountPerBet: 1,
									rebate: 0,
									amount: 50,
								},
								{
									play: {
										_id: '1234123412341234',
										id: 16,
										name: '小',
										odds: 1.987,
									},
									name: '第一球 小',
									betcontent: '小',
									weizhi: '',
									multiple: 1,
									amountPerBet: 1,
									rebate: 0,
									amount: 50,
								},
								{
									play: {
										_id: '1234123412341234',
										id: 16,
										name: '单',
										odds: 1.987,
									},
									name: '第一球 单',
									betcontent: '单',
									weizhi: '',
									multiple: 1,
									amountPerBet: 1,
									rebate: 0,
									amount: 50,
								},
								{
									play: {
										_id: '1234123412341234',
										id: 16,
										name: '5',
										odds: 1.987,
									},
									name: '第三球 5',
									betcontent: '5',
									weizhi: '',
									multiple: 1,
									amountPerBet: 1,
									rebate: 0,
									amount: 50,
								},
							]}
						/>
					</section>
					<section>
						<h2>新增收藏</h2>
						<LotterySelector />
					</section>
					<section>
						<h2>PlaySelectionGroup</h2>
						<PlaySelectionGroup
							subconditions={[
								{
									id: 1100,
									name: '五星直选',
									plays: [
										{ id: 1110, name: '直选复式', },
										{ id: 1120, name: '直选单式', },
										{ id: 1130, name: '直选組合', },
									]
								},
								{
									id: 1200,
									name: '五星組选',
									plays: [
										{ id: 1210, name: '组选120', },
										{ id: 1220, name: '组选60', },
										{ id: 1230, name: '组选30', },
										{ id: 1240, name: '组选10', },
										{ id: 1250, name: '组选5', },
									]
								},
							]}
							selectedPlayId={this.state.selectedPlayId}
							onClickPlay={(play) => this.setState({ selectedPlayId: play.id })}
						/>
					</section>
					<section>
						<h2>一般投注資訊區塊</h2>
						<StandardBettingBlock
							bettingData={fakeStandardBettigns}
							classId={classId}
							lotteryId={lotteryId}
							playId={playId}
							onClickAllIn={() => console.log('梭哈')}
							onClickAddBasket={(betting) => console.log('加入号码篮', betting)}
							onClickBetting={() => console.log('立即下注')}
							style={{ width: '900px', }}
						/>
					</section>
					<section>
						<h2 style={{ position: 'fixed', right: '0px', bottom: 'calc(50% + 243.5px)', zIndex: 1000 }}>Right Sidebar</h2>
						<RightSidebar
							onClickItem={this._handleShowSidebarModal}
						/>
						<Modal
							visible={this.state.isModalVisible}
							title="Right Sidebar Modal Title"
							modalSize={Modal.ModalSizeEnum.LARGE}
							onClickCancel={this._handleCloseSidebarModal}
							onClickOk={this._handleCloseSidebarModal}
						>
							modal content
						</Modal>
					</section>
					<section>
						<h2 style={{ margin: '15px 0px' }}>Member Center Selector</h2>
						<MemberCenterSelector
							selectedId={this.state.sidebarSelectedId}
							onClickItem={this._handleShowSidebarModal}
							isVertical
						/>
						<Modal
							visible={this.state.isModalVisible}
							title="Member Center Selector Modal Title"
							modalSize={Modal.ModalSizeEnum.LARGE}
							onClickCancel={this._handleCloseSidebarModal}
							onClickOk={this._handleCloseSidebarModal}
						>
							modal content
						</Modal>
						<h2>列表</h2>
						<PagerTable
							rowKey="id"
							dataSource={[
								{
									id: 0,
									name: 'name 1',
									title: 'title 1',
								},
								{
									id: 1,
									name: 'name 2',
									title: 'title 2',
								},
								{
									id: 2,
									name: 'name 3',
									title: 'title 3',
								},
							]}
							columns={[
								{
									dataIndex: 'name',
									title: 'Name',
								},
								{
									dataIndex: 'title',
									title: 'Title',
								},
							]}
							hasPagination
							paginationProps={{
								...this.state.pagination,
								total: 200,
							}}
							onTableChange={(pagination) => this.setState({ pagination, })}
						/>
					</section>
					<section>
						<h2>Client Cascader Select</h2>
						<ClientCascaderSelect
							value={this.state.CascaderSelectValue}
							options={[
								{
									label: '彩票报表',
									value: 'report0',
									children: [
										{
											label: '彩票报表1',
											value: 'lottery-report1',
										},
										{
											label: '彩票报表2',
											value: 'lottery-report2',
										},
									]
								},
								{
									label: '娱乐报表',
									value: 'report1',
									children: [
										{
											label: '娱乐报表1',
											value: 'happy-report1',
										},
										{
											label: '娱乐报表2',
											value: 'happy-report2',
										},
										{
											label: '娱乐报表3',
											value: 'happy-report3',
										},
										{
											label: '娱乐报表4',
											value: 'happy-report4',
										},
									]
								},
							]}
							style={{ width: 110, }}
							onChange={(value) => this.setState({ CascaderSelectValue: value, })}
						/>
					</section>
					<section>
						<h2>Close Button Modal</h2>
						<button onClick={this._handleShowCloseButtonModal}>Open Close Button Modal</button>
						<CloseButtonModal
							isVisible={this.state.isCloseButtonModalVisible}
							onClickCloseButton={this._handleHiddenCloseButtonModal}
						>
							<img
								style={{ height: '600px' }}
								src='https://i0.wp.com/ljit.io/wp-content/uploads/2018/11/ljit_46.gif?zoom=2&resize=1140%2C551&ssl=1'
							/>
						</CloseButtonModal>
					</section>
					<section>
						<h2>Select Dropdown</h2>
						<SelectDropdown
							key={'select-0'}
							style={{ width: 150, }}
							options={[
								{ label: '彩票报表', value: 'report0', },
								{ label: '娱乐报表', value: 'report1', },
							]}
							value={this.state.selectDropdownValue}
							onChange={(value) => this.setState({ selectDropdownValue: value, })}
						/>
					</section>
					<section>
						<h2>TraceRecordDetailModalFeature</h2>
						<button onClick={() => this.setState({ isTraceDetailModalVisible: true, })}>click</button>
						<TraceRecordDetailModalFeature
							traceRecordId={generateFakeTraceRecordsData(1)[0].id}
							isModalVisible={this.state.isTraceDetailModalVisible}
							onClose={() => this.setState({ isTraceDetailModalVisible: false, })}
						/>
					</section>
					<section>
						<h2>Dashboard Block</h2>
						<DashboardBlock
							items={[
								{
									id: 'game',
									name: '外接遊戲',
									content: (<div>外接遊戲 feature</div>)
								}
							]}
							outline={DashboardBlock.OutlineEnum.STRING}
							size="large"
						/>
						<h2>Label Selector Dashboard Block</h2>
						<DashboardBlock
							icon={(<Icon type="member" size={Icon.SizeEnums.LARGE}/>)}
							selectedItemId={this.state.dashboardActiveKey}
							items={[
								{
									id: 'ChangLong',
									name: '長龍投注',
									content: (<div>長龍投注 feature</div>)
								},
								{
									id: 'Favorite',
									name: '我的最愛',
									content: (<div>我的最愛 feature</div>)
								}
							]}
							headerOutline={DashboardBlock.OutlineEnum.LABEL_SELECTOR}
							onClickItem={(key) => this.setState({ dashboardActiveKey: key, })}
						/>
					</section>
					<section style={{ width: '912px', backgroundColor: 'white', padding: '0px 22px 5px 16px', marginTop: '10px' }}>
						<h2>Betting long item</h2>
						<BettingLongItem
							lotteryId={12}
							playId={playId}
							playCondition="第五球"
							play="尾大"
							onUpdateCombination={(value) => console.log(value)}
						/>
					</section>
					<section>
						<h2>Countdown List Item</h2>
						<div style={{ background: '#fff' }}>
							<CountdownListItem
								prefix={(
									<Icon
										type="selected-dragon-ball"
										size="xx-large"
										style={{ marginRight: '10px', }}
									/>)
								}
								name="武汉分分彩"
								endTime={new Date(1650001114409)}
								onFinish={() => console.log('武汉分分彩 finish')}
							/>
						</div>
						<div style={{ background: '#fff' }}>
							<CountdownListItem
								name="重庆时时彩"
								endTime={new Date(1650001114409)}
								onFinish={() => console.log('武汉分分彩 finish')}
							/>
						</div>
					</section>
					<section>
						<h2>Lottery Tab List</h2>
						<LotteryList
							lotteries={[
								{ id: 16, name: "东京1.5分彩", code: 'dj1.5fc', },
								{ id: 12, name: "重庆时时彩", code: 'ccsss', },
								{ id: 0, name: "安徽快三", code: 'ahq3' },
							]}
							lotteryDrawings={{
								1: { current: { closedAt: new Date((new Date()).getTime() + 10000) } },
								2: { current: { closedAt: new Date(1610001114409) } },
								3: { current: { closedAt: new Date(1640001114409) } }
							}}
							onClickItem={(lottery) => console.log(lottery.name)}
							onFinish={(lottery) => console.log(lottery.name)}
						/>
					</section>
					<section>
						<h2>Third Party Card</h2>
						<h3>Third Party Redirect Card</h3>
						<ThirdPartyCard.Standard
							icon={<Icon type={Icon.IconTypeEnums.REAL_PERSON}/>}
							title={"真人"}
							slogin={"美女视讯・身临其境！"}
							thirdParties={['WM', 'CQ9','AG','JDB','PP','CQ9','AG','JDB','PP']}
							onClickThirdPartyButton={(value) => {console.log(value);}}
							onClickMore={() => {console.log('more');}}
						/>
						<span style={{ marginRight: 18 }}></span>
						<ThirdPartyCard.Standard
							icon={<Icon type={Icon.IconTypeEnums.SPORT}/>}
							title={"電子"}
							slogin={"夢幻遊戲・一觸即發！"}
							thirdParties={['WM', 'PP']}
							onClickThirdPartyButton={(value) => {console.log(value);}}
							onClickMore={() => {console.log('more');}}
						/>
						<h3>Third Party Lobby Card</h3>
						<ThirdPartyCard.Image
							imageSrc={'https://www.w3schools.com/howto/img_snow.jpg'}
							icon={<Icon type={Icon.IconTypeEnums.CROWN_COLOR} size={Icon.SizeEnums.LARGE}/>}
							title="真人"
							thirdParties={['WM', 'CQ9','AG','JDB','PP','CQ9','AG','JDB','PP']}
							onClickThirdPartyButton={(value) => {console.log(value);}}
						/>
						<h3>Third Party Game Card</h3>
						<ThirdPartyCard.Single
							imageSrc={'aaa'}
							tag={'JDB'}
							title={'財神捕魚'}
						/>
						<span style={{ marginRight: 18 }}></span>
						<ThirdPartyCard.Single
							imageSrc={'https://oc1.ocstatic.com/images/logo_small.png'}
							tag={'JDB'}
							title={'五龍補魚'}
							isFavorite
							onClickFavorite={() => {console.log("favorite"); }}
							onClick={() => {console.log("game"); }}
						/>
					</section>
					<section>
						<h2>DataInlineList</h2>
						<div style={{ maxWidth: 300 }}>
							<DataInlineList
								data={[
									{ id: 1, name: "武汉分分彩", },
									{ id: 2, name: "重庆时时彩", },
									{ id: 3, name: "安徽快三", },
								]}
								renderItem={(data) => (`id: ${data.id} name: ${data.name}`)}
							/>
						</div>
					</section>
					<section>
						<h2>Lottery Icon</h2>
						<LotteryIcon
							lotteryCode='twkl8'
						/>
						<LotteryIcon
							lotteryCode='default icon'
						/>
					</section>
					<section>
						<ClientTabLabelSelector
							items={[
								{
									id: 0,
									name: '信用',
								},
								{
									id: 1,
									name: '官方',
								},
								{
									id: 2,
									name: '縮水',
								},
							]}
							selectedId={this.state.LabelSelectorSelectedId}
							onClickItem={(item) => this.setState({ LabelSelectorSelectedId: item.id, })}
						/>
					</section>
					<section >
						<h2>Select Dropdown FormItem</h2>
						<Form
							submitButtonDisabled
							cancelButtonDisabled
						>
							<SelectDropdownInputFormItem
								options={[
									{ label: '方案号', value: 'bettingProgram', },
									{ label: '期号', value: 'bettingIssue', },
								]}
							/>
						</Form>
					</section>
					<section>
						<ClientDateRangePicker
							showTime={true}
							value={this.state.clientDateRangePickerValue1}
							onChange={(dates) => {
								this.setState({
									clientDateRangePickerValue1: dates,
								});
							}}
							inputStyle={{ width: '360px', }}
							ranges={[
								ClientDateRangePicker.RangesEnums.TODAY,
								ClientDateRangePicker.RangesEnums.YESTERDAY,
								ClientDateRangePicker.RangesEnums.THIS_WEEK,
								ClientDateRangePicker.RangesEnums.LAST_SEVEN_DAYS,
								ClientDateRangePicker.RangesEnums.LAST_THIRTY_DAYS,
								ClientDateRangePicker.RangesEnums.PRESENT_PERIOD,
								ClientDateRangePicker.RangesEnums.PREVIOUS_PERIOD,
							]}
						/>
					</section>
					<section>
						<h2>Error Handling</h2>
						<ErrorHandlingSample/>
					</section>
					<section>
						<h2>Client Notification</h2>
						<button
							onClick={() => ClientNotification.info({
								title: '恭喜你中獎 ! ',
								description: `中獎期號：第20190620032期，中獎號碼：[1,3,5,7,9]`,
								iconType: Icon.IconTypeEnums.PAYCIRCLE_FILL
							})}
						>open notification</button>
					</section>
				</Content>
			</Layout>
		);
	}
}

export default withTheme(Demo);
