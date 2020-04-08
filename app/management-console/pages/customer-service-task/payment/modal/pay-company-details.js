import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Input,
	Row,
	Col,
	LabelContent,
	Button,
	UploadImageButton,
	TextButton,
} from 'ljit-react-components';
import copyToClipboard from 'copy-to-clipboard';
import PageModal from '../../../../components/page-modal';
import './style.styl';

const propTypes = {
	selectedData: PropTypes.shape({
		bankAccount: PropTypes.string,
		cardId: PropTypes.string,
		holder: PropTypes.string,
		bank: PropTypes.string,
		bankBranch: PropTypes.string,
		amount: PropTypes.number,
		fee: PropTypes.number,
		feePoint: PropTypes.number,
		bankFee: PropTypes.number,
		confirmAmount: PropTypes.number,
		unConfirmAmount: PropTypes.number,
		applyAt: PropTypes.string,
		confirmAt: PropTypes.string,
		status: PropTypes.string,
		comment: PropTypes.string,
		administrator: PropTypes.string,
		iconFileList: PropTypes.array,
	}),
	isVisible: PropTypes.bool,
	onClickCancel: PropTypes.func,
};
const defaultProps = {
	selectedData: {},
	isVisible: false,
	onClickCancel: () => {},
};

class PayCompanyDetailsModal extends Component {
	constructor() {
		super();

		this._renderCopyButton = this._renderCopyButton.bind(this);
		this._renderFooter = this._renderFooter.bind(this);
	}
	_renderCopyButton(value) {
		return (
			<TextButton
				text="复制"
				onClick={() => copyToClipboard(value)}
			/>
		);
	}
	_renderFooter() {
		const { onClickCancel } = this.props;

		return (
			<Button
				onClick={onClickCancel}
				color={Button.ColorEnums.BRIGHTBLUE500}
			>
				关 闭
			</Button>
		);
	}

	render() {
		const {
			isVisible,
			selectedData,
			onClickCancel
		} = this.props;
		const { _renderCopyButton, _renderFooter } = this;

		return (
			<PageModal
				visible={isVisible}
				title="詳情"
				onClickCancel={onClickCancel}
				footer={_renderFooter()}
				width="824px"
				className="pay-company-details-modal"
			>
				<Row>
					<Col span={12}>
						<LabelContent
							label="会员银行帐户"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>

							{selectedData.bankAccount}
							{_renderCopyButton(selectedData.bankAccount)}
						</LabelContent>
						<LabelContent
							label="卡主姓名"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.holder}
							{_renderCopyButton(selectedData.holder)}
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
							label="出款凭单"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							<UploadImageButton
								fileList={selectedData.iconFileList}
								onChange={() => {}}
							/>
						</LabelContent>
					</Col>
					<Col span={12}>
						<LabelContent
							label="提出额度"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							{selectedData.amount}
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
							{selectedData.unConfirmAmount}
							{_renderCopyButton(selectedData.unConfirmAmount)}
						</LabelContent>
						<LabelContent
							label="银行手续费"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							<Input disabled value={selectedData.bankFee}/>
						</LabelContent>
						<LabelContent
							label="备注"
							columnType={LabelContent.ColumnTypeEnums.LARGE}
						>
							<Input disabled value={selectedData.comment}/>
						</LabelContent>
					</Col>
				</Row>
			</PageModal>
		);
	}
}

PayCompanyDetailsModal.propTypes = propTypes;
PayCompanyDetailsModal.defaultProps = defaultProps;

export default PayCompanyDetailsModal;
