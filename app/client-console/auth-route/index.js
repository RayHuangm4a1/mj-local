import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Redirect,
	withRouter,
} from 'react-router-dom';
import { connect, } from 'ljit-store-connecter';
import { Loading, } from 'ljit-react-components';
import { RouteKeyEnums, } from '../route';
import { authActions, } from '../controller';
import { LoadingStatusEnum, } from '../lib/enums';

const {
	NONE,
	LOADING,
	SUCCESS,
} = LoadingStatusEnum;
const {
	LOGIN,
	LOGOUT,
	DEMO,
	MOBILE_DEMO,
} = RouteKeyEnums;
const {
	startCheckAuthAction,
} = authActions;

const omitPaths = [
	LOGIN,
	LOGOUT,
	DEMO,
	MOBILE_DEMO,
];

const propTypes = {
	loadingStatus: PropTypes.number.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string.isRequired,
	}).isRequired,
	startCheckAuthAction: PropTypes.func.isRequired,
	render: PropTypes.func.isRequired,
};

export class AuthRoute extends Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		const {
			loadingStatus: nextLoadingStatus,
		} = nextProps;

		if (nextLoadingStatus !== prevState.lastLoadingStatus) {
			return {
				isAuthChecking: nextLoadingStatus === NONE || nextLoadingStatus === LOADING,
				isAuthed: nextLoadingStatus === SUCCESS,
				lastLoadingStatus: nextLoadingStatus,
			};
		}

		return null;
	}

	constructor(props) {
		super(props);
		this.state = {
			isAuthChecking: props.loadingStatus === NONE,
			isAuthed: false,
			lastLoadingStatus: NONE,
		};
	}

	render () {
		const {
			location,
			render,
		} = this.props;
		const {
			isAuthed,
			isAuthChecking,
		} = this.state;

		if (checkIsOmitPath(location.pathname)) {
			return render({ isAuthed: false, });
		}

		if (isAuthChecking) {
			return <Loading />;
		}

		if (!isAuthed) {
			return (
				<Redirect
					to={{
						pathname: LOGIN,
						state: {
							from: location.pathname,
						},
					}}
				/>
			);
		}

		return render({ isAuthed, });
	}

	componentDidMount() {
		const {
			location,
			startCheckAuthAction,
		} = this.props;

		if (!checkIsOmitPath(location.pathname)) {
			startCheckAuthAction();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { loadingStatus, } = this.props;

		return (nextProps.loadingStatus !== loadingStatus)
		|| (checkIsOmitPath(nextProps.location.pathname));
	}
}

function mapStateToProps(state) {
	return {
		loadingStatus: state.auth.get('loadingStatus'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		startCheckAuthAction: () => dispatch(startCheckAuthAction()),
	};
}

AuthRoute.propTypes = propTypes;

function checkIsOmitPath(pathname = '') {
	const filteredOmitPaths = omitPaths
		.filter(omitPath => pathname.indexOf(omitPath) > -1);

	return filteredOmitPaths.length > 0;
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AuthRoute));
