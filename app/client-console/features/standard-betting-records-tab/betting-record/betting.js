import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { TextButton, BettingRecordCard, Panel, } from 'ljit-react-components';
import {
	bettingRecordPropType,
} from '../../../lib/betting-utils';

const propTypes = {
	bettingRecords: PropTypes.arrayOf(bettingRecordPropType),
	onClickBettingRecord: PropTypes.func,
	onDiscardBettingRecord: PropTypes.func,
	onCheckAllBettingRecords: PropTypes.func,
};

const PREFIX_CLASS = 'betting-record';

const defaultProps = {
	bettingRecords: [],
	onClickBettingRecord: () => {},
	onDiscardBettingRecord: () => {},
	onCheckAllBettingRecords: () => {},
};

class Betting extends Component {
	constructor() {
		super();
		this._renderBettingCards = this._renderBettingCards.bind(this);
	}

	_renderBettingCards() {
		const { bettingRecords, onClickBettingRecord, onDiscardBettingRecord, } = this.props;

		const cards = bettingRecords.map(betting => {
			return (
				<BettingRecordCard
					className={`${PREFIX_CLASS}__card`}
					key={betting.id}
					bettingRecord={betting}
					onClick={() => onClickBettingRecord(betting)}
					onClickCancel={() => onDiscardBettingRecord(betting)}
				/>
			);
		});

		return cards;
	}

	render() {
		const { onCheckAllBettingRecords, } = this.props;
		const { _renderBettingCards, } = this;

		return (
			<Panel
				headerTitle="投注记录"
				content={_renderBettingCards()}
				footer={
					<TextButton
						className={`${PREFIX_CLASS}__check-record-button`}
						onClick={onCheckAllBettingRecords}
						fontSize={TextButton.SizeEnums.SMALL}
						text="看所有投注记录"
					/>
				}
			/>
		);
	}
}

Betting.propTypes = propTypes;
Betting.defaultProps = defaultProps;

export default Betting;
