import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	FormItem,
	Input,
	Select,
	CheckBox,
	CollapsableForm,
	DateRangePicker,
} from 'ljit-react-components';

const { ColumnSizeEnums, CollapseTypeEnum, } = CollapsableForm;

const propTypes = {
	onSearch: PropTypes.func,
	onReset: PropTypes.func,
};

const defaultProps = {
	initialValues: {},
	onSearch: () => {},
	onReset: () => {},
};

const inputStyle = {
	'width': '100%',
};

const dateFormat = 'YYYY/M/DD hh:mm';

class SearchForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isExpand: true,
			type: '',
		};

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleTypeChange = this._handleTypeChange.bind(this);
		this._handleSpecialOption = this._handleSpecialOption.bind(this);
		this._renderContentFields = this._renderContentFields.bind(this);
		this._renderCollapsableFields = this._renderCollapsableFields.bind(this);
	}

	_handleSubmit() {
		const form = this.collapsableFormInstance.getForm();

		this.props.onSearch(form);
	}

	_handleReset() {
		const form = this.collapsableFormInstance.getForm();

		this.props.onReset(form);
	}

	_handleTypeChange(value) {
		this.setState({
			type: value,
		});
	}

	_handleSpecialOption(type) {
		switch (type) {
			case '提款':
				return [{ label: '全部', value: 'all' },{ label: '提款手续费', value: 'withdrawal fee' }];
			case '活动':
				return [{ label: '全部', value: 'all' },{ label: '首存优惠', value: 'first offer' },{ label: '存款优惠', value: 'deposit offer' }];
			default:
				return null;
		}
	}

	_renderContentFields(type) {
		const content = [
			<FormItem label="游戏時間" key={1} itemName="gameTime" columnType="medium">
				<DateRangePicker
					format={dateFormat}
					inputStyle={inputStyle}
					ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
				/>
			</FormItem>,
			<FormItem label="类型" key={2} itemName="type" columnType="medium">
				<Select
					style={inputStyle}
					options={[
						{ label: '全部', value: '全部' },
						{ label: '中奖', value: '中奖' },
						{ label: '充值', value: '充值' },
						{ label: '提款', value: '提款' },
						{ label: '撤单', value: '撤单' },
						{ label: '返点', value: '返点' },
						{ label: '活动', value: '活动' },
						{ label: '红利', value: '红利' },
						{ label: '转入', value: '转入' },
						{ label: '转出', value: '转出' },
						{ label: '投注', value: '投注' },
					]}
					onChange={(value) => this._handleTypeChange(value)}
				/>
			</FormItem>,
			<FormItem label="交易号" key={3} itemName="transactionId" columnType="medium">
				<Input
					style={inputStyle}
					placeholder=''
				/>
			</FormItem>,
			<FormItem label="帐号" key={4} itemName="account" columnType="medium">
				<Input
					style={inputStyle}
					placeholder="请输入帐号"
				/>
			</FormItem>,
			<FormItem label="IP" key={5} itemName="ip" columnType="medium">
				<Input
					style={inputStyle}
					placeholder="请输入IP"
				/>
			</FormItem>,
			<FormItem label="游戏奖期" key={6} itemName="term" columnType="medium">
				<Input
					style={inputStyle}
					disabled={true}
				/>
			</FormItem>,
			<FormItem label="狀態" key={7} itemName="status" columnType="medium">
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
			<FormItem label="订单号" key={8} itemName="orderId" columnType="medium">
				<Input
					style={inputStyle}
					placeholder="请输入收款人"
				/>
			</FormItem>,
			<FormItem label="游戏模式" key={9} itemName="gameMode" columnType="medium">
				<Select
					style={inputStyle}
					options={[
						{ label: '所有模式', value: null },
						{ label: '2元', value: '2元' },
						{ label: '1元', value: '1元' },
						{ label: '2角', value: '2角' },
						{ label: '1角', value: '1角' },
						{ label: '2分', value: '2分' },
						{ label: '2厘', value: '2厘' },
					]}
					placeholder="请选择"
				/>
			</FormItem>,
			<FormItem key={10} itemName="queryFromDatabase" itemConfig={{ initialValue: true, valuePropName: 'checked' }} style={{ 'margin': '0 5%' }}>
				<CheckBox
				>
					查询历史资料库
				</CheckBox>
			</FormItem>
		];
		const isHasSpecialFormItem = (type === '提款' || type === '活动');

		if (isHasSpecialFormItem) {
			content.splice(2,0,
				<FormItem label="备注" key={0} itemName="special" columnType="medium">
					<Select
						style={inputStyle}
						options={this._handleSpecialOption(this.state.type)}
					/>
				</FormItem>
			);
		}

		return content;
	}

	_renderCollapsableFields() {
		return [
			<FormItem label="游戏時間" key={1} itemName="gameTime" columnType="medium">
				<DateRangePicker
					format={dateFormat}
					inputStyle={inputStyle}
					ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
				/>
			</FormItem>,
			<FormItem label="类型" key={2} itemName="type" columnType="medium">
				<Select
					style={inputStyle}
					options={[
						{ label: '全部', value: '全部' },
						{ label: '中奖', value: '中奖' },
						{ label: '充值', value: '充值' },
						{ label: '提款', value: '提款' },
						{ label: '撤单', value: '撤单' },
						{ label: '返点', value: '返点' },
						{ label: '活动', value: '活动' },
						{ label: '红利', value: '红利' },
						{ label: '转入', value: '转入' },
						{ label: '转出', value: '转出' },
						{ label: '投注', value: '投注' },
					]}
					onChange={(value) => this._handleTypeChange(value)}
				/>
			</FormItem>,
		];
	}

	render() {
		const content = this._renderContentFields(this.state.type);
		const collaps = this._renderCollapsableFields();

		return (
			<CollapsableForm
				expand={this.state.isExpand}
				onSubmit={this._handleSubmit}
				onCancel={this._handleReset}
				submitText="查询"
				cancelText="重置"
				collapseType={CollapseTypeEnum.INSERTROW}
				columnSize={ColumnSizeEnums.SMALL}
				ref={(refForm) => this.collapsableFormInstance = refForm}
				expandChildren={content}
				collapseChildren={collaps}
			/>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
