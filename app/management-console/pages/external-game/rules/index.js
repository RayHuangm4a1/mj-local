import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../lib/enums';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.object,
	layoutConfigs: layoutConfigsPropTypes,
};
const defaultProps = {};

class GameExternalRulesPage extends Component {
	render() {
		const {
			renderedRoutes,
			layoutConfigs: { isFeatureActive, },
		} = this.props;

		return (
			<div className="external-game-rules-page">
				{isFeatureActive ? renderedRoutes : null}
			</div>
		);
	}
}

GameExternalRulesPage.propTypes = propTypes;
GameExternalRulesPage.defaultProps = defaultProps;

export default compose(
	withFeatureToggle(FeatureCodeEnum.EXTERNAL_GAME_RULES)
)(GameExternalRulesPage);
