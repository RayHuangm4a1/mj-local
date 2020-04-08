import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Switch, } from 'ljit-react-components';

const propTypes = {
	games: PropTypes.array,
	onToggleSwitch: PropTypes.func,
};
const defaultProps = {};

class GameTable extends Component {
	constructor() {
		super();

		this._handleClickSwitch = this._handleClickSwitch.bind(this);
	}

	_handleClickSwitch(record) {
		this.props.onToggleSwitch(record);
	}

	render () {
		const { games, } = this.props;

		return (
			<Table
				dataSource={games}
				columns={[
					{
						title: '名称',
						dataIndex: 'gameName',
						key: 'gameName',
					},
					{
						title: '类型',
						dataIndex: 'gameType',
						key: 'gameType',
					},
					{
						title: '代码',
						dataIndex: 'gameCode',
						key: 'gameCode',
					},
					{
						title: '顺位',
						dataIndex: 'gameOrder',
						key: 'gameOrder',
					},
					{
						title: '前台显示',
						dataIndex: '',
						key: '',
						render: (record) => {
							return (
								<Switch
									size="small"
									checked={record.isVisible}
									onChange={() => this._handleClickSwitch(record)}
								/>
							);
						},
					},
				]}
			/>
		);
	}
}

GameTable.propTypes = propTypes;
GameTable.defaultProps = defaultProps;

export default GameTable;
