import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { NavigationKeyEnums, } from '../../navigation';
import Lottery from './game-content/lottery';
import GameSelector from './game-selector';

import './style.styl';

export const PREFIX_CLASS = 'mobile-home-page';

const propTypes = {
	onNavigate: PropTypes.func,
	onBack: PropTypes.func,
	setOnNavigatorEvent: PropTypes.func,
};

function HomePage({
	onNavigate,
	onBack,
	setOnNavigatorEvent,
}) {
	const games = [
		{
			name: '彩票',
			component: <Lottery onPressLottery={_handlePressLottery} />
		},
		{
			name: '棋盤',
			component: <div>棋盤</div>
		},
		{
			name: '電子',
			component: <div>電子</div>
		},
		{
			name: '真人',
			component: <div>真人</div>
		},
		{
			name: '體育',
			component: <div>體育</div>
		},
		{
			name: '捕魚',
			component: <div>捕魚</div>
		},
	];

	const [gameIndex, setGameIndex] = useState(0);

	useEffect(() => {
		setOnNavigatorEvent(_onNavigatorEvent);
	}, [setOnNavigatorEvent]);

	function _onNavigatorEvent(event) {
		switch (event) {
			case 'wallet':
				console.log("Press wallet");

				break;

			case 'on-init':
				console.log("on-init");

				break;

			case 'on-show':
				console.log("on-show");

				break;

			case 'on-hide':
				console.log("on-hide");

				break;
		}
	}

	function _handlePressLottery() {
		onNavigate({
			page: NavigationKeyEnums.STANDARD_BET,
			navigationType: 'push',
		});
	}

	return (
		<div className={PREFIX_CLASS}>
			<GameSelector
				games={games}
				onSelectGame={(index) => setGameIndex(index)}
				selectedGameIndex={gameIndex}
			/>

			<div className={`${PREFIX_CLASS}__content`}>
				{games[gameIndex].component}
			</div>
		</div>
	);
}

HomePage.propTypes = propTypes;

export default HomePage;
