const puppeteer = require('puppeteer');
//import puppeteer from 'puppeteer';

let browser;
let page;


console.log(puppeteer);
beforeAll(async () => {
	console.log(11111111);
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 20,
	});

	page = await browser.newPage();
});

describe('login case 1', () => {
	test('launch page', async () => {
		await page.setViewport({ width: 1440, height: 768, });
		await page.goto('http://ec2-13-230-222-204.ap-northeast-1.compute.amazonaws.com:3000');
		

		await Promise.all([
			page.waitForNavigation(),
		]);

		await Promise.all([
			page.waitForSelector('#username', {
				timeout: 6000,
			}),
		]);

		const title = await page.title();

		expect(title).toBe('MJ client');
	});

	test('input username/validate code', async () => {
		await page.focus('#username');
		page.keyboard.type('test01');
		//await page.waitFor(10000);
		await page.evaluate(async () => {
			await new Promise(function (resolve) { 
				setTimeout(resolve, 7000);
			});
		});
		await Promise.all([
			page.waitForNavigation(),
			page.click('button[type="submit"].ljit-form-search-btn'),
		]);
		await page.waitFor(1000);
	}, 30000);

	test('input username/validate code', async () => {
		await page.focus('#password');
		page.keyboard.type('123qwe');

		await page.waitFor(2000);

		await Promise.all([
			page.waitForNavigation(),
			page.click('button[type="submit"].ljit-form-search-btn'),
		]);
	}, 30000);

	test('dashboard', async () => {
		page.waitForSelector('.client-console-root', { timeout: 1000, });

		await page.waitFor(2000);
	}, 30000);

	
});

afterAll(() => {
	if (!process.env.DEBUG) {
		browser.close();
	}
});
