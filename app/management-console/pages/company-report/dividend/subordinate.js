import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	HeaderButtonBar,
	Table,
	TextButton,
	UserBreadcrumb,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';

/**
 * TODO
 * distribute
 */

const { COMPANYREPORT_DIVIDEND, } = RouteKeyEnums;

const fakeData = [{
	id: 0,
	agent: 'codtest000',
	totalBetting: 10000,
	totalPlayer: 30,
	firstHalfProfit: 9302,
	totalProfit: 33241.2,
	totalDividend: 22341.2,
	percentage: 24,
	status: '不分紅',
},{
	id: 1,
	agent: 'codtest099',
	totalBetting: 100000,
	totalPlayer: 1,
	firstHalfProfit: 33332,
	totalProfit: 234.9,
	totalDividend: 234.9,
	percentage: 5646,
	status: '已分紅',
},{
	id: 2,
	agent: 'codtest089',
	totalBetting: 10000,
	totalPlayer: 1,
	firstHalfProfit: 3313,
	totalProfit: 324.8,
	totalDividend: 234.8,
	percentage: 546,
	status: '未分紅',
},];

const propTypes = {
	prevAncestors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
	ancestors: PropTypes.arrayOf(PropTypes.string),
	recordId: PropTypes.string,
	onNavigate: PropTypes.func.isRequired,
};
const defaultProps = {
	prevAncestors: [],
	ancestors: [],
};

class DividendSubordinatePage extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
			selectedRowKeys: [],
		};
		this._handleSubmitDistribute = this._handleSubmitDistribute.bind(this);
		this._handleSelectChange = this._handleSelectChange.bind(this);
		this._handleClickUser = this._handleClickUser.bind(this);
	}
	_handleSubmitDistribute() {
		//TODO distribute
	}
	_handleSelectChange(selectedRowKeys) {
		this.setState({ selectedRowKeys, });
	}
	_handleClickUser(agent) {
		const { prevAncestors, ancestors, recordId, onNavigate, } = this.props;
		const index = ancestors.indexOf(agent);
		const nextAncestors = ancestors.slice(0, index + 1);

		prevAncestors.push(ancestors);
		onNavigate(`${COMPANYREPORT_DIVIDEND}/${recordId}/${agent}`, {
			passProps: {
				prevAncestors,
				ancestors: nextAncestors,
			}
		});
	}

	render() {
		const { prevAncestors, ancestors, recordId, onNavigate, } = this.props;
		const { data, selectedRowKeys, } = this.state;
		const columns = [{
			title: '代理帐号',
			dataIndex: 'agent',
		},{
			title: '总投注量',
			dataIndex: 'totalBetting',
		},{
			title: '总投注人数',
			dataIndex: 'totalPlayer',
		},{
			title: '上半月盈亏',
			dataIndex: 'firstHalfProfit',
		},{
			title: '总盈亏',
			dataIndex: 'totalProfit',
		},{
			title: '总分红',
			dataIndex: 'totalDividend',
		},{
			title: '百分比',
			dataIndex: 'percentage',
		},{
			title: '状态',
			dataIndex: 'status',
		},{
			title: '操作',
			dataIndex: 'agent',
			key: 'operation',
			render: (agent) =>
				<TextButton
					text="查看下级"
					color={TextButton.TYPE_DEFAULT}
					onClick={() => {
						let nextAncestors = ancestors.slice();

						nextAncestors.push(agent);
						prevAncestors.push(ancestors);
						return onNavigate(
							`${COMPANYREPORT_DIVIDEND}/${recordId}/${agent}`, {
								passProps: {
									prevAncestors,
									ancestors: nextAncestors,
								}
							}
						);
					}}
				/>
		},];

		return (
			<Fragment>
				<Button
					className="back-button"
					outline={Button.OutlineEnums.HOLLOW}
					onClick={() => {
						if (!prevAncestors.length) {
							return onNavigate(`${COMPANYREPORT_DIVIDEND}/${recordId}/detail`);
						}
						const nextAncestors = prevAncestors.pop();
						const agent = nextAncestors.slice().pop();

						return onNavigate(
							`${COMPANYREPORT_DIVIDEND}/${recordId}/${agent}`, {
								passProps: {
									prevAncestors,
									ancestors: nextAncestors,
								}
							}
						);
					}}
				>
					回到上一页
				</Button>
				<PageBlock>
					<HeaderButtonBar
						className="header-bar"
						left={
							<UserBreadcrumb
								data={ancestors}
								onClickUser={this._handleClickUser}
							/>
						}
						right={
							<Button
								outline={Button.OutlineEnums.SOLID}
								onClick={() => this._handleSubmitDistribute}
								disabled={selectedRowKeys.length === 0}
							>
								发放分红
							</Button>
						}
					/>
					<Table
						rowKey="id"
						dataSource={data}
						columns={columns}
						rowSelection={{
							selectedRowKeys,
							onChange: this._handleSelectChange,
						}}
						hasPagination
					/>
				</PageBlock>
			</Fragment>
		);
	}

	componentDidMount() {
		//TODO fetch data
		this.setState({
			data: fakeData,
		});
	}
}

DividendSubordinatePage.propTypes = propTypes;
DividendSubordinatePage.defaultProps = defaultProps;

export default DividendSubordinatePage;
