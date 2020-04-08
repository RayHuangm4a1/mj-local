import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { BankCardTable, } from '../../../components/table/';
import {
	Row,
	Col,
	Form,
	FormItem,
	Input,
	DateRangePicker,
} from 'ljit-react-components';

const inputStyle = {
	width: '264px',
};

const fakeData = Array.from(Array(20).keys()).map((index) => {
	const memberNames = ['王龙', '史佳兆', '刘小华', '欧阳芳'];
	const bankNames = ['建设银行', '农业银行', '兴业银行', '工商银行'];

	return {
		_id: `${index + 1}`,
		username: `test${getRandom(1, 100)}`,
		memberName: `${memberNames[getRandom(0, 3)]}`,
		bankName: `${bankNames[getRandom(0, 3)]}`,
		bankCardNumber: `${getRandom(600000000, 699999999)}`,
		createdAt:`2019/5/${getRandom(1, 31)} 13:32:31`,
		operatingType: `${getRandom(0, 2)}`,
		operator: `admin`,
		comment: 'mengliang888添加',
	};
});

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.number,
		username: PropTypes.string,
		memberName: PropTypes.string,
		bankName: PropTypes.string,
		bankCardNumber: PropTypes.string,
		createdAt: PropTypes.string,
		operatingType: PropTypes.string,
		comment: PropTypes.string,
	})),
};

class BankCardLog extends Component {
	constructor() {
		super();
		this.state = {
			isLogVisible: false,
		};
		this._handleTableChange = this._handleTableChange.bind(this);
		this._handleFormChange = this._handleFormChange.bind(this);
		this._handleSearch = this._handleSearch.bind(this);
		this._handleFormReset = this._handleFormReset.bind(this);
	}
	_handleTableChange() {
		// TODO call api sort data
	}
	_handleFormChange() {
		//TODO call form item change api
	}
	_handleSearch() {
		//TODO call form item change api
	}
	_handleFormReset() {
		const form = this.refForm.getForm();

		form.resetFields();
	}
	render() {
		const {
			dataSource = fakeData,
		} = this.state;

		const {
			_handleTableChange,
			_handleFormChange,
			_handleSearch,
			_handleFormReset,
		} = this;

		return (
			<div
				className="bank-card-log customer-service-task__section"
			>
				<Form
					onChange={_handleFormChange}
					onSubmit={_handleSearch}
					onCancel={_handleFormReset}
					submitText="查询"
					cancelText="重置"
					ref={(refForm) => this.refForm = refForm }
				>
					<Row gutter={24}>
						<Col span={8}>
							<FormItem
								label="姓名"
								itemName="username"
								style={{ display: 'flex', }}
							>
								<Input
									style={inputStyle}
									placeholder="请输入姓名"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="卡号"
								itemName="cardNumber"
								style={{ display: 'flex', }}
							>
								<Input
									style={inputStyle}
									placeholder="请输入卡号"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="时间"
								itemName="logAt"
								style={{ display: 'flex', }}
							>
								<DateRangePicker
									ranges={['today', 'lastSevenDays', 'lastThirtyDays',] }
									inputStyle={inputStyle}
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<BankCardTable
					dataSource={dataSource}
					onTableChange={_handleTableChange}
					mode={BankCardTable.ModeEnums.SHOWING_OPERATOR}
					hasPagination
				/>
			</div>
		);
	}
}

BankCardLog.propTypes = propTypes;

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min;
}

export default BankCardLog;
