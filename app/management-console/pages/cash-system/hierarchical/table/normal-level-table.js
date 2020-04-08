import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
} from 'ljit-react-components';
import { formatDate, isDateValid, } from '../../../../lib/moment-utils';
import { FinanceLevelsDataPropTypes, } from '../../../../lib/prop-types-utils';
import { FinanceLevelStatusEnum, } from '../../../../lib/enums';
import EnableStatusCell from '../enable-status-cell';

const NEW_USER_FINANCE_LEVEL_ID = 1;

const propTypes = {
	levels: FinanceLevelsDataPropTypes,
	isLoading: PropTypes.bool,
	onClickNumberOfUsers: PropTypes.func,
	onClickLevelEdition: PropTypes.func,
};
const defaultProps = {
	levels: [],
	isLoading: false,
	onClickNumberOfUsers: () => {},
	onClickLevelEdition: () => {},
};

class NormalLevelTable extends Component {
	constructor() {
		super();

		this._renderExpandedRowRender = this._renderExpandedRowRender.bind(this);
	}

	_renderExpandedRowRender({
		numOfWithdraws,
		withdrawalAmount,
		registeredAfter,
		registeredBefore,
		isBettingAmountGreaterThanDepositAmount,
		description,
	}) {
		return (
			<div>
				<p>{`提款次数：${numOfWithdraws}`}</p>
				<p>{`提款总额：${withdrawalAmount}`}</p>
				<p>{`加入起始日：${formatValidDate(registeredAfter)}`}</p>
				<p>{`加入截止日：${formatValidDate(registeredBefore)}`}</p>
				<p>{`投注金額 > 充值金額：${isBettingAmountGreaterThanDepositAmount ? '是' : '否'}`}</p>
				<p>{`备注：${description || ''}`}</p>
			</div>
		);
	}

	render() {
		const {
			levels,
			isLoading,
			onClickNumberOfUsers,
			onClickLevelEdition,
		} = this.props;
		const { _renderExpandedRowRender, } = this;
		const columns = [
			{
				title: '层级',
				dataIndex: 'displayLevel',
			},
			{
				title: '描述名称',
				dataIndex: 'name',
			},
			{
				title: '注册天数',
				dataIndex: 'numOfRegisteredDays',
			},
			{
				title: '充值次数',
				dataIndex: 'numOfDeposits',
			},
			{
				title: '充值总额',
				dataIndex: 'depositAmount',
			},
			{
				title: '消费金额',
				dataIndex: 'bettingAmount',
			},
			{
				title: '会员人数',
				dataIndex: 'numOfUsers',
				render: (data, record) => (
					<TextButton
						text={data}
						onClick={() => onClickNumberOfUsers(record)}
					/>
				),
			},
			{
				title: '状态',
				dataIndex: 'status',
				render: (data) => {
					const isEnabled = (data === FinanceLevelStatusEnum.ENABLE) ? 'enabled' : 'disabled';

					return <EnableStatusCell data={isEnabled}/>;
				}
			},
			{
				title: '操作',
				dataIndex: 'operation',
				render: (data, record) => (
					<TextButton
						text="修改"
						onClick={() => onClickLevelEdition(record)}
						disabled={checkIsNewUserLevel(record.id)}
					/>
				),
			},
		];

		return (
			<Table
				rowKey="id"
				dataSource={levels}
				isLoading={isLoading}
				pagination={false}
				expandedRowRender={_renderExpandedRowRender}
				columns={columns}
			/>
		);
	}
}

NormalLevelTable.propTypes = propTypes;
NormalLevelTable.defaultProps = defaultProps;

function checkIsNewUserLevel(levelId) {
	return NEW_USER_FINANCE_LEVEL_ID === levelId;
}

function formatValidDate(date) {
	return isDateValid(date) ? formatDate(date) : '';
}

export default NormalLevelTable;
