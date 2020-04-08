import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
};
const defaultProps = {};

class GameExternalPage extends Component {
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

GameExternalPage.propTypes = propTypes;
GameExternalPage.defaultProps = defaultProps;

export default GameExternalPage;
