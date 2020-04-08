import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RebateForm from './rebate-form';


const propTypes = {};

const defaultProps = {};

class AccountMemberManagementInvestmentPage extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				<RebateForm/>
			</div>
		);
	}
}

AccountMemberManagementInvestmentPage.propTypes = propTypes;
AccountMemberManagementInvestmentPage.defaultProps = defaultProps;

export default AccountMemberManagementInvestmentPage;
