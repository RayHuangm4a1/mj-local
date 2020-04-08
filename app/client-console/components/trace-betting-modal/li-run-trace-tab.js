import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	LabelContent,
	Row,
	Col,
	InputNumber,
} from 'ljit-react-components';
import TracePlanInputGroup from './trace-plan-input-group';
import TraceBettingList from './trace-betting-list';
import ZhuiHaoGenerators from '../../lib/zhui-hao-generators';
import {
	updateTraceRowData,
	getAccumulateValue,
} from '../../lib/zhui-hao-utils';
import {
	validateInputNumber,
	validatePositiveNumber,
} from './validate';
import { BettingsDataPropTypes } from './utils';

const propTypes = {
	bettingsData: BettingsDataPropTypes.isRequired,
	traceBettingsData: PropTypes.arrayOf(
		PropTypes.objectOf(PropTypes.number),
	),
	onChangeTraceBettingData: PropTypes.func,
};

const PREFIX_CLASS = 'trace-tab';

const defaultProps = {
	onChangeTraceBettingData: () => {},
};

class LiRunTraceTab extends Component {
	constructor() {
		super();

		this.state = {
			zuiDiShoYi: 50,
			qiShiBeiShu: 1,
			zhuiHaoQiShu: 10,
		};

		this._checkIsGenerateButtonDisabled = this._checkIsGenerateButtonDisabled.bind(this);
		this._handleChangeZuiDiShoYi = this._handleChangeZuiDiShoYi.bind(this);
		this._handleChangeQiShiBeiShu = this._handleChangeQiShiBeiShu.bind(this);
		this._handleChangeZhuiHaoQiShu = this._handleChangeZhuiHaoQiShu.bind(this);
		this._handleGenerateTable = this._handleGenerateTable.bind(this);
		this._handleChangeMultiple = this._handleChangeMultiple.bind(this);
	}

	_checkIsGenerateButtonDisabled() {
		const { zuiDiShoYi, qiShiBeiShu, zhuiHaoQiShu, } = this.state;

		return (
			validatePositiveNumber(zuiDiShoYi) === 'error' ||
			validateInputNumber(zhuiHaoQiShu) === 'error' ||
			validateInputNumber(qiShiBeiShu) === 'error'
		);
	}

	_handleChangeZuiDiShoYi(value) {
		const zuiDiShoYi = Number(value);

		this.setState({ zuiDiShoYi, });
	}

	_handleChangeQiShiBeiShu(value) {
		const qiShiBeiShu = Number(value);

		this.setState({ qiShiBeiShu, });
	}

	_handleChangeZhuiHaoQiShu(value) {
		const zhuiHaoQiShu = Math.round(Number(value));

		this.setState({ zhuiHaoQiShu, });
	}

	_handleGenerateTable() {
		const {
			bettingsData,
			onChangeTraceBettingData,
		} = this.props;
		const {
			zuiDiShoYi,
			zhuiHaoQiShu,
			qiShiBeiShu,
		} = this.state;
		const traceBettingsData = ZhuiHaoGenerators.LiRun.generate(bettingsData, { zuiDiShoYi, qiShiBeiShu, zhuiHaoQiShu, });

		onChangeTraceBettingData(traceBettingsData);
	}

	_handleChangeMultiple(value, index) {
		const {
			bettingsData,
			onChangeTraceBettingData,
			traceBettingsData,
		} = this.props;

		const newTableData = updateTraceRowData(bettingsData, traceBettingsData, index, value);

		onChangeTraceBettingData(newTableData);
	}

	render() {
		const {
			bettingsData,
			traceBettingsData,
		} = this.props;
		const {
			zuiDiShoYi,
			qiShiBeiShu,
			zhuiHaoQiShu,
		} = this.state;
		const {
			_checkIsGenerateButtonDisabled,
			_handleChangeZuiDiShoYi,
			_handleChangeQiShiBeiShu,
			_handleChangeZhuiHaoQiShu,
			_handleGenerateTable,
			_handleChangeMultiple,
		} = this;

		return (
			<div className={PREFIX_CLASS}>
				<TracePlanInputGroup
					className={`${PREFIX_CLASS}__form`}
					isGenerateButtonDisabled={_checkIsGenerateButtonDisabled()}
					onClickGenerateButton={_handleGenerateTable}
				>
					<Row
						className={`${PREFIX_CLASS}__row`}
						type={Row.TypeEnums.FLEX}
						flexLayout={Row.FlexJustifyEnums.START}
					>
						<Col className={`${PREFIX_CLASS}__col`}>
							<LabelContent
								className={`${PREFIX_CLASS}__item`}
								label="最低收益率："
								validateStatus={validatePositiveNumber(zuiDiShoYi)}
							>
								<InputNumber
									value={zuiDiShoYi}
									className={`${PREFIX_CLASS}__input-number`}
									min={0}
									placeholder=""
									onChange={_handleChangeZuiDiShoYi}
								/>
							</LabelContent>
							<span className={`${PREFIX_CLASS}__unit`}>%</span>
						</Col>
						<Col className={`${PREFIX_CLASS}__col`}>
							<LabelContent
								className={`${PREFIX_CLASS}__item`}
								label="追号期数："
								validateStatus={validateInputNumber(zhuiHaoQiShu)}
							>
								<InputNumber
									value={zhuiHaoQiShu}
									className={`${PREFIX_CLASS}__input-number`}
									min={0}
									placeholder=""
									onChange={_handleChangeZhuiHaoQiShu}
								/>
							</LabelContent>
							<span className={`${PREFIX_CLASS}__unit`}>期</span>
						</Col>
						<Col className={`${PREFIX_CLASS}__col`}>
							<LabelContent
								className={`${PREFIX_CLASS}__item`}
								label="起始倍数："
								validateStatus={validateInputNumber(qiShiBeiShu)}
							>
								<InputNumber
									value={qiShiBeiShu}
									className={`${PREFIX_CLASS}__input-number`}
									min={0}
									placeholder=""
									onChange={_handleChangeQiShiBeiShu}
								/>
							</LabelContent>
							<span className={`${PREFIX_CLASS}__unit`}>倍</span>
						</Col>
					</Row>
				</TracePlanInputGroup>
				<TraceBettingList
					className={`${PREFIX_CLASS}__table-form`}
					hasProfitColumn
					traceBettingsData={traceBettingsData}
					totalBettingCount={getAccumulateValue(bettingsData, 'count') * traceBettingsData.length}
					totalBettingAmount={getAccumulateValue(traceBettingsData, 'amount')}
					onChangeMultiple={_handleChangeMultiple}
				/>
			</div>
		);
	}
}

LiRunTraceTab.propTypes = propTypes;
LiRunTraceTab.defaultProps = defaultProps;

export default LiRunTraceTab;
