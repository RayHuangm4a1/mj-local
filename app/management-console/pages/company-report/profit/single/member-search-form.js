import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Row, Col, FormItem, Select, DateRangePicker, } from 'ljit-react-components';

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

class MemberSearchForm extends Component {
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
				onChange={() => {}}
				onSubmit={this._handleSearch}
				onCancel={this._handleReset}
				submitText={"查询"}
				cancelText={"重置"}
				ref={(refForm) => this.formInstance = refForm }
			>
				<Row>
					<Col span={8}>
						<FormItem label="帐号" itemName="account" key={0} columnType="medium">
							<Input
								style={inputStyle}
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label="游戏类型" itemName="gameType" key={1} columnType="medium">
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
						<FormItem label="游戏時間" itemName="gameTime" key={2} columnType="medium">
							<DateRangePicker
								format={dateFormat}
								inputStyle={inputStyle}
								ranges={['today', 'lastSevenDays', 'lastThirtyDays']}
							/>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}

MemberSearchForm.propTypes = propTypes;
MemberSearchForm.defaultProps = defaultProps;

export default MemberSearchForm;
