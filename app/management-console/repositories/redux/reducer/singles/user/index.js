import { combineReducers } from 'redux';
import profile from './profile';
import stats from './stats';
import withdrawalMessage from './withdrawal-message';
import bankCards from './bank-cards';
import account from './account';
import wallets from './wallets';
import comments from './comments';
import dividendSettings from './dividend-settings';
import financeLevel from './finance-level';

// TODO 整合完後移除 account/user-detail.js 跟 account/user.js
// TODO 把與 user 相關的 reducer 都放在這個底下（reducer/single/user）
const user = combineReducers({
	profile,
	stats,
	withdrawalMessage,
	bankCards,
	account,
	wallets,
	comments,
	dividendSettings,
	financeLevel,
});

export default user;
