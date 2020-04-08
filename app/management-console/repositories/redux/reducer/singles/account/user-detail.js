import { Map, Record, } from 'immutable';
import set from 'lodash/set';
import { actionTypes, } from '../../../../../controller';
import { LoadingStatusEnum } from '../../../../../lib/enums';

const UserDetailRecord = Record({
	id: null,
	username: '',
	ancestors: [],
	createdAt: '',
	credentials: {},
	details: {},
	iconUrl: '',
	isOnline: null,
	lastLoginAudit: {},
	nickname: '',
	payer: '',
	status: 'hide',
	type: 3,
});

class UserDetail extends UserDetailRecord {
	_getKeyPathRoot(keyPath = []) {
		return keyPath.slice().shift();
	}
	_getKeyPathChildren(keyPath = []) {
		return keyPath.slice(1);
	}
	_setNestedValue(value, keyPath = []) {
		const keyPathRoot = this._getKeyPathRoot(keyPath);
		const keyPathChildren = this._getKeyPathChildren(keyPath);
		const root = this.get(keyPathRoot);

		const updatedValue = set(root, keyPathChildren, value);

		return this.set(keyPathRoot, updatedValue);
	}

	setNickname(nickname) {
		return this.set('nickname', nickname);
	}

	setStatus(status) {
		return this.set('status', status);
	}

	setType(type) {
		return this.set('type', type);
	}

	setPayer(payer) {
		return this.set('payer', payer);
	}

	setLoginPassword(loginPassword) {
		return this._setNestedValue(loginPassword, ['credentials', 'loginPassword']);
	}

	setFundsPassword(fundsPassword) {
		return this._setNestedValue(fundsPassword, ['credentials', 'fundsPassword']);
	}

	setFinPassword(finPassword) {
		return this._setNestedValue(finPassword, ['credentials', 'finPassword']);
	}

	setBlockBetting(blockBetting = {}) {
		return this._setNestedValue(blockBetting, ['details', 'policy', 'blockBetting']);
	}

	setBlockDeposit(blockDeposit = {}) {
		return this._setNestedValue(blockDeposit, ['details', 'policy', 'blockDeposit']);
	}

	setBlockWithdrawal(blockWithdrawal = {}) {
		return this._setNestedValue(blockWithdrawal, ['details', 'policy', 'blockWithdrawal']);
	}

	setBlockDepositTransfer(blockDepositTransfer = {}) {
		return this._setNestedValue(blockDepositTransfer, ['details', 'policy', 'blockDepositTransfer']);
	}

	setBlockDividendTransfer(blockDividendTransfer = {}) {
		return this._setNestedValue(blockDividendTransfer, ['details', 'policy', 'blockDividendTransfer']);
	}

	setAlertUser(alertUser = {}) {
		return this._setNestedValue(alertUser, ['details', 'policy', 'alertUser']);
	}

	setLevel(level = {}) {
		return this._setNestedValue(level, ['details', 'level']);
	}
}

// user-detail
// Map({
// 	numOfDescendants: 0,
// 	nickname: null,
// 	greeting: null,
// 	status: "active",
// 	id: 13,
// 	username: "test0301",
// 	type: 2,
// 	parentId: 12,
// 	parentUsername: "test01",
// 	deltaBonus: -2,
// 	isOnline: true
// 	// 可能會變動
// })

const {
	START_FETCH_USER_DETAIL,
	FETCH_USER_DETAIL_SUCCESS,
	FETCH_USER_DETAIL_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_BETTING,
	UPDATE_USER_DETAIL_BLOCK_BETTING_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_BETTING_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT,
	UPDATE_USER_DETAIL_BLOCK_DEPOSIT_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_DEPOSIT_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL,
	UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL_FAILED,
	START_UPDATE_USER_DETAIL_FUNDS_PASSWORD,
	UPDATE_USER_DETAIL_FUNDS_PASSWORD_SUCCESS,
	UPDATE_USER_DETAIL_FUNDS_PASSWORD_FAILED,
	START_UPDATE_USER_DETAIL_FIN_PASSWORD,
	UPDATE_USER_DETAIL_FIN_PASSWORD_SUCCESS,
	UPDATE_USER_DETAIL_FIN_PASSWORD_FAILED,
	START_UPDATE_USER_DETAIL_LOGIN_PASSWORD,
	UPDATE_USER_DETAIL_LOGIN_PASSWORD_SUCCESS,
	UPDATE_USER_DETAIL_LOGIN_PASSWORD_FAILED,
	START_UPDATE_USER_DETAIL_STATUS,
	UPDATE_USER_DETAIL_STATUS_SUCCESS,
	UPDATE_USER_DETAIL_STATUS_FAILED,
	START_UPDATE_USER_DETAIL_NICKNAME,
	UPDATE_USER_DETAIL_NICKNAME_SUCCESS,
	UPDATE_USER_DETAIL_NICKNAME_FAILED,
	START_UPDATE_USER_DETAIL_TYPE,
	UPDATE_USER_DETAIL_TYPE_SUCCESS,
	UPDATE_USER_DETAIL_TYPE_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER,
	UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER_FAILED,
	START_UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER,
	UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER_SUCCESS,
	UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER_FAILED,
	START_UPDATE_USER_DETAIL_ALERT_USER,
	UPDATE_USER_DETAIL_ALERT_USER_SUCCESS,
	UPDATE_USER_DETAIL_ALERT_USER_FAILED,
	START_UPDATE_USER_DETAIL_LEVEL,
	UPDATE_USER_DETAIL_LEVEL_SUCCESS,
	UPDATE_USER_DETAIL_LEVEL_FAILED,
	START_UPDATE_USER_DETAIL_PAYER,
	UPDATE_USER_DETAIL_PAYER_SUCCESS,
	UPDATE_USER_DETAIL_PAYER_FAILED,
} = actionTypes;

const initialState = Map({
	data: Map(),

	loadingStatus: LoadingStatusEnum.NONE,
	loadingStatusMessage: '',
	updateLoadingStatus: LoadingStatusEnum.NONE,
	updateLoadingStatusMessage: '',
});

export default function userDetail(state = initialState, action) {
	switch (action.type) {
		case START_FETCH_USER_DETAIL:
			return state.set('loadingStatus', LoadingStatusEnum.LOADING);
		case FETCH_USER_DETAIL_SUCCESS:
			return state
				.set('data', new UserDetail(action.payload))
				.set('loadingStatus', LoadingStatusEnum.SUCCESS);
		case FETCH_USER_DETAIL_FAILED:
			return state
				.set('loadingStatus', LoadingStatusEnum.FAILED)
				.set('loadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_BLOCK_BETTING:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_BLOCK_BETTING_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setBlockBetting(data.blockBetting))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_BLOCK_BETTING_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_BLOCK_DEPOSIT_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setBlockDeposit(data.blockDeposit))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_BLOCK_DEPOSIT_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setBlockWithdrawal(data.blockWithdrawal))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_BLOCK_WITHDRAWAL_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_FUNDS_PASSWORD:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_FUNDS_PASSWORD_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data',  state.get('data').setFundsPassword(data.fundsPassword))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_FUNDS_PASSWORD_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_FIN_PASSWORD:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_FIN_PASSWORD_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data',  state.get('data').setFinPassword(data.finPassword))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_FIN_PASSWORD_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_LOGIN_PASSWORD:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_LOGIN_PASSWORD_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setLoginPassword(data.loginPassword))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_LOGIN_PASSWORD_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_STATUS:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_STATUS_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setStatus(data.status))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_STATUS_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_NICKNAME:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_NICKNAME_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setNickname(data.nickname))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_NICKNAME_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);
		case START_UPDATE_USER_DETAIL_TYPE:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_TYPE_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setType(data.type))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_TYPE_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setBlockDepositTransfer(data.blockDepositTransfer))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_BLOCK_DEPOSIT_TRANSFER_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setBlockDividendTransfer(data.blockDividendTransfer))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_BLOCK_DIVIDEND_TRANSFER_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);

		case START_UPDATE_USER_DETAIL_ALERT_USER:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_ALERT_USER_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setAlertUser(data.alertUser))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_ALERT_USER_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);
		case START_UPDATE_USER_DETAIL_LEVEL:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_LEVEL_SUCCESS:
			{
				const {
					data = {},
				} = action;

				return state
					.set('data', state.get('data').setLevel(data.level))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_LEVEL_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);
		case START_UPDATE_USER_DETAIL_PAYER:
			return state.set('updateLoadingStatus', LoadingStatusEnum.LOADING);
		case UPDATE_USER_DETAIL_PAYER_SUCCESS:
			{
				const {
					payer,
				} = action;

				return state
					.set('data', state.get('data').setPayer(payer))
					.set('updateLoadingStatus', LoadingStatusEnum.SUCCESS);
			}
		case UPDATE_USER_DETAIL_PAYER_FAILED:
			return state
				.set('updateLoadingStatus', LoadingStatusEnum.FAILED)
				.set('updateLoadingStatusMessage', action.errorMessage);
		default:
			return state;
	}
}
