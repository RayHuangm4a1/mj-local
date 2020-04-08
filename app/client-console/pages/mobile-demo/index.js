import React from 'react';
import 'antd/dist/antd.css';
import 'ljit-react-components/dest/index.css';
import '../../../../client/css/admin.styl';
import '../../styling/client.styl';
import 'onsenui/css/onsenui.min.css';
import 'onsenui/css/onsen-css-components.min.css';
import './style.styl';

import DropdownMenuBarSample from './dropdown-menu-bar-sample';
import MobileDrawingInfoCardSample from './mobile-drawing-info-card-sample';
import MobileDrawingCountDownBlock from '../../components/mobile-drawing-count-down-block';
import MobileDrawingCodeBallBlockSample from './drawing-code-ball-block-sample';
import BettingWeizhiBlockMobileSample from './betting-weizhi-block-mobile-sample';
import MobileBettingCheckout from '../../components/mobile-betting-checkout';
import MobileBettingAmountSelectBlockSample from './mobile-betting-amount-select-block-sample';
import MobileConfirmBettingDrawerSample from './mobile-confirm-betting-drawer-sample';
import ComponentChain from '../../components/component-chain';

function MobileDemo() {

	return (
		<div
			style={{ height: '100vh', overflow: 'scroll', paddingBottom: 20, }}
		>
			<DropdownMenuBarSample/>
			<MobileDrawingInfoCardSample/>
			<h4> Mobile Drawing Count Down Block </h4>
			<MobileDrawingCountDownBlock
				onTimeout={() => {console.log('time out');}}
				onClickTrend={() => {console.log('trend button');}}
				onClickToggleStandard={() => {console.log('standard toggle');}}
				onClickToggleXinyong={() => {console.log('xinyong toggle');}}
				endDate={new Date(new Date().getTime() + 10000)}
			/>
			<MobileDrawingCodeBallBlockSample/>
			<h4> Mobile Betting Checkout </h4>
			<section style={{ width: 375, background: '#fff', }}>
				<h6> Standard Betting Checkout </h6>
				<MobileBettingCheckout.Standard
					bettingCount={12}
					amount={50}
					bonus={1940}
					balance={23456}
					onClickShoppintCart={() => {console.log('click shopping cart');}}
					onClickAddShoppingCart={() => {console.log('click add shopping cart');}}
					isDisabled={true}
					badgeCount={5}
					onClickBet={() => {console.log('standard');}}
				/>
				<h6> XinYong Betting Checkout </h6>
				<MobileBettingCheckout.XinYong
					bettingCount={10}
					balance={23456.1234}
					onClickBet={() => {console.log('xinyong');}}
					onChangeValue={(value) => {console.log(value);}}
				/>
				<h6> Trace Betting Checkout </h6>
				<MobileBettingCheckout.Trace
					bettingCount={1}
					traceCount={100}
					amount={50.1}
					balance={23456.9999}
					onClickBet={() => {console.log('trace');}}
				/>
			</section>
			<h4> Mobile Bet Amount Select Block Sample </h4>
			<section style={{ background: '#fff', }}>
				<MobileBettingAmountSelectBlockSample/>
			</section>
			<h4> Mobile Betting Weizhi Block Sample </h4>
			<section style={{ background: '#fff', }}>
				<BettingWeizhiBlockMobileSample/>
			</section>
			<MobileConfirmBettingDrawerSample />
			<h4> Component Chain </h4>
			<section style={{ background: '#fff', }}>
				<ComponentChain
					components={[
						<div style={{ height: 48, lineHeight: '48px', textAlign: 'center' }} key={1}>武汉分分彩</div>,
						<div style={{ height: 48, lineHeight: '48px', textAlign: 'center' }} key={2}>重庆时时彩</div>,
						<div style={{ height: 48, lineHeight: '48px', textAlign: 'center' }} key={3}>安徽快三</div>,
					]}/>
			</section>
		</div>
	);
}

export default MobileDemo;
