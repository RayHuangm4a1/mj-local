import React, { forwardRef, useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import { WalletsInfoCard, } from 'ljit-react-components';
import { walletPropType, SelectorTypeEnums, } from './utils';

const {
	BASIC,
	INCOMING,
	OUTGOING,
	DISABLED,
} = WalletsInfoCard.StatusEnums;

const { OUT, IN, ALL, NONE, } = SelectorTypeEnums;

const WalletTypeEnums = {
	PRIMARY: 'primary',
	THIRD_PARTY: 'third-party',
};

const { PRIMARY, THIRD_PARTY, } = WalletTypeEnums;

const propTypes = {
	type: PropTypes.oneOf([OUT, IN, ALL, NONE]),
	selectedWallets: PropTypes.shape({
		primary: walletPropType,
		thirdParty: walletPropType,
	}),
	primaryWallets: PropTypes.arrayOf(walletPropType),
	thirdPartyWallets: PropTypes.arrayOf(walletPropType),
	onChange: PropTypes.func,
};

const defaultProps = {
	type: NONE,
	primaryWallets: [],
	thirdPartyWallets: [],
};

const PREFIX_CLASS = 'wallet-selector';

function getWalletStatus(type, walletType) {
	if (walletType === PRIMARY) {
		switch (type) {
			case OUT: return OUTGOING;
			case IN:
			case ALL: return INCOMING;
			default: return DISABLED;
		}
	}
	if (walletType === THIRD_PARTY) {
		switch (type) {
			case OUT: return INCOMING;
			case IN: return OUTGOING;
			case ALL: 
			default: return DISABLED;
		}
	}
}

function initWalletStatus(selectedWallet, wallets, type, walletType) {
	return wallets.map((wallet) => {
		if (selectedWallet.id && selectedWallet.id === wallet.id) {
			return { ...wallet, status: getWalletStatus(type, walletType), };
		} else {
			const status = type === NONE ? DISABLED : BASIC;

			return ({ ...wallet, status, });
		}
	});
}

function getNextWalletStatus(walletsStatus, id, status) {
	return walletsStatus.map(wallet => {
		if (wallet.id === id && wallet.status !== DISABLED) {
			if (status === wallet.status) {
				return { ...wallet, status: BASIC, };
			} else {
				return { ...wallet, status, };
			}
		}
		return { ...wallet, status: BASIC, };
	});
}

function isWalletSelected(wallet) {
	return wallet.status !== BASIC && wallet.status !== DISABLED;
}

const WalletSelector = forwardRef(({
	type,
	selectedWallets,
	primaryWallets,
	thirdPartyWallets,
	onChange,
}, ref) => {
	const {
		primary,
		thirdParty,
	} = selectedWallets;
	const [ primaryWalletsStatus, setPrimaryWalletStatus ] = useState(initWalletStatus(primary, primaryWallets, type, PRIMARY));
	const [ thirdPartyWalletsStatus, setThirdPartyWalletStatus ] = useState(initWalletStatus(thirdParty, thirdPartyWallets, type, THIRD_PARTY));

	useEffect(() => {
		if (!primary.status) {
			onChange({
				primary: { ...primaryWallets[0], status: getWalletStatus(type, PRIMARY), },
				thirdParty,
			});
		}
	});
	useEffect(() => {
		setPrimaryWalletStatus(initWalletStatus(primary, primaryWallets, type, PRIMARY));
		if (type === ALL) {
			const status = DISABLED;
			const thirdPartyWalletsStatus = thirdPartyWallets.map(wallet => ({ ...wallet, status, }));

			setThirdPartyWalletStatus(thirdPartyWalletsStatus);
		} else {
			setThirdPartyWalletStatus(initWalletStatus(thirdParty, thirdPartyWallets, type, THIRD_PARTY));
		}
	}, [type, primary, thirdParty]);

	function _handleChangeThirdPartyWalletStatus(wallet) {
		const status = getWalletStatus(type, THIRD_PARTY);
		const newThirdPartyWalletStatus = getNextWalletStatus(thirdPartyWalletsStatus, wallet.id, status);

		onChange({
			primary,
			thirdParty: newThirdPartyWalletStatus.filter(isWalletSelected)[0] || {},
		});
	}
	function _renderPrimaryWallets() {
		return primaryWalletsStatus.map((wallet) => {
			return (
				<WalletsInfoCard
					className="wallet-info-card"
					key={wallet.id}
					name={wallet.name}
					value={wallet.balance}
					size={WalletsInfoCard.SizeEnums.MEDIUM}
					iconColor={WalletsInfoCard.IconColorEnums.YELLOW}
					status={wallet.status}
				/>
			);
		});
	}
	function _renderThirdPartyWallets() {
		return thirdPartyWalletsStatus.map((wallet) => {
			return (
				<WalletsInfoCard
					className="wallet-info-card"
					key={wallet.id}
					name={wallet.name}
					value={wallet.balance}
					size={WalletsInfoCard.SizeEnums.MEDIUM}
					iconColor={WalletsInfoCard.IconColorEnums.GREEN}
					status={wallet.status}
					onClick={() => _handleChangeThirdPartyWalletStatus(wallet)}
				/>
			);
		});
	}
	
	return (
		<div ref={ref} className={PREFIX_CLASS}>
			<div className={`${PREFIX_CLASS}__primary`}>{_renderPrimaryWallets()}</div>
			<div className={`${PREFIX_CLASS}__third-party`}>{_renderThirdPartyWallets()}</div>
		</div>
	);
});

WalletSelector.propTypes = propTypes;
WalletSelector.defaultProps = defaultProps;
WalletSelector.displayName = 'WalletSelector';

export default WalletSelector;
