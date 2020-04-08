import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Button,
	Notify,
} from 'ljit-react-components';
import SelectDropdown from '../../../../components/select-dropdown';
import ClientDateRangePicker from '../../../../features/client-date-range-picker';
import LotteryTable from './lottery-table';
import ThirdPartyTable from './third-party-table';
import { connect, } from 'ljit-store-connecter';
import { userStatsActions, } from '../../../../controller';
import { DATE, convertDateStringToTimestamp, } from '../../../../../lib/moment-utils';
import {
	PREFIX_CLASS,
	generateDataWithTotal,
	GameTypeEnums,
	isLotteryGameType,
} from './utils';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import './style.styl';

const {
	fetchUserStatsAction,
} = userStatsActions;

const { LOTTERY, THIRD_PARTY, } = GameTypeEnums;

const {
	NONE,
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;
const { RangesEnums } = ClientDateRangePicker;
const {
	TODAY,
	YESTERDAY,
	THIS_WEEK,
} = RangesEnums;
const propTypes = {
	userStatsData: PropTypes.arrayOf(PropTypes.shape({
		activityAmount: PropTypes.number,
		bettingAmount: PropTypes.number,
		bettingReward: PropTypes.number,
		createdAt: PropTypes.string,
		date: PropTypes.string,
		depositAmount: PropTypes.number,
		dividendAmount: PropTypes.number,
		fixedWageAmount: PropTypes.number,
		id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
		rebateAmount: PropTypes.number,
		updatedAt: PropTypes.string,
		userId: PropTypes.number,
		username: PropTypes.string,
		walletCode: PropTypes.number,
		withdrawalAmount: PropTypes.number,
		incentiveAmount: PropTypes.number,
	})),
	// TODO add third party data
	loadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]),
	loadingStatusMessage: PropTypes.string,
	fetchUserStatsAction: PropTypes.func.isRequired,
};

class MemberReportPage extends Component {
	constructor() {
		super();
		this.state = {
			hasSearched: false,
			gameType: LOTTERY,
			gameOptions: [
				{
					label: '彩票报表',
					value: LOTTERY
				},
				{
					label: '娱乐报表',
					value: THIRD_PARTY
				}
			],
			thirdPartyPlatformValue: 'all',
			// TODO get third party platform options data from api
			thirdPartyPlatformOptions: [{
				label: '全部',
				value: 'all'
			},{
				label: 'CQ報表',
				value: '0'
			},{
				label: 'LV報表',
				value: '1'
			},{
				label: 'MW報表',
				value: '2'
			},{
				label: 'PP報表',
				value: '3'
			},{
				label: 'HC報表',
				value: '4'
			},{
				label: 'JDB報表',
				value: '5'
			},{
				label: 'SA報表',
				value: '6'
			},{
				label: 'QZ報表',
				value: '7'
			},{
				label: 'UG報表',
				value: '8'
			},{
				label: 'KY報表',
				value: '9'
			},{
				label: 'CMD報表',
				value: '10'
			},{
				label: 'GAMMA報表',
				value: '11'
			}],
			// TODO remove dataSource after get thirdParty data from reducer
			dataSource: [],
		};
		this._handleChangeGameType = this._handleChangeGameType.bind(this);
		this._renderThirdPartyPlatformSelect = this._renderThirdPartyPlatformSelect.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._renderLotteryTable = this._renderLotteryTable.bind(this);
		this._renderThirdPartyTable = this._renderThirdPartyTable.bind(this);
		this._renderTable = this._renderTable.bind(this);
	}
	_handleChangeGameType(gameType) {
		this.setState({
			gameType,
		});
	}
	_renderThirdPartyPlatformSelect() {
		const { gameType, thirdPartyPlatformValue, thirdPartyPlatformOptions, } = this.state;

		if (!isLotteryGameType(gameType)) {
			return (
				<FormItem
					itemName="platform"
					label="平台"
					labelColon={false}
					itemConfig={{
						initialValue: thirdPartyPlatformValue
					}}
				>
					<SelectDropdown
						className={`${PREFIX_CLASS}__select-dropdown`}
						options={thirdPartyPlatformOptions}
					/>
				</FormItem>
			);
		}
	}
	_handleSearch() {
		const { fetchUserStatsAction, } = this.props;
		const form = this.formInstance.getForm();

		form.validateFields((err, values) => {
			if (!err) {
				const { gameType, fromTo, } = values;
				const fromToArrayLength = 2;
				let from = null;
				let to = null;

				if (fromTo && fromTo.length === fromToArrayLength) {
					from = convertDateStringToTimestamp(fromTo[0]);
					to = convertDateStringToTimestamp(fromTo[1]);
				}
				if (isLotteryGameType(gameType)) {
					fetchUserStatsAction({ from, to, });
				} else {
					// TODO replace to dispatch get API action
					this.setState({
						dataSource: generateDataWithTotal(fakeEntertainmentReportDatas, fakeTotalEntertainmentData),
					});
				}
				this.setState({
					gameType,
					hasSearched: true,
				});
			}
		});
	}
	_handleChangeTable(pagination, filters, sorter) {
		// TODO dispatch action to update childrenUsersData
	}
	_renderLotteryTable() {
		const { userStatsData, loadingStatus, } = this.props;
		const { _handleChangeTable, } = this;

		return (
			<LotteryTable
				isLoading={loadingStatus === LOADING}
				dataSource={userStatsData}
				onTableChange={_handleChangeTable}
			/>
		);
	}
	_renderThirdPartyTable() {
		const { dataSource } = this.state;
		const { _handleChangeTable, } = this;

		return (
			<ThirdPartyTable
				dataSource={dataSource}
				onTableChange={_handleChangeTable}
			/>
		);
	}
	_renderTable() {
		const { hasSearched, gameType, } = this.state;
		const { _renderLotteryTable, _renderThirdPartyTable, } = this;

		if (!hasSearched) {
			return null;
		}
		if (isLotteryGameType(gameType)) {
			return _renderLotteryTable();
		}
		return _renderThirdPartyTable();
	}
	render() {
		const { loadingStatus, } = this.props;
		const { gameType, gameOptions, } = this.state;
		const {
			_handleChangeGameType,
			_handleSearch,
			_renderThirdPartyPlatformSelect,
			_renderTable,
		} = this;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__header`}>
					<Form
						cancelButtonDisabled
						submitButtonDisabled
						ref={(refForm) => this.formInstance = refForm}
					>
						<FormItem
							itemName="gameType"
							label="游戏"
							labelColon={false}
							itemConfig={{
								initialValue: gameType
							}}
						>
							<SelectDropdown
								className={`${PREFIX_CLASS}__select-dropdown`}
								options={gameOptions}
								onChange={_handleChangeGameType}
							/>
						</FormItem>
						{_renderThirdPartyPlatformSelect()}
						<FormItem
							label="时间"
							itemName="fromTo"
							labelColon={false}
						>
							<ClientDateRangePicker
								inputStyle={{ width: '310px', }}
								ranges={[TODAY, YESTERDAY]}
								format={DATE}
							/>
						</FormItem>
						<Button
							outline={Button.OutlineEnums.SOLID}
							color={Button.ColorEnums.ORANGE}
							onClick={_handleSearch}
							disabled={loadingStatus === LOADING}
						>
							查询
						</Button>
					</Form>
				</div>
				{_renderTable()}
			</div>
		);
	}
	componentDidUpdate(prevProps) {
		const {
			loadingStatus,
			loadingStatusMessage,
		} = this.props;

		// TODO remove error notify after error notify middleware is merged
		if (prevProps.loadingStatus === LOADING && loadingStatus === FAILED) {
			Notify.error(loadingStatusMessage, 5000);
		}
	}
}

MemberReportPage.propTypes = propTypes;
function mapStateToProps(state) {
	return {
		// TODO get data from reducer
		userStatsData: state.userStats.get('data').toArray(),
		loadingStatus: state.userSecurity.get('loadingStatus'),
		loadingStatusMessage: state.userSecurity.get('loadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		// TODO post data for API
		fetchUserStatsAction: (...args) => dispatch(fetchUserStatsAction(...args)),
	};
}
export default connect(mapStateToProps, mapDispatchToProps)(MemberReportPage);

// TODO 確認資料欄位名稱
const fakeEntertainmentReportDatas = [
	{
		date: '2019/08/03',
		transferIn: 100,
		transferOut: 581.356,
		consumption: 195.363,
		betting: 0,
		yesterdayBalance: 0,
		currentBalance: 0,
		profit: 2.56,
	},
	{
		date: '2019/08/02',
		transferIn: 99,
		transferOut: 580.356,
		consumption: 194.363,
		betting: 1,
		yesterdayBalance: 1,
		currentBalance: 1,
		profit: 3.56,
	},
];

const fakeTotalEntertainmentData = {
	transferIn: 0,
	transferOut: 581.356,
	consumption: 195.363,
	betting: 0,
	yesterdayBalance: 0,
	currentBalance: 0,
	profit: 2.56,
};
