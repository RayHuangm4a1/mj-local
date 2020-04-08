import {
	rootURL,
} from './constant';

export function getNotFoundErrorMessage(element) {
	return `${element} is not found.`; 
}

export async function loginCheck(page) {
	const usernameSelector = '#username';
	const usernameInput = 'test01';
	const validationCodeSelector = '#captcha';
	const validationCodeInput = '123456';
	const submitButtonSelector = 'button[type="submit"].ljit-form-search-btn';

	const confirmUsernameSelector = '#client-console-root > div > section > main > div > div.client-login.client-login--password.login-page__container > form > div.ant-row.ant-form-item.ljit-label > div > div > span > span > input';

	await page.goto(rootURL);
	await page.waitForSelector(usernameSelector, {
		timeout: 1000,
	}).catch(() => { throw new Error(getNotFoundErrorMessage(usernameSelector)); });

	await page.focus(usernameSelector);
	await page.keyboard.type(usernameInput);

	await page.waitForSelector(validationCodeSelector, {
		timeout: 1000,
	}).catch(() => { throw new Error(getNotFoundErrorMessage(validationCodeSelector)); });

	await page.focus(validationCodeSelector);
	await page.keyboard.type(validationCodeInput);

	await page.click(submitButtonSelector);

	await page.waitForSelector(confirmUsernameSelector, {
		timeout: 1000,
	}).catch(() => { throw new Error(getNotFoundErrorMessage(confirmUsernameSelector)); });

	const confirmUsernameText = await page.$eval(confirmUsernameSelector, element => element.value);

	expect(confirmUsernameText).toBe(usernameInput);
}

export async function loginConfirm(page) {
	const passwordSelector = '#password';
	const submitButtonSelector = 'button[type="submit"].ljit-form-search-btn';
	const dashboardClientRootSelector = '#client-console-root';
	const passwordInput = '123qwe';

	await page.waitForSelector(passwordSelector, {
		timeout: 1000,
	}).catch(() => { throw new Error(getNotFoundErrorMessage(passwordSelector)); });

	await page.focus(passwordSelector);
	await page.keyboard.type(passwordInput);

	await page.click(submitButtonSelector);

	await page.waitForSelector(dashboardClientRootSelector, {
		timeout: 3000,
	}).catch(() => { throw new Error(getNotFoundErrorMessage(dashboardClientRootSelector)); });
}

export async function logout(page) {
	const usernameSelector = '#username';
	const avatarButtonXPath = '//*[@id="client-console-root"]/div/section/header/div/div[2]/div[2]';
	const logoutButtonXPath = '//button[text()="登出"]';

	await page.waitForXPath(avatarButtonXPath, {
		timeout: 3000,
	}).catch(() => { throw new Error(getNotFoundErrorMessage('avatarButtonXPath')); });

	const [avatarButton] = await page.$x(avatarButtonXPath);

	if (avatarButton) {
		await avatarButton.click();
	}

	await page.waitForXPath(logoutButtonXPath, {
		timeout: 10000,
	}).catch(() => { throw new Error(getNotFoundErrorMessage(logoutButtonXPath)); });

	const [logoutButton] = await page.$x(logoutButtonXPath);

	if (logoutButton) {
		await logoutButton.click();
	}

	await page.waitForSelector(usernameSelector, {
		timeout: 10000,
	}).catch(() => { throw new Error(getNotFoundErrorMessage(usernameSelector)); });

	await page.waitFor(1000);
}

export function getRandomBallNum(amountOfBall = 5) {
	const output = [];

	for (let i = 0; i < amountOfBall; i+=1) {
		output.push(Math.floor(Math.random() * 100) % 10);
	}
	return output;
}
