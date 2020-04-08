import React, { Component } from 'react';
import PrimaryWallets from './primary-wallets.js';
import ThirdPartyWallets from './third-party-wallets.js';
import SupervisionWallets from './supervision-wallets.js';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import ThirdPartyWalletModal from '../third-party-wallet-modal';
import './style.styl';

const propTypes = {
	walletsData: PropTypes.shape({
		supervision: PropTypes.array,
		primary: PropTypes.array
	}).isRequired,
	isHiddenSupervisionWallet: PropTypes.bool,
};

const defaultProps = {
	supervisionWallets: [],
	isHiddenSupervisionWallet: false,
};

class Wallets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disableButtons: [],
			isDisabled: false,
			oneKeyRecycleText: '一键回收',
			isWithdrawModalVisible: false,
			isDepositModalVisible: false,
			fromWallet: '',
			fromWalletBalance: 0,
			intoWallet: '',
			intoWalletBalance: 0,
		};
		this._handleClickPrimaryWallet = this._handleClickPrimaryWallet.bind(this);
		this._handleClickSupervisionWallet = this._handleClickSupervisionWallet.bind(this);
		this._handleDepositThirdParty = this._handleDepositThirdParty.bind(this);
		this._handleWithdrawThirdParty = this._handleWithdrawThirdParty.bind(this);
		this._handleWithdrawAllThirdParty = this._handleWithdrawAllThirdParty.bind(this);
		this._handleShowDisableTime = this._handleShowDisableTime.bind(this);
		this._renderSupervisionWallets = this._renderSupervisionWallets.bind(this);
	}

	_handleClickPrimaryWallet() {
		// TODO when click primary wallet
	}

	_handleClickSupervisionWallet() {
		// TODO when click supervision wallet
	}

	_handleDepositThirdParty(index) {
		// TODO do error handle when connect third party data

		this.setState({
			intoWallet: fakeThirdPartyData[index].name,
			intoWalletBalance: fakeThirdPartyData[index].balance,
			isDepositModalVisible: true,
		});
	}

	_handleWithdrawThirdParty(index) {
		// TODO do error handle when connect third party data

		this.setState({
			fromWallet: fakeThirdPartyData[index].name,
			fromWalletBalance: fakeThirdPartyData[index].balance,
			isWithdrawModalVisible: true,
		});
	}

	_handleWithdrawAllThirdParty() {
		this._handleShowDisableTime();
	}

	// TODO 之後修改成重新整理依然持續倒數
	// TODO 會有 modal 跳出來確認是否轉出或存入
	_handleShowDisableTime() {
		this.setState({
			isDisabled: true,
			oneKeyRecycleText: '30s',
		});
		const timer = setInterval(() => {
			this.setState({
				oneKeyRecycleText: `${this.state.oneKeyRecycleText.match(/\d+/g) - 1}s `
			});

		},1 * 1000);

		setTimeout(() => {
			clearTimeout(timer);
			this.setState({
				isDisabled: false,
				oneKeyRecycleText: '一键回收'
			});

		},30 * 1000);
	}

	_renderSupervisionWallets() {
		const {
			_handleClickSupervisionWallet
		} = this;
		const {
			isHiddenSupervisionWallet,
			walletsData,
		} = this.props;

		if (isHiddenSupervisionWallet) {
			return null;
		} else {
			return (
				<React.Fragment>
					<div className="ljit-lottery-wallet__wallet-type">
					监管钱包
					</div>
					<SupervisionWallets
						supervisionWallets={walletsData.supervision}
						onClickSupervisionWallet={_handleClickSupervisionWallet}
					/>
				</React.Fragment>
			);
		}
	}

	render() {
		const {
			disableButtons,
			oneKeyRecycleText,
			isDisabled,
			isWithdrawModalVisible,
			isDepositModalVisible,
			fromWallet,
			fromWalletBalance,
			intoWallet,
			intoWalletBalance,
		} = this.state;
		const {
			_handleClickPrimaryWallet,
			_handleWithdrawAllThirdParty,
			_handleDepositThirdParty,
			_handleWithdrawThirdParty,
			_renderSupervisionWallets,
		} = this;
		const {
			walletsData,
		} = this.props;

		return (
			<div className="ljit-lottery-wallet">
				{/* TODO 寫一個共用元件 list item ，有左邊內容(label+icon)和右邊內容(text / button) */}
				<div className="ljit-lottery-wallet__wallet-type">
					彩票钱包
				</div>
				<PrimaryWallets
					primaryWallets={walletsData.primary}
					onClickPrimaryWallet={_handleClickPrimaryWallet}
				/>
				<div className="ljit-lottery-wallet__wallet-type">
					外接钱包
				</div>
				<ThirdPartyWallets
					thirdPartyWallets={fakeThirdPartyData}
					onDepositThirdPartyWallet={_handleDepositThirdParty}
					onWithdrawThirdPartyWallet={_handleWithdrawThirdParty}
					onWithdrawAllThirdPartyWallet={_handleWithdrawAllThirdParty}
					disableButtons={disableButtons}
					oneKeyRecycleText={oneKeyRecycleText}
					isDisabled={isDisabled}
				/>
				{_renderSupervisionWallets()}
				<ThirdPartyWalletModal.Withdraw
					isVisible={isWithdrawModalVisible}
					fromWallet={fromWallet}
					fromWalletBalance={fromWalletBalance}
					onCloseModal={() => this.setState({ isWithdrawModalVisible: false, })}
				/>
				<ThirdPartyWalletModal.Deposit
					isVisible={isDepositModalVisible}
					intoWallet={intoWallet}
					intoWalletBalance={intoWalletBalance}
					onCloseModal={() => this.setState({ isDepositModalVisible: false, })}
				/>
			</div>
		);
	}
}

Wallets.propTypes = propTypes;
Wallets.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		walletsData: state.wallets.get('data').toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {

	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);

// TODO get third party wallet from walletsData
const fakeThirdPartyData = [
	{
		name: 'AG',
		balance: 10000,
	},
	{
		name: 'KY',
		balance: 10000,
	},
];
