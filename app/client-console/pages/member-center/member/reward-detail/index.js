import React, { Component } from 'react';
import { Table, DecimalNumber, } from 'ljit-react-components';
import CardInkbarTabs from '../../../../components/card-inkbar-tabs';
import PropTypes from 'prop-types';
import { connect } from 'ljit-store-connecter';
import './style.styl';

const { TabPane } = CardInkbarTabs;
const prefixClass = 'member-reward-detail';

const propTypes = {
	lotteryClassesData: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.string,
		name: PropTypes.string,
		id: PropTypes.number,
	})).isRequired,
	// TODO add data proptype
};

class MemberRewardDetailPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabKey: props.lotteryClassesData[0].code,
		};

		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._renderTabPanes = this._renderTabPanes.bind(this);
	}

	_handleChangeTab(tabKey) {
		this.setState({ tabKey, });
	}
	_renderTabPanes() {
		const { lotteryClassesData, } = this.props;

		const TabPanes = lotteryClassesData.map(lotteryClass => {
			const { name, code, } = lotteryClass;

			return (
				<TabPane
					tab={name}
					key={code}
				>
					<Table
						rowKey='id'
						// TODO remove fake data
						dataSource={fakedata}
						isBordered
						columns={[
							{
								title: '玩法組',
								dataIndex: 'title',
							},
							{
								// TODO check data schema after api is ok
								title: '奖项',
								render: (record) => {
									const { content } = record;
									const classes = content.map((data, index) => {
										return (
											<div
												key={`${data.name}-${record.id}`}
												className={`${prefixClass}__table-item`}
											>
												{data.name}
											</div>
										);
									});

									return (
										<div className={`${prefixClass}__table-item-wrapper`}>
											{classes}
										</div>
									);
								}
							},
							{
								// TODO check data schema after api is ok
								title: '奖金',
								render: (record) => {
									const { content } = record;
									const rewards = content.map((data, index) => {
										return (
											<div
												key={`${data.name}-${record.id}`}
												className={`${prefixClass}__table-item`}
											>
												<DecimalNumber
													data={data.bonus}
													decimalPlaces={2}
													hasSeparator
												/>
											</div>
										);
									});

									return (
										<div className={`${prefixClass}__table-item-wrapper`}>
											{rewards}
										</div>
									);
								}
							}
						]}
					/>
				</TabPane>
			);
		});

		return TabPanes;
	}

	render() {
		const { tabKey, } = this.state;
		const { _handleChangeTab, _renderTabPanes, } = this;

		return (
			<div className={prefixClass}>
				<CardInkbarTabs
					activeKey={tabKey}
					onChange={_handleChangeTab}
				>
					{_renderTabPanes()}
				</CardInkbarTabs>
			</div>
		);
	}
}

MemberRewardDetailPage.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		lotteryClassesData: state.lotteryClasses.get('data').toArray()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		// TODO add fetch data action
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(MemberRewardDetailPage);

const fakedata = [
	{
		id: 0,
		title: '三码',
		content: [
			{ name: '前三直选', bonus: 1300.82, },
			{ name: '前三組选', bonus: 1222.82, },
		],
	},
	{
		id: 1,
		title: '二码',
		content: [
			{ name: '前二直选', bonus: 1030.22, },
			{ name: '前二組选', bonus: 23213.22, },
		],
	},
	{
		id: 2,
		content: [
			{ name: '前三不定位', bonus: 1232.33, },
		],
	},
	{
		id: 3,
		content: [
			{ name: '前三定位胆', bonus: 1122.22, },
		],
	},
	{
		id: 4,
		title: '趣味型定单双',
		content: [
			{ name: '5单0双', bonus: 1922.22, },
			{ name: '4单1双', bonus: 23213.22, },
			{ name: '3单2双', bonus: 53213.22, },
			{ name: '2单3双', bonus: 63213.22, },
			{ name: '1单4双', bonus: 43213.22, },
			{ name: '0单5双', bonus: 13313.22, },
		],
	}
];
