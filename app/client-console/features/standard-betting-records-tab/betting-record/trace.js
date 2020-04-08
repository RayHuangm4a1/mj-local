import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { TextButton, TraceRecordCard, Panel, } from 'ljit-react-components';
import { traceRecordDataPropType, } from '../../../lib/betting-utils';

const propTypes = {
	traceRecords: PropTypes.arrayOf(traceRecordDataPropType),
	onClickTraceRecord: PropTypes.func,
	onCheckAllTraceRecords: PropTypes.func,
};

const PREFIX_CLASS = 'betting-record';

const defaultProps = {
	traceRecords: [],
	onClickTraceRecord: () => {},
	onCheckAllTraceRecords: () => {},
};

class Trace extends Component {
	constructor() {
		super();
		this._renderTraceCards = this._renderTraceCards.bind(this);
	}

	_renderTraceCards() {
		const { traceRecords, onClickTraceRecord, } = this.props;

		const cards = traceRecords.map(trace => {
			return (
				<TraceRecordCard
					className={`${PREFIX_CLASS}__card`}
					key={trace.id}
					traceRecord={trace}
					onClick={() => onClickTraceRecord(trace)}
				/>
			);
		});

		return cards;
	}

	render() {
		const { onCheckAllTraceRecords, } = this.props;
		const { _renderTraceCards, } = this;

		return (
			<Panel
				headerTitle="追号记录"
				content={_renderTraceCards()}
				footer={
					<TextButton
						className={`${PREFIX_CLASS}__check-record-button`}
						onClick={onCheckAllTraceRecords}
						fontSize={TextButton.SizeEnums.SMALL}
						text="看所有追号记录"
					/>
				}
			/>
		);
	}
}

Trace.propTypes = propTypes;
Trace.defaultProps = defaultProps;

export default Trace;
