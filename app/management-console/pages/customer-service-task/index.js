import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
	Row,
	Col,
	LabelContent,
	Input,
	Button,
	Menu,
} from 'ljit-react-components';
import { RouteKeyEnums, } from '../../routes';
import UserInfoBlock from '../../features/user-info-block';
import './style.styl';

const {
	Item: MenuItem,
} = Menu;

const fakeUser = {
	username: 'user1',
	iconUrl: 'https://i.pravatar.cc/100',
	nickname: 'User1 Nickname',
	type: 2,
	ancestors: [
		'user1',
		'user2',
		'user3',
		'user4',
		'user5',
		'user6',
		'user7',
		'user8',
		'user9',
		'user10',
	],
	details: {
		subordinateCount: 15,
		loginErrorCount: 8,
		teamBalance: 379345,
		createdBy: {
			username: '管理者',
		},
		bonus: {
			delta: -4,
		},
		level: {
			name: '第一层',
			index: 1,
		},
		policy: {
			blockDeposit: { isEnabled: false },
			blockWithdrawal: { isEnabled: false },
			blockBetting: { isEnabled: false },
		},
		lastComment: {
			createdBy: {
				username: 'fin001',
				type: 4,
			},
			content: '本角刻八半西已國代法能成，存人主一選很常能光落想想。我美外安。形戰二香美的方校小求別，的電利獎對以小藝！模然們國乎國善果我？全的色主輕運大士能著技如事生願科密',
		},
		pinnedCommentIds: [
			{ _id: '0', },
			{ _id: '1', },
			{ _id: '2', },
			{ _id: '3', },
			{ _id: '4', },
		],
	},
	loginAt: '2018-09-29T17:23:40+00:00',
	status: 'active',
	isOnline: true,
	createdAt: '2018-09-29T17:23:00+00:00',
	credentials: {
		loginPassword: 'tes****55555',
		fundsPassword: 'tes****66666',
		finPassword: '',
	},
};
const fakeStatistic = {
	deposit: 12879324,
	withdrawal: 12879,
	betting: 1293484,
	bonus: 1129824,
};
const fakeWallet = {
	balance: 12802349,
};

const {
	CUSTOMER_SERVICE_TASK_RECHARGE,
	CUSTOMER_SERVICE_TASK_ACCOUNT,
	CUSTOMER_SERVICE_TASK_PAYMENT,
	CUSTOMER_SERVICE_TASK_BETTING,
	CUSTOMER_SERVICE_TASK_CONTROL_ERROR,
	CUSTOMER_SERVICE_TASK_EXTERNAL_PLATFORM,
} = RouteKeyEnums;

const propTypes = {
	renderedRoutes: PropTypes.object,
	onNavigate: PropTypes.func.isRequired,
	pathName: PropTypes.string,
	username: PropTypes.string,
	user: PropTypes.object,
	userStatistic: PropTypes.object,
	userWallet: PropTypes.object,
};

class CustomerServiceTaskPage extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			isSearchResultVisible: false,
			activeMenuPath: CUSTOMER_SERVICE_TASK_RECHARGE
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleNavigate = this._handleNavigate.bind(this);
		this._renderAccountInformation = this._renderAccountInformation.bind(this);
		this._renderSearchResultBlock = this._renderSearchResultBlock.bind(this);
		this._handleEditUserDetail = this._handleEditUserDetail.bind(this);
		this._handleUserNavigate = this._handleUserNavigate.bind(this);
	}
	_handleSearch() {
		//TODO: get API
		const { onNavigate, } = this.props;
		const { username, activeMenuPath, } = this.state;

		if (!!activeMenuPath && !!username) {
			this.setState({ isSearchResultVisible: true, });
			onNavigate(`${activeMenuPath}/${username}`);
		}
	}
	_handleNavigate(path = '') {
		const { onNavigate, } = this.props;
		const obj = {
			username: '',
			isSearchResultVisible: false,
			activeMenuPath: path,
		};

		this.setState(obj);
		onNavigate(path);
	}

	_handleEditUserDetail(meta) {
		// TODO handle status form edit
		console.log('meta', meta);
	}
	_handleUserNavigate() {
		// TODO navigate to user by user breadcrumb
	}
	_renderAccountInformation() {
		const {
			user = fakeUser,
			userStatistic = fakeStatistic,
			userWallet = fakeWallet,
		} = this.props;

		return (
			<div className={cx('customer-service-task__block', 'customer-service-task__block_margin')}>
				<UserInfoBlock
					user={user}
					userStatsData={userStatistic}
					wallet={userWallet}
					onEditUserDetail={this._handleEditUserDetail}
					onClickUser={this._handleUserNavigate}
				/>
			</div>
		);
	}

	_renderSearchResultBlock(renderedRoutes) {
		return (
			<div className={cx('customer-service-task__block', 'customer-service-task__block_margin')}>
				{renderedRoutes}
			</div>
		);
	}
	render() {
		const { renderedRoutes, } = this.props;
		const {
			username,
			isSearchResultVisible,
		} = this.state;

		return (
			<React.Fragment>
				<div className="customer-service-task__block">
					<Menu
						className="customer-service-task__menu"
						themeType={Menu.ThemeTypeEnums.LIGHT}
						modeType={Menu.ModeTypeEnums.HORIZONTAL}
					>
						<MenuItem onClick={() => this._handleNavigate(CUSTOMER_SERVICE_TASK_RECHARGE)}>
							充值查询
						</MenuItem>
						<MenuItem onClick={() => this._handleNavigate(CUSTOMER_SERVICE_TASK_ACCOUNT)}>
							帐号资讯问题
						</MenuItem>
						<MenuItem onClick={() => this._handleNavigate(CUSTOMER_SERVICE_TASK_PAYMENT)}>
							提款查询
						</MenuItem>
						<MenuItem onClick={() => this._handleNavigate(CUSTOMER_SERVICE_TASK_BETTING)}>
							注单查询
						</MenuItem>
						<MenuItem onClick={() => this._handleNavigate(CUSTOMER_SERVICE_TASK_CONTROL_ERROR)}>
							控件错误
						</MenuItem>
						<MenuItem onClick={() => this._handleNavigate(CUSTOMER_SERVICE_TASK_EXTERNAL_PLATFORM)}>
							外接平台掉点
						</MenuItem>
					</Menu>
					<Row gutter={24}>
						<Col className="customer-service-task__col">
							<LabelContent
								label="帐号"
								className="customer-service-task__label"
							>
								<Input
									value={username}
									className="customer-service-task__input"
									placeholder="請輸入帐号"
									onChange={(event) => { this.setState({ username: event.target.value, }); }}
								/>
							</LabelContent>
							<LabelContent>
								<Button
									onClick={this._handleSearch}
								>
									查询
								</Button>
							</LabelContent>
						</Col>
					</Row>
				</div>

				{isSearchResultVisible ? this._renderAccountInformation() : null}
				{isSearchResultVisible ? this._renderSearchResultBlock(renderedRoutes) : null}
			</React.Fragment>
		);
	}
}

CustomerServiceTaskPage.propTypes = propTypes;

export default CustomerServiceTaskPage;
