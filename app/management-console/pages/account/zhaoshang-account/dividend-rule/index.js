import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	HeaderButtonBar,
	Button,
	Table,
} from 'ljit-react-components';
import PageBlock from '../../../../components/page-block';
import { RouteKeyEnums, } from '../../../../routes';
import { connect } from 'ljit-store-connecter';
import { amountDivided10000, } from './utils';
import './style.styl';

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
	dividendSettings: PropTypes.arrayOf(PropTypes.shape({
		ratio: PropTypes.number,
		amount: PropTypes.number,
	}))
};

const { ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE_SETTING } = RouteKeyEnums;

class AccountZhaoShangAcconutDividendRulePage extends Component {
	constructor() {
		super();
	}

	render() {
		const { onNavigate, dividendSettings } = this.props;
		const dataLength = dividendSettings.length;

		return (
			<div className="zhaoshang-account-dividend-rule">
				<HeaderButtonBar
					left={
						<React.Fragment>
							<PageBlock.Title text="招商分红" />
							<Button
								outline={Button.OutlineEnums.HOLLOW}
								onClick={() => onNavigate(ACCOUNT_ZHAOSHANGACCOUNT_DIVIDEND_RULE_SETTING)}
							>
								修改
							</Button>
						</React.Fragment>
					}
				/>
				<Table
					rowKey="amount"
					columns={[
						{
							title: '序号',
							dataIndex: 'id',
							width: '30%',
							render: (value, record, index) => index + 1
						},
						{
							title: '周期总量（万）',
							dataIndex: 'amount',
							render: (value, record, index,) => {
								if (index === 0) {
									return `0-${value}`;
								} else if (index === dataLength - 1) {
									return `${dividendSettings[index - 1].amount} 以上`;
								} else {
									const prevRow = dividendSettings[index - 1];

									return `${prevRow.amount}-${record.amount}`;
								}
							}
						},{
							title: '分红比率（%)',
							width: '30%',
							dataIndex: 'ratio',
							render: (value) => `${value}%`
						},
					]}
					dataSource={dividendSettings}
				/>
			</div>

		);
	}
}

AccountZhaoShangAcconutDividendRulePage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		dividendSettings: amountDivided10000(state.platform.get('data').toObject().dividendSettings)
	};
}

export default connect(mapStateToProps)(AccountZhaoShangAcconutDividendRulePage);
