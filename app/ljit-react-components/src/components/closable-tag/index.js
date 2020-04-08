import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tag from '../../components/tag';
import './style.styl';

const propTypes = {
	text: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	className: PropTypes.string,
	onClose: PropTypes.func,
	isWithOutline: PropTypes.bool,
};
const defaultProps = {
	isWithOutline: true,
	onClose: () => {},
};

const ClosableTag = ({
	text,
	className,
	onClose,
	isWithOutline,
} = {}) => (
	<Tag
		className={cx('ljit-closable-tag ljit-closable-tag--closed', className)}
		shape={Tag.ShapeEnums.ROUNDBORDER}
		hasBorder={isWithOutline}
		text={text}
		isClosable={true}
		onClose={onClose}
	/>
);

ClosableTag.propTypes = propTypes;
ClosableTag.defaultProps = defaultProps;

export default ClosableTag;
