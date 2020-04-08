import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { ListItem, } from 'ljit-react-components';
import {
	userProfileActions,
	userAccountActions,
} from '../../../../controller';
import PageBlock from '../../../../components/page-block';
import {
	LoginPasswordEditButton,
	FundsPasswordEditButton,
	BettingPasswordEditButton,
} from '../../../../features/user-info-block/edit-buttons';
import { UserAccountDataPropTypes, } from '../../../../lib/prop-types-utils';
import SecurityQuestion from './edit-element/security-questions';
import LoginGeoValidation from './edit-element/login-geo-validation';
import Greeting from './edit-element/greeting';
import GoogleTotp from './edit-element/google-totp';
import Wechat from './edit-element/wechat';
import QQ from './edit-element/qq';
import Phone from './edit-element/phone';

const { Title, } = PageBlock;
const {
	fetchUserAccountAction,
} = userAccountActions;
const {
	fetchUserProfileAction,
} = userProfileActions;

const propTypes = {
	userId: PropTypes.string,
	userAccountData: UserAccountDataPropTypes,
	fetchUserProfileAction: PropTypes.func.isRequired,
	fetchUserAccountAction: PropTypes.func.isRequired,
};

class AccountMemberManagementAccountInfoPage extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			userAccountData,
		} = this.props;
		const {
			loginCredential: {
				isDefault: isDefaultLoginCredential,
			},
			fundsCredential: {
				isEnabled: isFundsCredentialEnabled,
			},
			betCredential: {
				isEnabled: isBetCredentialEnabled,
			},
		} = userAccountData;

		return (
			<div className="account-info">
				<div className="tab-content-title">
					<Title text="帐户资讯" />
				</div>
				<ListItem
					title="登录密码"
					content={isDefaultLoginCredential ? '未设定' : '********'}
					right={<LoginPasswordEditButton />}
				/>
				<ListItem
					title="资金密码"
					content={isFundsCredentialEnabled ? '********' : '未设定'}
					right={<FundsPasswordEditButton />}
				/>
				<ListItem
					title="投注密碼"
					content={isBetCredentialEnabled ? '********' : '未设定'}
					right={<BettingPasswordEditButton />}
				/>
				<SecurityQuestion/>
				<LoginGeoValidation/>
				<Greeting/>
				<GoogleTotp/>
				<Wechat/>
				<QQ/>
				<Phone/>
			</div>
		);
	}

	componentDidMount() {
		const {
			userId,
			fetchUserProfileAction,
			fetchUserAccountAction,
		} = this.props;

		fetchUserProfileAction(userId);
		fetchUserAccountAction(userId);
	}
}

AccountMemberManagementAccountInfoPage.propTypes = propTypes;

function mapStateToProps(state) {
	const {
		account: userAccountReducer,
	} = state.userData;

	return {
		userAccountData: userAccountReducer.get('data').toObject(),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchUserProfileAction: (userId) => dispatch(fetchUserProfileAction(userId)),
		fetchUserAccountAction: (userId) => dispatch(fetchUserAccountAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountMemberManagementAccountInfoPage);
