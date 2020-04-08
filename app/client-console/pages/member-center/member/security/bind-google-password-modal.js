import React, {
	useState,
	useRef,
	useEffect,
} from 'react';
import PropTypes from 'prop-types';
import curryRight from 'lodash/curryRight';
import compose from 'lodash/fp/compose';
import join from 'lodash/fp/join';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import {
	Form,
	FormItem,
	Input,
	Row,
	Col,
} from 'ljit-react-components';
import { usePrevious, } from '../../../../lib/react-utils';
import SubmitFormModal from '../../../../components/submit-form-modal';

const SECRET_KEY_LENGTH = 10;
const QRCODE_WIDTH = 160;
const PREFIX_CLASS = 'bind-password-modal';
const SECRET_BLOCK_CLASS = 'secret-block';

const propTypes = {
	username: PropTypes.string,
	platformCode: PropTypes.string,
	isVisible: PropTypes.bool,
	onClose: PropTypes.func,
	onSubmit: PropTypes.func,
	title: PropTypes.string,
};

const defaultProps = {
	onClose: () => {},
	onSubmit: () => {},
};

function BindGooglePasswordModal({
	username,
	platformCode,
	isVisible,
	onClose,
	onSubmit,
	title,
}) {
	const isPrevVisible = usePrevious(isVisible);
	const formInstance = useRef(null);
	const [ secret, setSecret, ] = useState(null);
	const [ qrcodeDataUrl, setQRCodeDataUrl, ] = useState('');

	useEffect(() => {
		if (!isPrevVisible && isVisible) {
			const secret = speakeasy.generateSecret({
				length: SECRET_KEY_LENGTH,
				name: getSecretKeyName(platformCode, username),
			});
			const {
				otpauth_url,
			} = secret;

			setSecret(secret);
			QRCode.toDataURL(otpauth_url, (error, dataUrl) => {
				if (!error) {
					setQRCodeDataUrl(dataUrl);
				}
			});
		}
	}, [ isVisible, ]);

	function _handleClickOk() {
		const form = formInstance.current.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const formData = {
					...values,
					secret: secret.base32,
				};

				onSubmit(formData);
				form.resetFields();
			}
		});
	}
	function _handleClickCancel() {
		const form = formInstance.current.getForm();

		onClose();
		form.resetFields();
	}

	function _renderSecretBlock() {
		return (
			<Row gutter={92}>
				<Col span={12}>
					<div className={SECRET_BLOCK_CLASS}>
						<div className={`${SECRET_BLOCK_CLASS}__title`}>
							二维码方式添加：
						</div>
						<div className={`${SECRET_BLOCK_CLASS}__content`}>
							<div>请在 Google 身份验证器中</div>
							<div>采用添加条形码方式添加</div>
							<img
								width={QRCODE_WIDTH}
								height={QRCODE_WIDTH}
								src={qrcodeDataUrl}
							/>
						</div>
					</div>
				</Col>
				<Col span={12}>
					<div className={SECRET_BLOCK_CLASS}>
						<div className={`${SECRET_BLOCK_CLASS}__title`}>
							密钥方式添加：
						</div>
						<div className={`${SECRET_BLOCK_CLASS}__content`}>
							<div>请在 Google 身份验证器中</div>
							<div>采用输入提供的密钥方式添加</div>
							<div className={`${SECRET_BLOCK_CLASS}__sub-title`}>
								密钥如下所示：
							</div>
							<span className={`${SECRET_BLOCK_CLASS}__token`}>
								{buildDisplaySecretKey(secret.base32)}
							</span>
						</div>
					</div>
				</Col>
			</Row>
		);
	}

	return (
		<SubmitFormModal
			className={PREFIX_CLASS}
			width="682px"
			title={title}
			isVisible={isVisible}
			onClickCancel={_handleClickCancel}
			onClickOk={_handleClickOk}
		>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<div className={`${PREFIX_CLASS}__content`}>
					{secret ? _renderSecretBlock() : null}
					<FormItem
						className={`${PREFIX_CLASS}__form-item`}
						label="资金密码"
						itemName="password"
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									message: '密码不能为空',
								},
							],
						}}
					>
						<Input type="password" placeholder="请输入密码" />
					</FormItem>
					<FormItem
						className={`${PREFIX_CLASS}__form-item`}
						label="谷歌6位动态密码"
						itemName="totp"
						itemConfig={{
							initialValue: '',
							rules: [
								{
									required: true,
									message: '密码不能为空',
								},
							],
						}}
					>
						<Input type="password" placeholder="请输入密码" />
					</FormItem>
				</div>
			</Form>
		</SubmitFormModal>
	);
}

BindGooglePasswordModal.propTypes = propTypes;
BindGooglePasswordModal.defaultProps = defaultProps;

function getSecretKeyName(platformCode, username = '') {
	return platformCode ? `${platformCode}_${username}` : '';
}

const chunkString = curryRight((str, length) => {
	if (typeof str !== 'string') {
		return [];
	}

	const rule = new RegExp(`.{1,${length}}`, 'g');

	return str.match(rule);
});
const chunkStringEveryFourth = chunkString(4);
const joinSpace = join(' ');

const buildDisplaySecretKey = compose(
	joinSpace,
	chunkStringEveryFourth
);

export default BindGooglePasswordModal;
