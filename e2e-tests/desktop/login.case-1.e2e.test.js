import puppeteer from 'puppeteer';
import {
	rootURL,
	viewPortSetting,
	timeout,
} from './utils/constant';
import {
	loginCheck,
	loginConfirm,
	logout,
} from './utils/general-utils';

let browser;
let page;

beforeAll(async () => {
	browser = await puppeteer.launch({
		headless: false,
		slowMo: 20,
		args: ['--disable-web-security',],
	});

	page = await browser.newPage();
	page.setViewport(viewPortSetting);
	await page.goto(rootURL);
});

describe('login.case-1.e2e', () => {
	test('login check', async () => {
		await loginCheck(page);
	}, timeout);

	test('login confirm', async () => {
		await loginConfirm(page);
	}, timeout);

	test('logout', async () => {
		await logout(page);
	}, timeout);
});

afterAll(() => {
	if (!process.env.DEBUG) {
		browser.close();
	}
});