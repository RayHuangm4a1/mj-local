import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Modal, } from 'ljit-react-components';
import './style.styl';

const propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	isVisible: PropTypes.bool,
	onClickCloseButton: PropTypes.func,
	left: PropTypes.node,
};

const defaultProps = {
	className: '',
	isVisible: false,
	onClickCloseButton: () => {},
};

const prefixClass = 'ljit-colse-button-modal';

const CloseButtonModal = ({
	children,
	className,
	isVisible,
	onClickCloseButton,
	left,
}) => (
	<Modal
		className={cx(prefixClass, className)}
		visible={isVisible}
		onClickCancel={onClickCloseButton}
		footer={null}
		width={'1193px'}
		isMaskClosable={false}
	>
		<div className={`${prefixClass}__content__body`}>
			{children}
		</div>
	</Modal>
);

CloseButtonModal.propTypes = propTypes;
CloseButtonModal.defaultProps = defaultProps;

export default CloseButtonModal;
