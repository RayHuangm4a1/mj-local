import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style.styl';

const propTypes = {
	className: PropTypes.string,
};

const FormItemDivider = ({ className, }) => (
	<span className={cx('ljit-form-item-divider', className)} />
);

FormItemDivider.propTypes = propTypes;

export default FormItemDivider;
