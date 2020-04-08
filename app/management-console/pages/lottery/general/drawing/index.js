import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

const PREFIX_CLASS = 'lottery-general-drawing';

class LotteryGeneralDrawingPage extends Component {
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

LotteryGeneralDrawingPage.propTypes = propTypes;
LotteryGeneralDrawingPage.defaultProps = defaultProps;

export default LotteryGeneralDrawingPage;
