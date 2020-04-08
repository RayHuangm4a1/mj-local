import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Button,
} from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import {
	withLoadingStatusNotification,
	notifications,
} from '../../../../../lib/notify-handler';
import {
	isDateValid,
	convertDateStringToTimestamp,
} from '../../../../../lib/moment-utils';
import {
	cashSystemHierarchicalManagementPageActions,
	financeLevelsActions,
	userFinanceLevelActions,
} from '../../../../controller';
import { RouteKeyEnums, } from '../../../../routes';
import {
	FinanceLevelsDataPropTypes,
	FinanceLevelNamesMapDataPropTypes,
	FinanceLevelOptionsDataPropTypes,
} from '../../../../lib/prop-types-utils';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import PageBlock from '../../../../components/page-block';
import {
	filterNormalFinanceLevels,
	filterSpecialFinanceLevels,
} from '../utils';
import SearchMemberForm from '../form/search-member-form';
import ModifyMemberForm from '../form/modify-member-form';
import SearchMemberInfoTable from '../table/search-member-info-table';
import SpecialLevelTable from '../table/special-level-table';
import NormalLevelTable from '../table/normal-level-table';
import NormalLevelEditingModal from '../modal/normal-level-editing-modal';
import SpecialLevelEditingModal from '../modal/special-level-editing-modal';

const { Success, } = notifications.successNotifications;

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;
const {
	initCashSystemHierarchicalManagementPageAction: initPageAction,
	refreshCashSystemHierarchicalManagementNormalLevelsAction: refreshNormalLevelsAction,
	fetchCashSystemHierarchicalManagementUserLevelAction: fetchUserLevelAction,
} = cashSystemHierarchicalManagementPageActions;
const {
	updateFinanceNormalLevelsAction,
	updateFinanceSpecialLevelsAction,
} = financeLevelsActions;
const {
	updateUserFinanceLevelAction,
} = userFinanceLevelActions;
const { Title, } = PageBlock;
const {
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT,
	CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO,
} = RouteKeyEnums;

const failedLoadingStatuses = [
	{
		loadingStatus: 'loadingStatus',
		loadingStatusMessage: 'loadingStatusMessage',
	},
	{
		loadingStatus: 'refreshNormalLevelsLoadingStatus',
		loadingStatusMessage: 'refreshNormalLevelsLoadingStatusMessage',
	},
	{
		loadingStatus: 'updateFinanceNormalLevelsLoadingStatus',
		loadingStatusMessage: 'updateFinanceNormalLevelsLoadingStatusMessage'
	},
	{
		loadingStatus: 'updateFinanceSpecialLevelsLoadingStatus',
		loadingStatusMessage: 'updateFinanceSpecialLevelsLoadingStatusMessage',
	},
	{
		loadingStatus: 'userLevelLoadingStatus',
		loadingStatusMessage: 'userLevelLoadingStatusMessage',
	},
	{
		loadingStatus: 'updateUserLevelLoadingStatus',
		loadingStatusMessage: 'updateUserLevelLoadingStatusMessage',
	},
];

const loadingStatusPropTypes = PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired;

const propTypes = {
	userFinanceLevelData: PropTypes.object,
	financeLevelsData: FinanceLevelsDataPropTypes,
	financeLevelNamesMapData: FinanceLevelNamesMapDataPropTypes,
	normalFinanceLevelOptions: FinanceLevelOptionsDataPropTypes,
	specialFinanceLevelOptions: FinanceLevelOptionsDataPropTypes,
	normalFinanceLevels: FinanceLevelsDataPropTypes,
	specialFinanceLevels: FinanceLevelsDataPropTypes,
	loadingStatus: loadingStatusPropTypes,
	loadingStatusMessage: PropTypes.string,
	refreshNormalLevelsLoadingStatus: loadingStatusPropTypes,
	refreshNormalLevelsLoadingStatusMessage: PropTypes.string,
	userLevelLoadingStatus: loadingStatusPropTypes,
	userLevelLoadingStatusMessage: PropTypes.string,
	updateUserLevelLoadingStatus: loadingStatusPropTypes,
	updateUserLevelLoadingStatusMessage: PropTypes.string,
	onNavigate: PropTypes.func.isRequired,
	initPageAction: PropTypes.func.isRequired,
	refreshNormalLevelsAction: PropTypes.func.isRequired,
	updateFinanceNormalLevelsAction: PropTypes.func.isRequired,
	updateFinanceSpecialLevelsAction: PropTypes.func.isRequired,
	updateFinanceNormalLevelsLoadingStatus: loadingStatusPropTypes,
	updateFinanceSpecialLevelsLoadingStatus: loadingStatusPropTypes,
	updateFinanceNormalLevelsLoadingStatusMessage: PropTypes.string.isRequired,
	updateFinanceSpecialLevelsLoadingStatusMessage: PropTypes.string.isRequired,
	fetchUserLevelAction: PropTypes.func.isRequired,
	updateUserFinanceLevelAction: PropTypes.func.isRequired,
	notifyHandlingAction: PropTypes.func.isRequired,
};

class CashSystemHierarchicalManagementMainPage extends Component {
	constructor() {
		super();
		this.state = {
			isUserFirstSearching: true,
			isUserExist: false,
			isNormalLevelEditingModalVisible: false,
			isSpecialLevelEditingModalVisible: false,
			selectedNormalLevelData: {},
			selectedSpecialLevelData: {},
		};

		this._handleSearchUser = this._handleSearchUser.bind(this);
		this._handleUpdateUserLevel = this._handleUpdateUserLevel.bind(this);
		this._renderUserModifyBlock = this._renderUserModifyBlock.bind(this);
		this._handleRefreshNormalLevel = this._handleRefreshNormalLevel.bind(this);
		this._handleNavigateToMemberListPage = this._handleNavigateToMemberListPage.bind(this);
		this._handleOpenNormalLevelModal = this._handleOpenNormalLevelModal.bind(this);
		this._handleUpdateNormalLevel = this._handleUpdateNormalLevel.bind(this);
		this._handleOpenSpecialLevelModal = this._handleOpenSpecialLevelModal.bind(this);
		this._handleNavigateToAutoPage = this._handleNavigateToAutoPage.bind(this);
		this._handleUpdateSpecialLevel = this._handleUpdateSpecialLevel.bind(this);
	}

	_handleSearchUser(username) {
		if (typeof username !== 'string' || !username.trim().length) {
			return false;
		}

		this.props.fetchUserLevelAction(username);
	}
	_handleUpdateUserLevel({ levelId, levelExpiredAt, }) {
		const {
			userFinanceLevelData,
			updateUserFinanceLevelAction,
		} = this.props;
		const {
			id,
		} = userFinanceLevelData;

		updateUserFinanceLevelAction(id, {
			levelId,
			levelExpiredAt: isDateValid(levelExpiredAt) ? convertDateStringToTimestamp(levelExpiredAt) : undefined,
		});
	}
	_renderUserModifyBlock() {
		const {
			userFinanceLevelData,
			financeLevelsData,
			financeLevelNamesMapData,
			normalFinanceLevelOptions,
			specialFinanceLevelOptions,
			updateUserLevelLoadingStatus,
		} = this.props;
		const {
			levelId,
			levelExpiredAt,
		} = userFinanceLevelData;
		const users = levelId ? [ userFinanceLevelData, ] : [];
		const financeLevel = financeLevelsData.find(level => level.id === levelId);

		return (
			<Fragment>
				<SearchMemberInfoTable
					users={users}
				/>
				<ModifyMemberForm
					isDisabled={updateUserLevelLoadingStatus === LOADING}
					levelId={levelId}
					levelType={financeLevel ? financeLevel.type : null}
					levelName={financeLevelNamesMapData[levelId]}
					levelExpiredAt={levelExpiredAt}
					normalLevelOptions={normalFinanceLevelOptions}
					specialLevelOptions={specialFinanceLevelOptions}
					onSubmit={this._handleUpdateUserLevel}
				/>
			</Fragment>
		);
	}

	_handleRefreshNormalLevel() {
		this.props.refreshNormalLevelsAction();
	}

	_handleNavigateToMemberListPage(selectedLevel) {
		const { onNavigate, } = this.props;
		const { id, } = selectedLevel;

		onNavigate(`${CASHSYSTEM_HIERARCHICAL_MANAGEMENT}/${id}/member-list`);
	}

	_handleOpenNormalLevelModal(selectedNormalLevelData) {
		this.setState({
			selectedNormalLevelData,
			isNormalLevelEditingModalVisible: true,
		});
	}
	_handleUpdateNormalLevel({
		isBettingAmountGreaterThanDepositAmount,
		description,
		status,
		withdrawalAmount,
		numOfWithdraws,
		bettingAmount,
		depositAmount,
		numOfDeposits,
		numOfRegisteredDays,
		registeredBefore,
		registeredAfter,
		name,
	}) {
		const { selectedNormalLevelData: { id: levelId, } } = this.state;
		const convertedRegisteredAfter = registeredAfter && isDateValid(registeredAfter) ? convertDateStringToTimestamp(registeredAfter) : undefined;
		const convertedRegisteredBefore = registeredBefore && isDateValid(registeredBefore) ? convertDateStringToTimestamp(registeredBefore) : undefined;
		const bodyParams = {
			isBettingAmountGreaterThanDepositAmount,
			description,
			status,
			withdrawalAmount,
			numOfWithdraws,
			bettingAmount,
			depositAmount,
			numOfDeposits,
			numOfRegisteredDays,
			registeredAfter: convertedRegisteredAfter,
			registeredBefore: convertedRegisteredBefore,
			name,
		};

		this.props.updateFinanceNormalLevelsAction(levelId, bodyParams);
		this.setState({ isNormalLevelEditingModalVisible: false, });
	}

	_handleOpenSpecialLevelModal(selectedSpecialLevelData) {
		this.setState({
			selectedSpecialLevelData,
			isSpecialLevelEditingModalVisible: true
		});
	}
	_handleNavigateToAutoPage() {
		this.props.onNavigate(CASHSYSTEM_HIERARCHICAL_MANAGEMENT_AUTO);
	}
	_handleUpdateSpecialLevel({ status, name, }) {
		const { selectedSpecialLevelData: { id: levelId, } } = this.state;

		this.props.updateFinanceSpecialLevelsAction(levelId, { status, name, });
		this.setState({ isSpecialLevelEditingModalVisible: false, });
	}

	render() {
		const {
			normalFinanceLevels,
			specialFinanceLevels,
			loadingStatus,
			refreshNormalLevelsLoadingStatus,
		} = this.props;
		const {
			isUserFirstSearching,
			isUserExist,
			isNormalLevelEditingModalVisible,
			isSpecialLevelEditingModalVisible,
			selectedNormalLevelData,
			selectedSpecialLevelData,
		} = this.state;
		const {
			_handleSearchUser,
			_handleRefreshNormalLevel,
			_handleNavigateToMemberListPage,
			_handleOpenNormalLevelModal,
			_handleUpdateNormalLevel,
			_handleOpenSpecialLevelModal,
			_handleNavigateToAutoPage,
			_handleUpdateSpecialLevel,
		} = this;
		const isPageLoading = loadingStatus === LOADING;
		const isNormalLevelsRefreshing = refreshNormalLevelsLoadingStatus === LOADING;
		const isUserLevelModifiable = !isUserFirstSearching && isUserExist;

		return (
			<div>
				<PageBlock
					noMinHeight
				>
					<HeaderButtonBar
						left={<Title text="修改會員层级"/>}
					/>
					<SearchMemberForm
						onSubmit={_handleSearchUser}
					/>
					{isUserLevelModifiable ? this._renderUserModifyBlock() : null}
				</PageBlock>
				<PageBlock>
					<HeaderButtonBar
						left={<Title text="一般层级規則" />}
						right={(
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								onClick={_handleRefreshNormalLevel}
							>
								重新整理层级
							</Button>
						)}
					/>
					<NormalLevelTable
						levels={normalFinanceLevels}
						isLoading={isNormalLevelsRefreshing || isPageLoading}
						onClickLevelEdition={_handleOpenNormalLevelModal}
						onClickNumberOfUsers={_handleNavigateToMemberListPage}
					/>
				</PageBlock>
				<PageBlock>
					<HeaderButtonBar
						left={<Title text="特殊层级規則" />}
					/>
					<SpecialLevelTable
						levels={specialFinanceLevels}
						isLoading={isPageLoading}
						onClickLevelEdition={_handleOpenSpecialLevelModal}
						onClickAutoLevelEdition={_handleNavigateToAutoPage}
						onClickNumberOfUsers={_handleNavigateToMemberListPage}
					/>
				</PageBlock>
				<NormalLevelEditingModal
					isVisible={isNormalLevelEditingModalVisible}
					data={selectedNormalLevelData}
					onSubmit={_handleUpdateNormalLevel}
					onClose={() => this.setState({ isNormalLevelEditingModalVisible: false, })}
				/>
				<SpecialLevelEditingModal
					isVisible={isSpecialLevelEditingModalVisible}
					data={selectedSpecialLevelData}
					onSubmit={_handleUpdateSpecialLevel}
					onClose={() => this.setState({ isSpecialLevelEditingModalVisible: false, })}
				/>
			</div>
		);
	}

	componentDidMount() {
		const {
			initPageAction,
		} = this.props;

		initPageAction();
	}

	componentDidUpdate(prevProps) {
		const {
			userLevelLoadingStatus,
			userFinanceLevelData,
			updateUserLevelLoadingStatus,
			fetchUserLevelAction,
			notifyHandlingAction,
			initPageAction,
			updateFinanceNormalLevelsLoadingStatus,
			updateFinanceSpecialLevelsLoadingStatus,
		} = this.props;

		if (prevProps.updateFinanceNormalLevelsLoadingStatus === LOADING && updateFinanceNormalLevelsLoadingStatus === SUCCESS) {
			initPageAction();
			notifyHandlingAction(new Success('层级设定修改成功'));
		}
		if (prevProps.updateFinanceSpecialLevelsLoadingStatus === LOADING && updateFinanceSpecialLevelsLoadingStatus === SUCCESS) {
			initPageAction();
			notifyHandlingAction(new Success('层级设定修改成功'));
		}

		if (prevProps.userLevelLoadingStatus === NONE && userLevelLoadingStatus === LOADING) {
			this.setState({ isUserFirstSearching: false, });
		}
		if (prevProps.userLevelLoadingStatus === LOADING && userLevelLoadingStatus === SUCCESS) {
			this.setState({ isUserExist: true, });
		}

		if (prevProps.updateUserLevelLoadingStatus === LOADING && updateUserLevelLoadingStatus === SUCCESS) {
			const {
				username,
			} = userFinanceLevelData;

			notifyHandlingAction(new Success('层级设定修改成功'));
			fetchUserLevelAction(username);
		}
	}
}

CashSystemHierarchicalManagementMainPage.propTypes = propTypes;

function mapStateToProps(state) {
	const {
		cashSystemHierarchicalManagementPage: pageReducer,
		financeLevels: financeLevelsReducer,
		userData: {
			financeLevel: userFinanceLevelReducer,
		},
	} = state;
	const financeLevelOptionsData = financeLevelsReducer.get('financeLevelOptions').toArray();
	const financeLevelsData = financeLevelsReducer.get('financeLevels').toArray();

	return {
		userFinanceLevelData: userFinanceLevelReducer.get('data').toObject(),
		updateUserLevelLoadingStatus: userFinanceLevelReducer.get('updateLoadingStatus'),
		updateUserLevelLoadingStatusMessage: userFinanceLevelReducer.get('updateLoadingStatusMessage'),
		loadingStatus: pageReducer.get('loadingStatus'),
		loadingStatusMessage: pageReducer.get('loadingStatusMessage'),
		refreshNormalLevelsLoadingStatus: pageReducer.get('refreshNormalLevelsLoadingStatus'),
		refreshNormalLevelsLoadingStatusMessage: pageReducer.get('refreshNormalLevelsLoadingStatusMessage'),
		financeLevelsData: financeLevelsReducer.get('financeLevels').toArray(),
		financeLevelNamesMapData: financeLevelsReducer.get('financeLevelNamesMap').toObject(),
		normalFinanceLevelOptions: filterNormalFinanceLevels(financeLevelOptionsData),
		specialFinanceLevelOptions: filterSpecialFinanceLevels(financeLevelOptionsData),
		userLevelLoadingStatus: pageReducer.get('userLevelLoadingStatus'),
		userLevelLoadingStatusMessage: pageReducer.get('userLevelLoadingStatusMessage'),
		normalFinanceLevels: filterNormalFinanceLevels(financeLevelsData),
		specialFinanceLevels: filterSpecialFinanceLevels(financeLevelsData),
		updateFinanceNormalLevelsLoadingStatus: financeLevelsReducer.get('updateFinanceNormalLevelsLoadingStatus'),
		updateFinanceNormalLevelsLoadingStatusMessage: financeLevelsReducer.get('updateFinanceNormalLevelsLoadingStatusMessage'),
		updateFinanceSpecialLevelsLoadingStatus: financeLevelsReducer.get('updateFinanceSpecialLevelsLoadingStatus'),
		updateFinanceSpecialLevelsLoadingStatusMessage: financeLevelsReducer.get('updateFinanceSpecialLevelsLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		initPageAction: () => dispatch(initPageAction()),
		refreshNormalLevelsAction: () => dispatch(refreshNormalLevelsAction()),
		updateFinanceSpecialLevelsAction: (levelId, bodyParams) => dispatch(updateFinanceSpecialLevelsAction(levelId, bodyParams)),
		updateFinanceNormalLevelsAction: (levelId, bodyParams) => dispatch(updateFinanceNormalLevelsAction(levelId, bodyParams)),
		fetchUserLevelAction: (...args) => dispatch(fetchUserLevelAction(...args)),
		updateUserFinanceLevelAction: (...args) => dispatch(updateUserFinanceLevelAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		failedLoadingStatuses,
		CashSystemHierarchicalManagementMainPage
	)
);
