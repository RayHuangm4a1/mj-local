import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const PREFIX_CLASS = 'form-block';
const propTypes = {
	className: PropTypes.string,
	header: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	footer: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
	children: PropTypes.any,
};
const defaultProps = {};

const FormBlock = ({
	className,
	header,
	footer,
	children,
}) => (
	<div className={cx(PREFIX_CLASS, className)}>
		<div className={`${PREFIX_CLASS}__header`}>
			{header}
		</div>
		<div className={`${PREFIX_CLASS}__body`}>
			{children}
		</div>
		<div className={`${PREFIX_CLASS}__footer`}>
			{footer}
		</div>
	</div>
);

FormBlock.propTypes = propTypes;
FormBlock.defaultProps = defaultProps;

export default FormBlock;
