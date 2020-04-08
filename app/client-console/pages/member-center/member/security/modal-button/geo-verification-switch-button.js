import React, { Fragment, useState, useRef, } from 'react';
import PropTypes from 'prop-types';
import { Switch, Form, FormItem, Input, } from 'ljit-react-components';
import ClientMessageModal from '../../../../../components/client-message-modal';
import SubmitFormModal from '../../../../../components/submit-form-modal';

const propTypes = {
	isGeoVerification: PropTypes.bool,
	onToggleSwitch: PropTypes.func,
	hasBoundBankCard: PropTypes.bool,
	onVerifyUserBankCardFailed: PropTypes.func,
};

const defaultProps = {
	onToggleSwitch: () => {},
	onVerifyUserBankCardFailed: () => {},
};

function GeoVerificationSwitchButton({ onToggleSwitch, isGeoVerification, hasBoundBankCard, onVerifyUserBankCardFailed, }) {
	const [ isGeoVerificationMessageVisible, setGeoVerificationMessageVisible ] = useState(false);
	const [ hasBoundBankCardMessageVisible, setBoundBankCardMessageVisible ] = useState(false);
	const [ isCancelGeoVerificationModalVisible, setCancelGeoVerificationModalVisible ] = useState(false);
	const formInstance = useRef(null);

	function _handleToggleGeoVerification() {
		if (isGeoVerification) {
			setCancelGeoVerificationModalVisible(true);
		} else {
			if (hasBoundBankCard) {
				setGeoVerificationMessageVisible(true);
			} else {
				setBoundBankCardMessageVisible(true);
			}
		}
	}

	function _handleOpenGeoVerification() {
		onToggleSwitch(true);
		_handleCloseModal();
	}

	function _handleCloseModal() {
		setGeoVerificationMessageVisible(false);
		setBoundBankCardMessageVisible(false);
	}

	function _handleHideCancelGeoVerificationModal() {
		setCancelGeoVerificationModalVisible(false);
	}

	function _handleClickCancelGeoVerificationModalOk() {
		const form = formInstance.current.getForm();

		form.validateFields((err, { payer, }) => {
			if (!err) {
				onToggleSwitch(false, payer);
				form.resetFields();
				_handleHideCancelGeoVerificationModal();
			}
		});
	}

	return (
		<Fragment>
			<Switch
				checked={isGeoVerification}
				onChange={_handleToggleGeoVerification}
			/>
			<ClientMessageModal
				isVisible={isGeoVerificationMessageVisible}
				onClickCancel={_handleCloseModal}
				onClickOk={_handleOpenGeoVerification}
				message="确定要开启异地登录验证？"
			/>
			<ClientMessageModal
				isVisible={hasBoundBankCardMessageVisible}
				okText="前往绑定"
				onClickCancel={_handleCloseModal}
				onClickOk={onVerifyUserBankCardFailed}
				message="请先绑定银行卡，谢谢！"
			/>
			<SubmitFormModal
				title="通知"
				className="geo-verification-switch-button-modal"
				isVisible={isCancelGeoVerificationModalVisible}
				onClickCancel={_handleHideCancelGeoVerificationModal}
				onClickOk={_handleClickCancelGeoVerificationModalOk}
			>
				<Form
					ref={formInstance}
					cancelButtonDisabled
					submitButtonDisabled
				>
					<FormItem
						className="card-owner"
						label="持卡人姓名"
						labelColon={false}
						itemName="payer"
						itemConfig={{
							rules: [
								{
									required: true,
									message: '持卡人姓名不能为空',
								},
							],
						}}
					>
						<Input placeholder="请输入持卡人姓名" />
					</FormItem>
				</Form>
			</SubmitFormModal>
		</Fragment>
	);
}

GeoVerificationSwitchButton.propTypes = propTypes;
GeoVerificationSwitchButton.defaultProps = defaultProps;

export default GeoVerificationSwitchButton;
