import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, } from 'ljit-react-components';

const propTypes = {
	thirdPartyWallets: PropTypes.arrayOf(PropTypes.shape({
		userId: PropTypes.number,
		name: PropTypes.string,
		type: PropTypes.number,
		code: PropTypes.number,
		balance: PropTypes.number,
		isUsed: PropTypes.bool,
	})),
	onDepositThirdPartyWallet: PropTypes.func,
	onWithdrawThirdPartyWallet: PropTypes.func,
	onWithdrawAllThirdPartyWallet: PropTypes.func,
	oneKeyRecycleText: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	disableButtons: PropTypes.array,
	isDisabled: PropTypes.bool,
};

const defaultProps = {
	thirdPartyWallets:[],
	onDepositThirdPartyWallet: () => {},
	onWithdrawThirdPartyWallet: () => {},
	onWithdrawAllThirdPartyWallet: () => {},
	oneKeyRecycleText: '一鍵回收',
	disableButtons: [],
	isDisabled: false,
};

class ThirdPartyWallets extends Component {
	constructor() {
		super();
		this._renderThirdPartyWallet = this._renderThirdPartyWallet.bind(this);
	}
	_renderThirdPartyWallet() {
		const { thirdPartyWallets, onDepositThirdPartyWallet, onWithdrawThirdPartyWallet, disableButtons } = this.props;

		return (
			thirdPartyWallets.map((item,index) => {
				const { name, balance, } = item;
				const isDisabled = disableButtons.includes(index);

				return (
					<div
						className="ljit-lottery-wallet__item"
						key={`lottery-wallet-${index}`}
					>
						<div className="ljit-lottery-wallet__item__third__party">
							<p>{name}钱包</p>
							<p>{balance}</p>
						</div>
						<div>
							<Button
								onClick={() => { onDepositThirdPartyWallet(index); }}
								disabled={isDisabled}
								className="ljit-lottery-wallet__button"
								outline={Button.OutlineEnums.HOLLOW}
								color={Button.ColorEnums.ORANGE}
							> 存入 </Button>
							<Button
								onClick={() => { onWithdrawThirdPartyWallet(index); }}
								disabled={isDisabled}
								className="ljit-lottery-wallet__button"
								outline={Button.OutlineEnums.HOLLOW}
								color={Button.ColorEnums.ORANGE}
							> 回收 </Button>
						</div>
					</div>
				);
			})
		);
	}
	render() {
		const { isDisabled, oneKeyRecycleText, onWithdrawAllThirdPartyWallet, } = this.props;
		const { _renderThirdPartyWallet, } = this;

		return (
			<div className="ljit-lottery-wallet__container">
				<div className="ljit-lottery-wallet__item">
					<div>
						<Icon type={Icon.IconTypeEnums.WALLET_MULTICOLOR} size={Icon.SizeEnums.X_SMALL}/>
						<p>外接钱包</p>
					</div>
					<Button
						onClick={onWithdrawAllThirdPartyWallet}
						disabled={isDisabled}
						outline={Button.OutlineEnums.SOLID}
						color={Button.ColorEnums.ORANGE}
						className="ljit-lottery-wallet__button ljit-lottery-wallet__button--withdraw-all"
					>{oneKeyRecycleText}</Button>
				</div>
				{_renderThirdPartyWallet()}
			</div>
		);
	}
}

ThirdPartyWallets.propTypes = propTypes;
ThirdPartyWallets.defaultProps = defaultProps;

export default ThirdPartyWallets;
