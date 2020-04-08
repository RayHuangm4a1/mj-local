const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 20,
	});

	page = await browser.newPage();
});

describe('test puppeteer', () => {
	test('launch page', async () => {
		await page.setViewport({ width: 1440, height: 768, });
		await page.goto('http://ec2-13-230-222-204.ap-northeast-1.compute.amazonaws.com:3000/');
		const title = await page.title();

		expect(title).toBe('MJ client');
	});

	test('route to lottery page', async () => {
		await page.waitForSelector('.ant-dropdown-trigger');
		await page.hover('.ant-dropdown-trigger');

		await page.waitForSelector('.ljit-clickable-tag', 3000);

		await page.click('.ljit-clickable-tag:nth-of-type(1)');
	});

	test('select code ball (first)', async () => {
		await page.waitForSelector('.ljit-betting-block');

		await page.click(`.ljit-betting-block:nth-of-type(${1}) .ljit-bet-block .ljit-bet-ball:nth-child(2)`);
		await page.click(`.ljit-betting-block:nth-of-type(${2}) .ljit-bet-block .ljit-bet-ball:nth-child(2)`);
		await page.click(`.ljit-betting-block:nth-of-type(${3}) .ljit-bet-block .ljit-bet-ball:nth-child(2)`);
		await page.click(`.ljit-betting-block:nth-of-type(${4}) .ljit-bet-block .ljit-bet-ball:nth-child(2)`);
		await page.click(`.ljit-betting-block:nth-of-type(${5}) .ljit-bet-block .ljit-bet-ball:nth-child(2)`);
	});

	test('start betting (first)', async () => {
		await page.waitForSelector('.standard-betting-block .standard-betting-block__bottom .button--betting');
		await page.click('.standard-betting-block .standard-betting-block__bottom .button--betting');

		await page.waitForSelector('.ljit-confirm-bet-form .ant-modal-footer .ant-btn:nth-child(1)');
		await page.click('.ljit-confirm-bet-form .ant-modal-footer .ant-btn:nth-child(1)');

		const bettingCard = await page.$$('.standard-selected-betting-card.betting-basket__card');

		expect(bettingCard.length).toBe(1);
	});

	test('select code ball (second)', async () => {
		await page.waitForSelector('.ljit-betting-block');

		await page.click(`.ljit-betting-block:nth-of-type(${1}) .ljit-bet-block .ljit-bet-ball:nth-child(4)`);
		await page.click(`.ljit-betting-block:nth-of-type(${2}) .ljit-bet-block .ljit-bet-ball:nth-child(2)`);
		await page.click(`.ljit-betting-block:nth-of-type(${3}) .ljit-bet-block .ljit-bet-ball:nth-child(5)`);
		await page.click(`.ljit-betting-block:nth-of-type(${4}) .ljit-bet-block .ljit-bet-ball:nth-child(9)`);
		await page.click(`.ljit-betting-block:nth-of-type(${5}) .ljit-bet-block .ljit-bet-ball:nth-child(7)`);
	});

	// test('start betting (second)', async () => {
	// 	await page.waitForSelector('.standard-betting-block .standard-betting-block__bottom .button--betting');
	// 	await page.click('.standard-betting-block .standard-betting-block__bottom .button--betting');

	// 	await page.waitForSelector('.ljit-confirm-bet-form .ant-modal-footer .ant-btn:nth-child(1)');
	// 	await page.click('.ljit-confirm-bet-form .ant-modal-footer .ant-btn:nth-child(1)');

	// 	const bettingCard = await page.$$('.standard-selected-betting-card.betting-basket__card');

	// 	expect(bettingCard.length).toBe(2);
	// });

	test('start betting confirm', async () => {
		await page.waitForSelector('.standard-betting-block .standard-betting-block__bottom .button--betting');
		await page.click('.standard-betting-block .standard-betting-block__bottom .button--betting');
		await page.waitForSelector('.ljit-confirm-bet-form .ljit-bet-form__content .ant-table-body');

		const bettingConfirmRowSelector = '.ljit-confirm-bet-form .ljit-bet-form__content .ant-table-body .ant-table-tbody tr';
		const bettingConfirmRows = await page.$$(bettingConfirmRowSelector);

		expect(bettingConfirmRows.length).toBe(2);
	});

	test('count confirm modal rows', async () => {
		await page.waitForSelector('.standard-betting-block .standard-betting-block__bottom .button--betting');
		await page.click('.standard-betting-block .standard-betting-block__bottom .button--betting');
		await page.waitForSelector('.ljit-confirm-bet-form .ljit-bet-form__content .ant-table-body');

		const bettingConfirmRowSelector = '.ljit-confirm-bet-form .ljit-bet-form__content .ant-table-body .ant-table-tbody tr';
		const bettingConfirmRows = await page.$$(bettingConfirmRowSelector);

		expect(bettingConfirmRows.length).toBe(2);
	});

	test('betting finished', async () => {
		await page.waitForSelector('.ljit-confirm-bet-form .ant-modal-footer .ant-btn-primary');
		await page.click('.ljit-confirm-bet-form .ant-modal-footer .ant-btn-primary');

		await page.waitForSelector('.ljit-notify');
		const text = await page.$eval('.ljit-notify', element => element.textContent);

		expect(text).toBe('投注成功');
	});
});

afterAll(() => {
	if (!process.env.DEBUG) {
		browser.close();
	}
});
