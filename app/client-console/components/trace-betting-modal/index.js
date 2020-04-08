import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Button, } from 'ljit-react-components';
import SubmitFormModal from '../submit-form-modal';
import CardInkbarTabs from '../card-inkbar-tabs';
import TongBeiTraceTab from './tong-bei-trace-tab';
import FanBeiTraceTab from './fan-bei-trace-tab';
import LiRunTraceTab from './li-run-trace-tab';
import TraceConfigInputGroup from './trace-config-input-group';
import { generateTraces, } from '../../lib/zhui-hao-utils';
import { BettingsDataPropTypes } from './utils';
import './style.styl';

const propTypes = {
	isModalVisible: PropTypes.bool,
	bettingsData: BettingsDataPropTypes,
	onClickSubmit: PropTypes.func,
	onClickCancel: PropTypes.func,
};
const defaultProps = {
	onClickSubmit: () => {},
	onClickCancel: () => {},
};

const PREFIX_CLASS = 'trace-betting-modal';

const tabKeyEnums = {
	TONG_BEI: 'tong-bei',
	FAN_BEI: 'fan-bei',
	LI_RUN: 'li-run',
};

const { TONG_BEI, FAN_BEI, LI_RUN, } = tabKeyEnums;

class TraceBettingModal extends Component {
	constructor() {
		super();
		this.state = {
			tabKey: TONG_BEI,
			isTerminatedIfWin: true,
			traceBettingsData: [],
		};

		this._handleChangeTab = this._handleChangeTab.bind(this);
		this._handleChangeIsTerminatedIfWin = this._handleChangeIsTerminatedIfWin.bind(this);
		this._handleChangeTraceBettingData = this._handleChangeTraceBettingData.bind(this);
		this._generateTraces = this._generateTraces.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleChangeTab(tabKey) {
		this.setState({
			tabKey,
			traceBettingsData: [],
		});
	}

	_handleChangeIsTerminatedIfWin(isTerminatedIfWin) {
		this.setState({
			isTerminatedIfWin,
		});
	}

	_handleChangeTraceBettingData(traceBettingsData) {
		this.setState({
			traceBettingsData,
		});
	}

	_generateTraces() {
		const {
			bettingsData,
		} = this.props;
		const {
			isTerminatedIfWin,
			traceBettingsData,
		} = this.state;

		const multiples = traceBettingsData.map((betting) => betting.multiple);

		const traces = generateTraces(bettingsData, {
			multiples,
			isTerminatedIfWin,
		});

		return traces;
	}

	_handleSubmit() {
		const { onClickSubmit, } = this.props;
		const { _generateTraces, } = this;
		const traces = _generateTraces();

		onClickSubmit(traces);
		this.setState({
			traceBettingsData: [],
		});
	}

	_handleCancel() {
		const { onClickCancel, } = this.props;

		onClickCancel();
		this.setState({
			traceBettingsData: [],
		});
	}

	render() {
		const {
			isModalVisible,
			bettingsData,
		} = this.props;
		const {
			isTerminatedIfWin,
			traceBettingsData,
		} = this.state;
		const {
			_handleChangeTab,
			_handleChangePassword,
			_handleChangeIsTerminatedIfWin,
			_handleChangeTraceBettingData,
			_handleSubmit,
			_handleCancel,
		} = this;

		return (
			<Fragment>
				<SubmitFormModal
					className={PREFIX_CLASS}
					isVisible={isModalVisible}
					title="追号计划"
					width={880}
					onClickCancel={_handleCancel}
					footer={
						<Fragment>
							<Button
								className={`${PREFIX_CLASS}__cancel-button`}
								outline={Button.OutlineEnums.HOLLOW}
								onClick={_handleCancel}
							>
								取消
							</Button>
							<Button
								className={`${PREFIX_CLASS}__bet-button`}
								outline={Button.OutlineEnums.SOLID}
								onClick={_handleSubmit}
							>
								确认下注
							</Button>
						</Fragment>
					}
				>
					<CardInkbarTabs
						activeKey={this.state.tabKey}
						onChange={_handleChangeTab}
					>
						<CardInkbarTabs.TabPane
							key={TONG_BEI}
							tab="同倍追号"
						>
							<TongBeiTraceTab
								bettingsData={bettingsData}
								traceBettingsData={traceBettingsData}
								onChangeTraceBettingData={_handleChangeTraceBettingData}
							/>
						</CardInkbarTabs.TabPane>
						<CardInkbarTabs.TabPane
							key={FAN_BEI}
							tab="翻倍追号"
						>
							<FanBeiTraceTab
								bettingsData={bettingsData}
								traceBettingsData={traceBettingsData}
								onChangeTraceBettingData={_handleChangeTraceBettingData}
							/>
						</CardInkbarTabs.TabPane>
						<CardInkbarTabs.TabPane
							key={LI_RUN}
							tab="利润率追号"
						>
							<LiRunTraceTab
								bettingsData={bettingsData}
								traceBettingsData={traceBettingsData}
								onChangeTraceBettingData={_handleChangeTraceBettingData}
							/>
						</CardInkbarTabs.TabPane>
					</CardInkbarTabs>
					<TraceConfigInputGroup
						className={`${PREFIX_CLASS}__trace`}
						isTerminatedIfWin={isTerminatedIfWin}
						onChangePassword={_handleChangePassword}
						onChangeIsTerminatedIfWin={_handleChangeIsTerminatedIfWin}
					/>
				</SubmitFormModal>
			</Fragment>
		);
	}
}

TraceBettingModal.propTypes = propTypes;
TraceBettingModal.defaultProps = defaultProps;

export default TraceBettingModal;
