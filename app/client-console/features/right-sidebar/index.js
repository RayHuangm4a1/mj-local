import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withTranslate, } from 'ljit-i18n';
import { connectObservable } from 'ljit-observable/react-observable';
import { EventEnum, } from '../../lib/enums';
import MemberCenterSelector from '../../components/member-center-selector';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	onClickItem: PropTypes.func,
	notifyShowMemberCenter: PropTypes.func,
	t: PropTypes.func,
};

const defaultProps = {
	className: '',
	onClickItem: () => {},
	notifyShowMemberCenter: () => {},
	t: () => {}
};

const prefixClass = 'ljit-right-sidebar';

class RightSidebar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHidden: false,
		};
		this._handleHideSidebar = this._handleHideSidebar.bind(this);
		this._handleClickUserSetting = this._handleClickUserSetting.bind(this);
	}
	_handleHideSidebar(isHidden) {
		this.setState({ isHidden });
	}
	_handleClickUserSetting(id) {
		const { notifyShowMemberCenter, onClickItem } = this.props;

		notifyShowMemberCenter(id);
		onClickItem(id);
	}
	render() {
		const { props, state, _handleHideSidebar, _handleClickUserSetting } = this;
		const { className, t } = props;
		const { isHidden } = state;

		return (
			<div className={prefixClass}>
				<div
					onClick={() => _handleHideSidebar(false)}
					className={cx(`${prefixClass}__show-trigger`, { [`${prefixClass}__show-trigger--hidden`]: !isHidden })}
				>
					<div />
				</div>
				<div className={cx(`${prefixClass}__selector`, { [`${prefixClass}__selector--hidden`]: isHidden } , className)}>
					<MemberCenterSelector
						onClickItem={_handleClickUserSetting}
						isVertical
					/>
					<div
						className={`${prefixClass}__hidden-trigger`}
						onClick={() => _handleHideSidebar(true)}
					>
						{t('隱藏')}
					</div>
				</div>
			</div>
		);
	}
}

RightSidebar.propTypes = propTypes;
RightSidebar.defaultProps = defaultProps;

function mapNotifyToProps(notify) {
	return {
		notifyShowMemberCenter: (data) => notify(EventEnum.SHOW_MEMBER_CENTER, data),
	};
}

export default withTranslate(connectObservable(mapNotifyToProps)(RightSidebar));
