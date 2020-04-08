import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Icon,
	Layout,
	IconSelector,
} from 'ljit-react-components';
import './style.styl';
import {
	SubMenuTitleEnums,
	getSideBarMenusMap,
	getSideBarMenusList,
	getFirstSubMenuId,
} from './config';
import MemberCenterSelector from '../../../components/member-center-selector';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../lib/feature-toggle-provider';
import { FeatureCodeEnum } from '../../../lib/enums';
import { RouteKeyEnums } from '../routes';

const sideBarMenusMap = getSideBarMenusMap();
const sideBarMenusConfig = getSideBarMenusList();
const PREFIX_CLASS = 'member-center-modal-side-menu';
const { Sider, } = Layout;

const propTypes = {
	selectedMenuId: PropTypes.string,
	onClickItem: PropTypes.func,
	children: PropTypes.node,
	layoutConfigs: layoutConfigsPropTypes,
};

const defaultProps = {
	onClickItem: () => {}
};

class MemberCenterSideBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMenu: {},
			selectedSubMenuId: ''
		};

		this._renderSubMenu = this._renderSubMenu.bind(this);
		this._handleClickMenu = this._handleClickMenu.bind(this);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const {
			selectedMenuId,
		} = nextProps;
		const {
			selectedMenu,
		} = prevState;

		if (selectedMenuId !== selectedMenu.id) {
			return getNextState(selectedMenuId);
		}

		return null;
	}

	_handleClickMenu(id) {
		const { onClickItem } = this.props;

		onClickItem(id);
	}

	_renderSubMenu() {
		const {
			selectedMenu,
			selectedSubMenuId,
		} = this.state;
		const { layoutConfigs, } = this.props;
		const { toggles, } = layoutConfigs;
		const { subMenu, id } = selectedMenu;

		if (subMenu) {
			const _subMenu = filterSubMenu(toggles, subMenu);

			return (
				<Layout className="member-center-modal-sub-menu">
					<Sider width="120px">
						<div className="sub-menu-title">{SubMenuTitleEnums[id]}</div>
						<IconSelector
							items={_subMenu}
							selectedId={selectedSubMenuId}
							iconSize={Icon.SizeEnums.LARGE}
							onClickItem={this._handleClickMenu}
						/>
					</Sider>
				</Layout>
			);
		}
	}

	render() {
		const {
			selectedMenu,
		} = this.state;

		return (
			<div className={PREFIX_CLASS} >
				<Layout>
					<Sider className={`${PREFIX_CLASS}__menu`} width="57px">
						<MemberCenterSelector
							isVertical
							selectedId={selectedMenu.id}
							onClickItem={this._handleClickMenu}
						/>
					</Sider>
					{this._renderSubMenu()}
				</Layout>
			</div>
		);
	}
	shouldComponentUpdate(nextProps, nextState) {
		const {
			selectedMenu,
			selectedSubMenuId,
		} = this.state;

		return (nextState.selectedMenu.id !== selectedMenu.id)
			|| (nextState.selectedSubMenuId !== selectedSubMenuId);
	}
}

MemberCenterSideBar.propTypes = propTypes;
MemberCenterSideBar.defaultProps = defaultProps;

export default withFeatureToggle(FeatureCodeEnum.MEMBER_CENTER)(MemberCenterSideBar);

function getNextState (selectedMenuId = '') {
	let selectedSubMenuId = selectedMenuId;

	if (sideBarMenusMap[selectedMenuId]) {
		let selectedMenu = sideBarMenusMap[selectedMenuId];
		const hasParent = selectedMenu.parent;
		const hasChild = selectedMenu.subMenu;

		if (hasParent) {
			selectedMenu = Object.assign({}, selectedMenu.parent);
		} else {
			if (hasChild) {
				selectedSubMenuId = selectedMenu.subMenu[0].id;
			}
		}

		return {
			selectedMenu,
			selectedSubMenuId,
		};
	}

	return {
		selectedMenu: sideBarMenusConfig[0],
		selectedSubMenuId: getFirstSubMenuId(sideBarMenusConfig[0]),
	};
}

function filterSubMenu(toggles = {}, subMenu) {
	const {
		is_AGENT_WECHAT_PROMOTION_Active
	} = toggles;

	if (!is_AGENT_WECHAT_PROMOTION_Active) {
		return subMenu.filter(item => item.id !== RouteKeyEnums.AGENT_WECHAT_PROMOTION);
	}

	return subMenu;
}
