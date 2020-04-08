import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { withRouter, } from 'react-router-dom';
import { renderRoute, }  from '../lib';
import { connectObservable } from 'ljit-observable/react-observable';
import { EventEnum, } from '../../lib/enums';
import SideBarMenu from './sidebar-menu';
import CloseButtonModal from '../../components/close-button-modal';
import {
	getSideBarMenusMap,
	getFirstSubMenuId,
} from './sidebar-menu/config';
import './style.styl';

const PREFIX_CLASS = 'member-center';
const sideBarMenusMap = getSideBarMenusMap();

const propTypes = {
	history: PropTypes.object,
	subscribeClickUserSetting: PropTypes.func,
	subscribeChangeModalRoute: PropTypes.func,
};
const defaultProps = {
	history: {},
	subscribeClickUserSetting: () => {},
	subscribeChangeModalRoute: () => {},
};

class MemberCenterRouteModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			isVisible: false,
		};
		this._handleNavigate = this._handleNavigate.bind(this);
		this._handleBack = this._handleBack.bind(this);
		this._handleChangeRoute = this._handleChangeRoute.bind(this);
		this._handleModalVisible = this._handleModalVisible.bind(this);

		this._renderContent = this._renderContent.bind(this);
		this._renderRoute = this._renderRoute.bind(this);
	}
	_handleNavigate(uri, options = { passProps: {} }) {
		const { history } = this.props;

		this.setState({
			isVisible: false
		});

		history.push({
			pathname: uri,
			passProps: options.passProps,
		});
	}
	_handleBack() {
		const { history } = this.props;

		this.setState({
			isVisible: false
		});

		history.goBack();
	}
	_handleChangeRoute(id) {
		const convertedId = getRouteId(id);

		this.setState({
			id: convertedId,
		});
	}
	_handleModalVisible(isVisible, id = '') {

		this.setState({
			isVisible,
			id,
		});
	}
	_renderRoute() {
		const { id } = this.state;
		const { _handleNavigate, _handleBack, } = this;

		return renderRoute(id, {
			routeProps: {
				onNavigate: _handleNavigate,
				onBack: _handleBack,
			}
		});
	}
	_renderContent() {
		const {
			_renderRoute,
			_handleChangeRoute,
		} = this;
		const { id } = this.state;

		const sideBarSelectedId = getSideBarMenusId(id);

		return (
			<div className={`${PREFIX_CLASS}`}>
				<SideBarMenu
					onClickItem={_handleChangeRoute}
					selectedMenuId={sideBarSelectedId}
				/>
				<div className={`${PREFIX_CLASS}__body`}>
					{_renderRoute()}
				</div>
			</div>
		);
	}
	render() {
		const {
			_handleModalVisible
		} = this;
		const {
			isVisible,
		} = this.state;

		return (
			<CloseButtonModal
				isVisible={isVisible}
				onClickCloseButton={() => _handleModalVisible(false)}
			>
				{this._renderContent()}
			</CloseButtonModal>
		);
	}
	componentDidMount() {
		const {
			subscribeClickUserSetting,
			subscribeChangeModalRoute,
		} = this.props;

		this.unsubscribeClickUserSetting = subscribeClickUserSetting(
			(id) => {
				const convertedId = getRouteId(id);

				this._handleModalVisible(true, convertedId);
			}
		);

		this.unsubscribeChangeModalRoute = subscribeChangeModalRoute(
			(id) => {
				this._handleChangeRoute(id);
			}
		);
	}
	componentWillUnmount() {
		if (this.unsubscribeClickUserSetting) {
			this.unsubscribeClickUserSetting();
		}

		if (this.unsubscribeChangeModalRoute) {
			this.unsubscribeChangeModalRoute();
		}
	}
}

MemberCenterRouteModal.propTypes = propTypes;
MemberCenterRouteModal.defaultProps = defaultProps;

function mapSubscribeToProps(subscribe) {
	return {
		subscribeClickUserSetting: (callback) => {
			return subscribe(
				EventEnum.SHOW_MEMBER_CENTER,
				callback,
			);
		},
		subscribeChangeModalRoute: (callback) => {
			return subscribe(
				EventEnum.CHANGE_MEMBER_CENTER_ROUTE,
				callback,
			);
		}
	};
}

export default connectObservable(
	undefined,
	mapSubscribeToProps,
)(
	withRouter(MemberCenterRouteModal)
);

/**
 * if has subMenu, the modal need to route to the first subMenu page, return getFirstSubMenuId,
 * else route to menu page, return id.
 */
function getRouteId(id) {
	const selectedMenu = sideBarMenusMap[id];
	const selectedSubMenuId = getFirstSubMenuId(selectedMenu);

	return selectedSubMenuId ? selectedSubMenuId : id;
}

function getSideBarMenusId(id) {
	let selectedMenu = sideBarMenusMap[id];

	if (!selectedMenu) {
		selectedMenu = getMatchSideBarMenu(id.split('/'));
	}

	return selectedMenu ? selectedMenu.id : '';
}

function getMatchSideBarMenu(array = []) {
	let matchSelectedMenu = {};

	do {
		array.pop();
		const parentId = array.join('/');

		matchSelectedMenu = sideBarMenusMap[parentId];
	} while (!matchSelectedMenu && array.length > 0);

	return matchSelectedMenu;
}
