const Sequelize = require("sequelize");

const schema = {
	_id: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	code: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	bonus: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: [],
		/*
			[1956,1954,1952,1950,1800,1700]
		*/
		get() {
			const list = this.getDataValue("bonus");

			return {
				list,
				max: list[0],
				min: list[list.length - 1],
			};
		},
	},
	fixedWages: {
		type: Sequelize.JSON,
		allowNull: false,
		/*
			[2.00,1.80,1.60,1.40,1.20]
		*/
	},
	couldEqualToPlatformMaxBonus: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		/*
			如果上級是招商, 獎金號是否可跟上級相同
		*/
	},
	couldEqualToParentBonus: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		/*
			如果上級是代理, 獎金號是否可跟上級相同
		*/
	},
	bettingPolicy: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: {
			/*
				奖金模式: 超出最大獎金限制的盈餘, 可以用來補償掛的投注額
				利润模式: 超出最大獎金限制的盈餘, 無法用來補償掛的投注額
			*/
			rewardMode: "奖金模式",
			nonPKMaxProfit: 500000,
			// PK注單利潤上限
			pkMaxProfit: 10000,
			/*
				每次投注的注單數量上限,
				追號一次可以追單的上限
			*/
			maxOrdersPerRequest: 200,
			/*
				每次追號的總投注額上限
			*/
			maxAmountOfTotalTracesPerRequest: 200000,
			/*
				每張追號的期數上限
			*/
			maxIssuesPerTrace: 100,
			isZhaoShangBetable: false,
		},
	},
	dividendDuration: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: "half_month",
		validate: {
			isIn: [[
				"half_month", "one_month"
			]],
		},
	},
	dividendSettings: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: [],
		/*
			招商分紅標準, Ex:
			[
				{ amount: 300000, ratio: 0 },
				{ amount: 450000, ratio: 8 },
				{ amount: 600000, ratio: 9 },
				{ amount: 100000000, ratio: 20 },
			]
		*/
	},
	fixedWage: {
		type: Sequelize.DECIMAL(4, 2),
		allowNull: false,
		/*
			招商固定工資
		*/
	},
	maxDividendRatio: {
		type: Sequelize.INTEGER,
		allowNull: false,
		/*
			最高分紅
		*/
	},

	effectiveBettingAmountPerDay: {
		type: Sequelize.DECIMAL(10, 4),
		allowNull: false,
		/*
			用戶當日投注金額超過此設定時，定義為有效人數
		*/
	},
	withdrawalPolicy: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: {
			/*
				每日出款上限 (會員單日最大提款總額)
			*/
			maxWithdrawalAmountPerDay: 0,

			/*
				每次出款下限 (會員每次最小提款額)
			*/
			minAmountPerWithdrawal: 0,

			/*
				每次出款上限 (會員每次最大提款額)
			*/
			maxAmountPerWithdrawal: 0,

			/*
				會員每日可提款次數
			*/
			numOfWithdrawalsPerDay: 0,

			/*
				提款手續費設定, 有三筆資料, 分別為
				當天初次提款、當天第二次提款、當天第三次提款 Ex:
				[
					{ zeroDamaAmountPercentage: 0, nonZeroDamaAmountPercentage: 0 },
					{ zeroDamaAmountPercentage: 2, nonZeroDamaAmountPercentage: 4 },
					{ zeroDamaAmountPercentage: 3, nonZeroDamaAmountPercentage: 6 },
				]
			*/
			withdrawalFees: [],
		},
	},
	autoRemitPolicy: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: {
			isEnableFirstWithdrawal: false,
			isEnableAlertedUser: false,
			isEnableDamaAmount: false,
			isEnableMinRegisteredDays: false,
			isEnableDailyMaxBettingProfit: false,
			isEnable30DaysMaxBettingProfit: false,

			/*
				允許出款層級
				自動出款時會檢查使用者所在的層級是否能自動出款 Ex:
				[
					1,
					2,
					3,
				]
			*/
			levelIds: [],

			/*
				註冊未滿天數
				自動出款時會檢查使用者註冊未滿天數，未滿的話就不能自動出款 Ex:
				10
			*/
			minRegisteredDays: 0,

			/*
				彩票當日盈利金額
				自動出款時會檢查彩票當日盈利金額，超過的話就不能自動出款 Ex:
				10000
			*/
			dailyMaxBettingProfit: 0,

			/*
				彩票30天盈利金額
				自動出款時會檢查彩票30天盈利金額，超過的話就不能自動出款 Ex:
				10000
			*/
			thirtyDaysMaxBettingProfit: 0,

			/*
				彩種黑名單
				檢查彩種和期號是否投注過 Ex:
				[
					{
						lotteryId: 16,
						lotteryName: '騰訊分分彩',
						issue: 202001011440,
					}
				]
			*/
			lotteryBlackList: [],
		},
	},
	depositPolicy: {
		type: Sequelize.JSON,
		allowNull: false,
		defaultValue: {
			/*
				充值通道預設填寫的打碼量
				用於新增銀行帳戶時，預填的打碼量百分比
			*/
			percentageOfDama: 0,
		},
	},
	status: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isIn: [[
				"online", "offline", "maintenance",
			]],
		},
	}
};

const indexes = {
	indexes:[
	],
};

module.exports = {
	schema,
	indexes,
};
