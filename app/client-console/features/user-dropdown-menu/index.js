import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Statistic,
	Icon,
	LabelText,
	LabelContent,
	Divider,
	TextButton,
	Dropdown,
} from 'ljit-react-components';
import { formatDate } from '../../../lib/moment-utils';
import { connectObservable } from 'ljit-observable/react-observable';
import { connect } from 'ljit-store-connecter';
import { EventEnum, } from '../../lib/enums';
import { RouteKeyEnums as MemberCenterRouteKeyEnums } from '../../route-modals/member-center/routes';
import { RouteKeyEnums } from '../../route';
import './style.styl';

const PrefixClass = 'ljit-user-dropdown-menu';
const propTypes = {
	userData: PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
		type: PropTypes.number,
		numOfDescendants: PropTypes.number,
		deltaBonus: PropTypes.number,
		nickname: PropTypes.string,
		greeting: PropTypes.string,
		status: PropTypes.string,
		ip: PropTypes.string,
		geo: PropTypes.string,
		loginAt: PropTypes.string,
	}),
	notifyShowMemberCenter: PropTypes.func,
	onNavigate: PropTypes.func,
	children: PropTypes.any.isRequired,
};
const {
	MEMBER_INFORMATION,
	MEMBER_SECURITY,
} = MemberCenterRouteKeyEnums;

const defaultProps = {
	userData: {},
	notifyShowMemberCenter: () => {},
	onNavigate: () => {},
};

class UserDropdownMenu extends Component {
	constructor() {
		super();

		this._handleLogout = this._handleLogout.bind(this);
		this._renderShowMemberSecurityModalButton = this._renderShowMemberSecurityModalButton.bind(this);
		this._renderDropdownContent = this._renderDropdownContent.bind(this);
	}

	_handleLogout() {
		const { onNavigate, } = this.props;

		onNavigate(RouteKeyEnums.LOGOUT);
	}

	_renderShowMemberSecurityModalButton(text) {
		const { notifyShowMemberCenter } = this.props;

		return (
			<TextButton
				onClick={() => notifyShowMemberCenter(MEMBER_SECURITY)}
				text={text}
				fontSize={TextButton.SizeEnums.SMALL}
			/>
		);
	}

	_renderDropdownContent() {
		const { userData, notifyShowMemberCenter } = this.props;
		const { _handleLogout, _renderShowMemberSecurityModalButton, } = this;

		// TODO get Securtity condition
		const isBindingBankCard = true;
		const isGoogleCertification = true;
		const isBindingEmail = true;
		const isWechatCertification = false;

		return (
			<div className={PrefixClass}>
				<div className={`${PrefixClass}__balance`}>
					<Statistic
						title={(
							<React.Fragment>
								<Icon
									type={Icon.IconTypeEnums.RECHARGE}
									size={Icon.SizeEnums.X_SMALL}
								/>
								<span>今日盈亏</span>
							</React.Fragment>
						)}
						// TODO get today balance
						value={35000.00}
						precision={2}
					/>
					<Statistic
						title={(
							<React.Fragment>
								<Icon
									type={Icon.IconTypeEnums.RECHARGE}
									size={Icon.SizeEnums.X_SMALL}
								/>
								<span>团队盈余</span>
							</React.Fragment>
						)}
						// TODO get team balance
						value={620.6864}
						precision={4}
					/>
				</div>
				<div className={`${PrefixClass}__user-info`}>
					<div>
						<LabelText
							label="注册时间："
							// TODO get register time
							text={formatDate('2018/05/16 14:59:26')}
						/>
						<LabelText
							label="最近登陆IP："
							text={userData.ip}
						/>
					</div>
					<Divider/>
					<div>
						<LabelContent
							label="银行卡："
							labelColon={false}
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{ isBindingBankCard ? '已绑定': _renderShowMemberSecurityModalButton('未绑定')}
						</LabelContent>
						<LabelContent
							label="谷歌认证："
							labelColon={false}
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{isGoogleCertification ? '已申请': _renderShowMemberSecurityModalButton('未申请') }
						</LabelContent>
						<LabelContent
							label="安全邮箱："
							labelColon={false}
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{isBindingEmail ? '已绑定': _renderShowMemberSecurityModalButton('未绑定') }
						</LabelContent>
						<LabelContent
							label="微信认证："
							labelColon={false}
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{isWechatCertification ? '已绑定': _renderShowMemberSecurityModalButton('未绑定') }
						</LabelContent>
					</div>
				</div>
				<div className={`${PrefixClass}__actions`}>
					<div>
						<TextButton
							onClick={() => notifyShowMemberCenter(MEMBER_INFORMATION)}
							text="会员中心"
						/>
						<Divider type="vertical" />
						<TextButton
							// TODO open my-wallet modal
							onClick={() => {}}
							text="我的钱包"
						/>
					</div>
					<Divider />
					<div>
						<TextButton
							onClick={_handleLogout}
							text="登出"
						/>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { children, } = this.props;
		const { _renderDropdownContent, } = this;

		return (
			<Dropdown
				dropdownContent={_renderDropdownContent()}
				trigger={['click']}
			>
				{children}
			</Dropdown>
		);
	}
}

function mapStateToProps(state) {
	return {
		// TODO get user securtity condition data, balance data, register time data
		userData: state.user.get('data').toObject()
	};
}

function mapNotifyToProps(notify) {
	return {
		notifyShowMemberCenter: (data) => notify(EventEnum.SHOW_MEMBER_CENTER, data),
	};
}

UserDropdownMenu.propTypes = propTypes;
UserDropdownMenu.defaultProps = defaultProps;

export default connect(mapStateToProps)(connectObservable(mapNotifyToProps)(UserDropdownMenu));
