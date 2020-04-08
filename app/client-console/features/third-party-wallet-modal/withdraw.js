import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import ThirdPartyWalletModal from '../../components/third-party-wallet-modal';

const propTypes = {
	isVisible: PropTypes.bool,
	fromWallet: PropTypes.string,
	fromWalletBalance: PropTypes.number,
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
	fromWallet: '',
	fromWalletBalance: 0,
	usedWalletData: {},
	onCloseModal: () => {},
};

const WithdrawThirdPartyWalletModal = ({
	isVisible,
	fromWallet,
	fromWalletBalance,
	usedWalletData,
	onCloseModal,
}) => {
	const _handleClickOk = (data) => {
		// TODO dispatch withdraw action

		onCloseModal();
	};

	return (
		<ThirdPartyWalletModal
			title="回收外接钱包"
			okText="转入资金"
			isVisible={isVisible}
			fromWallet={fromWallet}
			fromWalletBalance={fromWalletBalance}
			intoWallet={usedWalletData.name}
			intoWalletBalance={usedWalletData.balance}
			onClickCancel={onCloseModal}
			onClickOk={_handleClickOk}
		/>
	);
};

WithdrawThirdPartyWalletModal.propTypes = propTypes;
WithdrawThirdPartyWalletModal.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		usedWalletData: state.wallets.get('usedWalletData').toObject()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO add withdraw action
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawThirdPartyWalletModal);
