import React, { Component } from 'react';
import StandardBettingRecordsTab from '../../../../features/standard-betting-records-tab';
import DrawBettingLongTabs from '../../../../features/drawing-betting-long-tabs';
import './style.styl';

const PREFIX_CLASS = 'standard-right-side-bar';

class StandardRightSidebar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/* TODO: 快選 block feature */}
				<DrawBettingLongTabs/>
				<StandardBettingRecordsTab
					className={`${PREFIX_CLASS}__betting-basket-record-tab`}
				/>
			</div>
		);
	}
}

export default StandardRightSidebar;
