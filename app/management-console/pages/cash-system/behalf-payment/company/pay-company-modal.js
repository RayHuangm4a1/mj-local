import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	LabelContent,
	UploadImageButton,
	Input,
	InputNumber,
	Modal,
	Row,
	Col,
} from 'ljit-react-components';
import copyToClipboard from 'copy-to-clipboard';
import PageModal from '../../../../components/page-modal';

const OperatingEnums = {
	DETAIL: 'detail',
	CANCEL: 'cancel',
	CONFIRM: 'confirm',
};

const propTypes = {
	isVisible: PropTypes.bool,
	footer: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	type: PropTypes.oneOf(Object.values(OperatingEnums)),
	data: PropTypes.shape({
		bankAccount: PropTypes.string,
		holder: PropTypes.string,
		bank: PropTypes.string,
		bankBranch: PropTypes.string,
		status: PropTypes.string,
		amount: PropTypes.number,
		fee: PropTypes.number,
		confirmAmount: PropTypes.number,
		unConfirmAmount: PropTypes.number,
		bankFee: PropTypes.number,
		remark: PropTypes.string,
		iconFileList: PropTypes.array,
	}),
	onClickCancel: PropTypes.func,
};

const defaultProps = {
	footer: '',
	data: {},
	isVisible: false,
	type: OperatingEnums.DETAIL,
	onClickCancel: () => {},
};

const inputStyle = {
	width: '155px',
};

const PREFIX_CLASS = 'pay-company-modal';

class PayCompanyModal extends Component {
	render() {
		const {
			isVisible,
			footer,
			onClickCancel,
			data,
			type,
		} = this.props;
		const {
			bankAccount,
			holder,
			bank,
			bankBranch,
			status,
			amount,
			fee,
			confirmAmount,
			unConfirmAmount,
			bankFee,
			remark,
			iconFileList,
		} = data;

		return (
			<PageModal
				modalSize={Modal.ModalSizeEnum.LARGE}
				visible={isVisible}
				title={getModalTitle(type)}
				footer={footer}
				onClickCancel={onClickCancel}
				className={PREFIX_CLASS}
			>
				<Row>
					<Col span={12}>
						<div>
							<LabelContent label="会员银行帐户" columnType={LabelContent.ColumnTypeEnums.LARGE} >
								<label className="pay-company-modal_marginLeft">{bankAccount}</label>
								<a className="pay-company-modal_copy-label" href="javascript:;" onClick={() => copyToClipboard(bankAccount)}>复制</a>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="卡主姓名" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<label className="pay-company-modal_marginLeft">{holder}</label>
								<a className="pay-company-modal_copy-label" href="javascript:;" onClick={() => copyToClipboard(holder)}>复制</a>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="银行名称" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<label className="pay-company-modal_marginLeft">{bank}</label>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="支行名称" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<label className="pay-company-modal_marginLeft">{bankBranch}</label>
								<a className="pay-company-modal_copy-label" href="javascript:;" onClick={() => copyToClipboard(bankBranch)}>复制</a>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="状态" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<label className="pay-company-modal_marginLeft">{status}</label>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="出款凭单" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<UploadImageButton
									fileList={iconFileList}
									onChange=""
									beforeUpload=""
									className="pay-company-modal_marginLeft"
								/>
							</LabelContent>
						</div>
					</Col>
					<Col span={12}>
						<div>
							<LabelContent label="提出额度" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<label className="pay-company-modal_marginLeft">{amount}</label>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="手续费扣点" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<label className="pay-company-modal_marginLeft">{fee}</label>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="已成功出款金额" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<label className="pay-company-modal_marginLeft">{confirmAmount}</label>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="尚未出款金额" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<label className="pay-company-modal_marginLeft">{unConfirmAmount}</label>
								<a className="pay-company-modal_copy-label" href="javascript:;" onClick={() => copyToClipboard(unConfirmAmount)}>复制</a>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="银行手续费" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<InputNumber
									placeholder=""
									style={inputStyle}
									value={bankFee}
									onChange={(value) => {
										this.setState({ data: Object.assign({}, data, { bankFee: value }), });
									}}
									className="pay-company-modal_marginLeft"
									disabled={type === OperatingEnums.DETAIL}
								/>
							</LabelContent>
						</div>
						<div>
							<LabelContent label="备注" columnType={LabelContent.ColumnTypeEnums.LARGE}>
								<Input placeholder="" style={inputStyle} value={remark}
									onChange={(event) => {
										this.setState({ data: Object.assign({}, data, { remark: event.target.value }), });
									}}
									className="pay-company-modal_marginLeft"
									disabled={type === OperatingEnums.DETAIL}
								/>
							</LabelContent>
						</div>
					</Col>
				</Row>
			</PageModal>
		);
	}
}

PayCompanyModal.propTypes = propTypes;
PayCompanyModal.defaultProps = defaultProps;

export default PayCompanyModal;

function getModalTitle(type = '') {
	switch (type) {
		case OperatingEnums.DETAIL:
			return '详細';
		case OperatingEnums.CANCEL:
			return '取消出款';
		case OperatingEnums.CONFIRM:
			return '确定出款';
		default:
			return '';
	}
}
