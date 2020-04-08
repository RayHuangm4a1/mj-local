import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import BettingCheckout from '../betting-checkout';
import {
	Icon,
	Badge,
	DecimalNumber,
} from 'ljit-react-components';

const propTypes = {
	bettingCount: PropTypes.number,
	amount: PropTypes.number,
	bonus: PropTypes.number,
	balance: PropTypes.number,
	onClickShoppintCart: PropTypes.func,
	onClickAddShoppingCart: PropTypes.func,
	isDisabled: PropTypes.bool,
	onClickBet: PropTypes.func,
	badgeCount: PropTypes.number,
};

const defaultProps = {
	bettingCount: 0,
	amount: 0,
	bonus: 0,
	balance: 0,
	badgeCount: 0,
	onClickShoppintCart: () => {},
	onClickAddShoppingCart: () => {},
	onClickBet: () => {},
};

class StandardBettingCheckout extends Component {
	constructor() {
		super();
		this._renderBettingText = this._renderBettingText.bind(this);
		this._renderShoppingCartContainer = this._renderShoppingCartContainer.bind(this);
	}
	_renderBettingText() {
		const {
			bettingCount,
			amount,
			bonus,
		} = this.props;

		return (
			<div className="ljit-mobile-betting-checkout__betting-text">
				已选 <span> {bettingCount} </span> 注, 共 <span> <DecimalNumber data={amount} hasSeparator decimalPlaces={2}/> </span> 元  獎金 <span> {bonus} </span>
			</div>
		);
	}

	_renderShoppingCartContainer() {
		const { onClickShoppintCart, onClickAddShoppingCart, badgeCount } = this.props;

		let badge;

		if (badgeCount) {
			badge = (<Badge
				count={badgeCount}
				className="ljit-mobile-betting-checkout__shopping-cart-badge"
			/>);
		} else {
			badge = null;
		}

		return (
			<div className="ljit-mobile-betting-checkout__shopping-cart-bar">
				<div onClick={onClickShoppintCart}>
					<div>
						<Icon
							type={Icon.IconTypeEnums.SHOPPING_CART}
							size={Icon.SizeEnums.LARGE}
						/>
						{badge}
					</div>
					购物车
				</div>
				<div onClick={onClickAddShoppingCart}>
					<Icon
						type={Icon.IconTypeEnums.PLUS_CIRCLE}
						size={Icon.SizeEnums.LARGE}
					/>
					<br/>
					加到购物车
				</div>
			</div>
		);
	}

	render() {
		const {
			_renderBettingText,
			_renderShoppingCartContainer,
		} = this;
		const {
			balance,
			isDisabled,
			onClickBet,
		} = this.props;

		return (
			<BettingCheckout
				bettingText={_renderBettingText()}
				left={_renderShoppingCartContainer()}
				onClickBet={onClickBet}
				balance={balance}
				isDisabled={isDisabled}
			/>
		);
	}
}

StandardBettingCheckout.propTypes = propTypes;
StandardBettingCheckout.defaultProps = defaultProps;

export default StandardBettingCheckout;
