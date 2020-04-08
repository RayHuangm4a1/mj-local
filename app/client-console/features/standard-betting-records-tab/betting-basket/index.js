import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	TextButton,
	StandardSelectedBettingCard,
	Panel,
} from 'ljit-react-components';
import StandardBettingCheckoutFeature from '../../standard-betting-checkout';
import './style.styl';

/**
 * TODO replace button color theme
 */

const propTypes = {
	bettings: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string,
		lotteryName: PropTypes.string,
		betcontent: PropTypes.string,
		multiple: PropTypes.number,
		amountPerBet: PropTypes.number,
		count: PropTypes.number,
		amount: PropTypes.number,
		rebate: PropTypes.number,
	})),
	onClearBettings: PropTypes.func,
	onDeleteBetting: PropTypes.func,
};

const PREFIX_CLASS = 'betting-basket';

const defaultProps = {
	bettings: [],
	onClearBettings: () => {},
	onDeleteBetting: () => {},
};

class BettingBasket extends Component {
	constructor() {
		super();
		this._handleDeleteCard = this._handleDeleteCard.bind(this);
		this._renderBettingCards = this._renderBettingCards.bind(this);
	}

	_handleDeleteCard(index) {
		this.props.onDeleteBetting(index);
	}

	_renderBettingCards() {
		const { bettings, } = this.props;
		const { _handleDeleteCard, } = this;

		if (bettings.length > 0) {
			return bettings.map((item, index) => {
				const {
					name,
					lotteryName,
					weizhi,
					count,
					multiple,
					amountPerBet,
					amount,
					betcontent,
				} = item;

				return <StandardSelectedBettingCard
					className={`${PREFIX_CLASS}__card`}
					key={`betting-basket-card-${index}`}
					betting={{
						lotteryName,
						name,
						weizhi,
						count,
						multiple,
						amountPerBet,
						amount,
						betcontent,
					}}
					onClickClose={() => _handleDeleteCard(index)}
				/>;
			});
		} else {
			return (
				<StandardSelectedBettingCard
					className={cx(`${PREFIX_CLASS}__card`, `${PREFIX_CLASS}__card--default`)}
					betting={{
						lotteryName: '-',
					}}
				/>
			);
		}
	}

	render() {
		const { onClearBettings, } = this.props;
		const {
			_renderBettingCards,
		} = this;

		return (
			<Panel
				className={`${PREFIX_CLASS}__tab-panel`}
				headerTitle="号码篮"
				headerRight={
					<TextButton
						className={`${PREFIX_CLASS}__clear-basket-button`}
						onClick={onClearBettings}
						fontSize={TextButton.SizeEnums.SMALL}
						text="清空号码篮"
					/>
				}
				content={_renderBettingCards()}
				footer={<StandardBettingCheckoutFeature/>}
			/>
		);
	}
}

BettingBasket.propTypes = propTypes;
BettingBasket.defaultProps = defaultProps;

export default BettingBasket;
