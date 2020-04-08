import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TextButton, } from 'ljit-react-components';
import { formatValidDate, } from '../../lib/moment-utils';
import { UserBankCardsDataPropTypes, } from '../../lib/prop-types-utils';

const BankCardStatus = {
	ACTIVE: 1,
	ARCHIVED: 2,
	BLOCKED: 3,
};

const propTypes = {
	bankCards: UserBankCardsDataPropTypes,
	className: PropTypes.string,
	hasPagination: PropTypes.bool,
	onClickEdit: PropTypes.func,
	onClickDelete: PropTypes.func,
	onClickMoveInBlackList: PropTypes.func,
	onClickEnableUserBankCardWithdrawable: PropTypes.func,
	onClickMoveOutBlackList: PropTypes.func,
	onTableChange: PropTypes.func,
};
const defaultProps = {
	bankCards: [],
	hasPagination: false,
	blackList: [],
	onClickEdit: () => {},
	onClickDelete: () => {},
	onClickMoveInBlackList: () => {},
	onClickEnableUserBankCardWithdrawable: () => {},
	onClickMoveOutBlackList: () => {},
	onTableChange: () => {},
};

class CardIdManagementTable extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			bankCards,
			className,
			hasPagination,
			onClickEdit,
			onClickDelete,
			onClickMoveInBlackList,
			onClickEnableUserBankCardWithdrawable,
			onClickMoveOutBlackList,
			onTableChange,
		} = this.props;
		const columns = [{
			title: '姓名',
			dataIndex: 'payer',
		},{
			title: '银行名称',
			dataIndex: 'bankName',
		},{
			title: '卡号',
			dataIndex: 'number',
		},{
			title: '绑定时间',
			dataIndex: 'activatedAt',
			sorter: () => {},
			render: (value) => formatValidDate(value),
		},{
			title: '可提现时间',
			dataIndex: 'withdrawableAt',
			sorter: () => {},
			render: (value) => formatValidDate(value),
		},{
			title: '操作',
			render: (data, record) => {
				const isBlocked = record.status === BankCardStatus.BLOCKED;

				if (isBlocked) {
					return (
						<div>
							<TextButton text="删除" onClick={() => onClickDelete(record)}/>
							<TextButton text="移出黑名单" onClick={() => onClickMoveOutBlackList(record)}/>
						</div>
					);
				} else {
					return (
						<div>
							<TextButton text="修改" onClick={() => onClickEdit(record)}/>
							<TextButton text="删除" onClick={() => onClickDelete(record)}/>
							<TextButton
								text="解除可提现时间限制"
								onClick={() => onClickEnableUserBankCardWithdrawable(record)}
							/>
							<TextButton text="移入黑名单" onClick={() => onClickMoveInBlackList(record)}/>
						</div>
					);
				}
			},
		},];

		return (
			<Table
				rowKey="id"
				className={className}
				columns={columns}
				dataSource={bankCards}
				hasPagination={hasPagination}
				onTableChange={onTableChange}
			/>
		);
	}
}

CardIdManagementTable.propTypes = propTypes;
CardIdManagementTable.defaultProps = defaultProps;

export default CardIdManagementTable;
