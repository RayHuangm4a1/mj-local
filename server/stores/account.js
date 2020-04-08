const AccountManagement = require("mj-service-sdks/account/management");
const {
	InternalServerError,
	ConflictError,
	ForbiddenError,
	AuthenticationError,
} = require("ljit-error");
const {
	AUTH_INVALID_USERNAME_CREDENTIALS,
	AUTH_INVALID_PASSWORD_CREDENTIALS,
	ACCOUNT_DUPLICATED,
	ACCOUNT_INVALID_PASSWORD_CREDENTIALS,
	ACCOUNT_UNBIND_PASSWORD_CREDENTIALS,
	ACCOUNT_NEW_PASSWORD_IS_DUPLICATED,
	ACCOUNT_SECURITY_QUESTIONS_ALREADY_SET,
	AUTH_GOOGLE_LOGIN_INVALID_USERNAME_CREDENTIALS,
	AUTH_GOOGLE_LOGIN_INVALID_TOTP_CREDENTIALS,
	ACCOUNT_UNBIND_TOTP_CREDENTIALS,
	ACCOUNT_INVALID_FUNDS_PASSWORD_CREDENTIALS,
	ACCOUNT_UNBIND_FUNDS_PASSWORD_CREDENTIALS,
	ACCOUNT_INVALID_TOTP_CREDENTIALS,
	ACCOUNT_GOOGLE_TOTP_CREDENTIALS_ALREADY_BOUND,
	ACCOUNT_SECURITY_QUESTIONS_NOT_SET,
	ACCOUNT_INVALID_SECURITY_QUESTIONS_ANSWER,
	ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED,
} = require("mj-service-sdks/error/code");

async function createAccount({ username, password }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.createAccount({ username, password });
	} catch (error) {
		if (error.code === ACCOUNT_DUPLICATED.CODE) {
			throw new ConflictError(
				ACCOUNT_DUPLICATED.MESSAGE,
				ACCOUNT_DUPLICATED.CODE
			);
		}

		throw new InternalServerError(error);
	}
}

async function login({ username, password }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.login({ username, password });
	} catch (error) {
		if (error.code === AUTH_INVALID_USERNAME_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		if (error.code === AUTH_INVALID_PASSWORD_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code, {
				numOfFailedLogin: error.options.numOfFailedLogin
			});
		}

		throw new InternalServerError(error);
	}
}

async function loginWithGoogleTOTP({ username, totp }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.googleTOTPLogin({ username, totp });
	} catch (error) {
		if (
			error.code === AUTH_GOOGLE_LOGIN_INVALID_USERNAME_CREDENTIALS.CODE ||
			error.code === AUTH_GOOGLE_LOGIN_INVALID_TOTP_CREDENTIALS.CODE
		) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function validateLoginPasswordByAccountId(userId, password, { requestId, ip }) {
	try {
		await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.validateLoginPasswordByAccountId(userId, password);
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_DEFAULT_LOGIN_PASSWORD_NOT_CHANGED.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function validateBetPasswordByAccountId(userId, password, { requestId, ip }) {
	try {
		await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.validateBetPasswordByAccountId(userId, password);
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}
		if (error.code === ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function validateFundsPasswordByAccountId(accountId, password, { requestId , ip }) {
	try {
		await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.validateFundsPasswordByAccountId(accountId, password);
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}
		if (error.code === ACCOUNT_UNBIND_PASSWORD_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function validateGoogleTOTPByAccountId(accountId, totp, { requestId, ip }) {
	try {
		await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.validateGoogleTOTPByAccountId(accountId, totp);
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function validateLoginGeoByAccountId(accountId, { requestId, ip }) {
	try {
		await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.validateLoginGeoByAccountId(accountId);

		return true;
	} catch (error) {
		if (error.httpCode === 403) {
			return false;
		}

		throw new InternalServerError(error);
	}
}

async function getAccountById(accountId, { requestId }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.getAccountById(accountId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function updateFundsPasswordViaPasswordByAccountId(accountId, { password, newPassword }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateFundsPasswordByAccountId(accountId, { password, newPassword });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}
		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function updateFundsPasswordViaSecurityQuestionByAccountId(accountId, { newPassword, securityQuestionAnswers }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateFundsPasswordViaSecurityQuestionByAccountId(accountId, { newPassword, securityQuestionAnswers });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_SECURITY_QUESTIONS_ANSWER.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_SECURITY_QUESTIONS_NOT_SET.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function updateFundsPasswordViaGoogleTOTPByAccountId(accountId, { newPassword, totp }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateFundsPasswordViaGoogleTOTPByAccountId(accountId, { newPassword, totp });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		if (error.code === ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function updateLoginPasswordViaPasswordByAccountId(accountId, { password, newPassword }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateLoginPasswordByAccountId(accountId, { password, newPassword });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}
		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function updateBetPasswordViaPasswordByAccountId(accountId, { password, newPassword }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateBetPasswordByAccountId(accountId, { password, newPassword });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_PASSWORD_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}
		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function updateLoginPasswordViaGoogleTOTPByAccountId(accountId, { newPassword, totp }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateLoginPasswordViaGoogleTOTPByAccountId(accountId, { newPassword, totp });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		if (error.code === ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function updateBetPasswordViaSecurityQuestionByAccountId(accountId, { newPassword, securityQuestionAnswers }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateBetPasswordViaSecurityQuestionByAccountId(accountId, { newPassword, securityQuestionAnswers });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_SECURITY_QUESTIONS_ANSWER.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_SECURITY_QUESTIONS_NOT_SET.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function updateBetPasswordViaGoogleTOTPByAccountId(accountId, { newPassword, totp }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateBetPasswordViaGoogleTOTPByAccountId(accountId, { newPassword, totp });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		if (error.code === ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function updateLoginPasswordViaSecurityQuestionByAccountId(accountId, { newPassword, securityQuestionAnswers }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.updateLoginPasswordViaSecurityQuestionByAccountId(accountId, { newPassword, securityQuestionAnswers });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_SECURITY_QUESTIONS_ANSWER.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_SECURITY_QUESTIONS_NOT_SET.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		if (error.code === ACCOUNT_NEW_PASSWORD_IS_DUPLICATED.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function setSecurityQuestionsByAccountId(accountId, data, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.setSecurityQuestionsByAccountId(accountId, data);
	} catch (error) {
		if (error.code === ACCOUNT_SECURITY_QUESTIONS_ALREADY_SET.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function disableGoogleTOTPByAccountId(accountId, { totp }, { requestId, ip }) {
	try {
		await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.disableGoogleTOTPByAccountId(accountId, { totp });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function enableLoginGeoValidationByAccountId(accountId, { requestId, ip }) {
	try {
		await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.enableLoginGeoValidationByAccountId(accountId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function enableGoogleTOTPByAccountId(accountId, { password, secret, totp }, { requestId, ip }) {
	try {
		return await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.enableGoogleTOTPByAccountId(accountId, { password, secret, totp });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_FUNDS_PASSWORD_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (
			error.code === ACCOUNT_UNBIND_FUNDS_PASSWORD_CREDENTIALS.CODE ||
			error.code === ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE
		) {
			throw new ForbiddenError(error.message, error.code);
		}

		if (error.code === ACCOUNT_GOOGLE_TOTP_CREDENTIALS_ALREADY_BOUND.CODE) {
			throw new ConflictError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function disableLoginGeoValidationByAccountId(accountId, { totp }, { requestId, ip }) {
	try {
		await global.ACCOUNT_CLIENT
			.setRequestId(requestId)
			.setClientIP(ip)
			.disableLoginGeoValidationByAccountId(accountId, { totp });
	} catch (error) {
		if (error.code === ACCOUNT_INVALID_TOTP_CREDENTIALS.CODE) {
			throw new AuthenticationError(error.message, error.code);
		}

		if (error.code === ACCOUNT_UNBIND_TOTP_CREDENTIALS.CODE) {
			throw new ForbiddenError(error.message, error.code);
		}

		throw new InternalServerError(error);
	}
}

async function _updateBetPasswordByAccountId(accountId, password, {
	ip,
	jwt,
	requestId,
}) {
	try {
		return await new AccountManagement(global.ACCOUNT_MANAGEMENT_ENDPOINT)
			.setVersion(global.ACCOUNT_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setClientIP(ip)
			.setJWT(jwt)
			.updateBetPasswordByAccountId(accountId, password);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _updateFundsPasswordByAccountId(accountId, password, {
	ip,
	jwt,
	requestId,
}) {
	try {
		return await new AccountManagement(global.ACCOUNT_MANAGEMENT_ENDPOINT)
			.setVersion(global.ACCOUNT_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setClientIP(ip)
			.setJWT(jwt)
			.updateFundsPasswordByAccountId(accountId, password);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _updateLoginPasswordByAccountId(accountId, password, {
	ip,
	jwt,
	requestId,
}) {
	try {
		return await new AccountManagement(global.ACCOUNT_MANAGEMENT_ENDPOINT)
			.setVersion(global.ACCOUNT_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setClientIP(ip)
			.setJWT(jwt)
			.updateLoginPasswordByAccountId(accountId, password);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _enableLoginGeoValidationByAccountId(accountId, {
	ip,
	jwt,
	requestId,
}) {
	try {
		return await new AccountManagement(global.ACCOUNT_MANAGEMENT_ENDPOINT)
			.setVersion(global.ACCOUNT_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setClientIP(ip)
			.setJWT(jwt)
			.enableLoginGeoValidationByAccountId(accountId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _disableLoginGeoValidationByAccountId(accountId, {
	ip,
	jwt,
	requestId,
}) {
	try {
		return await new AccountManagement(global.ACCOUNT_MANAGEMENT_ENDPOINT)
			.setVersion(global.ACCOUNT_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setClientIP(ip)
			.setJWT(jwt)
			.disableLoginGeoValidationByAccountId(accountId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _disableGoogleTOTPByAccountId(accountId, {
	ip,
	jwt,
	requestId,
}) {
	try {
		return await new AccountManagement(global.ACCOUNT_MANAGEMENT_ENDPOINT)
			.setVersion(global.ACCOUNT_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setClientIP(ip)
			.setJWT(jwt)
			.disableGoogleTOTPByAccountId(accountId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

async function _deleteSecurityQuestionsByAccountId(accountId, {
	ip,
	jwt,
	requestId,
}) {
	try {
		return await new AccountManagement(global.ACCOUNT_MANAGEMENT_ENDPOINT)
			.setVersion(global.ACCOUNT_MANAGEMENT_API_VERSION)
			.setRequestId(requestId)
			.setClientIP(ip)
			.setJWT(jwt)
			.deleteSecurityQuestionsByAccountId(accountId);
	} catch (error) {
		throw new InternalServerError(error);
	}
}

module.exports = {
	createAccount,
	getAccountById,
	login,
	loginWithGoogleTOTP,
	validateLoginPasswordByAccountId,
	validateBetPasswordByAccountId,
	validateFundsPasswordByAccountId,
	validateGoogleTOTPByAccountId,
	validateLoginGeoByAccountId,
	updateFundsPasswordViaPasswordByAccountId,
	updateFundsPasswordViaSecurityQuestionByAccountId,
	updateFundsPasswordViaGoogleTOTPByAccountId,
	updateLoginPasswordViaPasswordByAccountId,
	updateBetPasswordViaPasswordByAccountId,
	updateBetPasswordViaGoogleTOTPByAccountId,
	updateLoginPasswordViaGoogleTOTPByAccountId,
	updateLoginPasswordViaSecurityQuestionByAccountId,
	updateBetPasswordViaSecurityQuestionByAccountId,
	setSecurityQuestionsByAccountId,
	disableLoginGeoValidationByAccountId,
	disableGoogleTOTPByAccountId,
	enableLoginGeoValidationByAccountId,
	enableGoogleTOTPByAccountId,

	_updateBetPasswordByAccountId,
	_updateFundsPasswordByAccountId,
	_updateLoginPasswordByAccountId,
	_deleteSecurityQuestionsByAccountId,
	_disableGoogleTOTPByAccountId,
	_disableLoginGeoValidationByAccountId,
	_enableLoginGeoValidationByAccountId,
};
