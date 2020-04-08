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
};
const defaultProps = {
	isVisible: false,
	intoWallet: '',
	intoWalletBalance: 0,
	usedWalletData: {},
	onCloseModal: () => {},
};

const DepositThirdPartyWalletModal = ({
	isVisible,
	intoWallet,
	intoWalletBalance,
	usedWalletData,
	onCloseModal,
}) => {
	const _handleClickOk = (data) => {
		// TODO dispatch deposit action

		onCloseModal();
	};

	return (
		<ThirdPartyWalletModal
			title="存入外接钱包"
			okText="转入资金"
			isVisible={isVisible}
			fromWallet={usedWalletData.name}
			fromWalletBalance={usedWalletData.balance}
			intoWallet={intoWallet}
			intoWalletBalance={intoWalletBalance}
			onClickCancel={onCloseModal}
			onClickOk={_handleClickOk}
		/>
	);
};

DepositThirdPartyWalletModal.propTypes = propTypes;
DepositThirdPartyWalletModal.defaultProps = defaultProps;

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

export default connect(mapStateToProps, mapDispatchToProps)(DepositThirdPartyWalletModal);
