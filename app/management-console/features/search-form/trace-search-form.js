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
} from 'ljit-react-components';
import {
	lotteryClassesAndLotteriesActions,
	lotteryPlaysActions,
} from '../../controller';
import { withLoadingStatusNotification, } from '../../../lib/notify-handler';

const { fetchLotteryClassesAndLotteriesAction, } = lotteryClassesAndLotteriesActions;
const { fetchLotteryPlaysAction, } = lotteryPlaysActions;

const propTypes = {
	onClickSearch: PropTypes.func,
	onClickReset: PropTypes.func,
	lotteriesData: PropTypes.array,
	lotteryPlaysData: PropTypes.array,
	issue: PropTypes.number,
	lotteryId: PropTypes.number,
	fetchLotteryClassesAndLotteriesAction: PropTypes.func.isRequired,
	fetchLotteryPlaysAction: PropTypes.func.isRequired,
};
const defaultProps = {
	onClickSearch: () => {},
	onClickReset: () => {},
};

const dateFormat = 'YYYY/M/DD hh:mm';

const inputStyle= {
	width: '100%',
};

const collapseItemsLength = 2;

class TraceSearchFrom extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleChangeLottery = this._handleChangeLottery.bind(this);
		this._handleFilterOption = this._handleFilterOption.bind(this);
		this._renderFieldItems = this._renderFieldItems.bind(this);
		this._renderCollapsableContentFields = this._renderCollapsableContentFields.bind(this);
	}
	_handleSubmit() {
		const { onClickSearch } = this.props;
		const form = this.formInstance.getForm();
		const { validateFields, } = form;

		validateFields((error, values) => {
			if (!error) {
				onClickSearch(values);
			}
		});
	}
	_handleReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}
	_handleChangeLottery(lotteryId) {
		const {
			props,
			formInstance,
		} = this;
		const form = formInstance.getForm();

		props.fetchLotteryPlaysAction(lotteryId);
		form.setFieldsValue({ playId: undefined, });
	}
	_handleFilterOption(value, option) {
		const lowerCaseValue = value.toLowerCase();
		const lowerCaseChildren = option.props.children.toLowerCase();

		return lowerCaseChildren.indexOf(lowerCaseValue) > -1;
	}
	_renderFieldItems() {
		const {
			props,
			_handleChangeLottery,
			_handleFilterOption,
		} = this;
		const {
			issue,
			lotteryId,
			lotteriesData,
			lotteryPlaysData,
		} = props;
		const lotteryOptions = getLotteryOptions(lotteriesData);
		const playOptions = getPlayOptions(lotteryPlaysData);

		return [
			<FormItem
				key="gameTime"
				label="时间"
				itemName="gameTime"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<DateRangePicker
					format={dateFormat}
					inputStyle={inputStyle}
					ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
				/>
			</FormItem>,
			<FormItem
				key="username"
				label="帐号"
				itemName="username"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Input
					style={inputStyle}
					placeholder="请输入帐号"
				/>
			</FormItem>,
			<FormItem
				key="issue"
				label="期号"
				itemName="issue"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemConfig={{
					initialValue: issue,
				}}
			>
				<Input
					style={inputStyle}
					placeholder="请输入期号"
				/>
			</FormItem>,
			<FormItem
				key="status"
				label="狀態"
				itemName="status"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Select
					style={inputStyle}
					options={[
						{ label: '中獎', value: 'win' },
						{ label: '未中獎', value: 'lose' },
						{ label: '已撤單', value: 'remove' },
						{ label: '未開獎', value: 'pending' },
					]}
					placeholder="请选择"
				/>
			</FormItem>,
			<FormItem
				key="lotteryId"
				label="彩种"
				itemName="lotteryId"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemConfig={{
					initialValue: lotteryId,
				}}
			>
				<Select
					style={inputStyle}
					options={lotteryOptions}
					placeholder="请选择"
					onChange={_handleChangeLottery}
					isShowSearch
					filterOption={_handleFilterOption}
				/>
			</FormItem>,
			<FormItem
				key="playId"
				label="玩法"
				itemName="playId"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Select
					style={inputStyle}
					options={playOptions}
					placeholder="请选择"
					isShowSearch
					filterOption={_handleFilterOption}
				/>
			</FormItem>,
			<FormItem
				key="orderId"
				label="編号"
				itemName="orderId"
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
			>
				<Input
					style={inputStyle}
					placeholder="请输入追号编号"
				/>
			</FormItem>,
		];
	}

	_renderCollapsableContentFields(fieldItemList) {
		return fieldItemList.slice(0, collapseItemsLength);
	}

	render() {
		const {
			_handleSubmit,
			_handleReset,
			_renderFieldItems,
			_renderCollapsableContentFields,
		} = this;
		const expandChildren = _renderFieldItems();

		return (
			<div className="trace-records__search-form">
				<CollapsableForm
					expand
					submitText="查询"
					cancelText="重置"
					onSubmit={_handleSubmit}
					onCancel={_handleReset}
					collapseType={CollapsableForm.CollapseTypeEnum.INSERTROW}
					ref={(refForm) => this.formInstance = refForm}
					expandChildren={expandChildren}
					collapseChildren={_renderCollapsableContentFields(expandChildren)}
				/>
				<RemindText text="注意事项：查询时玩法/帐号/交易号/期号的栏位需至少填入一项"/>
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

function getLotteryOptions(lotteriesData) {
	return lotteriesData.map(lottery => ({ label: lottery.name, value: lottery.id, }));
}

function getPlayOptions(lotteryPlaysData) {
	return lotteryPlaysData.map(play => {
		const playConditionName = get(play, ['playCondition', 'name']);

		return { label: playConditionName + play.name, value: play.id, };
	});
}

TraceSearchFrom.propTypes = propTypes;
TraceSearchFrom.defaultProps = defaultProps;

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
	TraceSearchFrom
));
