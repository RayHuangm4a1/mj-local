# ljit-react-mobile-navigation

## 目的

利用onsenui，在web上模擬手機導頁功能

## 如何啟動app

### tab app
	render() { return startTabApp(tabs); }
	
	tabs = [
		{
			label, // tab 上面的文字
			page,  // tab 該讀取的 page key
			icon,  // tab 的 icon，目前預設提供文字，可以使用font awesome的key，例如fa-file。預計會加入其他可以置換的方式
		},
		// ...
	];

### single page app
	render() { return startSinglePageApp(PAGE_KEY); }

## page 使用方式

### 註冊 page
	registerPage(PAGE_ID, options);

	options = {
		title, // 顯示在 navigation bar 上面的文字
		component, // page 的 react component
		// 預計還會加上navigation bar右邊的按鈕
	}

### page props 介面
	{
		onNavigate: PropTypes.func,
	}

#### onNavigate 介面
	onNavigate({
		page, // 有註冊的 page id
		navigationType, // navigation方式，目前提供 'push', 'showModal' 兩種
		navigationTitle, // navigate過去後的navigation bar title
		passProps = {}, // 可以傳給下一個page的props
	});
