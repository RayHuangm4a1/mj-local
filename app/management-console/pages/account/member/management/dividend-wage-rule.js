import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Button,
	Table,
} from 'ljit-react-components';
import { connect, } from 'ljit-store-connecter';
import PageBlock from '../../../../components/page-block';
import DividendRuleModal from './dividend-rule-modal';
import WageRuleModal from './wage-rule-modal';
import {
	notifyHandlingActions,
	userDividendWageRulePageActions,
	userDividendSettingsActions,
	userProfileActions,
} from '../../../../controller';
import {
	LoadingStatusEnum,
	UserTypeEnum,
} from '../../../../lib/enums';
import {
	PlatformPropTypes,
	UserProfilePropTypes,
} from '../../../../lib/prop-types-utils';
import { RouteKeyEnums, } from '../../../../routes';
import { notifications, } from '../../../../../lib/notify-handler';
import { usePrevious, } from '../../../../lib/react-utils';

const {
	LOADING,
	SUCCESS,
} = LoadingStatusEnum;

const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;

const {
	AGENT,
	MEMBER,
} = UserTypeEnum;
const { notifyHandlingAction, } = notifyHandlingActions;
const {
	initUserDividendWageRulePageAction,
} = userDividendWageRulePageActions;
const {
	updateUserDividendSettingsAction,
} = userDividendSettingsActions;
const {
	updateUserFixedWageAction,
} = userProfileActions;

const propTypes = {
	userId: PropTypes.string.isRequired,
	platformData: PlatformPropTypes,
	userProfileData: UserProfilePropTypes,
	userDividendSettingsData: PropTypes.array,
	fixedWage: PropTypes.number,
	numOfPersons: PropTypes.number,
	fixedWageUpdateLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	dividendUpdateLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	notifyHandlingAction: PropTypes.func.isRequired,
	initUserDividendWageRulePageAction: PropTypes.func.isRequired,
	updateUserDividendSettingsAction: PropTypes.func.isRequired,
	updateUserFixedWageAction: PropTypes.func.isRequired,
	onNavigate: PropTypes.func.isRequired,
};

const withUserTypeCheck = (CheckedComponent) => (props) => {
	const {
		userId,
		userProfileData: {
			type,
		},
		onNavigate,
	} = props;
	
	if (type !== MEMBER && type !== AGENT) {
		onNavigate(`${RouteKeyEnums.ACCOUNT_MEMBER_MANAGEMENT}/${userId}/details/basic-setting`);
		return null;
	} else {
		return <CheckedComponent {...props}/>;
	}
};

function AccountMemberManagementDividendAndWageRulePage({
	userId,
	platformData,
	userProfileData,
	userDividendSettingsData,
	fixedWageUpdateLoadingStatus,
	dividendUpdateLoadingStatus,
	notifyHandlingAction,
	initUserDividendWageRulePageAction,
	updateUserDividendSettingsAction,
	updateUserFixedWageAction,
}) {
	const prevFixedWageUpdateLoadingStatus = usePrevious(fixedWageUpdateLoadingStatus);
	const prevDividendUpdateLoadingStatus = usePrevious(dividendUpdateLoadingStatus);
	const [isShowDividendRuleModal, setIsShowDividendRuleModal] = useState(false);
	const [isShowWageRuleModal, setIsShowWageRuleModal] = useState(false);

	useEffect(() => {
		initUserDividendWageRulePageAction(userId);
	}, [userId]);

	useEffect(() => {
		if (fixedWageUpdateLoadingStatus === SUCCESS && prevFixedWageUpdateLoadingStatus === LOADING) {
			notifyHandlingAction(new Success('固定工资修改成功'));
		}
	}, [fixedWageUpdateLoadingStatus]);

	useEffect(() => {
		if (dividendUpdateLoadingStatus === SUCCESS && prevDividendUpdateLoadingStatus === LOADING) {
			notifyHandlingAction(new Success('分红规则修改成功'));
		}
	}, [dividendUpdateLoadingStatus]);

	function _handleUpdateWageRules(values) {
		updateUserFixedWageAction(userId, values.fixedWage);
		setIsShowWageRuleModal(false);
	}

	function _handleUpdateDivideRules(values) {
		updateUserDividendSettingsAction(userId, values);
		setIsShowDividendRuleModal(false);
	}

	const dataLength = userDividendSettingsData.length;
	const { fixedWage, } = userProfileData;
	const { fixedWages, } = platformData;
	const modalTitle = '固定工资规则修改';
	const modalLabel = '固定工资：';
	const wageOptions = fixedWages.map(wage => ({ label: displayPercentage(wage), value: wage, }));
	const columns = [
		{
			title: '序号',
			width: '33%',
			dataIndex: 'order',
			render: (value, record, index) => index + 1
		},
		{
			title: '周期总量（万）',
			dataIndex: 'amount',
			width: '33%',
			render: (value, record, index) => {
				const dividendSetting = userDividendSettingsData[index - 1];
				const amount = dividendSetting ? dividendSetting.amount : 0 ;

				if (index === dataLength - 1) {
					return `${value}以上`;
				} else {
					return `${amount}-${value}`;
				}
			}
		},
		{
			title: '分红比率（%)',
			dataIndex: 'ratio',
			width: '33%',
			render: (value) => `${value}%`
		},
	];
	
	return (
		<div className="member-dividend-rule">
			<HeaderButtonBar
				left={
					<React.Fragment>
						<PageBlock.Title text="分红规则" />
						<Button
							outline={Button.OutlineEnums.HOLLOW}
							onClick={() => setIsShowDividendRuleModal(true)}
						>
							修改
						</Button>
					</React.Fragment>
				}
			/>
			<Table
				rowKey="amount"
				columns={columns}
				dataSource={userDividendSettingsData}
			/>
			<div className="member-dividend-rule__fixed-wage-rule">
				<HeaderButtonBar
					left={
						<React.Fragment>
							<PageBlock.Title text="固定工资规则" />
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								onClick={() => {
									setIsShowWageRuleModal(true);
								}}
							>
								修改
							</Button>
						</React.Fragment>
					}
				/>
				<div>
					<span className="member-dividend-rule__item-label">固定工资：</span>
					<span>{displayPercentage(fixedWage)}</span>
				</div>
			</div>
			<DividendRuleModal
				isShowModal={isShowDividendRuleModal}
				dividends={userDividendSettingsData}
				onSubmit={_handleUpdateDivideRules}
				onCancel={() => setIsShowDividendRuleModal(false)}
			/>
			<WageRuleModal
				isShowModal={isShowWageRuleModal}
				modalTitle={modalTitle}
				modalLabel={modalLabel}
				wageValue={fixedWage}
				wageOptions={wageOptions}
				onSubmit={_handleUpdateWageRules}
				onCancel={() => setIsShowWageRuleModal(false)}
			/>
		</div>
	);
}

AccountMemberManagementDividendAndWageRulePage.propTypes = propTypes;

function mapStateToProps(state) {
	const { platform, userData, } = state;
	const { profile, dividendSettings, } = userData;

	return {
		platformData: platform.get('data').toObject(),
		userProfileData: profile.get('data').toObject(),
		userDividendSettingsData: dividendSettings.get('data').toArray(),
		fixedWageUpdateLoadingStatus: profile.get('updateLoadingStatus'),
		dividendUpdateLoadingStatus: dividendSettings.get('updateLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
		initUserDividendWageRulePageAction: (userId) => dispatch(initUserDividendWageRulePageAction(userId)),
		updateUserDividendSettingsAction: (userId, body) => dispatch(updateUserDividendSettingsAction(userId, body)),
		updateUserFixedWageAction: (userId, body) => dispatch(updateUserFixedWageAction(userId, body)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withUserTypeCheck(AccountMemberManagementDividendAndWageRulePage));

function displayPercentage(value) {
	return `${(value).toFixed(2)}%`;
}
