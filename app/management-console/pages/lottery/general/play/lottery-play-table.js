import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Table, CheckBox, } from 'ljit-react-components';
import { Cells, } from 'management-console/components/table';
import { formatDate, convertDateStringToTimestamp, } from '../../../../lib/moment-utils';
import { playsPropType, } from './utils';

const { StatusCell, } = Cells;
const propTypes = {
	isLoading: PropTypes.bool,
	data: playsPropType,
	isEditing: PropTypes.bool,
	onClickTitleCheckBox: PropTypes.func,
	onClickContentCheckBox: PropTypes.func,
	selectedTableRows: PropTypes.array,
};
const defaultProps = {
	isEditing: false,
	onClickTitleCheckBox: () => {},
	onClickContentCheckBox: () => {},
	selectedTableRows: [],
};

class LotteryPlayTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			idEditing: false,
			isShowPopup: false,
		};

		this._renderTitleCheckBox = this._renderTitleCheckBox.bind(this);
		this._renderRowSelection = this._renderRowSelection.bind(this);
	}
	_renderTitleCheckBox() {
		const { onClickTitleCheckBox, selectedTableRows, data, } = this.props;
		const numberOfData = data.length;
		const numberOfSelected = selectedTableRows.length;
		const isSelectedAll = (numberOfSelected === numberOfData);

		return (
			<Fragment>
				<div className="table-checkbox-title">是否上线</div>
				<CheckBox
					value={isSelectedAll}
					onChange={onClickTitleCheckBox}
				/>
			</Fragment>
		);
	}
	_renderRowSelection() {
		const { isEditing, selectedTableRows, onClickContentCheckBox, } = this.props;
		const { _renderTitleCheckBox, } = this;

		if (isEditing) {
			return {
				columnTitle: _renderTitleCheckBox(),
				selectedRowKeys: selectedTableRows,
				onChange: onClickContentCheckBox,
			};
		}
		return null;
	}

	render () {
		const {
			isLoading,
			data,
		} = this.props;
		const {
			_renderRowSelection,
		} = this;
		const rowSelection = _renderRowSelection();

		return (
			<Table
				rowKey="id"
				isLoading={isLoading}
				columns={[{
					title: '玩法',
					dataIndex: '',
					key: 'play',
					render: (play) => {
						const playCondition = play.playCondition || {};
						const playConditionName = playCondition.name || '';
						const playName = play.name || '';

						return <div>{playConditionName + playName}</div>;
					},
				},{
					title: '分類',
					dataIndex: 'playCondition.name',
				},{
					title: '子分類',
					dataIndex: 'playSubcondition.name',
				},{
					title: '狀態',
					dataIndex: 'status',
					render: (status) => (
						<StatusCell.System
							data={status}
						/>
					),
				},{
					title: '更新時間',
					dataIndex: 'updatedAt',
					sorter: (a, b) => a.updatedAt - b.updatedAt,
					sortDirections: ['descend', 'ascend',],
					render: (record) => <div>{formatDate(record)}</div>,
				},]}
				dataSource={data}
				rowSelection={rowSelection}
				sorters={[
					{
						dataIndex: 'updatedAt',
						sorter: (prev, next) => convertDateStringToTimestamp(prev.updatedAt) - convertDateStringToTimestamp(next.updatedAt),
						sortDirections: ['descend', 'ascend'],
					},
				]}
			/>
		);
	}
}

LotteryPlayTable.propTypes = propTypes;
LotteryPlayTable.defaultProps = defaultProps;

export default LotteryPlayTable;
