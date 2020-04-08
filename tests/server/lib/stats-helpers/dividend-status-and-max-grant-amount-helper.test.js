const {
	ENUM_DIVIDEND_STATUS,
	ENUM_DIVIDEND_TYPE,
} = require("../../../../server/lib/enum");
const {
	NOT_SET,
	NOT_QUALIFIED,
	NOT_GRANTED,
	PARTIAL_GRANTED,
	FULL_GRANTED,
	TEAM_WIN,
} = ENUM_DIVIDEND_STATUS;
const {
	DividendStatusAndMaxGrantAmountHelper,
} = require("../../../../server/lib/stats-helpers");

describe("DividendStatusAndMaxGrantAmountHelper，分紅設定第一筆 = 0%", () => {
	const dividendSettings = [
		{
			id: 1,
			userId: 12,
			type: ENUM_DIVIDEND_TYPE.SELF,
			amount: 500,
			ratio: 0,
		},
		{
			id: 2,
			userId: 12,
			type: ENUM_DIVIDEND_TYPE.SELF,
			amount: 1000,
			ratio: 5,
		},
		{
			id: 3,
			userId: 12,
			type: ENUM_DIVIDEND_TYPE.SELF,
			amount: 100000000,
			ratio: 10,
		},
	];

	it("未設定分紅標準，狀態: 未設置", () => {
		const EXPECTED = {
			status: NOT_SET,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 100,
			bettingReward: 10,
			rebateAmount: 10,
			activityAmount: 0,
			fixedWageAmount: 10,
			incentiveAmount: 100,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings: [], teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 499，符合分紅標準第一條，虧損 199，分紅比率 0%，狀態: 未達標", () => {
		const EXPECTED = {
			status: NOT_QUALIFIED,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 499,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 499，符合分紅標準第一條，盈餘 1，分紅比率 0%，狀態: 未達標", () => {
		const EXPECTED = {
			status: NOT_QUALIFIED,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 499,
			bettingReward: 200,
			rebateAmount: 200,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 500，符合分紅標準第二條，虧損 0，狀態: 團隊贏錢", () => {
		const EXPECTED = {
			status: TEAM_WIN,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 500,
			bettingReward: 300,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 500，符合分紅標準第二條，盈餘 100，狀態: 團隊贏錢", () => {
		const EXPECTED = {
			status: TEAM_WIN,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 500,
			bettingReward: 400,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 500，符合分紅標準第二條，虧損 200，已發分紅 0，狀態: 未發放", () => {
		const EXPECTED = {
			status: NOT_GRANTED,
			maxGrantAmount: 10,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 500,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 1000，符合分紅標準第三條，虧損金額 700，已發分紅 0，狀態: 未發放", () => {
		const EXPECTED = {
			status: NOT_GRANTED,
			maxGrantAmount: 70,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 1000,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 1000，符合分紅標準第三條，虧損金額 700，已發分紅 10，狀態: 部分發放", () => {
		const EXPECTED = {
			status: PARTIAL_GRANTED,
			maxGrantAmount: 70,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 1000,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 10
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 1000，符合分紅標準第三條，虧損金額 700，已發分紅 70，狀態: 全部發放", () => {
		const EXPECTED = {
			status: FULL_GRANTED,
			maxGrantAmount: 70,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 1000,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 70
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 1000，符合分紅標準第三條，虧損金額 700，已發分紅 100，狀態: 全部發放", () => {
		const EXPECTED = {
			status: FULL_GRANTED,
			maxGrantAmount: 70,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 1000,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 100
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
});

describe("DividendStatusAndMaxGrantAmountHelper，分紅設定第一筆 > 0%", () => {
	const dividendSettings = [
		{
			id: 1,
			userId: 12,
			type: ENUM_DIVIDEND_TYPE.SELF,
			amount: 500,
			ratio: 5,
		},
		{
			id: 2,
			userId: 12,
			type: ENUM_DIVIDEND_TYPE.SELF,
			amount: 1000,
			ratio: 10,
		},
		{
			id: 3,
			userId: 12,
			type: ENUM_DIVIDEND_TYPE.SELF,
			amount: 100000000,
			ratio: 20,
		},
	];

	it("未設定分紅標準，狀態: 未設置", () => {
		const EXPECTED = {
			status: NOT_SET,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 100,
			bettingReward: 10,
			rebateAmount: 10,
			activityAmount: 0,
			fixedWageAmount: 10,
			incentiveAmount: 100,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings: [], teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 499，符合分紅標準第一條，虧損 199，分紅比率 5%，已發分紅 0，狀態: 未發放", () => {
		const EXPECTED = {
			status: NOT_GRANTED,
			maxGrantAmount: 9.95,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 499,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 499，符合分紅標準第一條，盈餘 1，分紅比率 5%，狀態: 團隊贏錢", () => {
		const EXPECTED = {
			status: TEAM_WIN,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 499,
			bettingReward: 200,
			rebateAmount: 200,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 500，符合分紅標準第二條，虧損 0，狀態: 團隊贏錢", () => {
		const EXPECTED = {
			status: TEAM_WIN,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 500,
			bettingReward: 300,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 500，符合分紅標準第二條，盈餘 100，狀態: 團隊贏錢", () => {
		const EXPECTED = {
			status: TEAM_WIN,
			maxGrantAmount: 0,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 500,
			bettingReward: 400,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 500，符合分紅標準第二條，虧損 200，已發分紅 0，狀態: 未發放", () => {
		const EXPECTED = {
			status: NOT_GRANTED,
			maxGrantAmount: 20,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 500,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 1000，符合分紅標準第三條，虧損金額 700，已發分紅 0，狀態: 未發放", () => {
		const EXPECTED = {
			status: NOT_GRANTED,
			maxGrantAmount: 140,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 1000,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 0
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 1000，符合分紅標準第三條，虧損金額 700，已發分紅 10，狀態: 部分發放", () => {
		const EXPECTED = {
			status: PARTIAL_GRANTED,
			maxGrantAmount: 140,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 1000,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 10
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 1000，符合分紅標準第三條，虧損金額 700，已發分紅 140，狀態: 全部發放", () => {
		const EXPECTED = {
			status: FULL_GRANTED,
			maxGrantAmount: 140,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 1000,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 140
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
	it("有設定分紅標準，週期總量 1000，符合分紅標準第三條，虧損金額 700，已發分紅 200，狀態: 全部發放", () => {
		const EXPECTED = {
			status: FULL_GRANTED,
			maxGrantAmount: 140,
		};
		const teamDurationStats = {
			id: 1,
			userId: 12,
			walletCode: 100,
			durationId: 1,
			bettingAmount: 1000,
			bettingReward: 100,
			rebateAmount: 100,
			activityAmount: 0,
			fixedWageAmount: 50,
			incentiveAmount: 50,
			maxGrantAmount: 0,
			grantedAmount: 200
		};

		const result = new DividendStatusAndMaxGrantAmountHelper({ dividendSettings, teamDurationStats }).getResult();

		expect(result).toMatchObject(EXPECTED);
	});
});
