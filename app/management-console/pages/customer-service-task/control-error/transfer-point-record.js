import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import PageBlack from '../../../components/page-block';
import {
	Form,
	FormItem,
	Col,
	Row,
	Select,
	DateRangePicker,
	Input
} from 'ljit-react-components';
import { TransferPointRecordTable, } from '../../../components/table';

const fakeData = [
	{
		_id: '1',
		account: 'codtest001',
		time: "2019/03/07 12:13:21",
		platform: "AG电子",
		type: "转出",
		changeAmount: 300,
		afterChangeAmount: 600,
		tradeId: "H55_again160",
		status: 1,
		operator: "admin",
		comment: "",
	},
	{
		_id: '2',
		account: 'codtest001',
		time: "2019/03/07 12:13:21",
		platform: "CQ9",
		type: "转出",
		changeAmount: 300,
		afterChangeAmount: 600,
		tradeId: "H55_again160",
		status: 0,
		operator: "admin",
		comment: "",
	},
	{
		_id: '3',
		account: 'codtest001',
		time: "2019/03/07 12:13:21",
		platform: "VR电子",
		type: "转出",
		changeAmount: 300,
		afterChangeAmount: 600,
		tradeId: "H55_again160",
		status: 2,
		operator: "admin",
		comment: "",
	},
	{
		_id: '4',
		account: 'codtest001',
		time: "2019/03/07 12:13:21",
		platform: "JR电子",
		type: "转出",
		changeAmount: 300,
		afterChangeAmount: 600,
		tradeId: "H55_again160",
		status: 1,
		operator: "admin",
		comment: "",
	},
];

const propTypes = {
	dataSource: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
		username: PropTypes.string,
		time: PropTypes.string,
		platform: PropTypes.string,
		type: PropTypes.string,
		changeAmount: PropTypes.number,
		afterChangeAmount: PropTypes.number,
		tradeId: PropTypes.string,
		status: PropTypes.number,
		operator: PropTypes.string,
		comment: PropTypes.string,
	})),
};
const defaultProps = {
	// TODO get data
	dataSource: fakeData,
};

class TransferPointRecord extends Component {
	constructor() {
		super();

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
	}

	_handleSearch(data) {
		const form = this.formInstance.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				// TODO send search api
			}
		});
	}
	_handleReset() {
		const form = this.formInstance.getForm();

		form.resetFields();
	}

	render() {
		const { dataSource } = this.props;
		const { _handleSearch, _handleReset } = this;

		return (
			<PageBlack>
				<Form
					ref={formRef => this.formInstance = formRef }
					onSubmit={_handleSearch}
					onCancel={_handleReset}
					submitText="查询"
					cancelText="重置"
				>
					<Row>
						<Col span={8}>
							<FormItem
								label="平台"
								itemName="platform"
								itemConfig={{ initialValue: 'all', }}
								style={{ display: 'flex', }}
							>
								<Select
									style={{ width: '264px', }}
									// TODO get options
									options={[
										{ label: '全部', value: 'all' },
									]}
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="状态"
								itemName="status"
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
							>
								<Select
									style={{ width: '264px', }}
									// TODO get options
									options={[]}
									placeholder="请选择状态"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="时间"
								itemName="time"
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
							>
								<DateRangePicker/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="类型"
								itemName="type"
								style={{ display: 'flex', }}
							>
								<Select
									style={{ width: '264px', }}
									// TODO get options
									options={[]}
									placeholder="请选择类型"
								/>
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								label="操作者"
								itemName="operator"
								columnType={FormItem.ColumnTypeEnums.MEDIUM}
							>
								<Input
									style={{ width: '264px', }}
									placeholder="请输入操作者"
								/>
							</FormItem>
						</Col>
					</Row>
				</Form>
				<TransferPointRecordTable
					dataSource={dataSource}
					hasPagination
					hasUsername={false}
				/>
			</PageBlack>
		);
	}
}

TransferPointRecord.propTypes = propTypes;
TransferPointRecord.defaultProps = defaultProps;

export default TransferPointRecord;

