import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HorizontalTabs, } from 'ljit-react-components';
import PersonalEntertainmentTab from './personal-entertainment-tab';
import EntertainmentTransferTab from './entertainment-transfer-tab';
import './style.styl';
const { TabPane } = HorizontalTabs;

const propTypes = {
	username: PropTypes.string,
};

class CustomerServiceTaskExternalPlatformPage extends Component {
	constructor() {
		super();
		this.state = {
			HorizontalTabsActiveKey: 'personalEntertainment',
		};
	}

	render() {
		return (
			<HorizontalTabs
				activeKey={this.state.HorizontalTabsActiveKey}
				onChange={(HorizontalTabsActiveKey) => this.setState({ HorizontalTabsActiveKey, })}
				className="customer-service-external-platform"
			>
				<TabPane key="personalEntertainment" tab="个人娱乐">
					<PersonalEntertainmentTab/>
				</TabPane>
				<TabPane key="entertainmentTransfer" tab="娱乐转帐">
					<EntertainmentTransferTab/>
				</TabPane>
			</HorizontalTabs>
		);
	}
}

CustomerServiceTaskExternalPlatformPage.propTypes = propTypes;

export default CustomerServiceTaskExternalPlatformPage;
