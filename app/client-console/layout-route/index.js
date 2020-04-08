import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Layout, } from 'ljit-react-components';
import { renderSwitches, } from './render-routes';
import routes from '../route';
import ClientHeader from '../features/client-header';
import MemberCenterRouteModal from '../route-modals/member-center';
import { connect } from 'ljit-store-connecter';
import { LoadingStatusEnum, } from '../lib/enums';
import RightSidebar from '../features/right-sidebar';
import { applicationActions, } from '../controller';

const { initializeApplicationAction, } = applicationActions;

const { Content } = Layout;
const propTypes = {
	initializeApplicationAction: PropTypes.func.isRequired,
	appLoadingStatus: PropTypes.number.isRequired,
	notifyUserSetting: PropTypes.func,
	auth: PropTypes.shape({
		isAuthed: PropTypes.bool.isRequired,
	}).isRequired,
};
const defaultProps = {
	notifyUserSetting: () => {},
};

class LayoutRoute extends Component {
	constructor(props) {
		super(props);
		this._renderPublicLayout = this._renderPublicLayout.bind(this);
		this._renderPrivateLayout = this._renderPrivateLayout.bind(this);
	}

	_renderPublicLayout() {
		return (
			<Content>
				{renderSwitches(routes)}
			</Content>
		);
	}

	_renderPrivateLayout() {
		const {
			appLoadingStatus,
		} = this.props;

		if (appLoadingStatus !== LoadingStatusEnum.SUCCESS) {
			return null;
		}

		// private
		return (
			<Fragment>
				<ClientHeader/>
				<Layout className="client-layout">
					<Content>
						{renderSwitches(routes)}
					</Content>
				</Layout>
				<RightSidebar />
				<MemberCenterRouteModal/>
			</Fragment>
		);
	}

	render() {
		const {
			auth = {},
		} = this.props;
		const {
			isAuthed,
		} = auth;

		return (
			<Layout className="root-layout">
				{isAuthed ? this._renderPrivateLayout() : this._renderPublicLayout()}
			</Layout>
		);
	}

	componentDidMount() {
		const {
			auth = {},
		} = this.props;
		const {
			isAuthed,
		} = auth;

		if (isAuthed) {
			this.props.initializeApplicationAction();
		}
	}

	componentDidUpdate() {
		const {
			auth = {},
			initializeApplicationAction,
			appLoadingStatus
		} = this.props;
		const {
			isAuthed,
		} = auth;

		if (appLoadingStatus === LoadingStatusEnum.NONE) {
			if (isAuthed) {
				initializeApplicationAction();
			}
		}
	}
}

LayoutRoute.propTypes = propTypes;
LayoutRoute.defaultProps = defaultProps;

function mapStateToProps(state) {
	return {
		appLoadingStatus: state.application.get('loadingStatus'),
	};
}
function mapDispathToProps(dispatch) {
	return {
		initializeApplicationAction: () => dispatch(initializeApplicationAction()),
	};
}

export default connect(mapStateToProps, mapDispathToProps)(LayoutRoute);
