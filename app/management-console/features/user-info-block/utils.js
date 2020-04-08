import PropTypes from 'prop-types';
import { UserTypeEnum, UserStatusEnum, } from '../../lib/enums';

export const PREFIX_CLASS = 'user-info-block';

export const DETAIL_PREFIX_CLASS = 'user-detail-section';

export const DETAIL_LABEL_PREFIX_CLASS = 'user-detail-label';

const {
	ZHAOSHANG,
	AGENT,
	MEMBER,
	FIN,
	CS,
	ADMIN,
	DIRECT_CUSTOMER,
} = UserTypeEnum;

const {
	ACTIVE,
	BLOCKED,
	ARCHIVED,
	HIDE,
} = UserStatusEnum;

export function checkIsUserActive(status) {
	return status === ACTIVE;
}

export const PlatformBonusPropTypes = PropTypes.shape({
	list: PropTypes.arrayOf(PropTypes.number),
	min: PropTypes.number,
	max: PropTypes.number,
});

export const UserPlatformDataPropTypes = PropTypes.shape({
	name: PropTypes.string,
	code: PropTypes.string,
	bonus: PropTypes.number,
});

export const UserAncestorsDataPropTypes = PropTypes.arrayOf(PropTypes.string);

export const UserCredentialDataPropTypes = PropTypes.shape({
	loginPassword: PropTypes.string,
	fundsPassword: PropTypes.string,
	finPassword: PropTypes.string,
});

const EnableDataPropTypes = PropTypes.shape({
	isEnabled: PropTypes.bool,
});

export const UserDetailsPolicyDataPropTypes = PropTypes.shape({
	blockUser: EnableDataPropTypes,
	alertUser: EnableDataPropTypes,
	blockBetting: EnableDataPropTypes,
	blockDeposit: EnableDataPropTypes,
	blockWithdrawal: EnableDataPropTypes,
	blockFunds: EnableDataPropTypes,
	blockDepositTransfer: EnableDataPropTypes,
	blockActivityTransfer: EnableDataPropTypes,
	blockDividendTransfer: EnableDataPropTypes,
	blockTeamUsers: EnableDataPropTypes,
	blockTeamBetting: EnableDataPropTypes,
	blockTeamDeposit: EnableDataPropTypes,
	blockTeamWithdrawal: EnableDataPropTypes,
	blockLevel: EnableDataPropTypes,
	blockDepositDiscount: EnableDataPropTypes,
});

const UserCommentCreatedByDataPropTypes = PropTypes.shape({
	_id: PropTypes.string,
	username: PropTypes.string,
	type: PropTypes.oneOf([
		FIN,
		CS,
	]),
});

const UserDetailsLevelDataPropTypes = PropTypes.shape({
	name: PropTypes.string,
	index: PropTypes.number,
});

export const UserDetailsDataPropTypes = PropTypes.shape({
	level: UserDetailsLevelDataPropTypes,
	policy: UserDetailsPolicyDataPropTypes,
	subordinateCount: PropTypes.number,
	loginErrorCount: PropTypes.number,
	teamBalance: PropTypes.number,
	bonus: PropTypes.shape({
		delta: PropTypes.number,
	}),
	createdBy: PropTypes.shape({
		username: PropTypes.string,
	}),
	pinnedCommentIds: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.string,
	})),
	lastComment: PropTypes.shape({
		createdBy: UserCommentCreatedByDataPropTypes,
		_id: PropTypes.string,
		content: PropTypes.string,
		createdAt: PropTypes.string,
	}),
});

export const UserPropTypes = PropTypes.shape({
	ancestors: UserAncestorsDataPropTypes,
	details: UserDetailsDataPropTypes,
	credentials: UserCredentialDataPropTypes,
	platform: UserPlatformDataPropTypes,
	username: PropTypes.string,
	iconUrl: PropTypes.string,
	nickname: PropTypes.string,
	type: PropTypes.oneOf([
		ZHAOSHANG,
		AGENT,
		MEMBER,
		FIN,
		CS,
		ADMIN,
		DIRECT_CUSTOMER,
	]),
	status: PropTypes.oneOf([
		ACTIVE,
		BLOCKED,
		ARCHIVED,
		HIDE,
	]),
	ip: PropTypes.string,
	area: PropTypes.string,
	loginAt: PropTypes.string,
	createdAt: PropTypes.string,
	isOnline: PropTypes.bool,
});

export const TeamUserSettingTextEnum = {
	TEAM: '团队',
	USER: '个人',
	USER_OF_TEAM: '团队中的个人',
};

export function renderUserTeamStatusText(
	isUserEnable,
	isTeamEnable,
	disabledText="冻结",
	render= (value) => value
) {
	const { TEAM, USER, } = TeamUserSettingTextEnum;

	if (isUserEnable && isTeamEnable) {
		return '无';
	} else if (isUserEnable) {
		return render(`${TEAM}已${disabledText}`);
	} else if (isTeamEnable) {
		return render(`${USER}已${disabledText}`);
	} else {
		return render(`${USER}已${disabledText},${TEAM}已${disabledText}`);
	}
}

export const PasswordVerificationRules = [
	{
		validator: (rule, value, callback) => {
			const hasSpaceReg = /[ ]/g;
			const atLeastOneCharReg = /([a-zA-Z]+)/;
			const atLeastOneNumberReg = /([0-9]+)/;

			if (value.length < 6) {
				callback('密码最短 6 个字');
			}
			if (value.length > 20) {
				callback('密码最长 20 个字');
			}
			if (hasSpaceReg.test(value)) {
				callback('密码不能有空白');
			}
			if (!(atLeastOneCharReg.test(value) && atLeastOneNumberReg.test(value))) {
				callback('至少有一个英文和一个数字');
			}
			callback();
		},
	}
];
