import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	InputNumber,
	Table,
	IconButton,
	DecimalNumber,
} from 'ljit-react-components';
import './style.styl';
import { calculateAmount, } from '../../lib/betting-utils';
import SubmitFormModal from '../submit-form-modal';
import { withTheme, } from '../../lib/theme-provider';

const prefixClass = 'betting-details-modal';

const MIN_AMOUNT_PER_BET = 0.001;
const MAX_AMOUNT_PER_BET = 999;

const propTypes = {
	isModalVisible: PropTypes.bool,
	balance: PropTypes.number,
	onBetting: PropTypes.func,
	onCancel: PropTypes.func,
	onDelete: PropTypes.func,
	bettings: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.shape({
			_id: PropTypes.string,
			id:  PropTypes.number,
			name: PropTypes.string,
			bonus:  PropTypes.number,
		}),
		name: PropTypes.string,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		multiple:  PropTypes.number,
		amountPerBet: PropTypes.number,
		rebate: PropTypes.number,
		amount: PropTypes.number,
	})),
	defaultBatchAmountPerBet: PropTypes.number,
};
const defaultProps = {
	isModalVisible: false,
	balance: 0,
	defaultBatchAmountPerBet: MIN_AMOUNT_PER_BET,
	onBetting: () => {},
	onCancel: () => {},
};

class XinYongBettingDetailsModal extends Component {
	constructor() {
		super();
		this.state = {
			batchAmountPerBet: MIN_AMOUNT_PER_BET,
			bettings: [],
		};

		this._handleChangeAmountPerBet = this._handleChangeAmountPerBet.bind(this);
		this._handleDelete = this._handleDelete.bind(this);
		this._handleBatchChangeAmountPerBet = this._handleBatchChangeAmountPerBet.bind(this);
	}

	_handleChangeAmountPerBet(amountPerBet, record) {
		const { bettings, } = this.state;
		const { play, } = record;
		const updatedBettings = bettings.map(betting => {
			if (betting.play.id !== play.id) {
				return betting;
			} else {
				return Object.assign({}, betting, {
					amount: amountPerBet > 0 ? calculateAmount(amountPerBet, betting.multiple) : MIN_AMOUNT_PER_BET,
					amountPerBet: amountPerBet > 0 ? amountPerBet : MIN_AMOUNT_PER_BET,
				});
			}
		});

		this.setState({
			bettings: updatedBettings,
		});
	}
	_handleDelete(record) {
		const { bettings, } = this.state;
		const { name, } = record;
		const updatedBettings = bettings.filter(betting => {
			return betting.name !== name;
		});

		this.setState({
			bettings: updatedBettings,
		});
	}
	_handleBatchChangeAmountPerBet(amountPerBet) {
		const { bettings, } = this.state;
		const updatedBettings = bettings.map(betting => {
			return Object.assign({}, betting, {
				amount: amountPerBet > 0 ? calculateAmount(amountPerBet, betting.multiple) : MIN_AMOUNT_PER_BET,
				amountPerBet: amountPerBet > 0 ? amountPerBet : MIN_AMOUNT_PER_BET,
			});
		});

		this.setState({
			bettings: updatedBettings,
			batchAmountPerBet: amountPerBet,
		});
	}

	render() {
		const {
			batchAmountPerBet,
			bettings = [],
		} = this.state;
		const {
			isModalVisible,
			balance,
			onCancel,
			onBetting,
			theme,
		} = this.props;
		const {
			_handleChangeAmountPerBet,
			_handleDelete,
			_handleBatchChangeAmountPerBet,
		} = this;
		const totalbettings = bettings.length;
		const bettingAmount = bettings.reduce((acc, current) => {
			const { amount } = current;
			const isNumber = (typeof amount === 'number' && !isNaN(amount));

			if (isNumber) {
				return acc + amount;
			} else {
				return acc;
			}
		}, 0);
		const { style } = theme;

		return (
			<SubmitFormModal
				title="投注详情"
				okText="确认下注"
				isVisible={isModalVisible}
				width={752}
				onClickCancel={onCancel}
				onClickOk={() => onBetting(bettings)}
				className={`${prefixClass} ${style.themeXinYongBettingDetailModal}`}
			>
				<Table
					columns={[
						{
							title: '号码',
							width: 188,
							dataIndex: 'name'
						},
						{
							title: '赔率',
							width: 188,
							dataIndex: 'play.odds',
							render: value => <DecimalNumber data={value} hasSeparator />
						},
						{
							title: '金额',
							dataIndex: 'amount',
							width: 188,
							render: (value, record) => {
								return (
									<InputNumber
										value={value}
										onChange={(amount) => _handleChangeAmountPerBet(amount, record)}
										min={MIN_AMOUNT_PER_BET}
										max={MAX_AMOUNT_PER_BET}
										step={MIN_AMOUNT_PER_BET}
									/>
								);
							}
						},
						{
							title: '操作',
							width: 188,
							dataIndex: 'operation',
							render: (value, record) => {
								return (
									<IconButton
										type={IconButton.IconTypeEnums.DELETE}
										onClick={() => _handleDelete(record)}
									/>
								);
							}
						}
					]}
					dataSource={bettings}
					rowKey="name"
				/>
				<div className="ljit-bet-form-footer">
					<div className={`${prefixClass}__batch-edit`}>
						批量修改金额
						<InputNumber
							value={batchAmountPerBet}
							onChange={_handleBatchChangeAmountPerBet}
							min={MIN_AMOUNT_PER_BET}
							max={MAX_AMOUNT_PER_BET}
							step={MIN_AMOUNT_PER_BET}
						/>
						共
						<span className={`${prefixClass}__batch-edit--number`}><DecimalNumber data={totalbettings} hasSeparator/></span>
						注，共
						<span className={`${prefixClass}__batch-edit--number`}><DecimalNumber data={bettingAmount} hasSeparator/></span>
						元
						&nbsp;&nbsp;&nbsp;&nbsp;
						余额
						<span className={`${prefixClass}__batch-edit--number ${prefixClass}__batch-edit--number-black`}>
							<DecimalNumber data={balance - bettingAmount} hasSeparator/>
						</span>
						元
					</div>
				</div>
			</SubmitFormModal>
		);
	}
	componentDidUpdate(prevProps,) {
		const { isModalVisible, bettings, defaultBatchAmountPerBet, } = this.props;

		if (isModalVisible !== prevProps.isModalVisible) {
			this.setState({
				bettings,
				batchAmountPerBet: defaultBatchAmountPerBet,
			});
		}
	}
}

XinYongBettingDetailsModal.propTypes = propTypes;
XinYongBettingDetailsModal.defaultProps = defaultProps;

export default withTheme(XinYongBettingDetailsModal);
