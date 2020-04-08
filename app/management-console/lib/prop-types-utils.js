import PropTypes from 'prop-types';
import {
	BettingRecordStatusEnum,
	DeviceEnum,
	UserTypeEnum,
	CommentStatusEnum,
	FinanceLevelTypeEnum,
	FinanceLevelStatusEnum,
} from './enums';

export const usersManagementDataProps = PropTypes.arrayOf(PropTypes.shape({
	user: PropTypes.shape({
		username: PropTypes.string,
		nickname: PropTypes.string,
		status: PropTypes.oneOf([
			'active',
			'blocked',
			'archived',
		]),
		isOnline: PropTypes.bool,
		createdBy: PropTypes.shape({
			username: PropTypes.string,
		}),
		numOfDescendants: PropTypes.number,
		type: PropTypes.number,
		qq: PropTypes.string,
		wechat: PropTypes.string,
		phone: PropTypes.string,
		ip: PropTypes.string,
		geo: PropTypes.string,
		loginAt: PropTypes.instanceOf(Date),
		details: PropTypes.shape({
			lastComment: PropTypes.shape({
				_id: PropTypes.string
			}),
			bonus: PropTypes.shape({
				delta: PropTypes.number,
			}),
			bankCards: PropTypes.array,
		}),
		createdAt: PropTypes.instanceOf(Date),
	}),
	wallet: PropTypes.shape({
		balance: PropTypes.number,
		teamStats: PropTypes.shape({
			balance: PropTypes.number,
		})
	}),

}));

export const UserAccountDataPropTypes = PropTypes.shape({
	lastLoginAudit: PropTypes.shape({
		_id: PropTypes.string,
		ip: PropTypes.string,
		geo: PropTypes.string,
		createdAt: PropTypes.string,
	}),
	numOfFailedLogin: PropTypes.number,
	_id: PropTypes.string,
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
	username: PropTypes.string,
	loginCredential: PropTypes.shape({
		isDefault: PropTypes.bool,
	}),
	securityQuestions: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
		})
	),
});

export const BettingRecordPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.number,
		userId: PropTypes.number,
		username: PropTypes.string,
		walletId: PropTypes.number,
		type: PropTypes.number,
		traceId: PropTypes.number,
		lotteryClassId: PropTypes.number,
		lotteryId: PropTypes.number,
		lotteryName: PropTypes.string,
		playId: PropTypes.number,
		unit: PropTypes.number,
		awards: PropTypes.object,
		name: PropTypes.string,
		bonus: PropTypes.number,
		rebate: PropTypes.number,
		issue: PropTypes.number,
		opencode: PropTypes.string,
		reward: PropTypes.number,
		amountPerBet: PropTypes.number,
		multiple: PropTypes.number,
		count: PropTypes.number,
		amount: PropTypes.number,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		isPK: PropTypes.bool,
		status: PropTypes.oneOf(Object.values(BettingRecordStatusEnum)),
		details: PropTypes.array,
		device: PropTypes.string,
		oid: PropTypes.number,
		createdAt: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string
		]),
		updatedAt: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string
		]),
	}),
);

export const TraceRecordBettingsPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.number,
		userId: PropTypes.number,
		username: PropTypes.string,
		walletCode: PropTypes.string,
		type: PropTypes.number,
		traceId: PropTypes.number,
		lotteryClassId: PropTypes.number,
		lotteryId: PropTypes.number,
		lotteryName: PropTypes.string,
		playId: PropTypes.number,
		unit: PropTypes.number,
		awards: PropTypes.object,
		name: PropTypes.string,
		bonus: PropTypes.number,
		rebate: PropTypes.number,
		issue: PropTypes.string,
		opencode: PropTypes.string,
		reward: PropTypes.number,
		amountPerBet: PropTypes.number,
		multiple: PropTypes.number,
		count: PropTypes.number,
		amount: PropTypes.number,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		isPK: PropTypes.number,
		status: PropTypes.string,
		details: PropTypes.array,
		device: PropTypes.oneOf(Object.values(DeviceEnum)),
		error: PropTypes.object,
		oid: PropTypes.number,
		pid: PropTypes.number,
		closedAt: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string
		]),
		createdAt: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string
		]),
		updatedAt: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string
		]),
	}),
);

export const TraceRecordsPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.number,
		userId: PropTypes.number,
		username: PropTypes.string,
		lotteryClassId: PropTypes.number,
		lotteryId: PropTypes.number,
		lotteryName: PropTypes.string,
		playId: PropTypes.number,
		name: PropTypes.string,
		isTerminatedIfWin: PropTypes.bool,
		isTerminatedIfNotOpened: PropTypes.bool,
		totalIssues: PropTypes.number,
		totalFinishedIssues: PropTypes.number,
		rebate: PropTypes.number,
		amountPerBet: PropTypes.number,
		count: PropTypes.number,
		amount: PropTypes.number,
		betcontent: PropTypes.string,
		weizhi: PropTypes.string,
		isPK: PropTypes.number,
		status: PropTypes.string,
		device: PropTypes.oneOf(Object.values(DeviceEnum)),
		closedAt: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string
		]),
		createdAt: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string
		]),
		updatedAt: PropTypes.oneOfType([
			PropTypes.instanceOf(Date),
			PropTypes.string
		]),
	})
);

export const LotteryTabsPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		id: PropTypes.number,
		key: PropTypes.string,
		tab: PropTypes.string,
		platformBonus: PropTypes.string,
		lotteryClass: PropTypes.shape({
			_id: PropTypes.string,
			id: PropTypes.number,
			name: PropTypes.string,
			code: PropTypes.string,
		}),
	}),
);

export const PlatformPropTypes = PropTypes.shape({
	id: PropTypes.number,
	_id: PropTypes.string,
	status: PropTypes.string,
	name: PropTypes.string,
	code: PropTypes.string,
	bonus: PropTypes.shape({
		list: PropTypes.arrayOf(PropTypes.number),
		max: PropTypes.number,
		min: PropTypes.number,
	}),
	fixedWages: PropTypes.arrayOf(PropTypes.number),
	couldEqualToPlatformMaxBonus: PropTypes.bool,
	couldEqualToParentBonus: PropTypes.bool,
	bettingPolicy:PropTypes.shape({
		rewardMode: PropTypes.string,
		nonPKMaxProfit: PropTypes.number,
		pkMaxProfit: PropTypes.number,
		maxIssuesPerTrace: PropTypes.number,
		isZhaoShangBetable: PropTypes.bool,
		maxOrdersPerRequest: PropTypes.number,
		maxAmountOfTotalTracesPerRequest: PropTypes.number
	}),
	dividendSettings: PropTypes.arrayOf(PropTypes.shape({
		ratio: PropTypes.number,
		amount: PropTypes.number
	})),
	withdrawalPolicy: PropTypes.shape({
		withdrawalFees: PropTypes.arrayOf(PropTypes.shape({
			zeroDamaAmountPercentage: PropTypes.number,
			nonZeroDamaAmountPercentage: PropTypes.number,
		})),
		maxAmountPerWithdrawal: PropTypes.number,
		minAmountPerWithdrawal: PropTypes.number,
		numOfWithdrawalsPerDay: PropTypes.number,
		maxWithdrawalAmountPerDay: PropTypes.number
	}),
	autoRemitPolicy: PropTypes.shape({
		levelIds: PropTypes.array,
		lotteryBlackList: PropTypes.array,
		minRegisteredDays: PropTypes.number,
		isEnableDamaAmount: PropTypes.bool,
		isEnableAlertedUser: PropTypes.bool,
		dailyMaxBettingProfit: PropTypes.number,
		isEnableFirstWithdrawal: PropTypes.bool,
		isEnableMinRegisteredDays: PropTypes.bool,
		thirtyDaysMaxBettingProfit: PropTypes.number,
		isEnableDailyMaxBettingProfit: PropTypes.bool,
		isEnable30DaysMaxBettingProfit: PropTypes.bool
	}),
	depositPolicy: PropTypes.shape({
		percentageOfDama: PropTypes.number,
	}),
	createdAt: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string
	]),
	updatedAt: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.string
	]),
});

export const UserCommentDataPropTypes = PropTypes.shape({
	id: PropTypes.number,
	userId: PropTypes.number,
	creatorId: PropTypes.number,
	creatorUsername: PropTypes.string,
	type: PropTypes.oneOf(Object.values(UserTypeEnum)),
	status: PropTypes.oneOf(Object.values(CommentStatusEnum)),
	description: PropTypes.string,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
});

export const UserBankCardsDataPropTypes = PropTypes.arrayOf(PropTypes.shape({
	id: PropTypes.number,
	bankName: PropTypes.string,
	number: PropTypes.string,
	payer: PropTypes.string,
	activatedAt: PropTypes.string,
	withdrawableAt: PropTypes.string,
}));

export const UserProfilePropTypes = PropTypes.shape({
	isNormal: PropTypes.bool,
	id: PropTypes.number,
	username: PropTypes.string,
	accountId: PropTypes.string,
	type: PropTypes.oneOf(Object.values(UserTypeEnum)),
	deltaBonus: PropTypes.number,
	fixedWage: PropTypes.number,
	nickname: PropTypes.string,
	greeting: PropTypes.string,
	createdBy: PropTypes.string,
	ip: PropTypes.string,
	geo: PropTypes.string,
	loginAt: PropTypes.string,
	payer: PropTypes.string,
	levelId: PropTypes.number,
	levelExpiredAt: PropTypes.string,
	statuses: PropTypes.shape({
		isBetable: PropTypes.bool,
		isBlocked: PropTypes.bool,
		isFundsable: PropTypes.bool,
		hasWithdrawn: PropTypes.bool,
		isDepositable: PropTypes.bool,
		isTeamBetable: PropTypes.bool,
		isTeamBlocked: PropTypes.bool,
		isDividendable: PropTypes.bool,
		isTransferable: PropTypes.bool,
		isWithdrawable: PropTypes.bool,
		isTeamFundsable: PropTypes.bool,
		isEverInRiskLevel: PropTypes.bool,
		isTeamDepositable: PropTypes.bool,
		isTeamWithdrawable: PropTypes.bool,
		isChildrenCreatable: PropTypes.bool,
		isEnableDepositZhuandian: PropTypes.bool,
		isEnableIncentiveZhuandian: PropTypes.bool,
	}),
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
	ancestors: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
	}))
});

export const FinanceLevelDataPropTypes = PropTypes.shape({
	id: PropTypes.number,
	displayLevel: PropTypes.number,
	type: PropTypes.oneOf([
		FinanceLevelTypeEnum.NORMAL,
		FinanceLevelTypeEnum.SPECIAL,
	]),
	name: PropTypes.string,
	registeredAfter: PropTypes.string,
	registeredBefore: PropTypes.string,
	numOfRegisteredDays: PropTypes.number,
	numOfDeposits: PropTypes.number,
	depositAmount: PropTypes.number,
	maxAmountPerDeposit: PropTypes.number,
	bettingAmount: PropTypes.number,
	numOfWithdraws: PropTypes.number,
	withdrawalAmount: PropTypes.number,
	numOfUsers: PropTypes.number,
	description: PropTypes.string,
	status: PropTypes.oneOf([
		FinanceLevelStatusEnum.ENABLE,
		FinanceLevelStatusEnum.DISABLE,
	]),
	isBettingAmountGreaterThanDepositAmount: PropTypes.number,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
});

export const FinanceLevelsDataPropTypes = PropTypes.arrayOf(FinanceLevelDataPropTypes);

export const FinanceLevelNamesMapDataPropTypes = PropTypes.objectOf(PropTypes.string);

export const FinanceLevelOptionsDataPropTypes = PropTypes.arrayOf(
	PropTypes.shape({
		type: PropTypes.oneOf([
			FinanceLevelTypeEnum.NORMAL,
			FinanceLevelTypeEnum.SPECIAL,
		]),
		label: PropTypes.string,
		value: PropTypes.number,
	})
);

export const UserFinanceLevelDataPropTypes = PropTypes.shape({
	id: PropTypes.number,
	username: PropTypes.string,
	nickname: PropTypes.string,
	levelId: PropTypes.number,
	levelExpiredAt: PropTypes.string,
	wallets: PropTypes.arrayOf(
		PropTypes.shape({
			code: PropTypes.number,
			balance: PropTypes.number,
		})
	),
	userStats: PropTypes.shape({
		numOfDeposits: PropTypes.number,
		depositAmount: PropTypes.number,
		maxAmountPerDeposit: PropTypes.number,
		bettingAmount: PropTypes.number,
		bettingReward: PropTypes.number,
		numOfWithdraws: PropTypes.number,
		withdrawalAmount: PropTypes.number,
		damaAmount: PropTypes.number,
	}),
});

export const TeamStatsPropsTypes = PropTypes.shape({
	userId: PropTypes.number,
	username: PropTypes.string,
	walletCode: PropTypes.number,
	numOfUsers:PropTypes.number,
	numOfZeroBalanceUsers:PropTypes.number,
	numOfNonZeroBalanceUsers:PropTypes.number,
	balance:PropTypes.number,
	depositAmount:PropTypes.number,
	withdrawalAmount:PropTypes.number,
	createdAt: PropTypes.string,
	updatedAt: PropTypes.string,
});
