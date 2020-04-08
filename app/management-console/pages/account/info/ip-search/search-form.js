import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Row,
	Col,
	Input,
	DateRangePicker,
} from 'ljit-react-components';

const inputStyle = {
	width: '100%',
};
const propTypes = {
	onSearch: PropTypes.func,
};
const defaultProps = {
	onSearch: () => {},
};

class SearchForm extends Component {
	constructor() {
		super();
		this._handleSearch = this._handleSearch.bind(this);
	}

	_handleSearch(event) {
		const { onSearch, } = this.props;
		const form = this.refForm.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSearch(values);
			}
		});
	}

	render() {
		const config = {
			rules: [{ type: 'string' }],
		};
		const rangeConfig = {
			rules: [{ type: 'array' }],
		};

		return (
			<Form
				className="ip-search-form"
				cancelButtonDisabled
				submitText="查询"
				onSubmit={this._handleSearch}
				ref={(refForm) => this.refForm = refForm }
			>
				<Row gutter={24}>
					<Col span={8}>
						<FormItem
							label="登录IP位址"
							itemName="ip"
							itemConfig={config}
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								style={inputStyle}
								placeholder="請輸入IP"
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							label="登录帐号"
							itemName="username"
							itemConfig={config}
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								style={inputStyle}
								placeholder="Admin"
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							label="日期"
							itemName="rangeTime"
							itemConfig={rangeConfig}
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<DateRangePicker
								className="ip-search-form__range"
								showTime
								format="YYYY/MM/DD"
								inputStyle={inputStyle}
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
