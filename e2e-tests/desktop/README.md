# e2e.test

## 安裝

需安裝puppeteer

`npm install`

## 使用

- 假如要使用自動驗證碼，請修改package.json
`"server:client": " NODE_ENV=TEST node bin/client-root.js",`

- 啟動網址改為http://localhost:3003/client/
	因此，可以開兩個terminal，一個npm run dev，另一個跑e2e.test。

- 啟動測試
	`npm run test:e2e` or `npm run test:e2e -t XXXXX.e2e.test.js`
