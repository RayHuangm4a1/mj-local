import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Button, DecimalNumber, } from 'ljit-react-components';
import PageBlock from '../../../components/page-block';
import { RouteKeyEnums, } from '../../../routes';
import { GameClassEnums, TableTypeEnums, GameClassMap, } from './utils';

const { Title, } = PageBlock;
const { EXTERNALGAME_RULES, } = RouteKeyEnums;

const propTypes = {
	onNavigate: PropTypes.func.isRequired,
};

const { REBATE, SALARY, DIVIDEND, } = TableTypeEnums;

const { LIVE, CHESS, FISH, ELECTRIC, SPORT, } = GameClassEnums;

const fakeData = [{
	key: 0,
	gameClass: LIVE,
	highestRebate: 1.5,
	highestSalary: 1.5,
	highestDividend: 5,
},{
	key: 1,
	gameClass: CHESS,
	highestRebate: 1,
	highestSalary: 1,
	highestDividend: 5,
},{
	key: 2,
	gameClass: FISH,
	highestRebate: 1.5,
	highestSalary: 1.5,
	highestDividend: 10,
},{
	key: 3,
	gameClass: ELECTRIC,
	highestRebate: 1,
	highestSalary: 1,
	highestDividend: 12,
},{
	key: 4,
	gameClass: SPORT,
	highestRebate: 0.5,
	highestSalary: 0.5,
	highestDividend: 15,
},];

const defaultProps = {};

class GameExternalRulesInfoPage extends Component {
	constructor() {
		super();
		this.state = {
			data: [],
		};
		this._renderEditButton = this._renderEditButton.bind(this);
	}
	_renderEditButton(editType) {
		const { onNavigate, } = this.props;
		const { data, } = this.state;

		return <Button
			className="table-title-bar__button"
			outline={Button.OutlineEnums.HOLLOW}
			onClick={() => onNavigate(
				`${EXTERNALGAME_RULES}/${editType}`,
				{
					passProps: {
						initialValues: data,
					},
				},
			)}
		>
			修改
		</Button>;
	}

	render() {
		const { data, } = this.state;
		const { _renderEditButton, } = this;

		return (
			<PageBlock>
				<div className="table-title-bar">
					<Title text="外接游戏最高返点"/>
					{_renderEditButton(REBATE)}
				</div>
				<Table
					className="info-table"
					dataSource={data}
					columns={[{
						title: '分类',
						dataIndex: 'gameClass',
						key: 'gameClass',
						render: (gameClass) => <div>{GameClassMap[gameClass]}</div>,
					},{
						title: '最高返点',
						dataIndex: 'highestRebate',
						key: 'highestRebate',
						render: (highestRebate) => <DecimalNumber data={highestRebate} isPercent/>,
					}]}
				/>
				<div className="table-title-bar">
					<Title text="外接游戏最高工资"/>
					{_renderEditButton(SALARY)}
				</div>
				<Table
					className="info-table"
					dataSource={data}
					columns={[{
						title: '分类',
						dataIndex: 'gameClass',
						key: 'gameClass',
						render: (gameClass) => <div>{GameClassMap[gameClass]}</div>,
					},{
						title: '最高工资',
						dataIndex: 'highestSalary',
						key: 'highestSalary',
						render: (highestSalary) => <DecimalNumber data={highestSalary} isPercent/>,
					}]}
				/>
				<div className="table-title-bar">
					<Title text="外接游戏最高分红"/>
					{_renderEditButton(DIVIDEND)}
				</div>
				<Table
					className="info-table"
					dataSource={data}
					columns={[{
						title: '分类',
						dataIndex: 'gameClass',
						key: 'gameClass',
						render: (gameClass) => <div>{GameClassMap[gameClass]}</div>,
					},{
						title: '最高分红',
						dataIndex: 'highestDividend',
						key: 'highestDividend',
						render: (highestDividend) => <DecimalNumber data={highestDividend} isPercent/>,
					}]}
				/>
			</PageBlock>
		);
	}

	componentDidMount() {
		//TODO fetch data from API
		this.setState({
			data: fakeData,
		});
	}
}

GameExternalRulesInfoPage.propTypes = propTypes;
GameExternalRulesInfoPage.defaultProps = defaultProps;

export default GameExternalRulesInfoPage;
