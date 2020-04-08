import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
	Row,
	Col,
	Avatar,
	Statistic,
	UserBreadcrumb,
} from 'ljit-react-components';
import UserDetailSection from './user-detail-section';
import {
	UserCommentDataPropTypes,
	UserProfilePropTypes,
	TeamStatsPropsTypes
} from '../../lib/prop-types-utils';
import RoleTag from './role-tag';
import { PREFIX_CLASS, UserPropTypes, } from './utils';
import './style.styl';

const PROFILE_AVATAR_WIDTH = 36;

const STATISTICS_CLASS = `${PREFIX_CLASS}__statistics`;
const STATISTICS_ITEM_CLASS = `${PREFIX_CLASS}__statistics-item`;
const STATISTICS_SUFFIX_TEXT = '元';

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	user: UserPropTypes,
	userStatsData: PropTypes.shape({
		depositAmount: PropTypes.number,
		withdrawalAmount: PropTypes.number,
		bettingAmount: PropTypes.number,
		bettingReward: PropTypes.number,
	}),
	wallet: PropTypes.shape({
		balance: PropTypes.number,
	}),
	userProfile: UserProfilePropTypes,
	userCommentsData: PropTypes.arrayOf(UserCommentDataPropTypes),
	userPinnedComments: PropTypes.arrayOf(UserCommentDataPropTypes),
	userAccountData: PropTypes.object,
	teamStatsData: TeamStatsPropsTypes,
	userWithdrawalMessage: PropTypes.string,
	className: PropTypes.string,
	onClickUser: PropTypes.func,
	levelName: PropTypes.string,
};
const defaultProps = {
	title: '会员资讯',
	user: {},
	userStatsData: {},
	userProfile: {},
	userCommentsData: [],
	userPinnedComments: [],
	userAccountData: {},
	teamStatsData: {},
	className: '',
	onClickUser: () => {},
	levelName: '',
};

class UserInfoBlock extends Component {
	constructor() {
		super();
		this._renderProfile = this._renderProfile.bind(this);
		this._renderStatistics = this._renderStatistics.bind(this);
	}

	_renderProfile() {
		const {
			userProfile
		} = this.props;

		return (
			<Row
				className={`${PREFIX_CLASS}__profile`}
				type={Row.TypeEnums.FLEX}
				align={Row.AlignEnums.TOP}
			>
				<Col
					className={`${PREFIX_CLASS}__col`}
					style={{ width: PROFILE_AVATAR_WIDTH, marginRight: 8, }}
				>
					<Avatar
						size={PROFILE_AVATAR_WIDTH}
						src={userProfile.iconUrl}
					/>
				</Col>
				<Col
					className={`${PREFIX_CLASS}__col ${PREFIX_CLASS}__col--full`}
				>
					<div className={`${PREFIX_CLASS}__profile-name`}>{userProfile.username}</div>
					<div>{userProfile.nickname}</div>
					<div>
						<RoleTag role={userProfile.type} />
					</div>
				</Col>
			</Row>
		);
	}

	_renderStatistics() {
		const {
			userStatsData,
			wallet,
		} = this.props;

		return (
			<div className={STATISTICS_CLASS}>
				<div className={STATISTICS_ITEM_CLASS}>
					<Statistic
						title="存款总额累计"
						value={userStatsData.depositAmount}
						suffix={STATISTICS_SUFFIX_TEXT}
					/>
				</div>
				<div className={STATISTICS_ITEM_CLASS}>
					<Statistic
						title="提款总额累计"
						value={userStatsData.withdrawalAmount}
						suffix={STATISTICS_SUFFIX_TEXT}
					/>
				</div>
				<div className={STATISTICS_ITEM_CLASS}>
					<Statistic
						title="投注总量"
						value={userStatsData.bettingAmount}
						suffix={STATISTICS_SUFFIX_TEXT}
					/>
				</div>
				<div className={STATISTICS_ITEM_CLASS}>
					<Statistic
						title="总奖金"
						value={userStatsData.bettingReward}
						suffix={STATISTICS_SUFFIX_TEXT}
					/>
				</div>
				<div className={STATISTICS_ITEM_CLASS}>
					<Statistic
						title="余额"
						value={wallet.balance}
						suffix={STATISTICS_SUFFIX_TEXT}
					/>
				</div>
			</div>
		);
	}

	render() {
		const {
			title,
			className,
			onClickUser,
			user,
			userProfile,
			userCommentsData,
			userPinnedComments,
			userWithdrawalMessage,
			userAccountData,
			teamStatsData,
			levelName,
		} = this.props;
		const sectionClass = `${PREFIX_CLASS}__section`;
		const { id, username, ancestors: userAncestors = [], } = userProfile;
		const breadcrumbData = username ? [...userAncestors, { id, username, }]: [];

		return (
			<div className={cx(PREFIX_CLASS, className)}>
				<div className={`${sectionClass} ${sectionClass}--title`}>
					{title}
				</div>
				<div className={`${sectionClass} ${sectionClass}--breadcrumb-wrapper`}>
					<UserBreadcrumb
						data={breadcrumbData}
						targetKey="username"
						onClickUser={onClickUser}
					/>
				</div>
				<div className={`${sectionClass} ${sectionClass}--info`}>
					<Row
						type={Row.TypeEnums.FLEX}
						align={Row.AlignEnums.TOP}
					>
						<Col
							className={`${PREFIX_CLASS}__col`}
							style={{ width: 200, marginRight: 10, }}
						>
							{this._renderProfile()}
						</Col>
						<Col className={`${PREFIX_CLASS}__col ${PREFIX_CLASS}__col--full`}>
							{this._renderStatistics()}
						</Col>
					</Row>
				</div>
				<div className={`${sectionClass} ${sectionClass}--status`}>
					<UserDetailSection
						user={user}
						userProfile={userProfile}
						userCommentsData={userCommentsData}
						userPinnedComments={userPinnedComments}
						userAccountData={userAccountData}
						userWithdrawalMessage={userWithdrawalMessage}
						teamStatsData={teamStatsData}
						levelName={levelName}
					/>
				</div>
			</div>
		);
	}
}

UserInfoBlock.propTypes = propTypes;
UserInfoBlock.defaultProps = defaultProps;

export default UserInfoBlock;
