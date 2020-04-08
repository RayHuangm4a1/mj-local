import React, { Component, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

class AccountMemberBankBannedPage extends Component {
	render() {
		const {
			renderedRoutes,
		} = this.props;

		return (
			<div className="management-bank-banned">
				{renderedRoutes}
			</div>
		);
	}
}

AccountMemberBankBannedPage.propTypes = propTypes;

export default AccountMemberBankBannedPage;
