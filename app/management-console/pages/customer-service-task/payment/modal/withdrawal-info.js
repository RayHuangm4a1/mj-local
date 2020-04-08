import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Input,
	InputTextarea,
	LabelContent,
	Row,
	Col,
	Button,
	Timeline,
	TextButton
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import copyToClipboard from 'copy-to-clipboard';
import './style.styl';

const propTypes = {
	isVisible: PropTypes.bool,
	onCancel: PropTypes.func,
	selectedData: PropTypes.shape({
		member: PropTypes.string,
		cardId: PropTypes.string,
		name: PropTypes.string,
		bank: PropTypes.string,
		bankBranch: PropTypes.string,
		status: PropTypes.string,
		level: PropTypes.string,
		todayLotteryNet: PropTypes.number,
		todayPersonalNet: PropTypes.number,
		limitAmount: PropTypes.number,
		bankFee: PropTypes.number,
		feePoint: PropTypes.number,
		confirmAmount: PropTypes.number,
		unconfirmAmount: PropTypes.number,
		betDoneAmount: PropTypes.number,
		betNeededAmount: PropTypes.number,
		registrationDate: PropTypes.string,
		customerServiceNote: PropTypes.string,
		financialNote: PropTypes.string,
		statusTimeline: PropTypes.arrayOf(PropTypes.shape({
			timeLineTitle: PropTypes.string,
			timeLineContent: PropTypes.arrayOf(PropTypes.string,),
		})),
	})
};

const defaultProps = {
	isVisible: false,
	onCancel: () => {},
};

class AccountPayModal extends Component {
	constructor() {
		super();

		this._renderCopyButton = this._renderCopyButton.bind(this);
		this._renderTimelineItems = this._renderTimelineItems.bind(this);
	}

	_renderCopyButton(value) {
		return (
			<TextButton
				text="复制"
				onClick={() => copyToClipboard(value)}
			/>
		);
	}

	_renderTimelineItems(statusTimeline = []) {
		const timeLineItems = statusTimeline.map(data => {
			const { timeLineTitle, timeLineContent, } = data;

			const timeLineContentDivs = timeLineContent.map((content, contentIndex) => {
				return (
					<div key={contentIndex} style={{ paddingBottom: '16px', }}>{content}</div>
				);
			});

			return (
				<Timeline.Item key={timeLineTitle}>
					<Row type='flex'>
						<Col>
							{timeLineTitle}
						</Col>
						<Col style={{ marginLeft : '5px', width : '200px', }}>
							{timeLineContentDivs}
						</Col>
					</Row>
				</Timeline.Item>
			);
		});

		return timeLineItems;
	}
	render() {
		const { isVisible, onCancel, selectedData, } = this.props;
		const { _renderCopyButton, _renderTimelineItems } = this;

		return (
			<PageModal
				visible={isVisible}
				title="出款资讯"
				onClickCancel={onCancel}
				footer={<Button onClick={onCancel}>关闭</Button>}
				width={824}
				className="pay-info-modal"
			>
				<Row gutter={20}>
					<Col span={12}>
						<LabelContent
							label="会员帐号"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.member}
						</LabelContent>
						<LabelContent
							label="会员银行帐户"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.cardId}
							{_renderCopyButton(selectedData.cardId)}
						</LabelContent>
						<LabelContent
							label="卡主姓名"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.userName}
							{_renderCopyButton(selectedData.userName)}
						</LabelContent>
						<LabelContent
							label="银行名称"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.bank}
						</LabelContent>
						<LabelContent
							label="支行名称"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.bankBranch}
							{_renderCopyButton(selectedData.bankBranch)}
						</LabelContent>
						<LabelContent
							label="状态"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.status}
						</LabelContent>
						<LabelContent
							label="层级"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.level}
						</LabelContent>
						<LabelContent
							label="今日彩票盈亏"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.todayLotteryNet}
						</LabelContent>
						<LabelContent
							label="今日电子真人盈亏"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.todayPersonalNet}
						</LabelContent>
						<LabelContent
							label="提出额度"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.limitAmount}
						</LabelContent>
						<LabelContent
							label="手续费扣点"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.feePoint}
						</LabelContent>
						<LabelContent
							label="已成功出款金额"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.confirmAmount}
						</LabelContent>
						<LabelContent
							label="尚未出款金额"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.unconfirmAmount}
							{_renderCopyButton(selectedData.unconfirmAmount)}
						</LabelContent>
						<LabelContent
							label="已达/需达投注量"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{`${selectedData.betDoneAmount}/${selectedData.betNeededAmount}`}
						</LabelContent>
					</Col>
					<Col span={12}>
						<LabelContent label="注册时间" columnType={LabelContent.ColumnTypeEnums.LARGE}>
							{selectedData.registrationDate}
						</LabelContent>
						<LabelContent label="银行手续费" columnType={LabelContent.ColumnTypeEnums.LARGE}>
							<Input
								value={selectedData.bankFee}
								style={{ width: '115px', }}
								disabled
							/>
						</LabelContent>
						<div style={{ paddingLeft: 76, }}>
							<div style={{ color: 'rgba(0, 0, 0, 0.85)', }}>財務备注:</div>
							<InputTextarea
								style={{ color: 'rgba(0, 0, 0, 0.65)',  marginBottom: 20, width: 212, }}
								value={selectedData.financialNote}
								onChange={this._handleFinancialNoteChange}
								minRows={3}
								maxRows={3}
								disabled
							/>
							<div style={{ color: 'rgba(0, 0, 0, 0.85)', }}>客服备注:</div>
							<InputTextarea
								style={{ color: 'rgba(0, 0, 0, 0.65)', marginBottom: 20,  width: 212, }}
								value={selectedData.customerServiceNote}
								minRows={3}
								maxRows={3}
								disabled
							/>
							<Timeline mode={Timeline.ModeEnums.LEFT}>
								{_renderTimelineItems(selectedData.statusTimeline)}
							</Timeline>
						</div>
					</Col>
				</Row>
			</PageModal>
		);

	}
}

AccountPayModal.propTypes = propTypes;
AccountPayModal.defaultProps = defaultProps;

export default AccountPayModal;
