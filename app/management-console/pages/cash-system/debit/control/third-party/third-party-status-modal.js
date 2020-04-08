import React from 'react';
import PropTypes from 'prop-types';
import PageModal from '../../../../../components/page-modal';
import { ActivateStatusEnums, } from '../../../../../components/table/constants';

const {
	ARCHIVED,
	ACTIVE,
} = ActivateStatusEnums;

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
			return '确定要禁用吗？';
		default:
			return '';
	}
}

const ThirdPartyStatusModal = ({ isVisible, title, status, onSubmit, onCancel, }) => (
	<PageModal.Message
		visible={isVisible}
		title={title}
		message={getMessage(status)}
		onClickOk={onSubmit}
		onClickCancel={onCancel}
	/>
);

ThirdPartyStatusModal.propTypes = propTypes;
ThirdPartyStatusModal.defaultProps = defaultProps;

export default ThirdPartyStatusModal;
