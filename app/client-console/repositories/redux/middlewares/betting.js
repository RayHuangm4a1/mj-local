import {
	actionTypes,
	bettingActions,
} from '../../../controller';

const { START_BET, } = actionTypes;
const {
	setBettingProcessNoPasswordAction,
} = bettingActions;

const BettingMiddleware = ({ getState, dispatch }) => (next) => (action) => {
	if (action.type === START_BET) {
		const {
			userSecurity,
			user,
		} = getState();

		const userSecurityData = userSecurity.get('data').toObject();
		const isEnabledCredential = userSecurityData.betCredential.isEnabled;
		const isUserValidatedByPassword = user.get('isUserValidatedByPassword');

		if (isEnabledCredential && !isUserValidatedByPassword && !action.password) {
			dispatch(setBettingProcessNoPasswordAction());

			return null;
		}
	}

	return next(action);
};

export default BettingMiddleware;
