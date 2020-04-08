import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Row,
	Col,
	Button,
	Input,
	LabelContent,
} from 'ljit-react-components';

const inputStyle = {
	width: 264,
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
		event.preventDefault();
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (error) {
				return;
			}

			this.props.onSearch(values);
		});
	}

	render() {
		const config = {
			rules: [{ type: 'string' }],
		};

		return (
			<Form
				className="search-form"
				submitButtonDisabled
				cancelButtonDisabled
				ref={(refForm) => this.formInstance = refForm}
			>
				<Row
					align={Row.AlignEnums.TOP}
					type={Row.TypeEnums.FLEX}
					gutter={24}
				>
					<Col>
						<FormItem
							label="帐号"
							itemName="username"
							itemConfig={config}
							className="search-form__item"
						>
							<Input
								style={inputStyle}
								placeholder="请输入帳号"
							/>
						</FormItem>
					</Col>
					<Col>
						<FormItem
							label="推广链结代码"
							itemName="code"
							itemConfig={config}
							className="search-form__item"
						>
							<Input
								style={inputStyle}
								placeholder="请輸入推廣代碼"
							/>
						</FormItem>
					</Col>
					<Col>
						<LabelContent className="search-form__item">
							<Button
								outline={Button.OutlineEnums.SOLID}
								onClick={this._handleSearch}
							>
								查询
							</Button>
						</LabelContent>
					</Col>
				</Row>
			</Form>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
