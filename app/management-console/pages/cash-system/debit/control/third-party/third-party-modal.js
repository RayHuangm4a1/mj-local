import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import {
	Form,
	FormItem,
	Modal,
	Input,
	Select,
	InputNumber,
	CheckBoxGroup,
} from 'ljit-react-components';
import PageModal from '../../../../../components/page-modal';

// TODO Remove paymentPlatformOptions, levelOptions after get from api
const paymentPlatformOptions = [
	{ label: '智付', value: 1, },
	{ label: '畅汇支付', value: 2, },
	{ label: '可乐在线', value: 3, },
];
const levelOptions = [
	{ label: '新人层', value: '1', },
	{ label: '第二层', value: '2', },
	{ label: '第三层', value: '3', },
	{ label: '第四层', value: '4', },
	{ label: '第五层', value: '5', },
	{ label: '第六层', value: '6', },
	{ label: '第七层', value: '7', },
	{ label: '第八层', value: '8', },
	{ label: '第九层', value: '9', },
	{ label: '第十层', value: '10', },
	{ label: '自动加入层', value: '11', },
	{ label: '特殊层A', value: '12', },
	{ label: '特殊层B', value: '13', },
	{ label: '特殊层C', value: '14', },
	{ label: '特殊层D', value: '15', },
	{ label: '特殊层E', value: '16', },
	{ label: '特殊层F', value: '17', },
	{ label: '特殊层G', value: '18', },
	{ label: '特殊层H', value: '19', },
	{ label: '特殊层I', value: '20', },
];

const propTypes = {
	// TODO 暫定，還不確定命名
	thirdPartyBank: PropTypes.shape({
		vendorName: PropTypes.string,
		paymentPlatform: PropTypes.number,
		tradeName: PropTypes.string,
		vendorKey: PropTypes.string, 
		smartPayPublicKey: PropTypes.string,
		level: PropTypes.arrayOf(PropTypes.string),
		singlePaymentLimit: PropTypes.number,
		other: PropTypes.string,
	}),
	isVisible: PropTypes.bool,
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	paymentPlatformOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.number,
	})),
	levelOptions: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
	})),
	onCancel: PropTypes.func,
	onSubmit: PropTypes.func,
};
const defaultProps = {
	isVisible: false,
	paymentPlatformOptions: paymentPlatformOptions,
	levelOptions: levelOptions,
	onCancel: () => {},
	onSubmit: () => {},
};

const PREFIX_CLASS ='third-party-modal';

class ThirdPartyModal extends Component {
	constructor() {
		super();

		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleCancel = this._handleCancel.bind(this);
	}

	_handleSubmit(event) {
		const { onSubmit, } = this.props;
		const form = this.formInstance.getForm();

		event.preventDefault();
		form.validateFields((error, values) => {
			if (!error) {
				onSubmit(values, form);
				form.resetFields();
			}
		});
	}

	_handleCancel(event) {
		const { onCancel, } = this.props;
		const form = this.formInstance.getForm();

		onCancel(event, form);
		form.resetFields();
	}

	render() {
		const {
			thirdPartyBank,
			isVisible,
			title,
			paymentPlatformOptions,
			levelOptions,
		} = this.props;

		return (
			// TODO 只有名称,支付平台,层级,单笔出款限制,其他为固定栏位
			// 其余的可能会是动态栏位，会因为支付平台而不尽相同
			<PageModal
				className={PREFIX_CLASS}
				modalSize={Modal.ModalSizeEnum.NORMAL}
				visible={isVisible}
				title={title}
				onClickCancel={this._handleCancel}
				onClickOk={this._handleSubmit}
			>
				<Form
					ref={formRef => this.formInstance = formRef}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						itemName="vendorName"
						itemConfig={{
							initialValue: thirdPartyBank.vendorName,
						}}
						label="名称："
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className={`${PREFIX_CLASS}__form-item`}
					>
						<Input
							className={`${PREFIX_CLASS}__input`}
							placeholder="请输入名称"
						/>
					</FormItem>
					<FormItem
						itemName="paymentPlatform"
						itemConfig={{
							initialValue: thirdPartyBank.paymentPlatform,
						}}
						label="支付平台："
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className={`${PREFIX_CLASS}__form-item`}
					>
						<Select
							className={`${PREFIX_CLASS}__input`}
							placeholder="请选择"
							options={paymentPlatformOptions}
						/>
					</FormItem>
					<FormItem
						itemName="tradeName"
						itemConfig={{
							initialValue: thirdPartyBank.tradeName,
						}}
						label="商号："
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className={`${PREFIX_CLASS}__form-item`}
					>
						<Input
							className={`${PREFIX_CLASS}__input`}
						/>
					</FormItem>
					<FormItem
						itemName="vendorKey"
						itemConfig={{
							initialValue: thirdPartyBank.vendorKey,
						}}
						label="商家密钥："
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className={`${PREFIX_CLASS}__form-item`}
					>
						<Input
							className={`${PREFIX_CLASS}__input`}
						/>
					</FormItem>
					<FormItem
						label="智付公钥："
						itemName="smartPayPublicKey"
						itemConfig={{
							initialValue: thirdPartyBank.smartPayPublicKey,
						}}
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className={`${PREFIX_CLASS}__form-item`}
					>
						<Input
							className={`${PREFIX_CLASS}__input`}
						/>
					</FormItem>
					<FormItem
						itemName="level"
						itemConfig={{
							initialValue: thirdPartyBank.level,
						}}
						label="层级："
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className={`${PREFIX_CLASS}__form-item`}
						noMargin
					>
						<CheckBoxGroup
							className={`${PREFIX_CLASS}__level-group`}
							style={{ width: '100%' }}
							options={levelOptions}
						/>
					</FormItem>
					<FormItem
						label="单笔出款限制："
						itemName="singlePaymentLimit"
						itemConfig={{
							initialValue: thirdPartyBank.singlePaymentLimit,
						}}
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className={`${PREFIX_CLASS}__form-item`}
					>
						<InputNumber
							className={`${PREFIX_CLASS}__input`}
							min={0}
							placeholder="请输入停用金额"
						/>
					</FormItem>
					<FormItem
						itemName="other"
						itemConfig={{
							initialValue: thirdPartyBank.other,
						}}
						label="其他："
						columnType={FormItem.ColumnTypeEnums.SMALL}
						className={`${PREFIX_CLASS}__form-item`}
					>
						<Input
							className={`${PREFIX_CLASS}__input`}
						/>
					</FormItem>
				</Form>
			</PageModal>
		);
	}
}

ThirdPartyModal.propTypes = propTypes;
ThirdPartyModal.defaultProps = defaultProps;

export default ThirdPartyModal;
