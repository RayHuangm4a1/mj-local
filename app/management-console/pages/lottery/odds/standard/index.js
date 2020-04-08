import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

export const PREFIX_CLASS = 'lottery-odds-standard';

class LotteryOddsStandardPage extends Component {
	render() {
		const {
			renderedRoutes,
		} = this.props;

		return (
			<div className={PREFIX_CLASS}>
				{renderedRoutes}
			</div>
		);
	}
}

LotteryOddsStandardPage.propTypes = propTypes;
LotteryOddsStandardPage.defaultProps = defaultProps;

export default LotteryOddsStandardPage;
