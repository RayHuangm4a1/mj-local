import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

class CompanyReportValidMemberPage extends Component {
	render() {
		const {
			renderedRoutes,
		} = this.props;

		return (
			<div>
				{renderedRoutes}
			</div>
		);
	}
}

CompanyReportValidMemberPage.propTypes = propTypes;
CompanyReportValidMemberPage.defaultProps = defaultProps;

export default CompanyReportValidMemberPage;
