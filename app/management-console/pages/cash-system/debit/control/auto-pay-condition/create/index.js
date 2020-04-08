import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	RemindText,
	HeaderButtonBar,
} from 'ljit-react-components';
import PageBlock from '../../../../../../components/page-block';
import LotteryBlackListEditingTable from './lottery-black-list-editing-table';
import './style.styl';

const propTypes = {
	initialValues: PropTypes.shape({
		bannedStatuses: PropTypes.array,
		lessThanDays: PropTypes.number,
		blacklist: PropTypes.array,
	}),
	onBack: PropTypes.func.isRequired,
};

const defaultProps = {
	initialValues: {
		bannedStatuses: ['2'],
		lessThanDays: 20,
		blacklist: ['2', '3'],
		dayOver: 100000,
		monthOver: 0,
		electricOver: 0,
		chessOver: 0,
		sportOver: 0,
		percentOver: 0,
		rebateOver: 0,
		transferOver: 0,
	},
};

const PREFIX_CLASS = 'auto-pay-condition-create';
const BLACK_LIST_BLOCK_CLASS = 'add-black-list-block';

class CashSystemDebitControlAutoPayConditionCreatePage extends Component {
	constructor() {
		super();
		this.state = {
			lotteryBlackListData: tableData,
		};
		this._handleGoBack = this._handleGoBack.bind(this);
		this._handleSaveAdd = this._handleSaveAdd.bind(this);
		this._handleTableChange = this._handleTableChange.bind(this);
		this._renderAddBlackList = this._renderAddBlackList.bind(this);
	}
	_handleGoBack() {
		this.props.onBack();
	}

	_handleTableChange(value) {
		this.setState({
			lotteryBlackListData: value,
		});
	}

	_handleSaveAdd(event) {
		event.preventDefault();
		//TODO Update data to serve
		
		this.props.onBack();
	}

	_renderAddBlackList() {
		const { _handleSaveAdd, _handleTableChange, } = this;
		const { lotteryBlackListData, } = this.state;

		return (
			<PageBlock className={`${BLACK_LIST_BLOCK_CLASS}`}>
				<HeaderButtonBar
					left={
						<PageBlock.Title className={`${BLACK_LIST_BLOCK_CLASS}__block-title`} text="新增彩种黑名单"/>
					}
					right={
						<Button
							className={`${BLACK_LIST_BLOCK_CLASS}__save-button`}
							outline={Button.OutlineEnums.SOLID}
							onClick={_handleSaveAdd}
						>
							储存新增
						</Button>
					}
				/>
				<RemindText
					className="add-black-list-remind-text"
					text="*彩种期号未输入等同无限制期数"
				/>
				<LotteryBlackListEditingTable
					lotteryBlackListData={lotteryBlackListData}
					onChangeTable={_handleTableChange}
				/>
			</PageBlock>
		);
	}

	render() {
		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__back-button`}>
					<Button outline={Button.OutlineEnums.HOLLOW} onClick={this._handleGoBack}>返回上一层</Button>
				</div>
				{this._renderAddBlackList()}
			</div>
		);
	}
}

CashSystemDebitControlAutoPayConditionCreatePage.propTypes = propTypes;
CashSystemDebitControlAutoPayConditionCreatePage.defaultProps = defaultProps;

export default CashSystemDebitControlAutoPayConditionCreatePage;

const tableData = [{
	key: 0,
	lottery: '重庆时时彩',
	play: '五星直式复选',
	issues: [202525, 202526],
},{
	key: 1,
	lottery: '上海时时彩',
	play: '三星直式复选',
	issues: [],
}];
