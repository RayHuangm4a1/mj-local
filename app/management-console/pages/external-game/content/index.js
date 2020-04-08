import React, { Component, Fragment, } from 'react';
import { HeaderButtonBar, LabelContent, Select, InputSearch, Button, SidebarTabs } from 'ljit-react-components';
import GameTable from './game-table';
import GameOrderFormModal from './game-order-form-modal';
import PageBlock from '../../../components/page-block';
import PageModal from '../../../components/page-modal';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../lib/enums';
import './style.styl';

const propTypes = {
	layoutConfigs: layoutConfigsPropTypes,
};
const defaultProps = {};

// TODO: get data from api
const fakeData = {
	'platform-1': [
		{
			key: 'game-1',
			tab: '老虎机',
			data: [
				{
					key: '1',
					gameName: '水果拉霸',
					gameType: '老虎机',
					gameCode: 'FRU',
					gameOrder: 1,
					isVisible: false,
				},
				{
					key: '2',
					gameName: '灵猴献瑞',
					gameType: '老虎机',
					gameCode: 'SB30',
					gameOrder: 2,
					isVisible: true,
				},
				{
					key: '3',
					gameName: '欧洲列强争霸',
					gameType: '老虎机',
					gameCode: 'SB35',
					gameOrder: 3,
					isVisible: true,
				},
				{
					key: '4',
					gameName: '复古花园',
					gameType: '老虎机',
					gameCode: 'SB02',
					gameOrder: 4,
					isVisible: false,
				},
			],
		},
		{
			key: 'game-2',
			tab: '卓牌游戏',
			data: [
				{
					key: '1',
					gameName: 'gameName 1',
					gameType: 'gameType 1',
					gameCode: 'gameCode 1',
					gameOrder: 0,
					isVisible: false,
				},
				{
					key: '2',
					gameName: 'gameName 2',
					gameType: 'gameType 2',
					gameCode: 'gameCode 2',
					gameOrder: 2,
					isVisible: true,
				},
				{
					key: '3',
					gameName: 'gameName 3',
					gameType: 'gameType 3',
					gameCode: 'gameCode 3',
					gameOrder: 3,
					isVisible: true,
				},
			],
		},
	],
	'platform-2': [
		{
			key: 'game-3',
			tab: '老虎机',
			data: [
				{
					key: '10',
					gameName: '刮刮乐',
					gameType: '老虎机',
					gameCode: 'FRU2',
					gameOrder: 1,
					isVisible: true,
				},
				{
					key: '11',
					gameName: '水果拉霸',
					gameType: '老虎机',
					gameCode: 'FRU',
					gameOrder: 2,
					isVisible: false,
				},
			],
		},
	],
};

class ExternalGameContentPage extends Component {
	constructor() {
		super();
		this.state = {
			platform: '',
			formTitle: '',
			initialValues: {},
			isGameVisibleModalShow: false,
			isGameOrderSettingVisible: false,
			searchValue: '',
			tabKey: '',
			tabData: [],
			record: {},
		};
		this._handleChangePlatform = this._handleChangePlatform.bind(this);
		this._handleChangeSearchInput = this._handleChangeSearchInput.bind(this);
		this._handleSubmitSearch = this._handleSubmitSearch.bind(this);
		this._hanldeChangeTab = this._hanldeChangeTab.bind(this);
		this._handleShowGameOrderSettingForm = this._handleShowGameOrderSettingForm.bind(this);
		this._handleSubmitGameOrderSettingForm = this._handleSubmitGameOrderSettingForm.bind(this);
		this._handleChangeGameVisible = this._handleChangeGameVisible.bind(this);
		this._handleSubmitChangeGameVisible = this._handleSubmitChangeGameVisible.bind(this);
		this._handleSwitchMessage = this._handleSwitchMessage.bind(this);
		this._renderTabContent = this._renderTabContent.bind(this);
	}
	_handleChangePlatform(value) {
		//TODO fetch platform from api
		this.setState({
			platform: value,
			tabKey: fakeData[value][0].key,
			tabData: fakeData[value],
			games: fakeData[value][0].data,
		});
	}
	_handleChangeSearchInput(event) {
		this.setState({ searchValue: event.target.value, });
	}
	_handleSubmitSearch(value) {
		//TODO search by api
	}

	_hanldeChangeTab(tabKey) {
		const { tabData, } = this.state;
		const selectedTabData = getSelectedTabData(tabData, tabKey);

		this.setState({
			tabKey,
			games: selectedTabData.data,
		});
	}

	_handleShowGameOrderSettingForm() {
		this.setState({ isGameOrderSettingVisible: true, });
	}

	_handleSubmitGameOrderSettingForm(orders) {
		// TODO: check submit data format and send update api
		this.setState({
			isGameOrderSettingVisible: false,
		});
	}

	_handleChangeGameVisible(record) {
		this.setState({
			record,
			isGameVisibleModalShow: true,
		});
	}

	_handleSubmitChangeGameVisible() {
		const { tabData, tabKey, record, } = this.state;
		const { key, isVisible } = record;

		// TODO send data change to server
		this.setState({
			tabData: tabData.map(tabItem => {
				if (tabItem.key === tabKey) {
					const newTab = tabItem.data.map(item => {
						if (item.key === key) {
							return Object.assign({}, item, { isVisible: !isVisible });
						}
						return item;
					});

					return Object.assign({}, tabItem, { data: newTab });
				}
				return tabItem;
			}),
			isGameVisibleModalShow: false,
		});
	}

	_handleSwitchMessage() {
		const { record, } = this.state;

		if (record.isVisible) {
			return "确定关闭？";
		} else {
			return "确定显示？";
		}
	}

	_renderTabContent() {
		const {
			platform,
			searchValue,
			tabData,
		} = this.state;
		const {
			_handleChangePlatform,
			_handleShowGameOrderSettingForm,
			_handleChangeSearchInput,
			_handleSubmitSearch,
			_handleChangeGameVisible,
		} = this;

		const content = tabData.map((item) => {
			return (
				<Fragment key={item.key}>
					<HeaderButtonBar
						className="platform-content-header-bar"
						left={
							<LabelContent
								label="平台："
								noMargin
								className="platform-select"
							>
								<Select
									style={{ width: 160 }}
									value={platform}
									options={[
										{ label: 'AG平台', value: 'platform-1', },
										{ label: '?平台', value: 'platform-2', },
									]}
									onChange={(value) => _handleChangePlatform(value)}
								/>
							</LabelContent>
						}
						right={
							<div>
								<Button
									color={Button.ColorEnums.BRIGHTBLUE500}
									onClick={_handleShowGameOrderSettingForm}
								>
									修改顺位
								</Button>
								<InputSearch
									style={{
										display: 'inline-block',
										width: 272,
										marginLeft: 16
									}}
									value={searchValue}
									onChange={_handleChangeSearchInput}
									onSearch={_handleSubmitSearch}
									placeholder="请输入"
								/>
							</div>
						}
					/>
					<GameTable
						games={item.data}
						onToggleSwitch={_handleChangeGameVisible}
						platform={platform}
					/>
				</Fragment>
			);
		});

		return content;
	}

	render() {
		const {
			isGameVisibleModalShow,
			isGameOrderSettingVisible,
			tabData,
			tabKey,
			games,
		} = this.state;
		const {
			_handleSubmitGameOrderSettingForm,
			_handleSubmitChangeGameVisible,
			_handleSwitchMessage,
			_renderTabContent,
		} = this;
		const { layoutConfigs: { isFeatureActive, }, } = this.props;

		if (!isFeatureActive) {
			return null;
		}
		return (
			<PageBlock
				className="external-platform-content"
			>
				<PageModal.Message
					visible={isGameVisibleModalShow}
					message={_handleSwitchMessage()}
					onClickCancel={() =>
						this.setState({
							isGameVisibleModalShow: false,
							record: {},
						})
					}
					onClickOk={_handleSubmitChangeGameVisible}
				/>
				<GameOrderFormModal
					onSubmit={_handleSubmitGameOrderSettingForm}
					isVisible={isGameOrderSettingVisible}
					games={games}
				/>
				<SidebarTabs
					className="external-tab"
					tabData={tabData}
					activeKey={tabKey}
					onChange={this._hanldeChangeTab}
				>
					{_renderTabContent()}
				</SidebarTabs>
			</PageBlock>
		);
	}

	componentDidMount() {
		this.setState({
			platform: 'platform-1',
			tabKey: fakeData['platform-1'][0].key,
			tabData: fakeData['platform-1'],
			games: fakeData['platform-1'][0].data,
		});
	}
}

ExternalGameContentPage.propTypes = propTypes;
ExternalGameContentPage.defaultProps = defaultProps;

export default compose(
	withFeatureToggle(FeatureCodeEnum.EXTERNAL_GAME_CONTENT)
)(ExternalGameContentPage);

function getSelectedTabData(tabData, tabKey) {
	return tabData.filter(item => item.key === tabKey)[0];
}
