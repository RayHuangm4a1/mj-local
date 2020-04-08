import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, FormItem, Select, DateRangePicker, } from 'ljit-react-components';

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

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_handleSearch() {
		const form = this.formInstance.getForm();

		this.props.onSearch(form);
	}

	_handleReset() {
		const form = this.formInstance.getForm();

		this.props.onReset(form);
	}

	render() {
		return (
			<Form
				submitButtonDisabled={true}
				cancelButtonDisabled={true}
				onChange={() => {}}
				ref={(refForm) => this.formInstance = refForm }
			>
				<Row type="flex" align="top" justify="start">
					<Col span={8} offset={0}>
						<FormItem label="游戏类型" itemName="gameType" key={0} columnType="medium" noMargin>
							<Select
								style={inputStyle}
								options={[
									{ label: '彩票', value: '彩票' },
									{ label: '真人电子', value: '真人电子' },
									{ label: '体育', value: '体育' },
									{ label: '棋牌', value: '棋牌' },
									{ label: '金融', value: '金融' },
								]}
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label="游戏時間" itemName="gameTime" key={1} columnType="medium" noMargin>
							<DateRangePicker
								format={dateFormat}
								inputStyle={inputStyle}
								ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
							/>
						</FormItem>
					</Col>
					<Col span={8} style={{ textAlign: 'right', }}>
						<div style={{ padding: '4px 0px 4px 0px' }}>
							<Button className='search-form-search-btn' outline={Button.OutlineEnums.SOLID} onClick={this._handleSearch} style={{ margin: '0px 24px 0px 0px', }}>查询</Button>
							<Button className='search-form-reset-btn' outline={Button.OutlineEnums.HOLLOW} onClick={this._handleReset}>重置</Button>
						</div>
					</Col>
				</Row>
			</Form>
		);
	}
}

SearchForm.propTypes = propTypes;
SearchForm.defaultProps = defaultProps;

export default SearchForm;
