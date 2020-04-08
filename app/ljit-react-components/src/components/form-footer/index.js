import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.node,
	]),
};

const FormFooter = ({ children, className, } = {}) => (
	<div className={cx('ljit-form-footer', className)}>
		{children}
	</div>
);

FormFooter.propTypes = propTypes;

export default FormFooter;
