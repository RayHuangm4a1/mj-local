import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { get, } from 'lodash';
import {
	FormItem,
	Input,
	Select,
	DateRangePicker,
	CollapsableForm,
	RemindText,
	LabelContent,
} from 'ljit-react-components';
import {
	lotteryClassesAndLotteriesActions,
	lotteryPlaysActions
} from '../../controller';
import { withLoadingStatusNotification, } from '../../../lib/notify-handler';
import {
	GameTypeEnums,
	BettingRecordStatusEnum,
} from '../../lib/enums';
import {
	getBettingSearchFormFields,
	FieldEnums,
} from './item-config';

const { fetchLotteryClassesAndLotteriesAction, } = lotteryClassesAndLotteriesActions;
const { fetchLotteryPlaysAction, } = lotteryPlaysActions;
const {
	ColumnSizeEnums,
	CollapseTypeEnum,
} = CollapsableForm;
const { RangesEnums, } = DateRangePicker;
const {
	TODAY,
	YESTERDAY,
	LAST_SEVEN_DAYS,
	LAST_THIRTY_DAYS,
} = RangesEnums;
const dateFormat = 'YYYY/M/DD hh:mm';

const propTypes = {
	onSearch: PropTypes.func,
	onChangeGameType: PropTypes.func,
	gameType: PropTypes.string,
	issue: PropTypes.number,
	lotteryId: PropTypes.number,
	lotteriesData: PropTypes.array,
	lotteryPlaysData: PropTypes.array,
	fetchLotteryClassesAndLotteriesAction: PropTypes.func.isRequired,
	fetchLotteryPlaysAction: PropTypes.func.isRequired,
};

const defaultProps = {
	onSearch: () => {},
	onChangeGameType: () => {},
	lotteriesData: [],
	lotteryPlaysData: [],
};

const {
	WIN,
	LOSE,
	DRAW,
	CANCELED,
	NOT_OPENED,
	OPENING
} = BettingRecordStatusEnum;

const {
	TIME,
	GAMETYPE,
	USERNAME,
	GAMENAME,
	LOTTERY,
	PLAY,
	REPORTTIME,
	IP,
	STATUS,
	TRANSACTION_ID,
	ISSUE,
	ACCOUNT,
	LOTTERY_PLAY,
} = FieldEnums;

class BettingSearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isExpand: true,
		};
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleChangeGameType = this._handleChangeGameType.bind(this);
		this._handleChangeLottery = this._handleChangeLottery.bind(this);
		this._handleFilterOption = this._handleFilterOption.bind(this);
		this._getFormItem = this._getFormItem.bind(this);
		this._renderContentFields = this._renderContentFields.bind(this);
		this._renderCollapsedFields = this._renderCollapsedFields.bind(this);
		this._renderRemindText = this._renderRemindText.bind(this);
	}
	_handleSubmit() {
		const form = this.collapsableFormInstance.getForm();
		const { onSearch, } = this.props;

		form.validateFields((error, values) => {
			if (!error) {
				onSearch(values);
			}
		});
	}
	_handleReset() {
		const form = this.collapsableFormInstance.getForm();

		form.resetFields();
	}
	_handleChangeGameType(gameType) {
		const form = this.collapsableFormInstance.getForm();
		const { onChangeGameType, } = this.props;

		onChangeGameType(gameType);
		form.resetFields();
	}
	_handleChangeLottery(lotteryId) {
		const {
			props,
			collapsableFormInstance,
		} = this;
		const form = collapsableFormInstance.getForm();

		props.fetchLotteryPlaysAction(lotteryId);
		form.setFieldsValue({ playId: undefined, });
	}
	_handleFilterOption(value, option) {
		const lowerCaseValue = value.toLowerCase();
		const lowerCaseChildren = option.props.children.toLowerCase();

		return lowerCaseChildren.indexOf(lowerCaseValue) > -1;
	}
	_getFormItem(type, key) {
		const {
			props,
			_handleChangeLottery,
			_handleChangeGameType,
			_handleFilterOption,
		} = this;
		const {
			lotteriesData,
			lotteryPlaysData,
			issue,
			lotteryId,
			gameType,
		} = props;

		switch (type) {
			case TIME:
				return (
					<FormItem label="時間" key={key} itemName="fromTo" columnType="medium">
						<DateRangePicker
							format={dateFormat}
							inputStyle={{ width: '100%', }}
							ranges={[
								TODAY,
								YESTERDAY,
								LAST_SEVEN_DAYS,
								LAST_THIRTY_DAYS,
							]}
						/>
					</FormItem>
				);
			case GAMETYPE: {
				const gameTypeOptions = Object.keys(GameTypeEnums).map(gameType => {
					return { label: GameTypeEnums[gameType], value: GameTypeEnums[gameType], };
				});

				return (
					<LabelContent label="类型" key={key} itemName="gameType" columnType="medium" itemConfig={{ initialValue: gameType, }}>
						<Select
							value={gameType}
							options={gameTypeOptions}
							onChange={(value) => _handleChangeGameType(value)}
							isShowSearch
							filterOption={_handleFilterOption}
						/>
					</LabelContent>
				);
			}
			case USERNAME:
				return (
					<FormItem label="帐号" key={key} itemName="username" columnType="medium">
						<Input
							placeholder="请输入帐号"
						/>
					</FormItem>
				);
			case ACCOUNT:
				return (
					<FormItem label="用戶名" key={key} itemName="account" columnType="medium">
						<Input
							placeholder="请输入用戶名"
						/>
					</FormItem>
				);
			case LOTTERY: {
				const lotteryOptions = lotteriesData.map(lottery => ({ label: lottery.name, value: lottery.id, }));

				return (
					<FormItem label="彩种" key={key} itemName="lotteryId" columnType="medium" itemConfig={{ initialValue: lotteryId, }}>
						<Select
							options={lotteryOptions}
							placeholder="请选择"
							onChange={_handleChangeLottery}
							isShowSearch
							filterOption={_handleFilterOption}
						/>
					</FormItem>
				);
			}
			case PLAY: {
				const playOptions = lotteryPlaysData.map(play => {
					const playConditionName = get(play, ['playCondition', 'name']);

					return { label: playConditionName + play.name, value: play.id, };
				});

				return (
					<FormItem label="玩法" key={key} itemName="playId" columnType="medium">
						<Select
							options={playOptions}
							placeholder="请选择"
							isShowSearch
							filterOption={_handleFilterOption}
						/>
					</FormItem>
				);
			}
			case LOTTERY_PLAY: {
				return (
					<FormItem label="彩种玩法" key={key} itemName="lotteryPlayId" columnType="medium" >
						<Select
							options={[]}
							placeholder="请选择"
						/>
					</FormItem>
				);
			}
			case REPORTTIME:
				return (
					<FormItem label="报表日期" key={key} itemName="reportTime" columnType="medium">
						<DateRangePicker
							format={dateFormat}
							inputStyle={{ width: '100%', }}
							ranges={[
								TODAY,
								YESTERDAY,
								LAST_SEVEN_DAYS,
								LAST_THIRTY_DAYS,
							]}
						/>
					</FormItem>
				);
			case IP:
				return (
					<FormItem label="IP" key={key} itemName="ip" columnType="medium" >
						<Input
							placeholder="请输入IP"
						/>
					</FormItem>
				);
			case STATUS:
				return (
					<FormItem label="狀態" key={key} itemName="status" columnType="medium">
						<Select
							options={[
								{ label: '中獎', value: WIN },
								{ label: '未中獎', value: LOSE },
								{ label: '开奖中', value: OPENING },
								{ label: '未开奖', value: NOT_OPENED },
								{ label: '平局', value: DRAW },
								{ label: '已撤单', value: CANCELED },
							]}
							placeholder="请选择"
						/>
					</FormItem>
				);
			case TRANSACTION_ID:
				return (
					<FormItem label="交易号" key={key} itemName="id" columnType="medium">
						<Input
							placeholder="请输入交易号"
						/>
					</FormItem>
				);
			case ISSUE:
				return (
					<FormItem label="期号" key={key} itemName="issue" columnType="medium" itemConfig={{ initialValue: issue, }}>
						<Input
							placeholder="请输入期号"
						/>
					</FormItem>
				);
			case GAMENAME:
				return (
					<FormItem label="游戏名称" key={key} itemName="gameName" columnType="medium" >
						<Select
							options={[]}
							placeholder="请选择游戏"
						/>
					</FormItem>
				);
			default:
				return null;
		}
	}
	_renderContentFields(gameType) {
		const fieldItems = getBettingSearchFormFields(gameType);

		if (Array.isArray(fieldItems)) {
			return fieldItems.map((type, key) => this._getFormItem(type, key));
		} else {
			return [];
		}
	}
	_renderCollapsedFields() {
		const {
			props,
			_getFormItem,
		} = this;

		return [
			_getFormItem(GAMETYPE),
			_getFormItem(props.gameType === GameTypeEnums.LOTTERY ? LOTTERY : TIME),
		];
	}
	_renderRemindText() {
		const { gameType, } = this.props;

		if (gameType === GameTypeEnums.LOTTERY) {
			return <RemindText text="注意事项：查询时玩法/帐号/交易号/期号的栏位需至少填入一项"/>;
		}
		return null;
	}
	render() {
		const {
			props,
			state,
			_handleSubmit,
			_handleReset,
			_renderContentFields,
			_renderCollapsedFields,
			_renderRemindText,
		} = this;
		const content = _renderContentFields(props.gameType);
		const collapses = _renderCollapsedFields();

		return (
			<div className="betting-records__search-form">
				<CollapsableForm
					expand={state.isExpand}
					onSubmit={_handleSubmit}
					onCancel={_handleReset}
					submitText="查询"
					cancelText="重置"
					collapseType={CollapseTypeEnum.INSERTROW}
					columnSize={ColumnSizeEnums.SMALL}
					ref={(refForm) => this.collapsableFormInstance = refForm}
					expandChildren={content}
					collapseChildren={collapses}
				/>
				{_renderRemindText()}
			</div>
		);
	}

	componentDidMount() {
		const {
			lotteryId,
			fetchLotteryClassesAndLotteriesAction,
			fetchLotteryPlaysAction,
		} = this.props;
		const canFetchLotteryPlays = !!lotteryId;

		fetchLotteryClassesAndLotteriesAction();
		if (canFetchLotteryPlays) {
			fetchLotteryPlaysAction(lotteryId);
		}
	}
}

BettingSearchForm.propTypes = propTypes;
BettingSearchForm.defaultProps = defaultProps;

// TODO 補上 gameName option
function mapStateToProps(state) {
	return {
		lotteriesData: state.lotteryClassesAndLotteries.get('lotteries').toArray(),
		lotteryPlaysData: state.lotteryPlays.get('plays').toArray(),
		lotteryClassesAndLotteriesLoadingStatus: state.lotteryClassesAndLotteries.get('loadingStatus'),
		lotteryClassesAndLotteriesLoadingStatusMessage: state.lotteryClassesAndLotteries.get('loadingStatusMessage'),
		lotteryPlaysLoadingStatus: state.lotteryPlays.get('loadingStatus'),
		lotteryPlaysLoadingStatusMessage: state.lotteryPlays.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchLotteryClassesAndLotteriesAction: () => dispatch(fetchLotteryClassesAndLotteriesAction()),
		fetchLotteryPlaysAction: (lotteryId) => dispatch(fetchLotteryPlaysAction(lotteryId))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'lotteryClassesAndLotteriesLoadingStatus',
			loadingStatusMessage: 'lotteryClassesAndLotteriesLoadingStatusMessage',
		},
		{
			loadingStatus: 'lotteryPlaysLoadingStatus',
			loadingStatusMessage: 'lotteryPlaysLoadingStatusMessage',
		},
	],
	BettingSearchForm
));
