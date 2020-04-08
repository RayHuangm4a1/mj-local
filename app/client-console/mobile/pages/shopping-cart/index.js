import React from 'react';
import PropTypes from 'prop-types';
import MobileBettingCheckout from '../../../components/mobile-betting-checkout';
import { Icon } from 'ljit-react-components';
import ShoppingCartItem from './shopping-cart-item';
import './style.styl';

export const PREFIX_CLASS = 'mobile-shopping-cart';

const propTypes = {
	onBack: PropTypes.func.isRequired,
};

function ShoppingCart({ onBack }) {

	function _handleClickBettingPage() {
		onBack();
	}
	function _handleClearBet() {
		// TODO clear bet
		console.log('clear');
	}
	function _handleDeleteBet(index) {
		// TODO delete bet
		console.log('delete bet', index);
	}
	function _handleClickTrace() {
		//TODO go trace page
		console.log('trace');
	}
	function _handleBetting() {
		// TODO betting
		console.log('betting');
	}

	return (
		<div className={PREFIX_CLASS}>
			<p>
				距 20180724-063 截止 03:14
			</p>
			<div className={`${PREFIX_CLASS}__button-group`}>
				<div
					onClick={_handleClickBettingPage}
				>
					<Icon
						type={Icon.IconTypeEnums.PLUS}
						size={Icon.SizeEnums.SMALL}
					/>继续选号
				</div>
				<div
					onClick={_handleClearBet}
				>
					<Icon
						type={Icon.IconTypeEnums.TRASH2}
						size={Icon.SizeEnums.SMALL}
					/>清除选号
				</div>
			</div>
			<div className={`${PREFIX_CLASS}__bet-list`}>
				{
					fakeBetDate.map((bet, index) => (
						<ShoppingCartItem
							key={index}
							bet={bet}
							onClickDelete={() => {_handleDeleteBet(index);}}
						/>
					))
				}
			</div>
			<div
				className={`${PREFIX_CLASS}__trace-button`}
				onClick={_handleClickTrace}
			>
				<Icon
					type={Icon.IconTypeEnums.TRACE_TEXT}
					size={Icon.SizeEnums.X_LARGE}
				/>
				智能追号
			</div>
			<MobileBettingCheckout.Trace
				bettingCount={1}
				traceCount={100}
				amount={50}
				balance={23456}
				onClickBet={_handleBetting}
			/>
		</div>
	);
}

ShoppingCart.propTypes = propTypes;

export default ShoppingCart;

// TODO get bet data from api and confirm data structure
// TODO 串接資料的時候，ADD_BETTING 的資料結構多存一個 playConditionName
const fakeBetDate = [
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '0789,0189,56789,012',
		lotteryName: '重庆时时彩',
		playConditionName: '四星',
		count: 7,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,6,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 4,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '5678,6,8',
		lotteryName: '重庆时时彩',
		playConditionName: '四星',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 100,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
	{
		play: {
			_id: '5678567856785678',
			id: 1,
			name: '直选复式',
			bonus: 19.87,
		},
		betcontent: '1,356,8',
		lotteryName: '重庆时时彩',
		playConditionName: '後三',
		count: 1,
		multiple: 1,
		amountPerBet: 2,
		rebate: 0,
		amount: 64,
	},
];

