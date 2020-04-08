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
		};

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
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

	_renderContentFields() {
		return [
			<FormItem label="游戏時間" key={1} itemName="gameTime" columnType="medium">
				<DateRangePicker
					format={dateFormat}
					inputStyle={inputStyle}
					ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
				/>
			</FormItem>,
			<FormItem label="帐号" key={2} itemName="account" columnType="medium">
				<Input
					style={inputStyle}
					placeholder="请输入帐号"
				/>
			</FormItem>,
			<FormItem label="期号" key={3} itemName="term" columnType="medium">
				<Input
					style={inputStyle}
					placeholder="请输入期号"
				/>
			</FormItem>,
			<FormItem label="狀態" key={4} itemName="status" columnType="medium">
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
			<FormItem label="游戏名稱" key={5} itemName="gameName" columnType="medium">
				<Select
					style={inputStyle}
					options={[
						{ label: '所有游戏', value: 'all' },
						{ label: '重庆时时彩', value: 'type1' },
						{ label: '北京5分彩', value: 'type2' },
						{ label: '广东11选5', value: 'type3' },
					]}
					placeholder="请选择"
				/>
			</FormItem>,
			<FormItem label="游戏模式" key={6} itemName="gameMode" columnType="medium">
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
			<FormItem label="订单号" key={7} itemName="orderId" columnType="medium">
				<Input
					style={inputStyle}
					placeholder="请输入收款人"
				/>
			</FormItem>,
			<FormItem key={8} itemName="queryFromDatabase" itemConfig={{ initialValue: true, valuePropName: 'checked' }} style={{ 'margin': '0 5%' }}>
				<CheckBox
				>
					查询历史资料库
				</CheckBox>
			</FormItem>,
		];
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
			<FormItem label="帐号" key={2} itemName="account" columnType="medium">
				<Input
					style={inputStyle}
					placeholder="请输入帐号"
				/>
			</FormItem>,
		];
	}

	render() {
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
				expandChildren={this._renderContentFields()}
				collapseChildren={this._renderCollapsableFields()}
			/>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
