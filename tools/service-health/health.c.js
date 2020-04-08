const {
        fetch,
} = require("ljit-lib/fetch-utils");
const crypto = require("crypto");
//const url = "http://dev.dl.xiaoji121.com/v1/lottery.healthz";
//const url = "http://alpha.dl.xiaoji121.com/v1/lottery.healthz";
//const url = "http://dev.dl.xiaoji121.com/v1/account.healthz";
const url = "http://alpha.dl.xiaoji121.com/v1/account.healthz";
const appId = "5cd151312dfa1d244dd54517";
const appSecret = "Mu5uxTghlKWMexU6ct2q30dAVhsdQrRp";
const requestId = "12345678";

function generateAuthenticationHeaders() {
	const date = new Date().toUTCString();
	const plaintext = `x-request-id: ${requestId}\ndate: ${date}`;
	const signature = crypto
		.createHmac("sha256", appSecret)
		.update(plaintext)
		.digest("base64");
	const token = `hmac username="${appId}", algorithm="hmac-sha256", headers="x-request-id date", signature="${signature}"`;
	const header = {
		"Content-Type": "application/json; charset=utf-8",
		"X-Request-Id": requestId,
		"Date": date,
		"Authorization": token,
	};
	console.log({
                date,
                plaintext,
                signature,
		header,
        });

	return header;
}

async function health() {
	const headers = generateAuthenticationHeaders();

	try {
		const res = await fetch(url, {
			headers,
			method: "GET",
		});

		const result = await res.json();

		console.log(result)
	} catch (error) {
		console.error(await error.text());
	}
}


health();
