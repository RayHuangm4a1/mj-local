import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Card, } from 'ljit-react-components';
import { lotteryDrawingRecordsPropTypes, } from '../utils';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	lotteryDrawingRecords: lotteryDrawingRecordsPropTypes,
};

const PREFIX_CLASS = 'betting-long-list-item';

class BettingLongList extends Component {
	constructor() {
		super();
		this._getBettingLongData = this._getBettingLongData.bind(this);
	}

	_getBettingLongData() {
		const { lotteryDrawingRecords, } = this.props;

		// TODO count bettingLongData by lotteryDrawingRecords
		return [{
			key: '1',
			ball: '第二球 - 大',
			issues: '5期',
		},{
			key: '2',
			ball: '第二球 - 大',
			issues: '5期',
		},{
			key: '3',
			ball: '第二球 - 大',
			issues: '5期',
		},{
			key: '4',
			ball: '第二球 - 大',
			issues: '5期',
		},{
			key: '5',
			ball: '第二球 - 大',
			issues: '5期',
		}];
	}

	render() {
		const { className, } = this.props;
		const { _getBettingLongData, } = this;
		const content = _getBettingLongData().map((item) => {
			return (
				<Card key={item.key} className={cx(PREFIX_CLASS, className)}>
					<div className={`${PREFIX_CLASS}__ball`}>{item.ball}</div>
					<div className={`${PREFIX_CLASS}__issues`}>{item.issues}</div>
				</Card>
			);
		});

		return (
			<div className={`${PREFIX_CLASS}__wrapper`}>{content}</div>
		);
	}
}

BettingLongList.propTypes = propTypes;

export default BettingLongList;
