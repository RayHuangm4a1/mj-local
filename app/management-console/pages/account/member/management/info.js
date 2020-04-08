import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'ljit-store-connecter';
import { usersActions, userDetailsPageActions } from '../../../../controller';
import {
	withLoadingStatusNotification,
} from '../../../../../lib/notify-handler';
import { RouteKeyEnums, } from '../../../../routes';
import { usersManagementDataProps, } from '../../../../lib/prop-types-utils';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import PageBlock from '../../../../components/page-block';
import InfoTable from './info-table';
import SearchForm from './search-form';

const { fetchUsersAction, } = usersActions;
const {
	setHasInitUserDetailPageAction,
} = userDetailsPageActions;
const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED
} = LoadingStatusEnum;

const { ACCOUNT_MEMBER_MANAGEMENT, } = RouteKeyEnums;

const propTypes = {
	usersData: usersManagementDataProps,
	onNavigate: PropTypes.func,
	fetchUsersAction: PropTypes.func.isRequired,
	setHasInitUserDetailPageAction: PropTypes.func.isRequired,
	loadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]),
};

const defaultProps = {
	onNavigate: () => {},
};

class AccountMemberManagementInfoPage extends Component {
	constructor() {
		super();

		this._handleSearch = this._handleSearch.bind(this);
		this._handleClickSubordinate = this._handleClickSubordinate.bind(this);
		this._handleClickDetail = this._handleClickDetail.bind(this);
	}
	_handleSearch({ username, type, status, online, payer, bankCardNumber, }) {
		this.props.fetchUsersAction({
			username,
			type,
			status,
			online,
			payer,
			bankCardNumber,
		});
	}
	_handleClickSubordinate(record) {
		const { id: userId, } = record;
		const { onNavigate, } = this.props;

		onNavigate(`${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/info`);
	}
	_handleClickDetail(record) {
		const { id: userId, } = record;
		const { onNavigate, } = this.props;

		onNavigate(`${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/basic-setting`);
	}
	render() {
		const {
			_handleSearch,
			_handleClickSubordinate,
			_handleClickDetail,
			props: {
				usersData,
				loadingStatus,
			},
		} = this;
		const isButtonDisabled = loadingStatus === LOADING;

		return (
			<PageBlock className="management-account-members">
				<SearchForm
					onSearch={_handleSearch}
					isButtonDisabled={isButtonDisabled}
					wrappedComponentRef={(form) => this.formRef = form}
				/>
				<InfoTable
					className="member-table"
					usersManagementData={usersData}
					onClickSubordinate={_handleClickSubordinate}
					onClickDetail={_handleClickDetail}
				/>
			</PageBlock>
		);
	}
	componentDidMount() {
		const {
			fetchUsersAction,
			setHasInitUserDetailPageAction,
		} = this.props;

		fetchUsersAction();
		setHasInitUserDetailPageAction(false);
	}
}

AccountMemberManagementInfoPage.propTypes = propTypes;
AccountMemberManagementInfoPage.defaultProps = defaultProps;

function mapStateToProps(state) {
	const usersData = state.users.get('data').toObject();
	const {
		users,
		numOfItems,
		numOfPages,
	} = usersData;

	return {
		usersData: users.toArray(),
		numOfItems,
		numOfPages,
		loadingStatus: state.users.get('loadingStatus'),
		loadingStatusMessage: state.users.get('loadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchUsersAction: ({
			username,
			type,
			status,
			online,
			payer,
			bankCardNumber,
		} = {}) => dispatch(
			fetchUsersAction({
				username,
				type,
				status,
				online,
				payer,
				bankCardNumber,
			})
		),
		setHasInitUserDetailPageAction: (hasInitPage) => dispatch(setHasInitUserDetailPageAction(hasInitPage)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'loadingStatus',
			loadingStatusMessage: 'loadingStatusMessage',
		},
	],
	AccountMemberManagementInfoPage
));
