import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import AuthRoute from './auth-route';
import LayoutRoute from './layout-route';
import BettingWithPasswordFeature from './features/betting-with-password';
import 'antd/dist/antd.css';
import 'ljit-react-components/dest/index.css';
import '../../client/css/admin.styl';
import './styling/client.styl';

const propTypes = {};

class App extends Component {
	render() {
		// TODO: 檢查語系

		return (
			<div>
				<AuthRoute
					render={auth => <LayoutRoute auth={auth} />}
				/>
				<BettingWithPasswordFeature />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {};
}

App.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(App);
