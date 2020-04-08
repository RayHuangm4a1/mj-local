import React, { useState, useEffect, } from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	LabelContent,
	InputTextarea,
	StatusTag,
} from 'ljit-react-components';
import { formatDate, } from '../../../../../../lib/moment-utils';
import { usePrevious, } from '../../../../../lib/react-utils';
import {
	checkIsTraceRecordStatus,
	getTraceRecordStatusMap,
	convertTerminatedIfWinToType,
	getTraceRecordTypeMap,
} from '../../../../../lib/betting-utils';
import SubmitFormModal from '../../../../../components/submit-form-modal';
import BettingRecordDetailList from '../../../../../components/betting-record-detail-list';
import TeamTraceBettingRecordTable from './bettings-table';
import {
	teamTraceRecordDetailBettingsPropTypes,
	teamTraceRecordDetailPropTypes,
} from '../utils';
import './style.styl';

const PREFIX_CLASS = 'team-trace-record-detail-modal';
const EMPTY_TEXT = '-';
const initPagination = {};

const propTypes = {
	isModalVisible: PropTypes.bool,
	data: teamTraceRecordDetailPropTypes,
	bettingsData: teamTraceRecordDetailBettingsPropTypes,
	onClose: PropTypes.func,
	onBettingTableChange: PropTypes.func,
};
const defaultProps = {
	isModalVisible: false,
	data: {},
	bettingsData: {},
	onClose: () => {},
	onBettingTableChange: () => {},
};

function TeamTraceRecordDetailModal({
	isModalVisible,
	data: {
		id,
		name,
		lotteryName,
		amountPerBet,
		amount,
		rebate,
		numOfFinishedIssues,
		betcontent,
		weizhi,
		device,
		status,
		username,
		createdAt,
		isTerminatedIfWin,
		numOfIssues,
	},
	bettingsData = {},
	onClose,
	onBettingTableChange,
}) {
	const [pagination, setPagination] = useState(initPagination);
	const prevModalVisible = usePrevious(isModalVisible);
	const terminatedIfWinType = convertTerminatedIfWinToType(isTerminatedIfWin);

	useEffect(() => {
		if (prevModalVisible && !isModalVisible) {
			setPagination(initPagination);
		}
	}, [isModalVisible]);
	function _handleChangeTable(pagination = {}) {
		onBettingTableChange(pagination);
		setPagination(pagination);
	}
	function _renderTypeTag(type) {
		const typeMap = getTraceRecordTypeMap(type);

		return (
			<StatusTag
				className={`${PREFIX_CLASS}__type-tag`}
				status={typeMap.statusTag}
				text={typeMap.text}
			/>
		);
	}
	function _renderStatusTag(status) {
		const statusMap = getTraceRecordStatusMap(status);

		return <StatusTag status={statusMap.statusTag} text={statusMap.text} />;
	}
	function _renderFooter() {
		return (
			<Button
				onClick={onClose}
				color={Button.ColorEnums.GREY30}
				outline={Button.OutlineEnums.HOLLOW}
				className={`${PREFIX_CLASS}__button`}
			>
				关闭
			</Button>
		);
	}
	return (
		<SubmitFormModal
			title="追号详情"
			isVisible={isModalVisible}
			footer={_renderFooter()}
			width={880}
			onClickCancel={onClose}
			className={PREFIX_CLASS}
		>
			<div className={`${PREFIX_CLASS}__section`}>
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
						label="总金额"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{amount}
					</LabelContent>
					<LabelContent
						label="位置"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{weizhi ? weizhi : EMPTY_TEXT}
					</LabelContent>
					<LabelContent
						label="方案编号"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{id}
					</LabelContent>
					<LabelContent
						label="玩法"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{name}
					</LabelContent>
					<LabelContent
						label="单注金额"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{amountPerBet}
					</LabelContent>
					<LabelContent
						label="奖金返点"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{rebate}%
					</LabelContent>
					<LabelContent
						label="下注时间"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{formatDate(createdAt)}
					</LabelContent>
					<LabelContent
						label="追号期数"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{numOfIssues}
					</LabelContent>
					<LabelContent
						label="完成期数"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{numOfFinishedIssues}
					</LabelContent>
					<LabelContent
						label="投注来源"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{device}
					</LabelContent>
					<LabelContent
						label="追号类型"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{_renderTypeTag(terminatedIfWinType)}
					</LabelContent>
					<LabelContent
						label="状态"
						columnType={LabelContent.ColumnTypeEnums.LARGE}
						labelColon={false}
					>
						{checkIsTraceRecordStatus(status) ? _renderStatusTag(status) : EMPTY_TEXT}
					</LabelContent>
				</BettingRecordDetailList>
			</div>
			<div className={`${PREFIX_CLASS}__section`}>
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
			<div className={`${PREFIX_CLASS}__betting-table`}>
				<TeamTraceBettingRecordTable
					data={bettingsData.data}
					onChangeTable={_handleChangeTable}
					paginationProps={{
						...pagination,
						total: bettingsData.numOfItems,
					}}
				/>
			</div>
		</SubmitFormModal>
	);
}

TeamTraceRecordDetailModal.propTypes = propTypes;
TeamTraceRecordDetailModal.defaultProps = defaultProps;

export default TeamTraceRecordDetailModal;