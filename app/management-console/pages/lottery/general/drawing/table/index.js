import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import {
	Table,
	StatusTag,
	TextButton,
} from 'ljit-react-components';
import { DrawingStatusEnums, } from '../../../../../lib/enums';
import {
	isDateValid,
	formatDate,
	convertDateStringToTimestamp,
} from '../../../../../lib/moment-utils';
import { getOpencodeColumns, } from '../utils';

const {
	DRAW_NEW,
	DRAW_OPENING,
	DRAW_REWARDING,
	DRAW_REWARDED,
	DRAW_CANCELED,
	DRAW_MODIFIED,
	DRAW_STOPPED,
	DRAW_CANCELING,
} = StatusTag.StatusEnums;

const {
	REWARD_GRANTING,
	REWARD_GRANTED,
	TEAM_COMMISSION_GRANTED,
	CANCELED,
	MODIFIED,
	DUPLICATED,
	EARLY_OPENED,
	OPENING,
	STOPPED,
	NOT_OPENING,
	CANCELING,
} = DrawingStatusEnums;

const DrawingStatusToStatusTagMap = {
	[REWARD_GRANTING]: { statusTag: DRAW_REWARDING, text: '派奖中', },
	[REWARD_GRANTED]: { statusTag: DRAW_REWARDING, text: '派奖中', },
	[TEAM_COMMISSION_GRANTED]: { statusTag: DRAW_REWARDED, text: '已派奖' },
	[CANCELED]: { statusTag: DRAW_CANCELED, text: '已撤单', },
	[MODIFIED]: { statusTag: DRAW_MODIFIED, text: '已修改奖号', },
	[OPENING]: { statusTag: DRAW_OPENING, text: '开盘中', },
	[STOPPED]: { statusTag: DRAW_STOPPED, text: '停止下注与开奖', },
	[NOT_OPENING]: { statusTag: DRAW_NEW, text: '开奖中', },
	[CANCELING]: { statusTag: DRAW_CANCELING, text: '撤单中', },
};

const StopButtonStatusMap = {
	[EARLY_OPENED]: true,
	[OPENING]: true,
	[NOT_OPENING]: true,
};
const ModifyButtonStatusMap = {
	[REWARD_GRANTED]: true,
	[TEAM_COMMISSION_GRANTED]: true,
	[CANCELED]: true,
	[MODIFIED]: true,
	[DUPLICATED]: true,
	[STOPPED]: true,
	[CANCELING]: true,
};

const propTypes = {
	positions: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	})).isRequired,
	drawings: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.number,
		openedAt: PropTypes.string,
		issue: PropTypes.number,
		betAmount: PropTypes.number,
		memberAmount: PropTypes.number,
		companyAmount: PropTypes.number,
		status: PropTypes.number,
		opencode: PropTypes.string,
	})),
	isLoading: PropTypes.bool,
	onClickStop: PropTypes.func,
	onClickModify: PropTypes.func,
	onClickRecords: PropTypes.func,
	onClickLoadMore: PropTypes.func,
};
const defaultProps = {
	onClickStop: () => {},
	onClickModify: () => {},
	onClickRecords: () => {},
	onClickLoadMore: () => {},
};

const PREFIX_CLASS = 'lottery-drawing-table';

class LotteryDrawingTable extends Component {
	render() {
		const {
			isLoading,
			drawings,
			positions,
			onClickStop,
			onClickModify,
			onClickRecords,
			onClickLoadMore,
		} = this.props;

		return (
			<Fragment>
				<Table
					className={PREFIX_CLASS}
					isLoading={isLoading}
					isBordered
					dataSource={drawings}
					rowKey="issue"
					fixedLeftColumnIndices={[0,1]}
					fixedRightColumnIndices={[3,4,5]}
					scroll={{ x: 1500 }}
					columns={[
						{
							title: '开奖时间',
							dataIndex: 'openedAt',
							key: 'openedAt',
							width: 100,
							// TODO sort by call api
							sorter: (a, b) => convertDateStringToTimestamp(b.openedAt) - convertDateStringToTimestamp(a.openedAt),
							render: (openedAt) => (
								<div className={`${PREFIX_CLASS}__opened-at-column`}>
									{isDateValid(openedAt) ? formatDate(openedAt) : '-'}
								</div>
							),
						},
						{
							title: '期号',
							dataIndex: 'issue',
							key: 'issue',
							width: 140,
						},
						{
							title: '开奖球号',
							children: getOpencodeColumns(positions),
						},
						{
							title: '合計',
							children: [
								{
									title: '下注金额',
									dataIndex: 'income',
									key: 'income',
									width: 80,
									render: (income) => <div className={`${PREFIX_CLASS}__sum-column`}>{income || '-'}</div>,
								},
								{
									title: '会员结果',
									dataIndex: 'expense',
									key: 'expense',
									width: 80,
									render: (expense) => <div className={`${PREFIX_CLASS}__sum-column`}>{expense || '-'}</div>,
								},
								{
									title: '公司結果',
									dataIndex: 'expense',
									key: 'companyAmount',
									width: 80,
									render: (expense) => <div className={`${PREFIX_CLASS}__sum-column`}>{-expense || '-'}</div>,
								},
							],
						},
						{
							title: '备注',
							dataIndex: 'status',
							key: 'status',
							width: 128,
							render: function render(data) {
								const matchedDrawingStatus = DrawingStatusToStatusTagMap[data] ? DrawingStatusToStatusTagMap[data] : {};
								const {
									statusTag = '',
									text = '',
								} = matchedDrawingStatus;

								return <StatusTag status={statusTag} text={text} />;
							},
						},
						{
							title: '操作',
							dataIndex: '',
							key: '',
							width: 115,
							render: function render(record) {
								const { status, } = record;
								const shouldShowStopButton = StopButtonStatusMap[status] === true;
								const shouldShowModifyButton = ModifyButtonStatusMap[status] === true;
								const renderButtonContent = [];

								if (shouldShowStopButton) {
									renderButtonContent.push(
										<div key="discard-betting">
											<TextButton
												text="停止下注与开奖"
												onClick={() => onClickStop(record)}
											/>
										</div>
									);
								}
								if (shouldShowModifyButton) {
									renderButtonContent.push(
										<div key="modify-betting">
											<TextButton
												text="修改"
												onClick={() => onClickModify(record)}
											/>
										</div>
									);
								}
								renderButtonContent.push(
									<div key="betting-record">
										<TextButton
											text="投注名單"
											onClick={() => onClickRecords(record)}
										/>
									</div>
								);

								return renderButtonContent;
							},
						},
					]}
				/>
				<TextButton
					text="载入更多"
					onClick={onClickLoadMore}
					className={`${PREFIX_CLASS}--load-button`}
				/>
			</Fragment>
		);
	}
}

LotteryDrawingTable.propTypes = propTypes;
LotteryDrawingTable.defaultProps = defaultProps;

export default LotteryDrawingTable;
