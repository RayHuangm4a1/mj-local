import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Statistic, Table, Button, RemindText } from 'ljit-react-components';
import { StatePropTypes } from '../../lib/prop-types-utils';
import moment from 'moment';
import './style.styl';

const PREFIX_CLASS = 'statistics-layout';
const propTypes = {
	username: PropTypes.string,
	hasBackButton: PropTypes.bool,
	onClickBackButton: PropTypes.func,
	teamStats: StatePropTypes,
};

const defaultProps = {
	hasBackButton: false,
	onClickBackButton: () => {},
	teamStats: {},
};

const LASEST_TEN_DAYS = 10;

class StatisticsLayout extends Component {
	constructor() {
		super();
		this._renderTeamBonus = this._renderTeamBonus.bind(this);
		this._renderButton = this._renderButton.bind(this);
	}
	_renderTeamBonus() {
		const { teamStats, } = this.props;
		const { teamBonusStatses = [] } = teamStats;

		return teamBonusStatses.map((item, index) => {
			const { bonus, numOfUsers } = item;

			return (
				<div key={`${bonus}__${index}`}>
					<div className={`${PREFIX_CLASS}__team-bonus-thead`}>
						{bonus}<br/>
						奖金人数
					</div>
					<div className={`${PREFIX_CLASS}__team-bonus-tbody`}>
						{numOfUsers}
					</div>
				</div>
			);
		});
	}
	_renderButton() {
		const { onClickBackButton, hasBackButton } = this.props;

		if (hasBackButton) {
			return (
				<Button
					onClick={onClickBackButton}
					color={Button.ColorEnums.GREY30}
					outline={Button.OutlineEnums.HOLLOW}
					className={`${PREFIX_CLASS}__button`}
				>返回</Button>
			);
		} else {
			return null;
		}
	}
	render() {
		const { _renderTeamBonus, _renderButton } = this;
		const {
			username,
			teamStats,
		} = this.props;
		const {
			numOfUsers,
			balance,
			numOfNonZeroBalanceUsers,
			numOfZeroBalanceUsers,
			numOfBettingUsers,
			teamDailyStatses = [],
		} = teamStats;

		const data = updateTeamDailyStatses(teamDailyStatses);

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__container`}>
					<div className={`${PREFIX_CLASS}__title`}>
						<div>
							【&nbsp;<span>{username}</span>&nbsp;】团队与奖金分类统计
							<RemindText
								text="＊团队总余额每五分钟更新一次"
							/>
						</div>
						{_renderButton()}
					</div>
					<div className={`${PREFIX_CLASS}__team-detail`}>
						<Statistic
							title="团队总人数"
							value={numOfUsers}
							suffix={'人'}
							sizeType={Statistic.SizeTypeEnums.MEDIUM}
						/>
						<Statistic
							title="团队总余额"
							value={balance}
							precision={2}
							suffix={'元'}
							sizeType={Statistic.SizeTypeEnums.MEDIUM}
						/>
						<Statistic
							title="有余额会员人数"
							value={numOfNonZeroBalanceUsers}
							sizeType={Statistic.SizeTypeEnums.MEDIUM}
						/>
						<Statistic
							title="余额为0元会员人数"
							value={numOfZeroBalanceUsers}
							sizeType={Statistic.SizeTypeEnums.MEDIUM}
						/>
						<Statistic
							title="今日投注人数"
							value={numOfBettingUsers}
							sizeType={Statistic.SizeTypeEnums.MEDIUM}
						/>
					</div>
					<div className={`${PREFIX_CLASS}__team-bonus`}>
						{_renderTeamBonus()}
					</div>
				</div>
				<div className={`${PREFIX_CLASS}__container`}>
					<div className={`${PREFIX_CLASS}__title`}>
						<div>
							近10天数据
						</div>
					</div>
					<Table
						rowKey="column"
						dataSource={data}
						columns={convertToColumns(data)}
					/>
				</div>
			</div>
		);
	}
}

StatisticsLayout.propTypes = propTypes;
StatisticsLayout.defaultProps = defaultProps;

export default StatisticsLayout;

function updateTeamDailyStatses(teamDailyStatses = []) {
	const tableData = [
		{
			column: '注册',
		},{
			column: '微信',
		},{
			column: '投注',
		},{
			column: '有效',
		},
	];

	for (let i = 0; i < LASEST_TEN_DAYS; i++) {
		const date = moment().subtract(i, 'days').format('M/DD');

		const teamDailyStatsFilterByDate = teamDailyStatses.filter(teamDailyStats => moment(teamDailyStats.date).format('M/DD') === date)[0] || {};
		const {
			numOfRegistries = 0,
			numOfBettingUsers = 0,
			numOfEffectiveBettingUsers = 0,
		} = teamDailyStatsFilterByDate;

		tableData[0] = { ...tableData[0], [date]: numOfRegistries };
		tableData[1] = { ...tableData[1], [date]: '-' };
		tableData[2] = { ...tableData[2], [date]: numOfBettingUsers };
		tableData[3] = { ...tableData[3], [date]: numOfEffectiveBettingUsers };
	}

	return tableData;
}

function convertToColumns(data) {
	return Object.keys(data[0]).map(item => {
		if (item === 'column') {
			return {
				dataIndex: "column",
				title: '日期',
			};
		} else {
			return {
				dataIndex: item,
				title: item,
			};
		}
	});
}
