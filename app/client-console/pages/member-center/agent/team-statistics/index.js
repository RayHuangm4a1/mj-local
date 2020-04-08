import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import StatisticsLayout from '../../../../components/statistics-layout';
import { teamStatsActions } from '../../../../controller';
import { connect, } from 'ljit-store-connecter';
import { StatePropTypes } from '../../../../lib/prop-types-utils';
import './style.styl';

const { fetchTeamStatsAction } = teamStatsActions;
const PREFIX_CLASS = 'agent-team-statistics';

const propTypes = {
	fetchTeamStatsAction: PropTypes.func.isRequired,
	teamStatsData: StatePropTypes,
};
const FETCH_TEAM_STATS_INTERVAL = 300000;

class AgentTeamStatisticsPage extends Component {
	render() {
		const { teamStatsData } = this.props;

		return (
			<div className={PREFIX_CLASS}>
				<StatisticsLayout
					username="我的"
					teamStats={teamStatsData}
				/>
			</div>
		);
	}
	componentDidMount() {
		const { fetchTeamStatsAction } = this.props;

		fetchTeamStatsAction();
		this.fetchTeamStatsInterval = setInterval(fetchTeamStatsAction, FETCH_TEAM_STATS_INTERVAL);
	}
	componentWillUnmount() {
		clearInterval(this.fetchTeamStatsInterval);
	}
}

AgentTeamStatisticsPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		teamStatsData: state.myTeam.stats.get('data').toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchTeamStatsAction: () => dispatch(fetchTeamStatsAction()),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentTeamStatisticsPage);
