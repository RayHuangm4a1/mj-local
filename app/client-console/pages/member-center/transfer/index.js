import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import UserInfoBlock from './user-info-block';
import TransferForm from './transfer-form';
import {
	walletPropType,
	fakeThirdPartyData,
} from './utils';
import './style.styl';

const propTypes = {
	userData: PropTypes.shape({
		username: PropTypes.string,
		userProfile: PropTypes.string,
		balance: PropTypes.number,
	}),
	walletsData: PropTypes.shape({
		primary: PropTypes.arrayOf(walletPropType),
		supervision: PropTypes.arrayOf(walletPropType),
	}),
	usedWalletData: walletPropType,
};

const PREFIX_CLASS = 'transfer-page';

class TransferPage extends Component {
	constructor(props) {
		super(props);
		this._handleUpdateWalletInfo = this._handleUpdateWalletInfo.bind(this);
		this._handleTransfer = this._handleTransfer.bind(this);
	}
	_handleUpdateWalletInfo() {
		// TODO: 串接API重新取得錢包資訊
	}
	_handleTransfer(formValues) {
		// TODO: dispatch transfer action
	}

	render() {
		const {
			userData,
			walletsData,
			usedWalletData,
		} = this.props;
		const {
			_handleUpdateWalletInfo,
			_handleTransfer,
		} = this;

		return (
			<div className={PREFIX_CLASS}>
				<UserInfoBlock
					userData={userData}
					usedWalletData={usedWalletData}
					walletsData={walletsData}
					onClickUpdateWalletButton={_handleUpdateWalletInfo}
				/>
				<TransferForm
					primaryWallets={walletsData.primary}
					thirdPartyWallets={fakeThirdPartyData}
					onSubmit={_handleTransfer}
				/>
			</div>
		);
	}
}

TransferPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		userData: state.user.get('data').toObject(),
		walletsData: state.wallets.get('data').toObject(),
		usedWalletData: state.wallets.get('usedWalletData').toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// Add update wallets, transfer action
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(TransferPage);
