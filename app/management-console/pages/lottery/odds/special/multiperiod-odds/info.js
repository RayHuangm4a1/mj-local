import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputSearch, Table, Button, TextButton, Divider, Tooltip, HeaderButtonBar } from 'ljit-react-components';
import PageModal from '../../../../../components/page-modal';
import PageBlock from '../../../../../components/page-block';
import { RouteKeyEnums, } from '../../../../../routes';

const { Message, } = PageModal;
const {
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_CREATE,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_EDIT,
} = RouteKeyEnums;

const odds = [{
	key: '0',
	isLargestIssue: false,
	failIssuesFrom: 0,
	failIssuesTo: 10,
	rewardCode: 1900,
},{
	key: '1',
	isLargestIssue: false,
	failIssuesFrom: 11,
	failIssuesTo: 20,
	rewardCode: 1920,
},{
	key: '2',
	isLargestIssue: true,
	failIssuesFrom: 21,
	failIssuesTo: 21,
	rewardCode: 1940,
}];

// TODO: 確認 changeLevel 資料格式
const limitData = [
	{
		key: '1',
		play: {
			name: 'play 1',
			lottery: {
				name: 'lottery 1',
				lotteryClass: {
					name: 'lotteryClass 1',
				},
			},
		},
		reward: {
			name: 'reward 1',
		},
		changeLevel: [
			'0-10[1956]',
			'11-20[1940]',
			'21-30[1930]',
			'30- [1920]'
		],
		rewardCode: 2931,
		odds: odds,
	},
	{
		key: '2',
		play: {
			name: 'play 2',
			lottery: {
				name: 'lottery 2',
				lotteryClass: {
					name: 'lotteryClass 2',
				},
			},
		},
		reward: {
			name: 'reward 2',
		},
		changeLevel: [
			'0-10[1956]',
			'11-20[1940]',
			'21-30[1930]',
			'30- [1920]'
		],
		rewardCode: 1900,
		odds: odds,
	},
	{
		key: '3',
		play: {
			name: 'play 2',
			lottery: {
				name: 'lottery 2',
				lotteryClass: {
					name: 'lotteryClass 2',
				},
			},
		},
		reward: {
			name: 'reward 3',
		},
		changeLevel: [
			'0-10[1956]',
			'11-20[1940]',
			'21-30[1930]',
			'30- [1920]'
		],
		rewardCode: 1500,
		odds: odds,
	},
];

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
};
const defaultProps = {
	onNavigate: () => {},
};

class GameOddsMultiperiodOddsInfoPage extends Component {
	constructor() {
		super();
		this.state = {
			searchValue: '',
			isRemoveModalVisible: false,
			removingData: null,
			data: [],
		};
		this._handleChangeSearch = this._handleChangeSearch.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleShowDeleteModal = this._handleShowDeleteModal.bind(this);
		this._handleRemoveRateLimit = this._handleRemoveRateLimit.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
	}

	_handleChangeSearch(event) {
		this.setState({ searchValue: event.target.value, });
	}
	_handleSearch(value) {
		// TODO fetch data by value
	}
	_handleShowDeleteModal(record) {
		const { isRemoveModalVisible } = this.state;

		this.setState({
			isRemoveModalVisible: !isRemoveModalVisible,
			removingData: record,
		});
	}
	_handleRemoveRateLimit() {
		// TODO remove rate limit by id
		const { removingData, data } = this.state;
		const { key } = removingData;
		const updatedData =  data.filter(item => {
			return item.key !== key;
		});

		this.setState({
			data: updatedData,
			isRemoveModalVisible: false,
			removingData: {},
		});
	}

	_handleChangeTable(pagination, filters, sorter) {
		// TODO fetch pagination, filters, sorter data
	}

	render() {
		const { onNavigate, } = this.props;
		const {
			searchValue,
			isRemoveModalVisible,
			data
		} = this.state;
		const {
			_handleRemoveRateLimit,
			_handleSearch,
			_handleChangeSearch,
			_handleChangeTable,
			_handleShowDeleteModal,
		} = this;

		return (
			<PageBlock>
				<div>
					<Message
						visible={isRemoveModalVisible}
						title="提示"
						message="确定删除？"
						onClickCancel={() => this.setState({
							isRemoveModalVisible: false,
						})}
						onClickOk={_handleRemoveRateLimit}
					/>
					<div style={{ textAlign: 'right', marginBottom: 24 }}>
						<HeaderButtonBar
							left={[
								(
									<PageBlock.Title key="title" text="多期未中賠率設置" />
								),
							]}
							right={[
								(
									<Button
										color={Button.ColorEnums.BRIGHTBLUE500}
										icon="plus"
										onClick={() => onNavigate(LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_CREATE)}
										key="create"
									>
										新增赔率限制
									</Button>
								),
								(
									<InputSearch
										value={searchValue}
										onChange={_handleChangeSearch}
										onSearch={_handleSearch}
										placeholder="请输入"
										key="inputSearch"
									/>
								)
							]}
						/>
					</div>
					<div>
						<Table
							dataSource={data}
							onChange={_handleChangeTable}
							hasPagination
							columns={[
								{
									title: '彩类',
									dataIndex: 'play.lottery.lotteryClass',
									key: 'lotteryClass',
									render: (lotteryClass) => <div>{lotteryClass.name}</div>,
								},
								{
									title: '彩种',
									dataIndex: 'play.lottery',
									key: 'lottery',
									render: (lottery) => <div>{lottery.name}</div>,
								},
								{
									title: '玩法',
									dataIndex: 'play',
									key: 'play',
									render: (play) => <div>{play.name}</div>,
								},
								{
									title: '奖项',
									dataIndex: 'reward',
									key: 'reward',
									render: (reward) => <div>{reward.name}</div>,
								},
								{
									title: '变动层级',
									dataIndex: 'changeLevel',
									key: 'changeLevel',
									width: '110px',
									render: (value, record) => (
										// TODO: 確認資料格式
										<div className="multiperiod-change-level-data">
											<Tooltip
												title={value.join('\r\n')}
												overlayClassName="multiperiod-change-level-data__tooltip tooltip--odds"
												overlayColor={Tooltip.ColorEnums.WHITE}
											>
												{value[0]}...
											</Tooltip>
										</div>
									)
								},
								{
									title: '操作',
									render: (data, record) => (
										<div style={{ minWidth: 73 }}>
											<TextButton
												text="修改"
												color="default"
												onClick={() => onNavigate(LOTTERY_ODDS_SPECIAL_MULTIPERIOD_ODDS_EDIT)}
											/>
											<Divider type={Divider.DirectionTypeEnums.VERTICAL}/>
											<TextButton
												text="删除"
												color="danger"
												onClick={() => _handleShowDeleteModal(record)}
											/>
										</div>
									),
								},
							]}
						/>
					</div>
				</div>
			</PageBlock>
		);
	}

	componentDidMount() {
		// TODO fetch ratelimits
		this.setState({
			data: limitData,
		});
	}
}

GameOddsMultiperiodOddsInfoPage.propTypes = propTypes;
GameOddsMultiperiodOddsInfoPage.defaultProps = defaultProps;

export default GameOddsMultiperiodOddsInfoPage;
