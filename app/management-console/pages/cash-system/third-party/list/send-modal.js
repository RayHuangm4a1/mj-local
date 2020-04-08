
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Select,
	Input,
	InputNumber,
	LabelText,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';
import { conversionText } from './';

const OptionEnums = {
	ICBC: 'icbc',
	ABC: 'abc',
	CITIC: 'citic',
	CEB: 'ceb',
};

const { ICBC, ABC, CITIC, CEB } = OptionEnums;

const propTypes = {
	visible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	record: PropTypes.object,
};

const defaultProps = {
	visible: false,
	onSubmit: () => {},
	onCancel: () => {},
	record: {},
};

class SendModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
	}

	_handleSubmit() {
		const form = this.formInstance.getForm();

		this.props.onSubmit(form);
	}

	render() {
		const {
			visible,
			onCancel,
			record,
		} = this.props;

		const {
			bank,
			cardName,
			accountId = '',
		} = record;

		return (
			<PageModal
				className="third-party-send-modal"
				title="下发"
				visible={visible}
				onClickOk={this._handleSubmit}
				onClickCancel={onCancel}
				modalSize="normal"
			>
				<React.Fragment>
					<div className="third-party-send-modal__bank-info">
						<LabelText
							label='银行名称:'
							text={bank}
							isFixedWidth={false}
						/>
						<LabelText
							label='银行卡姓名:'
							text={cardName}
							isFixedWidth={false}
						/>
						<LabelText
							label='出款帐号:'
							text={conversionText(accountId)}
							isFixedWidth={false}
						/>
					</div>
					<Form
						ref={formRef => this.formInstance = formRef}
						submitButtonDisabled
						cancelButtonDisabled
					>
						<FormItem
							className="third-party-send-form-item"
							itemName="thirdParty"
							label="第三方代付"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Select
								options={[
									{ label: '中国农业银行', value: ABC },
									{ label: '中信银行', value: CITIC },
									{ label: '中国光大银行', value: CEB },
									{ label: '中国工商银行', value: ICBC },
								]}
								placeholder="請選擇第三方"
							/>
						</FormItem>
						<FormItem
							className="third-party-send-form-item"
							itemName="amount"
							label="出款金额"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<InputNumber/>
						</FormItem>
						<FormItem
							className="third-party-send-form-item"
							itemName="note"
							label="备注"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input/>
						</FormItem>
						<FormItem
							className="third-party-send-form-item"
							itemName="password"
							label="系统谷歌动态密码"
							columnType={FormItem.ColumnTypeEnums.MEDIUM}
						>
							<Input
								type="password"
							/>
						</FormItem>
					</Form>
				</React.Fragment>
			</PageModal>
		);
	}
}

SendModal.propTypes = propTypes;
SendModal.defaultProps = defaultProps;

export default SendModal;
