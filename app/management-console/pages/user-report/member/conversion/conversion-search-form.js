import React, { Component } from 'react';
import {
	FormItem,
	Input,
	Select,
	CollapsableForm,
	DatePicker,
	CheckBox
} from 'ljit-react-components';
import PropTypes from 'prop-types';

const propTypes = {
	onSubmit: PropTypes.func,
	onClickReset: PropTypes.func,
};
const defaultProps = {
	onSubmit: () => {},
	onClickReset: () => {},
};

class ConversionSearchForm extends Component {
	constructor() {
		super();
		this.state = {
			isCheckHistoryDataBase: false,
		};

		this._handleOnClickSubmit = this._handleOnClickSubmit.bind(this);
		this._handleOnClickReset = this._handleOnClickReset.bind(this);
		this._handleCollapsableFormChange = this._handleCollapsableFormChange.bind(this);
		this._renderFields = this._renderFields.bind(this);
	}
	_handleCollapsableFormChange(allValues) {
		this.setState({
			isCheckHistoryDataBase: allValues.isCheckHistoryDataBase
		});
	}
	_handleOnClickSubmit(e) {
		e.preventDefault();
		const form = this.collapsableFormInstance.getForm();
		const { onSubmit } = this.props;

		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				onSubmit(values);
			}
		});
	}
	_handleOnClickReset() {
		const form = this.collapsableFormInstance.getForm();
		const { onClickReset } = this.props;

		form.resetFields();
		onClickReset();
	}
	_renderFields(type = "expand") {
		const { isCheckHistoryDataBase } = this.state;
		const accountItem = (
			<FormItem
				label={"帐号"}
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemName={"account"}
				className={"conversion-result__item conversion-result__item--align-start"}
			>
				<Input
					style={{ width: "100%" }}
					placeholder="请输入帐号"
				/>
			</FormItem>
		);
		const plateformItem = (
			<FormItem
				label={"平台"}
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemName={"plateform"}
				className={"conversion-result__item conversion-result__item--align-middle"}
			>
				<Select
					// TODO get options
					style={{ width: "100%" }}
					placeholder={"请选择"}
				/>
			</FormItem>
		);
		const typeItem = (
			<FormItem
				label={"類型"}
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemName={"type"}
				className={"conversion-result__item"}
			>
				<Select
					// TODO get options
					style={{ width: "100%" }}
					placeholder={"请选择"}
				/>
			</FormItem>
		);
		const statusItem = (
			<FormItem
				label={"狀態"}
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemName={"status"}
				className={"conversion-result__item conversion-result__item--align-start"}
			>
				<Select
					// TODO get options
					style={{ width: "100%" }}
					placeholder={"请选择"}
				/>
			</FormItem>
		);
		const dateItem = (
			<FormItem
				label={"查詢時間"}
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemName={"date"}
				className={"conversion-result__item conversion-result__item--align-middle"}
			>
				<DatePicker
					style={{ width: "100%"  }}
					placeholder=""
					format={'YYYY/MM/DD'}
				/>
			</FormItem>
		);
		const operatorItem = (
			<FormItem
				label={"操作者"}
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemName={"operator"}
				className={"conversion-result__item"}
			>
				<Input
					style={{ width: "100%" }}
				/>
			</FormItem>
		);
		const checkHistoryDataBaseItem = (
			<FormItem
				columnType={FormItem.ColumnTypeEnums.MEDIUM}
				itemName={"isCheckHistoryDataBase"}
				itemConfig={{ initialValue: false, }}
				className={"conversion-result__item"}
			>
				<CheckBox style={{ width: "100%" }} checked={isCheckHistoryDataBase}>
					查询历史资料库
				</CheckBox>
			</FormItem>
		);

		if (type === "expand") {
			return (
				[
					accountItem,
					plateformItem,
					typeItem,
					statusItem,
					dateItem,
					operatorItem,
					checkHistoryDataBaseItem,
				]
			);
		} else {
			return (
				[
					accountItem,
					plateformItem,
				]
			);
		}
	}

	render() {
		const {
			_handleOnClickSubmit,
			_handleOnClickReset,
			_handleCollapsableFormChange,
			_renderFields,
		} = this;
		const expandFields = _renderFields("expand");
		const collapseFields =_renderFields("collapse");

		return (
			<CollapsableForm
				expand={true}
				expandChildren={expandFields}
				collapseChildren={collapseFields}
				collapseType={CollapsableForm.CollapseTypeEnum.INSERTROW}
				submitText={'查询'}
				cancelText={'重置'}
				onSubmit={_handleOnClickSubmit}
				onCancel={_handleOnClickReset}
				onChange={_handleCollapsableFormChange}
				ref={(refForm) => this.collapsableFormInstance = refForm}
			>
			</CollapsableForm>
		);
	}
}

ConversionSearchForm.propTypes = propTypes;
ConversionSearchForm.defaultProps = defaultProps;

export default ConversionSearchForm;
