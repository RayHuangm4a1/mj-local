import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Input,
	DateRangePicker,
	Select,
	Col,
	Row,
} from 'ljit-react-components';

const propTypes = {
	onSearch: PropTypes.func,
	onReset: PropTypes.func,
};
const defaultProps = {
	onSearch: () => {},
	onReset: () => {},
};

const inputStyle = {
	width: '264px',
};

const COL_SPAN_NUMBER = 8;

class SearchForm extends Component {
	constructor() {
		super();

		this._handleReset = this._handleReset.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
	}
	_handleReset(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();
		const { onReset, } = this.props;

		form.resetFields();
		onReset(event);
	}
	_handleSearch(event) {
		event.preventDefault();
		const form = this.formInstance.getForm();
		const { onSearch, } = this.props;

		form.validateFields((error, data) => {
			if (!error) {
				onSearch(data);
			}
		});
	}
	render() {
		return (
			<Form
				ref={(refForm) => this.formInstance = refForm }
				onSubmit={this._handleSearch}
				onCancel={this._handleReset}
				submitText="查询"
				cancelText="重置"
			>
				<Row type={Row.TypeEnums.FLEX}>
					<Col span={COL_SPAN_NUMBER}>
						<FormItem
							label="日期："
							itemName="createdAt"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<DateRangePicker
								format="YYYY/MM/DD"
								ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
								inputStyle={inputStyle}
							/>
						</FormItem>
					</Col>
					<Col span={COL_SPAN_NUMBER}>
						<FormItem
							label="帐号"
							itemName="username"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								placeholder="請輸入帐号"
								style={inputStyle}
							/>
						</FormItem>
					</Col>
					<Col span={COL_SPAN_NUMBER}>
						<FormItem
							label="上級帐号"
							itemName="upper"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								placeholder="請輸入上級帐号"
								style={inputStyle}
							/>
						</FormItem>
					</Col>
					<Col span={COL_SPAN_NUMBER}>
						<FormItem
							label="创建来源"
							itemName="source"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Select
								placeholder="请選擇创建来源"
								style={inputStyle}
								options={[
									//TODO fetch api data
									{ label: '全部', value: 0, },
									{ label: '管理者创建', value: 1, },
									{ label: '上级创建', value: 2, },
									{ label: '推荐申请', value: 3, },
								]}
							/>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
