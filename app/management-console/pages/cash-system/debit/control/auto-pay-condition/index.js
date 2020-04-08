import React, { Component, Fragment, } from 'react';
import PropTypes from 'prop-types';
import { Divider, } from 'ljit-react-components';
import SettingForm from './setting-form';
import LotteryBlackList from './lottery-black-list';
import PageBlock from '../../../../../components/page-block';
import { RouteKeyEnums, } from '../../../../../routes';
import { PREFIX_CLASS, } from './utils';
import './style.styl';

const { CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION, } = RouteKeyEnums;

const propTypes = {
	// TODO 確定資料結構
	conditionData: PropTypes.shape({
		bannedStatuses: PropTypes.arrayOf(PropTypes.string),
		acessLevel: PropTypes.arrayOf(PropTypes.string),
		lessThanDays: PropTypes.number,
		dayOver: PropTypes.number,
		monthOver: PropTypes.number,
		electricOver: PropTypes.number,
		chessOver: PropTypes.number,
		sportOver: PropTypes.number,
		percentOver: PropTypes.number,
		rebateOver: PropTypes.number,
		transferOver: PropTypes.number,
		maxTransfer: PropTypes.number,
	}),
	onNavigate: PropTypes.func,
};

class CashSystemDebitControlAutoPayConditionPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lotteryBlackListData: lotteryBlackListData,
		};

		this._handleSaveSetting = this._handleSaveSetting.bind(this);
		this._renderSettingForm = this._renderSettingForm.bind(this);
		this._handleAddLotteryBlackList = this._handleAddLotteryBlackList.bind(this);
		this._handleDeleteLotteryBlackList = this._handleDeleteLotteryBlackList.bind(this);
		this._renderBlackListBlock = this._renderBlackListBlock.bind(this);
	}

	_handleSaveSetting(settings) {
		// TODO dispatch save setting action
	}

	_renderSettingForm() {
		const { conditionData, } = this.props;
		const { _handleSaveSetting, } = this;

		return (
			<PageBlock className={`${PREFIX_CLASS}__page-block`}>
				<SettingForm
					initialValues={conditionData}
					onSubmit={_handleSaveSetting}
				/>
				<Divider className={`${PREFIX_CLASS}__divider`}/>
			</PageBlock>
		);
	}

	_handleAddLotteryBlackList() {
		this.props.onNavigate(`${CASHSYSTEM_DEBIT_CONTROL_AUTO_PAY_CONDITION}/create`);
	}

	_handleDeleteLotteryBlackList(selectedRowKeys) {
		const { lotteryBlackListData, } = this.state;
		const newData = [];

		lotteryBlackListData.forEach((item, index) => {
			let isFind = false;

			for (let i = 0; i < selectedRowKeys.length; i++) {
				if (index === selectedRowKeys[i]) {
					isFind = true;
				}
			}
			if (!isFind) {
				newData.push(item);
			}
		});
		this.setState({
			lotteryBlackListData: newData,
		});
	}

	_renderBlackListBlock() {
		const { lotteryBlackListData, } = this.state;
		const {
			_handleAddLotteryBlackList,
			_handleDeleteLotteryBlackList
		} = this;

		return (
			<LotteryBlackList
				lotteryBlackListData={lotteryBlackListData}
				onSubmitLotteryBlackList={_handleAddLotteryBlackList}
				onDeleteLotteryBlackList={_handleDeleteLotteryBlackList}
			/>
		);
	}

	render() {
		return (
			<Fragment>
				{this._renderSettingForm()}
				{this._renderBlackListBlock()}
			</Fragment>
		);
	}
}

CashSystemDebitControlAutoPayConditionPage.propTypes = propTypes;

export default CashSystemDebitControlAutoPayConditionPage;

const lotteryBlackListData = [{
	id: 0,
	lottery: '重庆时时彩',
	play: '五星直式复选',
	issues: [202525, 202526],
},{
	id: 1,
	lottery: '上海时时彩',
	play: '三星直式复选',
	issues: [],
}];
