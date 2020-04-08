import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Modal as AntdModal, } from 'antd';
import cx from 'classnames';
import MessageModal from './message';
import './style.styl';

const ModalSizeEnum = {
	SMALL: 'small',
	NORMAL: 'normal',
	LARGE: 'large',
};

const ModalWidth = {
	small: '320px',
	normal: '640px',
	large: '1024px',
};

const propTypes = {
	className: PropTypes.string,
	okText: PropTypes.string,
	cancelText: PropTypes.string,
	onClickOk: PropTypes.func,
	onClickCancel: PropTypes.func,
	visible: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	title: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	footer: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	modalSize: PropTypes.oneOf([
		ModalSizeEnum.SMALL,
		ModalSizeEnum.NORMAL,
		ModalSizeEnum.LARGE,
		'',
	]),
	isCentered: PropTypes.bool,
	width: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
	isMaskClosable: PropTypes.bool,
	okButtonClassname: PropTypes.string,
	cancelButtonClassname: PropTypes.string,
	isOkButtonDisabled: PropTypes.bool,
	zIndex: PropTypes.number,
};
const defaultProps = {
	okText: '确 定',
	cancelText: '取 消',
	okButtonClassname: '',
	cancelButtonClassname: '',
	onClickCancel: () => {},
	onClickOk: () => {},
	visible: false,
	modalSize: '',
	isCentered: false,
	width: '640px',
	isMaskClosable: true,
	isOkButtonDisabled: false,
};

class Modal extends Component {
	constructor() {
		super();

		this._getWidth = this._getWidth.bind(this);
	}
	_getWidth() {
		const { modalSize, width, } = this.props;

		if (modalSize) {
			return ModalWidth[modalSize];
		} else {
			return width;
		}
	}
	render() {
		const {
			className,
			visible,
			title,
			okText,
			cancelText,
			onClickCancel,
			onClickOk,
			children,
			footer,
			modalSize,
			isCentered,
			isMaskClosable,
			okButtonClassname,
			cancelButtonClassname,
			zIndex,
			isOkButtonDisabled,
		} = this.props;

		return (
			<AntdModal
				visible={visible}
				title={title}
				okText={okText}
				cancelText={cancelText}
				onCancel={onClickCancel}
				onOk={onClickOk}
				wrapClassName={cx('ljit-modal', className, modalSize,)}
				footer={footer}
				centered={isCentered}
				width={this._getWidth()}
				maskClosable={isMaskClosable}
				okButtonProps={{
					className: okButtonClassname,
					disabled: isOkButtonDisabled,
				}}
				cancelButtonProps={{ className: cancelButtonClassname, }}
				zIndex={zIndex}
			>
				{children}
			</AntdModal>
		);
	}
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

Modal.ModalSizeEnum = ModalSizeEnum;

Modal.Message = MessageModal;

export default Modal;
