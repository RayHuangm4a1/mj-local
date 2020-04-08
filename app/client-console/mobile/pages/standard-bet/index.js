import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { StandardBettingElement, Button, Icon, TextButton } from 'ljit-react-components';
import { LotteryClassIdEnum, } from '../../../../lib/lotteries';
import MobileBettingCheckout from '../../../components/mobile-betting-checkout';
import DropdownMenu from './dropdown-menu';
import { NavigationKeyEnums, } from '../../navigation';
import MobileDrawingCountDownBlock from '../../../components/mobile-drawing-count-down-block';
import MobileDrawingCodeBallBlock from '../../../components/mobile-drawing-code-ball-block';
import MobileBettingAmountSelectBlock from '../../../components/mobile-betting-amout-select-block';
import './style.styl';

export const PREFIX_CLASS = 'standard-bet-page';
const propTypes = {
	onNavigate: PropTypes.func.isRequired
};

const DEFAULT_AMOUNT_PER_BET = 1;
const DEFAULT_MULTIPLE = 1;

class StandardBetPage extends Component {
	constructor() {
		super();
		this.state = {
			amountPerBet: DEFAULT_AMOUNT_PER_BET,
			multiple: DEFAULT_MULTIPLE,
			isOpen: false,
		};
		this._handleClickXinYong = this._handleClickXinYong.bind(this);
		this._handleClickTrend = this._handleClickTrend.bind(this);
		this._handleClickTextButton = this._handleClickTextButton.bind(this);
		this._handleRenderRight = this._handleRenderRight.bind(this);
		this._handleUpdateCombination = this._handleUpdateCombination.bind(this);
		this._handleUpdatePosition = this._handleUpdatePosition.bind(this);
		this._handleClickClearAll = this._handleClickClearAll.bind(this);
		this._handleClickRefreshBalance = this._handleClickRefreshBalance.bind(this);
		this._handleChangeAmountPerBet = this._handleChangeAmountPerBet.bind(this);
		this._handleChangeMultiple = this._handleChangeMultiple.bind(this);
		this._handleClickShoppingCart = this._handleClickShoppingCart.bind(this);
		this._handleClickAddShoppingCart = this._handleClickAddShoppingCart.bind(this);
		this._handleClickBet = this._handleClickBet.bind(this);
	}

	_handleClickXinYong() {
		const { onNavigate } = this.props;

		onNavigate({
			page: NavigationKeyEnums.XINYONG_BET,
			navigationType: 'push',
		});
	}
	_handleClickTrend() {
		// TODO click trend button
		console.log('trend');
	}
	// TODO 確認各 lottery 右邊的 render
	_handleRenderRight(lotteryClassId) {
		switch (lotteryClassId) {
			case LotteryClassIdEnum.KL8: 
				return (
					<Button
						className={`${PREFIX_CLASS}__button-block`}
						outline={Button.OutlineEnums.HOLLOW}
						color={Button.ColorEnums.ORANGE}
						onClick={() => {console.log('open');}}
					> 立即开奖 </Button>
				);
			case LotteryClassIdEnum.PK10: 
				return (
					<div
						onClick={() => {console.log('random');}}
						className={`${PREFIX_CLASS}__random-block`}
					>
						<Icon
							type={Icon.IconTypeEnums.PHONE}
							size={Icon.SizeEnums.X_LARGE}
						/>
						机选
					</div>
				);
			case LotteryClassIdEnum.SSC: {
				const { isOpen } = this.state;
				const { _handleClickTextButton } = this;

				return (
					<div className={`${PREFIX_CLASS}__text-label-block`}>
						賠率
						<TextButton
							text={isOpen ? '关闭': '显示'}
							fontSize={TextButton.SizeEnums.SMALL}
							onClick={_handleClickTextButton}
						/>
					</div>
				);
			}
			default: 
				return null;
		}
	}

	_handleClickTextButton() {
		this.setState({
			isOpen: !this.state.isOpen,
		});
	}
	_handleUpdateCombination(combination) {
		// TODO do something when options be selected
		console.log('StandardBettingElementSample combination', combination);
	}

	_handleUpdatePosition(position) {
		// TODO do something when bet be selected
		console.log('StandardBettingElementSample position', position);
	}

	_handleClickClearAll() {
		// TODO click clear all button
		console.log('click clear');
	}

	_handleClickRefreshBalance() {
		// TODO click refresh button
		console.log('click refresh balance');
	}

	_handleChangeAmountPerBet(amountPerBet) {
		this.setState({ amountPerBet, });
	}

	_handleChangeMultiple(multiple) {
		this.setState({ multiple, });
	}

	_handleClickShoppingCart() {
		const { onNavigate } = this.props;

		onNavigate({
			page: NavigationKeyEnums.SHOPPING_CART,
			navigationType: 'push',
		});
	}

	_handleClickAddShoppingCart() {
		// TODO add betting
		console.log('add betting');
	}

	_handleClickBet() {
		// TODO betting
		console.log('betting');
	}

	render() {
		const { amountPerBet, multiple } = this.state;
		const {
			_handleClickXinYong,
			_handleClickTrend,
			_handleClickShoppingCart,
			_handleRenderRight,
			_handleClickClearAll,
			_handleClickRefreshBalance,
			_handleChangeAmountPerBet,
			_handleChangeMultiple,
			_handleUpdateCombination,
			_handleUpdatePosition,
			_handleClickAddShoppingCart,
			_handleClickBet,
		} = this;
		const StandardBettingElementMobile =
			StandardBettingElement.get(LotteryClassIdEnum.SSC, 1, 94);
		const right = _handleRenderRight(LotteryClassIdEnum.SSC);

		return (
			<div className={PREFIX_CLASS}>
				<DropdownMenu/>
				{/* TODO 加入判斷，當是秒秒彩的時候，不顯示這一個 Component */}
				<MobileDrawingCountDownBlock
					onClickToggleXinyong={_handleClickXinYong}
					onClickTrend={_handleClickTrend}
				/>
				<MobileDrawingCodeBallBlock
					lotteryClassId={LotteryClassIdEnum.KL8}
					opencode={"1,2,3,4,5"}
					issue={"123"}
					right={right}
				/>
				<div className={`${PREFIX_CLASS}__betting-block`}>
					<StandardBettingElementMobile
						isMobile={true}
						onUpdateCombination={_handleUpdateCombination}
						onUpdatePosition={_handleUpdatePosition}
					/>
					<MobileBettingAmountSelectBlock
						onClickClearAll={_handleClickClearAll}
						onClickRefreshBalance={_handleClickRefreshBalance}
						amountPerBet={amountPerBet}
						onChangeAmountPerBet={_handleChangeAmountPerBet}
						multiple={multiple}
						onChangeMultiple={_handleChangeMultiple}
					/>
				</div>
				<MobileBettingCheckout.Standard
					onClickShoppintCart={_handleClickShoppingCart}
					onClickAddShoppingCart={_handleClickAddShoppingCart}
					onClickBet={_handleClickBet}
				/>
			</div>
		);
	}
}

StandardBetPage.propTypes = propTypes;

export default StandardBetPage;
