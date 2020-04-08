
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Select,
	Input,
} from 'ljit-react-components';
import PageModal from '../../../../components/page-modal';

const OptionEnums = {
	ICBC: 'icbc',
	ABC: 'abc',
	CITIC: 'citic',
	CEB: 'ceb',
	BEI_JING: 'peking',
	SI_CHUAN: 'sichuan',
	CHENG_DU: 'chengdu',
	DONG_CHENG: 'dongcheng',
};

const { ICBC, ABC, CITIC, CEB, BEI_JING, SI_CHUAN, CHENG_DU, DONG_CHENG } = OptionEnums;

const propTypes = {
	visible: PropTypes.bool,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
	initailValues: PropTypes.shape({
		bank: PropTypes.string,
		province: PropTypes.string,
		city: PropTypes.string,
	}),
};

const defaultProps = {
	initailValues: {
		bank: CITIC,
		province: SI_CHUAN,
		city: CHENG_DU,
	},
};

const formInputStyle = {
	width: '100%',
};

class CreateModal extends Component {
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
			visible, onCancel, initailValues,
		} = this.props;

		return (
			<PageModal
				title="新增第三方下发出款帐号"
				visible={visible}
				onClickOk={this._handleSubmit}
				onClickCancel={onCancel}
				modalSize="normal"
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					onChange={() => {}}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						itemName="bank"
						itemConfig={{
							initailValue: initailValues.bank,
						}}
						label="银行名称"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							style={formInputStyle}
							options={[
								{ label: '中国工商银行', value: ICBC },
								{ label: '中国农业银行', value: ABC },
								{ label: '中信银行', value: CITIC },
								{ label: '中国光大银行', value: CEB },
							]}
							placeholder="请选择银行名称"
						/>
					</FormItem>
					<FormItem
						itemName="province"
						itemConfig={{
							initailValue: initailValues.province,
						}}
						label="银行省份"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							style={formInputStyle}
							options={[
								{ label: '北京', value: BEI_JING },
								{ label: '四川', value: SI_CHUAN },
								{ label: '', value: '' },
							]}
							placeholder="请选择银行省份"
						/>
					</FormItem>
					<FormItem
						itemName="city"
						itemConfig={{
							initailValue: initailValues.city,
						}}
						label="银行城市"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Select
							style={formInputStyle}
							options={[
								{ label: '成都', value: CHENG_DU },
								{ label: '东城', value: DONG_CHENG },
							]}
							placeholder=" 请选择城市"
						/>
					</FormItem>
					<FormItem
						itemName="branch"
						label="支行名称"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Input
							style={formInputStyle}
							placeholder="请输入支行名称"
						/>
					</FormItem>
					<FormItem
						itemName="cardName"
						label="银行卡姓名"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Input
							style={formInputStyle}
							placeholder="请输入银行卡姓名（必填）"
						/>
					</FormItem>
					<FormItem
						itemName="accountId"
						label="出款帐号"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Input
							style={formInputStyle}
							placeholder="請輸入出款帳號（必填）"
						/>
					</FormItem>
					<FormItem
						itemName="password"
						label="系统谷歌动态密码"
						columnType={FormItem.ColumnTypeEnums.MEDIUM}
					>
						<Input
							style={formInputStyle}
							placeholder="請輸入密碼（必填）"
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

CreateModal.propTypes = propTypes;
CreateModal.defaultProps = defaultProps;

export default CreateModal;
