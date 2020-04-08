import React, { useState, } from 'react';
import {
	Page,
	Tabbar,
	Tab,
} from 'react-onsenui';

import {
	getPage,
} from '../register';

import './style.styl';

const PREFIX_CLASS = 'ljit-react-mobile-navigation-tab-app';
const ICON_WIDTH_HEIGHT = 30;


/*
	tabs = [
		{
			// tab 該秀的 page key
			page,

			// tab 上面的文字
			label,

			// tab 的 icon
			icon,

			// 要顯示的 customizied tab content
				如果有設定 imageIcons prop，會優先選擇這裡的 imageIcons 設定 做 render
			imageIcons: {
				normalIcon: ...,
				selectedIcon: ...,
			},
		},
	];
*/
export function getTabApp({ tabs }) {
	/*
		// renderPage會傳進來的props，
		navigationType,		// 換頁的方法
		navigationTitle,	// 換頁後的標題
		onNavigate,			// 換頁函式
		onBack,				// 退回上一頁
	*/
	return function TabApp({ onNavigate, }) {
		const [selectedTabIndex, setSelectedTabIndex] = useState(0);

		function _renderTabs() {
			return tabs.map(function(tab, index) {
				const PageObject = getPage(tab.page);
	
				return {
					content: (
						<PageObject.component
							key={tab.page + index}
							onNavigate={onNavigate}
						/>
					),
					tab: _renderTab(tab, index),
				};
			});
		}

		function _renderTab(tab, index) {
			if (tab.imageIcons) {
				const icon = selectedTabIndex === index ?
					tab.imageIcons.selectedIcon : tab.imageIcons.normalIcon;

				const { label } = tab;

				return (
					<Tab className={PREFIX_CLASS}>
						<div className={`${PREFIX_CLASS}__container`}>
							<img
								src={icon}
								alt={`tab-${label}`}
								width={ICON_WIDTH_HEIGHT}
								height={ICON_WIDTH_HEIGHT}
							/>

							<div className={`${PREFIX_CLASS}__label`}>
								{label}
							</div>
						</div>
					</Tab>
				);

			} else {
				return (
					<Tab
						label={tab.label}
						icon={tab.icon}
					/>
				);
			}
		}

		return (
			<Page>
				<Tabbar
					position='bottom'
					animation='none'
					index={selectedTabIndex}
					renderTabs={_renderTabs}
					onPreChange={({ index }) => {
						if (index !== selectedTabIndex) {
							setSelectedTabIndex(index);
						}
					}}
				/>
			</Page>
		);
	};
}
