import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

class CompanyReportMemberBenefitPage extends Component {
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

CompanyReportMemberBenefitPage.propTypes = propTypes;
CompanyReportMemberBenefitPage.defaultProps = defaultProps;

export default CompanyReportMemberBenefitPage;
