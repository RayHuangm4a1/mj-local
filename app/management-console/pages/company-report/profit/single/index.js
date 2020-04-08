import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};

class CompanyReportProfitSinglePage extends Component {
	// fetch data by member id

	render() {
		return (
			<Fragment>
				{this.props.renderedRoutes}
			</Fragment>
		);
	}
}

CompanyReportProfitSinglePage.propTypes = propTypes;

export default CompanyReportProfitSinglePage;
