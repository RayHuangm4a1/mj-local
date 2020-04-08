import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Table,
	TextButton,
} from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';

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
},{
	id: 1,
	agent: 'codtest099',
	totalBetting: 100000,
	totalPlayer: 1,
	firstHalfProfit: 33332,
	totalProfit: 234.9,
	totalDividend: 234.9,
	percentage: 5646,
},{
	id: 2,
	agent: 'codtest089',
	totalBetting: 10000,
	totalPlayer: 1,
	firstHalfProfit: 3313,
	totalProfit: 324.8,
	totalDividend: 234.8,
	percentage: 546,
},];

const propTypes = {
	recordId: PropTypes.string,
	onNavigate: PropTypes.func.isRequired,
};
const defaultProps = {};

class DividendDetailPage extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
		};
	}

	render() {
		const { recordId, onNavigate, } = this.props;
		const { data, } = this.state;
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
			title: '操作',
			dataIndex: '',
			key: 'operation',
			render: (record) =>
				<TextButton
					text="查看下级"
					color={TextButton.TYPE_DEFAULT}
					onClick={() => {
						const ancestors = [record.agent];

						return onNavigate(`${COMPANYREPORT_DIVIDEND}/${recordId}/${record.agent}`, {
							passProps: {
								prevAncestors: [],
								ancestors,
							},
						});
					}}
				/>
		},];

		return (
			<Fragment>
				<Button
					className="back-button"
					outline={Button.OutlineEnums.HOLLOW}
					onClick={() => onNavigate(`${COMPANYREPORT_DIVIDEND}/info`)}
				>
					回到上一页
				</Button>
				<PageBlock>
					<Table
						rowKey="id"
						dataSource={data}
						columns={columns}
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

DividendDetailPage.propTypes = propTypes;
DividendDetailPage.defaultProps = defaultProps;

export default DividendDetailPage;
