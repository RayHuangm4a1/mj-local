import React, { Component } from 'react';
import { Row, Col, Form, FormItem, Input, Select, DateRangePicker, } from 'ljit-react-components';

import PropTypes from 'prop-types';

const propTypes = {
	onClickSubmit: PropTypes.func,
	onClickReset: PropTypes.func,
};

const defaultProps = {
	onClickSubmit: () => {},
	onClickReset: () => {},
};

class ProfitSearchForm extends Component {
	constructor(props) {
		super(props);

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
	}
	_handleSubmit(e) {
		e.preventDefault();
		const { refForm: { validateFieldsAndScroll } } = this;
		const { onClickSubmit } = this.props;

		validateFieldsAndScroll((err, values) => {
			if (!err) {
				onClickSubmit(values);
			}
		});
	}
	_handleReset() {
		const { refForm } = this;
		const { onClickReset } = this.props;

		refForm.resetFields();
		onClickReset();
	}
	_handleFormChange() {
		const { refForm: { validateFields } } = this;

		validateFields((err, values) => {});
	}

	render() {
		const { _handleSubmit, _handleReset, _handleFormChange } = this;

		return (
			<Form
				className="profit-search-form"
				onChange={_handleFormChange}
				onSubmit={_handleSubmit}
				onCancel={_handleReset}
				submitText={"查询"}
				cancelText={"重置"}
				ref={(refForm) => this.refForm = refForm }
			>
				<Row gutter={24}>
					<Col span={8}>
						<FormItem
							label={"帐号"}
							columnType={'medium'}
							itemName={'account'}
						>
							<Input
								style={{ width: "100%" }}
								placeholder="请输入帐号"
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							label={"游戏类型"}
							columnType={'medium'}
							itemName={'items'}
						>
							<Select
								style={{ width: "100%" }}
								// TODO add options
								options={undefined}
								placeholder={"请选择"}
							/>
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem
							label={"游戏時間"}
							columnType={'medium'}
							itemName={'date'}
						>
							<DateRangePicker
								ranges={['today', 'lastSevenDays', 'lastThirtyDays',] }
								style={{ width: "100%"  }}
							/>
						</FormItem>
					</Col>
				</Row>
			</Form>
		);
	}
}

ProfitSearchForm.propTypes = propTypes;
ProfitSearchForm.defaultProps = defaultProps;

export default ProfitSearchForm;
