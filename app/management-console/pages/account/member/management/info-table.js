import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { StatusTag, Table, TextButton, DecimalNumber, } from 'ljit-react-components';
import { usersManagementDataProps, } from '../../../../lib/prop-types-utils';
import {
	isDateValid,
	formatDate,
} from '../../../../lib/moment-utils';
import { UserTypeEnum, } from '../../../../lib/enums';
const {
	ZHAOSHANG,
	AGENT,
	MEMBER,
	FIN,
	CS,
	ADMIN,
	DIRECT_CUSTOMER,
} = UserTypeEnum;

const TypeTextMap = {
	[ZHAOSHANG]: '招商',
	[AGENT]: '代理',
	[MEMBER]: '会员',
	[FIN]: '财务',
	[CS]: '客服',
	[ADMIN]: '管理员',
	[DIRECT_CUSTOMER]: '直接客户',
};

const LOTTERY_WALLET_CODE = 100;

const propTypes = {
	usersManagementData: usersManagementDataProps,
	onClickSubordinate: PropTypes.func,
	onClickDetail: PropTypes.func,
	className: PropTypes.string,
};

const defaultProps = {
	onClickSubordinate: () => {},
	onClickDetail: () => {},
};

class InfoTable extends Component {
	constructor() {
		super();
		this.state = {
			pagination: {},
		};
		this._handleChangeTablePage = this._handleChangeTablePage.bind(this);
		this._renderExpandrow = this._renderExpandrow.bind(this);
	}

	_handleChangeTablePage(pagination) {
		this.setState({ pagination, });
	}

	_renderExpandrow({
		teamStats = {},
		payer,
		bankCards,
		createdBy,
		createdAt,
		loginAt
	}) {
		return (
			<div style={{ display: 'flex', }}>
				<div style={{ width: '360px', }}>
					<p>团队余额：{teamStats.balance || 0}</p>
					<p>银行卡姓名：{payer}</p>
					<p>银行卡号：{getBankCardNumbersString(bankCards)}</p>
					<p>创建来源：{createdBy}</p>
					<p>创建时间：{displayDate(createdAt)}</p>
				</div>
				<div>
					<p>最后登录时间：{displayDate(loginAt)}</p>
				</div>
			</div>
		);
	}

	render() {
		const {
			props,
			state,
			_handleChangeTablePage,
			_renderExpandrow,
		} = this;
		const {
			usersManagementData = [],
			onClickSubordinate,
			onClickDetail,
			className,
		} = props;
		const { pagination, } = state;
		const columns = [{
			title: '帐号',
			dataIndex: 'username',
		},{
			title: '类型',
			dataIndex: 'type',
			render: value => TypeTextMap[value],
		},{
			title: '时时彩奖金',
			dataIndex: 'deltaBonus',
		},{
			title: '余额',
			dataIndex: 'wallets',
			render: (_, record) => {
				const { wallets = [], } = record;
				const lotteryWalletBalance = getLotteryWalletBalance(wallets);

				return <DecimalNumber data={lotteryWalletBalance} hasSeparator/>;
			},
		},{
			title: '团队人数',
			dataIndex: 'teamStats',
			render: (teamStats = {}, record) => (
				<TextButton
					text={teamStats.numOfUsers || 0}
					onClick={() => onClickSubordinate(record)}
				/>
			)
		},{
			title: '状态',
			render: (record) => {
				const { isNormal, } = record;
				const bannedTag = [];

				if (!isNormal) {
					bannedTag.push(
						<StatusTag
							status="error"
							text="异常"
							tagType={StatusTag.TagTypeEnums.OUTLINE}
						/>
					);
				}
				return bannedTag;
			},
		},{
			title: '登录',
			dataIndex: 'online',
			render: (online) => (
				<StatusTag
					status={online ? StatusTag.StatusEnums.SUCCESS : StatusTag.StatusEnums.ERROR}
					text={online ? '上线' : '离线'} />
			),
		},{
			title: '操作',
			render: (record) => (
				<TextButton
					// TODO replace record.username to row id
					onClick={() => onClickDetail(record)}
					text="详细"
				/>
			)
		},];

		return (
			<Table
				rowKey="username"
				className={className}
				columns={columns}
				expandedRowRender={_renderExpandrow}
				dataSource={usersManagementData}
				hasPagination
				paginationProps={{
					...pagination,
					showSizeChanger: false,
					totalRenderer: () => undefined,
				}}
				onTableChange={_handleChangeTablePage}
			/>
		);
	}
}

function getBankCardNumbersString(bankCards) {
	if (bankCards.length > 0) {
		return bankCards.reduce(
			(string, card) => string.length ? string + ', ' + card.number : card.number,
			''
		);
	} else {
		return '';
	}
}

function getLotteryWalletBalance(wallets) {
	const lotteryWallet = wallets.filter(wallet => parseInt(wallet.code, 10) === LOTTERY_WALLET_CODE);

	return lotteryWallet.length ? lotteryWallet[0].balance : 0;
}

function displayDate(date) {
	return isDateValid(date) ? formatDate(date) : '';
}

InfoTable.propTypes = propTypes;
InfoTable.defaultProps = defaultProps;

export default InfoTable;
