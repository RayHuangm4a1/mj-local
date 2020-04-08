import React from 'react';
import { NavigationKeyEnums, } from '../../navigation';

function LotteriesPage({ onNavigate }) {
	function goNextShowModal() {
		onNavigate({
			page: NavigationKeyEnums.STANDARD_BET,
			navigationType: 'showModal',
			navigationTitle: 'KK時時彩',
		});
	}

	return (
		<div>
			<a onClick={goNextShowModal}>點我 show modal</a>
		</div>
	);
}

export default LotteriesPage;
