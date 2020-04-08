import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StatisticsPlatform from './statistics-platform';
import StatisticsQuota from './statistics-quota';

const propTypes = {};

const defaultProps = {};

class AccountMemberManagementStatisticsPage extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				<StatisticsQuota />
				<StatisticsPlatform />
			</div>
		);
	}
}

AccountMemberManagementStatisticsPage.propTypes = propTypes;
AccountMemberManagementStatisticsPage.defaultProps = defaultProps;

export default AccountMemberManagementStatisticsPage;
