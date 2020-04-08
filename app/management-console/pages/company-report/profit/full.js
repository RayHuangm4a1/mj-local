import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import SearchForm from './search-form';
import MemberProfitLossTableBlock from './member-profit-loss-table-block';
import { Card, Statistic, Row, Col, Icon, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import './style.styl';

const { LARGE, } = Statistic.SizeTypeEnums;
const { PAYCIRCLE_FILL, CROWN_FILL, NOTIFICATION_FILL, FUND_FILL, GIFT_FILL, } = Icon.IconTypeEnums;

const propTypes = {
	onNavigate: PropTypes.func,
};
const defaultProps = {};

const iconStyle = { width: '16px', height: '16px' };

function getURL(userName) {
	return `/company-report/profit/${userName}/info`;
}

class CompanyReportProfitFullPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			current: tableData,
			sum: sum,
			isTableVisible: false,
			record: {},
		};

		this._handleSearch = this._handleSearch.bind(this);
		this._handleReset = this._handleReset.bind(this);
		this._renderStatistic = this._renderStatistic.bind(this);
		this._handleClickRecord = this._handleClickRecord.bind(this);
		this._renderSearchResult = this._renderSearchResult.bind(this);
	}

	_handleSearch(form) {
		form.validateFields((err, values) => {
			//TODO call api then update
		});

		this.setState({
			isTableVisible: true,
		});
	}

	_handleReset(form) {
		form.resetFields();
	}

	_renderStatistic() {
		const {
			bettingAmount, prize, rebate, activity, surplus, recharge, withdrawal, bonus
		} = this.state.sum;

		return (
			<div className="statistic-block">
				<Row gutter={12} className="statistic-row">
					<Col span={6}>
						<Card>
							<Statistic
								title="总投注"
								value={bettingAmount}
								prefix={
									<div className="icon-container">
										<Icon type={GIFT_FILL} color={Icon.ColorEnums.PRIMARY} style={iconStyle}/>
									</div>
								}
								sizeType={LARGE}
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card>
							<Statistic
								title="总奖金"
								value={prize}
								prefix={
									<div className="icon-container">
										<Icon type={PAYCIRCLE_FILL} color={Icon.ColorEnums.PRIMARY} style={iconStyle}/>
									</div>
								}
								sizeType={LARGE}
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card>
							<Statistic
								title="总返点"
								value={rebate}
								prefix={
									<div className="icon-container">
										<Icon type={CROWN_FILL} color={Icon.ColorEnums.PRIMARY} style={iconStyle}/>
									</div>
								}
								sizeType={LARGE}
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card>
							<Statistic
								title="总活动"
								value={activity}
								prefix={
									<div className="icon-container">
										<Icon type={NOTIFICATION_FILL} color={Icon.ColorEnums.PRIMARY} style={iconStyle}/>
									</div>
								}
								sizeType={LARGE}
							/>
						</Card>
					</Col>
				</Row>
				<Row gutter={12} className="statistic-row">
					<Col span={6} className="red-value-text">
						<Card>
							<Statistic
								title="总盈亏"
								value={surplus}
								prefix={
									<div className="icon-container">
										<Icon type={FUND_FILL} color={Icon.ColorEnums.PRIMARY} style={iconStyle}/>
									</div>
								}
								sizeType={LARGE}
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card>
							<Statistic
								title="总充值"
								value={recharge}
								prefix={
									<div className="icon-container">
										<Icon type={PAYCIRCLE_FILL} color={Icon.ColorEnums.PRIMARY} style={iconStyle}/>
									</div>
								}
								sizeType={LARGE}
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card>
							<Statistic
								title="总提款"
								value={withdrawal}
								prefix={
									<div className="icon-container">
										<Icon type={PAYCIRCLE_FILL} color={Icon.ColorEnums.PRIMARY} style={iconStyle}/>
									</div>
								}
								sizeType={LARGE}
							/>
						</Card>
					</Col>
					<Col span={6}>
						<Card>
							<Statistic
								title="总紅利"
								value={bonus}
								prefix={
									<div className="icon-container">
										<Icon type={GIFT_FILL} color={Icon.ColorEnums.PRIMARY} style={iconStyle}/>
									</div>
								}
								sizeType={LARGE}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}

	_handleClickRecord(record) {
		return this.props.onNavigate(getURL(record.account));
	}

	_renderSearchResult() {
		const { isTableVisible, current } = this.state;

		if (isTableVisible) {
			return (
				<Fragment>
					{this._renderStatistic()}
					<MemberProfitLossTableBlock
						title="所有会员汇总结果"
						dataSource={current}
						onClickRecord={this._handleClickRecord}
					/>
				</Fragment>
			);
		} else {
			return null;
		}
	}

	render() {
		return (
			<div>
				<PageBlock
					noMinHeight
				>
					<SearchForm
						onSearch={this._handleSearch}
						onReset={this._handleReset}
					></SearchForm>
				</PageBlock>
				{this._renderSearchResult()}
			</div>
		);
	}
}

CompanyReportProfitFullPage.propTypes = propTypes;
CompanyReportProfitFullPage.defaultProps = defaultProps;

export default CompanyReportProfitFullPage;

const tableData = [{
	key: 1,
	account: 'codest1234',
	bettingAmount: 52,
	prize: 30,
	rebate: 0,
	activity: 0,
	surplus: -22,
	recharge: 10000,
	withdrawal: 10000,
	bonus: 10000,
},{
	key: 2,
	account: 'codest134',
	bettingAmount: 52,
	prize: 30,
	rebate: 0,
	activity: 0,
	surplus: -2,
	recharge: 10000,
	withdrawal: 10000,
	bonus: 10000,
},{
	key: 3,
	account: 'codest111',
	bettingAmount: 52,
	prize: 30,
	rebate: 0,
	activity: 0,
	surplus: -1244,
	recharge: 10000,
	withdrawal: 10000,
	bonus: 10000,
}];

const sum = {
	bettingAmount: 18195982.24,
	prize: 16645641.103,
	rebate: 1131649.75,
	activity: 2496,
	surplus: -416195.387,
	recharge: 14803502,
	withdrawal: 199606,
	bonus: 0,
};
