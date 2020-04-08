import React, { useState, useEffect, useRef, } from 'react';
import PropTypes from 'prop-types';
import { TextButton, Form, } from 'ljit-react-components';
import PageModal from '../../../components/page-modal';
import { connect, } from 'ljit-store-connecter';
import { notifyHandlingActions, } from '../../../controller';
import {
	notifications,
} from '../../../../lib/notify-handler';
import { LoadingStatusEnum, } from '../../../lib/enums';
import { usePrevious } from '../../../lib/react-utils';
import './style.styl';

const { ModalSizeEnum } = PageModal;

const {
	SUCCESS,
	LOADING,
} = LoadingStatusEnum;
const {
	notifyHandlingAction,
} = notifyHandlingActions;
const {
	successNotifications,
} = notifications;
const {
	Success,
} = successNotifications;

const propTypes = {
	buttonText: PropTypes.string,
	isDisabled: PropTypes.bool,
	formTitle: PropTypes.string,
	onSubmitForm: PropTypes.func,
	formBody: PropTypes.any,
	modalSize: PropTypes.oneOf([
		ModalSizeEnum.SMALL,
		ModalSizeEnum.NORMAL,
		ModalSizeEnum.LARGE,
		'',
	]),
	okText: PropTypes.string,
	cancelText: PropTypes.string,
	userProfileUpdateLoadingStatus: PropTypes.oneOf(Object.values(LoadingStatusEnum)),
	notifyHandlingAction: PropTypes.func.isRequired,
};
const defaultProps = {
	buttonText: '修改',
	okText: '确 定',
	cancelText: '取 消',
	isDisabled: false,
	onSubmitForm: () => {},
	modalSize: ModalSizeEnum.SMALL
};

function EditUserProfileFormModalButton({
	buttonText,
	isDisabled,
	formTitle,
	onSubmitForm,
	formBody,
	modalSize,
	okText,
	cancelText,
	userProfileUpdateLoadingStatus,
	notifyHandlingAction,
}) {
	const prevUserProfileUpdateLoadingStatus = usePrevious(userProfileUpdateLoadingStatus);
	const formInstance = useRef(null);
	const [ isEditModalVisible, setIsModalVisible] = useState(false);
	const [ isModalEdited, setIsModalEdited] = useState(false);

	useEffect(() => {
		if (isEditModalVisible) {
			const form = formInstance.current.getForm();

			form.resetFields();
		}
	}, [isEditModalVisible]);

	useEffect(() => {
		if (isModalEdited
			&& userProfileUpdateLoadingStatus === SUCCESS
			&& prevUserProfileUpdateLoadingStatus === LOADING) {
			notifyHandlingAction(new Success(`${formTitle}修改成功`));
			setIsModalEdited(false);
		}
	}, [userProfileUpdateLoadingStatus]);

	function _handleSubmitForm() {
		const form = formInstance.current.getForm();

		form.validateFields((error, values) => {
			if (!error) {

				onSubmitForm(values);
				setIsModalVisible(false);
				setIsModalEdited(true);
			}
		});
	}
	function _handleCancel() {
		const form = formInstance.current.getForm();

		form.resetFields();
		setIsModalVisible(false);
	}

	return (
		<div>
			<TextButton
				text={buttonText}
				onClick={() => setIsModalVisible(true)}
				disabled={isDisabled}
			/>
			<Form
				ref={formInstance}
				submitButtonDisabled
				cancelButtonDisabled
			>
				<PageModal
					title={formTitle}
					visible={isEditModalVisible}
					okText={okText}
					cancelText={cancelText}
					onClickOk={_handleSubmitForm}
					onClickCancel={_handleCancel}
					modalSize={modalSize}
					className="edit-element-modal"
				>
					{formBody}
				</PageModal>
			</Form>
		</div>
	);
}

function mapStateToProps(state) {
	const {
		profile: userProfile,
	} = state.userData;

	return {
		userProfileUpdateLoadingStatus: userProfile.get('updateLoadingStatus'),
	};
}

function mapDispatchToProps(dispatch) {
	return {
		notifyHandlingAction: (notification) => dispatch(notifyHandlingAction(notification)),
	};
}

EditUserProfileFormModalButton.propTypes = propTypes;
EditUserProfileFormModalButton.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfileFormModalButton);
