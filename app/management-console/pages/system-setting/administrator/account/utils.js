import PropTypes from 'prop-types';
export const UserStatusEnum = {
	ACTIVE: 1,
	BLOCKED: 2,
};

export const userStaffPropTypes = PropTypes.shape({
	id: PropTypes.number,
	username: PropTypes.string,
	accountId: PropTypes.string,
	role: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
		type: PropTypes.number,
	}),
	ip: PropTypes.string,
	geo: PropTypes.string,
	loginAt: PropTypes.string,
	status: PropTypes.number,
	description: PropTypes.string,
	account: PropTypes.shape({
		_id: PropTypes.string,
		username: PropTypes.string,
		totp: PropTypes.shape({
			isEnabled: PropTypes.bool,
		}),
		wechat: PropTypes.shape({
			isEnabled: PropTypes.bool,
		}),
		betCredential: PropTypes.shape({
			isEnabled: PropTypes.bool,
		}),
		fundsCredential: PropTypes.shape({
			isEnabled: PropTypes.bool,
		}),
		finCredential: PropTypes.shape({
			isEnabled: PropTypes.bool,
		}),
		loginGeoValidation: PropTypes.shape({
			isEnabled: PropTypes.bool,
		}),
		lastLoginAudit: PropTypes.shape({
			_id: PropTypes.string,
			ip: PropTypes.string,
			geo: PropTypes.string,
			createdAt: PropTypes.string,
		}),
		securityQuestions: PropTypes.array,
		numOfFailedLogin: PropTypes.number,
	}),
});

export const staffRolesPropTypes = PropTypes.arrayOf(PropTypes.shape({
	id: PropTypes.number,
	name: PropTypes.string,
}));
