import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	LabelContent,
	InputTextarea,
	StatusTag,
	DecimalNumber,
} from 'ljit-react-components';
import { formatDate, } from '../../../lib/moment-utils';
import {
	bettingRecordPropType,
	checkIsBettingRecordStatus,
	checkIsNotOpenBettingRecordStatus,
	getBettingRecordStatusMap,
} from '../../lib/betting-utils';
import SubmitFormModal from '../submit-form-modal';
import BettingRecordDetailList from '../betting-record-detail-list';
import cx from 'classnames';
import './style.styl';

const prefixClass = 'betting-record-details-modal';

const propTypes = {
	isModalVisible: PropTypes.bool,
	isShowingDiscardButton: PropTypes.bool,
	title: PropTypes.string,
	className: PropTypes.string,
	bettingRecord: bettingRecordPropType,
	onDiscardBetting: PropTypes.func,
	onClose: PropTypes.func,
};
const defaultProps = {
	isModalVisible: false,
	isShowingDiscardButton: true,
	title: '投注详情',
	className: '',
	bettingRecord: {},
	onDiscardBetting: () => {},
	onClose: () => {},
};

class BettingRecordDetailModal extends Component {
	constructor() {
		super();

		this._renderStatusTag = this._renderStatusTag.bind(this);
		this._renderDiscardButton = this._renderDiscardButton.bind(this);
		this._renderFooter = this._renderFooter.bind(this);
		this._renderNoDiscardButtonFooter = this._renderNoDiscardButtonFooter.bind(this);
	}

	_renderStatusTag() {
		const {
			bettingRecord = {},
		} = this.props;
		const {
			status,
		} = bettingRecord;

		if (!checkIsBettingRecordStatus(status)) {
			return '-';
		}

		const statusMap = getBettingRecordStatusMap(status);

		return <StatusTag status={statusMap.statusTag} text={statusMap.text} />;
	}

	_renderDiscardButton() {
		const { onDiscardBetting, } = this.props;

		return (
			<Button
				onClick={onDiscardBetting}
				color={Button.ColorEnums.ORANGE}
				outline={Button.OutlineEnums.HOLLOW}
				className={`${prefixClass}__button`}
			>
				撤单
			</Button>
		);
	}

	_renderFooter() {
		const { onClose, bettingRecord, } = this.props;
		const { _renderDiscardButton, } = this;
		const { status, } = bettingRecord;
		const isDiscardable = checkIsNotOpenBettingRecordStatus(status);

		return (
			<React.Fragment>
				{isDiscardable ? _renderDiscardButton() : null}
				<Button
					onClick={onClose}
					color={Button.ColorEnums.GREY30}
					outline={Button.OutlineEnums.HOLLOW}
					className={`${prefixClass}__button`}
				>
					{isDiscardable ? "取消" : "关闭"}
				</Button>
			</React.Fragment>
		);
	}

	_renderNoDiscardButtonFooter() {
		const { onClose, } = this.props;

		return (
			<Button
				onClick={onClose}
				color={Button.ColorEnums.GREY30}
				outline={Button.OutlineEnums.HOLLOW}
				className={`${prefixClass}__button`}
			>
				关闭
			</Button>
		);
	}
	render() {
		const {
			isModalVisible,
			onClose,
			bettingRecord = {},
			title,
			className,
			isShowingDiscardButton,
		} = this.props;
		const {
			_renderFooter,
			_renderNoDiscardButtonFooter,
			_renderStatusTag,
		} = this;
		const {
			id,
			username,
			name,
			lotteryName,
			amountPerBet,
			amount,
			multiple,
			reward,
			rebate,
			issue,
			opencode,
			count,
			betcontent,
			weizhi,
			device,
			isPK,
			createdAt,
			traceId,
		} = bettingRecord;
		const footerContent = isShowingDiscardButton ? _renderFooter() : _renderNoDiscardButtonFooter();

		return (
			<SubmitFormModal
				title={title}
				isVisible={isModalVisible}
				footer={footerContent}
				width={880}
				onClickCancel={onClose}
				className={cx(prefixClass, className)}
			>
				<div className={`${prefixClass}__section`}>
					<BettingRecordDetailList>
						<LabelContent
							label="会员名"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{username}
						</LabelContent>
						<LabelContent
							label="彩种"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{lotteryName}
						</LabelContent>
						<LabelContent
							label="玩法"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{name}
						</LabelContent>
						<LabelContent
							label="位置"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{weizhi ? weizhi : '-'}
						</LabelContent>
						<LabelContent
							label="方案编号"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{id}
						</LabelContent>
						<LabelContent
							label="单注金额"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{amountPerBet}
						</LabelContent>
						<LabelContent
							label="倍数"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{multiple}
						</LabelContent>
						<LabelContent
							label="总金额"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{amount}
						</LabelContent>
						<LabelContent
							label="下注时间"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{formatDate(createdAt)}
						</LabelContent>
						<LabelContent
							label="期号"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{issue}
						</LabelContent>
						<LabelContent
							label="奖金"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							<DecimalNumber data={reward} hasSeparator/>
						</LabelContent>
						<LabelContent
							label="奖金返点"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{rebate}%
						</LabelContent>
						<LabelContent
							label="投注来源"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{device}
						</LabelContent>
						<LabelContent
							label="中奖类型"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{isPK ? '单挑限额' : '正常'}
						</LabelContent>
						<LabelContent
							label="注数"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{count}
						</LabelContent>
						<LabelContent
							label="狀態"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{_renderStatusTag()}
						</LabelContent>
						<LabelContent
							label="开奖号码"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{opencode ? opencode : '-'}
						</LabelContent>
						<LabelContent
							label="追号单"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
							labelColon={false}
						>
							{/* TODO 確認追號判斷的依據 */}
							{traceId ? '是' : '否'}
						</LabelContent>
					</BettingRecordDetailList>
				</div>
				<div className={`${prefixClass}__section`}>
					<LabelContent
						label="投注号码"
						labelColon={false}
					>
						<InputTextarea
							value={betcontent}
							minRows={3}
							maxRows={3}
							disabled
						/>
					</LabelContent>
				</div>
			</SubmitFormModal>
		);
	}
}

BettingRecordDetailModal.propTypes = propTypes;
BettingRecordDetailModal.defaultProps = defaultProps;

export default BettingRecordDetailModal;
