const generateDividendDuration = require("../../../../server/lib/stats-helpers/generate-dividend-duration");

describe("one_month", () => {
	const DURATION = "one_month";

	it("date=2019-09-30T15:59:59.000Z (equal to AsiaShanghai 2019-09-30T23:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-01",
			closedAt: "2019-09-30",
		};
		const DATE = "2019-09-30T15:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-30T16:00:00.000Z (equal to AsiaShanghai 2019-10-01T00:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-01",
			closedAt: "2019-09-30",
		};
		const DATE = "2019-09-30T16:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-30T18:59:59.000Z (equal to AsiaShanghai 2019-10-01T02:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-01",
			closedAt: "2019-09-30",
		};
		const DATE = "2019-09-30T18:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-30T19:00:00.000Z (equal to AsiaShanghai 2019-10-01T03:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-10-01",
			closedAt: "2019-10-31",
		};
		const DATE = "2019-09-30T19:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});

	it("date=2019-12-31T15:59:59.000Z (equal to AsiaShanghai 2020-12-31T23:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-12-01",
			closedAt: "2019-12-31",
		};
		const DATE = "2019-12-31T15:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T16:00:00.000Z (equal to AsiaShanghai 2020-01-01T00:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-12-01",
			closedAt: "2019-12-31",
		};
		const DATE = "2019-12-31T16:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T18:59:59.000Z (equal to AsiaShanghai 2020-01-01T02:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-12-01",
			closedAt: "2019-12-31",
		};
		const DATE = "2019-12-31T18:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T19:00:00.000Z (equal to AsiaShanghai 2020-01-01T03:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-01-01",
			closedAt: "2020-01-31",
		};
		const DATE = "2019-12-31T19:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});

	it("date=2020-02-29T15:59:59.000Z (equal to AsiaShanghai 2020-02-29T23:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-02-01",
			closedAt: "2020-02-29",
		};
		const DATE = "2020-02-29T15:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T16:00:00.000Z (equal to AsiaShanghai 2020-03-01T00:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-02-01",
			closedAt: "2020-02-29",
		};
		const DATE = "2020-02-29T16:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T18:59:59.000Z (equal to AsiaShanghai 2020-03-01T02:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-02-01",
			closedAt: "2020-02-29",
		};
		const DATE = "2020-02-29T18:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T19:00:00.000Z (equal to AsiaShanghai 2020-03-01T03:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-03-01",
			closedAt: "2020-03-31",
		};
		const DATE = "2020-02-29T19:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
});

describe("half_month", () => {
	const DURATION = "half_month";

	it("date=2019-09-15T15:59:59.000Z (equal to AsiaShanghai 2019-09-15T23:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-01",
			closedAt: "2019-09-15",
		};
		const DATE = "2019-09-15T15:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-15T16:00:00.000Z (equal to AsiaShanghai 2019-09-16T00:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-01",
			closedAt: "2019-09-15",
		};
		const DATE = "2019-09-15T16:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-15T18:59:59.000Z (equal to AsiaShanghai 2019-09-16T02:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-01",
			closedAt: "2019-09-15",
		};
		const DATE = "2019-09-15T18:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-15T19:00:00.000Z (equal to AsiaShanghai 2019-09-16T03:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-16",
			closedAt: "2019-09-30",
		};
		const DATE = "2019-09-15T19:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});

	it("date=2019-09-30T15:59:59.000Z (equal to AsiaShanghai 2019-09-30T23:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-16",
			closedAt: "2019-09-30",
		};
		const DATE = "2019-09-30T15:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-30T16:00:00.000Z (equal to AsiaShanghai 2019-10-01T00:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-16",
			closedAt: "2019-09-30",
		};
		const DATE = "2019-09-30T16:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-30T18:59:59.000Z (equal to AsiaShanghai 2019-10-01T02:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-09-16",
			closedAt: "2019-09-30",
		};
		const DATE = "2019-09-30T18:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});
	it("date=2019-09-30T19:00:00.000Z (equal to AsiaShanghai 2019-10-01T03:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-10-01",
			closedAt: "2019-10-15",
		};
		const DATE = "2019-09-30T19:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toMatchObject(EXPECTED);
	});

	it("date=2019-12-31T15:59:59.000Z (equal to AsiaShanghai 2020-12-31T23:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-12-16",
			closedAt: "2019-12-31",
		};
		const DATE = "2019-12-31T15:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T16:00:00.000Z (equal to AsiaShanghai 2020-01-01T00:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-12-16",
			closedAt: "2019-12-31",
		};
		const DATE = "2019-12-31T16:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T18:59:59.000Z (equal to AsiaShanghai 2020-01-01T02:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2019-12-16",
			closedAt: "2019-12-31",
		};
		const DATE = "2019-12-31T18:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T19:00:00.000Z (equal to AsiaShanghai 2020-01-01T03:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-01-01",
			closedAt: "2020-01-15",
		};
		const DATE = "2019-12-31T19:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});

	it("date=2020-02-29T15:59:59.000Z (equal to AsiaShanghai 2020-02-29T23:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-02-16",
			closedAt: "2020-02-29",
		};
		const DATE = "2020-02-29T15:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T16:00:00.000Z (equal to AsiaShanghai 2020-03-01T00:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-02-16",
			closedAt: "2020-02-29",
		};
		const DATE = "2020-02-29T16:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T18:59:59.000Z (equal to AsiaShanghai 2020-03-01T02:59:59+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-02-16",
			closedAt: "2020-02-29",
		};
		const DATE = "2020-02-29T18:59:59.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T19:00:00.000Z (equal to AsiaShanghai 2020-03-01T03:00:00+08:00)", () => {
		const EXPECTED = {
			startedAt: "2020-03-01",
			closedAt: "2020-03-15",
		};
		const DATE = "2020-02-29T19:00:00.000Z";

		const result = generateDividendDuration(DATE, DURATION);

		expect(result).toEqual(EXPECTED);
	});
});
