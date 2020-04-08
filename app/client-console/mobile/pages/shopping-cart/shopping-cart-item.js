import React from 'react';
import PropTypes from 'prop-types';
import { PREFIX_CLASS } from './';
import { IconButton } from 'ljit-react-components';
const propTypes = {
	// TODO 確認資料結構
	bet: PropTypes.object,
	onClickDelete: PropTypes.func,
};

const defaultProps = {
	bet: {},
	onClickDelete: () => {},
};

function ShoppingCartItem({
	bet,
	onClickDelete, 
}) {

	const {
		betcontent,
		lotteryName,
		playConditionName,
		play,
		amountPerBet,
		multiple,
		count,
		amount,
	} = bet;

	return (
		<div
			className={`${PREFIX_CLASS}__bet`}
		>
			<div>
				<p> {betcontent.replace(/,/g,' ')} </p>
				<p> [{lotteryName}] - [{playConditionName}] - [{play.name}] </p>
				<p> {amountPerBet}元一注 {multiple}倍 共{count}注 花费{amount}元</p>
			</div>
			<IconButton
				type={IconButton.IconTypeEnums.PLUS_CIRCLE}
				size={IconButton.SizeEnums.MIDDLE}
				onClick={onClickDelete}
			/>
		</div>
	);
}

ShoppingCartItem.propTypes = propTypes;
ShoppingCartItem.defaultProps = defaultProps;

export default ShoppingCartItem;
