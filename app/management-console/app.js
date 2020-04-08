import React, { Component, } from 'react';
import { connect } from 'ljit-store-connecter';
import AuthRoute from './auth-route';
import LayoutRoute from './layout-route';
import 'antd/dist/antd.css';
import 'ljit-react-components/dest/index.css';
import '../../client/css/admin.styl';


const propTypes = {};

class App extends Component {
	render() {
		// TODO: 檢查語系

		return (
			<div>
				<AuthRoute
					render={auth => <LayoutRoute auth={auth} />}
				/>
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
