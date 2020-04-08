import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import { startTabApp, startSinglePageApp, } from 'ljit-react-mobile-navigation';
import { NavigationKeyEnums, } from './navigation';
import tabs from './navigation/tabs';

import 'antd/dist/antd.css';
import 'ljit-react-components/dest/index.css';
import '../../../client/css/admin.styl';
import '../styling/client.styl';

import 'onsenui/css/onsenui.min.css';
import 'onsenui/css/onsen-css-components.min.css';

const propTypes = {};

class App extends Component {
	render() {
		// 如要顯示登入畫面，請換使用
		// startSinglePageApp(NavigationKeyEnums.LOGIN)
		return (
			<div>
				{startTabApp({ tabs })}
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
