import React, { Component } from 'react';
import {
	Button,
	HeaderButtonBar,
	InputDynamicTable,
	Input,
	Select,
	InputNumber,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { MULTI_ADD_PREFIX, FormItemEnums, } from '../utils';

const {
	TRANSFER_OUT_ACCOUNT,
	TRANSFER_IN_ACCOUNT,
	ITEM,
	AMOUNT,
	COMMENT,
} = FormItemEnums;

const propTypes = {
	onBack: PropTypes.func.isRequired,
};

class ManualTransferAddPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [{ key: uuid(), }],
		};

		this._renderTable = this._renderTable.bind(this);
		this._handleSubmitAdd = this._handleSubmitAdd.bind(this);
	}

	_renderTable() {
		const { data, } = this.state;
		const tableColumns = [
			{
				width: '18%',
				title: '转出帐号',
				dataIndex: TRANSFER_OUT_ACCOUNT,
				renderField: (record, rowIndex, onChange) => (
					<Input
						placeholder="请输入帐号"
						value={record[TRANSFER_OUT_ACCOUNT]}
						onChange={(e) => onChange(TRANSFER_OUT_ACCOUNT, e.target.value, rowIndex)}
					/>
				),
			},{
				width: '18%',
				title: '转入帐号',
				dataIndex: TRANSFER_IN_ACCOUNT,
				renderField: (record, rowIndex, onChange) => (
					<Input
						placeholder="请输入帐号"
						value={record[TRANSFER_IN_ACCOUNT]}
						onChange={(e) => onChange(TRANSFER_IN_ACCOUNT, e.target.value, rowIndex)}
					/>
				),
			},{
				width: '18%',
				title: '提出金额',
				dataIndex: AMOUNT,
				renderField: (record, rowIndex, onChange) => (
					<InputNumber
						placeholder="请输入金额"
						value={record[AMOUNT]}
						onChange={(value) => onChange(AMOUNT, value, rowIndex)}
					/>
				),
			},{
				width: '18%',
				title: '存入项目',
				dataIndex: ITEM,
				renderField: (record, rowIndex, onChange) => (
					<Select
						placeholder="请选择项目"
						value={record[ITEM]}
						// TODO 取得options
						options={[]}
						onChange={(e) => onChange(ITEM, e.target.value, rowIndex)}
					/>
				),
			},{
				width: '18%',
				title: '备注',
				dataIndex: COMMENT,
				renderField: (record, rowIndex, onChange) => (
					<Input
						placeholder="请输入备注"
						value={record[COMMENT]}
						onChange={(e) => onChange(COMMENT, e.target.value, rowIndex)}
					/>
				)
			},
		];

		return (
			<InputDynamicTable
				className={`${MULTI_ADD_PREFIX}__input-dynamic-table`}
				columns={tableColumns}
				value={data}
				onChange={(data) => this.setState({ data, })}
			/>
		);
	}
	_handleSubmitAdd() {
		// TODO send api to multi add
		// 失敗時要顯示notify
		// 確認成功後是否導頁
		const { data, } = this.state;
	}

	render() {
		const {
			_renderTable,
			_handleSubmitAdd,
		} = this;
		const { onBack, } = this.props;

		return (
			<React.Fragment>
				<Button
					className={`${MULTI_ADD_PREFIX}__back-button`}
					outline={Button.OutlineEnums.HOLLOW}
					onClick={onBack}
				>
					返回上一层
				</Button>
				<PageBlock
					noMinHeight
				>
					<HeaderButtonBar
						className={`${MULTI_ADD_PREFIX}__header-button-bar`}
						left={<PageBlock.Title text="批量新增人工转点"/>}
						right={(
							<Button
								className={`${MULTI_ADD_PREFIX}__submit-add-button`}
								color={Button.ColorEnums.BRIGHTBLUE500}
								onClick={_handleSubmitAdd}
							>
								新增
							</Button>
						)}
					/>
					{_renderTable()}
				</PageBlock>
			</React.Fragment>
		);
	}
}

ManualTransferAddPage.propTypes = propTypes;

export default ManualTransferAddPage;
