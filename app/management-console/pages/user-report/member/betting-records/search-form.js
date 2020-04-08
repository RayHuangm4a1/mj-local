import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Input,
	Select,
	CollapsableForm,
	DateRangePicker,
	LabelContent,
	RemindText,
} from 'ljit-react-components';
import { GameTypeEnums, BettingRecordStatusEnum } from '../../../../lib/enums';
import { FieldEnums, } from './enums';
import { connect } from 'ljit-store-connecter';
import {
	lotteryClassesAndLotteriesActions,
	lotteryPlaysActions
} from '../../../../controller';
import { withLoadingStatusNotification, } from '../../../../../lib/notify-handler';
import { get, } from 'lodash';

const { fetchLotteryClassesAndLotteriesAction, } = lotteryClassesAndLotteriesActions;
const { fetchLotteryPlaysAction, } = lotteryPlaysActions;

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;
const { RangesEnums } = DateRangePicker;
const {
	TODAY,
	YESTERDAY,
	LAST_SEVEN_DAYS,
	LAST_THIRTY_DAYS,
} = RangesEnums;
const propTypes = {
	onSearch: PropTypes.func,
	onReset: PropTypes.func,
	onChangeGameType: PropTypes.func,
	gameType: PropTypes.string,
	lotteriesData: PropTypes.array,
	lotteryPlaysData: PropTypes.array,
	fetchLotteryClassesAndLotteriesAction: PropTypes.func.isRequired,
	fetchLotteryPlaysAction: PropTypes.func.isRequired,
};
const defaultProps = {
	initialValues: {},
	onSearch: () => {},
	onReset: () => {},
	onChangeGameType: () => {},
	lotteriesData: [],
	lotteryPlaysData: [],
};

const dateFormat = 'YYYY/MM/DD';
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
const {
	WIN,
	LOSE,
	DRAW,
	CANCELED,
	NOT_OPENED,
	OPENING
} = BettingRecordStatusEnum;

function getFormItemsConfig(gameType = '') {
	switch (gameType) {
		case GameTypeEnums.LOTTERY:
			return {
				FieldsConfigs: [
					GAMETYPE,
					LOTTERY,
					PLAY,
					TIME,
					USERNAME,
					IP,
					STATUS,
					TRANSACTION_ID,
					ISSUE,
				],
			};
		case GameTypeEnums.VRLIVELOTTERY:
			return {
				FieldsConfigs: [
					GAMETYPE,
					TIME,
					ACCOUNT,
					USERNAME,
					STATUS,
					TRANSACTION_ID,
					IP,
					LOTTERY_PLAY,
				],
			};
		case GameTypeEnums.TREASURE:
			return {
				FieldsConfigs:[ GAMETYPE, TIME, USERNAME, ],
			};
		default:
			return {
				FieldsConfigs: [
					GAMETYPE,
					GAMENAME,
					USERNAME,
					TIME,
					REPORTTIME,
				],
			};
	}
}

class SearchForm extends Component {
	constructor() {
		super();
		this.state = {
			isExpand: true,
		};

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleChangeGameType = this._handleChangeGameType.bind(this);
		this._handleChangeLottery = this._handleChangeLottery.bind(this);
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
		const { onReset } = this.props;

		onReset();
		form.resetFields();
	}

	_handleChangeGameType(gameType) {
		const form = this.collapsableFormInstance.getForm();
		const { onChangeGameType, } = this.props;

		onChangeGameType(gameType);
		form.resetFields();
	}
	_handleChangeLottery(lotteryId) {
		const { fetchLotteryPlaysAction, } = this.props;

		fetchLotteryPlaysAction(lotteryId);
	}

	_getFormItem(type, key) {
		const { _handleChangeLottery, } = this;
		const { lotteriesData, lotteryPlaysData, gameType, } = this.props;

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
					<LabelContent label="类型" key={key} itemName="gameType" columnType="medium">
						<Select
							value={gameType}
							options={gameTypeOptions}
							onChange={(value) => this._handleChangeGameType(value)}
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
				const lotteryOptions = lotteriesData.map(lottery => {
					return { label: lottery.name, value: lottery.id, };
				});

				return (
					<FormItem label="彩种" key={key} itemName="lotteryId" columnType="medium">
						<Select
							options={lotteryOptions}
							placeholder="请选择"
							onChange={_handleChangeLottery}
						/>
					</FormItem>
				);
			}
			case PLAY: {
				//TODO add new reducer to store PlaysData, use that to generate options.
				const playOptions = lotteryPlaysData.map(play => {
					const playConditionName = get(play, ['playCondition', 'name']);

					return { label: playConditionName + play.name, value: play.id, };
				});

				return (
					<FormItem label="玩法" key={key} itemName="playId" columnType="medium">
						{/* TODO add input search selecter,  https://ant.design/components/select/#components-select-demo-search-box*/}
						<Select
							options={playOptions}
							placeholder="请选择"
						/>
					</FormItem>
				);
			}
			case LOTTERY_PLAY: {
				return (
					<FormItem label="彩种玩法" key={key} itemName="lotteryPlayId" columnType="medium">
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
					<FormItem label="IP" key={key} itemName="ip" columnType="medium">
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
					<FormItem label="期号" key={key} itemName="issue" columnType="medium">
						<Input
							placeholder="请输入期号"
						/>
					</FormItem>
				);
			case GAMENAME:
				return (
					<FormItem label="游戏名称" key={key} itemName="gameName" columnType="medium">
						<Select
							// TODO add game options
							options={[]}
							placeholder="请选择游戏"
						/>
					</FormItem>
				);
			default:
				return;
		}
	}

	_renderContentFields(gameType) {
		const fieldItems = getFormItemsConfig(gameType);

		if (fieldItems.FieldsConfigs) {
			return fieldItems.FieldsConfigs.map((item, key) => this._getFormItem(item, key));
		} else {
			return [];
		}
	}

	_renderCollapsedFields() {
		const { _getFormItem, } = this;
		const { gameType, } = this.props;
		const { GAMETYPE, TIME, LOTTERY, } = FieldEnums;

		return [
			_getFormItem(GAMETYPE),
			_getFormItem(gameType === GameTypeEnums.LOTTERY? LOTTERY: TIME),
		];
	}

	_renderRemindText() {
		const { gameType, } = this.props;

		if (gameType === GameTypeEnums.LOTTERY) {
			return <RemindText text="注意事项：查询时玩法/帐号/交易号/期号的栏位需至少填入一项"/>;
		}
	}
	render() {
		const { gameType, } = this.props;
		const { isExpand } = this.state;
		const {
			_handleSubmit,
			_handleReset,
			_renderContentFields,
			_renderCollapsedFields,
			_renderRemindText,
		} = this;
		const content = _renderContentFields(gameType);
		const collaps = _renderCollapsedFields(content);

		return (
			<div className="user-report-betting-records__search-form">
				<CollapsableForm
					expand={isExpand}
					onSubmit={_handleSubmit}
					onCancel={_handleReset}
					submitText="查询"
					cancelText="重置"
					collapseType={CollapseTypeEnum.INSERTROW}
					columnSize={ColumnSizeEnums.SMALL}
					ref={(refForm) => this.collapsableFormInstance = refForm}
					expandChildren={content}
					collapseChildren={collaps}
				>
				</CollapsableForm>
				{_renderRemindText()}
			</div>
		);
	}

	componentDidMount() {
		this.props.fetchLotteryClassesAndLotteriesAction();
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		lotteriesData: state.lotteryClassesAndLotteries.get('lotteries').toArray(),
		// TODO use other reducer store data.
		lotteryPlaysData: state.lotteryPlays.get('plays').toArray(),
		lotteryClassesAndLotteriesLoadingStatus: state.lotteryClassesAndLotteries.get('loadingStatus'),
		lotteryClassesAndLotteriesLoadingStatusMessage: state.lotteryClassesAndLotteries.get('loadingStatusMessage'),
		lotteryPlaysLoadingStatus: state.lotteryPlays.get('loadingStatus'),
		lotteryPlaysLoadingStatusMessage: state.lotteryPlays.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO add other action to get all plays.
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
	SearchForm
));
