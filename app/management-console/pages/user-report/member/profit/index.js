import React, { Component } from "react";

import PageBlock from "../../../../components/page-block";
import { RemindText, TextButton, Table } from 'ljit-react-components';
import SearchForm from './profit-search-form';
import { withFeatureToggle, layoutConfigsPropTypes, } from '../../../../../lib/feature-toggle-provider';
import { default as compose } from 'lodash/flowRight';
import { FeatureCodeEnum, } from '../../../../lib/enums';
import "./style.styl";

const TeamTotalResult = [
	{
		key: 1,
		totalBet: 52,
		totalPrize: 30,
		totalReturnPoint: 0,
		totalActivity: 0,
		totalBalance: -2240,
		totalTopup: 10000,
		totalWithdrawal: 10000,
		totalBonus: 10000
	},
];
const personResult = [
	{
		key: 1,
		totalBet: 52,
		totalPrize: 30,
		totalReturnPoint: 0,
		totalActivity: 0,
		totalBalance: -2240,
		totalTopup: 100020,
		totalWithdrawal: 30000,
		totalBonus: 30000
	},
];
const subTotalResult = [
	{
		key: 1,
		account: 'codest1234',
		totalBet: 52,
		totalPrize: 30,
		totalReturnPoint: 0,
		totalActivity: 0,
		totalBalance: -2240,
		totalTopup: 10000,
		totalWithdrawal: 10000,
		totalBonus: 10000,
	},
	{
		key: 2,
		account: 'codest134',
		totalBet: 52,
		totalPrize: 30,
		totalReturnPoint: 0,
		totalActivity: 0,
		totalBalance: -2240,
		totalTopup: 10000,
		totalWithdrawal: 10000,
		totalBonus: 10000,
	},
	{
		key: 3,
		account: 'codest1234',
		totalBet: 52,
		totalPrize: 30,
		totalReturnPoint: 0,
		totalActivity: 0,
		totalBalance: -2240,
		totalTopup: 10000,
		totalWithdrawal: 10000,
		totalBonus: 10000,
	},
];

const propTypes = {
	layoutConfigs: layoutConfigsPropTypes,
};

class UserReportMemberProfitPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowingSearchResult: false,
			isShowingSubordinateSearchResult: false,
			searchAccount: ""
		};

		this._handleOnSubmitSearch = this._handleOnSubmitSearch.bind(this);
		this._handleOnClickResetSearch = this._handleOnClickResetSearch.bind(this);
		this._renderSearchResult = this._renderSearchResult.bind(this);
		this._renderSubSearchResult  = this._renderSubSearchResult.bind(this);
	}

	_handleOnSubmitSearch(query) {
		// TODO add api to submit search and render result
		this.setState({
			isShowingSearchResult: true,
			isShowingSubordinateSearchResult: true,
			searchAccount: query.account
		});
	}
	_handleOnClickResetSearch() {
		this.setState({
			isShowingSearchResult: false,
			isShowingSubordinateSearchResult: false,
			searchAccount: ""
		});
	}
	_handleClickView(account) {
		// TODO add api to submit search and render result
		this.setState({
			searchAccount: account
		});
	}
	_renderSearchResult() {
		const searchResultColumns = [
			{
				title: '总投注',
				dataIndex: 'totalBet',
			}, {
				title: '总奖金',
				dataIndex: 'totalPrize',
			}, {
				title: '总返点',
				dataIndex: 'totalReturnPoint',
			}, {
				title: '总活动',
				dataIndex: 'totalActivity',
			}, {
				title: '总盈亏',
				dataIndex: 'totalBalance',
				render: (text) => {
					return (
						<span style={{ color:"rgba(255, 0, 0, 0.65)" }}>
							{text}
						</span>
					);
				}
			},{
				title: '总充值',
				dataIndex: 'totalTopup',
			},{
				title: '总提款',
				dataIndex: 'totalWithdrawal',
			},{
				title: '总紅利',
				dataIndex: 'totalBonus',
			}];
		const { searchAccount } = this.state;

		return (
			<React.Fragment>
				<PageBlock headerTitle={`团队整体汇总结果 : ${searchAccount}`}>
					<Table columns={searchResultColumns} dataSource={TeamTotalResult} pagination={false}/>
					<RemindText
						text={(
							<div>
								<div>* 团队总返点: 该用户的整个团队自身所获得的返点额总和.</div>
								<div>* 团队总活动: 该用户的整个团队所获得的一切活动总和.</div>
							</div>
						)}/>
				</PageBlock>
				<PageBlock headerTitle={`个人报表结果 : ${searchAccount}`}>
					<Table columns={searchResultColumns} dataSource={personResult} pagination={false}/>
					<RemindText text={"* 个人返点:个人投注返点加下级返点."}/>
				</PageBlock>
			</React.Fragment>
		);
	}
	_renderSubSearchResult() {
		const subSearchResultColumns = [
			{
				title: '帐号',
				dataIndex: 'account',
			}, {
				title: '总投注',
				dataIndex: 'totalBet',
			}, {
				title: '总奖金',
				dataIndex: 'totalPrize',
			}, {
				title: '总返点',
				dataIndex: 'totalReturnPoint',
			}, {
				title: '总活动',
				dataIndex: 'totalActivity',
			}, {
				title: '总盈亏',
				dataIndex: 'totalBalance',
				render: (text) => {
					return (
						<span style={{ color:"rgba(255, 0, 0, 0.65)" }}>
							{text}
						</span>
					);
				}
			},{
				title: '总充值',
				dataIndex: 'totalTopup',
			},{
				title: '总提款',
				dataIndex: 'totalWithdrawal',
			},{
				title: '总紅利',
				dataIndex: 'totalBonus',
			},{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record) => {
					return (
						<TextButton
							onClick={() => this._handleClickView(record.account)}
							text={"查看"}
						/>
					);
				}
			}];

		return (
			<PageBlock headerTitle={`直接下级(及各自团队)分列详细结果`}>
				<Table columns={subSearchResultColumns} dataSource={subTotalResult} pagination={false}/>
				<RemindText text={(
					<div>
						<div>* 总盈亏:总返点+总奖金+ 总优惠- 总投注</div>
						<div>* 注意：报表汇总结果中包含目标用户自身的数据。</div>
					</div>
				)}/>
			</PageBlock>
		);
	}

	render() {
		const { isShowingSearchResult, isShowingSubordinateSearchResult } = this.state;
		const { _renderSearchResult, _renderSubSearchResult } = this;
		const { layoutConfigs: { isFeatureActive, }, } = this.props;
		let searchResult = null;
		let subSearchResult = null;

		if (isShowingSearchResult) {
			searchResult = _renderSearchResult();
		}
		if (isShowingSubordinateSearchResult) {
			subSearchResult = _renderSubSearchResult();
		}
		if (!isFeatureActive) {
			return null;
		}

		return (
			<div className="user-report-profit">
				<PageBlock noMinHeight={true}>
					<SearchForm
						onClickSubmit={this._handleOnSubmitSearch}
						onClickReset={this._handleOnClickResetSearch}
					/>
				</PageBlock>
				{searchResult}
				{subSearchResult}
			</div>
		);
	}
}

UserReportMemberProfitPage.propTypes = propTypes;

export default compose(
	withFeatureToggle(FeatureCodeEnum.USERREPORT_MEMBER_PROFIT)
)(UserReportMemberProfitPage);
