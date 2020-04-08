import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copyToClipboard from 'copy-to-clipboard';
import {
	Row,
	Col,
	LabelContent,
} from 'ljit-react-components';
import {
	RecordPropTypes,
	ModalStateEnums,
} from './utils';
import {
	DATE_TIME_SECONDS,
	isDateValid,
	formatDate,
} from '../../../../lib/moment-utils';

const propTypes = {
	...RecordPropTypes,
	modalState: PropTypes.oneOf(Object.values(ModalStateEnums).concat('')),
};

const { DETAIL, } = ModalStateEnums;
const PREFIX_CLASS = 'account-pay-information';

class AccountPayInformation extends Component {
	constructor() {
		super();

		this._renderCopyButton = this._renderCopyButton.bind(this);
	}

	_renderCopyButton(value) {
		const { modalState, } = this.props;

		if (modalState === DETAIL) {
			return (
				<a className={`${PREFIX_CLASS}__label-copy`}
					href="javascript:;"
					onClick={() => copyToClipboard(value)}
				>复制</a>
			);
		}
	}

	render() {
		const {
			modalState,
			record,
		} = this.props;
		const {
			level,
			member,
			amount,
			fee,
			status,
			dama,
			administrator,
			applyAt,
			confirmAt,
			bank,
			bankBranch,
			debitVoucher,
			forbidAutoPayReasons,
		} = record;
		const {
			_renderCopyButton,
		} = this;

		return (
			<div className={PREFIX_CLASS}>
				<div className={`${PREFIX_CLASS}__title account-pay-modal__title`}>资讯栏</div>
				<Row>
					<Col span={8}>
						<LabelContent key="level" label="层级">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{level}</label>
						</LabelContent>
						<LabelContent key="member" label="用戶名" className={`${PREFIX_CLASS}--has-copy`}>
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{member}</label>
							{_renderCopyButton(member)}
						</LabelContent>
						<LabelContent key="amount" label="取款金额" className={`${PREFIX_CLASS}--has-copy`}>
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{amount}</label>
							{_renderCopyButton(amount)}
						</LabelContent>
						<LabelContent key="fee" label="手续费">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{fee}</label>
						</LabelContent>
						<LabelContent key="status" label="状态">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{status}</label>
						</LabelContent>
					</Col>
					<Col span={8}>
						<LabelContent key="dama" label="用户打码量">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{dama}</label>
						</LabelContent>
						<LabelContent key="administrator" label="操作者">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{administrator}</label>
						</LabelContent>
						<LabelContent key="applyAt" label="申请日">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{renderDateField(applyAt)}</label>
						</LabelContent>
						<LabelContent key="confirmAt" label="确认日">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{renderDateField(confirmAt)}</label>
						</LabelContent>
						<LabelContent key="bank" label="银行名称" className={`${PREFIX_CLASS}--has-copy`}>
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{bank}</label>
							{_renderCopyButton(bank)}
						</LabelContent>
					</Col>
					<Col span={8}>
						<LabelContent key="bankBranch" label="支行名称">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{bankBranch}</label>
						</LabelContent>
						<LabelContent key="debitVoucher" label="出款凭单">
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{debitVoucher}</label>
						</LabelContent>
						<LabelContent key="forbidAutoPayReasons" label="禁止自动出款原因" className={`${PREFIX_CLASS}__item--reasons`}>
							<label className={`${PREFIX_CLASS}__item--${modalState}`}>{forbidAutoPayReasons.join('/')}</label>
						</LabelContent>
					</Col>
				</Row>
			</div>
		);
	}
}

AccountPayInformation.propTypes = propTypes;

export default AccountPayInformation;

function renderDateField(date) {
	return isDateValid(date) ? formatDate(date, DATE_TIME_SECONDS) : '';
}
