import React from 'react';
import PropTypes from 'prop-types';
import PageModal from '../../../../components/page-modal';
import { StatusEnums, } from './utils';

const {
	ARCHIVED,
	ACTIVE,
	UNRECOMMEND,
	RECOMMEND,
	AUTOPAY_OFF,
	AUTOPAY_ON,
} = StatusEnums;

const propTypes = {
	isVisible: PropTypes.bool,
	title: PropTypes.string,
	status: PropTypes.string,
	onSubmit: PropTypes.func,
	onCancel: PropTypes.func,
};

const defaultProps = {
	title: '确认提示',
	onSubmit: () => {},
	onCancel: () => {},
};

function getMessage(status) {
	switch (status) {
		case ARCHIVED:
			return '确定要启用吗？';
		case ACTIVE:
			return '确定要停用吗？';
		case UNRECOMMEND:
			return '确定要推荐吗？';
		case RECOMMEND:
			return '确定要取消推荐吗？';
		case AUTOPAY_OFF:
			return '确定要自动出款吗？';
		case AUTOPAY_ON:
			return '确定要取消自动出款吗？';
		default:
			return '';
	}
}

const RechargeConfirmModal = ({ isVisible, title, status, onSubmit, onCancel, }) => (
	<PageModal.Message
		visible={isVisible}
		title={title}
		message={getMessage(status)}
		onClickOk={onSubmit}
		onClickCancel={onCancel}
	/>
);

RechargeConfirmModal.propTypes = propTypes;
RechargeConfirmModal.defaultProps = defaultProps;

export default RechargeConfirmModal;
