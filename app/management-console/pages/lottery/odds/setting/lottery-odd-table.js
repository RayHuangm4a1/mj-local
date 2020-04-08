import React, { Component, } from 'react';
import { convertDateStringToTimestamp, } from '../../../../lib/moment-utils';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
	Table,
	InputNumber,
	CheckBox,
	TextButton,
} from 'ljit-react-components';
import { formatDate, } from '../../../../lib/moment-utils';
import { getPKCounts, } from './utils';
/**
 * TODO Update table UI
 */

const propTypes = {
	isLoading: PropTypes.bool,
	isEditing: PropTypes.bool,
	playsData: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.string,
		playCondition: PropTypes.shape({
			name: PropTypes.string,
		}),
		subCondition: PropTypes.shape({
			name: PropTypes.string,
		}),
		status: PropTypes.string,
		updatedAt: PropTypes.string,
		id: PropTypes.number.isRequired,
		awards: PropTypes.object,
	})),
	onChangeInputNumber: PropTypes.func,
	onClickContentCheckBox: PropTypes.func,
	onClickTitleCheckBox: PropTypes.func,
	onClickEditPKCounts: PropTypes.func,
	selectedTableRows: PropTypes.array,
	// Fix platform bonus props source
	platformBonus: PropTypes.number.isRequired,
};
const defaultProps = {
	isEditing: false,
	onChangeInputNumber: () => {},
	onClickContentCheckBox: () => {},
	onClickTitleCheckBox: () => {},
	onClickEditPKCounts: () => {},
	selectedTableRows: [],
};

class LotteryOddTable extends Component {
	constructor() {
		super();

		this._handleEditPkCount = this._handleEditPkCount.bind(this);
		this._renderColumns = this._renderColumns.bind(this);
		this._renderPercentItem = this._renderPercentItem.bind(this);
		this._renderEditingBonus = this._renderEditingBonus.bind(this);
		this._renderBonus = this._renderBonus.bind(this);
		this._renderUpdatedAtColumn = this._renderUpdatedAtColumn.bind(this);
		this._renderTitleCheckBox = this._renderTitleCheckBox.bind(this);
		this._renderSelectionColumn = this._renderSelectionColumn.bind(this);
	}
	_handleEditPkCount(playId) {
		const {
			onClickEditPKCounts
		} = this.props;

		onClickEditPKCounts(playId);
	}
	_renderColumns() {
		let _columns = [];
		const {
			isEditing,
		} = this.props;
		const {
			_renderUpdatedAtColumn,
			_renderSelectionColumn,
			_renderEditingBonus,
			_renderBonus,
			_handleEditPkCount,
		} = this;

		const columnsMap = {
			['玩法']: {
				title: '玩法',
				dataIndex: '',
				key: 'play',
				width: 160,
				render: (play) => {
					const playCondition = play.playCondition || {};
					const playConditionName = playCondition.name || '';
					const playName = play.name || '';

					return <div>{playConditionName + playName}</div>;
				},
			},
			['分类']: {
				title: '分类',
				dataIndex: 'playCondition.name',
			},
			['奖项']: {
				title: '奖项',
				dataIndex: 'awards',
				render: (awards) => {
					if (awards.hasOwnProperty('中奖')) {
						return '中奖';
					}
					// TODO 一等獎 二等獎 三等獎 等多個獎項會各自獨立一筆 row data 顯示
				},
			},
			['单挑注数']: {
				title: '单挑注数',
				key: 'pkCount',
				render: record => getPKCounts(record)
			},
			['奖金号']: {
				title: '奖金号',
				dataIndex: 'bonus',
				// TODO get real platform bonus from api
				render: isEditing ? _renderEditingBonus : _renderBonus,
			},
			['操作']: {
				title: '操作',
				dataIndex: '',
				key: 'operation',
				render: (record) => (
					<TextButton
						onClick={() => _handleEditPkCount(record.id)}
						text={<span>单挑注数修改</span>}
					/>
				)
			},
			['更新时间']: _renderUpdatedAtColumn(),
			['批量修改']: _renderSelectionColumn(),
		};

		if (isEditing) {
			_columns = [
				columnsMap['玩法'],
				columnsMap['分类'],
				columnsMap['奖项'],
				columnsMap['奖金号'],
				columnsMap['批量修改'],
			];
		} else {
			_columns = [
				columnsMap['玩法'],
				columnsMap['分类'],
				columnsMap['奖项'],
				columnsMap['单挑注数'],
				columnsMap['奖金号'],
				columnsMap['更新时间'],
				columnsMap['操作'],
			];
		}

		return _columns;
	}
	_renderPercentItem(platformBonus, bonus) {
		const { isEditing, } = this.props;
		const bonusPercent = (bonus - platformBonus) / 20;

		return (
			<span
				className={cx(
					'prize-number-percent',
					{
						['prize-number-percent--editing']: isEditing,
						[`prize-number-percent--nagetive`]: bonusPercent < 0,
						[`prize-number-percent--positive`]: bonusPercent > 0,
					}
				)}
			>
				({Math.round(bonusPercent)}%)
			</span>
		);
	}
	_renderEditingBonus(bonus = null, record = {}) {
		const { _renderPercentItem, } = this;
		const { onChangeInputNumber, platformBonus, } = this.props;

		let percentItem;

		if (bonus) {
			percentItem = _renderPercentItem(platformBonus, bonus);
		} else {
			percentItem = null;
		}

		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<div style={{ position: 'relative', }}>
					<InputNumber
						value={isNaN(bonus) ? '' : bonus}
						style={{ width: 120, }}
						onChange={(number) => onChangeInputNumber(number, record, 'bonus')}
					/>
					{percentItem}
				</div>
			</div>
		);
	}
	_renderBonus(bonus) {
		const { platformBonus, } = this.props;
		const { _renderPercentItem, } = this;
		const percentItem = bonus ? _renderPercentItem(platformBonus, bonus) : null;

		if (bonus) {
			return (
				<div>
					{Math.round(bonus)}
					{percentItem}
				</div>
			);
		} else {
			return '未修正';
		}
	}
	_renderUpdatedAtColumn() {
		return {
			title: '更新时间',
			dataIndex: 'updatedAt',
			sorter: (a, b) => convertDateStringToTimestamp(a.updatedAt) - convertDateStringToTimestamp(b.updatedAt),
			render: (record) => <div>{formatDate(record)}</div>,
		};
	}
	_renderTitleCheckBox() {
		const { onClickTitleCheckBox, selectedTableRows, playsData, } = this.props;
		const numberOfData = playsData.length;
		const numberOfSelected = selectedTableRows.length;
		const isSelectedAll = (numberOfSelected === numberOfData);

		return (
			<React.Fragment>
				<CheckBox
					value={isSelectedAll}
					onChange={onClickTitleCheckBox}
				/>
			</React.Fragment>
		);
	}
	_renderSelectionColumn() {
		const { _renderTitleCheckBox, } = this;
		const { onClickContentCheckBox, selectedTableRows, } = this.props;

		return {
			title: _renderTitleCheckBox,
			dataIndex: 'isRowSelected',
			render: (value, record) => {
				const isSelected = selectedTableRows.indexOf(record.id) !== -1;

				return (
					<CheckBox
						value={isSelected}
						onChange={() => onClickContentCheckBox(record.id)}
					/>
				);
			}
		};
	}

	render() {
		const {
			isEditing,
			isLoading,
			playsData,
		} = this.props;
		const {
			_renderColumns,
		} = this;

		return (
			<Table
				rowKey="_id"
				isLoading={isLoading}
				className={cx('lottery-odds-table', { ['td-small-padding']: isEditing, })}
				columns={_renderColumns()}
				dataSource={playsData}
				size={Table.TableSizeEnums.LARGE}
			/>
		);
	}
}

LotteryOddTable.propTypes = propTypes;
LotteryOddTable.defaultProps = defaultProps;

export default LotteryOddTable;
