import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { InputSearch, Table, Button, TextButton, Divider, Tooltip, HeaderButtonBar } from 'ljit-react-components';
import PageBlock from '../../../../../components/page-block';
import PageModal from '../../../../../components/page-modal';
import { RouteKeyEnums, } from '../../../../../routes';

const { Message, } = PageModal;
const {
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_CREATE,
	LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_EDIT,
} = RouteKeyEnums;

const odds = [{
	key: '0',
	isLargestIssue: false,
	failIssuesFrom: 0,
	failIssuesTo: 10,
	maxBet: 50000,
	maxReceipt: 350000,
},{
	key: '1',
	isLargestIssue: false,
	failIssuesFrom: 11,
	failIssuesTo: 20,
	maxBet: 50000,
	maxReceipt: 250000,
},{
	key: '2',
	isLargestIssue: true,
	failIssuesFrom: 21,
	failIssuesTo: 21,
	maxBet: 30000,
	maxReceipt: 150000,
}];

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
			name: '和',
		},
		odds: odds,
		changeLevel: [
			'0-10[50,000][30,000]',
			'11-20[50,000][30,000]',
			'21-30[50,000][30,000]',
			'30- [50,000][30,000]',
		],
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
			name: '和',
		},
		odds: odds,
		changeLevel: [
			'0-10[50,000][30,000]',
			'11-20[50,000][30,000]',
			'21-30[50,000][30,000]',
			'30- [50,000][30,000]',
		],
	},
	{
		key: '3',
		play: {
			name: 'play 3',
			lottery: {
				name: 'lottery 3',
				lotteryClass: {
					name: 'lotteryClass 3',
				},
			},
		},
		reward: {
			name: '和',
		},
		odds: odds,
		changeLevel: [
			'0-10[50,000][30,000]',
			'11-20[50,000][30,000]',
			'21-30[50,000][30,000]',
			'30- [50,000][30,000]',
		],
	},
];

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
};
const defaultProps = {
	onNavigate: () => {},
};

class GameOddsMultiperiodBettingInfoPage extends Component {
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
		this._handleRemoveBetLimit = this._handleRemoveBetLimit.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
	}

	_handleChangeSearch(event) {
		this.setState({ searchValue: event.target.value, });
	}
	_handleSearch(value) {
	}
	_handleShowDeleteModal(record) {
		const { isRemoveModalVisible } = this.state;

		this.setState({
			isRemoveModalVisible: !isRemoveModalVisible,
			removingData: record,
		});
	}
	_handleRemoveBetLimit() {
		// TODO remove bet limit by id
		const { removingData, data } = this.state;
		const { key } = removingData;
		const updatedData =  data.filter(item => {
			return item.key !== key;
		});

		this.setState({
			data: updatedData,
			isRemoveModalVisible: false,
			removeingData: {},
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
			data,
		} = this.state;
		const {
			_handleRemoveBetLimit,
			_handleSearch,
			_handleChangeSearch,
			_handleChangeTable,
			_handleShowDeleteModal,
		} = this;

		return (
			<PageBlock>
				<Message
					visible={isRemoveModalVisible}
					title="提示"
					message="确定删除？"
					onClickCancel={() => this.setState({
						isRemoveModalVisible: false,
					})}
					onClickOk={_handleRemoveBetLimit}
				/>
				<div style={{ textAlign: 'right', marginBottom: 24 }}>
					<HeaderButtonBar
						left={[
							(
								<PageBlock.Title key="title" text="多期未中投注量设置" />
							),
						]}
						right={[
							(
								<Button
									color={Button.ColorEnums.BRIGHTBLUE500}
									icon="plus"
									onClick={() => onNavigate(LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_CREATE)}
									key="create"
								>
									新增投注限制条件
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
											overlayClassName="multiperiod-change-level-data__tooltip tooltip--betting"
											overlayColor={Tooltip.ColorEnums.WHITE}
										>
											{value[0]}...
										</Tooltip>
									</div>
								)
							},
							{
								title: '操作',
								render: (record) => (
									<div style={{ minWidth: 73 }}>
										<TextButton
											text="修改"
											color="default"
											onClick={() => onNavigate(LOTTERY_ODDS_SPECIAL_MULTIPERIOD_BETTING_EDIT)}
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
			</PageBlock>
		);
	}
	componentDidMount() {
		// TODO fetch betlimits
		this.setState({
			data: limitData
		});
	}

}

GameOddsMultiperiodBettingInfoPage.propTypes = propTypes;
GameOddsMultiperiodBettingInfoPage.defaultProps = defaultProps;

export default GameOddsMultiperiodBettingInfoPage;
