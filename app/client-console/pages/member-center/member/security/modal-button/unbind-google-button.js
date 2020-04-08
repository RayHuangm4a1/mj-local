import React, {
	Fragment,
	useState,
	useRef,
} from 'react';
import PropTypes from 'prop-types';
import {
	Button,
	Form,
	FormItem,
	Input,
} from 'ljit-react-components';
import { connect } from 'ljit-store-connecter';
import {
	withLoadingStatusNotification,
} from '../../../../../../lib/notify-handler';
import { LoadingStatusEnum, } from '../../../../../lib/enums';
import { userSecurityActions, } from '../../../../../controller';
import SubmitFormModal from '../../../../../components/submit-form-modal';

const {
	NONE,
	LOADING,
	SUCCESS,
	FAILED,
} = LoadingStatusEnum;

const loadingStatuses = [
	{
		loadingStatus: 'unbindGoogleAuthenticationLoadingStatus',
		loadingStatusMessage: 'unbindGoogleAuthenticationLoadingStatusMessage',
	},
];

const MODAL_CLASS = 'unbind-totp-form-modal';

const {
	unbindGoogleAuthenticationAction,
} = userSecurityActions;

const propTypes = {
	unbindGoogleAuthenticationLoadingStatus: PropTypes.oneOf([NONE, LOADING, SUCCESS, FAILED]).isRequired,
	unbindGoogleAuthenticationLoadingStatusMessage: PropTypes.string.isRequired,
	unbindGoogleAuthenticationAction: PropTypes.func.isRequired,
};

function UnbindGoogleButton({
	unbindGoogleAuthenticationAction,
}) {
	const formInstance = useRef(null);
	const [ isVisible, setVisible ] = useState(false);

	function _handleClickButton() {
		setVisible(true);
	}

	function _handleUnbindTOTP(event) {
		event.preventDefault();

		const form = formInstance.current.getForm();

		form.validateFields((error, values) => {
			if (!error) {
				const { totp, } = values;

				unbindGoogleAuthenticationAction(totp);
				form.resetFields();
				setVisible(false);
			}
		});
	}
	function _handleCloseModal() {
		const form = formInstance.current.getForm();

		form.resetFields();
		setVisible(false);
	}
	function _renderModal() {
		return (
			<SubmitFormModal
				className={MODAL_CLASS}
				width="440px"
				title="解除绑定"
				isVisible={isVisible}
				onClickCancel={_handleCloseModal}
				onClickOk={_handleUnbindTOTP}
			>
				<Form
					ref={formInstance}
					submitButtonDisabled
					cancelButtonDisabled
				>
					<FormItem
						className={`${MODAL_CLASS}__form-item`}
						label="谷歌6位动态密码"
						labelColon={false}
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
				</Form>
			</SubmitFormModal>
		);
	}

	return (
		<Fragment>
			<Button
				outline={Button.OutlineEnums.HOLLOW}
				onClick={_handleClickButton}
			>
				解除绑定
			</Button>
			{_renderModal()}
		</Fragment>
	);
}

UnbindGoogleButton.propTypes = propTypes;

function mapStateToProps(state) {
	return {
		unbindGoogleAuthenticationLoadingStatus: state.userSecurity.get('unbindGoogleAuthenticationLoadingStatus'),
		unbindGoogleAuthenticationLoadingStatusMessage: state.userSecurity.get('unbindGoogleAuthenticationLoadingStatusMessage'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		unbindGoogleAuthenticationAction: (...args) => dispatch(unbindGoogleAuthenticationAction(...args)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(
	withLoadingStatusNotification(
		loadingStatuses,
		UnbindGoogleButton
	)
);
