import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, RemindText, } from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import './style.styl';

const propTypes = {
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	dataSource: PropTypes.arrayOf(PropTypes.object),
	onClickRecord: PropTypes.func,
	footer: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

const defaultProps = {
	title: '',
	footer: '',
};

const colorStr = 'rgba(255,0,0,0.65)';

class CompanyReportProfitMemberProfitLossTableBlockPage extends Component {
	constructor() {
		super();

		this._getColumns = this._getColumns.bind(this);
	}

	_getColumns() {
		const { onClickRecord, } = this.props;
		const columns = [{
			title: '总投注',
			dataIndex: 'bettingAmount',
			key: 'bettingAmount',
		},{
			title: '总奖金',
			dataIndex: 'prize',
			key: 'prize',
		},{
			title: '总返点',
			dataIndex: 'rebate',
			key: 'rebate',
		},{
			title: '总活动',
			dataIndex: 'activity',
			key: 'activity',
		},{
			title: '总盈亏',
			dataIndex: 'surplus',
			key: 'surplus',
			render: (surplus) => (<div style = {{ color: colorStr }}>{surplus}</div>)
		},{
			title: '总充值',
			dataIndex: 'recharge',
			key: 'recharge',
		},{
			title: '总提款',
			dataIndex: 'withdrawal',
			key: 'withdrawal',
		},{
			title: '总紅利',
			dataIndex: 'bonus',
			key: 'bonus',
		},];

		if (onClickRecord) {
			columns.unshift({
				title: '帐号',
				dataIndex: 'account',
				key: 'account',
			});
			columns.push({
				title: '操作',
				dataIndex: '',
				key: '',
				render: (record) => (
					<div>
						<span
							style={{ 'color': '#1890ff', 'cursor': 'pointer' }}
							onClick={() => onClickRecord(record)}
						>
							查看
						</span>
					</div>
				)
			});
		}

		return columns;
	}

	render () {
		const { title ,dataSource, footer } = this.props;

		return (
			<PageBlock
				noMinHeight
			>
				<PageBlock.Title text={title}/>
				<Table
					className="block-table"
					dataSource={dataSource}
					columns={this._getColumns()}
				/>
				<RemindText
					text={footer}
				/>
			</PageBlock>
		);
	}
}

CompanyReportProfitMemberProfitLossTableBlockPage.propTypes = propTypes;
CompanyReportProfitMemberProfitLossTableBlockPage.defaultProps = defaultProps;

export default CompanyReportProfitMemberProfitLossTableBlockPage;
