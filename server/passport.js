const passport = require("passport");
const JWTAuth = require("mj-service-sdks/jwt-auth");
const LocalStrategy = require("passport-local").Strategy;
const {
	INVALID_LOGIN_CREDENTIALS,
	INVALID_GOOGLE_TOTP_LOGIN_CREDENTIALS,
	USER_NOT_FOUND,
	USER_IS_BLOCKED,
	STAFF_NOT_FOUND,
	STAFF_IS_BLOCKED,
} = require("./lib/error/code");
const {
	AUTH_INVALID_PASSWORD_CREDENTIALS,
} = require("mj-service-sdks/error/code");
const {
	AuthenticationError,
} = require("ljit-error");
const {
	getUserByUsername,
	updateLoginAuditById,
	login,
	loginWithGoogleTOTP,

	USER_PROJECTIONS,
} = require("./services/user");
const {
	getStaffByUsername,
	updateLoginAuditById: updateLoginAuditByStaffId,
} = require("./services/staff.admin");
const LOGIN_STRATEGY = {
	PASSWORD: "password",
	GOOGLE_TOTP: "google-totp",
};

exports.LOGIN_STRATEGY = LOGIN_STRATEGY;

exports.initialize = function () {
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	passport.deserializeUser(function(user, done) {
		done(null, user);
	});

	return passport.initialize();
};

exports.session = function () {
	return passport.session();
};

exports.authenticateClientCredentials = function (strategy, req, res, next) {
	const cb = function (error, data) {
		if (error) {
			return next(error);
		}
		const { account, user } = data;

		req.logIn({
			id: user.id,
			accountId: account._id,
			username: user.username,
			loginPasswordUpdatedAt: user.loginPasswordUpdatedAt,
			betPasswordUpdatedAt: user.betPasswordUpdatedAt,
			isBetCredentialsAuthenticated: false,
			heartbeatAt: new Date(),
		},
		function (error) {
			if (error) {
				return next(error);
			}
			res.locals.user = user;

			next();
		});
	};

	return passport.authenticate(strategy, cb)(req, res, next);
};

exports.authenticateManagementCredentials = function (strategy, req, res, next) {
	const cb = function (error, data) {
		if (error) {
			return next(error);
		}
		const { account, staff } = data;

		const { jwtSecret, sessionTTL: expiresIn } = global.CONFIG;
		const { _id: accountId } = account;
		const { id, username, roleId } = staff;

		const plaintext = {
			platform: {
				_id: res.locals.platform._id
			},
			user: {
				id,
				accountId,
				username,
			},
			iss: "ljit.io",
		};

		const jwt = JWTAuth.generateJWT(plaintext, jwtSecret, { expiresIn });

		req.logIn({
			id,
			accountId,
			username,
			jwt,
			roleId,
		},
		function (error) {
			if (error) {
				return next(error);
			}
			res.locals.user = staff;

			next();
		});
	};

	return passport.authenticate(strategy, cb)(req, res, next);
};

exports.setClientLoginStrategies = function () {
	setClientPasswordLoginStrategy();
	setGoogleTOTPLoginStrategy();
};

exports.setManagementLoginStrategies = function () {
	setManagementPasswordLoginStrategy();
};

function setClientPasswordLoginStrategy() {
	const strategy = LOGIN_STRATEGY.PASSWORD;

	passport.use(strategy, new LocalStrategy({
		passReqToCallback: true,
	},
	async function (req, username, password, done) {
		const requestId = req.header("X-Request-Id");

		let user;

		try {
			user = await getUserByUsername(username, {
				projections: USER_PROJECTIONS.ME,
			});

			if (user === null) {
				throw new AuthenticationError(INVALID_LOGIN_CREDENTIALS.MESSAGE, USER_NOT_FOUND.CODE);
			}

			if (user.isBlocked()) {
				throw new AuthenticationError(USER_IS_BLOCKED.MESSAGE, USER_IS_BLOCKED.CODE);
			}
		} catch (error) {
			return done(error, null);
		}

		try {
			const account = await login({ username, password }, {
				requestId,
				ip: req.device.ip,
			});

			const { ip, geo, createdAt: loginAt } = account.lastLoginAudit;

			await updateLoginAuditById(user.id, { ip, geo, loginAt });

			user.ip = ip;
			user.geo = geo;
			user.loginAt = loginAt;

			done(null, { account, user });
		} catch (error) {
			if (error.code === AUTH_INVALID_PASSWORD_CREDENTIALS.CODE) {
				error.options.user = user;
			}

			done(error, null);
		}
	}));
}

function setGoogleTOTPLoginStrategy() {
	const strategy = LOGIN_STRATEGY.GOOGLE_TOTP;

	passport.use(strategy, new LocalStrategy({
		passReqToCallback: true,
		passwordField: "totp",
	},
	async function (req, username, totp, done) {
		const requestId = req.header("X-Request-Id");

		let user;

		try {
			user = await getUserByUsername(username, {
				projections: USER_PROJECTIONS.ME,
			});

			if (user === null) {
				throw new AuthenticationError(INVALID_GOOGLE_TOTP_LOGIN_CREDENTIALS.MESSAGE, USER_NOT_FOUND.CODE);
			}

			if (user.isBlocked()) {
				throw new AuthenticationError(USER_IS_BLOCKED.MESSAGE, USER_IS_BLOCKED.CODE);
			}
		} catch (error) {
			return done(error, null);
		}

		try {
			const account = await loginWithGoogleTOTP({ username, totp }, {
				requestId,
				ip: req.device.ip,
			});

			const { ip, geo, createdAt: loginAt } = account.lastLoginAudit;

			await updateLoginAuditById(user.id, { ip, geo, loginAt });

			user.ip = ip;
			user.geo = geo;
			user.loginAt = loginAt;

			done(null, { account, user });
		} catch (error) {
			done(error, null);
		}
	}));
}

function setManagementPasswordLoginStrategy() {
	const strategy = LOGIN_STRATEGY.PASSWORD;

	passport.use(strategy, new LocalStrategy({
		passReqToCallback: true,
	},
	async function (req, username, password, done) {
		const requestId = req.header("X-Request-Id");

		let staff;

		try {
			staff = await getStaffByUsername(username);

			if (staff === null) {
				throw new AuthenticationError(INVALID_LOGIN_CREDENTIALS.MESSAGE, STAFF_NOT_FOUND.CODE);
			}

			if (staff.isBlocked()) {
				throw new AuthenticationError(STAFF_IS_BLOCKED.MESSAGE, STAFF_IS_BLOCKED.CODE);
			}
		} catch (error) {
			return done(error, null);
		}

		try {
			// TODO: 目前先略過登入驗證，在做新版的後台登入流程時，再恢復註解的部分
			// TODO: 暫時略過 tests/server/routes/management/auth.test.js 中的 4 個測試
			const account = { _id: staff.accountId };

			/*
			const account = await login({ username, password }, {
				requestId,
				ip: req.device.ip,
			});

			const { ip, geo, createdAt: loginAt } = account.lastLoginAudit;

			await updateLoginAuditByStaffId(staff.id, { ip, geo, loginAt });

			staff.ip = ip;
			staff.geo = geo;
			staff.loginAt = loginAt;
			*/

			done(null, { account, staff });
		} catch (error) {
			if (error.code === AUTH_INVALID_PASSWORD_CREDENTIALS.CODE) {
				error.options.staff = staff;
			}

			done(error, null);
		}
	}));
}
