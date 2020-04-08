import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, DecimalNumber, } from 'ljit-react-components';
import {
	isDateValid,
	formatDate,
	convertDateStringToTimestamp,
} from '../../../../../lib/moment-utils';
import { RouteKeyEnums, } from '../../../../routes';
import PageBlock from '../../../../components/page-block';
import MemberListSearchForm from '../form/member-list-search-form';
import { connect } from 'ljit-store-connecter';
import { financeLevelsActions } from '../../../../controller';
import { LoadingStatusEnum, } from '../../../../lib/enums';
import { withLoadingStatusNotification, } from '../../../../../lib/notify-handler';

const { NONE, SUCCESS, FAILED, LOADING, } = LoadingStatusEnum;
const { fetchFinanceLevelUsersAction } = financeLevelsActions;
const { CASHSYSTEM_HIERARCHICAL_MANAGEMENT, } = RouteKeyEnums;
const PREFIX_CLASS = 'member-list';

const propTypes = {
	levelId: PropTypes.string.isRequired,
	onNavigate: PropTypes.func.isRequired,
	financeLevelUsersData: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		username: PropTypes.string,
		loginAt: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.object,
		]),
		wallets: PropTypes.arrayOf(PropTypes.shape({
			balance: PropTypes.number,
		})),
	})),
	financeLevelUsersLoadingStatus: PropTypes.oneOf([NONE, SUCCESS, FAILED, LOADING]).isRequired,
	financeLevelUsersLoadingStatusMessage: PropTypes.string.isRequired,
	fetchFinanceLevelUsersAction: PropTypes.func.isRequired,
	numOfItems: PropTypes.number,
};
const DEFAULT_PAGE = 1;

class CashSystemHierarchicalManagementMemberListPage extends Component {
	constructor() {
		super();
		this.state = {
			pagination: {},
			queries: {},
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleChangeTable = this._handleChangeTable.bind(this);
		this._handleFetchFinanceLevelUsers = this._handleFetchFinanceLevelUsers.bind(this);
	}

	_handleFetchFinanceLevelUsers(queries = {}) {
		const {
			levelId,
			fetchFinanceLevelUsersAction,
		} = this.props;

		fetchFinanceLevelUsersAction(levelId, queries);
	}

	_handleSearch(serachData) {
		const { _handleFetchFinanceLevelUsers } = this;
		const { username, date = [], } = serachData;
		const queries = {
			username,
			page: DEFAULT_PAGE
		};

		if (date.length !== 0) {
			const [loginAtFrom, loginAtTo] = date;

			queries.loginAtFrom = convertDateStringToTimestamp(loginAtFrom);
			queries.loginAtTo = convertDateStringToTimestamp(loginAtTo);
		}

		_handleFetchFinanceLevelUsers(queries);
		this.setState({
			queries,
		});
	}

	_handleChangeTable(nextPagination = {}, filter, sort) {
		const { _handleFetchFinanceLevelUsers } = this;
		const { queries, pagination } = this.state;
		const newQueries = { ...queries };
		const { current: nextPage, } = nextPagination;
		const { order } = sort;

		if (pagination.current === nextPage) {
			newQueries.page = DEFAULT_PAGE;
			nextPagination.current = DEFAULT_PAGE;
		} else {
			newQueries.page = nextPage;
		}

		if (order) {
			newQueries.order = order.replace('end', '');
		}

		_handleFetchFinanceLevelUsers(newQueries);
		this.setState({
			pagination: nextPagination,
			queries: newQueries,
		});
	}

	render() {
		const {
			_handleSearch,
			_handleChangeTable,
			state: {
				pagination,
			},
		} = this;
		const {
			financeLevelUsersData,
			onNavigate,
			numOfItems
		} = this.props;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__toolbar`}>
					<Button
						outline={Button.OutlineEnums.HOLLOW}
						onClick={() => onNavigate(CASHSYSTEM_HIERARCHICAL_MANAGEMENT)}
					>
						返回上一层
					</Button>
				</div>
				<PageBlock>
					<div className={`${PREFIX_CLASS}__title-wrapper`}>
						<PageBlock.Title text="层级会员名单" />
					</div>
					<MemberListSearchForm
						onSearch={_handleSearch}
						className={`${PREFIX_CLASS}__search-form`}
					/>
					<div>
						<Table
							className={`${PREFIX_CLASS}__table`}
							rowKey="id"
							onTableChange={_handleChangeTable}
							dataSource={financeLevelUsersData}
							columns={[
								{
									title: '帐号',
									dataIndex: 'username',
									width: '33%'
								},
								{
									title: '余额',
									dataIndex: 'wallets',
									render: (wallet) => <DecimalNumber data={wallet[0].balance} hasSeparator/>,
									width: '33%'
								},
								{
									title: '最后登录时间',
									dataIndex: 'loginAt',
									sorter: () => {},
									render: (value) => isDateValid(value) ? formatDate(value) : '无资料',
								},
							]}
							hasPagination
							paginationProps={{
								...pagination,
								total: numOfItems,
								showQuickJumper: false,
								showSizeChanger: false,
							}}
						/>
					</div>
				</PageBlock>
			</div>
		);
	}
	componentDidMount() {
		this._handleFetchFinanceLevelUsers();
	}
}

CashSystemHierarchicalManagementMemberListPage.propTypes = propTypes;

function mapStateToProps(state) {
	const financeLevelUsers = state.financeLevelUsers.get('data').toObject();

	return {
		financeLevelUsersData: financeLevelUsers.users,
		numOfItems: financeLevelUsers.numOfItems,
		financeLevelUsersLoadingStatus: state.financeLevelUsers.get('loadingStatus'),
		financeLevelUsersLoadingStatusMessage: state.financeLevelUsers.get('loadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		fetchFinanceLevelUsersAction: (levelId, queries) => dispatch(fetchFinanceLevelUsersAction(levelId, queries)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		[
			{
				loadingStatus: 'financeLevelUsersLoadingStatus',
				loadingStatusMessage: 'financeLevelUsersLoadingStatusMessage',
			},
		],
		CashSystemHierarchicalManagementMemberListPage
	)
);
