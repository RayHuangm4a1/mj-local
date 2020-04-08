const {
        fetch,
} = require("ljit-lib/fetch-utils");
//const url = "http://dev.dc.xiaoji121.com/v1/lottery.healthz";
//const url = "http://alpha.dc.xiaoji121.com/v1/lottery.healthz";
//const url = "http://dev.dc.xiaoji121.com/v1/account.healthz";
const url = "http://alpha.dc.xiaoji121.com/v1/account.healthz";
const requestId = "12345678";
//const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJfaWQiOiI1Y2QxNTEzMTJkZmExZDI0NGRkNTQ1MTcifSwidXNlciI6eyJpZCI6MiwiYWNjb3VudElkIjoiNWQ0YTYzY2E5NWNiYWEzY2IzZGJiZDNkIiwidXNlcm5hbWUiOiJhZG1pbiIsInR5cGUiOjZ9LCJpc3MiOiJsaml0LmlvIiwiaWF0IjoxNTY4MjcxMjM2LCJleHAiOjE1NjgzNTc2MzZ9.J38HthpVOofVIwHAtavKMGhkIhUP62t8Uho-m_xb-XQ";

const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybSI6eyJfaWQiOiI1Y2QxNTEzMTJkZmExZDI0NGRkNTQ1MTcifSwidXNlciI6eyJpZCI6MSwiYWNjb3VudElkIjoiNWQ0YWVhODZlNDhiNjk3YWY2MGMxMjAxIiwidXNlcm5hbWUiOiJhZG1pbiJ9LCJpc3MiOiJsaml0LmlvIiwiaWF0IjoxNTY4MjcxMjM2LCJleHAiOjE1NjgzNTc2MzZ9.KwAUadZgWzJ6ZXReHtw_AeroUvJh-ZluPlyOZ6BSmC4";


function generateAuthenticationHeaders() {
	return {
		"Content-Type": "application/json; charset=utf-8",
		"X-Request-Id": requestId,
		"Authorization": `Bearer ${jwt}`,
	};
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
