import { Map, } from 'immutable';
import { LoadingStatusEnum, WalletCodeEnum, } from '../../../../lib/enums';
import { actionTypes, } from '../../../../controller';
import groupBy from 'lodash/groupBy';

const {
	PRIMARY,
	SUPERVISION,
} = WalletCodeEnum;

const WalletType = {
	[PRIMARY]: 'primary',
	[SUPERVISION]: 'supervision',
};

const {
	START_FETCH_WALLETS,
	FETCH_WALLETS_SUCCESS,
	FETCH_WALLETS_FAILED,
	UPDATE_WALLET,
} = actionTypes;

const {
	SUCCESS,
	FAILED,
	LOADING,
} = LoadingStatusEnum;

/* Example
data: {
	primary:[{
		"id": 1,
		"userId": 11,
		"name": "彩票钱包",
		"type": 1, // 1: currency, 2: cryptocurrency, 3: 3rd,
		"code": 100, // 100: primary, 101: supervision,
		"balance": "8917.0000",
		"isUsed": true, // 是不是現在選到的錢包
	}],
	supervision:[{
		"id": 2
		"userId": 11,
		"name": "监管钱包",
		"type": 1, // 1: currency, 2: cryptocurrency, 3: 3rd,
		"code": 101, // 100: primary, 101: supervision,
		"balance": "10000.0000",
		"isUsed": false, // 是不是現在選到的錢包
	}],
	...
}

usedWalletData: {
	id: 1,
	userId: 10,
	name: '彩票錢包',
	type: 1, // 1: currency, 2: cryptocurrency, 3: 3rd,
	code: 100, // 100: primary, 101: supervision,
	balance: 5402,
	isUsed: true, // 是不是現在選到的錢包
},
*/

const initialState = Map({
	data: Map(),
	usedWalletData: Map(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
});

export default function wallets(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_WALLETS: {
			return state.set('loadingStatus', LOADING);
		}
		case FETCH_WALLETS_SUCCESS: {
			const walletsData = groupByWalletCode(transferIsUsedToBool(action.wallets));
			const usedWalletData = getUsedWallet(walletsData);

			return state
				.set('data', Map(walletsData))
				.set('usedWalletData', Map(usedWalletData))
				.set('loadingStatus', SUCCESS);
		}
		case FETCH_WALLETS_FAILED: {
			return state
				.set('loadingStatus', FAILED)
				.set('loadingStatusMessage', action.errorMessage);
		}
		case UPDATE_WALLET: {
			const walletType = WalletType[action.wallet.code];
			const wallets = state.get('data').toObject()[walletType];
			const usedWallet = state.get('usedWalletData').toObject();
			const wallet = Object.assign({}, action.wallet, { isUsed: Boolean(action.wallet.isUsed) });

			return state
				.set('usedWalletData', Map(updateUsedWallet(usedWallet, wallet)))
				.setIn(['data', walletType], updateWalletInWallets(wallets, wallet));
		}
		default: {
			return state;
		}
	}
}

function transferIsUsedToBool(walletsData) {
	return walletsData.map(item =>
		Object.assign({}, item, { isUsed: item.isUsed ? true : false, })
	);
}
function groupByWalletCode(wallets) {
	return groupBy(wallets, item => {
		const { code, } = item;

		if (PRIMARY === code) {
			return WalletType[PRIMARY];
		} else if (SUPERVISION === code) {
			return WalletType[SUPERVISION];
		}

		return 'unknown';
	});
}

function getUsedWallet(walletsData) {
	return walletsData.primary.filter(wallet => wallet.isUsed)[0];
}

function updateUsedWallet(usedWallet, wallet) {
	return usedWallet.id === wallet.id ? wallet : usedWallet;
}

function updateWalletInWallets(wallets, wallet) {
	return wallets.map(item => {
		if (item.id === wallet.id) {
			return wallet;
		}
		return item;
	});
}
