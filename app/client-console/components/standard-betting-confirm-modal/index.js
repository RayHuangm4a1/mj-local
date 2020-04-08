import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputNumber, IconButton, Table, DecimalNumber, } from 'ljit-react-components';
import SubmitFormModal from '../submit-form-modal';
import './style.styl';

const MIN_AMOUNT_PER_BET = 0.001;
const MAX_AMOUNT_PER_BET = 999;
const MIN_MULTIPLE = 1;
const MAX_MULTIPLE = 999999;

const propTypes = {
	isModalVisible: PropTypes.bool,
	bettings: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.shape({
			_id: PropTypes.string,
			id:  PropTypes.number,
			name: PropTypes.string,
			bonus:  PropTypes.number,
		}),
		name: PropTypes.string,
		lotteryName: PropTypes.string,
		betcontent: PropTypes.string,
		multiple: PropTypes.number,
		amountPerBet: PropTypes.number,
		count: PropTypes.number,
		amount: PropTypes.number,
		rebate: PropTypes.number,
	})),
	onBetting: PropTypes.func,
	onCancel: PropTypes.func,
	isEstimatedPrizeActive: PropTypes.bool,
};

const defaultProps = {
	isModalVisible: false,
	onBetting: () => {},
	onCancel: () => {},
	isEstimatedPrizeActive: true,
};

class ConfirmBettingModal extends Component {
	constructor() {
		super();

		this._handleDelete = this._handleDelete.bind(this);
		this._handelChangeAmountPerBet = this._handelChangeAmountPerBet.bind(this);
		this._handelChangeMultipe = this._handelChangeMultipe.bind(this);
		this.state = {
			bettings: [],
		};
	}

	_handleDelete(index) {
		const { bettings } = this.state;
		const newBettings = [...bettings];

		newBettings.splice(index,1);
		this.setState({
			bettings: newBettings,
		});
	}

	_handelChangeAmountPerBet(amountPerBet, record, index) {
		const { bettings } = this.state;

		let newBettings = [...bettings];

		newBettings[index] = Object.assign({}, record, {
			amountPerBet,
			amount: amountPerBet * record.multiple * record.count,
		});

		this.setState({
			bettings: newBettings,
		});
	}

	_handelChangeMultipe(multiple, record, index) {
		const { bettings } = this.state;

		let newBettings = [...bettings];

		newBettings[index] = Object.assign({}, record, {
			multiple,
			amount: multiple * record.amountPerBet * record.count,
		});

		this.setState({
			bettings: newBettings,
		});
	}
	render() {
		const {
			isModalVisible,
			onBetting,
			onCancel,
			isEstimatedPrizeActive,
		} = this.props;

		const { _handelChangeAmountPerBet, _handleDelete, _handelChangeMultipe } = this;
		const { bettings, } = this.state;
		const bettingAmount = bettings.reduce((acc,current) => {
			return acc + current.amount;
		}, 0);
		const bettingCount = bettings.reduce((acc,current) => {
			return acc + current.count;
		}, 0);

		return (
			<SubmitFormModal
				title="投注详情"
				className="ljit-confirm-bet-form"
				width="880px"
				isVisible={isModalVisible}
				onClickCancel={onCancel}
				okText="确认下注"
				onClickOk={ () => { onBetting(bettings);} }
			>
				<div className="ljit-bet-form">
					<div className="ljit-bet-form__header">
						<div>i</div>单期最高利润 50 万，单挑模式最高利润 1 万
					</div>
					<div className="ljit-bet-form__content">
						<Table
							columns={[
								{
									title: '彩种',
									width: 112,
									dataIndex: 'lotteryName'
								},
								{
									title: '玩法',
									width: 112,
									dataIndex: 'name'
								},
								{
									title: '倍数',
									width: 112,
									dataIndex: 'multiple',
									render: (value, record, index) => {
										return (
											<InputNumber
												value={value}
												onChange={(multiple) => { _handelChangeMultipe(multiple, record, index); }}
												min={MIN_MULTIPLE}
												max={MAX_MULTIPLE}
											/>
										);
									}
								},
								{
									title: '单注金额',
									width: 112,
									dataIndex: 'amountPerBet',
									render: (value, record, index) => {
										return (
											<InputNumber
												value={value}
												onChange={(amountPerBet) => { _handelChangeAmountPerBet(amountPerBet, record, index); }}
												min={MIN_AMOUNT_PER_BET}
												max={MAX_AMOUNT_PER_BET}
												step={MIN_AMOUNT_PER_BET}
											/>
										);
									}
								},
								{
									title: '注數',
									width: 112,
									dataIndex: 'count'
								},
								{
									title: '当前投注金额',
									width: 112,
									dataIndex: 'amount',
									render: (amount) => <DecimalNumber data={amount} hasSeparator/>,
								},
								{
									title: '投注号码',
									width: 112,
									dataIndex: 'betcontent',
									className: 'betcontent',
								},
								{
									title: '操作',
									width: 42,
									dataIndex: 'operation',
									render: (value, record, index) => {
										return (
											<IconButton
												type="delete"
												onClick={() => _handleDelete(index)}
											/>
										);
									}
								}
							]}
							dataSource={bettings}
							rowKey={ (record, index) => `${record.name}${index}` }
						/>
					</div>
					<div className="ljit-bet-form__footer">
						<p>
							{/* TODO： 會有算獎金 lib ，要 import 進來並修改 */ }
							共 <span>{bettingCount}</span> 注，总投注金额 <span>{bettingAmount}</span> 元
							{isEstimatedPrizeActive ? `，预估奖金 ${100000} 元` : null}
						</p>
					</div>
				</div>
			</SubmitFormModal>
		);
	}
	componentDidMount() {
		const { bettings } = this.props;

		this.setState({ bettings, });
	}
	componentDidUpdate(prevProps,) {
		const { isModalVisible, bettings, } = this.props;

		if (isModalVisible !== prevProps.isModalVisible) {
			this.setState({ bettings, });
		}
	}
}

ConfirmBettingModal.propTypes = propTypes;
ConfirmBettingModal.defaultProps = defaultProps;

export default ConfirmBettingModal;
