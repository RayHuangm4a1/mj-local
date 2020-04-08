import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Button, UserBreadcrumb, } from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import { RouteKeyEnums, } from '../../../../routes';
import PageBlock from '../../../../components/page-block';
import { usersManagementDataProps, UserProfilePropTypes, } from '../../../../lib/prop-types-utils';
import InfoTable from './info-table';
import {
	teamActions,
	userProfileActions,
} from '../../../../controller';
import {
	withLoadingStatusNotification,
} from '../../../../../lib/notify-handler';

const { fetchTeamChildrenAction, } = teamActions;
const { fetchUserProfileAction, } = userProfileActions;

const { ACCOUNT_MEMBER_MANAGEMENT, } = RouteKeyEnums;

const ancestorsPropType = PropTypes.arrayOf(PropTypes.oneOfType([
	PropTypes.object,
	PropTypes.string,
]));

const propTypes = {
	pathName: PropTypes.string,
	ancestors: ancestorsPropType,
	leaderId: PropTypes.string,
	userProfileData: UserProfilePropTypes,
	userChildrenData: usersManagementDataProps,
	userAncestorsData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
	})),
	onNavigate: PropTypes.func.isRequired,
	fetchTeamChildrenAction: PropTypes.func.isRequired,
	fetchUserProfileAction: PropTypes.func.isRequired,
};
const defaultProps = {
	userProfileData: {},
	userChildrenData: [],
};

class AccountMemberManagementInfoSubordinatePage extends Component {
	constructor() {
		super();
		this._handleNavigate = this._handleNavigate.bind(this);
		this._handleClickDetail = this._handleClickDetail.bind(this);
	}

	_handleNavigate(record) {
		const { onNavigate, } = this.props;

		onNavigate(`${ACCOUNT_MEMBER_MANAGEMENT}/${record.id}/info`);
	}
	_handleClickDetail(record) {
		const { id: userId, } = record;
		const { onNavigate, pathName, } = this.props;

		onNavigate(`${ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/basic-setting`, {
			passProps: {
				previousPagePathStack: [pathName],
			}
		});
	}

	render() {
		const {
			_handleNavigate,
			_handleClickDetail,
		} = this;
		const {
			userProfileData,
			userChildrenData,
			userAncestorsData,
			onNavigate,
		} = this.props;
		const { id, username, } = userProfileData;
		const breadcrumbData = username ? [...userAncestorsData, { id, username, }] : [];

		return (
			<React.Fragment>
				<Button
					outline={Button.OutlineEnums.HOLLOW}
					onClick={() => onNavigate(`${ACCOUNT_MEMBER_MANAGEMENT}/info`)}
				>
					返回主列表
				</Button>
				<PageBlock
					className="management-account-members"
					headerTitle={(
						<UserBreadcrumb
							data={breadcrumbData}
							targetKey="username"
							onClickUser={_handleNavigate}
						/>
					)}
				>
					<InfoTable
						className="member-table"
						usersManagementData={userChildrenData}
						onClickSubordinate={_handleNavigate}
						onClickDetail={_handleClickDetail}
					/>
				</PageBlock>
			</React.Fragment>
		);
	}
	componentDidMount() {
		const {
			leaderId,
			fetchTeamChildrenAction,
			fetchUserProfileAction,
		} = this.props;

		fetchTeamChildrenAction(leaderId);
		fetchUserProfileAction(leaderId);
	}
}

AccountMemberManagementInfoSubordinatePage.propTypes = propTypes;
AccountMemberManagementInfoSubordinatePage.defaultProps = defaultProps;

function mapStateToProps(state) {
	const teamState = state.team.get('data').toObject();

	return {
		userProfileData: state.userData.profile.get('data').toObject(),
		userChildrenData: teamState.children.toArray(),
		userAncestorsData: teamState.ancestors.toArray(),
		teamLoadingStatus: state.team.get('loadingStatus'),
		teamLoadingStatusMessage: state.team.get('loadingStatusMessage'),
	};
}
function mapDispatchToProps(dispatch) {
	return {
		fetchTeamChildrenAction: (leaderId) => dispatch(fetchTeamChildrenAction(leaderId)),
		fetchUserProfileAction: (userId) => dispatch(fetchUserProfileAction(userId)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoadingStatusNotification(
	[
		{
			loadingStatus: 'teamLoadingStatus',
			loadingStatusMessage: 'teamLoadingStatusMessage',
		},
	],
	AccountMemberManagementInfoSubordinatePage
));
