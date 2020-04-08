import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { connectObservable, } from 'ljit-observable/react-observable';
import { default as compose, } from 'lodash/flowRight';
import { RouteKeyEnums, } from '../../../route-modals/member-center/routes';
import { EventEnum, } from '../../../lib/enums';
import UserInfoBlock from './user-info-block';
import './style.styl';

const propTypes = {
	renderedRoutes: PropTypes.node,
	notifyToChangeModalRoute: PropTypes.func,
	userData: PropTypes.shape({
		username: PropTypes.string,
		userProfile: PropTypes.string,
		balance: PropTypes.number,
	}),
	usedWalletData: PropTypes.shape({
		id: PropTypes.number,
		userId: PropTypes.number,
		name: PropTypes.string,
		type: PropTypes.number,
		code: PropTypes.number,
		balance: PropTypes.number,
		isUsed: PropTypes.bool,
		createdAt: PropTypes.instanceOf(Date),
		updatedAt: PropTypes.instanceOf(Date),
	}),
};

const PREFIX_CLASS = 'withdraw-page';

class MemberPage extends Component {
	constructor(props) {
		super(props);
		this._handleUpdateWalletInfo = this._handleUpdateWalletInfo.bind(this);
	}
	_handleUpdateWalletInfo() {
		// TODO: 串接API重新取得錢包資訊
	}

	render() {
		const {
			renderedRoutes,
			userData,
			usedWalletData,
			notifyToChangeModalRoute,
		} = this.props;

		return (
			<div className={PREFIX_CLASS}>
				<UserInfoBlock
					userData={userData}
					walletData={usedWalletData}
					onClickRechargeAndWithdrawalLogButton={notifyToChangeModalRoute.bind(this, RouteKeyEnums.MEMBER_RECHARGE_WITHDRAWAL_LOG)}
					onClickUpdateWalletButton={this._handleUpdateWalletInfo}
				/>
				{renderedRoutes}
			</div>
		);
	}
}

MemberPage.propTypes = propTypes;

function mapNotifyToProps(notify) {
	return {
		notifyToChangeModalRoute: (data) => {
			return notify(
				EventEnum.CHANGE_MEMBER_CENTER_ROUTE,
				data,
			);
		}
	};
}

function mapStateToProps(state) {
	return {
		userData: state.user.get('data').toObject(),
		usedWalletData: state.wallets.get('usedWalletData').toObject(),
	};
}

export default compose(
	connect(mapStateToProps),
	connectObservable(mapNotifyToProps),
)(MemberPage);
