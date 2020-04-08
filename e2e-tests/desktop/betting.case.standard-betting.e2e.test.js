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
	getNotFoundErrorMessage,
	getRandomBallNum,
} from './utils/general-utils';

// Local function
let ballsList = getRandomBallNum();

// async function clickFiveBalls(page, stepTitle) {
// 	const ballXPath = `//div[contains(@class, "ljit-betting-block")]//span[text()="${ballsList[0]}"]`;

// 	console.log('ballsList', ballsList);

// 	await page.waitForXPath(ballXPath, { timeout: 3000, })
// 		.then(async () => {
// 			ballsList.map(async (ballNum, index) => {
// 				console.log('ballNum', ballNum);
// 				const balls = await page.$x(`//div[contains(@class, "ljit-betting-block")]//span[text()="${ballNum}"]`);

// 				await balls[index].click();
// 			});
// 		})
// 		.catch(() => { throw new Error(getNotFoundErrorMessage(stepTitle)); });
// }

async function clickFiveBalls(page, stepTitle) {
	if (ballsList) {
		ballsList.map(async (ballNum, index) => {
			const ballsXPath = `//div[contains(@class, "ljit-betting-block")]//span[text()="${ballNum}"]`;

			await page.waitForXPath(ballsXPath, { timeout: 3000, })
				.then(async () => {
					const balls = await page.$x(ballsXPath);

					if (balls) {
						await balls[index].click();
					}
				})
				.catch(() => { throw new Error(getNotFoundErrorMessage(stepTitle)); });
		});
	}
}
async function confirmSuccessNotify(page, stepTitle) {
	const bettingSuccessXpath = '//div[text()="投注成功"]';

	await page.waitForXPath(bettingSuccessXpath, { timeout: 3000, })
		.then(async () => await page.waitFor(3000))
		.catch(() => { throw new Error(getNotFoundErrorMessage(stepTitle)); });
}

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

describe('e2e - case4: 投注測試 - 官方(直選複式)', () => {
	const bettingNumberSelector = 'div.standard-betting-block__bottom > div.standard-betting-block__bottom-right > span > span:nth-child(1)';
	const bettingAmountSelector = 'div.standard-betting-block__bottom > div.standard-betting-block__bottom-right > span > span:nth-child(2)';
	const betDirectlyButtonXPath = '//span[text()="一鍵投注"]';
	const lotteryMenuDropdownSelector = '#client-console-root > div > section > header > div > div.client-header-content__left > ul > li:nth-child(4) > span';
	const dj15fcMenuItemXPath = '//span[text()="东京1.5分彩"]';
	const betTitleSelector = '.client-page-header .lottery-drawing-info-card__title';
	const passwordSelector = '#password';
	const passwordInput = '123qwe';
	const submitButtonXPath = '//span[text()="确认下注"]';
	const betNowButtonXPath = '//span[text()="立即下注"]';
	const submitButtonXPath2 = '//button[contains(@class, "ljit-submit-form-modal__btn-ok")]/span[text()="确认下注"]';
	const addToBlockButtonXPath = '//span[text()="加入号码篮"]';
	const blockLotteryTitleSelector = 'div.standard-selected-betting-card__header > div.standard-selected-betting-card__lottery';
	const blockLotteryCodesSelector = 'div.standard-selected-betting-card__info > div.standard-selected-betting-card__footer > div > div.ant-col.ant-form-item-control-wrapper > div > span > span';

	test('I. login check', async () => {
		await loginCheck(page);
	}, timeout);

	test('II. login confirm', async () => {
		await loginConfirm(page);
	}, timeout);

	test('III. go to lottery page', async () => {
		await page.waitForSelector(lotteryMenuDropdownSelector, { timeout: 3000, })
			.then(async () => await page.hover(lotteryMenuDropdownSelector))
			.catch(() => { throw new Error(getNotFoundErrorMessage('III-1: 等待 menu 出現並 hover 到項目上')); });

		await page.waitForXPath(dj15fcMenuItemXPath, { timeout: 3000, })
			.then(async () => {
				const [dj15fcMenuItem] = await page.$x(dj15fcMenuItemXPath);

				await dj15fcMenuItem.click();
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage("III-2: 等待 Dropdown 顯現並點擊 '東京1.5分彩' 項目.")); });

		await page.waitForSelector(betTitleSelector, { timeout: 3000, })
			.then(async () => {
				const betTitle = await page.$eval(betTitleSelector, el => el.innerText);

				expect(betTitle).toBe("东京1.5分彩");
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('III-3: 確認彩種標題')); });
	}, timeout);

	test('IV. Click balls and confirm betting count and amount', async () => {
		await page.waitForSelector(bettingNumberSelector, { timeout: 3000, })
			.then(async () => {
				const betCountBeforeBet = await page.$eval(bettingNumberSelector, el => el.innerText);
				const betAmountBeforeBet = await page.$eval(bettingAmountSelector, el => el.innerText);

				expect(betCountBeforeBet).toBe("0");
				expect(betAmountBeforeBet).toBe("0.000");
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('IV-1: 確認投注金額與注數於點選球號前')); });

		await clickFiveBalls(page, `IV-2: 等待球出現並點選 ${ballsList.join(',')} 球號`);

		await page.waitForSelector(bettingNumberSelector, { timeout: 3000, })
			.then(async () => {
				const betCountAfterBet = await page.$eval(bettingNumberSelector, el => el.innerText);
				const betAmountAfterBet = await page.$eval(bettingAmountSelector, el => el.innerText);

				expect(betCountAfterBet).toBe("1");
				expect(betAmountAfterBet).toBe("2.000");
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('IV-3: 確認投注金額與注數於點選球號後')); });
	}, timeout);

	test('V. Click "一鍵投注" to betting and confirm submit success', async () => {
		await page.waitForXPath(betDirectlyButtonXPath, { timeout: 3000, })
			.then(async () => {
				//await page.waitFor(1000);
				const [betDirectlyButton] = await page.$x(betDirectlyButtonXPath);

				await betDirectlyButton.click();
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('V-1: 點擊 "一鍵投注"')); });

		await page.waitForSelector(passwordSelector, { timeout: 3000, })
			.then(async () => {
				await page.focus(passwordSelector);
				await page.keyboard.type(passwordInput);
				const [submitButton] = await page.$x(submitButtonXPath);

				await submitButton.click();
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('V-2: 等待 modal 出現並輸入 password')); });

		await confirmSuccessNotify(page, "V-3: 確認投注送出成功");
	}, timeout);

	test('VI. Re-click balls then confirm betting count and amount', async () => {
		// 更新球號
		ballsList = getRandomBallNum();

		await clickFiveBalls(page, `VI-1: 點選 ${ballsList.join(',')} 號球`);

		await page.waitForSelector(bettingNumberSelector, { timeout: 3000, })
			.then(async () => {
				const betCountAfterBet = await page.$eval(bettingNumberSelector, el => el.innerText);
				const betAmountAfterBet = await page.$eval(bettingAmountSelector, el => el.innerText);

				expect(betCountAfterBet).toBe("1");
				expect(betAmountAfterBet).toBe("2.000");
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('VI-2: 再度確認注數與金額')); });
	}, timeout);

	test('VII. Re-click "一鍵投注" and confirm submit success', async () => {
		await page.waitForXPath(betDirectlyButtonXPath, { timeout: 3000, })
			.then(async () => {
				//await page.waitFor(1000);
				const [betDirectlyButton] = await page.$x(betDirectlyButtonXPath);

				await betDirectlyButton.click();
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('VII-1: 再度點擊 "一鍵投注"')); });

		await confirmSuccessNotify(page, "VII-2: 再度確認投注送出成功");
	}, timeout);

	test('VIII. Re-click balls then confirm betting count and amount"', async () => {
		// 更新球號
		ballsList = getRandomBallNum();

		await clickFiveBalls(page, `VIII-1: 點選 ${ballsList.join(',')} 球號`);

		await page.waitForSelector(bettingNumberSelector, { timeout: 3000, })
			.then(async () => {
				const betCountAfterBet = await page.$eval(bettingNumberSelector, el => el.innerText);
				const betAmountAfterBet = await page.$eval(bettingAmountSelector, el => el.innerText);

				expect(betCountAfterBet).toBe("1");
				expect(betAmountAfterBet).toBe("2.000");
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('VIII-2: 確認注數與金額')); });
	}, timeout);

	test('IX. Click "加入号码篮" and confirm block info', async () => {
		await page.waitForXPath(addToBlockButtonXPath, { timeout: 3000, })
			.then(async () => {
				await page.waitFor(1000);
				const [addToBlock] = await page.$x(addToBlockButtonXPath);

				await addToBlock.click();
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('IX-1: 點擊 "加入号码篮" 按鈕')); });

		await page.waitForSelector(blockLotteryTitleSelector, { timeout: 3000, })
			.then(async () => {
				const blockLotteryTitle = await page.$eval(blockLotteryTitleSelector, el => el.innerText);
				const blockLotteryCodes = await page.$eval(blockLotteryCodesSelector, el => el.innerText);

				expect(blockLotteryTitle).toBe("东京1.5分彩");
				expect(blockLotteryCodes).toBe(ballsList.join(','));
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage('IX-2: 確認號碼籃內的投注資訊')); });
	}, timeout);

	test('X. Click "立即下注" and confirm submit success', async () => {
		await page.waitForXPath(betNowButtonXPath, { timeout: 3000, })
			.then(async () => {
				const [betNowButton] = await page.$x(betNowButtonXPath);

				await betNowButton.click();
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage("X-1: 點擊 '立即下注' 按鈕")); });

		await page.waitForXPath(submitButtonXPath2, { timeout: 3000, })
			.then(async () => {
				const [submitButton] = await page.$x(submitButtonXPath2);

				await submitButton.click();
			})
			.catch(() => { throw new Error(getNotFoundErrorMessage("X-2: 等待 modal 彈出並點擊 '確認下注' 按鈕")); });

		await confirmSuccessNotify(page, "X-3: 再度確認投注送出成功");
	}, timeout);

	test('XI. logout', async () => {
		await logout(page);
	}, timeout);
});

afterAll(() => {
	if (!process.env.DEBUG) {
		browser.close();
	}
});
