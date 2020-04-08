const { generateStatsDateString } = require("../../../../server/lib/date");

describe("generateStatsDateString", () => {
	it("date=2019-09-30T15:59:59.000Z (equal to AsiaShanghai 2019-09-30T23:59:59+08:00)", () => {
		const EXPECTED = "2019-09-30";
		const date = "2019-09-30T15:59:59.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-09-30T16:00:00.000Z (equal to AsiaShanghai 2019-10-01T00:00:00+08:00)", () => {
		const EXPECTED = "2019-09-30";
		const date = "2019-09-30T16:00:00.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-09-30T18:59:59.000Z (equal to AsiaShanghai 2019-10-01T02:59:59+08:00)", () => {
		const EXPECTED = "2019-09-30";
		const date = "2019-09-30T18:59:59.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-09-30T19:00:00.000Z (equal to AsiaShanghai 2019-10-01T03:00:00+08:00)", () => {
		const EXPECTED = "2019-10-01";
		const date = "2019-09-30T19:00:00.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});

	it("date=2019-12-31T15:59:59.000Z (equal to AsiaShanghai 2020-12-31T23:59:59+08:00)", () => {
		const EXPECTED = "2019-12-31";
		const date = "2019-12-31T15:59:59.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T16:00:00.000Z (equal to AsiaShanghai 2020-01-01T00:00:00+08:00)", () => {
		const EXPECTED = "2019-12-31";
		const date = "2019-12-31T16:00:00.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T18:59:59.000Z (equal to AsiaShanghai 2020-01-01T02:59:59+08:00)", () => {
		const EXPECTED = "2019-12-31";
		const date = "2019-12-31T18:59:59.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2019-12-31T19:00:00.000Z (equal to AsiaShanghai 2020-01-01T03:00:00+08:00)", () => {
		const EXPECTED = "2020-01-01";
		const date = "2019-12-31T19:00:00.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});

	it("date=2020-02-29T15:59:59.000Z (equal to AsiaShanghai 2020-02-29T23:59:59+08:00)", () => {
		const EXPECTED = "2020-02-29";
		const date = "2020-02-29T15:59:59.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T16:00:00.000Z (equal to AsiaShanghai 2020-03-01T00:00:00+08:00)", () => {
		const EXPECTED = "2020-02-29";
		const date = "2020-02-29T16:00:00.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T18:59:59.000Z (equal to AsiaShanghai 2020-03-01T02:59:59+08:00)", () => {
		const EXPECTED = "2020-02-29";
		const date = "2020-02-29T18:59:59.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
	it("date=2020-02-29T19:00:00.000Z (equal to AsiaShanghai 2020-03-01T03:00:00+08:00)", () => {
		const EXPECTED = "2020-03-01";
		const date = "2020-02-29T19:00:00.000Z";

		const result = generateStatsDateString(date);

		expect(result).toEqual(EXPECTED);
	});
});
