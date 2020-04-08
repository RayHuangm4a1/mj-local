import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	DecimalNumber
} from 'ljit-react-components';
import { formatDate, DATE, TIME, isDateValid } from '../../lib/moment-utils';
import {
	UserCommentDataPropTypes,
	UserProfilePropTypes,
	TeamStatsPropsTypes,
} from '../../lib/prop-types-utils';
import { getLastCommentDescription, } from '../../lib/user-utils';
import {
	DETAIL_PREFIX_CLASS,
	UserPropTypes,
	renderUserTeamStatusText,
} from './utils';
import {
	BlockUserEditButton,
	BetableEditButton,
	CommentEditButton,
	LoginPasswordEditButton,
	FundsPasswordEditButton,
	LevelEditButton,
	TransferableEditButton,
	BettingPasswordEditButton,
	BlockDividendEditButton,
	BlockFundsEditButton,
	DepositableEditButton,
	WithdrawableEditButton,
	BonusEditButton,
	SubordinateCreatableEditButton,
	WithdrawalHintEditButton,
} from './edit-buttons';
import UserDetailLabel from './user-detail-label';

const DATE_TIME_FORMAT = `${DATE} ${TIME}`;
const NOT_SETTING_TEXT = '未设定';

const propTypes = {
	user: UserPropTypes,
	userProfile: UserProfilePropTypes,
	userCommentsData: PropTypes.arrayOf(UserCommentDataPropTypes),
	userPinnedComments: PropTypes.arrayOf(UserCommentDataPropTypes),
	userWithdrawalMessage: PropTypes.string,
	userAccountData: PropTypes.object,
	teamStatsData: TeamStatsPropsTypes,
	levelName: PropTypes.string,
};
const defaultProps = {
	user: {},
	userProfile: {},
	userAccountData: {},
	teamStatsData: {},
	userCommentsData: [],
	userPinnedComments: [],
	levelName: '',
};

class UserDetailSection extends Component {
	constructor() {
		super();
	}

	render() {
		const {
			user: {
				isOnline,
			},
			userProfile = {},
			userCommentsData,
			userPinnedComments,
			userWithdrawalMessage = '',
			userAccountData: {
				numOfFailedLogin,
				lastLoginAudit = {},
				loginCredential: {
					isDefault: isDefaultLoginCredential,
				},
				fundsCredential: {
					isEnabled: isFundsCredentialEnabled,
				},
				betCredential: {
					isEnabled: isBetCredentialEnabled,
				},
			},
			teamStatsData: {
				numOfUsers,
				balance: teamBalance
			},
			levelName,
		} = this.props;
		const {
			statuses = {},
			createdBy,
			bonus: userBonus,
			createdAt,
		} = userProfile;
		const {
			createdAt: lastLoginCreatedAt,
		} = lastLoginAudit;
		const {
			isBetable,
			isBlocked,
			isFundsable,
			isDepositable,
			isTeamBetable,
			isTeamBlocked,
			isDividendable,
			isTransferable,
			isWithdrawable,
			isTeamFundsable,
			isTeamDepositable,
			isTeamWithdrawable,
			isChildrenCreatable,
		} = statuses;

		return (
			<div className={DETAIL_PREFIX_CLASS}>
				<Row
					type={Row.TypeEnums.FLEX}
					align={Row.AlignEnums.TOP}
				>
					<Col span={6}>
						<Row>
							<Col>
								<UserDetailLabel
									label="帐号冻结:"
									editButton={<BlockUserEditButton />}
								>
									{renderUserTeamStatusText(!isBlocked, !isTeamBlocked, '冻结', renderForbiddenText)}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel label="登录:">
									{isOnline ? '上线' : '离线'}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel label="登入错误数:">
									{numOfFailedLogin}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="奖金号:"
									editButton={<BonusEditButton/>}
								>
									{userBonus}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="目前层级:"
									editButton={<LevelEditButton />}
								>
									{levelName}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel label="团队余额:">
									<DecimalNumber hasSeparator data={teamBalance}/> 元
								</UserDetailLabel>
							</Col>
						</Row>
					</Col>
					<Col span={6}>
						<Row>
							<Col>
								<UserDetailLabel
									label="登录密码:"
									editButton={<LoginPasswordEditButton/>}
								>
									{isDefaultLoginCredential ? NOT_SETTING_TEXT : '********'}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="资金密码:"
									editButton={<FundsPasswordEditButton/>}
								>
									{isFundsCredentialEnabled ? '********' : NOT_SETTING_TEXT}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="投注密码:"
									editButton={<BettingPasswordEditButton/>}
								>
									{isBetCredentialEnabled ? '********' : NOT_SETTING_TEXT}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="分红冻结:"
									editButton={<BlockDividendEditButton/>}
								>
									{isDividendable ? '未冻结' : renderForbiddenText('冻结')}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel label="创建来源:">
									{createdBy}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel label="团队人数:">
									{numOfUsers}
								</UserDetailLabel>
							</Col>
						</Row>
					</Col>
					<Col span={6}>
						<Row>
							<Col>
								<UserDetailLabel
									label="禁止充值:"
									editButton={<DepositableEditButton/>}
								>
									{renderUserTeamStatusText(isDepositable, isTeamDepositable, '禁止', renderForbiddenText)}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="禁止投注:"
									editButton={<BetableEditButton/>}
								>
									{renderUserTeamStatusText(isBetable, isTeamBetable, '禁止', renderForbiddenText)}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="禁止提现:"
									editButton={<WithdrawableEditButton/>}
								>
									{renderUserTeamStatusText(isWithdrawable, isTeamWithdrawable, '禁止', renderForbiddenText)}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="资金冻结:"
									editButton={<BlockFundsEditButton/>}
								>
									{renderUserTeamStatusText(isFundsable, isTeamFundsable, '冻结', renderForbiddenText)}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel label="创建时间:">
									{getDateText(createdAt)}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="禁止开下级:"
									editButton={<SubordinateCreatableEditButton/>}
								>
									{isChildrenCreatable ? '无' : renderForbiddenText('禁止')}
								</UserDetailLabel>
							</Col>
						</Row>
					</Col>
					<Col span={6}>
						<Row>
							<Col>
								<UserDetailLabel
									label="禁止任意转帐:"
									editButton={<TransferableEditButton/>}
								>
									{isTransferable ? '无' : renderForbiddenText('禁止')}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel
									label="提现提示:"
									isEllipsis
									numberOfLines={1}
									editButton={<WithdrawalHintEditButton/>}
								>
									{userWithdrawalMessage || '无资料'}
								</UserDetailLabel>
							</Col>
							<Col>
								<UserDetailLabel label="最后登录时间:">
									{getDateText(lastLoginCreatedAt)}
								</UserDetailLabel>
							</Col>
							<Col>
								{renderCommentTag(userPinnedComments)}
								<UserDetailLabel
									label="最新备注:"
									isEllipsis
									editButton={<CommentEditButton />}
								>
									{getLastCommentDescription(userCommentsData)}
								</UserDetailLabel>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		);
	}
}

UserDetailSection.propTypes = propTypes;
UserDetailSection.defaultProps = defaultProps;

export default UserDetailSection;

function renderForbiddenText(text = '') {
	return (
		<span
			key={text}
			className={`${DETAIL_PREFIX_CLASS}__text ${DETAIL_PREFIX_CLASS}__text--forbidden`}
		>
			{text}
		</span>
	);
}

function renderCommentTag(comments = []) {
	const size = comments.length;

	if (!size) {
		return null;
	}

	return (
		<div className={`${DETAIL_PREFIX_CLASS}__comment-tag`}>
			{size} 则置顶备注
		</div>
	);
}

function getDateText(date) {
	return isDateValid(date) ? formatDate(date, DATE_TIME_FORMAT) : '无资料';
}
