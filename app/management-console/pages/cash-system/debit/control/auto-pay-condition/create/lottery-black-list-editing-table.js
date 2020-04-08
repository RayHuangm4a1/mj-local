import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	InputNumber,
	Select,
	InputDynamicTable,
	LabelContent,
} from 'ljit-react-components';

const propTypes = {
	lotteryBlackListData: PropTypes.arrayOf(PropTypes.shape({
		key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		lottery: PropTypes.string,
		play: PropTypes.string,
		issues: PropTypes.arrayOf(PropTypes.number),
	})),
	onChangeTable: PropTypes.func,
};

const defaultProps = {
	onChangeTable: () => {},
};

const RANGE_INPUT_WRAP_CLASS = 'range-input-wrap';
const tableName = 'black-list';

class LotteryBlackListEditingTable extends Component {
	constructor() {
		super();

		this._renderIssueInput = this._renderIssueInput.bind(this);
	}

	_renderIssueInput(issues, onChange) {
		const className = `${RANGE_INPUT_WRAP_CLASS}__input`;

		return (
			<InputNumber
				className={className}
				value={issues}
				onChange={onChange}
			/>
		);
	}

	render () {
		const { lotteryBlackListData, onChangeTable, } = this.props;
		const { _renderIssueInput, } = this;
		const columns =[{
			title: '彩种',
			dataIndex: 'lottery',
			renderField: (record, rowIndex, onChange) => {
				return (
					<LabelContent
						labelRequired
					>
						<Select
							className={`${RANGE_INPUT_WRAP_CLASS}__input`}
							value={record.lottery}
							options={[
								{ label: '重庆时时彩', value: '重庆时时彩', },
								{ label: '上海时时彩', value: '上海时时彩', },
								{ label: '腾讯分分彩', value: '腾讯分分彩', },
							]}
							onChange={(e) => onChange('lottery', e, rowIndex)}
						/>
					</LabelContent>
				);
			},
		},{
			title: '玩法',
			dataIndex: 'play',
			renderField: (record, rowIndex, onChange) => {
				return (
					<LabelContent
						labelRequired
					>
						<Select
							className={`${RANGE_INPUT_WRAP_CLASS}__input`}
							value={record.play}
							options={[
								{ label: '五星直选复式', value: '五星直选复式', },
								{ label: '三星直选复式', value: '三星直选复式', },
								{ label: '无', value: '无', },
							]}
							onChange={(e) => onChange('play', e, rowIndex)}
						/>
					</LabelContent>
				);
			},
		},{
			title: '彩种期号',
			dataIndex: 'issues',
			renderField: (record, rowIndex, onChange) => {
				let termBegain = null;

				let termEnd = null;

				if (Array.isArray(record.issues)) {
					termBegain = record.issues[0];
					termEnd = record.issues[1];
				}

				return (
					<div className={`${RANGE_INPUT_WRAP_CLASS}`}>
						<LabelContent
							labelRequired
						>
							{_renderIssueInput(termBegain, (e) => onChange('issues', [e, termEnd], rowIndex))}
						</LabelContent>
						<span className={`${RANGE_INPUT_WRAP_CLASS}__range-sign`}>~</span>
						<LabelContent
							labelRequired
						>
							{_renderIssueInput(termEnd, (e) => onChange('issues', [termBegain, e], rowIndex))}
						</LabelContent>
					</div>
				);}
		},];

		return (
			<InputDynamicTable
				tableName={tableName}
				value={lotteryBlackListData}
				columns={columns}
				onChange={onChangeTable}
			/>
		);
	}
}

LotteryBlackListEditingTable.propTypes = propTypes;
LotteryBlackListEditingTable.defaultProps = defaultProps;

export default LotteryBlackListEditingTable;
