import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import ThirdPartyWalletModal from '../../components/third-party-wallet-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	intoWallet: PropTypes.string,
	intoWalletBalance: PropTypes.number,
	usedWalletData: PropTypes.shape({
		id: PropTypes.number,
		userId: PropTypes.number,
		username: PropTypes.string,
		name: PropTypes.string,
		type: PropTypes.number,
		code: PropTypes.number,
		balance: PropTypes.number,
		isUsed: PropTypes.bool,
	}),
	onCloseModal: PropTypes.func,
	onClickEntryGame: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	intoWallet: '',
	intoWalletBalance: 0,
	usedWalletData: {},
	onCloseModal: () => {},
	onClickEntryGame: () => {},
};

const EnterGameThirdPartyWalletModal = ({
	isVisible,
	intoWallet,
	intoWalletBalance,
	usedWalletData,
	onCloseModal,
	onClickEntryGame,
}) => {
	const _handleClickOk = (data) => {
		// TODO dispatch deposit action

		onClickEntryGame();
		onCloseModal();
	};
	const _handleClickEntryGame = () => {
		onClickEntryGame();
		onCloseModal();
	};

	return (
		<ThirdPartyWalletModal
			hasEntryGameButton
			title="存入外接钱包"
			okText="转入资金"
			isVisible={isVisible}
			fromWallet={usedWalletData.name}
			fromWalletBalance={usedWalletData.balance}
			intoWallet={intoWallet}
			intoWalletBalance={intoWalletBalance}
			onClickCancel={onCloseModal}
			onClickOk={_handleClickOk}
			onClickEntryGame={_handleClickEntryGame}
		/>
	);
};

EnterGameThirdPartyWalletModal.propTypes = propTypes;
EnterGameThirdPartyWalletModal.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		usedWalletData: state.wallets.get('usedWalletData').toObject()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO add deposit action
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterGameThirdPartyWalletModal);
