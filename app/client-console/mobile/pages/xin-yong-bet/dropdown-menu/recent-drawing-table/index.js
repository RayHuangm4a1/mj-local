import React from 'react';
import PropTypes from 'prop-types';
import { Table, DrawingInfoCard, } from 'ljit-react-components';

const propTypes = {
	lotteryClassId: PropTypes.number,
	lotteryDrawingRecords: PropTypes.arrayOf(PropTypes.shape({
		issue: PropTypes.string,
		opencode: PropTypes.string,
	})),
};

function RecentDrawingTable({
	lotteryClassId,
	lotteryDrawingRecords,
}) {
	let DrawingInfoCardWithId;

	try {
		DrawingInfoCardWithId = DrawingInfoCard.get(lotteryClassId);
	} catch (error) {
		DrawingInfoCardWithId = DrawingInfoCard.get(0);
	}

	return (
		<Table
			columns={[{
				title: '期次',
				dataIndex: 'issue',
				width: 102,
			},{
				title: '开奖号码',
				dataIndex: 'opencode',
				render: function renderOpencode(opencode) {
					return (
						// TODO use mobile DrawingInfoCardWithId
						<DrawingInfoCardWithId
							opencode={opencode}
						/>
					);
				}
			}]}
			dataSource={lotteryDrawingRecords}
			rowKey="issue"
		/>
	);
}

RecentDrawingTable.propTypes = propTypes;

export default RecentDrawingTable;
