import React, { Component } from 'react';
import { convertDateStringToTimestamp, } from '../../../../lib/moment-utils';
import cx from 'classnames';
import PropTypes from 'prop-types';
import {
	Table,
	TextButton,
} from 'ljit-react-components';
import get from 'lodash/get';
import { formatDate, } from '../../../../lib/moment-utils';
import { getPKCount, } from './utils';
import { getBonusPercent, } from '../utils';
import EditModal from './edit-modal';

const propTypes = {
	isLoading: PropTypes.bool,
	data: PropTypes.arrayOf(PropTypes.shape({
		play: PropTypes.string,
		lottery: PropTypes.shape({
			id: PropTypes.number,
			name: PropTypes.string,
		}),
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
		isFixedOdds: PropTypes.bool,
		award: PropTypes.shape({
			name: PropTypes.string,
		}),
	})),
	onEditPKCount: PropTypes.func,
	platformBonus: PropTypes.number.isRequired,
};
const defaultProps = {
	onEditPKCount: () => {},
};

class LotteryTable extends Component {
	constructor() {
		super();
		this.state = {
			isEditPKCountsModalVisible: false,
			index: null,
			selectedPlayPKCount: 0,
		};
		this._handleEditPkCount = this._handleEditPkCount.bind(this);
		this._handleClosePkCountModal = this._handleClosePkCountModal.bind(this);
		this._handleSubmitPkCount = this._handleSubmitPkCount.bind(this);
		this._renderPercentItem = this._renderPercentItem.bind(this);
		this._renderBonus = this._renderBonus.bind(this);
	}

	_handleEditPkCount(index, count) {
		const hasCount = !!count;

		this.setState({ 
			isEditPKCountsModalVisible: true,
			selectedPlayPKCount: hasCount ? count : 0,
			index,
		});
	}

	_handleClosePkCountModal() {
		this.setState({ isEditPKCountsModalVisible: false, });
	}

	_handleSubmitPkCount(count) {
		const {
			_handleClosePkCountModal,
		} = this;
		const {
			data,
			onEditPKCount
		} = this.props;
		const {
			index
		} = this.state;
		const updatedPlays = [];
		const selectedPlay = data[index];
		const isPKEnabled = count > 0;

		updatedPlays.push(Object.assign({}, {
			id: selectedPlay.id,
			award: selectedPlay.award.name,
			count,
			isPKEnabled,
		}));

		_handleClosePkCountModal();
		onEditPKCount(updatedPlays);
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

	_renderPercentItem(platformBonus, bonus) {
		const bonusPercent = getBonusPercent(bonus, platformBonus);

		let prefix = bonusPercent > 0 ? '+' : '';

		return (
			<span
				className={cx(
					'prize-number-percent',
					{
						[`prize-number-percent--nagetive`]: bonusPercent < 0,
						[`prize-number-percent--positive`]: bonusPercent > 0,
					}
				)}
			>
				({prefix}{bonusPercent}%)
			</span>
		);
	}

	render() {
		const {
			isLoading,
			data,
		} = this.props;
		const {
			_renderBonus,
			_handleEditPkCount,
			_handleClosePkCountModal,
			_handleSubmitPkCount,
		} = this;
		const {
			isEditPKCountsModalVisible,
			selectedPlayPKCount
		} = this.state;

		return (
			<React.Fragment>
				<Table
					rowKey={(record,index) => index}
					isLoading={isLoading}
					columns={[{
						title: '玩法',
						key: 'play',
						width: 160,
						render: (play) => {
							const playCondition = play.playCondition || {};
							const playConditionName = playCondition.name || '';
							const playName = play.name || '';

							return <div>{playConditionName + playName}</div>;
						},
					},{
						title: '分类',
						dataIndex: 'playCondition.name',
					},{
						title: '奖项',
						dataIndex: 'award.name',
					},{
						title: '单挑注数',
						render: record => getPKCount(record)
					},{
						title: '奖金号',
						dataIndex: 'bonus',
						render: _renderBonus,
					},{
						title: '更新时间',
						dataIndex: 'updatedAt',
						sorter: (a, b) => convertDateStringToTimestamp(a.updatedAt) - convertDateStringToTimestamp(b.updatedAt),
						render: (record) => <div>{formatDate(record)}</div>,
					},{
						title: '操作',
						key: 'operation',
						render: (data, record, index) => {
							const isShowPK = get(data, ['pk', 'isSupported']);

							if (isShowPK) {
								return (
									<TextButton
										onClick={() => _handleEditPkCount(index, getPKCount(record))}
										text={<span>单挑注数修改</span>}
									/>
								);
							}
							return null;
						}
					}]}
					dataSource={data}
				/>
				<EditModal
					onCloseModal={_handleClosePkCountModal}
					onClickOk={_handleSubmitPkCount}
					isVisible={isEditPKCountsModalVisible}
					input={selectedPlayPKCount}
					title={"修改"}
					label={"注数"}
					onChange={selectedPlayPKCount => this.setState({ selectedPlayPKCount, })}
				/>
			</React.Fragment>
		);
	}
}

LotteryTable.propTypes = propTypes;
LotteryTable.defaultProps = defaultProps;

export default LotteryTable;
