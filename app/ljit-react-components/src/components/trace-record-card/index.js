import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import LabelText from '../label-text';
import InfoCard from '../info-card';
import StatusTag from '../status-tag';
import {
	TIME_SECONDS,
	formatDate,
	isDateValid,
} from '../../lib/moment-utils';
import './style.styl';

const TagStatusEnums = StatusTag.StatusEnums;
const PREFIX_CLASS = 'ljit-trace-info-card';
const StatusEnums = {
	INCOMPLETE: 1,
	COMPLETE: 2,
};
const {
	INCOMPLETE,
	COMPLETE,
} = StatusEnums;
const StatusMap = {
	[INCOMPLETE]: { text: '未完成', statusTag: TagStatusEnums.TRACE_INCOMPLETE, },
	[COMPLETE]: { text: '已完成', statusTag: TagStatusEnums.TRACE_COMPLETE, },
};

const propTypes = {
	onClick: PropTypes.func,
	traceRecord: PropTypes.shape({
		id: PropTypes.number,
		lotteryName: PropTypes.string,
		name: PropTypes.string,
		totalIssues: PropTypes.number,
		amountPerBet: PropTypes.number,
		reward: PropTypes.number,
		issue: PropTypes.string,
		status: PropTypes.oneOf(Object.values(StatusEnums)),
		createdAt: PropTypes.instanceOf(Date),
		opencode: PropTypes.string,
	}),
	className: PropTypes.string,
};
const defaultProps = {
	onClick: () => {},
	traceRecord: {},
	className: '',
};

class TraceRecordCard extends Component {
	constructor() {
		super();
	}

	render() {
		const { traceRecord, className, onClick, } = this.props;
		const {
			id,
			lotteryName,
			name,
			amountPerBet,
			reward,
			issue,
			createdAt,
			totalIssues,
			opencode,
			status = INCOMPLETE,
		} = traceRecord;

		return (
			<div
				className={cx(PREFIX_CLASS, className)}
				onClick={onClick}
			>
				<InfoCard
					className={`${PREFIX_CLASS}__info`}
					topLeft={(
						<div className={`${PREFIX_CLASS}__header`}>
							<span className={`${PREFIX_CLASS}__title`}>{lotteryName}</span>
							{StatusMap[status] ? <StatusTag status={StatusMap[status].statusTag} text={StatusMap[status].text}/> : null}
						</div>
					)}
					left={(
						<React.Fragment>
							<LabelText
								label="方案号"
								text={id}
								labelColType={LabelText.SizeEnums.MEDIUM}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="玩法"
								text={name}
								labelColType={LabelText.SizeEnums.MEDIUM}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="单注金额"
								text={amountPerBet}
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="中奖金额"
								text={reward ? reward : '-'}
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
						</React.Fragment>
					)}
					right={(
						<React.Fragment>
							<LabelText
								label="期号"
								text={issue}
								labelColType={LabelText.SizeEnums.SMALL}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="时间"
								text={isDateValid(createdAt) ? formatDate(createdAt, `M/D ${TIME_SECONDS}`) : '-'}
								labelColType={LabelText.SizeEnums.SMALL}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="追号期数"
								text={totalIssues}
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
							<LabelText
								label="中奖号码"
								text={opencode ? opencode : '-'}
								labelColType={LabelText.SizeEnums.LARGE}
								fontSize={LabelText.SizeEnums.SMALL}
							/>
						</React.Fragment>
					)}
				/>
			</div>
		);
	}
}

TraceRecordCard.propTypes = propTypes;
TraceRecordCard.defaultProps = defaultProps;

TraceRecordCard.StatusEnums = StatusEnums;
TraceRecordCard.StatusMap = StatusMap;

export default TraceRecordCard;
