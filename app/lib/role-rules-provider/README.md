# role-rules-provider

simulate role-based access control lib

## Usage

### 1. Install

將從 server 取得的 角色權限資料 傳入 roleRules 中

```js
// private entry
// 可參考 app/management-console/layout-route/index.js

import {
	RoleRulesProvider,
} from '../../lib/role-rules-provider';

const App = () => {

	// ...

	return (
		<RoleRulesProvider
			roleRules={[
				{
					key: 'lottery',
					actions: [ 'visit', ],
					children: [
						{
							key: 'lottery-setting',
							actions: [ 'visit', ],
						},
					],
				},
				// ...
			]}
		>
			<div>
				// entry
			</div>
		</RoleRulesProvider>
	);
};
```

### 2. Access control with Can component

透過設定 functionKey\
讓 role-rules-provider 檢查使用者能不能使用 FeatureA 功能

```js
// 可參考 app/management-console/components/sidebar-menu/role-rules-submenu.js

import {
	Can,
} from '../../lib/role-rules-provider';

const Page = ({
	title,
	content,
	...rest
}) => {
	return (
		<div>
			// ...

			<Can
				functionKey="feature-a-function-key"
				renderPassed={() => (
					<FeatureA
						title={title}
					>
						{content}
					</FeatureA>
				)}
				renderDenied={() => {
					// do whatever you want
				}}
			/>
		</div>
	);
};

export default Page;

```

### 3. Access control with withRoleRulesChecker HoC

也可以使用 withRoleRulesChecker 元件\
當中包含 checkRoleRules 函式，可以在 render 以外的週期做角色權限的判斷

```js
import {
	withRoleRulesChecker,
} from '../../lib/role-rules-provider';

const Page = ({
	checkRoleRules,
	title,
	content,
}) => {

	const shouldFeatureAPassed = checkRoleRules('feature-a-function-key');

	function _renderFeatureA() {
		return (
			<FeatureA
				title={title}
			>
				{content}
			</FeatureA>
		);
	}

	return (
		<div>
			// ...

			{shouldFeatureAPassed ? _renderFeatureA() : null}
		</div>
	);
};

export default withRoleRulesChecker(Page);

```

### 4. Use withRequiredRoleRule

withRequiredRoleRule 是 withRoleRulesChecker 的一個應用\
提供給 routes.js 做頁面級別的權限判斷\
當執行頁面 onNavigate 時，經由 withRequiredRoleRule 中的 checkRoleRules 來判斷是否有權限導往下個頁面，否則將導回 '/'

```js
// 可參考 app/management-console/routes.js

import {
	withRequiredRoleRule,
} from '../../lib/role-rules-provider';

const routes = [
	{
		path: 'lottery',
		component: withRequiredRoleRule('lottery-function-key')(Lottery),
		routes: [
			{
				path: LOTTERY_GENERAL,
				component: LotteryGeneral,
				routes: [
					{
						path: LOTTERY_GENERAL_SETTING,
						component: withRequiredRoleRule('lottery-setting-function-key')(LotteryGeneralSetting),
					},
					// ...
				],
			},
			// ...
		],
	},
	// ...
];

```

## API

### RoleRulesProvider

需要等待實際資料結構後再更新

| Property | Description | Type | Default |
|---|---|---|---|
| roleRules | (isRequired) mapping 完的角色權限資料 | object[] | - |
| roleRule.key | function key | string | - |
| roleRule.actions | 這個 function key 允許執行的功能 | string[] | - |
| roleRule.children | 與 roleRules 相同 | object[] | - |
| children | (isRequired) | any | - |

### Can

| Property | Description | Type | Default |
|---|---|---|---|
| functionKey | (isRequired) function key | string | - |
| renderPassed | 驗證成功後執行的動作 | func | function(): null |
| renderDenied | 驗證失敗後執行的動作 | func | function(): null |
