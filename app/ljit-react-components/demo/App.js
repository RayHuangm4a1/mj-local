import React, { Component, } from 'react';
import {
	Layout,
	Checkbox,
	Icon as AntdIcon,
} from 'antd';
import {
	StatusTag,
	ClosableTag,
	HeaderBanner,
	Select,
	Radio,
	RadioGroup,
	Modal,
	FormItem,
	Input,
	InputSearch,
	InputNumber,
	InputTextarea,
	UploadImageButton,
	Switch,
	SliderBar,
	Menu,
	CheckBox,
	CheckBoxGroup,
	Notify,
	Charts,
	CollapsableForm,
	HeaderButtonBar,
	RemindText,
	Breadcrumb,
	Icon,
	IconSelector,
	UserAvatar,
	Form,
	LabelContent,
	Button,
	DatePicker,
	DateRangePicker,
	Statistic,
	Card,
	Divider,
	InputGroup,
	Col,
	Row,
	Timeline,
	TimePicker,
	Tabs,
	SidebarTabs,
	EllipsisText,
	UploadInputButton,
	TableEllipsisText,
	Affix,
	List,
	HorizontalTabs,
	Drawer,
	Datetime,
	DecimalNumber,
	XinYongBettingCheckout,
	ChipButton,
	Countdown,
	Tag,
	ClickableTag,
	Badge,
	ExpandablePanel,
	CodeBall,
	Dropdown,
	Toggle,
	LabelText,
	InfoCard,
	BettingRecordCard,
	TraceRecordCard,
	XinYongSelectedBettingCard,
	StandardSelectedBettingCard,
	BettingWeizhiBlock,
	LabelSelector,
	ListItem,
	WalletsInfoCard,
	BankCard,
	IconButton,
	Tooltip,
	CascaderSelect,
	Dice,
	CheckSelector,
	Panel,
	ScrollSelector,
	Popover,
	ScrollContainer,
	Notification,
} from 'ljit-react-components';
import ComponentBlock from './components/ComponentBlock';
import FormWithInputDynamicTable from './components/form-with-input-dynamic-table';
import DraggableTableForm from './components/draggable-table-form';
import BadgeExampleCube from './components/badge-example-cube';
import XinYongBettingElementSample from './components/xin-yong-betting-element-sample';
import XinYongBettingCardSample from './components/xin-yong-betting-card-sample';
import XinYongPlaySlotSample from './components/xin-yong-play-slot-sample';
import StandardBettingElementSample from './components/standard-betting-element-sample';
import MyCollection from './components/my-collection';
import StandardBettingRowSample from './components/standard-betting-row-sample';
import CodeBallButtonSample from './components/code-ball-button-sample';
import IconSample from './components/icon-sample';
import TableSample from './components/table-sample';
import StepsSample from './components/steps-sample';
import TreeSample from './components/tree-sample';
import DrawingInfoCardSample from './components/drawing-info-card-sample';
import DividendInputRangeTableSample from './components/dividend-input-range-table-sample';
import CollapseSample from './components/collapse-sample';

const { ControlledTooltip, } = Tooltip;

const Ball = CodeBall;
const { Content, Header, } = Layout;
const { Item, } = ComponentBlock;

const inputStyle = {
	width: '264px',
	height: '32px',
};

const {
	CHECK_CIRCEL,
	MENU_FOLD,
	INFO_FILL,
	CUSTOMER_SERVICE,
	CUSTOMER_SERVICE_2,
	ORANGE_CUSTOMER_SERVICE_2,
	WITHDRAW_CIRCLE,
	ORANGE_WITHDRAW_CIRCLE,
	TRANSFER_CIRCLE,
	ORANGE_TRANSFER_CIRCLE,
} = Icon.IconTypeEnums;

const {
	UP_SIDE,
} = IconSelector.IconPlacementEnums;

const tabData = [
	{
		key: 'key1',
		path: '/first',
		tab: 'tab1',
	},{
		key: 'key2',
		path: '/second',
		tab: 'tab2',
	},
];

const weizhiOptions = [
	{
		name: '萬',
		isSelected: true,
	},
	{
		name: '千',
		isSelected: false,
	},
	{
		name: '百',
		isSelected: false,
	},
	{
		name: '十',
		isSelected: false,
	},
	{
		name: '個',
		isSelected: false,
	},
];

const cascaderOptions = [{
	value: 'ALL',
	label: 'ALL',
},
{
	value: 'A',
	label: 'A',
	children: [
		{
			value: 'A-A-A',
			label: 'A-A-A',
		},
		{
			value: 'A-A-B',
			label: 'A-A-B',
		},
		{
			value: 'A-A-C',
			label: 'A-A-C',
		},
		{
			value: 'A-A-D',
			label: 'A-A-D',
		},
		{
			value: 'A-A-E',
			label: 'A-A-E',
		},
		{
			value: 'A-A-F',
			label: 'A-A-F',
		},
		{
			value: 'A-A-G',
			label: 'A-A-G',
		},
		{
			value: 'A-A-H',
			label: 'A-A-H',
		},
		{
			value: 'A-A-I',
			label: 'A-A-I',
		},
	],
},{
	value: 'B',
	label: 'B',
	children: [
		{
			value: 'B-A',
			label: 'B-A',
			children: [
				{
					value: 'B-A-A',
					label: 'B-A-A',
				},
			],
		},
	],
},];
const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';

class APP extends Component {
	constructor() {
		super();
		this.state = {
			formSelectValue: null,
			formSelectValue1: [],
			formRadio0Value: null,
			formRadio1Value: null,
			formRadio2Value: null,
			radio0Value: null,
			radio1Value: null,
			radio2Value: null,
			check0Value: null,
			check00Value: null,
			check1Value: [],
			isModalVisible: false,
			isModal2Visible: false,
			inputValue: '',
			inputValue2: '',
			inputValue3: '',
			inputValue4: '',
			inputValue5: '',
			inputErrorValue: '',
			inputWarningValue: '',
			inputSuccesValue: '',
			inputValidatingValue: '',
			inputNumber0Value: null,
			inputNumber1Value: null,
			inputNumber2Value: null,
			inputNumber3Value: null,
			fileList: [],
			inputSearchValue: '',
			switchChecked: false,
			sliderValue: 0,
			openKeys: [],
			selectedKeys: [],
			openSimpleKeys: [],
			selectedSimpleKeys: [],
			expand: true,
			inputTextareaValue: '',
			normalTabKey1: '1',
			normalTabKey2: '1',
			normalTabKey3: '1',
			normalTabKey4: '1',
			tabKey: 'key1',
			DateRangePickerValue1: null,
			DateRangePickerValue2: null,
			DateRangePickerValue3: null,
			TimePickerValue1: null,
			TimePickerValue2: null,
			ellipsisTextModalVisible: false,
			ellipsisline: 2,
			ellipsisButtonText: 'more',
			ellipsisContentText: 'text',
			listSwitchValue: false,
			HorizontalTabsActiveKey: 'tabOne',
			bettingWeizhiCheckedOptions: weizhiOptions,
			iconSelectorSelectedId: '',
			cascaderSelectOption: ['ALL',],
			cascaderSelectOption2: ['B','B-A','B-A-A',],
			isVisible: false,
			isShowMockList: false,
		};
		this._handleModalVisible = this._handleModalVisible.bind(this);
		this._handleModal2Visible = this._handleModal2Visible.bind(this);

		this._renderFooter = this._renderFooter.bind(this);
		this._renderExpandFields = this._renderExpandFields.bind(this);
		this._renderCollapseFields = this._renderCollapseFields.bind(this);
		this._handleFormSubmitClick = this._handleFormSubmitClick.bind(this);
		this._handleFormCancelClick = this._handleFormCancelClick.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);

		this._handleCollapsableFormCancelClick = this._handleCollapsableFormCancelClick.bind(this);
		this._handleCollapsableFormSubmitClick = this._handleCollapsableFormSubmitClick.bind(this);
		this._handleCollapsableFormChange = this._handleCollapsableFormChange.bind(this);

		this._handleInputTextareaValueChange = this._handleInputTextareaValueChange.bind(this);
		this._renderTimelineItems = this._renderTimelineItems.bind(this);

		this._handleTabChange = this._handleTabChange.bind(this);
		this._renderTabContent = this._renderTabContent.bind(this);

		this._handleEllipsisTextModalVisible = this._handleEllipsisTextModalVisible.bind(this);

		this._handleChangeInputValue4 = this._handleChangeInputValue4.bind(this);
		this._handleChangeInputValue5 = this._handleChangeInputValue5.bind(this);

		this._handleBettingWeizhiChange = this._handleBettingWeizhiChange.bind(this);
		this._handleFilterOption = this._handleFilterOption.bind(this);

		this._handleVisibleChange = this._handleVisibleChange.bind(this);
	}

	_handleModalVisible() {
		this.setState({ isModalVisible: !this.state.isModalVisible, });
	}
	_handleModal2Visible() {
		this.setState({ isModal2Visible: !this.state.isModal2Visible, });
	}
	_renderFooter() {
		return ([<Button className="ljit-collapsable-form-search-btn" key={1} type="primary" htmlType="submit" onClick={this._handleSearchClick}>Test</Button>
			, <Button className="ljit-collapsable-form-search-btn" key={2} type="primary" htmlType="submit" onClick={this._handleSearchClick}>Test1</Button>, ]);
	}
	_renderExpandFields() {
		return ([<FormItem label="帐号1" key={1}  itemName="account" columnType={FormItem.ColumnTypeEnums.SMALL}>
			<Input
				placeholder="请输入帐号"
				style={inputStyle}
			/>
		</FormItem>,
		<FormItem label="申请日期" key={2}  itemName="applydate" columnType={FormItem.ColumnTypeEnums.SMALL}>
			<DatePicker
				placeholder="请输入申请日期"
				style={inputStyle}
				isShowingTime={false} format="YYYY/MM/DD"
			/>
		</FormItem>,
		<FormItem label="确认日期" key={3}  itemName="confirmdate" columnType={FormItem.ColumnTypeEnums.SMALL}>
			<DatePicker
				placeholder="请输入确认日期"
				style={inputStyle}
				isShowingTime format="YYYY/MM/DD"
			/>
		</FormItem>,
		<FormItem label="金额" key={4}  itemName="amount" columnType={FormItem.ColumnTypeEnums.SMALL}>
			<InputNumber
				placeholder="请输入金额"
				style={inputStyle}
			/>
		</FormItem>,
		<FormItem label="状态" key={5}  itemName="status" columnType={FormItem.ColumnTypeEnums.SMALL}>
			<Checkbox.Group style={{ width: '200%', }} >
				<Row>
					<Col span={8}><Checkbox value="unconfirm">待确认</Checkbox></Col>
					<Col span={8}><Checkbox value="payFinished">已出款</Checkbox></Col>
					<Col span={8}><Checkbox value="cancel">取消</Checkbox></Col>
					<Col span={8}><Checkbox value="fail">出款失败</Checkbox></Col>
					<Col span={8}><Checkbox value="process">银行处理中</Checkbox></Col>
				</Row>
			</Checkbox.Group>
		</FormItem>, ]
		);
	}
	_renderCollapseFields() {
		return ([
			<FormItem label="帐号1" key={1}  itemName="account" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<Input
					placeholder="请输入帐号"
					style={inputStyle}
				/>
			</FormItem>,
			<FormItem label="申请日期" key={2}  itemName="appldate" columnType={FormItem.ColumnTypeEnums.SMALL}>
				<DatePicker
					placeholder="请输入申请日期"
					style={inputStyle}
					isShowingTime format="YYYY/MM/DD"
				/>
			</FormItem>,
		]
		);
	}
	_handleCollapsableFormSubmitClick(event) {
		const form = this.collapsableFormInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {
			console.log(values);

		});
	}
	_handleCollapsableFormCancelClick() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
	}
	_handleCollapsableFormChange(allValues) {
		const form = this.collapsableFormInstance.getForm();

		form.validateFields((err, values) => {
			console.log(allValues);

		});
	}
	_handleFormSubmitClick(event) {
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((err, values) => {
			console.log(values);

		});
	}
	_handleFormCancelClick() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}
	_handleFormChange(allValues) {
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			console.log(allValues);
		});
	}
	_handleInputTextareaValueChange(e) {
		this.setState({
			inputTextareaValue: e.target.value,
		});
	}

	_handleTabChange(tabKey) {
		this.setState({
			tabKey: tabKey,
		});
	}

	_handleChangeInputValue4(value) {
		this.setState({
			inputValue4: value,
		});
	}
	_handleChangeInputValue5(value) {
		this.setState({
			inputValue5: value,
		});
	}
	_renderTabContent() {
		const content = tabData.map((item, index) => {
			return (<div key={item.key}>Tab content{index}</div>);
		});

		return content;
	}
	_renderTimelineItems() {
		const TimelineDatas = [
			{
				timeLineTitle: '申請時間：',
				timeLineContent: [
					'2019/02/20 12:03:22 待确认',
				],
			},
			{
				timeLineTitle: '操作详请：',
				timeLineContent: [
					'2019/02/20 12:03:22 第三方自動出款 (aaa123123)',
					'2019/02/20 12:03:22 已鎖定',
					'2019/02/20 12:03:22 第三方自動出款 (aaa123123)',
					'2019/02/20 12:03:22 已鎖定',
					'2019/02/20 12:03:22 第三方自動出款 (aaa123123)',
					'2019/02/20 12:03:22 已鎖定',
					'2019/02/20 12:03:22 第三方自動出款 (aaa123123)',
				],
			},
			{
				timeLineTitle: '代付結果：',
				timeLineContent: [
					'2019/02/20 12:03:22 第三方自動出款成功',
				],
			},
		];

		const timeLineItesms = TimelineDatas.map((data, i) => {
			const { timeLineTitle, timeLineContent, } = data;

			const timeLineContentDivs = timeLineContent.map((content, i) => {
				return (
					<div key={i} style={{ paddingBottom: '16px', }}>{content}</div>
				);
			});

			return (
				<Timeline.Item key={i}>
					<Row type='flex'>
						<Col>
							{timeLineTitle}
						</Col>
						<Col style={{ marginLeft : '5px', }}>
							{timeLineContentDivs}
						</Col>
					</Row>
				</Timeline.Item>
			);
		});

		return timeLineItesms;
	}
	_handleEllipsisTextModalVisible() {
		const { ellipsisTextModalVisible, } = this.state;

		this.setState({
			ellipsisTextModalVisible: !ellipsisTextModalVisible,
		});
	}
	_renderDropdownMenu() {
		return (
			<div style={{ width: '200px', }}>
				<Menu>
					<Menu.Item key="1">1</Menu.Item>
					<Menu.Item key="2">2</Menu.Item>
				</Menu>
			</div>
		);
	}

	_handleBettingWeizhiChange(index) {
		const updatedData = this.state.bettingWeizhiCheckedOptions.map((option, optionIndex) => {
			if (index === optionIndex) {
				return Object.assign({}, option, {
					isSelected: !option.isSelected,
				});
			} else {
				return Object.assign({}, option);
			}
		});

		this.setState({ bettingWeizhiCheckedOptions: updatedData, });
	}

	_handleFilterOption(value, option) {

		return option.props.children.indexOf(value) !== -1;
	}

	_handleVisibleChange(visible) {
		const container = this.containerRef;
		const { clientWidth, scrollWidth, } = container;

		if (clientWidth < scrollWidth) {
			this.setState({ isVisible: visible, });
		} else {
			this.setState({ isVisible: false, });
		}
	}

	render() {
		const DemoBox = props => <p style={{ height : props.value, }}>{props.children}</p>;

		return (
			<Layout style={{ minHeight: '100vh', }}>
				<Header style={{ color: '#FFF', }}>DEMO PAGE</Header>
				<Content style={{ padding: '20px', }}>
					<StandardBettingElementSample />
					<XinYongBettingElementSample />
					<StandardBettingRowSample />
					<ComponentBlock title="Charts">
						<Item>
							<Charts.Line
								data={{
									labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',],
									datasets: [
										{
											label: 'My First dataset',
											data: [65, 59, 80, 81, 56, 55, 40,],
										},
										{
											label: 'My First dataset 2',
											data: [65, 59, 40, 90, 56, 100, 40,],
										},
										{
											label: 'chart 3',
											data: [30, 59, 40, 90, 56, 80, 55,],
										},
									],
								}}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Tag">
						<Item>
							<Tag text="default"/>
							<Tag
								color={Tag.ColorEnums.GREEN}
								shape={Tag.ShapeEnums.RECTANGLE}
								size={Tag.SizeEnum.SMALL}
								borderRadius={Tag.BorderRadiusEnum.WITH_16}
								text="上線"
							/>
							<Tag
								shape={Tag.ShapeEnums.RECTANGLE}
								size={Tag.SizeEnum.SMALL}
								borderRadius={Tag.BorderRadiusEnum.WITH_16}
								text="停售"
							/>
							<Tag
								color={Tag.ColorEnums.WARMORANGE900}
								shape={Tag.ShapeEnums.RECTANGLE}
								size={Tag.SizeEnum.LARGE}
								borderRadius={Tag.BorderRadiusEnum.WITH_16}
								text="系統維護中"
							/>
							<Tag
								color={Tag.ColorEnums.WARMORANGE500}
								shape={Tag.ShapeEnums.RECTANGLE}
								size={Tag.SizeEnum.LARGE}
								fontSize={Tag.FontSizeEnum.SMALL}
								borderRadius={Tag.BorderRadiusEnum.WITH_16}
								text="系統維護中"
								isWithOutline
							/>
							<Tag
								color={Tag.ColorEnums.LIGHTGREY}
								shape={Tag.ShapeEnums.RECTANGLE}
								size={Tag.SizeEnum.SMALL}
								fontSize={Tag.FontSizeEnum.SMALL}
								borderRadius={Tag.BorderRadiusEnum.WITH_4}
								text="总和大"
							/>
							<Tag
								shape={Tag.ShapeEnums.CIRCLE}
								text="大"
								size={Tag.SizeEnum.SMALL}
							/>
							<Tag
								color={Tag.ColorEnums.WARMORANGE700}
								shape={Tag.ShapeEnums.CIRCLE}
								text="小"
								size={Tag.SizeEnum.SMALL}
							/>
							<Tag
								color={Tag.ColorEnums.LIGHTGREY}
								shape={Tag.ShapeEnums.CIRCLE}
								text="单"
								size={Tag.SizeEnum.SMALL}
							/>
							<Tag
								color={Tag.ColorEnums.LIGHTGREY}
								shape={Tag.ShapeEnums.CIRCLE}
								text="双"
								size="small"
							/>
							<Tag
								color={Tag.ColorEnums.WHITE}
								shape={Tag.ShapeEnums.ROUND}
								text="全"
								size={Tag.SizeEnum.MIDDLE}
								fontSize={Tag.FontSizeEnum.MIDDLE}
							/>
							<Tag
								color={Tag.ColorEnums.BLACK}
								shape={Tag.ShapeEnums.RECTANGLE}
								size={Tag.SizeEnum.LARGE}
								borderRadius={Tag.BorderRadiusEnum.WITH_12}
								text="二分時時彩"
							/>
							<Tag
								color={Tag.ColorEnums.WHITE}
								shape={Tag.ShapeEnums.RECTANGLE}
								size={Tag.SizeEnum.LARGE}
								borderRadius={Tag.BorderRadiusEnum.WITH_12}
								text="二分時時彩"
							/>
							<Tag
								color={Tag.ColorEnums.WHITE}
								shape={Tag.ShapeEnums.RECTANGLE}
								size={Tag.SizeEnum.LARGE}
								borderRadius={Tag.BorderRadiusEnum.WITH_12}
								text="客製"
								textColor="yellow"
								backgroundColor="blue"
							/>
							<Tag
								color={Tag.ColorEnums.GRADIENT_ORANGE}
								shape={Tag.ShapeEnums.ROUND}
								text={9}
								size={Tag.SizeEnum.MIDDLE}
								fontSize={Tag.FontSizeEnum.MIDDLE}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Clickable Tag">
						<Item>
							<ClickableTag
								text="二分時時彩"
								onClick={(e) => console.log(e)}
							/>
							<ClickableTag
								text="二分時時彩"
								color={ClickableTag.ColorEnums.WHITE}
								onClick={(e) => console.log(e)}
								style={{ marginLeft: '15px', }}
							/>
							<ClickableTag
								text="客製"
								color={ClickableTag.ColorEnums.WHITE}
								onClick={(e) => console.log(e)}
								style={{ marginLeft: '15px', }}
								textColor="yellow"
								backgroundColor="blue"
							/>
						</Item>
						<Item>
							<h4>with badge</h4>
							<ClickableTag
								onClick={(e) => console.log(e)}
								text="新疆時時彩"
								hasBadge={true}
								badgeIcon={<Icon type={INFO_FILL} style={{ fill: 'red', stroke: '#fff', }} />}
							/>
							<ClickableTag
								onClick={(e) => console.log(e)}
								text="新疆時時彩"
								color={ClickableTag.ColorEnums.WHITE}
								hasBadge={true}
								badgeIcon={<Icon type={INFO_FILL} style={{ fill: 'red', stroke: '#fff', }} />}
								badgeAlignment={ClickableTag.BadgeAlignmentEnums.RIGHT}
								style={{ marginLeft: '15px', }}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Status Tag">
						<Item>
							<StatusTag status={StatusTag.StatusEnums.SUCCESS} text="上線" style={{ width: '76px', }} />
							<StatusTag status={StatusTag.StatusEnums.ERROR} text="停售" style={{ width: '76px', }} />
							<StatusTag status={StatusTag.StatusEnums.WARNING} text="系統維護中" style={{ width: '110px', }} />
							<StatusTag tagType={StatusTag.TagTypeEnums.HOLLOW} status={StatusTag.StatusEnums.SUCCESS} text="在線" style={{ width: '76px', }} />
							<StatusTag tagType={StatusTag.TagTypeEnums.HOLLOW} status={StatusTag.StatusEnums.LOSE} text="離線" style={{ width: '76px', }} />
						</Item>
						<Item>
							<StatusTag status={StatusTag.StatusEnums.BET_UNOPENED} text="未開獎" />
							<StatusTag status={StatusTag.StatusEnums.BET_WIN} text="中獎" />
							<StatusTag status={StatusTag.StatusEnums.BET_LOSE} text="未中獎" />
							<StatusTag status={StatusTag.StatusEnums.BET_CANCELED} text="已撤单" />
							<StatusTag status={StatusTag.StatusEnums.BET_OPENING} text="开奖中" />
							<StatusTag status={StatusTag.StatusEnums.BET_LOSE} text="客製" textColor="yellow" backgroundColor="blue" />
						</Item>
						<Item>
							<StatusTag status={StatusTag.StatusEnums.DRAW_OPENING} text="开盘中" />
							<StatusTag status={StatusTag.StatusEnums.DRAW_NEW} text="開獎中" />
							<StatusTag status={StatusTag.StatusEnums.DRAW_REWARDING} text="頒獎中" />
							<StatusTag status={StatusTag.StatusEnums.DRAW_REWARDED} text="已頒獎" />
							<StatusTag status={StatusTag.StatusEnums.DRAW_CANCELED} text="已撤單" />
							<StatusTag status={StatusTag.StatusEnums.DRAW_MODIFIED} text="已修改獎號" />
							<StatusTag status={StatusTag.StatusEnums.DRAW_STOPPED} text="停止下注" />
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Status Tag Outline">
						<Item>
							<StatusTag tagType="outline" status="success" text="上線" style={{ width: '76px', }} />
						</Item>
						<Item>
							<StatusTag tagType="outline" status="warning" text="系統維護中" style={{ width: '110px', }} />
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Closable Tag">
						<Item>
							<ClosableTag onClose={(event) => console.log(event)} text="tag" />
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Header Banner">
						<Item>
							<HeaderBanner
								breadcrumb={<Breadcrumb />}
							/>
							<HeaderBanner.HeaderBannerItem
								title="賠率限制設置"
								description="賠率限制設置描述"
							/>
							<Breadcrumb.BreadcrumbItem to="www.google.com">
								home
							</Breadcrumb.BreadcrumbItem>
							<Breadcrumb.BreadcrumbItem to="www.google.com/aaa">
								subpage
							</Breadcrumb.BreadcrumbItem>
						</Item>
					</ComponentBlock>
					<TableSample />
					<ComponentBlock title="Draggable Table">
						<Item>
							<DraggableTableForm
								initialValues={{
									username: '',
									orders: [
										{
											title: 'title 1',
											order: 1,
											_id: '0',
										},
										{
											title: 'title 2',
											order: 2,
											_id: '1',
										},
									],
								}}
								onSubmit={data => console.log('DraggableTableForm', data)}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Select">
						<Item>
							<Select
								style={{ width: 150, }}
								value={this.state.formSelectValue}
								options={[
									{ label: 'option0', value: 'option0', },
									{ label: 'option1', value: 'option1', },
								]}
								onChange={(value) => {
									this.setState({ formSelectValue: value, });
								}}
							/>
						</Item>
						<Item>
							<Select
								style={{ width: 150, }}
								value={this.state.formSelect1Value}
								options={[
									{ label: 'option0', value: 'option0', },
									{ label: 'option1', value: 'option1', },
								]}
								onChange={(value) => {
									this.setState({ formSelect1Value: value, });
								}}
								mode={Select.ModeEnums.MULTIPLE}
							/>
						</Item>
						<Item>
							<Select
								style={{ width: 150, }}
								value={this.state.formSelect2Value}
								onChange={(value) => {
									this.setState({ formSelect2Value: value, });
								}}
								mode={Select.ModeEnums.TAGS}
							/>
						</Item>
						<Item>
							<Select
								style={{ width: 150, }}
								value={this.state.formSelect3Value}
								options={[
									{ label: 'option0', value: 0, },
									{ label: 'option1', value: 1, },
									{ label: 'answer0', value: 2, },
									{ label: 'answer1', value: 3, },
								]}
								onChange={(value) => {
									this.setState({ formSelect3Value: value, });
								}}
								isShowSearch={true}
								filterOption={this._handleFilterOption}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Radio">
						<Item>
							<Radio
								radioType={Radio.RadioTypeEnums.RADIO}
								checked={this.state.radio0Value}
								onChange={event => this.setState({ radio0Value: event.target.checked, })}
							>
								radio 1
							</Radio>
						</Item>
						<Item>
							<Radio
								radioType={Radio.RadioTypeEnums.BUTTON}
								checked={this.state.radio1Value}
								onChange={event => this.setState({ radio1Value: event.target.checked, })}
							>
								radio button 1
							</Radio>
						</Item>
						<Item>
							<Radio
								radioType={Radio.RadioTypeEnums.CHECK}
								checked={this.state.radio2Value}
								onChange={event => this.setState({ radio2Value: event.target.checked, })}
							>
								radio check 1
							</Radio>
						</Item>
						<Item>
							<Radio
								radioType={Radio.RadioTypeEnums.RADIO_S}
								checked={this.state.radio3Value}
								onChange={event => this.setState({ radio3Value: event.target.checked, })}
							>
								radio small 1
							</Radio>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Radio Group">
						<Item>
							<RadioGroup
								value={this.state.formRadio0Value}
								options={[
									{ label: 'radio0', value: 'radio0', },
									{ label: 'radio1', value: 'radio1', },
								]}
								onChange={(event) => {
									this.setState({ formRadio0Value: event.target.value, });
								}}
							/>
						</Item>
						<Item>
							<RadioGroup
								radioType={RadioGroup.RadioTypeEnums.BUTTON}
								value={this.state.formRadio1Value}
								options={[
									{ label: 'radio0', value: 'radio0', },
									{ label: 'radio1', value: 'radio1', },
									{ label: 'radio2', value: 'radio2', disabled: true, },
								]}
								onChange={(event) => {
									this.setState({ formRadio1Value: event.target.value, });
								}}
							/>
						</Item>
						<Item>
							<RadioGroup
								radioType={RadioGroup.RadioTypeEnums.BUTTON}
								buttonStyle={RadioGroup.ButtonStyleEnums.OUTLINE}
								value={this.state.formRadio2Value}
								options={[
									{ label: 'radio0', value: 'radio0', },
									{ label: 'radio1', value: 'radio1', },
								]}
								onChange={(event) => {
									this.setState({ formRadio2Value: event.target.value, });
								}}
							/>
						</Item>
						<Item>
							<RadioGroup
								radioType={RadioGroup.RadioTypeEnums.CHECK}
								value={this.state.formRadio3Value}
								options={[
									{ label: 'radio0', value: 'radio0', },
									{ label: 'radio1', value: 'radio1', },
									{ label: 'radio2', value: 'radio2', disabled: true, },
								]}
								onChange={(event) => {
									this.setState({ formRadio3Value: event.target.value, });
								}}
							/>
						</Item>
						<Item>
							<RadioGroup
								radioType={RadioGroup.RadioTypeEnums.RADIO_S}
								value={this.state.formRadio4Value}
								options={[
									{ label: 'radio0', value: 'radio0', },
									{ label: 'radio1', value: 'radio1', },
									{ label: 'radio2', value: 'radio2', disabled: true, },
								]}
								onChange={(event) => {
									this.setState({ formRadio4Value: event.target.value, });
								}}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Check Box">
						<Item>
							<CheckBox
								value={this.state.check0Value}
								onChange={event => this.setState({ check0Value: event.target.checked, })}
							>
								check box  1
							</CheckBox>
						</Item>
						<Item>
							<CheckBox
								type={CheckBox.TypeEnums.CIRCLE}
								value={this.state.check00Value}
								onChange={event => this.setState({ check00Value: event.target.checked, })}
							>
								check box  2
							</CheckBox>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Check Box Group">
						<Item>
							<CheckBoxGroup
								value={this.state.check1Value}
								options={[
									{ label: 'checkbox0', value: 'checkbox0', },
									{ label: 'checkbox1', value: 'checkbox1', },
									{ label: 'checkbox2', value: 'checkbox2', },
									{ label: 'checkbox3', value: 'checkbox3', disabled: true, },
								]}
								onChange={checkedlist => {
									this.setState({ check1Value: checkedlist, });
								}}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Modal">
						<Item>
							<Button type="primary" onClick={this._handleModalVisible}>open modal</Button>
							<Modal
								visible={this.state.isModalVisible}
								title="modal title"
								modalSize={Modal.ModalSizeEnum.LARGE}
								onClickCancel={this._handleModalVisible}
								onClickOk={this._handleModalVisible}
							>
								modal content
							</Modal>
						</Item>
						<Item>
							<Button type="primary" onClick={this._handleModal2Visible}>open modal(with width)</Button>
							<Modal
								visible={this.state.isModal2Visible}
								title="modal title"
								onClickCancel={this._handleModal2Visible}
								onClickOk={this._handleModal2Visible}
								width="300px"
							>
								modal content
							</Modal>
						</Item>
						<Item>
							<Modal.Message
								visible={this.state.isMessageModalVisible}
								message="量一年、著問義火、是麼器定？"
								onClickCancel={() => this.setState({ isMessageModalVisible: false, })}
								onClickOk={() => this.setState({ isMessageModalVisible: false, })}
							/>
							<Button
								type="primary"
								onClick={() => this.setState({ isMessageModalVisible: true, })}
							>
								open message modal
							</Button>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Form Item">
						<Item>
							<LabelContent label="static" columnType={LabelContent.ColumnTypeEnums.LARGE} noMargin>
								modal content
							</LabelContent>
						</Item>
						<Item>
							<LabelContent label="input" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<Input
									value={this.state.inputValue}
									placeholder="text value"
									onChange={event => this.setState({ inputValue: event.target.value, })}
								/>
							</LabelContent>
						</Item>
						<Item>
							<LabelContent label="input with prefix" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<Input
									style={{ width: '110px', }}
									value={this.state.inputValue2}
									placeholder="text value"
									onChange={event => this.setState({ inputValue2: event.target.value, })}
									prefix="#"
								/>
							</LabelContent>
						</Item>
						<Item>
							<LabelContent label="input with suffix" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<Input
									style={{ width: '110px', }}
									value={this.state.inputValue3}
									placeholder="text value"
									onChange={event => this.setState({ inputValue3: event.target.value, })}
									suffix="%"
								/>
							</LabelContent>
						</Item>
						<Item>
							<LabelContent label="input number" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<InputNumber
									max={100}
									min={1}
									step={0.1}
									placeholder="0.0"
									value={this.state.inputNumber0Value}
									onChange={value => this.setState({ inputNumber0Value: value, })}
								/>
							</LabelContent>
						</Item>
						<Item>
							<LabelContent label="input number percentage" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<InputNumber
									max={100}
									min={1}
									step={0.1}
									placeholder="percentage"
									formatType={InputNumber.FormatTypeEnums.PERCENTAGE}
									value={this.state.inputNumber1Value}
									onChange={value => this.setState({ inputNumber1Value: value, })}
								/>
							</LabelContent>
						</Item>
						<Item>
							<LabelContent label="input number currency" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<InputNumber
									max={100000}
									min={1}
									placeholder="currency"
									formatType={InputNumber.FormatTypeEnums.CURRENCY}
									value={this.state.inputNumber2Value}
									onChange={value => this.setState({ inputNumber2Value: value, })}
								/>
							</LabelContent>
						</Item>
						<Item>
							<LabelContent label="input number yuan" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<InputNumber
									max={100000}
									min={1}
									placeholder="yuan"
									formatType={InputNumber.FormatTypeEnums.YUAN}
									value={this.state.inputNumber3Value}
									onChange={value => this.setState({ inputNumber3Value: value, })}
								/>
							</LabelContent>
						</Item>
						<Item style={{ height: 30, }}>
							<LabelContent label="input search" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<InputSearch
									value={this.state.inputSearchValue}
									onChange={event => this.setState({ inputSearchValue: event.target.value, })}
									onSearch={value => console.log(value)}
									onPressEnter={event => console.log(event.target.value)}
								/>
							</LabelContent>
						</Item>
						<Item style={{ height: 30, }}>
							<LabelContent
								label="ERROR"
								columnType={LabelContent.ColumnTypeEnums.LARGE}
								validateStatus={LabelContent.ValidateStatusEnums.ERROR}
								helpMessage="Should be combination of numbers & alphabets"
								hasFeedback
							>
								<Input
									style={{ width: '200px', }}
									placeholder="ERROR"
									value={this.state.inputErrorValue}
									onChange={event => this.setState({ inputErrorValue: event.target.value, })}
								/>
							</LabelContent>
						</Item>
						<Item style={{ height: 30, }}>
							<LabelContent
								label="WARNING"
								columnType={LabelContent.ColumnTypeEnums.LARGE}
								validateStatus={LabelContent.ValidateStatusEnums.WARNING}
								hasFeedback
							>
								<Input
									style={{ width: '200px', }}
									placeholder="WARNING"
									value={this.state.inputWarningValue}
									onChange={event => this.setState({ inputWarningValue: event.target.value, })}
								/>
							</LabelContent>
						</Item>
						<Item style={{ height: 30, }}>
							<LabelContent
								label="SUCCESS"
								columnType={LabelContent.ColumnTypeEnums.LARGE}
								validateStatus={LabelContent.ValidateStatusEnums.SUCCESS}
								hasFeedback
							>
								<Input
									style={{ width: '200px', }}
									placeholder="SUCCESS"
									value={this.state.inputSuccessValue}
									onChange={event => this.setState({ inputSuccessValue: event.target.value, })}
								/>
							</LabelContent>
						</Item>
						<Item style={{ height: 30, }}>
							<LabelContent
								label="VALIDATING"
								columnType={LabelContent.ColumnTypeEnums.LARGE}
								validateStatus={LabelContent.ValidateStatusEnums.VALIDATING}
								helpMessage="The information is being validated..."
								hasFeedback
							>
								<Input
									style={{ width: '200px', }}
									placeholder="VALIDATING..."
									value={this.state.inputValidatingValue}
									onChange={event => this.setState({ inputValidatingValue: event.target.value, })}
								/>
							</LabelContent>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Upload Image Button">
						<Item>
							<UploadImageButton
								fileList={this.state.fileList}
								onChange={fileList => this.setState({ fileList, })}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Switch">
						<Item>
							<Switch
								checked={this.state.switchChecked}
								onChange={checked => this.setState({ switchChecked: checked, })}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Slider Bar">
						<Item style={{ maxWidth: 450, }}>
							<SliderBar
								value={this.state.sliderValue}
								step={0.01}
								onChange={value => this.setState({ sliderValue: value, })}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Menu">
						<Item style={{ padding: 20, backgroundColor: '#FFF', }}>
							<Menu
								themeType={Menu.ThemeTypeEnums.DARK}
								openKeys={this.state.openKeys}
								selectedKeys={this.state.selectedKeys}
								onSubMenuOpenChange={(openKeys) => this.setState({ openKeys, })}
								onMenuItemSelect={({ selectedKeys, }) => this.setState({ selectedKeys, })}
							>
								<Menu.Item key="1">1</Menu.Item>
								<Menu.SubMenu title="2" key="2">
									<Menu.Item key="2-1">2-1</Menu.Item>
									<Menu.Item key="2-2">2-2</Menu.Item>
									<Menu.SubMenu key="2-3" title="2-3">
										<Menu.Item key="2-3-1">2-3-1</Menu.Item>
										<Menu.SubMenu key="2-3-2" title="2-3-2">
											<Menu.Item key="2-3-2-1">2-3-2-1</Menu.Item>
											<Menu.Item key="2-3-2-2">2-3-2-2</Menu.Item>
										</Menu.SubMenu>
									</Menu.SubMenu>
								</Menu.SubMenu>
								<Menu.SubMenu
									key="3"
									title={
										<React.Fragment>
											<Icon type={CHECK_CIRCEL} />
											<span>3</span>
										</React.Fragment>
									}
								>
									<Menu.ItemGroup key="3-1"  title="3-2">
										<Menu.Item key="3-1-1">3-1-1</Menu.Item>
									</Menu.ItemGroup>
									<Menu.ItemGroup key="3-2" title="3-2">
										<Menu.Item key="3-2-1">3-2-1</Menu.Item>
										<Menu.Item key="3-2-2">3-2-1</Menu.Item>
									</Menu.ItemGroup>
								</Menu.SubMenu>
							</Menu>
						</Item>
						<Item style={{ padding: 20, backgroundColor: '#FFF', }}>
							<Menu
								openKeys={this.state.openSimpleKeys}
								selectedKeys={this.state.selectedSimpleKeys}
								onSubMenuOpenChange={(openKeys) => this.setState({ openSimpleKeys: openKeys, })}
								onMenuItemSelect={({ selectedKeys, }) => this.setState({ selectedSimpleKeys: selectedKeys, })}
							>
								<Menu.Item key="1">1</Menu.Item>
								<Menu.Item key="2">2</Menu.Item>
								<Menu.SubMenu
									key="3"
									title="3"
								>
									<Menu.Item key="3-1">3-1</Menu.Item>
								</Menu.SubMenu>
								<Menu.SubMenu
									key="4"
									title="4"
								>
									<Menu.ItemGroup key="4-1"  title="4-1">
										<Menu.Item key="4-1-1">4-1-1</Menu.Item>
									</Menu.ItemGroup>
									<Menu.ItemGroup key="4-2" title="4-2">
										<Menu.Item key="4-2-1">4-2-1</Menu.Item>
										<Menu.Item key="4-2-2">4-2-1</Menu.Item>
									</Menu.ItemGroup>
								</Menu.SubMenu>
							</Menu>
						</Item>
						<Item>
							<Menu
								modeType={Menu.ModeTypeEnums.HORIZONTAL}
								openKeys={this.state.openHorizontalKeys}
								selectedKeys={this.state.selectedHorizontalKeys}
								onSubMenuOpenChange={(openHorizontalKeys) => this.setState({ openHorizontalKeys, })}
								onMenuItemSelect={({ selectedHorizontalKeys, }) => this.setState({ selectedHorizontalKeys, })}
							>
								<Menu.Item key="1">1</Menu.Item>
								<Menu.SubMenu title="2" key="2">
									<Menu.Item key="2-1">2-1</Menu.Item>
									<Menu.Item key="2-2">2-2</Menu.Item>
									<Menu.SubMenu key="2-3" title="2-3">
										<Menu.Item key="2-3-1">2-3-1</Menu.Item>
										<Menu.SubMenu key="2-3-2" title="2-3-2">
											<Menu.Item key="2-3-2-1">2-3-2-1</Menu.Item>
											<Menu.Item key="2-3-2-2">2-3-2-2</Menu.Item>
										</Menu.SubMenu>
									</Menu.SubMenu>
								</Menu.SubMenu>
								<Menu.SubMenu
									key="3"
									title={
										<React.Fragment>
											<Icon type={CHECK_CIRCEL} />
											<span>3</span>
										</React.Fragment>
									}
								>
									<Menu.Item key="3-1">3-1</Menu.Item>
								</Menu.SubMenu>
							</Menu>
						</Item>
						<Item>
							<div style={{ width: 200, }}>
								<Menu
									modeType={Menu.ModeTypeEnums.VERTICAL}
									openKeys={this.state.openVerticalKeys}
									selectedKeys={this.state.selectedVerticalKeys}
									onSubMenuOpenChange={(openVerticalKeys) => this.setState({ openVerticalKeys, })}
									onMenuItemSelect={({ selectedVerticalKeys, }) => this.setState({ selectedVerticalKeys, })}
								>
									<Menu.Item key="1">1</Menu.Item>
									<Menu.SubMenu title="2" key="2">
										<Menu.Item key="2-1">2-1</Menu.Item>
										<Menu.Item key="2-2">2-2</Menu.Item>
										<Menu.SubMenu key="2-3" title="2-3">
											<Menu.Item key="2-3-1">2-3-1</Menu.Item>
											<Menu.SubMenu key="2-3-2" title="2-3-2">
												<Menu.Item key="2-3-2-1">2-3-2-1</Menu.Item>
												<Menu.Item key="2-3-2-2">2-3-2-2</Menu.Item>
											</Menu.SubMenu>
										</Menu.SubMenu>
									</Menu.SubMenu>
									<Menu.SubMenu
										key="3"
										title={
											<React.Fragment>
												<Icon type={CHECK_CIRCEL} />
												<span>3</span>
											</React.Fragment>
										}
									>
										<Menu.Item key="3-1">3-1</Menu.Item>
									</Menu.SubMenu>
								</Menu>
							</div>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Notify">
						<Item>
							<Button
								type="primary"
								onClick={() => {
									Notify.success('success!', 0);
								}}
							>
								success
							</Button>
						</Item>
						<Item>
							<Button
								type="danger"
								onClick={() => {
									Notify.error('error!', 1500);
								}}
							>
								error
							</Button>
						</Item>
						<Item>
							<Button
								type="primary"
								onClick={() => {
									Notify.info('info!', 0);
								}}
							>
								info
							</Button>
						</Item>
					</ComponentBlock>
					<IconSample />
					<ComponentBlock title="Icon Selector">
						<IconSelector
							isVertical
							iconPlacement={UP_SIDE}
							selectedId={this.state.iconSelectorSelectedId}
							onClickItem={(selectedId) => {
								this.setState({ iconSelectorSelectedId: selectedId, });
							}}
							items={[
								{ id: 'icon-selector-id-1', iconType: CUSTOMER_SERVICE, name: '客服', },
								{ id: 'icon-selector-id-2', iconType: CUSTOMER_SERVICE_2, selectedIconType: ORANGE_CUSTOMER_SERVICE_2, name: '客服_2', },
								{ id: 'icon-selector-id-3', iconType: WITHDRAW_CIRCLE, selectedIconType: ORANGE_WITHDRAW_CIRCLE, name: '提现', },
								{ id: 'icon-selector-id-4', iconType: TRANSFER_CIRCLE, selectedIconType: ORANGE_TRANSFER_CIRCLE, name: '转帐', },
							]}
						/>
					</ComponentBlock>
					<ComponentBlock title="Statistic With Card">
						<Item>
							<Row type="flex" flexLayout="space-between" gutter={10}>
								<Col span={6} >
									<Card>
										<Statistic className="pay-company-card-group" title="总笔数" value={10000} prefix={'%%'} suffix={'/10'} style={{ align : 'center', }}/>
									</Card>
								</Col >
								<Col span={6} >
									<Card>
										<Statistic className="pay-company-card-group" title="总金额" value={10000} prefix={'$$'} suffix={'/10'}/>
									</Card>
								</Col>
								<Col span={6} >
									<Card>
										<Statistic className="pay-company-card-group" title="总手续费" value={10000} prefix={'$$'} suffix={'/10'}/>
									</Card>
								</Col>
								<Col span={6} >
									<Card>
										<Statistic className="pay-company-card-group" title="总银行手续费" value={10000} suffix={'/10'}/>
									</Card>
								</Col>
							</Row>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Statistic">
						<Item>
							<Row type="flex" flexLayout="space-between" gutter={10}>
								<Col span={6} >
									<Statistic
										className="demo-statistic"
										title="总笔数"
										value={10000}
										prefix={'%%'}
										suffix={'/10'}
										style={{ textAlign : 'center', }}
										sizeType={Statistic.SizeTypeEnums.LARGE}
									/>
								</Col >
								<Col span={6} >
									<Statistic
										className="demo-statistic"
										title="总金额"
										value={10000}
										prefix={'$$'}
										suffix={'/10'}
										style={{ align : 'center', }}
										sizeType={Statistic.SizeTypeEnums.LARGE}
									/>
								</Col >
								<Col span={6} >
									<Statistic
										className="demo-statistic"
										title="总手续费"
										value={10000}
										prefix={'$$'}
										suffix={'/10'}
										style={{ align : 'center', }}
										sizeType={Statistic.SizeTypeEnums.LARGE}
									/>
								</Col >
								<Col span={6} >
									<Statistic
										className="demo-statistic"
										title="总银行手续费"
										value={10000}
										suffix={'/10'}
										style={{ align : 'center', }}
										sizeType={Statistic.SizeTypeEnums.LARGE}
									/>
								</Col >
							</Row>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Countdown">
						<Item>
							<Row type="flex" flexLayout="space-between" gutter={10}>
								<Col span={6} >
									<Countdown
										title="距离下期"
										endDate={new Date(Date.parse('2019/07/11 14:40:00:00'))}
										onFinish={() => console.log('time out')}
										size={Countdown.SizeEnums.SMALL}
										color={Countdown.ColorEnums.BLUE}

									/>
								</Col >
								<Col span={6} >
									<Countdown
										title="第 201906200035 期 距離封盤"
										endDate={new Date(Date.parse('2019/07/11 14:40:00:00'))}
										format={Countdown.FormatEnums.HH_MM_SS_SSS}
										size={Countdown.SizeEnums.MEDIUM}
										color={Countdown.ColorEnums.RED}
									/>
								</Col >
								<Col span={6} >
									<Countdown
										title="第 201906201111 期 距離封盤"
										endDate={new Date(Date.parse('2019/07/11 14:40:00:00'))}
										onFinish={() => console.log('time out')}
										prefix={'前綴'}
										suffix={'後綴'}
										format={Countdown.FormatEnums.HH_MM_SS}
										offset={1000 * 60 * 60}
										size={Countdown.SizeEnums.LARGE}
										color={Countdown.ColorEnums.ORANGE}
									/>
								</Col >
							</Row>
						</Item>
					</ComponentBlock>

					<ComponentBlock title="Card">
						<Item>
							<Row>
								<Col span={6} >
									<Card className="demo-card">存款总额累计</Card>
								</Col>
								<Col span={1} />
								<Col span={6} >
									<Card className="demo-card"><h4>## Simple card</h4>Card content</Card>
								</Col>
							</Row>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Collapsable Form">
						<CollapsableForm
							expand={this.state.expand}
							onSubmit={this._handleCollapsableFormSubmitClick}
							onCancel={this._handleCollapsableFormCancelClick}
							onChange={this._handleCollapsableFormChange}
							scancelButtonDisabled={true}
							collapseType={CollapsableForm.CollapseTypeEnum.INSERTROW}
							ref={(refForm) => this.collapsableFormInstance = refForm}
							expandChildren={this._renderExpandFields()}
							collapseChildren={this._renderCollapseFields()}
						>
						</CollapsableForm>
					</ComponentBlock>
					<ComponentBlock title="Header Button Bar">
						<Item>
							<HeaderButtonBar
								left={[
									<div key="header">Header Title</div>,
									(
										<Button key="btn1">
											btn1
										</Button>
									),
								]}
								right={[
									(
										<Button type="primary" key="btn2">
											btn2
										</Button>
									),
									(
										<Button key="btn3">
											btn3
										</Button>
									),
								]}
							/>
						</Item>
						<Item>
							<HeaderButtonBar
								right={[
									(
										<Button type="primary" key="btn1">
											btn1
										</Button>
									),
									(
										<Button key="btn2">
											btn2
										</Button>
									),
									(
										<Select
											key="select"
											style={{ width: 150, }}
											options={[]}
										/>
									),
								]}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Remind Text">
						<Item>
							<RemindText
								text="子人地總極覺軍；學未氣往境想停事界上實政期等"
							/>
						</Item>
						<Item>
							<RemindText
								text="子人地總極覺軍；學未氣往境想停事界上實政期等"
								styleType="error"
							/>
						</Item>
						<Item>
							<RemindText
								text={(
									<div>
										<div>1.建期還黨話足有品英大減開，源的樂他的指</div>
										<div>2.文良年，作費每利充為推。上反黑藥建山此</div>
										<div>3.因路超別味場？報去制十，知調事，現健戲作水給</div>
									</div>
								)}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="User Avatar">
						<div style={{ overflow: 'hidden', }}>
							<UserAvatar
								size={56}
								alignment={UserAvatar.AlignmentEnums.TOP}
								userName={'someone17'}
								style={{ width: '80px', float: 'left', marginRight: '15px', }}
							/>
							<UserAvatar
								size={56}
								style={{ width: '200px', float: 'left', }}
								description={'余额 884.64 元'}
								userName={
									<div style={{ display:'flex', alignItems: 'center', justifyContent: 'space-between', }}>
										<span>someone17</span>
										<Tooltip
											placement="bottom"
											title={'Hello in tooltip'}
											overlayColor={Tooltip.ColorEnums.WHITE}
										>
											<span style={{ margin: '2px 0 0 5px', }}>
												<Icon type={INFO_FILL} style={{ fill: '#5ca9f8', stroke: '#fff', }}/>
											</span>
										</Tooltip>
									</div>
								}
							/>
							<UserAvatar
								style={{ float: 'right', marginLeft: 26, }}
								userName={'用戶'}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="Form (Fields create by getFieldDecorator)">
						<Form
							onSubmit={this._handleFormSubmitClick}
							onCancel={this._handleFormCancelClick}
							onChange={this._handleFormChange}
							ref={(refForm) => this.formInstance = refForm }
						>
							<FormItem label="帐号1" key={1} itemName="account_form" columnType={FormItem.ColumnTypeEnums.SMALL}>
								<Input
									placeholder="请输入帐号"
									style={inputStyle}
								/>
							</FormItem>
							<FormItem
								label="email"
								key={2}
								itemName="email"
								itemConfig={{
									rules: [
										{
											require: true,
											type: 'email',
											message: 'email格式不正確',
										},
									],
								}}
								columnType={FormItem.ColumnTypeEnums.SMALL}
								extraMessage="請輸入email"
							>
								<Input
									style={inputStyle}
								/>
							</FormItem>
							<FormItem label="申请日期" key={3} itemName="applydate_form" columnType={FormItem.ColumnTypeEnums.SMALL}>
								<DatePicker
									placeholder="请输入申请日期"
									style={inputStyle}
									format="YYYY/MM/DD"
								/>
							</FormItem>
							<FormItem label="确认日期" key={4} itemName="confirmdate_form" columnType={FormItem.ColumnTypeEnums.SMALL}>
								<DatePicker
									placeholder="请输入确认日期"
									style={inputStyle}
									isShowingTime format="YYYY/MM/DD"
								/>
							</FormItem>
							<FormItem label="金额" key={5} itemName="amount_form" columnType={FormItem.ColumnTypeEnums.SMALL}>
								<InputNumber
									placeholder="请输入金额"
									style={inputStyle}
								/>
							</FormItem>
							<FormItem label="状态" key={6} itemName="status_form" columnType={FormItem.ColumnTypeEnums.SMALL}>
								<Checkbox.Group>
									<Row>
										<Col span={12}><Checkbox value="unconfirm">待确认</Checkbox></Col>
										<Col span={12}><Checkbox value="payFinished">已出款</Checkbox></Col>
										<Col span={12}><Checkbox value="cancel">取消</Checkbox></Col>
										<Col span={12}><Checkbox value="fail">出款失败</Checkbox></Col>
										<Col span={12}><Checkbox value="process">银行处理中</Checkbox></Col>
									</Row>
								</Checkbox.Group>
							</FormItem>
							<FormItem label="請選擇時間" key={7} itemName="time_form" columnType={FormItem.ColumnTypeEnums.SMALL}>
								<TimePicker
									placeholder="请输入确认時間"
									style={inputStyle}
									isShowingTime format={TimePicker.FormatTypeEnums.HHmmss}
								/>
							</FormItem>
							<FormItem
								label="phone"
								columnType={FormItem.ColumnTypeEnums.SMALL}
								groupItemNames={['phone-prefix', 'phone', 'phone-options',]}
								groupItemConfigs={{
									'phone-options': { initialValue: null, },
								}}
								isInputGroup
							>
								<InputGroup isCompact >
									<InputNumber key={8} placeholder="+886"/>
									<InputNumber key={9} placeholder="2345678" itemName="phone" style={{ width: '364px', }}/>
									<Select
										key={10}
										style={{ width: 150, }}
										options={[
											{ label: 'option0', value: 'option0', },
											{ label: 'option1', value: 'option1', },
										]}
									/>
									<div>123</div>
								</InputGroup>
							</FormItem>
							<FormItem
								label="地址"
								columnType={FormItem.ColumnTypeEnums.SMALL}
								groupItemNames={['postalCode', 'address',]}
								groupItemConfigs={{
									'address': { initialValue: null, },
								}}
								isInputGroup
							>
								<InputGroup isCompact={true}>
									<Input
										key={11}
										itemName="postalCode"
										style={{ width: '10%', }}
										placeholder="郵遞區號" />
									<Input
										key={12}
										itemName="address"
										style={{ width: '30%', }}
										placeholder="地址"
									/>
								</InputGroup>
							</FormItem>
							<FormItem
								labelColon={false}
								label="微信公众号txt档"
								columnType={FormItem.ColumnTypeEnums.SMALL}
								itemName="txtFile"
								itemConfig={{
									initialValue: [],
									valuePropName: 'fileList',
									getValueFromEvent: (event) => {
										if (Array.isArray(event)) {
											return event;
										}

										return event && event.fileList;
									},
								}}
							>
								<UploadInputButton
									showUploadList={false}
									acceptExtentions={['txt',]}
									remindText="允许的副档名：txt"
								/>
							</FormItem>
						</Form>
					</ComponentBlock>
					<ComponentBlock title="Button">
						<Button
							style={{ marginLeft: '10px', }}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.SOLID}
							style={{ marginLeft: '10px', }}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							style={{ marginLeft: '10px', }}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.TEXT}
							style={{ marginLeft: '10px', }}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.DASHED}
							style={{ marginLeft: '10px', }}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.SOLID}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.GRASSGREEN900}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.LIGHTRED500}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.TEXT}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.WARMORANGE700}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.DASHED}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.LIGHTPURPLE500}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.SOLID}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.ORANGE}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.ORANGE}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.SOLID}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.PINKISH}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.PINKISH}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.SOLID}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.GREYISHBROWN}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.GREY30}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.GREY9}
							onClick={() => { console.log('button click');}}>
							Button
						</Button>
						<Button
							outline={Button.OutlineEnums.SOLID}
							style={{ marginLeft: '10px', }}
							color={Button.ColorEnums.ORANGE}
							disabled
							onClick={() => { console.log('button click');}}>
							Button(disabled)
						</Button>
						<Button outline={Button.OutlineEnums.DASHED}
							style={{ marginTop: '10px', }}
							icon={Button.IconEnums.UP}
							isFullWidth>
							新增
						</Button>
						<Button outline={Button.OutlineEnums.DASHED}
							style={{ marginTop: '10px', }}
							color={Button.ColorEnums.SALMONRED500}
							icon={Button.IconEnums.PLUS}
							isFullWidth>
							新增
						</Button>
					</ComponentBlock>
					<ComponentBlock title="InputTextarea">
						<InputTextarea
							value={this.state.inputTextareaValue}
							minRows={2}
							maxRows={6}
							placeholder="with autosize row(mimRow:2, maxRows:6)"
							onChange={this._handleInputTextareaValueChange}
							onPressEnter={() => console.log('press enter')}
							onFocus={() => console.log('Focus')}
							onBlur={() => console.log('Blur')}
						/>
						<InputTextarea
							minRows={4}
							maxRows={4}
							disabled
							placeholder="with fixed rows: 4(maxRow: 4, minRow: 4), disabled"
						/>
					</ComponentBlock>
					<ComponentBlock title="Date Range Picker">
						<Item>
							<div style={{ marginTop: 10, marginBottom: 10, }}>default</div>
							<DateRangePicker
								value={this.state.DateRangePickerValue1}
								onChange={(dates) => {
									this.setState({
										DateRangePickerValue1: dates,
									});
								}}
								ranges={[
									DateRangePicker.RangesEnums.TODAY,
									DateRangePicker.RangesEnums.YESTERDAY,
									DateRangePicker.RangesEnums.THIS_WEEK,
									DateRangePicker.RangesEnums.LAST_SEVEN_DAYS,
									DateRangePicker.RangesEnums.LAST_THIRTY_DAYS,
									DateRangePicker.RangesEnums.PRESENT_PERIOD,
									DateRangePicker.RangesEnums.PREVIOUS_PERIOD,
								]}
								limitDays={7}
								format={'YYYY/MM/DD HH:mm:ss'}
							/>
							<div style={{ marginTop: 10, marginBottom: 10, }}>show time</div>
							<DateRangePicker
								value={this.state.DateRangePickerValue2}
								onChange={(dates) => {
									this.setState({
										DateRangePickerValue2: dates,
									});
								}}
								showTime
								format={'YYYY/MM/DD HH:mm:ss'}
							/>
							<div style={{ marginTop: 10, marginBottom: 10, }}>set hour offset</div>
							<DateRangePicker
								value={this.state.DateRangePickerValue3}
								onChange={(dates) => {
									console.log(dates)
									this.setState({
										DateRangePickerValue3: dates,
									});
								}}
								ranges={[
									DateRangePicker.RangesEnums.TODAY,
									DateRangePicker.RangesEnums.YESTERDAY,
									DateRangePicker.RangesEnums.THIS_WEEK,
									DateRangePicker.RangesEnums.LAST_SEVEN_DAYS,
									DateRangePicker.RangesEnums.LAST_THIRTY_DAYS,
									DateRangePicker.RangesEnums.PRESENT_PERIOD,
									DateRangePicker.RangesEnums.PREVIOUS_PERIOD,
								]}
								showTime
								format={'YYYY/MM/DD HH:mm:ss'}
								hourOffset={3}
								limitDays={7}
								onOverLimitDays={() => {console.log('is over limit days');}}
							/>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Row Col">
						<p>default</p>
						<Row>
							<Col span={18} numberOfMoveToRight={6} style={{ border: 'solid', }}>col-18 moveCellsToRight-6</Col>
							<Col span={6} numberOfMoveToLeft={18} style={{ border: 'solid', }}>col-6 moveCellsToLeft-18</Col>
						</Row>
						<p></p>
						<p>gutter</p>
						<Row gutter={16}>
							<Col className="gutter-row" span={6} >
								<div style={{ border: 'solid', textAlign: 'center', }}>col-6</div>
							</Col>
							<Col className="gutter-row" span={6}>
								<div style={{ border: 'solid', textAlign: 'center', }}>col-6</div>
							</Col>
							<Col className="gutter-row" span={6}>
								<div style={{ border: 'solid', textAlign: 'center', }}>col-6</div>
							</Col>
							<Col className="gutter-row" span={6}>
								<div style={{ border: 'solid', textAlign: 'center', }}>col-6</div>
							</Col>
						</Row>
						<p></p>
						<p>Flex</p>
						<Row type={Row.TypeEnums.FLEX}>
							<Col span={6} order={4} style={{ border: 'solid', }}>1 col-order-4</Col>
							<Col span={6} order={3} style={{ border: 'solid', }}>2 col-order-3</Col>
							<Col span={6} order={2} style={{ border: 'solid', }}>3 col-order-2</Col>
							<Col span={6} order={1} style={{ border: 'solid', }}>4 col-order-1</Col>
						</Row>
						<p></p>
						<p>align left</p>
						<Row type="flex" flexLayout="start">
							<Col span={4} style={{ border: 'solid', }}>col-4</Col>
							<Col span={4} style={{ border: 'solid', }}>col-4</Col>
							<Col span={4} style={{ border: 'solid', }}>col-4</Col>
							<Col span={4} style={{ border: 'solid', }}>col-4</Col>
						</Row>
						<p></p>
						<p>space-between</p>
						<Row type="flex" flexLayout="space-between">
							<Col span={4} style={{ border: 'solid', }}>col-4</Col>
							<Col span={4} style={{ border: 'solid', }}>col-4</Col>
							<Col span={4} style={{ border: 'solid', }}>col-4</Col>
							<Col span={4} style={{ border: 'solid', }}>col-4</Col>
						</Row>
						<p></p>
						<p>Align Top</p>
						<Row type="flex" flexLayout="center" align="top">
							<Col span={4} style={{ border: 'solid', }}><DemoBox value={100}>col-4</DemoBox></Col>
							<Col span={4} style={{ border: 'solid', }}><DemoBox value={50}>col-4</DemoBox></Col>
							<Col span={4} style={{ border: 'solid', }}><DemoBox value={120}>col-4</DemoBox></Col>
							<Col span={4} style={{ border: 'solid', }}><DemoBox value={80}>col-4</DemoBox></Col>
						</Row>
					</ComponentBlock>
					<ComponentBlock title="Divider">
						<Item>
							<h2>[Horizontal]</h2>
							<Divider/>
							<p>子人地總極覺軍；學未氣往境想停事界上實政期等</p>
							<Divider orientation="left">靠左標題</Divider>
							<p>子人地總極覺軍；學未氣往境想停事界上實政期等</p>
							<Divider>置中標題</Divider>
							<p>子人地總極覺軍；學未氣往境想停事界上實政期等</p>
							<Divider orientation="right">靠右標題</Divider>
							<p>子人地總極覺軍；學未氣往境想停事界上實政期等</p>
							<br/>
							Dashed
							<Divider isDashed={true} />
							<p>子人地總極覺軍；學未氣往境想停事界上實政期等</p>
							<br/>
							<h2>[Vertical]</h2>
							Text
							<Divider type="vertical"/>
							<a href="#">Link</a>
							<Divider type="vertical"/>
							<a href="#">Link</a>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Input Group">
						<Item>
							<InputGroup style={{ width: '364px', }}>
								<Row gutter={8}>
									<Col span={5}>
										<Input placeholder="+886" />
									</Col>
									<Col span={8}>
										<Input placeholder="2345678" />
									</Col>
								</Row>
							</InputGroup>
							<br/>
							<h3>InputGroup with compact</h3>
							<h5>[Default]</h5>
							<InputGroup isCompact={true}>
								<Select
									style={{ width: 150, }}
									value={this.state.formSelectValue}
									options={[
										{ label: 'option0', value: 'option0', },
										{ label: 'option1', value: 'option1', },
									]}
									onChange={(value) => {
										this.setState({ formSelectValue: value, });
									}}
								/>
								<Input style={{ width: '50%', }} placeholder="VIP 會員服務" />
							</InputGroup>
							<br/>
							<InputGroup isCompact={true}>
								<Input style={{ width: '10%', }} placeholder="郵遞區號" />
								<Input style={{ width: '30%', }} placeholder="地址" />
							</InputGroup>
							<br/>
							<h5>[Large]</h5>
							<InputGroup isCompact={true} size={InputGroup.InputSizeEnums.LARGE}>
								<Input style={{ width: '10%', }} placeholder="郵遞區號" />
								<Input style={{ width: '30%', }} placeholder="地址" />
							</InputGroup>
							<br/>
							<h5>[Small]</h5>
							<InputGroup isCompact={true} size={InputGroup.InputSizeEnums.SMALL}>
								<Input style={{ width: '10%', }} placeholder="郵遞區號" />
								<Input style={{ width: '30%', }} placeholder="地址" />
							</InputGroup>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Tabs">
						<Item>
							<div>Type: line</div>
							<div style={{ backgroundColor: '#FFF', padding: '20px 30px', }}>
								<Tabs
									tabType="line"
									tabPosition="left"
									activeKey={this.state.normalTabKey1}
									onChange={(_tabKey) => this.setState({ normalTabKey1: _tabKey, })}
								>
									<Tabs.TabPane
										tab="Tab Title 1"
										key="1"
									>
										Tab content1
									</Tabs.TabPane>
									<Tabs.TabPane
										tab="Tab Title 2"
										key="2"
									>
										Tab content2
									</Tabs.TabPane>
								</Tabs>
							</div>
						</Item>
						<Item>
							<div>Type: card</div>
							<div style={{ backgroundColor: '#FFF', padding: '20px 30px', }}>
								<Tabs
									tabType="card"
									tabPosition="left"
									activeKey={this.state.normalTabKey2}
									onChange={(_tabKey) => this.setState({ normalTabKey2: _tabKey, })}
								>
									<Tabs.TabPane
										tab="Tab Title 1"
										key="1"
									>
										Tab content1
									</Tabs.TabPane>
									<Tabs.TabPane
										tab="Tab Title 2"
										key="2"
									>
										Tab content2
									</Tabs.TabPane>
								</Tabs>
							</div>
						</Item>
						<Item>
							<div>Type: card-group</div>
							<div style={{ backgroundColor: '#FFF', padding: '20px 30px', }}>
								<Tabs
									tabType="card-group"
									tabPosition="left"
									activeKey={this.state.normalTabKey3}
									onChange={(_tabKey) => this.setState({ normalTabKey3: _tabKey, })}
								>
									<Tabs.TabPane
										tab="Tab Title 1"
										key="1"
									>
										Tab content1
									</Tabs.TabPane>
									<Tabs.TabPane
										tab="Tab Title 2"
										key="2"
									>
										Tab content2
									</Tabs.TabPane>
								</Tabs>
							</div>
						</Item>
						<Item>
							<div>Type: list</div>
							<div style={{ backgroundColor: '#FFF', padding: '20px 30px', }}>
								<Tabs
									tabType="list"
									tabPosition="left"
									title="会员中心"
									hasTabInkBar={false}
									activeKey={this.state.normalTabKey4}
									onChange={(_tabKey) => this.setState({ normalTabKey4: _tabKey, })}
								>

									<Tabs.TabPane
										tab={(
											<div>
												<Icon type="crown" size="large"/>
												基本资讯
											</div>
										)}
										key="1"
									>

										Tab content1
									</Tabs.TabPane>
									<Tabs.TabPane
										tab={(
											<div>
												<Icon type="crown" size="large"/>
												用戶安全
											</div>
										)}
										key="2"
									>
										Tab content2
									</Tabs.TabPane>
									<Tabs.TabPane
										tab={(
											<div>
												<Icon type="crown" size="large"/>
												银行资料
											</div>
										)}
										key="3"
									>
										Tab content3
									</Tabs.TabPane>
								</Tabs>
							</div>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="SidebarTabs">
						<div style={{ backgroundColor: 'white', }}>
							<SidebarTabs
								tabData={tabData}
								activeKey={this.state.tabKey}
								onChange={this._handleTabChange}
							>
								<div>Tab content1</div>
								<div>Tab content2</div>
							</SidebarTabs>
						</div>
					</ComponentBlock>
					<ComponentBlock title="Timeline">
						<Item>
							<Timeline mode={Timeline.ModeEnums.LEFT}>
								{this._renderTimelineItems()}
							</Timeline>
							<Timeline mode={Timeline.ModeEnums.ALTERNATE}>
								<Timeline.Item nodeElement="第一階段"></Timeline.Item>
								<Timeline.Item nodeColor={Timeline.Item.ColorEnums.LIGHTPURPLE}>创建服务现场 2015-09-01</Timeline.Item>
								<Timeline.Item nodeElement={<AntdIcon type="clock-circle-o"/>}>初步排除网络异常 2015-09-01</Timeline.Item>
								<Timeline.Item nodeElement="第二階段"></Timeline.Item>
								<Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
								<Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
								<Timeline.Item nodeElement="結束"></Timeline.Item>
							</Timeline>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="TimePicker">
						<div>disabledHours, disabledMinutes, Hmmssa format </div>
						<TimePicker
							value={this.state.TimePickerValue1}
							onChange={(time) => {
								this.setState({
									TimePickerValue1: time.toDate(),
								});
							}}
							disabledHours={[1,2,3,]}
							calculateDisabledMinutes={(selectHours) => {
								if (selectHours === 10) {
									return [0 ,1 ,2 ,3 ,4, 5, 6, 7, 8, 9 ,10, ];
								}
							}}
							format={TimePicker.FormatTypeEnums.Hmmssa}
						/>
						<div>have addon, step, placeholder</div>
						<TimePicker
							value={this.state.TimePickerValue2}
							onChange={(time) => {
								this.setState({
									TimePickerValue2: time.toDate(),
								});
							}}
							placeholder={'請選擇時間'}
							hourStep={2}
							minuteStep={10}
							secondStep={20}
							addon={
								<button onClick={() => {
									this.setState({
										TimePickerValue2: new Date,
									});
								}}>
									now
								</button>
							}
						/>
						<div>disabled, WITHOUTSECOND HHmm</div>
						<TimePicker
							value={new Date}
							isDisabled
							format={TimePicker.FormatTypeEnums.HHmm}
						/>
						<div>WITHOUTHOUR mmss</div>
						<TimePicker
							value={new Date}
							inputReadOnly
							format={TimePicker.FormatTypeEnums.mmss}
						/>
					</ComponentBlock>
					<ComponentBlock title="TableEllipsisText">
						<div style={{ display: 'flex', }}>
							<TableEllipsisText
								text={loremText}
								tooltipWidth={300}
								tooltipPosition={'top'}
								positionToRight={-75}
							/>
							<TableEllipsisText
								text={loremText}
								tooltipWidth={400}
								tooltipPosition={'bottom'}
								positionToRight={-100}
							/>
							<TableEllipsisText
								text={loremText}
								tooltipWidth={200}
								tooltipPosition={'left'}
								positionToTop={-57}
							/>
							<TableEllipsisText
								text={loremText}
								tooltipWidth={400}
								tooltipPosition={'right'}
								positionToTop={-57}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="Ellipsis">
						<div style={{ maxHeight: 200, width: 200, }}>
							<EllipsisText
								text={loremText}
								onClickButton={this._handleEllipsisTextModalVisible}
							/>
							<Modal
								visible={this.state.ellipsisTextModalVisible}
								title="ellipsisText"
								modalSize={Modal.ModalSizeEnum.LARGE}
								onClickCancel={this._handleEllipsisTextModalVisible}
								onClickOk={this._handleEllipsisTextModalVisible}
							>
								{loremText}
							</Modal>
						</div>
						<hr/>
						<div style={{ width: 600, }}>
							<EllipsisText
								text={loremText}
								numberOfLines={this.state.ellipsisline}
								ButtonText={this.state.ellipsisButtonText}
								buttonStyle={{ color: 'red', }}
								onClickButton={() => {
									const { ellipsisline, ellipsisButtonText, } = this.state;
									const height = ellipsisline === 100 ? 2 : 100;
									const text = ellipsisButtonText === 'more' ? 'less' : 'more';

									this.setState({
										ellipsisline: height,
										ellipsisButtonText: text,
									});
								}}
							/>

						</div>
						<hr/>
						<div style={{ height: 100, width: 300, }}>
							<EllipsisText
								text={loremText}
								numberOfLines={4}
								isShowingButton={false}
							/>
						</div>
						<hr/>
						<div style={{ height: 100, width: '100%', }}>
							<EllipsisText
								text={this.state.ellipsisContentText}
								numberOfLines={4}
								isShowingButton={false}
							/>
						</div>
						<button onClick={() => {
							const { ellipsisContentText, } = this.state;

							this.setState({
								ellipsisContentText: `${ellipsisContentText} ${loremText}`,
							});
						}}>click to update text</button>
					</ComponentBlock>
					<ComponentBlock title="Affix">
						<Affix positionToBottom={10} style={{ position: 'absolute', width: '200px', }}>
							<Button
								style={{ marginLeft: '10px', }}
							>
								Affix Button
							</Button>
						</Affix>
					</ComponentBlock>
					<ComponentBlock title="List">
						<List
							dataSource={[{
								key: '1',
								title: '當前投注模式',
								remindText: '',
								content: 'A01',
								onRenderOperation: (item) =>
									<Switch
										checked={this.state.listSwitchValue}
										onChange={() => {
											this.setState({
												listSwitchValue: !this.state.listSwitchValue,
											});
										}}
									/>,
							},{
								key: '2',
								title: '登錄密碼',
								remindText: '',
								content: 'tes****55555',
								onRenderOperation: (item) =>
									<div
										style={{ color: '#1890ff', cursor: 'pointer', }}
										onClick={() => console.log(item)}
									>修改</div>,
							},{
								key: '3',
								title: '資金密碼',
								remindText: '无绑定银行卡无法修改资金密码',
								content: 'tes****55555',
							},]}
						/>
					</ComponentBlock>
					<ComponentBlock title="ListItem">
						<div style={{ width: 400, display: 'inline-block', marginRight: 10, }}>
							<ListItem
								title="帐号是否有警示提示"
								content={this.state.isWarning ? '关闭提示' : '开启提示'}
								description="some description here are some description"
								right={<Switch
									checked={this.state.isWarning}
									onChange={() => {
										this.setState({
											isWarning: !this.state.isWarning,
										});
									}}
								/>}
							/>
						</div>
						<div style={{ width: 400, display: 'inline-block', }}>
							<ListItem
								title={(
									<div>
										<Icon type={CHECK_CIRCEL} />
										安全问题
									</div>
								)}
								content="未设定"
								titleHint="this is a hint"
								description="some description here are some description"
								right={<Button>修改</Button>}
							/>
						</div>
						<div>
							<div style={{ width: 300, display: 'inline-block', }}>
								<ListItem
									prefix={(
										<Icon
											type="qr-code"
											size="xx-large"
										/>
									)}
									title="Bla Bla Bla"
									description="some description here"
									right={<Button>修改</Button>}
								/>
							</div>
						</div>
					</ComponentBlock>
					<ComponentBlock title="Horizontal tabs">
						<HorizontalTabs
							activeKey={this.state.HorizontalTabsActiveKey}
							onChange={(HorizontalTabsActiveKey) => this.setState({ HorizontalTabsActiveKey, })}
						>
							<HorizontalTabs.TabPane key="tabOne" tab="TabOne">
								this is tab one
							</HorizontalTabs.TabPane>
							<HorizontalTabs.TabPane key="tabTwo" tab="TabOne">
								this is tab two
							</HorizontalTabs.TabPane>
							<HorizontalTabs.TabPane key="tabThree" tab="TabOne">
								this is tab three
							</HorizontalTabs.TabPane>
						</HorizontalTabs>
					</ComponentBlock>
					<ComponentBlock title="Drawer">
						<Button
							onClick={() => this.setState({ isDrawerVisible: true, })}
						>
							Open Right
						</Button>
						<Button
							onClick={() => this.setState({ isDrawer2Visible: true, })}
						>
							Open Top
						</Button>
						<Drawer
							title="Right Drawer"
							placement={Drawer.PlacementEnums.RIGHT}
							isShowCloseIcon={true}
							onClose={() => this.setState({ isDrawerVisible: false, })}
							isVisible={this.state.isDrawerVisible}
							width={450}
						>
							<p>Some contents...</p>
							<p>Some contents...</p>
							<p>Some contents...</p>
						</Drawer>
						<Drawer
							placement={Drawer.PlacementEnums.TOP}
							isShowCloseIcon={false}
							onClose={() => this.setState({ isDrawer2Visible: false, })}
							isVisible={this.state.isDrawer2Visible}
							isShowMask={true}
							height={300}
						>
							<p>Some contents...</p>
							<p>Some contents...</p>
							<p>Some contents...</p>
						</Drawer>
					</ComponentBlock>
					<ComponentBlock title="Form With Dynamic Table">
						<FormWithInputDynamicTable/>
					</ComponentBlock>
					<ComponentBlock title="Datetime">
						<Item>
							{'Default: '}
							<Datetime data="2019-06-25T13:00:00+00:00" />
						</Item>
						<Item>
							{'DateOnly: '}
							<Datetime.DateOnly data="2019-06-25T13:00:00+00:00" />
						</Item>
						<Item>
							{'Time: '}
							<Datetime.Time data="2019-06-25T13:00:00+00:00" />
						</Item>
						<Item>
							{'TimeSeconds: '}
							<Datetime.TimeSeconds data="2019-06-25T13:00:00+00:00" />
						</Item>
					</ComponentBlock>
					<ComponentBlock title="DecimalNumber">
						<Item>
							{'Tolerance: '}
							<DecimalNumber data={-20.688} isTolerance />{', '}
							<DecimalNumber data={-10} isTolerance />{', '}
							<DecimalNumber data={0} isTolerance />{', '}
							<DecimalNumber data={23} isTolerance />{', '}
							<DecimalNumber data={123498.1654010200} isTolerance />
						</Item>
						<Item>
							{'Currency: '}
							<DecimalNumber data={0} isCurrency />{', '}
							<DecimalNumber data={1000} isCurrency />{', '}
							<DecimalNumber data={15000} isCurrency />{', '}
							<DecimalNumber data={15000.12345} isCurrency />
						</Item>
						<Item>
							{'Currency with separator: '}
							<DecimalNumber data={0} isCurrency hasSeparator />{', '}
							<DecimalNumber data={1000} isCurrency hasSeparator />{', '}
							<DecimalNumber data={15000} isCurrency hasSeparator />{', '}
							<DecimalNumber data={20000000} isCurrency hasSeparator />{', '}
							<DecimalNumber data={20000000.56789} isCurrency hasSeparator />
						</Item>
						<Item>
							{'Percent: '}
							<DecimalNumber data={0} isPercent />{', '}
							<DecimalNumber data={15} isPercent />{', '}
							<DecimalNumber data={100} isPercent />
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Badge">
						<Item>
							{'Basic: '}
							<Badge
								count={0}
							>
								<BadgeExampleCube />
							</Badge>
							<span style={{ marginRight: 20 }} />
							<Badge
								count={10}
							>
								<BadgeExampleCube />
							</Badge>
							<span style={{ marginRight: 20 }} />
							<Badge
								count={50}
							>
								<BadgeExampleCube />
							</Badge>
						</Item>
						<Item>
							{'Set Zero Visible: '}
							<Badge
								count={0}
								isZeroVisible
							>
								<BadgeExampleCube />
							</Badge>
						</Item>
						<Item>
							{'Change Count Overflow: '}
							<Badge
								count={10}
								overflowCount={9}
							>
								<BadgeExampleCube />
							</Badge>
							<span style={{ marginRight: 20 }} />
							<Badge
								count={100}
								overflowCount={99}
							>
								<BadgeExampleCube />
							</Badge>
							<span style={{ marginRight: 20 }} />
							<Badge
								count={1000}
								overflowCount={999}
							>
								<BadgeExampleCube />
							</Badge>
						</Item>
						<Item>
							{'Standalone: '}
							<Badge
								count={5}
							/>
							<span style={{ marginRight: 20 }} />
							<Badge
								count={15}
							/>
							<span style={{ marginRight: 20 }} />
							<Badge
								count={125}
							/>
						</Item>
						<Item>
							{'Bordered: '}
							<Badge
								count={50}
							>
								<BadgeExampleCube />
							</Badge>
							<span style={{ marginRight: 20 }} />
							<Badge
								count={50}
								isBordered={false}
							>
								<BadgeExampleCube />
							</Badge>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="XinYongBettingCheckout">
						<Item>
							<XinYongBettingCheckout
								inputValue={this.state.inputValue4}
								onChangeInputValue={this._handleChangeInputValue4}
							>
							</XinYongBettingCheckout>
							{this.state.inputValue4}
						</Item>
						<Item>
							<XinYongBettingCheckout
								isSquare={true}
								betCount={100}
								balance={100}
								betAmount={100}
								inputValue={this.state.inputValue5}
								onChangeInputValue={this._handleChangeInputValue5}
								onSubmit={() => {console.log('on submit');}}
								onReset={() => {console.log('on reset');}}
							></XinYongBettingCheckout>
							{this.state.inputValue5}
						</Item>
					</ComponentBlock>
					<ComponentBlock title="ChipButton">
						<ChipButton ></ChipButton>
						<ChipButton type={ChipButton.TypeEnums.VALUE_1}></ChipButton>
						<ChipButton type={ChipButton.TypeEnums.VALUE_2}></ChipButton>
						<ChipButton type={ChipButton.TypeEnums.VALUE_5}></ChipButton>
						<ChipButton type={ChipButton.TypeEnums.VALUE_10}></ChipButton>
						<ChipButton type={ChipButton.TypeEnums.VALUE_20}></ChipButton>
						<ChipButton type={ChipButton.TypeEnums.VALUE_50}></ChipButton>
						<ChipButton type={ChipButton.TypeEnums.VALUE_1K}></ChipButton>
					</ComponentBlock>
					<ComponentBlock title="Expandable Panel">
						<Item>
							<div style={{ position: 'relative', width: '230px', height: '200px', border: '1px solid #ccc', }}>
								<ExpandablePanel
									title="我的收藏"
									titleIcon={<Icon type={Icon.IconTypeEnums.CROWN_COLOR} size={Icon.SizeEnums.X_LARGE}/>}
									topRight={<Icon type={MENU_FOLD} theme="filled" style={{ color: '#646464', }} />}
									onClickTopRight={() => console.log('CLICK')}
									style={{ maxHeight: '180px', }}
								>
									<ul style={{ padding: 0, listStyle: 'none', }}>
										<li style={{ borderTop: '1px solid #ccc', }}><a href="#" style={{ color: '#555', padding: '10px', display: 'block', }}>收藏 1</a></li>
										<li style={{ borderTop: '1px solid #ccc', }}><a href="#" style={{ color: '#555', padding: '10px', display: 'block', }}>收藏 2</a></li>
										<li style={{ borderTop: '1px solid #ccc', }}><a href="#" style={{ color: '#555', padding: '10px', display: 'block', }}>收藏 3</a></li>
									</ul>
								</ExpandablePanel>
								<br/>
								<ExpandablePanel
									title="我的收藏"
									titleIcon={<Icon type={Icon.IconTypeEnums.CROWN_COLOR} size={Icon.SizeEnums.X_LARGE}/>}
									topRight={<Icon type={MENU_FOLD} theme="filled" style={{ color: '#646464', }} />}
									onClickTopRight={() => console.log('CLICK')}
									style={{ maxHeight: '180px', }}
									orientation={ExpandablePanel.OrientationEnums.RIGHT}
								>
									<ul style={{ padding: 0, listStyle: 'none', }}>
										<li style={{ borderTop: '1px solid #ccc', }}><a href="#" style={{ color: '#555', padding: '10px', display: 'block', }}>收藏 1</a></li>
										<li style={{ borderTop: '1px solid #ccc', }}><a href="#" style={{ color: '#555', padding: '10px', display: 'block', }}>收藏 2</a></li>
										<li style={{ borderTop: '1px solid #ccc', }}><a href="#" style={{ color: '#555', padding: '10px', display: 'block', }}>收藏 3</a></li>
									</ul>
								</ExpandablePanel>
							</div>
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Code Balls 投注球">
						<div style={{ overflow: 'hidden', }}>
							<Item>
								<span style={{ float: 'left', marginRight: '20px', }}> Circle:</span>
								<Ball.Circle
									text={'大'}
									onChange={value => console.log(`is click: ${value}`)}
								/>
							</Item>
						</div>
						<br/>
						<Item>
							<span style={{ float: 'left', marginRight: '20px', }}> Round:</span>
							<Ball.Round text={'全'} onChange={value => console.log(`is click: ${value}`)} />
						</Item>
						<Item>
							<span style={{ float: 'left', marginRight: '20px', }}> Rectangle:</span>
							<Ball.Rectangle text={'总和小'} onChange={value => console.log(`is click: ${value}`)} style={{ float: 'left', }} />
						</Item>
						<Item>
							<span style={{ float: 'left', marginRight: '20px', }}> Animal:</span> <Ball.Animal text={'0'} onChange={value => console.log(`is click: ${value}`)} style={{ width: '25px', height: '25px', }} />
						</Item>
					</ComponentBlock>
					<ComponentBlock title="Code Ball Button">
						<CodeBallButtonSample />
					</ComponentBlock>
					<ComponentBlock title="Xin Yong Play Slot">
						<XinYongPlaySlotSample />
					</ComponentBlock>
					<ComponentBlock title="Xing Yong Betting Card">
						<XinYongBettingCardSample/>
					</ComponentBlock>
					<ComponentBlock title="Dropdown">
						<Dropdown
							dropdownContent={this._renderDropdownMenu()}
							onVisibleChange={() => console.log('show')}
						>
							<span style={{ border: '1px solid', margin: '4px', padding: '4px', }}>hover me bottom-left</span>
						</Dropdown>
						<Dropdown
							dropdownContent={this._renderDropdownMenu()}
							trigger={['click',]}
							isKeepMenuOpen
							placement={Dropdown.PlacementEnums.BOTTOM_CENTER}
						>
							<span style={{ border: '1px solid', margin: '4px', padding: '4px', }}>click me bottom-center</span>
						</Dropdown>
						<Dropdown
							dropdownContent={this._renderDropdownMenu()}
							trigger={['click', 'hover',]}
							isKeepMenuOpen
							placement={Dropdown.PlacementEnums.TOP_RIGHT}
						>
							<span style={{ border: '1px solid', margin: '4px', padding: '4px', }}>hover/click me top-right</span>
						</Dropdown>
						<Dropdown
							dropdownContent={this._renderDropdownMenu()}
							trigger={['click', ]}
							placement={Dropdown.PlacementEnums.BOTTOM_CENTER}
							isShowingArrow
							isKeepMenuOpen
						>
							<span style={{ border: '1px solid', margin: '4px', padding: '4px', }}>click me isShowingArrow bottom</span>
						</Dropdown>
						<Dropdown
							dropdownContent={this._renderDropdownMenu()}
							trigger={['click', ]}
							placement={Dropdown.PlacementEnums.TOP_CENTER}
							isShowingArrow
						>
							<span style={{ border: '1px solid', margin: '4px', padding: '4px', }}>click me isShowingArrow top</span>
						</Dropdown>
						<Dropdown
							dropdownContent={this._renderDropdownMenu()}
							placement={Dropdown.PlacementEnums.BOTTOM_RIGHT}
							isDisabled
						>
							<span style={{ border: '1px solid', margin: '4px', padding: '4px', }}>disabled bottom-right</span>
						</Dropdown>
					</ComponentBlock>
					<ComponentBlock title="Toggle">
						<Toggle
							onClickRight={() => console.log('right click')}
							onClickLeft={() => console.log('left click')}
							left="官方"
							right="信用"
						/>
						<Toggle
							activeBackgroundColor={Toggle.ColorEnums.BLUE}
							inActiveBackgroundColor={Toggle.ColorEnums.WHITE}
							left="官方"
							right="信用"
							defaultActiveRight
						/>
					</ComponentBlock>
					<ComponentBlock title="LabelText">
						<div style={{ width: 500, }}>
							<LabelText
								label="Title:"
								text="LabelText with Title label, LARGE labelColType and LARGE fontSize"
								labelColType={LabelText.SizeEnums.SMALL}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="Title:"
								text="LabelText with Title label, MEDIUM labelColType and MEDIUM fontSize"
								labelColType={LabelText.SizeEnums.MEDIUM}
								fontSize={LabelText.SizeEnums.MEDIUM}
							/>
							<LabelText
								label="Title:"
								text="LabelText with Title label, MEDIUM labelColType, MEDIUM fontSize and false isFixedWidth"
								labelColType={LabelText.SizeEnums.MEDIUM}
								fontSize={LabelText.SizeEnums.MEDIUM}
								isFixedWidth={false}
							/>
							<LabelText
								label="Long Title:"
								text="LabelText with Long Title label, MEDIUM labelColType, MEDIUM fontSize and false isFixedWidth"
								labelColType={LabelText.SizeEnums.MEDIUM}
								fontSize={LabelText.SizeEnums.MEDIUM}
								isFixedWidth={false}
							/>
							<LabelText
								label="Title:"
								text="LabelText with Title label, LARGE labelColType and LARGE fontSize"
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.LARGE}
							/>
							<LabelText
								label="Long Title:"
								text="LabelText with Long Title label, LARGE labelColType and LARGE fontSize"
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.LARGE}
							/>
							<LabelText
								label="Title:"
								text="is space between and change color"
								labelColType={LabelText.SizeEnums.SMALL}
								fontSize={LabelText.SizeEnums.SMALL}
								isSpaceBetween
								labelColor={LabelText.ColorEnums.LIGHT_BLACK}
								textColor={LabelText.ColorEnums.LIGHT_BLACK}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="InfoCard">
						<div style={{ width: 300, }}>
							<InfoCard
								topLeft="top-left"
								topRight="top-right"
								left="left"
								right="right"
								bottom="bottom"
							/>
							<InfoCard
								topLeft="top-left"
								left="left"
								right="right"
								bottom="bottom"
								isShowingCloseButton
								onClose={() => console.log('close')}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="BettingRecordCard">
						<div>
							<BettingRecordCard
								onClick={() => console.log('click')}
								onClickCancel={() => console.log('cancel')}
								bettingRecord={{
									id: 201901240027,
									name: '五星龙虎和',
									lotteryId: 0,
									lotteryName: '腾讯分分彩',
									playId: 1,
									amountPerBet: 10,
									multiple: 2,
									reward: 0,
									rebate: '12.8',
									issue: '20190701-0001',
									opencode: '',
									count: 1,
									betcontent: '和',
									weizhi: '',
									details: [ // 中獎資訊
										{
											name: '和',
											count: 1,
											reward: 10,
										},
									],
									status: 'win',
									createdAt: '2018-09-29T17:23:40+00:00',
								}}
							/>
							<BettingRecordCard
								bettingRecord={{
									id: 201901240027,
									name: '五星龙虎和',
									lotteryId: 0,
									lotteryName: '腾讯分分彩',
									playId: 1,
									amountPerBet: 10,
									multiple: 2,
									reward: 0,
									rebate: '12.8',
									issue: '20190701-0001',
									opencode: '',
									count: 1,
									betcontent: '和',
									weizhi: '',
									details: [ // 中獎資訊
										{
											name: '和',
											count: 1,
											reward: 10,
										},
									],
									status: 'new',
									createdAt: '2018-12-20T17:23:40+00:00',
								}}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="TraceRecordCard">
						<div>
							<TraceRecordCard
								onClick={() => console.log('click')}
								onClickCancel={() => console.log('cancel')}
								traceRecord={{
									id: 201901240028,
									name: ' 五星直選…',
									lotteryName: '东京1.5分彩',
									amountPerBet: 10,
									totalIssues: 2,
									reward: 0,
									issue: '20190701-0002',
									opencode: '',
									status: 1,
									createdAt: new Date('2019-04-13T10:38:43'),
								}}
							/>
							<TraceRecordCard
								traceRecord={{
									id: 201901240027,
									name: ' 五星直選…',
									lotteryName: '东京1.5分彩',
									amountPerBet: 10,
									totalIssues: 2,
									reward: 0,
									issue: '20190701-0001',
									opencode: '',
									status: 2,
									createdAt: new Date('2019-04-13T10:38:43'),
								}}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="XinYongSelectedBettingCard">
						<XinYongSelectedBettingCard
							data={{
								betcontent:'小',
								amount: 400,
								odds: 1.996,
								reward: 200,
							}}
							onClose={() => console.log('click')}
						/>
						<XinYongSelectedBettingCard
							isShowingCloseButton={false}
						/>
					</ComponentBlock>
					<ComponentBlock title="我的收藏">
						<MyCollection />
					</ComponentBlock>
					<ComponentBlock title="号码篮卡片">
						<StandardSelectedBettingCard
							betting={{
								lottery: {
									id: 'id',
									name: '重庆时时彩',
								},
								play: {
									id: 'id',
									name: '五星直选复式',
								},
								weizhi: '-',
								count: 1,
								multiple: 1,
								amountPerBet: 30,
								amount: 30,
								betcontent: '7,7,7,7,7',
							}}
							onClickClose={() => console.log('close card')}
						/>
					</ComponentBlock>
					<ComponentBlock title="位置">
						<BettingWeizhiBlock
							options={this.state.bettingWeizhiCheckedOptions}
							description={`您选择了 2 个位置，系统自动根据位置组合成 1 个方案。`}
							onPressCheckbox={(index) => { this._handleBettingWeizhiChange(index); }}
						/>
						<BettingWeizhiBlock
							checkboxStyle={BettingWeizhiBlock.CheckboxStyleEnum.HOLLOW}
							options={this.state.bettingWeizhiCheckedOptions}
							onPressCheckbox={(index) => { this._handleBettingWeizhiChange(index); }}
						/>
					</ComponentBlock>
					<ComponentBlock title="LabelSelector">
						<LabelSelector
							label="Title"
							items={[
								{
									id: 0,
									name: 'item1',
								},
								{
									id: 1,
									name: 'item2',
								},
								{
									id: 2,
									name: 'item3',
								},
							]}
							selectedId={this.state.LabelSelectorSelectedId}
							onClickItem={(item) => this.setState({ LabelSelectorSelectedId: item.id, })}
						/>
					</ComponentBlock>
					<ComponentBlock title="WalletsInfoCard">
						<WalletsInfoCard
							name="AC錢包"
							value={32.0934}
							onClick={ () => {console.log("test")} }
							size={WalletsInfoCard.SizeEnums.MEDIUM}
							iconColor={WalletsInfoCard.IconColorEnums.YELLOW}
							status={WalletsInfoCard.StatusEnums.BASIC}
						/>
						<span style={{ marginRight: 10, }}/>
						<WalletsInfoCard
							name="AC錢包"
							value={32.0934}
							size={WalletsInfoCard.SizeEnums.MEDIUM}
							iconColor={WalletsInfoCard.IconColorEnums.YELLOW}
							status={WalletsInfoCard.StatusEnums.INCOMING}

						/>
						<span style={{ marginRight: 10, }}/>
						<WalletsInfoCard
							name="AC錢包"
							value={32.0934}
							size={WalletsInfoCard.SizeEnums.MEDIUM}
							iconColor={WalletsInfoCard.IconColorEnums.YELLOW}
							status={WalletsInfoCard.StatusEnums.OUTGOING}

						/>
						<span style={{ marginRight: 10, }}/>
						<WalletsInfoCard
							name="AC錢包"
							value={32.0934}
							size={WalletsInfoCard.SizeEnums.SMALL}
							iconColor={WalletsInfoCard.IconColorEnums.GREEN}
							status={WalletsInfoCard.StatusEnums.BASIC}

						/>
						<span style={{ marginRight: 10, }}/>
						<WalletsInfoCard
							name="AC錢包"
							value={32.0934}
							size={WalletsInfoCard.SizeEnums.SMALL}
							iconColor={WalletsInfoCard.IconColorEnums.GREEN}
							status={WalletsInfoCard.StatusEnums.INCOMING}
						/>
						<span style={{ marginRight: 10, }}/>
						<WalletsInfoCard
							name="AC錢包"
							value={32.0934}
							size={WalletsInfoCard.SizeEnums.SMALL}
							iconColor={WalletsInfoCard.IconColorEnums.GREEN}
							status={WalletsInfoCard.StatusEnums.OUTGOING}
						/>
						<span style={{ marginRight: 10, }}/>
						<WalletsInfoCard
							name="AC錢包"
							value={32.0934}
							size={WalletsInfoCard.SizeEnums.SMALL}
							iconColor={WalletsInfoCard.IconColorEnums.GREEN}
							status={WalletsInfoCard.StatusEnums.DISABLED}
						/>
						<span style={{ marginRight: 10, }}/>
					</ComponentBlock>
					<ComponentBlock title="BankCard">
						<div style={{ width: 256, }}>
							<BankCard
								dataSource={{
									bankName: '工商銀行',
									payer: 'test',
									number: '3333',
									activatedAt: '2019-08-13T10:38:43',
									withdrawableAt: '2019-08-13T16:38:43',
								}}
							/>
						</div>
						<div style={{ width: 256, }}>
							<BankCard
								dataSource={{
									bankName: '工商銀行',
									payer: 'test2',
									number: '1234',
									activatedAt: '2019-08-13T10:38:43',
									withdrawableAt: '2019-08-13T16:38:43',
								}}
								isUnbindButtonVisible
								onClickUnbind={(data) => console.log(data)}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="Icon Button">
						<IconButton
							type={IconButton.IconTypeEnums.SEARCH}
							color={IconButton.ColorEnums.PRIMARY}
							size={IconButton.SizeEnums.LARGE}
							onClick={() => console.log('icon button clicked!')}
						/>
						<IconButton
							disabled={true}
							type={IconButton.IconTypeEnums.EYE}
							color={IconButton.ColorEnums.PRIMARY}
							size={IconButton.SizeEnums.LARGE}
							onClick={() => console.log('icon button clicked!')}
						/>
					</ComponentBlock>
					<ComponentBlock title="Tooltip">
						<div>
							<h3>∟ Tooltip</h3>
							<p>basic tooltip</p>
							<Tooltip title="YO">
								<span style={{ marginRight: '15px', }}>
									<Icon type={INFO_FILL} />
								</span>
							</Tooltip>
							<Tooltip title="YO" placement={Tooltip.PlacementEnums.TOP_RIGHT}>
								<span style={{ textDecoration: 'underline', marginRight: '15px', }}>Hover Me - Top Right</span>
							</Tooltip>
							<Tooltip
								title={
									<div>
										<span style={{ float: 'left', }}>
											<Icon type={Icon.IconTypeEnums.INFO_FILL} style={{ fill: '#ff8113', stroke: '#fff', }}/>
										</span>
										<p style={{ marginBottom: '0', paddingLeft: '25px', }}>提款手續費為每天第一次0.5%，第二次1%，第三次及以后2% 。</p>
									</div>
								}
								overlayColor={Tooltip.ColorEnums.WHITE}
								trigger={Tooltip.TriggerTypeEnums.CLICK}
								overlayClassName="demo-page-tooltip-overlay"
							>
								<span style={{ textDecoration: 'underline', }}>Click Me</span>
							</Tooltip>
						</div>
						<p></p>
						<hr/>
						<p></p>
						<div>
							<h3>∟ Ellipsis Tooltip</h3>
							<p>use it when need to controll <code>visible</code> from outside</p>
							<ControlledTooltip
								title="Hello"
								overlayColor={ControlledTooltip.ColorEnums.WHITE}
								placement={ControlledTooltip.PlacementEnums.RIGHT}
								onVisibleChange={this._handleVisibleChange}
								isVisible={this.state.isVisible}
							>
								<span
									ref={containerRef => this.containerRef = containerRef}
									style={{
										width: '100%',
										maxWidth: '100px',
										whiteSpace: 'nowrap',
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										backgroundColor: '#faf9e3',
										display: 'inline-block',
									}}
								>
									LONG TOOLTTTTTIP
								</span>
							</ControlledTooltip>
						</div>
					</ComponentBlock>
					<ComponentBlock title="Steps">
						<StepsSample/>
					</ComponentBlock>
					<ComponentBlock title="CascaderSelect">
						<CascaderSelect
							value={this.state.cascaderSelectOption}
							options={cascaderOptions}
							onChange={(value) => this.setState({ cascaderSelectOption: value, })}
						/>
						<CascaderSelect
							value={this.state.cascaderSelectOption2}
							options={cascaderOptions}
							onChange={(value) => this.setState({ cascaderSelectOption2: value, })}
							isShowAll
						/>
					</ComponentBlock>
					<ComponentBlock title="Tree Sample">
						<TreeSample/>
					</ComponentBlock>
					<ComponentBlock title="Dice">
						<Dice points={[ 1, ]}/>
						<br/>
						<Dice points={[ 2, 3, ]}/>
						<br/>
						<Dice points={[ 4, 5, 6, 7,]}/>
					</ComponentBlock>
					<ComponentBlock title="DrawingInfoCard Sample">
						<DrawingInfoCardSample/>
					</ComponentBlock>
					<ComponentBlock title="Dividend input range table Sample">
						<DividendInputRangeTableSample/>
					</ComponentBlock>
					<ComponentBlock title="Check Selector">
						<div style={{ width: 90, }}>
							<CheckSelector
								source={[
									{
										id: 0,
										name: '整合',
									},
									{
										id: 1,
										name: '1-5球',
									},
									{
										id: 2,
										name: '6-10球',
									},
								]}
								activeIds={this.state.activeIds}
								onChange={(id) => {this.setState({ activeIds: [id,], });}}
							/>
						</div>
						<div style={{ width: 270, }}>
							<CheckSelector
								source={[
									{
										id: 0,
										name: '整合',
									},
									{
										id: 1,
										name: '1-5球',
									},
									{
										id: 2,
										name: '6-10球',
									},
								]}
								checkedIds={[1,]}
								backgroundColor={CheckSelector.BackgroundColorEnums.WHITE}
							/>
						</div>
						<div style={{ width: 90, }}>
							<CheckSelector
								source={[
									{
										id: 0,
										name: '整合',
									},
									{
										id: 1,
										name: '1-5球',
									},
									{
										id: 2,
										name: '6-10球',
									},
								]}
								selectedIds={[0, 2, ]}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock>
						<div style={{ background: 'white', }}>
							<Panel
								headerTitle="Panel Demo"
								content={<div>Panel Content</div>}
								footer={<div>Panel Footer</div>}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="Scroll Selector">
						<div style={{ width: 300, }}>
							<ScrollSelector
								options={['test1111', 'test2222', 'test3333', 'test4444', 'test5555',]}
								selectedIndex={this.state.scrollSelecotrIndex}
								onClick={(index) => {
									this.setState({
										scrollSelecotrIndex: index,
									});
								}}
							/>
						</div>
					</ComponentBlock>
					<ComponentBlock title="Popover">
						<div style={{ width: '70px', display: 'inline-block', }}>
							<Popover
								title="Popover 1"
								content={
									<React.Fragment>
										<p>Hover</p>
										<p>Hover</p>
									</React.Fragment>
								}
							>
								<div>Hover me</div>
							</Popover>
						</div>
						<div style={{ width: '70px', display: 'inline-block', color: 'green', }}>
							<Popover
								title="Popover 2"
								className='ljit-popover-demo'
								overlayClassName='ljit-popover-overlay-demo'
								trigger={Popover.TriggerTypeEnums.CLICK}
								content={
									<React.Fragment>
										<p>Click</p>
										<p>Click</p>
									</React.Fragment>
								}
							>
								<div>Click me</div>
							</Popover>
						</div>
					</ComponentBlock>
					<ComponentBlock  title="Collapse Sample">
						<CollapseSample/>
					</ComponentBlock>
					<ComponentBlock title="Scroll Container">
						<ScrollContainer
							isButtonDisabled={this.state.isShowMockList}
							onClick={() => {
								console.log('click read more');
								this.setState({ isShowMockList: true, });
							}}
						>
							<p>申請時間軸</p>
							<Item>
								<Timeline mode={Timeline.ModeEnums.LEFT}>
									{this._renderTimelineItems()}
								</Timeline>
							</Item>
							{this.state.isShowMockList ?
								<Item>
									<Timeline mode={Timeline.ModeEnums.LEFT}>{mockList}</Timeline>
								</Item>
								: null
							}
						</ScrollContainer>
					</ComponentBlock>
					<ComponentBlock title="Notification">
						<Button
							onClick={() => Notification.info({
								title: '恭喜你中獎!',
								description: '中獎期號：第20190620032期，中獎號碼:[2,3,6,8,9]',
							})}
							type="primary"
						>open notification</Button>
					</ComponentBlock>
				</Content>
			</Layout>
		);
	}
}

export default APP;

const mockList = [
	<Timeline.Item key='mockList-1'>创建服务</Timeline.Item>,
	<Timeline.Item key='mockList-2' nodeColor={Timeline.Item.ColorEnums.LIGHTPURPLE}>创建服务现场 2015-09-01</Timeline.Item>,
	<Timeline.Item key='mockList-3' nodeElement={<AntdIcon type="clock-circle-o"/>}>初步排除网络异常 2015-09-01</Timeline.Item>,
	<Timeline.Item key='mockList-4'>技术测试</Timeline.Item>,
	<Timeline.Item key='mockList-5'>技术测试异常 2015-09-01</Timeline.Item>,
	<Timeline.Item key='mockList-6'>网络异常正在修复 2015-09-01</Timeline.Item>,
	<Timeline.Item key='mockList-7'></Timeline.Item>,
];
