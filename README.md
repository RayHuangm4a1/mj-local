# MJ Platform

mj platform

## 安裝

1. nrm use ljit
2. npm install --save core-lib ljit-db ljit-device-detection ljit-error ljit-lib ljit-logger ljit-morgan ljit-redis ljit-validation ljit-betcontent-helper ljit-crypt ljit-mq mj-service-sdks
3. nrm use npm
4. npm install
5. npm install -g concurrently

## 前置檔案建置

( 在 config 資料夾底下新增 config.json ，內容爲 config.local.json 的 )

1. in ~/mj-platform
2. cp config/config.local.json config/config.json


## 執行方式

(建議開多個terminal)

### 前端開發

1. sudo mongod
2. redis-server
3. npm run dev
4. in ~/app/ljit-react-components `npm run build``

後台入口 http://localhost:3003/management

前台入口 http://localhost:3003/client

前台手機入口 http://localhost:3003/m-client

後端入口 http://localhost:3002/api/management

### 後端開發

## 創建資料庫
1. brew install mysql@5.7
2. brew services start mysql@5.7 -> 電腦重啟也會執行資料庫
3. /usr/local/opt/mysql\@5.7/bin/mysql_secure_installation -> 修改資料庫密碼 (username: "root", password: "password")
4. ln -s /usr/local/opt/mysql\@5.7/bin/mysql /usr/local/bin/ -> 建立symbolic link
5. mysql -u root -p
	sql\ CREATE DATABASE `mj-platform-local`;
7. node init_fixture.js

##開啟mysql的schedule
1. 改動 mysql config
	`vim /usr/local/etc/my.cnf`
	* 如果找不到請用 `mysql --help | grep my.cnf` 找出可能的路徑
	* 再沒有要自行創建my.cnf檔案
2. 加上 `event_scheduler=on`
	example:
	```shell
	# Default Homebrew MySQL server config
	[mysqld]
	# Only allow connections from localhost
	bind-address = 127.0.0.1
	event_scheduler=on
	```
3. 重開 mysql
	`brew services restart mysql@5.7`

## 啟動服務
1. redis-server
2. pm2 start pm2.config.json

後端入口 http://localhost:3002/api/management

### 編譯

pre-production
1. npm run build:preprod

production
1. npm run build:prod
