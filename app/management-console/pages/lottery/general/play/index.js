import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

export const PREFIX_CLASS = 'lottery-general-play';

class LotteryGeneralPlayPage extends Component {
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

LotteryGeneralPlayPage.propTypes = propTypes;
LotteryGeneralPlayPage.defaultProps = defaultProps;

export default LotteryGeneralPlayPage;
