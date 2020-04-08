import React, { Component, } from 'react';
import { HorizontalTabs, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import BettingSearch from '../../../features/betting-search';
import TraceSearch from '../../../features/trace-search';

const { TabPane, } = HorizontalTabs;
const propTypes = {};
const defaultProps = {};

class CustomerServiceTaskBettingPage extends Component {
	constructor() {
		super();
		this.state = {
			tabKey: 'betting',
		};
		this._handleTabChange = this._handleTabChange.bind(this);
	}
	_handleTabChange(tabKey) {
		this.setState({ tabKey });
	}
	render() {
		const {
			state,
			_handleTabChange,
		} = this;

		return (
			<PageBlock>
				<HorizontalTabs
					activeKey={state.tabKey}
					onChange={_handleTabChange}
				>
					<TabPane tab="投注记录" key="betting">
						<BettingSearch />
					</TabPane>
					<TabPane tab="追号纪录" key="trace">
						<TraceSearch />
					</TabPane>
				</HorizontalTabs>
			</PageBlock>
		);
	}
}

CustomerServiceTaskBettingPage.propTypes = propTypes;
CustomerServiceTaskBettingPage.defaultProps = defaultProps;

export default CustomerServiceTaskBettingPage;
