import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
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

const defaultProps = {
	onChangeTraceBettingData: () => {},
};

const PREFIX_CLASS = 'trace-tab';

class FanBeiTraceTab extends Component {
	constructor() {
		super();

		this.state = {
			qiShiBeiShu: 1,
			perQiShu: 2,
			plusBeiShu: 2,
			zhuiHaoQiShu: 10,
		};

		this._checkIsGenerateButtonDisabled = this._checkIsGenerateButtonDisabled.bind(this);
		this._handleChangeQiShiBeiShu = this._handleChangeQiShiBeiShu.bind(this);
		this._handleChangePerQiShu = this._handleChangePerQiShu.bind(this);
		this._handleChangePlusBeiShu = this._handleChangePlusBeiShu.bind(this);
		this._handleChangeZhuiHaoQiShu = this._handleChangeZhuiHaoQiShu.bind(this);
		this._handleGenerateTable = this._handleGenerateTable.bind(this);
		this._handleChangeMultiple = this._handleChangeMultiple.bind(this);
	}

	_checkIsGenerateButtonDisabled() {
		const {  qiShiBeiShu, perQiShu, plusBeiShu, zhuiHaoQiShu, } = this.state;

		return (
			validatePositiveNumber(qiShiBeiShu) === 'error' ||
			validateInputNumber(perQiShu) === 'error' ||
			validateInputNumber(plusBeiShu) === 'error' ||
			validateInputNumber(zhuiHaoQiShu) === 'error'
		);
	}

	_handleChangeQiShiBeiShu(value) {
		const qiShiBeiShu = Number(value);

		this.setState({ qiShiBeiShu, });
	}

	_handleChangePerQiShu(value) {
		const perQiShu = Math.round(Number(value));

		this.setState({ perQiShu, });
	}

	_handleChangePlusBeiShu(value) {
		const plusBeiShu = Number(value);

		this.setState({ plusBeiShu, });
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
			qiShiBeiShu,
			zhuiHaoQiShu,
			perQiShu,
			plusBeiShu,
		} = this.state;
		const traceBettingsData = ZhuiHaoGenerators.FanBei.generate(bettingsData, {
			qiShiBeiShu,
			zhuiHaoQiShu,
			perQiShu,
			plusBeiShu,
		});

		onChangeTraceBettingData(traceBettingsData);
	}

	_handleChangeMultiple(value, index) {
		const {
			bettingsData,
			traceBettingsData,
			onChangeTraceBettingData,
		} = this.props;

		let newTableData = updateTraceRowData(bettingsData, traceBettingsData, index, value);

		onChangeTraceBettingData(newTableData);
	}

	render() {
		const {
			bettingsData,
			traceBettingsData,
		} = this.props;
		const {
			qiShiBeiShu,
			perQiShu,
			plusBeiShu,
			zhuiHaoQiShu,
		} = this.state;
		const {
			_checkIsGenerateButtonDisabled,
			_handleChangeQiShiBeiShu,
			_handleChangePerQiShu,
			_handleChangePlusBeiShu,
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
								label="起始倍数："
								validateStatus={validateInputNumber(qiShiBeiShu)}
							>
								<InputNumber
									value={qiShiBeiShu}
									className={`${PREFIX_CLASS}__input-number`}
									min={0}
									onChange={_handleChangeQiShiBeiShu}
								/>
							</LabelContent>
							<span className={`${PREFIX_CLASS}__unit`}>倍</span>
						</Col>
						<Col className={`${PREFIX_CLASS}__col`}>
							<LabelContent
								className={`${PREFIX_CLASS}__item`}
								label="起始倍数："
							>
								<div className={cx(`${PREFIX_CLASS}__col`, `${PREFIX_CLASS}__col--sub`)}>
									<span>隔</span>
									<LabelContent
										className={cx(`${PREFIX_CLASS}__item`, `${PREFIX_CLASS}__item--sub`)}
										validateStatus={validateInputNumber(perQiShu)}
									>
										<InputNumber
											value={perQiShu}
											className={cx(`${PREFIX_CLASS}__input-number`, `${PREFIX_CLASS}__input-number--small`)}
											min={1}
											onChange={_handleChangePerQiShu}
										/>
									</LabelContent>
									<span>期倍数 X</span>
									<LabelContent
										className={cx(`${PREFIX_CLASS}__item`, `${PREFIX_CLASS}__item--sub`)}
										validateStatus={validateInputNumber(plusBeiShu)}
									>
										<InputNumber
											value={plusBeiShu}
											className={cx(`${PREFIX_CLASS}__input-number`, `${PREFIX_CLASS}__input-number--small`)}
											min={0}
											onChange={_handleChangePlusBeiShu}
										/>
									</LabelContent>
									<span>倍</span>
								</div>
							</LabelContent>
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
									onChange={_handleChangeZhuiHaoQiShu}
								/>
							</LabelContent>
							<span className={`${PREFIX_CLASS}__unit`}>期</span>
						</Col>
					</Row>
				</TracePlanInputGroup>
				<TraceBettingList
					className={`${PREFIX_CLASS}__table-form`}
					traceBettingsData={traceBettingsData}
					totalBettingCount={getAccumulateValue(bettingsData, 'count') * traceBettingsData.length}
					totalBettingAmount={getAccumulateValue(traceBettingsData, 'amount')}
					onChangeMultiple={_handleChangeMultiple}
				/>
			</div>
		);
	}
}

FanBeiTraceTab.propTypes = propTypes;
FanBeiTraceTab.defaultProps = defaultProps;

export default FanBeiTraceTab;